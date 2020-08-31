<?php

namespace App\Repository;

use App\Entity\Gerechtinfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Gerechtinfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method Gerechtinfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method Gerechtinfo[]    findAll()
 * @method Gerechtinfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GerechtinfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Gerechtinfo::class);
    }

    // /**
    //  * @return Gerechtinfo[] Returns an array of Gerechtinfo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('g.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Gerechtinfo
    {
        return $this->createQueryBuilder('g')
            ->andWhere('g.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
