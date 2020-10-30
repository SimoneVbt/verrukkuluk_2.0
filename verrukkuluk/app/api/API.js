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
    schemaVersion: 36
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
        
        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(obj.table,
                                            obj.id ? obj.id : false,
                                            obj.filter ? obj.filter : false,
                                            obj.sort ? obj.sort : "id"));
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


    //object: minstens url, type en data (post) of id, type en table (delete)
    static postData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);
        const body = new FormData();

        if (obj.type === "post") {
            for (let item in obj.data) {
                body.append(item, obj.data[item]);
            }
            
            if (obj.user) {
                let user = this.fetchFromDatabase("gebruiker", 1);
                body.append("gebruiker_id", user.remote_id);
            }
        }
        let apiObj = obj.type === "post" ?
                    { method: 'post', body} :
                    { method: 'delete' };
        
        fetch(url, apiObj)
            .then( result => {

                obj.type === "post" ? this.writeData(obj) :
                obj.type === "delete" ? this.deleteDataFromDatabase(obj) : false;

                resolve(result);
            })
            .catch( error => {
                console.warn("catch API.postData");
                console.warn(error);
                console.warn(url);
                reject(error);
            })
    })
    

    static writeData(obj) {

        if (obj.table) {

            if (obj.table === "gebruiker") {
                obj.data.remote_id = obj.data.id;
                obj.data.id = 1
            }
            realm.write(() => {
                realm.create(obj.table, obj.data, true);
            })
            console.warn("API.writeData: object toegevoegd");
        }

        if (obj.data.record_type === "F") {
            let dish = this.fetchFromDatabase("gerecht", obj.data.gerecht_id);
            realm.write(() => {
                dish.favoriet = true;
            })
        }
    }
    

    static deleteDataFromDatabase(obj) {

        if (obj.favo) {
            let record = realm.objectForPrimaryKey("gerecht", obj.dish_id);
            realm.write(() => {
                record.favoriet = false;
                record.favoriet_id = 0;
            })
        } else if (obj.deleteAll) {
            let table = realm.objects(obj.table);
            realm.write(() => {
                realm.delete(table);
            })
        } else if (!obj.noDelete) {
            let record = realm.objectForPrimaryKey(obj.table, obj.id);
            realm.write(() => {
                realm.delete(record);
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
            console.warn("fout bij clearDatabase()");
            return false;
        }
        finally {
            return true;
        }
    }
}