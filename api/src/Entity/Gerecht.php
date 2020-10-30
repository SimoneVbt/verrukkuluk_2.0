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
     * @ORM\Column(type="string", length=50)
     */
    private $titel;

    /**
     * @ORM\Column(type="string", length=250)
     */
    private $korte_omschrijving;

    /**
     * @ORM\Column(type="string", length=1500)
     */
    private $lange_omschrijving;

    /**
     * @ORM\Column(type="boolean")
     */
    private $complete;

    /**
     * @ORM\Column(type="string", length=1000000)
     */
    private $afbeelding;

    /**
     * @ORM\Column(type="date", nullable=true)
     */
    private $datum_bewerkt;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $ingr_set;

    /**
     * @ORM\Column(type="boolean")
     */
    private $bereiding_set;

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

    public function getComplete(): ?bool
    {
        return $this->complete;
    }

    public function setComplete(bool $complete): self
    {
        $this->complete = $complete;

        return $this;
    }

    public function getAfbeelding(): ?string
    {
        return $this->afbeelding;
    }

    public function setAfbeelding(string $afbeelding): self
    {
        $this->afbeelding = $afbeelding;

        return $this;
    }

    public function getDatumBewerkt(): ?\DateTimeInterface
    {
        return $this->datum_bewerkt;
    }

    public function setDatumBewerkt(?\DateTimeInterface $datum_bewerkt): self
    {
        $this->datum_bewerkt = $datum_bewerkt;

        return $this;
    }

    public function getIngrSet(): ?bool
    {
        return $this->ingr_set;
    }

    public function setIngrSet(?bool $ingr_set): self
    {
        $this->ingr_set = $ingr_set;

        return $this;
    }

    public function getBereidingSet(): ?bool
    {
        return $this->bereiding_set;
    }

    public function setBereidingSet(bool $bereiding_set): self
    {
        $this->bereiding_set = $bereiding_set;

        return $this;
    }
}
