<?php

namespace App\Repository;

use App\Entity\KeukenType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class KeukenTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, KeukenType::class);
    }

    
    public function createKeukenType($params)
    {
        $kt = isset($params["id"]) ? $this->find($params["id"]) : new KeukenType();
        
        $kt->setRecordType($params["record_type"]);
        $kt->setOmschrijving($params["omschrijving"]);

        $em = $this->getEntityManager();
        $em->persist($kt);
        $em->flush();
        return $kt;
    }


    // nu K en T samen (want allebei nodig): beter apart?
    public function getAllKeukenTypes()
    {
        return $this->findAll();
    }


    public function deleteKeukenType($kt_id)
    {
        $kt = $this->find($kt_id);
        if ($kt) {
            $em = $this->getEntityManager();
            $em->remove($kt);
            $em->flush();
            return true;
        }
        return false;
    }
}
