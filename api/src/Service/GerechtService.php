<?php

namespace App\Service;

use App\Entity\Gerecht;
use Doctrine\ORM\EntityManagerInterface;

class GerechtService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Gerecht::class);
    }


    public function createGerecht($params)
    {
        $params["datum_toegevoegd"] = new \DateTime(date_default_timezone_get());
        return $this->rep->createGerecht($params);
    }


    public function getGerecht($dish_id)
    {
        return $this->rep->getGerecht($dish_id);
    }


    public function deleteGerecht($dish_id)
    {
        return $this->rep->deleteGerecht($dish_id);
    }
}