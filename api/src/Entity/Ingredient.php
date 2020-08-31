<?php

namespace App\Entity;

use App\Repository\IngredientRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IngredientRepository::class)
 */
class Ingredient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $gerecht_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $artikel_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $aantal;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGerechtId(): ?int
    {
        return $this->gerecht_id;
    }

    public function setGerechtId(int $gerecht_id): self
    {
        $this->gerecht_id = $gerecht_id;

        return $this;
    }

    public function getArtikelId(): ?int
    {
        return $this->artikel_id;
    }

    public function setArtikelId(int $artikel_id): self
    {
        $this->artikel_id = $artikel_id;

        return $this;
    }

    public function getAantal(): ?int
    {
        return $this->aantal;
    }

    public function setAantal(int $aantal): self
    {
        $this->aantal = $aantal;

        return $this;
    }
}
