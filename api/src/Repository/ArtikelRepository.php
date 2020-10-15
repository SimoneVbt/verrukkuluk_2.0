<?php

namespace App\Repository;

use App\Entity\Artikel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class ArtikelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Artikel::class);
    }
    

    public function createArtikel($params)
    {
        $article = isset($params["id"]) ? $this->find($params["id"]) : new Artikel();
        
        $article->setNaam($params["naam"]);
        isset($params["omschrijving"]) ? $article->setOmschrijving($params["omschrijving"]) : null;
        $article->setPrijs($params["prijs"]);
        $article->setEenheid($params["eenheid"]);
        $article->setVerpakking($params["verpakking"]);
        $article->setCalorieenPer100g($params["calorieen_per_100g"]);
        isset($params["omzetting_naar_g"]) ? $article->setOmzettingNaarG($params["omzetting_naar_g"]) : null;
        $article->setAfbeelding($params["afbeelding"]);

        $em = $this->getEntityManager();
        $em->persist($article);
        $em->flush();
        return $article;
    }


    public function getArtikel($article_id)
    {
        return $this->find($article_id);
    }


    public function getAllArtikelen()
    {
        return $this->findAll();
    }


    public function deleteArtikel($article_id)
    {
        $article = $this->find($article_id);
        if ($article) {
            $em = $this->getEntityManager();
            $em->remove($article);
            $em->flush();
            return true;
        }
        return false;
    }
}
