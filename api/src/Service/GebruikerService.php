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
        return $this->rep->createGebruiker($params);
    }


    public function getGebruiker($user_id) {
        $user = $this->rep->getGebruiker($user_id);
        $ip = "192.168.0.109";
        // $ip = "192.168.1.244";

        if ($user->getFotoUpload()) {
            $user->foto = "http://".$ip."/verrukkuluk_2.0/api/public/gebruikers/gebruiker".$user->getId().".jpg";
        }
        return $user;
    }


    public function deleteGebruiker($user_id) {
        return $this->rep->deleteGebruiker($user_id);
    }


    public function login($params) {
        return $this->rep->login($params);
    }
}