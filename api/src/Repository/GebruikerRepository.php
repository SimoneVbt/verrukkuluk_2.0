<?php

namespace App\Repository;

use App\Entity\Gebruiker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\User;


class GebruikerRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gebruiker::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof Gebruiker) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    
    public function createGebruiker($params)
    {
        $u = $this->findOneBy(['email' => $params['email']]);

        if (!$u) {
            $user = new Gebruiker();
            $user->setRoles($params['roles']);
            $user->setEmail($params['email']);
            
        } else {
            $user = $u;
            isset($params['new_email']) ? $user->setEmail($params['email']) : false;
            isset($params['afbeelding']) ? $user->setAfbeelding($params['afbeelding']) : false;
        }

        $user->setUsername($params['gebruikersnaam']);
        $user->setPassword($params['wachtwoord']);

        $em = $this->getEntityManager();
        $em->persist($user);
        $em->flush();
        return $user;
    }


    public function getGebruiker($user_id)
    {
        return $this->find($user_id);
    }


    public function deleteGebruiker($user_id)
    {
        $user = $this->find($user_id);
        if ($user) {
            $em = $this->getEntityManager();
            $this->em->remove($user);
            $this->em->flush();
            return true;
        }
        return false;
    }


    public function login($params)
    {
        $user = $this->findOneBy(["username" => $params["login"], "password" => $params["wachtwoord"]]);
        if (!$user) {
            $user = $this->findOneBy(["email" => $params["login"], "password" => $params["wachtwoord"]]);
        }
        
        return $user ? $user : null;
    }
}
