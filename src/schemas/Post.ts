import Realm from "realm";

export default class Post {

  private _id: Realm.BSON.ObjectId;
  private caption?: string;
  private mediaKeys?: Array<string>;
  private likes?: Array<Realm.BSON.ObjectId>;

  public static schema: Realm.ObjectSchema = {
    name: "posts",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      caption: { type: "string", default: "" },
      mediaKeys: { type: "string[]", default: [] },
      likes: { type: "objectId[]", default: [] },
      date: { type: "date", default: Date.now() },
    }
  }

}