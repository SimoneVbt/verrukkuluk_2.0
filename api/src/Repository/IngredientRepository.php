<?php

namespace App\Repository;

use App\Entity\Ingredient;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class IngredientRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ingredient::class);
    }


    public function createIngredient($params)
    {
        $ingredient = isset($params["id"]) ? $this->find($params["id"]) : new Ingredient();

        $ingredient->setGerechtId($params["gerecht_id"]);
        $ingredient->setArtikelId($params["artikel_id"]);
        $ingredient->setAantal($params["aantal"]);

        $em = $this->getEntityManager();
        $em->persist($ingredient);
        $em->flush();
        return $ingredient;
    }


    public function getIngredient($ing_id)
    {
        return $this->find($ing_id);
    }


    public function getDishIngredients($dish_id)
    {
        $ings = $this->findBy(["gerecht_id" => $dish_id]);
        return $ings ? $ings : null;
    }


    public function deleteIngredient($ing_id)
    {
        $ingredient = $this->find($ing_id);
        if ($ingredient) {
            $em = $this->getEntityManager();
            $em->remove($ingredient);
            $em->flush();
            return true;
        }
        return false;
    }
}
