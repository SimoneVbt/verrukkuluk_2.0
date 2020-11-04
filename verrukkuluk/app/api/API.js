import schema from './Model';

const timeout = 2000;

let realm = new Realm({
    schema: [ schema.gerecht,
            schema.ingredient,
            schema.gerechtinfo,
            schema.gebruiker,
            schema.boodschappen,
            schema.keukentype,
            schema.artikel ],
    schemaVersion: 37
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
            finalUrl += user.remote_id;
        }

        // console.warn(finalUrl);
        return finalUrl;
    }


    static fetchFromDatabase(tableName, id=false, filter=false, sort="id", order=false) {

        if (id === false) {
            let results = realm.objects(tableName);
            let filteredResults = filter ? results.filtered(filter) : results;
            let sortedResults = filteredResults.sorted(sort, order);
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
            let table = obj.table;
            let id = obj.id ? obj.id : false;
            let filter = obj.filter ? obj.filter : false;
            let sort = obj.sort ? obj.sort : "id";

            resolve(API.fetchFromDatabase(table, id, filter, sort));
        }, timeout);

        const options = { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }

        fetch(url, options)
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
                console.warn(url);
            })
    })


    static fetchUser() {
        return this.fetchFromDatabase("gebruiker", 1);
    }


    //object: minstens url, type, table en data (post) of id, type en table (delete)
    static postData = (obj) => new Promise( (resolve, reject) => {

        const url = this.constructUrl(obj);

        if (obj.user) {
            let user = this.fetchUser();
            obj.data.gebruiker_id = user.remote_id;
        }
        
        const options = { 
            method: obj.type,
            body: JSON.stringify(obj.data),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        fetch(url, options)
            .then( result => result.json() )
            .then( result => {

                obj.type === "post" && !obj.noWrite ? this.writeData(obj, result) :
                obj.type === "delete" && !obj.noDelete ? this.deleteDataFromDatabase(obj) : false;

                resolve(result);
            })
            .catch( error => {
                console.warn("catch API.postData: " + error);
                console.warn(url);
                reject(error);
            })
    })


    static addInfo(obj, apiResult) {
        let record_type = obj.data.record_type;
        let dish = this.fetchFromDatabase("gerecht", obj.data.gerecht_id);

        if (record_type === "F") {
            realm.write(() => {
                dish.favoriet = true;
                dish.favoriet_id = apiResult.id;
            })
            return true;
        }
        
        if (record_type === "W") {
            realm.write(() => {
                dish.waardering = apiResult.nummeriekveld;
                dish.favoriet_id = apiResult.id;
            })
            return true;
        }
    }
    

    static writeData(obj, apiResult) {

        if (obj.data.record_type === "F" || obj.data.record_type === "W") {
            this.addInfo(obj, apiResult);
            return true;
        }

        try {

            if (obj.table === "gebruiker") {
                apiResult.remote_id = apiResult.id;
                apiResult.id = 1
            }

            if (Array.isArray(apiResult)) {
                apiResult.forEach( item => {
                    realm.write(() => {
                        realm.create(obj.table, item, true);
                    });
                });
                
            } else {
                realm.write(() => {
                    realm.create(obj.table, apiResult, true)
                })
            }

        } catch {
            console.warn("toevoegen van info aan realm mislukt");
            return false;

        } finally {
            return true;
        }
        

    }
    

    static deleteDataFromDatabase(obj) {

        if (obj.favo) {
            let dish = this.fetchFromDatabase("gerecht", obj.gerecht_id);
            realm.write(() => {
                dish.favoriet = false;
                dish.favoriet_id = 0;
            })
            return true;

        } else if (obj.deleteAll) {
            let table = realm.objects(obj.table);
            realm.write(() => {
                realm.delete(table);
            })
            return true;
        }

        try {
            let record = realm.objectForPrimaryKey(obj.table, obj.id);
            realm.write(() => {
                realm.delete(record);
            })   

        } catch {
            console.warn ("verwijderen van info uit realm mislukt");
            return false;

        } finally {
            return true;
        }

    }


    static clearDatabase() {
        try {
            realm.beginTransaction();
            realm.deleteAll();
            realm.commitTransaction();
        }
        catch {
            console.warn("fout bij clearDatabase()");
            return false;
        }
        finally {
            return true;
        }
    }
}