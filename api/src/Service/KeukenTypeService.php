<?php

namespace App\Service;

use App\Entity\KeukenType;
use Doctrine\ORM\EntityManagerInterface;

class KeukenTypeService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(KeukenType::class);
    }


    public function createKeukenType($params)
    {
        return $this->rep->createKeukenType($params);
    }


    public function getAllKeukenTypes()
    {
        return $this->rep->getAllKeukenTypes();
    }


    public function deleteKeukenType($kt_id)
    {
        return $this->rep->deleteKeukenType($kt_id);
    }
}