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
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }


    /**
     * @Route("/add_dish", name="add_dish_boodschappen")
     */
    public function addDishToBoodschappen(Request $request)
    {
        $params = $request->request->all();
        
        if ($this->bss->addDishToBoodschappen($params)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }


    /**
     * @Route("/set_amount", name="set_amount_boodschappen")
     */
    public function setAmount(Request $request)
    {
        $params = $request->request->all();

        if ($this->bss->setAmount($params)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
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
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }

    
    /**
     * @Route("/delete_all/{user_id}", name="delete_all_boodschappen")
     */
    public function deleteAllBoodschappen($user_id)
    {
        if ($this->bss->deleteAllBoodschappen($user_id)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }
}
