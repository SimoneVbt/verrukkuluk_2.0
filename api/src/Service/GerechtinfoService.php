<?php

namespace App\Service;

use App\Entity\Gerechtinfo;
use Doctrine\ORM\EntityManagerInterface;

class GerechtinfoService
{
    private $em;
    private $rep;
    private $gs;

    public function __construct(EntityManagerInterface $em, GebruikerService $gs)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Gerechtinfo::class);
        $this->gs = $gs;
    }

    
    public function createGerechtinfo($params)
    {
        $params["datum_huidig"] = new \DateTime(date_default_timezone_get());
        return $this->rep->createGerechtinfo($params);
    }


    public function getGerechtInfo($dish_id, $record_type)
    {
        $info = $this->rep->getGerechtinfo($dish_id, $record_type);
        foreach ($info as $inf) {
            if ($inf->getRecordType() === "O") {
                $user = $this->gs->getGebruiker($inf->getGebruikerId());
                $inf->gebruikersnaam = $user->getUsername();
                $inf->foto = $user->foto;
            }
        }
        return $info;
    }


    public function checkFavoriet($user_id, $dish_id)
    {
        return $this->rep->checkFavoriet($user_id, $dish_id);
    }


    public function getWaardering($user_id, $dish_id)
    {
        return $this->rep->getWaardering($user_id, $dish_id);
    }
    

    public function deleteGerechtinfo($info_id)
    {
        return $this->rep->deleteGerechtinfo($info_id);
    }
}