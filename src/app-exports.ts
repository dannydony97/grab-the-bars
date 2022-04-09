export const SERVICE_NAME: string = "mongodb-atlas";
export const DATABASE_NAME: string = "grab_the_bars";
export const USERS_COLLECTION_NAME: string = "users";
export const POSTS_COLLECTION_NAME: string = "posts";

import Realm from "realm";
import app from "../realmApp";

import { Storage } from "aws-amplify";

export async function getCollection<T extends Realm.Services.MongoDB.Document = any>(collectionName: string): Promise<Realm.Services.MongoDB.MongoDBCollection<T>> {

  const user = app.currentUser;
  if(user === null) {
    throw new Error("User cannot be retrieved!");
  }
  return user.mongoClient(SERVICE_NAME).db(DATABASE_NAME).collection<T>(collectionName);
}

export async function uploadMedia(mediaURIs: Array<string>) : Promise<Array<string>> {
  const results = await Promise.all(mediaURIs.map(async mediaUri => {
    const content = await fetch(mediaUri);
    const blob = await content.blob();
    const name = "image_" + Date.now();
    return await Storage.put(name, blob, {
      contentType: blob.type,
    });
  }));

  console.log(`Amplify storage uploaded count ${results.length}`);
  const keys = results.map(result => result.key);
  return keys;
}

export async function downloadMedia(mediaKeys: Array<string>): Promise<Array<string>> {
  const results = await Promise.all(mediaKeys.map(async mediaKey => {
    const signedURI = Storage.get(mediaKey);
    return signedURI;
  }));

  console.log(`Amplify storage downloaded count ${results.length}`);
  return results;
}

export interface DeleteMediaReturnProps {
  deletedCount: number;
}
export async function deleteMedia(mediaKeys: Array<string>): Promise<DeleteMediaReturnProps> {
  const results = await Promise.all(mediaKeys.map(async mediaKey => {
    const result = Storage.remove(mediaKey);
    return result;
  }));

  console.assert(mediaKeys.length === results.length, "Failed to delete one ore more keys!");

  console.log(`Amplify storage deleted count ${results.length}`);
  return {
    deletedCount: results.length
  };
}