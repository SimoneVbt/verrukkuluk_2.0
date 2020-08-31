<?php

namespace App\Entity;

use App\Repository\GerechtinfoRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GerechtinfoRepository::class)
 */
class Gerechtinfo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=1)
     */
    private $record_type;

    /**
     * @ORM\Column(type="integer")
     */
    private $gerecht_id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $gebruiker_id;

    /**
     * @ORM\Column(type="date")
     */
    private $datum_huidig;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nummeriekveld;

    /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     */
    private $tekstveld;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRecordType(): ?string
    {
        return $this->record_type;
    }

    public function setRecordType(string $record_type): self
    {
        $this->record_type = $record_type;

        return $this;
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

    public function getGebruikerId(): ?int
    {
        return $this->gebruiker_id;
    }

    public function setGebruikerId(?int $gebruiker_id): self
    {
        $this->gebruiker_id = $gebruiker_id;

        return $this;
    }

    public function getDatumHuidig(): ?\DateTimeInterface
    {
        return $this->datum_huidig;
    }

    public function setDatumHuidig(\DateTimeInterface $datum_huidig): self
    {
        $this->datum_huidig = $datum_huidig;

        return $this;
    }

    public function getNummeriekveld(): ?int
    {
        return $this->nummeriekveld;
    }

    public function setNummeriekveld(?int $nummeriekveld): self
    {
        $this->nummeriekveld = $nummeriekveld;

        return $this;
    }

    public function getTekstveld(): ?string
    {
        return $this->tekstveld;
    }

    public function setTekstveld(?string $tekstveld): self
    {
        $this->tekstveld = $tekstveld;

        return $this;
    }
}
