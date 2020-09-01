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
        $params = $request->request->all();

        if ($this->gis->createGerechtinfo($params)) {
            return new Response("Gerechtinfo bewerkt/toegevoegd aan database");
        }
        return new Response("Toevoegen/bewerken gerechtinfo mislukt");
    }


    /**
     * @Route("/get/{record_type}/{dish_id}", name="get_gerechtinfo")
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
     * @Route("/delete/{info_id}", name="delete_gerechtinfo")
     */
    public function deleteGerechtinfo($info_id)
    {
        if ($this->gis->deleteGerechtinfo($info_id)) {
            return new Response("Gerechtinfo succesvol verwijderd uit database");
        }
        return new Response("Verwijderen gerechtinfo mislukt");
    }
}
