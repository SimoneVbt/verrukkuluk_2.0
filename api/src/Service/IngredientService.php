<?php

namespace App\Service;

use App\Entity\Ingredient;
use Doctrine\ORM\EntityManagerInterface;

class IngredientService
{
    private $em;
    private $rep;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Ingredient::class);
    }


    public function createIngredient($params)
    {
        return $this->rep->createIngredient($params);
    }


    public function getIngredient($ing_id)
    {
        return $this->rep->getIngredient($ing_id);
    }


    public function deleteIngredient($ing_id)
    {
        return $this->rep->deleteIngredient($ing_id);
    }
}