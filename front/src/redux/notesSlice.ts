import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Note } from "../components/NotesList";

type notesState = {
  notes: Note[],
  status: string
  error: string | null | undefined,
}

const initialState: notesState = {
  notes: [],
  status: 'idle',
  error: null,
}

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    insert(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        // Copy previous state and add new notes fetched
        return {
          ...state,
          status: 'succeeded',
          notes: action.payload
        }
      })

      // * Insert extra reducer
      .addCase(insert.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })

      // * Delete extra reducer
      .addCase(deleteNote.fulfilled, (state, action) => {
        // Filter state with the missing note
        state.notes = state.notes.filter(
          note => note.id !== action.payload
        )
      })

  },
})

// * Thunk function for fetching all notes
export const getAll = createAsyncThunk('notes/getAll', async () => {
  const response = await axios.get('/api/notes')
  return response.data
})

// * Add notes
export const insert = createAsyncThunk(
  'notes/insert',
  async (note: Partial<Note>, thunkAPI) => {
    const response = await axios.post('/api/notes', note)
    return response.data
  }
)

// * Delete note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id:number, thunkAPI) => {
    const response = await axios.delete(`/api/notes/${id}`)
    return response.data
  }
)

// * Update note
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (note: Partial<Note>, thunkAPI) => {
    const response = await axios.put(`/api/notes/${note.id}`, note)
    thunkAPI.dispatch(getAll())
    return response.data
  }
)

export default noteSlice.reducer;

// export const selectAllNotes = (state: RootState) => state.notes