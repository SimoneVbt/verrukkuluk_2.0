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


    public function getUserInfo($info) {
        $user = $this->gs->getGebruiker($info->getGebruikerId());
        $info->gebruikersnaam = $user->getUsername();
        $info->afbeelding = $user->getAfbeelding();
        return $info;
    }

    
    public function createGerechtinfo($params)
    {
        $params["datum"] = new \DateTime(date_default_timezone_get());
        $info = $this->rep->createGerechtinfo($params);
        
        if ($params["record_type"] === "O" && is_array($info)) {
            $info = $this->getUserInfo($info);
        }
        return $info;
    }


    public function setPrepSteps($params)
    {
        if (sizeof($params) > 0) {
            $this->rep->deletePrepSteps($params[0]["gerecht_id"]);

            $steps = [];
            foreach ($params as $obj) {
                $step = $this->createGerechtinfo($obj);
                if ($step) {
                    array_push($steps, $step);
                }
            }
            return $steps;
        }
        return false;
    }


    public function getGerechtInfo($dish_id, $record_type)
    {
        $info = $this->rep->getGerechtinfo($dish_id, $record_type);

        if ($record_type === "O" && is_array($info)) {
            foreach ($info as $inf) {
                $inf = $this->getUserInfo($inf);
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
    

    public function deleteGerechtinfo ($id)
    {
        return $this->rep->deleteGerechtinfo($id);
    }
}