import schema from './Model';

const timeout = 5000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.keuken_type,
            schema.gerechtinfo,
            schema.ingredient,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 8
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

        // headers & JSON.stringify worden niet door server geaccepteerd: lege array komt aan

        fetch(url, { method: 'POST', body })
            .then( result => {
                console.warn("stap 1");
                console.warn(result.text()); //"status: 200, ok" i.p.v. response, result.json() geeft onzin
                result.json();
            })
            .then( response => {
                console.warn("stap 2");
                console.warn(response);
                resolve(response);
            })
            .catch( error => {
                console.warn("error");
                console.warn(error);
                reject(error)
            })
            
    })
}