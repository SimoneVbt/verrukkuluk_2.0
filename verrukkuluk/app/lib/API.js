import * as schema from './model';

const timeout = 10;

let realm = new Realm({
    schema: [ schema.content ],
    schemaVersion: 1
});

export default class Api
{
    //...
}