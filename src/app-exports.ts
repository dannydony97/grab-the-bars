export const SERVICE_NAME: string = "mongodb-atlas";
export const DATABASE_NAME: string = "grab_the_bars";
export const USERS_COLLECTION_NAME: string = "users";
export const POSTS_COLLECTION_NAME: string = "posts";

import Realm from "realm";
import app from "../realmApp";

export async function getCollection<T extends Realm.Services.MongoDB.Document = any>(collectionName: string): Promise<Realm.Services.MongoDB.MongoDBCollection<T>> {

  const user = app.currentUser;
  if(user === null) {
    throw new Error("User cannot be retrieved!");
  }
  return user.mongoClient(SERVICE_NAME).db(DATABASE_NAME).collection<T>(collectionName);
}