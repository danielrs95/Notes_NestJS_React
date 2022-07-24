import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Note, Tag } from "../components/NotesList";

type notesState = {
  notes: Note[],
  status: string,
  error: string | null | undefined,
  showingArchived: boolean,
  idLastUpdatedNote: number,
}

const initialState: notesState = {
  notes: [],
  status: 'idle',
  error: null,
  showingArchived: false,
  idLastUpdatedNote: 0,
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
        // Copy previous state and add new notes fetched
        return {
          ...state,
          status: 'succeeded',
          showingArchived: false,
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

      // * getArchived extra reducer
      .addCase(getAllArchived.fulfilled, (state, action) => {
        return {
          ...state,
          status: 'succeeded',
          showingArchived: true,
          notes: action.payload
        }
      })

      // * addTag extra reducer
      .addCase(addTag.fulfilled, (state, action) => {
        const noteId = action.payload.note.id
        state.notes.map(note => note.id === noteId ? note.tags.push(action.payload) : note)
        state.idLastUpdatedNote = noteId
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

// * Get Archived Notes
export const getAllArchived = createAsyncThunk(
  'notes/getAllArchived',
  async (_, thunkAPI) => {
    const response = await axios.get('/api/notes/archived')
    return response.data
  }
)

// * Archive Note
export const archiveNote = createAsyncThunk(
  'notes/archiveNote',
  async (note: Partial<Note>, thunkAPI) => {
    const modifiedNote = {
      ...note,
      archived: true,
    }
    const response = await axios.put(`/api/notes/${note.id}`, modifiedNote)
    thunkAPI.dispatch(getAll())
    return response.data
  }
)

// * Restore Note
export const restoreNote = createAsyncThunk(
  'notes/restoreNote',
  async (note: Partial<Note>, thunkAPI) => {
    const modifiedNote = {
      ...note,
      archived: false,
    }
    const response = await axios.put(`/api/notes/${note.id}`, modifiedNote)
    thunkAPI.dispatch(getAll())
    return response.data
  }
)

// * Inser Tag
export const addTag = createAsyncThunk(
  'notes/addTag',
  async (tag: Partial<Tag>, thunkAPI) => {
    const response = await axios.post('/api/tags', tag)
    return response.data
  }
)

export default noteSlice.reducer;

// export const selectAllNotes = (state: RootState) => state.notes