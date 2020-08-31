<?php

namespace App\Repository;

use App\Entity\Boodschappen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class BoodschappenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Boodschappen::class);
    }
    

    public function addToBoodschappen($params)
    {
        $bs = isset($params["id"]) ? $this->find($params["id"]) : new Boodschappen();

        $bs->setGebruikerId($params["gebruiker_id"]);
        $bs->setArtikelId($params["artikel_id"]);
        $bs->setAantal($params["aantal"]);

        $em = $this->getEntityManager();
        $em->persist($bs);
        $em->flush();
        return $em;
    }


    public function getBoodschappen($user_id)
    {
        $bs = $this->createQueryBuilder('b')
                ->select('b')
                ->where('b.gebruiker_id :gebruiker_id')
                ->setParameter('gebruiker_id', $user_id)
                ->getQuery()
                ->getResult()
                ;
        return $bs ? $bs : null;
    }


    public function deleteBoodschappen($bs_id)
    {   
        $bs = $this->find($bs_id);
        if ($bs) {
            $em = $this->getEntityManager();
            $em->remove($bs);
            $em->flush();
            return true;
        }
        return false;
    }
}
