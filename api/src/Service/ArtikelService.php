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


    public function deleteArtikel($article_id)
    {
        return $this->rep->deleteArtikel($article_id);
    }
}