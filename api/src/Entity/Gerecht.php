<?php

namespace App\Entity;

use App\Repository\GerechtRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GerechtRepository::class)
 */
class Gerecht
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
    private $keuken_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $type_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $gebruiker_id;

    /**
     * @ORM\Column(type="date")
     */
    private $datum_toegevoegd;

    /**
     * @ORM\Column(type="string", length=40)
     */
    private $titel;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $korte_omschrijving;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lange_omschrijving;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getKeukenId(): ?int
    {
        return $this->keuken_id;
    }

    public function setKeukenId(int $keuken_id): self
    {
        $this->keuken_id = $keuken_id;

        return $this;
    }

    public function getTypeId(): ?int
    {
        return $this->type_id;
    }

    public function setTypeId(int $type_id): self
    {
        $this->type_id = $type_id;

        return $this;
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

    public function getDatumToegevoegd(): ?\DateTimeInterface
    {
        return $this->datum_toegevoegd;
    }

    public function setDatumToegevoegd(\DateTimeInterface $datum_toegevoegd): self
    {
        $this->datum_toegevoegd = $datum_toegevoegd;

        return $this;
    }

    public function getTitel(): ?string
    {
        return $this->titel;
    }

    public function setTitel(string $titel): self
    {
        $this->titel = $titel;

        return $this;
    }

    public function getKorteOmschrijving(): ?string
    {
        return $this->korte_omschrijving;
    }

    public function setKorteOmschrijving(string $korte_omschrijving): self
    {
        $this->korte_omschrijving = $korte_omschrijving;

        return $this;
    }

    public function getLangeOmschrijving(): ?string
    {
        return $this->lange_omschrijving;
    }

    public function setLangeOmschrijving(string $lange_omschrijving): self
    {
        $this->lange_omschrijving = $lange_omschrijving;

        return $this;
    }
}
