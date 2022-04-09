import Realm from "realm";
import { getCollection, USERS_COLLECTION_NAME } from "../app-exports";

export interface UserDetails extends Realm.Services.MongoDB.Document<Realm.BSON.ObjectId> {
  userID: Realm.BSON.ObjectId;
  username: string;
  description: string;
  postIDs: Array<Realm.BSON.ObjectId>;
  profileImageKey: string | null;
  coverImageKey: string | null;
  followers: Array<Realm.BSON.ObjectId>;
  following: Array<Realm.BSON.ObjectId>;
  joinedDate: Date;
}

export default class User {

  public static async add(userID: Realm.BSON.ObjectId, username: string): Promise<Realm.BSON.ObjectId> {
    
    if(await this.exists(userID)) {
      throw new Error("User already exists!");
    }

    const collection = await getCollection<UserDetails>(USERS_COLLECTION_NAME);
    const id = await collection.insertOne({
      userID: userID,
      username: username,
      description: "",
      postIDs: [],
      profileImageKey: null,
      coverImageKey: null,
      followers: [],
      following: [],
      joinedDate: new Date()
    });

    console.log(`User insertion done: ${id.insertedId}`);
    return id.insertedId;
  }

  public static async get(userID: Realm.BSON.ObjectId): Promise<UserDetails> {

    if(! await this.exists(userID)) {
      throw new Error("User doesn't exist!");
    }

    const collection = await getCollection<UserDetails>(USERS_COLLECTION_NAME);
    return await collection.findOne({userID: userID});
  }

  public static async exists(userID: Realm.BSON.ObjectId) : Promise<boolean> {
    const collection = await getCollection<UserDetails>(USERS_COLLECTION_NAME);
    const count = await collection.count({userID: userID});
    return count !== 0;
  }
}