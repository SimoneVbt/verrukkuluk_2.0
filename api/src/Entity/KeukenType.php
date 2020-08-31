<?php

namespace App\Entity;

use App\Repository\KeukenTypeRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=KeukenTypeRepository::class)
 */
class KeukenType
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
     * @ORM\Column(type="string", length=20)
     */
    private $omschrijving;

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

    public function getOmschrijving(): ?string
    {
        return $this->omschrijving;
    }

    public function setOmschrijving(string $omschrijving): self
    {
        $this->omschrijving = $omschrijving;

        return $this;
    }
}
