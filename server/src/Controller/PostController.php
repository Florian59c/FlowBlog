<?php

namespace App\Controller;

use App\Entity\Post;
use App\Repository\PostRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PostController extends AbstractController
{
    /**
     * @Route("/getPostsWithRecentDate", name="getPostsWithRecentDate")
     */
    public function getPostsWithRecentDate(PostRepository $postRepository): Response
    {
        $posts = $postRepository->findAllWithDate();
        
        return $this->json($posts);
    }

    /**
     * @Route("/createPost", name="createPost")
     */
    public function createPost(PostRepository $postRepository, UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $currentUserId = $data['currentUserId'];
        $currentUser = $userRepository->findOneBy(['id' => $currentUserId]);
        if ($currentUser->getRole() === "ADMIN") {
            $post = new Post();
            $post->setTitle($data['title']);
            $post->setIntro($data['intro']);
            $post->setContent($data['content']);
            $post->setLastDate(new \DateTime('now'));
            $post->setAuthor($currentUser);

            $postRepository->add($post, true);

            return $this->json(true);
        } else {
            return $this->json(false);
        }
    }
}