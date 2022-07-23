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
      .addCase(getAll.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.status = 'succeeded'

        // Add any fetched notes to the array
        state.notes = state.notes.concat(action.payload)
      })
      .addCase(getAll.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(insert.fulfilled, (state, action) => {
        state.notes.push(action.payload)
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

export default noteSlice.reducer;

// export const selectAllNotes = (state: RootState) => state.notes