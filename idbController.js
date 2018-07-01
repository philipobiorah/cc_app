
export const databaseName = 'cc_app_db_v3';          //Database name

export default class IDBManager{

    constructor(){
        this._idbPromise = this.setupDatabase();
    }

    setupDatabase(){    // Check for browser support
        if (!navigator.serviceWorker) {
            return Promise.resolve();
        }

        return idb.open(databaseName, 1, upgrade => {
            let store = upgrade.createObjectStore(databaseName, {
                keyPath: 'query'
            });
            return store;
        });
    }

    //Save query in indexdb
    saveQueryInDatabase(query, value){

        this._idbPromise.then((db) => {

            if(!db) return;

            let transaction = db.transaction(databaseName, 'readwrite');
            let store = transaction.objectStore(databaseName);
            store.put({value:value, query:query});

        })
    }

    //obtain value from database
    getQueryValueByID(query, callBack){
        //Our ID id query in idb 
        this._idbPromise.then(db => {
            return db.transaction(databaseName).objectStore(databaseName)
                    .get(query);
        }).then(object => callBack(null, object))
        .catch(error => callBack(error, null));
        
    }
}
