import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./redux/notesSlice";
import tagsReducer from "./redux/tagsSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    tags: tagsReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch