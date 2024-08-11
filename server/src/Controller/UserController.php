<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/getUser", name="getUser")
     */
    public function getUser(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        
        return $this->json($users);
    }
    
    /**
     * @Route("/createUser", name="createUser")
     */
    public function createUser(UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $user->setPseudo($data['pseudo']);
        $user->setMail($data['mail']);
        // $hashedPassword = hashPassword($data['password']);
        // $user->setPassword($hashedPassword);
        $user->setPassword($data['password']);
        $user->setRole("USER");
        $user->setIsVerified(false);

        $userRepository->add($user, true);

        return $this->json($data,201);
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
     * @Route("/login", name="login")
     */
    public function login(UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $test = $userRepository->findOneBy([
            'mail' => $data['mail'],
            'password' => $data['password'],
        ]);
        if ($test === null) {
            return $this->json(false);
        } else {
            return $this->json(true);
        }
    }
}
