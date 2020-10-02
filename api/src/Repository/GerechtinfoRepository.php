<?php

namespace App\Repository;

use App\Entity\Gerechtinfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class GerechtinfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gerechtinfo::class);
    }


    public function createGerechtinfo($params)
    {
        if (isset($params["id"])) {
            $info =  $this->find($params["id"]);
            $info->setDatumBewerkt($params["datum"]);

        } else {
            $info = new Gerechtinfo();
            $info->setDatum($params["datum"]);
            $info->setRecordType($params["record_type"]);
            $info->setGerechtId($params["gerecht_id"]);
                
            if (isset($params["gebruiker_id"])) {
                $info->setGebruikerId($params["gebruiker_id"]);
            }       
        }

        if (isset($params["nummeriekveld"])) {
            $info->setNummeriekveld($params["nummeriekveld"]);
        }
        if (isset($params["tekstveld"])) {
            $info->setTekstveld($params["tekstveld"]);
        }

        $em = $this->getEntityManager();
        $em->persist($info);
        $em->flush();
        return $info;
    }


    public function getGerechtinfo($dish_id, $record_type) 
    {
        $info = $this->findBy(["gerecht_id" => $dish_id, "record_type" => $record_type]);
        return $info ? $info : null;
    }


    public function checkFavoriet($user_id, $dish_id)
    {
        $favo = $this->findOneBy(["record_type" => "F", "gebruiker_id" => $user_id, "gerecht_id" => $dish_id]);
        return $favo ? $favo : false;
    }


    public function getWaardering($user_id, $dish_id)
    {
        $rating = $this->findOneBy(["record_type" => "W", "gebruiker_id" => $user_id, "gerecht_id" => $dish_id]);
        return $rating ? $rating : false;
    }


    public function deleteGerechtinfo($info_id)
    {
        $info = $this->find($info_id);
        if ($info) {
            $em = $this->getEntityManager();
            $em->remove($info);
            $em->flush();
            return true;
        }
        return false;
    }
}
