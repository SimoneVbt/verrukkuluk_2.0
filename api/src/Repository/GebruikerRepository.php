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
        $u = $this->findOneBy(array("email" => $params['email']));

        if (!$u) {
            $user = new User();
            $user->setRoles($params['roles']);
        } else {
            $user = $u;
        }
        $user->setEmail($params['email']);
        $user->setUsername($params['gebruikersnaam']);
        $user->setPassword($params['wachtwoord']);

        $_em->persist($vacature);
        $_em->flush();
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
            $this->_em->remove($user);
            $this->_em->flush();
            return true;
        }
        return false;
    }


    public function login($params)
    {
        if (isset($params['gebruikersnaam'])) {
            $success = $this->createQueryBuilder("g")
                        ->select("g.id")
                        ->where("g.username = :gebruikersnaam")
                        ->andWhere("g.password = :wachtwoord")
                        ->setParameter("gebruikersnaam", $params["gebruikersnaam"])
                        ->setParameter("wachtwoord", $params["wachtwoord"])
                        ->getQuery()
                        ->getResult()
                        ;

        } else if (isset($params['email'])) {
            $success = $this->createQueryBuilder("g")
                        ->select("g.id")
                        ->where("g.email = :email")
                        ->andWhere("g.password = :wachtwoord")
                        ->setParameter("email", $params["email"])
                        ->setParameter("wachtwoord", $params["wachtwoord"])
                        ->getQuery()
                        ->getResult()
                        ;
        }
        
        return $success ? $success : null;
    }
}
