<?php

namespace App\Service;

use App\Entity\Gebruiker;
use Doctrine\ORM\EntityManagerInterface;

class GebruikerService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Gebruiker::class);
    }
    

    public function createGebruiker($params) {
        $user = $this->rep->createGebruiker($params);
        return $user->getId();
    }


    public function getGebruiker($user_id) {
        return $this->rep->getGebruiker($user_id);
    }


    public function deleteGebruiker($user_id) {
        return $this->rep->deleteGebruiker($user_id);
    }


    public function login($params) {
        return $this->rep->login($params);
    }
}