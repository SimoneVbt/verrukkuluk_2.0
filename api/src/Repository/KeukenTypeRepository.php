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


    public function getKeukenType($kt_id)
    {
        return $this->find($kt_id);
    }


    public function getAllKeukens()
    {
        return $this->findBy(["record_type" => "K"], ["omschrijving" => "ASC"]);
    }


    public function getAllTypes()
    {
        return $this->findBy(["record_type" => "T"], ["omschrijving" => "ASC"]);
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
