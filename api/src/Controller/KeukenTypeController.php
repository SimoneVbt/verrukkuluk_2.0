<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\KeukenTypeService;


/**
 * @Route("/api/kt")
 */
class KeukenTypeController extends AbstractController
{
    private $kts;

    public function __construct (KeukenTypeService $kts)
    {
        $this->kts = $kts;
    }


    /**
     * @Route("/create", name="create_kt")
     */
    public function createKeukenType(Request $request)
    {
        $data = file_get_contents("php://input");
        $params = json_decode($data, true);

        if ($this->kts->createKeukenType($params)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }


    /**
     * @Route("/get/kitchens", name="get_kitchens")
     */
    public function getAllKeukens()
    {
        $kitchens = $this->kts->getAllKeukens();
        $json = $this->renderView('keukentype.json.twig', ["kt" => $kitchens]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/get/types", name="get_types")
     */
    public function getAllTypes()
    {
        $types = $this->kts->getAllTypes();
        $json = $this->renderView('keukentype.json.twig', ["kt" => $types]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/delete/{kt_id}", name="delete_kt")
     */
    public function deleteKeukenType($kt_id)
    {
        if ($this->kts->deleteKeukenType($kt_id)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }
}
