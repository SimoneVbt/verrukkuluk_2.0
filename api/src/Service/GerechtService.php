<?php

namespace App\Service;

use App\Entity\Gerecht;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\GerechtinfoService;

class GerechtService
{
    private $em;
    private $rep;
    private $gis;
    private $is;
    private $as;

    public function __construct(EntityManagerInterface $em, GerechtinfoService $gis, 
                                IngredientService $is, ArtikelService $as)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Gerecht::class);
        $this->gis = $gis;
        $this->is = $is;
        $this->as = $as;
    }


    public function createGerecht($params)
    {
        $params["datum_toegevoegd"] = new \DateTime(date_default_timezone_get());
        return $this->rep->createGerecht($params);
    }


    public function getGerecht($dish_id)
    {
        $dish = $this->rep->getGerecht($dish_id);
        $dish->gemiddeldeBeoordeling = $this->calcAverageRating($dish_id);
        $dish->calorieen = $this->calcCalories($dish_id);
        return $dish;
    }


    public function getAllGerechten()
    {
        $dishes = $this->rep->getAllGerechten();
        foreach ($dishes as $dish) {
            $dish_id = $dish->getId();
            $dish->gemiddeldeBeoordeling = $this->calcAverageRating($dish_id);
            $dish->calorieen = $this->calcCalories($dish_id);
        }
        return $dishes;
    }


    private function calcAverageRating($dish_id)
    {
        $ratings = $this->gis->getGerechtinfo($dish_id, "W");
        $totalRating = 0;
        foreach ($ratings as $rating) {
            $totalRating += $rating->getNummeriekveld();
        }
        $avgRating = $totalRating / sizeof($ratings);
        return $avgRating;
    }


    private function calcCalories($dish_id)
    {
        $calories = 0;
        $ingredients = $this->is->getDishIngredients($dish_id);

        foreach ($ingredients as $ingr) {
            $article = $this->as->getArtikel($ingr->getArtikelId());
            $unit = $article->getEenheid();
            $caloriesPer100 = $article->getCalorieenPer100g();
            $conversion = $article->getOmzettingNaarG();
            $amount = $ingr->getAantal();

            $weight = $unit === "g" ? $amount : $amount * $conversion;
            $articleCalories = ($weight / 100) * $caloriesPer100;
            $calories += $articleCalories;
        }
        $caloriesPerPerson = $calories / 4;
        return $caloriesPerPerson;
    }


    public function deleteGerecht($dish_id)
    {
        return $this->rep->deleteGerecht($dish_id);
    }
}