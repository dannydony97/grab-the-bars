import Realm from "realm";
import Post from "./Post";

interface UserDetails {
  userID: Realm.BSON.ObjectId;
  username: string;
  description?: string;
  posts?: Array<Realm.BSON.ObjectId>;
  profileImageKey?: string | undefined;
  coverImageKey?: string | undefined;
  followers?: Array<Realm.BSON.ObjectId>;
  following?: Array<Realm.BSON.ObjectId>;
  joinedDate?: Date;
}

export default class User {

  private _id: Realm.BSON.ObjectId;
  private userDetails: UserDetails;

  public constructor(userDetails: UserDetails) {
    this.userDetails = userDetails;
  }

  public async write() {

    try{
      const realm = await Realm.open({
        schema: [User.schema],
      });

      realm.write(() => {
        const user = realm.create("User", {
          
        })
      })

      realm.close();
    } catch(err) {
      console.error("User writting failed!", err);
    }
  }

  public static schema: Realm.ObjectSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      userID: "objectId",
      description: { type: "string", default: "" },
      posts: { type: "Post[]", default: [] },
      profileImageKey: { type: "string", default: "" },
      coverImageKey: { type: "string", default: "" },
      followers: { type: "objectId[]", default: [] },
      following: { type: "objectId[]", default: [] },
      joinedDate: { type: "date", default: Date.now() },
    }
  }

}