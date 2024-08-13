<?php

namespace App\Controller;

use App\Entity\Comment;
use App\Repository\CommentRepository;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
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
    
    /**
     * @Route("/createComment", name="createComment")
     */
    public function createComment(CommentRepository $commentRepository, PostRepository $postRepository, UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $currentUser = $userRepository->findOneBy(['id' => $data['currentUserId']]);
        $currentPost = $postRepository->findOneBy(['id' => $data['currentPostId']]);
        if ($currentUser->isIsVerified() === true) {
            $comment = new Comment();
            $comment->setContent($data['content']);
            $comment->setIsValidated(false);
            $comment->setUserId($currentUser);
            $comment->setPostId($currentPost);

            $commentRepository->add($comment, true);

            return $this->json(true);
        } else {
            return $this->json(false);
        }
    }

    /**
     * @Route("/validateComment", name="validateComment")
     */
    public function validateComment(CommentRepository $commentRepository, UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $comment = $commentRepository->findOneBy(['id' => $data['commentId']]);
        $currentUser = $userRepository->findOneBy(['id' => $data['currentUserId']]);
        if ($currentUser->getRole() === "ADMIN") {
            $comment->setIsValidated(true);

            $commentRepository->add($comment, true);

            return $this->json(true);
        } else {
            return $this->json(false);
        }
    }
    
    /**
     * @Route("/deleteComment", name="deleteComment")
     */
    public function deleteComment(CommentRepository $commentRepository, UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $comment = $commentRepository->findOneBy(['id' => $data['commentId']]);
        $currentUser = $userRepository->findOneBy(['id' => $data['currentUserId']]);
        if ($currentUser->getRole() === "ADMIN") {

            $commentRepository->remove($comment, true);
            
            return $this->json(true);
        } else {
            return $this->json(false);
        }
    }
}
