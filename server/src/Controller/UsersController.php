<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UsersController extends AbstractController
{
    /**
     * @Route("/getUsers", name="getUsers")
     */
    public function getUsers(UsersRepository $usersRepository): Response
    {
        $users = $usersRepository->findAll();
        $data = array();
        foreach ($users as $key => $user) {
            $data[$key]['id'] = $user->getId();
            $data[$key]['lastName'] = $user->getLastName();
            $data[$key]['firstName'] = $user->getFirstName();
        }
        return $this->json($data);
    }
    
    /**
     * @Route("/setUsers", name="setUsers")
     */
    public function setUsers(UsersRepository $usersRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $user = new Users();
        $user->setLastName($data['lastName']);
        $user->setFirstName($data['firstName']);
        $usersRepository->add($user);

        return $this->json($data,201);
    }
}
