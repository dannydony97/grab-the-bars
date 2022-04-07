import React from "react";

import { Storage } from "aws-amplify";
import { useAuth } from "./AuthProvider";
import { useUser } from "./UserProvider";
import Post from "../schemas/Post";

const PostContext = React.createContext(null);

export interface PostDetails {
  mediaURIs: Array<string>,
  caption: string
}

const PostProvider = ({children}) => {

  const { pushPost } = useUser();

  const share = async (postDetails: PostDetails) => {

    console.log("Starting sharing!");

    const results = await Promise.all(postDetails.mediaURIs.map(async mediaUri => {
      const content = await fetch(mediaUri);
      const blob = await content.blob();
      const name = "image_" + Date.now();
      return await Storage.put(name, blob, {
        contentType: blob.type,
      });
    }));

    const keys = results.map(result => result.key);

    const id = await Post.add(postDetails.caption, keys);
    
    await pushPost(id);

    console.log("Succesfully posted!");
  }

  return (
    <PostContext.Provider
      value={{ share }}
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