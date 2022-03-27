import Realm from "realm";

export class User{

    _id: Realm.BSON.ObjectId;
    username: string;

    static generate(username: string) {
        return {
            _id: new Realm.BSON.ObjectId(),
            username,
            joinedAt: new Date()
        };
    }

    static schema = {
        name: "User",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            username: "string",
            joinedAt: "date"
        },
    };
}