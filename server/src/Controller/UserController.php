<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/getAllUsers", name="getAllUsers")
     */
    public function getAllUsers(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        
        return $this->json($users);
    }
    
    /**
     * @Route("/createUser", name="createUser")
     */
    public function createUser(UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $pseudo = $userRepository->findOneBy(['pseudo' => $data['pseudo']]);
        $mail = $userRepository->findOneBy(['mail' => $data['mail']]);
        if ($pseudo && $mail) {
            return $this->json("error");
        } else if ($pseudo) {
            return $this->json("errorPseudo");
        } else if ($mail) {
            return $this->json("errorMail");
        } else {
            $user = new User();
            $user->setPseudo($data['pseudo']);
            $user->setMail($data['mail']);
            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $data['password']
            );
            $user->setPassword($hashedPassword);
            $user->setRole("USER");
            $user->setIsVerified(false);

            $userRepository->add($user, true);

            return $this->json("created");
        }
    }

    /**
     * @Route("/findUser", name="findUser")
     */
    public function findUser(UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $curentUser = $userRepository->findOneBy(['id' => $data['id']]);

        return $this->json($curentUser);
    }

    /**
     * @Route("/findIdByMail", name="findIdByMail")
     */
    public function findIdByMail(UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $curentUser = $userRepository->findOneBy(['mail' => $data['mail']]);

        return $this->json($curentUser->getId());
    }

    /**
     * @Route("/login", name="login")
     */
    public function login(UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $findedUserByMail = $userRepository->findOneBy([
            'mail' => $data['mail']
        ]);
        if ($findedUserByMail === null) {
            return $this->json("errorMail");
        } else {
            $isSameHash = $passwordHasher->isPasswordValid($findedUserByMail, $data['password']);
            if ($isSameHash === true) {
                return $this->json("correct");
            } else {
                return $this->json("errorPassword");
            }
        }
    }

    /**
     * @Route("/verifyUser", name="verifyUser")
     */
    public function verifyUser(UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $currentUser = $userRepository->findOneBy(['id' => $data['id']]);
        if ($currentUser) {
            $currentUser->setIsVerified(true);
            $userRepository->add($currentUser, true);

            return $this->json("Votre compte a bien été vérifié !");
        } else {
            return $this->json("Nous n'avons pas réussi à trouver votre compte");
        }
    }
}
