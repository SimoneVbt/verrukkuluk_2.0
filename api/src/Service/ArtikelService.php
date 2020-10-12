<?php

namespace App\Service;

use App\Entity\Artikel;
use Doctrine\ORM\EntityManagerInterface;

class ArtikelService
{
    private $em;
    private $rep;
    private $ip;

    public function __construct(EntityManagerInterface $em, string $ip)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Artikel::class);
        $this->ip = $ip;
    }


    public function createArtikel($params)
    {
        return $this->rep->createArtikel($params);
    }


    public function getArtikel($article_id)
    {
        $article = $this->rep->getArtikel($article_id);
        $article->afbeelding = "http://".$this->ip."/verrukkuluk_2.0/api/public/artikelen/artikel".$article->getId().".jpg";
        return $article;
    }


    public function getAllArtikelen()
    {
        $articles = $this->getAllArtikelen();
        
        foreach ($articles as $article) {
            $article = $this->getArtikel($article->getId());
        }

        return $articles;
    }


    public function deleteArtikel($article_id)
    {
        return $this->rep->deleteArtikel($article_id);
    }
}