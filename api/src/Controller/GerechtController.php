<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\GerechtService;


/**
 * @Route("/api/gerecht")
 */
class GerechtController extends AbstractController
{
    private $gs;

    public function __construct(GerechtService $gs)
    {
        $this->gs = $gs;
    }


    /**
     * @Route("/create", name="create_gerecht")
     */
    public function createGerecht(Request $request)
    {
        $data = file_get_contents("php://input");
        $params = json_decode($data, true);
        $dish = $this->gs->createGerecht($params);

        if ($dish) {
            $json = $this->renderView('gerecht.json.twig', ["dish" => $dish]);
            $response = new Response($json);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return $this->json(["id" => -1]);
    }


    /**
     * @Route("/get/{dish_id}/{user_id}", name="get_gerecht")
     */
    public function getGerecht($dish_id, $user_id)
    {
        $dish = $this->gs->getGerecht($dish_id, $user_id);
        $json = $this->renderView('gerecht.json.twig', ["dish" => $dish]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/get_all/{user_id}", name="get_gerechten")
     */
    public function getAllGerechten($user_id)
    {
        $dishes = $this->gs->getAllGerechten($user_id);
        $json = $this->renderView('gerechten.json.twig', ["dishes" => $dishes]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    
    /**
     * @Route("/delete/{dish_id}", name="delete_gerecht")
     */
    public function deleteGerecht($dish_id)
    {
        if ($this->gs->deleteGerecht($dish_id)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }
}
