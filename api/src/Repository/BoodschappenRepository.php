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
        $check = $this->findOneBy(["gebruiker_id" => $params["gebruiker_id"], "artikel_id" => $params["artikel_id"]]);
        $id = $check ? $check->getId() : null;

        if ($id) {
            $bs = $this->find($id);
            $amount = $params["aantal"] + $bs->getAantal();
            $bs->setAantal($amount);
            
        } else {
            $bs = new Boodschappen();
            $bs->setGebruikerId($params["gebruiker_id"]);
            $bs->setArtikelId($params["artikel_id"]);
            $bs->setAantal($params["aantal"]);
        }

        $em = $this->getEntityManager();
        $em->persist($bs);
        $em->flush();
        return $em;
    }


    public function setAmount($params)
    {
        $bs = $this->find($params["id"]);
        if ($bs) {
            $bs->setAantal($params["aantal"]);
            $em = $this->getEntityManager();
            $em->persist($bs);
            $em->flush();
            return true;
        }
        return false;
    }


    public function getBoodschappen($user_id)
    {
        $bs = $this->findBy(["gebruiker_id" => $user_id]);
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

    
    public function deleteAllBoodschappen($user_id)
    {
        $bs = $this->getBoodschappen($user_id);
        if ($bs) {
            $em = $this->getEntityManager();
            foreach ($bs as $b) {
                $em->remove($b);
            }
            $em->flush();
            return true;
        }
        return false;
    }
}
