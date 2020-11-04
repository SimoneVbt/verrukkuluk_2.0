<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\ArtikelService;


/**
 * @Route("api/artikel")
 */
class ArtikelController extends AbstractController
{
    private $as;

    public function __construct(ArtikelService $as)
    {
        $this->as = $as;
    }


    /**
     * @Route("/create", name="create_artikel")
     */
    public function createArtikel(Request $request)
    {
        $data = file_get_contents("php://input");
        $params = json_decode($data, true);
        $article = $this->as->createArtikel($params);

        if ($article) {
            $json = $this->renderView('artikel.json.twig', ["article" => $article]);
            $response = new Response($json);
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        return $this->json(["result" => "denied"]);
    }

    
    /**
     * @Route("/get", name="get_artikelen")
     */
    public function getAllArtikelen()
    {
        $articles = $this->as->getAllArtikelen();
        $json = $this->renderView('artikelen.json.twig', ["articles" => $articles]);
        $response = new Response($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


    /**
     * @Route("/delete/{article_id}", name="delete_artikel")
     */
    public function deleteArtikel($article_id)
    {
        if ($this->as->deleteArtikel($article_id)) {
            return $this->json(["result" => "okay"]);
        }
        return $this->json(["result" => "denied"]);
    }
}
