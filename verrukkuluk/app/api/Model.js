const schema = {

    gerecht: {
        name: "gerecht",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            keuken: { type: "string", default: "" },
            type: { type: "string", default: "" },
            gebruiker_id: "int",
            gebruiker: { type: "string", default: "" },
            datum_toegevoegd: "date",
            titel: "string",
            korte_omschrijving: "string",
            lange_omschrijving: "string",
            gemiddelde_beoordeling: { type: "float", default: 0 },
            calorieen: { type: "int", default: 0 },
            totale_prijs: { type: "string", default: "" },
            afbeelding: { type: "string", default: "" },
            favoriet_id: { type: "int", default: 0 },
            favoriet: "bool",
            waardering_id: { type: "int", default: 0 },
            waardering: { type: "int", default: 0 },
            complete: { type: "bool", default: false }
        }
    },

    gerechtinfo: {
        name: "gerechtinfo",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            gerecht_id: "int",
            record_type: "string",
            gebruiker_id: "int?",
            gebruikersnaam: "string?",
            afbeelding: "string?",
            datum: "date",
            datum_bewerkt: "date?",
            nummeriekveld: "int?",
            tekstveld: "string?"
        }
    },

    ingredient: {
        name: "ingredient",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            gerecht_id: "int",
            artikel_id: "int",
            aantal: "int",
            naam: "string",
            afbeelding: "string",
            omschrijving: "string?",
            prijs: "float",
            eenheid: "string",
            verpakking: "int",
            calorieen_per_100g: "int",
            omzetting_naar_g: "float"
        }
    },

    gebruiker: {
        name: "gebruiker",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            remote_id: "int",
            gebruikersnaam: "string",
            afbeelding: "string?",
            email: "string",
            wachtwoord: "string"
        }
    },

    boodschappen: {
        name: "boodschappen",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            artikel_id: "int",
            product: "string",
            afbeelding: "string",
            eenheid: "string",
            verpakking: "int",
            prijs: "float",
            aantal: "int",
            aantal_verpakkingen: "int",
            totale_prijs: "float"
        }
    },

    keukentype: {
        name: "keukentype",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            record_type: "string",
            omschrijving: "string"
        }    
    }
    
}

export default schema;