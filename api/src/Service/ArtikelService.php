<?php

namespace App\Service;

use App\Entity\Artikel;
use Doctrine\ORM\EntityManagerInterface;

class ArtikelService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Artikel::class);
    }


    public function createArtikel($params)
    {
        return $this->rep->createArtikel($params);
    }


    public function getArtikel($article_id)
    {
        return $this->rep->getArtikel($article_id);
    }


    public function getAllArtikelen()
    {
        $articles = $this->getAllArtikelen();

        // $ip = "192.168.0.109";
        // $ip = "192.168.1.244";
        $ip = "192.168.11.112";
        
        foreach ($articles as $article) {
            $article->afbeelding = "http://".$ip."/verrukkuluk_2.0/api/public/artikelen/artikel".$article->getId().".jpg";
        }

        return $articles;
    }


    public function deleteArtikel($article_id)
    {
        return $this->rep->deleteArtikel($article_id);
    }
}