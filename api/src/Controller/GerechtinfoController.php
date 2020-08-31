<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class GerechtinfoController extends AbstractController
{
    /**
     * @Route("/gerechtinfo", name="gerechtinfo")
     */
    public function index()
    {
        return $this->render('gerechtinfo/index.html.twig', [
            'controller_name' => 'GerechtinfoController',
        ]);
    }
}
