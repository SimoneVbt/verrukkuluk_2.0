<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class GerechtController extends AbstractController
{
    /**
     * @Route("/gerecht", name="gerecht")
     */
    public function index()
    {
        return $this->render('gerecht/index.html.twig', [
            'controller_name' => 'GerechtController',
        ]);
    }
}
