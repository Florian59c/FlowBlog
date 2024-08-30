<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;

class MailerController extends AbstractController
{
    /**
     * @Route("/contactMail", name="contactMail")
     */
    public function contactMail(MailerInterface $mailer, UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $currentUserId = $data['currentUserId'];
        $currentUser = $userRepository->findOneBy(['id' => $data['currentUserId']]);
        $text = $data['text'];

        if ($currentUser) {
            $from = $currentUser->getMail();

            $email = (new Email())
                ->from($from)
                ->to('flowblog.contact@gmail.com')
                ->subject('Prise de contact')
                ->text($text);

            $mailer->send($email);

            return  $this->json(true);;
        }
        else {
            return  $this->json(false);;
        }
    }

    /**
     * @Route("/confirmMail", name="confirmMail")
     */
    public function confirmMail(MailerInterface $mailer, UserRepository $userRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        
        $currentUserId = $data['currentUserId'];
        $currentUser = $userRepository->findOneBy(['id' => $data['currentUserId']]);

        if ($currentUser) {
            $currentUserEmail = $currentUser->getMail();

            $email = (new TemplatedEmail())
                ->from('flowblog.contact@gmail.com')
                ->to($currentUserEmail)
                ->subject("FlowBlog - confirmation de l'adresse mail")
                ->htmlTemplate('emails/confirmEmail.html.twig')
                ->context([
                    'id' => $currentUserId,
                    'pseudo' => $currentUser->getPseudo(),
                ])
            ;

            $mailer->send($email);

            return  $this->json(true);;
        }
        else {
            return  $this->json(false);;
        }
    }
}