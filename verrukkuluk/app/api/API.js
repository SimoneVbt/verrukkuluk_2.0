import schema from './Model';

const timeout = 5000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.keuken_type,
            schema.gerechtinfo,
            schema.ingredient,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 7
});


export default class API
{

    static fetchFromDatabase(tableName) {
        let objects = realm.objects(tableName);
        let data = Array.from(objects);
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