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
    insertNote(state, action: PayloadAction<Note>) {
      state.notes.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getNotes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched notes to the array
        state.notes = state.notes.concat(action.payload)
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// * Create the Thunk Function with createAsyncThunk
export const getNotes = createAsyncThunk('notes/getNotes', async () => {
  const response = await axios.get('/api/notes')
  return response.data
})
// export const { getAll } = noteSlice.actions;

export default noteSlice.reducer;

// export const selectAllNotes = (state: RootState) => state.notes