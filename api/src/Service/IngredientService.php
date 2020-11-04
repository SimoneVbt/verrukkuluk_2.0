<?php

namespace App\Service;

use App\Entity\Ingredient;
use Doctrine\ORM\EntityManagerInterface;

class IngredientService
{
    private $em;
    private $rep;
    private $as;

    public function __construct(EntityManagerInterface $em, ArtikelService $as)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Ingredient::class);
        $this->as = $as;
    }


    public function getIngredientInfo($ingr) {
        $art = $this->as->getArtikel($ingr->getArtikelId());
        $ingr->naam = $art->getNaam();
        $ingr->afbeelding = $art->getAfbeelding();
        $ingr->omschrijving = $art->getOmschrijving();
        $ingr->prijs = $art->getPrijs();
        $ingr->eenheid = $art->getEenheid();
        $ingr->verpakking = $art->getVerpakking();
        $ingr->calorieenPer100g = $art->getCalorieenPer100g();
        $ingr->omzettingNaarG = $art->getOmzettingNaarG();
        return $ingr;
    }


    public function createIngredient($params)
    {
        $ingr = $this->rep->createIngredient($params);
        $ingr = $this->getIngredientInfo($ingr);
        return $ingr;
    }


    public function getIngredient($ing_id)
    {
        return $this->rep->getIngredient($ing_id);
    }

    
    public function getDishIngredients($dish_id)
    {
        $ingredients = $this->rep->getDishIngredients($dish_id);

        if ($ingredients) {
            foreach ($ingredients as $ingr) {
                $ingr = $this->getIngredientInfo($ingr);
            }
            return $ingredients;
        }
        return [];
    }


    public function deleteIngredient($ing_id)
    {
        return $this->rep->deleteIngredient($ing_id);
    }
}