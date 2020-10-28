<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\GebruikerService;


/**
 * @Route("/api/gebruiker")
 */
class GebruikerController extends AbstractController
{
    private $gs;

    public function __construct(GebruikerService $gs)
    {
        $this->gs = $gs;
    }


    /**
     * @Route("/create", name="create_gebruiker")
     */
    public function createGebruiker(Request $request)
    {
        $params = $request->request->all();
        
        if ($this->gs->createGebruiker($params)) {
            return new Response("Gebruiker aangemaakt/gewijzigd");
        }
        return new Response ("Gebruiker aanmaken/bewerken mislukt");
    }

    /**
     * @Route("/get/{user_id}", name="get_gebruiker")
     */
    public function getGebruiker($user_id)
    {
        $user = $this->gs->getGebruiker($user_id);
        $json = $this->renderView('gebruiker.json.twig', ["user" => $user]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/delete/{user_id}", name="delete_gebruiker")
     */
    public function deleteGebruiker($user_id)
    {
        if ($this->gs->deleteGebruiker($user_id)) {
            return new Response("Gebruiker gedeletet");
        }
        return new Response("Deleten gebruiker mislukt");
    }

    /**
     * @Route("/login", name="login")
     */
    public function login(Request $request)
    {
        $params = $request->request->all();
        $id = $this->gs->login($params);
        
        return $this->json(["id" => $id]);
    }
}
