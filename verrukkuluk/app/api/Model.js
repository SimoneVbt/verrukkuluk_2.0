import { userPhotoUrl } from '../config/constants.js';

const defaultImg = userPhotoUrl + "default.png";

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
            afbeelding: "string",
            favoriet: "bool",
            waardering: { type: "int", default: 0 }
        }
    },

    gerechtinfo: {
        name: "gerechtinfo",
        primaryKey: "id",
        properties: {
            id: { type: "int", indexed: true },
            record_type: "string",
            gebruikersnaam: "string?",
            foto: "string?",
            datum_huidig: "date",
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
            foto_upload: "bool",
            foto: { type: "string", default: defaultImg },
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
            eenheid: "string",
            verpakking: "int",
            prijs: "float",
            aantal: "int",
            aantal_verpakkingen: "int",
            totale_prijs: "float"
        }
    }
    
}

export default schema;