<?php

namespace App\Service;

use App\Entity\Boodschappen;
use Doctrine\ORM\EntityManagerInterface;

class BoodschappenService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Boodschappen::class);
    }


    public function addToBoodschappen($params)
    {
        return $this->rep->addToBoodschappen($params);
    }


    public function addDishToBoodschappen($dish_id)
    {
        //... loopen over addToBoodschappen?
    }


    public function getBoodschappen($user_id)
    {
        return $this->rep->getBoodschappen($user_id);
    }


    public function deleteBoodschappen($bs_id)
    {
        return $this->rep->deleteBoodschappen($bs_id);
    }
}