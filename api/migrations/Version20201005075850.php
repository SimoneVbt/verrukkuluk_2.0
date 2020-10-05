<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201005075850 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE artikel CHANGE prijs prijs NUMERIC(5, 2) NOT NULL');
        $this->addSql('ALTER TABLE boodschappen DROP FOREIGN KEY boodschappen_ibfk_2');
        $this->addSql('ALTER TABLE boodschappen DROP FOREIGN KEY boodschappen_ibfk_3');
        $this->addSql('DROP INDEX artikel_id ON boodschappen');
        $this->addSql('DROP INDEX gebruiker_id ON boodschappen');
        $this->addSql('ALTER TABLE gebruiker CHANGE username username VARCHAR(180) NOT NULL, CHANGE password password VARCHAR(255) NOT NULL, CHANGE foto_upload foto_upload TINYINT(1) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_89DCDB1FF85E0677 ON gebruiker (username)');
        $this->addSql('ALTER TABLE gerecht DROP FOREIGN KEY gerecht_ibfk_1');
        $this->addSql('ALTER TABLE gerecht DROP FOREIGN KEY gerecht_ibfk_2');
        $this->addSql('ALTER TABLE gerecht DROP FOREIGN KEY gerecht_ibfk_3');
        $this->addSql('DROP INDEX user_id ON gerecht');
        $this->addSql('DROP INDEX titel ON gerecht');
        $this->addSql('DROP INDEX keuken_id ON gerecht');
        $this->addSql('DROP INDEX type_id ON gerecht');
        $this->addSql('ALTER TABLE gerecht CHANGE korte_omschrijving korte_omschrijving VARCHAR(255) NOT NULL, CHANGE lange_omschrijving lange_omschrijving VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE gerechtinfo DROP FOREIGN KEY gerechtinfo_ibfk_1');
        $this->addSql('ALTER TABLE gerechtinfo DROP FOREIGN KEY gerechtinfo_ibfk_2');
        $this->addSql('DROP INDEX gerecht_id ON gerechtinfo');
        $this->addSql('DROP INDEX user_id ON gerechtinfo');
        $this->addSql('ALTER TABLE ingredient DROP FOREIGN KEY ingredient_ibfk_1');
        $this->addSql('ALTER TABLE ingredient DROP FOREIGN KEY ingredient_ibfk_2');
        $this->addSql('DROP INDEX artikel_id ON ingredient');
        $this->addSql('DROP INDEX gerecht_id ON ingredient');
        $this->addSql('ALTER TABLE keuken_type CHANGE record_type record_type VARCHAR(1) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE artikel CHANGE prijs prijs NUMERIC(3, 2) NOT NULL');
        $this->addSql('ALTER TABLE boodschappen ADD CONSTRAINT boodschappen_ibfk_2 FOREIGN KEY (artikel_id) REFERENCES artikel (id)');
        $this->addSql('ALTER TABLE boodschappen ADD CONSTRAINT boodschappen_ibfk_3 FOREIGN KEY (gebruiker_id) REFERENCES gebruiker (id)');
        $this->addSql('CREATE INDEX artikel_id ON boodschappen (artikel_id)');
        $this->addSql('CREATE INDEX gebruiker_id ON boodschappen (gebruiker_id)');
        $this->addSql('DROP INDEX UNIQ_89DCDB1FF85E0677 ON gebruiker');
        $this->addSql('ALTER TABLE gebruiker CHANGE username username VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, CHANGE password password VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, CHANGE foto_upload foto_upload TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE gerecht CHANGE korte_omschrijving korte_omschrijving TINYTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`, CHANGE lange_omschrijving lange_omschrijving TEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`');
        $this->addSql('ALTER TABLE gerecht ADD CONSTRAINT gerecht_ibfk_1 FOREIGN KEY (gebruiker_id) REFERENCES gebruiker (id)');
        $this->addSql('ALTER TABLE gerecht ADD CONSTRAINT gerecht_ibfk_2 FOREIGN KEY (keuken_id) REFERENCES keuken_type (id)');
        $this->addSql('ALTER TABLE gerecht ADD CONSTRAINT gerecht_ibfk_3 FOREIGN KEY (type_id) REFERENCES keuken_type (id)');
        $this->addSql('CREATE INDEX user_id ON gerecht (gebruiker_id)');
        $this->addSql('CREATE UNIQUE INDEX titel ON gerecht (titel)');
        $this->addSql('CREATE INDEX keuken_id ON gerecht (keuken_id)');
        $this->addSql('CREATE INDEX type_id ON gerecht (type_id)');
        $this->addSql('ALTER TABLE gerechtinfo ADD CONSTRAINT gerechtinfo_ibfk_1 FOREIGN KEY (gerecht_id) REFERENCES gerecht (id)');
        $this->addSql('ALTER TABLE gerechtinfo ADD CONSTRAINT gerechtinfo_ibfk_2 FOREIGN KEY (gebruiker_id) REFERENCES gebruiker (id)');
        $this->addSql('CREATE INDEX gerecht_id ON gerechtinfo (gerecht_id)');
        $this->addSql('CREATE INDEX user_id ON gerechtinfo (gebruiker_id)');
        $this->addSql('ALTER TABLE ingredient ADD CONSTRAINT ingredient_ibfk_1 FOREIGN KEY (artikel_id) REFERENCES artikel (id)');
        $this->addSql('ALTER TABLE ingredient ADD CONSTRAINT ingredient_ibfk_2 FOREIGN KEY (gerecht_id) REFERENCES gerecht (id)');
        $this->addSql('CREATE INDEX artikel_id ON ingredient (artikel_id)');
        $this->addSql('CREATE INDEX gerecht_id ON ingredient (gerecht_id)');
        $this->addSql('ALTER TABLE keuken_type CHANGE record_type record_type VARCHAR(2) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_general_ci`');
    }
}
