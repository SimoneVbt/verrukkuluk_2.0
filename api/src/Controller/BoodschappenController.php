<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\BoodschappenService;


/**
 * @Route("/api/boodschappen")
 */
class BoodschappenController extends AbstractController
{
    private $bss;

    public function __construct(BoodschappenService $bss)
    {
        $this->bss = $bss;
    }

    
    /**
     * @Route("/get/{user_id}", name="get_boodschappen")
     */
    public function getBoodschappen($user_id)
    {
        // =================WERKT NOT NIET=================
        $bs = $this->bss->getBoodschappen($user_id);
        $json = $this->renderView('boodschappen.json.twig', ["boodschappen" => $bs]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
