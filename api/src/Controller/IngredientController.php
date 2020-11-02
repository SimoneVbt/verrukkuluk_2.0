<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\IngredientService;


/**
 * @Route("/api/ingredient")
 */
class IngredientController extends AbstractController
{
    private $is;

    public function __construct(IngredientService $is)
    {
        $this->is = $is;
    }


    /**
     * @Route("/create", name="create_ingredient")
     */
    public function createIngredient(Request $request)
    {
        $params = $request->request->all();

        if ($this->is->createIngredient($params)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }


    /**
     * @Route("/get/{dish_id}", name="get_ingredients")
     */
    public function getDishIngredients($dish_id)
    {
        $ingredients = $this->is->getDishIngredients($dish_id);
        $json = $this->renderView('ingredienten.json.twig', ["ingredienten" => $ingredients]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/delete/{ing_id}", name="delete_ingredient")
     */
    public function deleteIngredient($ing_id)
    {
        if ($this->is->deleteIngredient($ing_id)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }
}
