import schema from './Model';

const timeout = 2000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.ingredient,
            schema.gerechtinfo,
            schema.gebruiker,
            schema.boodschappen ],
    schemaVersion: 26
});


export default class API
{
    static constructUrl(obj) {

        let url = obj.url;
        let finalUrl = url;

        if (obj.id && !obj.edit) {
            let idUrl = url + obj.id;
            finalUrl = obj.userInUrl ? idUrl + "/" : idUrl;
        }

        if (obj.userInUrl) {
            let user = this.fetchFromDatabase("gebruiker", 1);
            finalUrl += user.id;
        }

        // console.warn(finalUrl);
        return finalUrl;
    }


    static fetchFromDatabase(tableName, id=false, filter=false, sort="id") {

        if (id === false) {
            let results = realm.objects(tableName);
            let filteredResults = filter ? results.filtered(filter) : results;
            let sortedResults = filteredResults.sorted(sort);
            let data = Array.from(sortedResults);
            return data;
        }

        let data = realm.objectForPrimaryKey(tableName, id);
        return data;
    }


    // object: minstens url en table
    static fetchData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);
        // console.warn(url);
        
        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(obj.table, obj.id=false, obj.filter=false, obj.sort="id"));
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
                console.warn("catch API.fetchData");
                console.warn(error);
            })
    })


    //object: minstens url, type en data (post) of id, type en table (delete)
    static postData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);
        // console.warn(url);
        const body = new FormData();

        if (obj.type === "post") {
            for (let item in obj.data) {
                body.append(item, obj.data[item]);
            }
            
            if (obj.user) {
                let user = this.fetchFromDatabase("gebruiker", 1);
                body.append("gebruiker_id", user.id);
            }
        }
        let apiObj = obj.type === "post" ? { method: 'post', body } : { method: 'delete' };
        
        fetch(url, apiObj)
            .then( result => {

                obj.type === "post" ? this.writeData(obj):
                obj.type === "delete" ? this.deleteDataFromDatabase(obj) : false;

                resolve(result);
            })
            .catch( error => {
                console.warn("catch API.postData");
                console.warn(error);
                reject(error);
            } )
    })
    

    static writeData(obj) {

        if (obj.data.record_type === "F") {
            let dish = this.fetchFromDatabase("gerecht", obj.data.gerecht_id);
            realm.write(() => {
                dish.favoriet = true;
            })
        }
    }
    

    static deleteDataFromDatabase(obj) {

        if (!obj.noDelete) {
            let record = realm.objectForPrimaryKey(obj.table, obj.id);
            realm.write(() => {
                realm.delete(record);
            })

        } else if (obj.favo) {
            let record = realm.objectForPrimaryKey(obj.table, obj.dish_id);
            realm.write(() => {
                record.favoriet = false;
                record.favoriet_id = 0;
            })
        }
    }


    static login = (url, login, password) => new Promise( (resolve, reject) => {
        const body = new FormData();
        body.append("login", login);
        body.append("wachtwoord", password);

        fetch(url, { method: 'POST', body })
        .then( result => result.json() )
        .then( result => resolve(result) )
        .catch( error => reject(error) )
    })


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
}