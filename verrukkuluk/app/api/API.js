import schema from './Model';

const timeout = 5000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.gerechtinfo,
            schema.ingredient,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 9
});


export default class API
{
    static fetchFromDatabase(tableName) {
        let data = realm.objects(tableName);

        if (tableName != "gebruiker") {
            let dataArray = Array.from(data);
            return dataArray;
        }

        return data;
    }


    static fetchData = (url, tableName) => new Promise( (resolve, reject) => {

        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(tableName));
        }, timeout);

        fetch(url)
            .then( result => result.json() )
            .then( data => {
                clearTimeout(tm);

                if (Array.isArray(data)) {
                    data.forEach( item => {
                        realm.write(() => {
                            realm.create(tableName, item, true);
                        });
                    });                    
                } else {
                    realm.write(() => {
                        realm.create(tableName, data, true)
                    })
                }
                
                resolve(data);
            })
            .catch( error => {
                clearTimeout(tm);
                console.warn(error);
            })
    })


    static postData = (url, data) => new Promise( (resolve, reject) => {

        const body = new FormData();
        body.append("login", data.login);
        body.append("wachtwoord", data.wachtwoord);

        fetch(url, { method: 'POST', body })
            .then( result => result.json() )
            .then( result => resolve(result) )
            .catch( error => reject(error) )
    })
}