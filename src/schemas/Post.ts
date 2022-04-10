import Realm from "realm";
import { getCollection, POSTS_COLLECTION_NAME } from "../app-exports";

export interface PostDetails  extends Realm.Services.MongoDB.Document<Realm.BSON.ObjectId> {
  caption: string;
  mediaKeys: Array<string>;
  userLikes: Array<Realm.BSON.ObjectId>;
  date: Date;
}

export default class Post {

  public static async add(caption: string, mediaKeys: Array<string>): Promise<Realm.BSON.ObjectId> {
    
    const collection = await getCollection<PostDetails>(POSTS_COLLECTION_NAME);
    const id = await collection.insertOne({
      caption: caption,
      mediaKeys: mediaKeys,
      userLikes: [],
      date: new Date()
    });

    console.log(`Post insertion done: ${id.insertedId}`);
    return id.insertedId;
  }

  public static async get(_id: Realm.BSON.ObjectId): Promise<PostDetails> {
    if(! await this.exists(_id)) {
      throw new Error(`Post doesn't exists. ID: ${_id}`);
    }

    const collection = await getCollection<PostDetails>(POSTS_COLLECTION_NAME);
    return await collection.findOne({_id: _id});
  }

  public static async exists(_id: Realm.BSON.ObjectId): Promise<boolean> {
    const collection = await getCollection<PostDetails>(POSTS_COLLECTION_NAME)
    const count = await collection.count({_id: _id});
    return count !== 0;
  }
}