<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\GerechtinfoService;


/**
 * @Route("/api/gerechtinfo")
 */
class GerechtinfoController extends AbstractController
{
    private $gis;

    public function __construct(GerechtinfoService $gis)
    {
        $this->gis = $gis;
    }


    /**
     * @Route("/create", name="create_gerechtinfo")
     */
    public function createGerechtinfo(Request $request)
    {
        $data = file_get_contents("php://input");
        $params = json_decode($data, true);
        $info = $this->gis->createGerechtinfo($params);

        if ($info) {
            $json = $this->renderView('gerechtinfo_enkel.json.twig', ["info" => $info]);
            $response = new Response($json);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return $this->json(["result" => "denied"]);
    }


    /**
     * @Route("/set_prep_steps", name="set_prep_steps")
     */
    public function setPrepSteps(Request $request)
    {
        $data = file_get_contents("php://input");
        $params = json_decode($data, true);
        $steps = $this->gis->setPrepSteps($params);

        if ($steps) {
            $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $steps]);
            $response = new Response($json);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return $this->json(["result" => "denied"]);
    }


    /**
     * @Route("/get/{record_type}/{dish_id}", name="get_gerechtinfo",
     *          requirements={ "record_type"="\D", "dish_id"="\d+" })
     */
    public function getGerechtinfo($dish_id, $record_type)
    {
        $info = $this->gis->getGerechtinfo($dish_id, $record_type);
        $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $info]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/get/favorieten/user/{user_id}", name="get_info_favorieten_user")
     */
    public function getFavorietenOfUser($user_id)
    {
        $favos = $this->gis->getFavorietenOfUser($user_id);
        $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $favos]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/delete/{id}", name="delete_gerechtinfo")
     */
    public function deleteGerechtinfo($id)
    {
        if ($this->gis->deleteGerechtinfo($id)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }
}
