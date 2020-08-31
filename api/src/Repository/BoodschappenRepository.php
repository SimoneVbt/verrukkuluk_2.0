<?php

namespace App\Repository;

use App\Entity\Boodschappen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Boodschappen|null find($id, $lockMode = null, $lockVersion = null)
 * @method Boodschappen|null findOneBy(array $criteria, array $orderBy = null)
 * @method Boodschappen[]    findAll()
 * @method Boodschappen[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BoodschappenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Boodschappen::class);
    }

    // /**
    //  * @return Boodschappen[] Returns an array of Boodschappen objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Boodschappen
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
