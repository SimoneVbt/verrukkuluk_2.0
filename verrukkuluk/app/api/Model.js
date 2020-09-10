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
            totale_prijs: { type: "string", default: "" }
        }
    },

    gerechtinfo: {
        name: "gerechtinfo",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            record_type: "string",
            gerecht_id:  "int",
            gebruiker_id: "int?",
            datum_huidig: "date",
            nummeriekveld: "int?",
            tekstveld: "string?"
        }
    },

    keuken_type: {
        name: "keuken_type",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            record_type: "string",
            omschrijving: "string"
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
            gebruikersnaam: "string",
            roles: "string[]"
        }
    },

    boodschappen: {
        name: "boodschappen",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            artikel_id: "int",
            aantal: "int"
        }
    }
    
}

export default schema;