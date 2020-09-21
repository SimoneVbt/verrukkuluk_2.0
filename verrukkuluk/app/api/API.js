import schema from './Model';

const timeout = 5000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.ingredient,
            schema.gerechtinfo,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 18
});


export default class API
{
    static clearDatabase() {
        try {
            realm.beginTransaction();
            realm.deleteAll();
            realm.commitTransaction();
        }
        catch {
            return false;
        }
        finally {
            return true;
        }
    }


    static fetchFromDatabase(tableName, filter=false) {
        let results = realm.objects(tableName);
        let data = filter ? results.filtered(filter) : results;

        if (tableName != "gebruiker") {
            let dataArray = Array.from(data);
            return dataArray;
        }
        
        return data;
    }


    static fetchData = (url, tableName, filter=false) => new Promise( (resolve, reject) => {

        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(tableName, filter));
        }, timeout);

        console.log("url: " + url);

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
        
        for (item in data) {
            body.append(item, data[item]);
        }

        fetch(url, { method: 'POST', body })
            .then( result => result.json() )
            .then( result => resolve(result) )
            .catch( error => reject(error) )
    })
}