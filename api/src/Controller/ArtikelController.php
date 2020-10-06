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
     * @Route("/get", name="get_artikelen")
     */
    public function getAllArtikelen()
    {
        //probleem: te veel artikelen
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
            return new Response("Artikel verwijderd uit database");
        }
        return new Response("Artikel deleten mislukt");
    }
}
