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


    public function getBoodschappenInfo($bs) {
        $article = $this->as->getArtikel($bs->getArtikelId());
                
        $price = $article->getPrijs();
        $package = $article->getVerpakking();

        $bs->product = $article->getNaam();
        $bs->prijs = $price;
        $bs->eenheid = $article->getEenheid();
        $bs->verpakking = $package;
        $bs->afbeelding = $article->getAfbeelding();

        $bs->aantal_verpakkingen = ceil($bs->getAantal() / $package);
        $bs->totalePrijs = $bs->aantal_verpakkingen * $price;
        
        return $bs;
    }


    public function addToBoodschappen($params)
    {
        $bs = $this->rep->addToBoodschappen($params);
        return $this->getBoodschappenInfo($bs);
    }


    public function addDishToBoodschappen($params)
    {
        $boodschappen = [];
        $ingredients = $this->is->getDishIngredients($params["gerecht_id"]);

        foreach ($ingredients as $ingredient) {
            $params["artikel_id"] = $ingredient->getArtikelId();
            $params["aantal"] = $ingredient->getAantal();
            $bs = $this->addToBoodschappen($params);
            array_push($boodschappen, $bs);
        }
        return $boodschappen;
    }


    public function setAmount($params)
    {
        $bs = $this->rep->setAmount($params);
        return $this->getBoodschappenInfo($bs);
    }


    public function getBoodschappen($user_id)
    {
        $boodschappen = $this->rep->getBoodschappen($user_id);

        if ($boodschappen) {
            foreach ($boodschappen as $bs) {
                $bs = $this->getBoodschappenInfo($bs);
            }
            
            return $boodschappen;
        }
        return [];
    }


    public function deleteBoodschappen($bs_id)
    {
        return $this->rep->deleteBoodschappen($bs_id);
    }


    public function deleteAllBoodschappen($user_id)
    {
        return $this->rep->deleteAllBoodschappen($user_id);
    }
}