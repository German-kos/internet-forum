import React, { createContext, useState } from "react";
import { getCommentsByThreadID, getCurrentThread } from "../functions";
//
export const ThreadContext = createContext();
export const ThreadUpdateContext = createContext();
export const CommentsContext = createContext();
export const CommentsUpdateContext = createContext();
//
export function ThreadContextProvider({ children }) {
  const [thread, setThread] = useState();
  const [comments, setComments] = useState();
  //
  const updateThreadContext = (id) => {
    setThread(getCurrentThread(id));
  };
  //
  const updateCommentsContext = (id) => {
    setComments(getCommentsByThreadID(id));
  };
  //
  return (
    <ThreadContext.Provider value={thread}>
      <ThreadUpdateContext.Provider value={updateThreadContext}>
        <CommentsContext.Provider value={comments}>
          <CommentsUpdateContext.Provider value={updateCommentsContext}>
            {children}
          </CommentsUpdateContext.Provider>
        </CommentsContext.Provider>
      </ThreadUpdateContext.Provider>
    </ThreadContext.Provider>
  );
}
