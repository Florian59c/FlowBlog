<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CommentController extends AbstractController
{
    /**
     * @Route("/getAllComments", name="getAllComments")
     */
    public function getAllComments(CommentRepository $commentRepository): Response
    {
        $comments = $commentRepository->findAll();
        
        return $this->json($comments);
    }
}
