const gerechtSchema = {
    name: "gerecht",
    primaryKey: "id",
    properties: {
        id: { type: "int", indexed: true },
        keuken_id: "int",
        type_id: "int",
        gebruiker_id: "int",
        datum_toegevoegd: "date",
        titel: "string",
        korte_omschrijving: "string",
        lange_omschrijving: "string",
        gemiddelde_beoordeling: { type: "float", default: 0 },
        calorieen: { type: "int", default: 0 }
    }
}

const keukenTypeSchema = {
    name: "keuken_type",
    primaryKey: "id",
    properties: {
        id: { type: "int", indexed: true },
        record_type: "string",
        omschrijving: "string"
    }
}

export {
    gerechtSchema, keukenTypeSchema
};