import schema from './Model';
import DishCard from '../components/DishCard';

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

        if (obj.user) {
            let user = this.fetchFromDatabase("gebruiker");
            url = url + user.id;

            if (obj.id) {
                url = url + "/" + obj.id;
            }

        } else if (obj.id) {
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


    static fetchFromDatabase(tableName, filter=false) {

        if (tableName != "gebruiker") {

            let results = realm.objects(tableName);
            let filteredResults = filter ? results.filtered(filter) : results;
            let sortedResults = filteredResults.sorted('id');
            let data = Array.from(sortedResults);
            return data;

        }

        let user = realm.objectForPrimaryKey(tableName, 1);
        return user;
    }


    // object: minstens url en table
    static fetchData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);

        const tm = setTimeout( () => {
            resolve(API.fetchFromDatabase(obj.table, obj.filter=false));
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


    //object: minstens url en data
    static postData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);
        const body = new FormData();
        
        for (let item in obj.data) {
            body.append(item, obj.data[item]);
        }
        
        if (obj.data.user) {
            let user = this.fetchFromDatabase("gebruiker");
            body.append("gebruiker_id", user.id);
            // body.delete("user");
            console.warn(body);
        }
        

        fetch(url, { method: 'POST', body })
            .then( result => resolve(result) )
            .catch( error => reject(error) )
    })


    //object: minstens url, table en id
    static deleteData = (obj) => new Promise( (resolve, reject) => {

        let url = this.constructUrl(obj);
        let record = realm.objectForPrimaryKey(obj.table, obj.id);
        
            fetch(url, { method: 'DELETE' })
                .then ( result => {

                     if (!obj.favo) {
                        realm.write(() => {
                            realm.delete(record);
                        })

                    } else {
                        realm.write(() => {
                            record.favoriet = false;
                        })    
                    }

                    resolve(result);

                })
                .catch( error => reject(error))  

    })
}