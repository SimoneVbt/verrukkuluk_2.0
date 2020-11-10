<?php

namespace App\Repository;

use App\Entity\Gerecht;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class GerechtRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gerecht::class);
    }
    
    
    public function createGerecht($params)
    {
        if (isset($params["id"])) {
            $dish = $this->find($params["id"]);
            isset($params["complete"]) ? $dish->setComplete($params["complete"]) : $dish->setDatumBewerkt($params["datum"]);

        } else {
            $dish = new Gerecht();
            $dish->setDatumToegevoegd($params["datum"]);
            $dish->setGebruikerId($params["gebruiker_id"]);
            $dish->setComplete(false);
        }

        isset($params["keuken_id"]) ? $dish->setKeukenId($params["keuken_id"]) : false;
        isset($params["type_id"]) ? $dish->setTypeId($params["type_id"]) : false;
        isset($params["titel"]) ? $dish->setTitel($params["titel"]) : false;
        isset($params["korte_omschrijving"]) ? $dish->setKorteOmschrijving($params["korte_omschrijving"]) : false;
        isset($params["lange_omschrijving"]) ? $dish->setLangeOmschrijving($params["lange_omschrijving"]) : false;
        isset($params["afbeelding"]) ? $dish->setAfbeelding($params["afbeelding"]) : false;

        $em = $this->getEntityManager();
        $em->persist($dish);
        $em->flush();
        return $dish;
    }


    public function getGerecht($dish_id)
    {
        return $this->find($dish_id);
    }

    
    public function getAllGerechten()
    {
        return $this->findAll();
    }


    public function deleteGerecht($dish_id)
    {
        $dish = $this->find($dish_id);
        if ($dish) {
            $em = $this->getEntityManager();
            $em->remove($dish);
            $em->flush();
            return true;
        }
        return false;
    }
}
