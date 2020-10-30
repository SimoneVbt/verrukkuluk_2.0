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
            $dish->setDatumBewerkt($params["datum"]);
                
            if (isset($params["complete"])) {
                $dish->setComplete($params["complete"]);
            }
            if (isset($params["ingr_set"])) {
                $dish->setIngrSet($params["ingr_set"]);
            }
            if (isset($params["bereiding_set"])) {
                $dish->setBereidingSet($params["bereiding_set"]);
            }

        } else {
            $dish = new Gerecht();
            $dish->setDatumToegevoegd($params["datum"]);
        }

        $dish->setKeukenId($params["keuken_id"]);
        $dish->setTypeId($params["type_id"]);
        $dish->setGebruikerId($params["gebruiker_id"]);
        $dish->setTitel($params["titel"]);
        $dish->setKorteOmschrijving($params["korte_omschrijving"]);
        $dish->setLangeOmschrijving($params["lange_omschrijving"]);
        $dish->setAfbeelding($params["afbeelding"]);

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
