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
        $params = $request->request->all();

        if ($this->as->createArtikel($params)) {
            return new Response("Artikel bewerkt/toegevoegd aan database");
        }
        return new Response("Toevoegen/bewerken artikel mislukt");
    }

    
    /**
     * @Route("/get/{article_id}", name="get_artikel")
     */
    public function getArtikel($article_id)
    {
        $article = $this->as->getArtikel($article_id);
        $json = $this->renderView('artikel.json.twig', ["article" => $article]);
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
            return new Response("Artikel verwijderd uit database");
        }
        return new Response("Artikel deleten mislukt");
    }
}
