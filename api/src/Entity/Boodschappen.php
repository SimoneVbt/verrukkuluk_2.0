<?php

namespace App\Entity;

use App\Repository\BoodschappenRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BoodschappenRepository::class)
 */
class Boodschappen
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
    private $gebruiker_id;

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

    public function getGebruikerId(): ?int
    {
        return $this->gebruiker_id;
    }

    public function setGebruikerId(int $gebruiker_id): self
    {
        $this->gebruiker_id = $gebruiker_id;

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
