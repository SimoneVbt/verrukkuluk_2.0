<?php

namespace App\Entity;

use App\Repository\ArtikelRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArtikelRepository::class)
 */
class Artikel
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $naam;

    /**
     * @ORM\Column(type="string", length=60, nullable=true)
     */
    private $omschrijving;

    /**
     * @ORM\Column(type="decimal", precision=5, scale=2)
     */
    private $prijs;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $eenheid;

    /**
     * @ORM\Column(type="integer")
     */
    private $verpakking;

    /**
     * @ORM\Column(type="integer")
     */
    private $calorieen_per_100g;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $omzetting_naar_g;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNaam(): ?string
    {
        return $this->naam;
    }

    public function setNaam(string $naam): self
    {
        $this->naam = $naam;

        return $this;
    }

    public function getOmschrijving(): ?string
    {
        return $this->omschrijving;
    }

    public function setOmschrijving(?string $omschrijving): self
    {
        $this->omschrijving = $omschrijving;

        return $this;
    }

    public function getPrijs(): ?string
    {
        return $this->prijs;
    }

    public function setPrijs(string $prijs): self
    {
        $this->prijs = $prijs;

        return $this;
    }

    public function getEenheid(): ?string
    {
        return $this->eenheid;
    }

    public function setEenheid(string $eenheid): self
    {
        $this->eenheid = $eenheid;

        return $this;
    }

    public function getVerpakking(): ?int
    {
        return $this->verpakking;
    }

    public function setVerpakking(int $verpakking): self
    {
        $this->verpakking = $verpakking;

        return $this;
    }

    public function getCalorieenPer100g(): ?int
    {
        return $this->calorieen_per_100g;
    }

    public function setCalorieenPer100g(int $calorieen_per_100g): self
    {
        $this->calorieen_per_100g = $calorieen_per_100g;

        return $this;
    }

    public function getOmzettingNaarG(): ?float
    {
        return $this->omzetting_naar_g;
    }

    public function setOmzettingNaarG(float $omzetting_naar_g): self
    {
        $this->omzetting_naar_g = $omzetting_naar_g;

        return $this;
    }
}
