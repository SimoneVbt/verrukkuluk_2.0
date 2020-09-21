<?php

namespace App\Service;

use App\Entity\Boodschappen;
use Doctrine\ORM\EntityManagerInterface;

class BoodschappenService
{
    private $em;
    private $rep;
    private $is;
    private $as;

    public function __construct(EntityManagerInterface $em, IngredientService $is, ArtikelService $as)
    {
        $this->em = $em;
        $this->rep = $em->getRepository(Boodschappen::class);
        $this->is = $is;
        $this->as = $as;
    }


    public function addToBoodschappen($params)
    {
        return $this->rep->addToBoodschappen($params);
    }


    public function addDishToBoodschappen($params)
    {
        $ingredients = $this->is->getDishIngredients($params["gerecht_id"]);

        foreach ($ingredients as $ingredient) {
            $params["artikel_id"] = $ingredient->getArtikelId();
            $params["aantal"] = $ingredient->getAantal();
            $this->addToBoodschappen($params);
        }
        return true;
    }


    public function setAmount($params)
    {
        return $this->rep->setAmount($params);
    }


    public function getBoodschappen($user_id)
    {
        $boodschappen = $this->rep->getBoodschappen($user_id);
        
        foreach ($boodschappen as $bs) {
            $article = $this->as->getArtikel($bs->getArtikelId());
            $product = $article->getNaam();
            $price = $article->getPrijs();
            $unit = $article->getEenheid();
            $package = $article->getVerpakking();

            $bs->product = $product;
            $bs->prijs = $price;
            $bs->eenheid = $unit;
            $bs->verpakking = $package;

            $bs->aantal_verpakkingen = ceil($bs->getAantal() / $package);
            $bs->totalePrijs = $bs->aantal_verpakkingen * $price;
        }
        
        return $boodschappen;
    }


    public function deleteBoodschappen($bs_id)
    {
        return $this->rep->deleteBoodschappen($bs_id);
    }
}