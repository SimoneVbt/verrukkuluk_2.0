<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BoodschappenController extends AbstractController
{
    /**
     * @Route("/boodschappen", name="boodschappen")
     */
    public function index()
    {
        return $this->render('boodschappen/index.html.twig', [
            'controller_name' => 'BoodschappenController',
        ]);
    }
}
