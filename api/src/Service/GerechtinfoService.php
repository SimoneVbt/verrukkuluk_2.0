<?php

namespace App\Service;

use App\Entity\Gerechtinfo;
use Doctrine\ORM\EntityManagerInterface;

class GerechtinfoService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Gerechtinfo::class);
    }

    
    public function createGerechtinfo($params)
    {
        $params["datum_huidig"] = new \DateTime(date_default_timezone_get());
        return $this->rep->createGerechtinfo($params);
    }


    public function getGerechtInfo($dish_id, $record_type)
    {
        return $this->rep->getGerechtinfo($dish_id, $record_type);
    }


    public function getFavorietenOfUser($user_id)
    {
        return $this->rep->getFavorietenOfUser($user_id);
    }
    

    public function deleteGerechtinfo($info_id)
    {
        return $this->rep->deleteGerechtinfo($info_id);
    }
}