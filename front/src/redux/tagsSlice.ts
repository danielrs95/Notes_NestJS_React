import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Tag } from "../components/NotesList";

type tagsState = {
  tags: Tag[],
  status: string,
}

const initialState: tagsState = {
  tags: [],
  status: 'idle',
}

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllTags.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          tags: action.payload
        }
      })

      // * Mutate state after add tag
      // .addCase(addTag.fulfilled, (state, action) => {
      //   return {
      //     ...state,
      //     status: 'succeeded',
      //     tags: action.payload
      //   }
      // })
  },
})

// * Get all tags
export const getAllTags = createAsyncThunk(
  'tags/getAllTags',
  async () => {
    const response = await axios.get('/api/tags')
    return response.data
  }
)

// * Add tag
export const addTag = createAsyncThunk(
  'tags/addTag',
  async (tag: Partial<Tag>, thunkAPI) => {
    const response = await axios.post('/api/tags', tag)
    thunkAPI.dispatch(getAllTags())
    return response.data
  }
)

export default tagSlice.reducer;