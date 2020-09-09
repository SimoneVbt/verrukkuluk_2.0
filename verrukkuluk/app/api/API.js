import schema from './Model';

const timeout = 10000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.keuken_type,
            schema.gerechtinfo,
            schema.ingredient,
            schema.artikel,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 4
});


export default class API
{

    static fetchFromDatabase(tableName) {
        let data = realm.objects(tableName);
        return data;
    }

    static fetchData = (url, tableName) => new Promise( (resolve, reject) => {

        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(tableName));
        }, timeout);

        fetch(url)
            .then( result => result.json())
            .then( data => {
                clearTimeout(tm);

                data.forEach( item => {
                    realm.write(() => {
                        realm.create(tableName, item, true);
                    });
                });

                resolve(data);
            })
            .catch( err => {
                clearTimeout(tm);
                console.warn(err);
            })
    })
}