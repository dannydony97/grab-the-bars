import React from "react";

import { Storage } from "aws-amplify";
import { useUser } from "./UserProvider";
import Post, { PostDetails } from "../schemas/Post";
import { downloadMedia, uploadMedia } from "../app-exports";

const PostContext = React.createContext(null);

const PostProvider = ({children}) => {

  const { pushPost, userDetails } = useUser();

  const share = async (mediaURIs: Array<string>, caption: string) => {

    console.log("Starting sharing!");

    const keys = await uploadMedia(mediaURIs);
    const id = await Post.add(caption, keys);
    
    await pushPost(id);

    console.log("Succesfully posted!");
  }

  const getDetails = async (_ids?: Array<Realm.BSON.ObjectId>): Promise<Array<PostDetails>> => {

    const { postIDs } = _ids !== undefined ? _ids : userDetails;
    const postsDetails: Array<PostDetails> = await Promise.all(postIDs.map(async postID => {
      const postDetails = await Post.get(postID);
      return postDetails;
    }));

    return postsDetails;
  }

  return (
    <PostContext.Provider
      value={{ share, getDetails }}
    >
      {children}
    </PostContext.Provider>
  );
}

const usePost = () => {
  const post = React.useContext(PostContext);
  if(post === null)
    throw new Error("usePost() called outside PostProvider?");

  return post;
}

export { PostProvider, usePost };