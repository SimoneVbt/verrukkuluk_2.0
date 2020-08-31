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


    public function getFavorieten($dish_id)
    {
        $record_type = "F";
        return $this->rep->getGerechtinfo($dish_id, $record_type);
    }


    public function getBereiding($dish_id)
    {
        $record_type = "B";
        return $this->rep->getGerechtinfo($dish_id, $record_type);
    }


    public function getOpmerkingen($dish_id)
    {
        $record_type = "O";
        return $this->rep->getGerechtinfo($dish_id, $record_type);
    }


    public function getWaardering($dish_id)
    {
        $record_type = "W";
        return $this->rep->getGerechtinfo($dish_id, $record_type);
    }


    public function deleteGerechtinfo($info_id)
    {
        return $this->rep->deleteGerechtinfo($info_id);
    }
}