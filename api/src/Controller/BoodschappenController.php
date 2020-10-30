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
     * @Route("/add", name="add_boodschappen")
     */
    public function addToBoodschappen(Request $request)
    {
        $params = $request->request->all();

        if ($this->bss->addToBoodschappen($params)) {
            return new Response("Toevoegen artikel aan boodschappen gelukt");
        }
        return new Response("Toevoegen aan artikel aan boodschappen mislukt");
    }


    /**
     * @Route("/add_dish", name="add_dish_boodschappen")
     */
    public function addDishToBoodschappen(Request $request)
    {
        $params = $request->request->all();
        
        if ($this->bss->addDishToBoodschappen($params)) {
            return new Response("Gerechtingrediënten succesvol toegevoegd aan boodschappen");
        }
        return new Response("Gerechtingrediënten toevoegen aan boodschappen mislukt");
    }


    /**
     * @Route("/set_amount", name="set_amount_boodschappen")
     */
    public function setAmount(Request $request)
    {
        $params = $request->request->all();

        if ($this->bss->setAmount($params)) {
            return new Response("Aantal succesvol aangepast");
        }
        return new Response("Aantal aanpassen mislukt");
    }

    
    /**
     * @Route("/get/{user_id}", name="get_boodschappen")
     */
    public function getBoodschappen($user_id)
    {
        $bs = $this->bss->getBoodschappen($user_id);
        $json = $this->renderView('boodschappen.json.twig', ["boodschappen" => $bs]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/delete/{bs_id}", name="delete_boodschappen")
     */
    public function deleteBoodschappen($bs_id)
    {
        if ($this->bss->deleteBoodschappen($bs_id)) {
            return new Response("Artikel succesvol verwijderd uit database");
        }
        return new Response("Artikel verwijderen uit boodschappen mislukt");
    }

    
    /**
     * @Route("/delete_all/{user_id}", name="delete_all_boodschappen")
     */
    public function deleteAllBoodschappen($user_id)
    {
        if ($this->bss->deleteAllBoodschappen($user_id)) {
            return new Response("Boodschappen succesvol verwijderd uit database");
        }
        return new Response("Boodschappen verwijderen mislukt");
    }
}
