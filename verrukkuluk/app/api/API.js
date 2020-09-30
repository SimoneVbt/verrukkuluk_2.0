import schema from './Model';

const timeout = 5000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.ingredient,
            schema.gerechtinfo,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 19
});


export default class API
{
    static constructUrl(obj) {

        let url = obj.url;

        if (obj.userInUrl) {
            let user = this.fetchFromDatabase("gebruiker", 1);
            url = url + user.id;
        }

        if (obj.userInUrl && obj.id) {
            url = url + "/";
        }

        if (obj.id) {
            url = url + obj.id
        }

        return url;
    }


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


    static fetchFromDatabase(tableName, id=false, filter=false) {

        if (id === false) {
            let results = realm.objects(tableName);
            let filteredResults = filter ? results.filtered(filter) : results;
            let sortedResults = filteredResults.sorted('id');
            let data = Array.from(sortedResults);
            return data;
        }

        let data = realm.objectForPrimaryKey(tableName, id);
        return data;
    }


    // object: minstens url en table
    static fetchData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);

        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(obj.table, false, obj.filter=false));
        }, timeout);

        fetch(url)
            .then( result => result.json() )
            .then( data => {
                clearTimeout(tm);

                if (Array.isArray(data)) {
                    data.forEach( item => {
                        realm.write(() => {
                            realm.create(obj.table, item, true);
                        });
                    });

                } else {
                    realm.write(() => {
                        realm.create(obj.table, data, true)
                    })
                }
                
                resolve(data);
            })
            .catch( error => {
                clearTimeout(tm);
                console.warn(error);
            })
    })


    static writeData(obj) {

        if (obj.data.record_type === "F") {
            let dish = this.fetchFromDatabase("gerecht", obj.data.gerecht_id);
            realm.write(() => {
                dish.favoriet = true;
            })
        }
    }


    //object: minstens url en data
    static postData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);
        const body = new FormData();
        
        for (let item in obj.data) {
            body.append(item, obj.data[item]);
        }
        
        if (obj.data.user) {
            let user = this.fetchFromDatabase("gebruiker", 1);
            body.append("gebruiker_id", user.id);
        }
        
        fetch(url, { method: 'POST', body })
            .then( result => {
                
                if (obj.write) {
                    this.writeData(obj);
                }
                resolve(result)
            })
            .catch( error => {
                console.warn("error")
                reject(error) 
            } )
    })


    static login = (url, login, password) => new Promise( (resolve, reject) => {
        const body = new FormData();
        body.append("login", login);
        body.append("wachtwoord", password);

        fetch(url, { method: 'POST', body })
        .then( result => result.json() )
        .then( result => resolve(result) )
        .catch( error => reject(error) )
    })


    static deleteDataFromDatabase(obj) {

        if (obj.favo || obj.rating) {
            let record = realm.objectForPrimaryKey(obj.table, obj.id);

            if (obj.favo) {
                realm.write(() => {
                    record.favoriet = false;
                })
            }
            if (obj.rating) { //voorlopige versie, nog niet gebruikt
                realm.write(() => {
                    record.waardering = obj.rating;
                })                
            }
            
        } else {
            realm.write(() => {
                realm.delete(record);
            }) 
        }
    }


    //object: minstens url, table en id
    static deleteData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);

            fetch(url, { method: 'DELETE' })
                .then ( result => {

                    this.deleteDataFromDatabase(obj);
                    resolve(result);

                })
                .catch( error => reject(error))  

    })
}