<?php

namespace App\Service;

use App\Entity\Gerecht;
use Doctrine\ORM\EntityManagerInterface;

class GerechtService
{
    private $em;
    private $rep;
    private $gis;
    private $is;
    private $as;
    private $kts;
    private $gs;

    public function __construct(EntityManagerInterface $em, GerechtinfoService $gis,
                                IngredientService $is, ArtikelService $as,
                                KeukenTypeService $kts, GebruikerService $gs)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Gerecht::class);
        $this->gis = $gis;
        $this->is = $is;
        $this->as = $as;
        $this->kts = $kts;
        $this->gs = $gs;
    }


    public function createGerecht($params)
    {
        $params["datum"] = new \DateTime(date_default_timezone_get());
        return $this->rep->createGerecht($params);
    }


    public function getGerecht($dish_id, $user_id)
    {
        $dish = $this->rep->getGerecht($dish_id);

        $dish->gemiddeldeBeoordeling = $this->calcAverageRating($dish_id);
        $dish->calorieen = $this->calcCalories($dish_id);
        $dish->totalePrijs = $this->calcPrice($dish_id);
        
        $dish->keuken = $this->kts->getKeukenType($dish->getKeukenId())->getOmschrijving();
        $dish->type = $this->kts->getKeukenType($dish->getTypeId())->getOmschrijving();
        $dish->gebruiker = $this->gs->getGebruiker($dish->getGebruikerId())->getUsername();

        $dish->favoriet = $this->gis->checkFavoriet($user_id, $dish_id);
        $dish->waardering = $this->gis->getWaardering($user_id, $dish_id);

        return $dish;
    }


    public function getAllGerechten($user_id)
    {
        $dishes = $this->rep->getAllGerechten();

        foreach ($dishes as $dish) {
            $dish_id = $dish->getId();
            $dish = $this->getGerecht($dish_id, $user_id);
        }
        return $dishes;
    }


    private function calcPrice($dish_id)
    {
        $totalPrice = 0;
        $ingredients = $this->is->getDishIngredients($dish_id);

        if ($ingredients) {
            foreach ($ingredients as $ingr) {
                
                $article = $this->as->getArtikel($ingr->getArtikelId());
                $artPrice = $article->getPrijs();
                $package = $article->getVerpakking();
                $amount = $ingr->getAantal();
                $price = ($amount / $package) * $artPrice;
                $totalPrice += round($price, 2);

            }
            $pricePerPerson = $totalPrice / 4;
            return $pricePerPerson;            
        }
        return $totalPrice;
    }


    private function calcAverageRating($dish_id)
    {
        $ratings = $this->gis->getGerechtinfo($dish_id, "W");
        $totalRating = 0;

        if ($ratings) {

            foreach ($ratings as $rating) {
                $totalRating += $rating->getNummeriekveld();
            }
            $avgRating = $totalRating / sizeof($ratings);
            return $avgRating;

        }
        return $totalRating;
    }


    private function calcCalories($dish_id)
    {
        $calories = 0;
        $ingredients = $this->is->getDishIngredients($dish_id);

        if ($ingredients) {
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
        return $calories;
    }


    public function deleteGerecht($dish_id)
    {
        return $this->rep->deleteGerecht($dish_id);
    }
}