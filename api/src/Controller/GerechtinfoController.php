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
     * @Route("/get/favorieten/{dish_id}", name="get_info_favorieten")
     */
    public function getFavorieten($dish_id)
    {
        $info = $this->gis->getFavorieten($dish_id);
        $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $info]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/get/bereiding/{dish_id}", name="get_info_bereiding")
     */
    public function getBereiding($dish_id)
    {
        $info = $this->gis->getBereiding($dish_id);
        $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $info]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/get/opmerkingen/{dish_id}", name="get_info_opmerkingen")
     */
    public function getOpmerkingen($dish_id)
    {
        $info = $this->gis->getOpmerkingen($dish_id);
        $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $info]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/get/waardering/{dish_id}", name="get_info_waardering")
     */
    public function getWaardering($dish_id)
    {
        $info = $this->gis->getWaardering($dish_id);
        $json = $this->renderView('gerechtinfo.json.twig', ["gerechtinfo" => $info]);
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
