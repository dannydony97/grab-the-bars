import React from "react";

import { Storage } from "aws-amplify";
import { useUser } from "./UserProvider";
import Post from "../schemas/Post";
import { uploadMedia } from "../app-exports";

const PostContext = React.createContext(null);

export interface PostDetails {
  mediaURIs: Array<string>,
  caption: string
}

const PostProvider = ({children}) => {

  const { pushPost } = useUser();

  const share = async (postDetails: PostDetails) => {

    console.log("Starting sharing!");

    const keys = await uploadMedia(postDetails.mediaURIs);
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