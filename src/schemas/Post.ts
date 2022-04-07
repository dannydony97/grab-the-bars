import Realm from "realm";
import { getCollection, POSTS_COLLECTION_NAME } from "../app-exports";

interface PostDetails  extends Realm.Services.MongoDB.Document<Realm.BSON.ObjectId> {
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
    if(!this.exists(_id)) {
      throw new Error("Post doesn't exists!");
    }

    const collection = await getCollection<PostDetails>(POSTS_COLLECTION_NAME);
    return await collection.findOne({_id: _id});
  }

  public static exists(_id: Realm.BSON.ObjectId) {
    let exists = false;
    getCollection<PostDetails>(POSTS_COLLECTION_NAME)
    .then(collection =>  collection.count({_id: _id}))
    .then(count => {
      exists = count !== 0;
    });

    return exists;
  }
}