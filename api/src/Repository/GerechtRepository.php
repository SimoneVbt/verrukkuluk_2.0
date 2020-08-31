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
        $dish = isset($params["id"]) ? $this->find($params["id"]) : new Gerecht();

        //...
    }


    public function getGerecht($dish_id)
    {
        return $this->find($dish_id);
    }


    public function deleteDish($dish_id)
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
