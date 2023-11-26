import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from './dataService'
import { extractErrorMessage } from '../../utils'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Get all tickets
export const getAll = createAsyncThunk(
  'data/getAll',
  async (_, thunkAPI) => {
    try {
      return await dataService.getAll()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update ticket status
export const updateStatus = createAsyncThunk(
  'data/updateStatus',
  async (ticketId, thunkAPI) => {
    try {
      return await dataService.updateStatus(ticketId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
)

// Open ticket status
export const openStatus = createAsyncThunk(
  'data/openStatus',
  async (ticketId, thunkAPI) => {
    try {
      return await dataService.openStatus(ticketId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
)

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const ticketIndex = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );

        if (ticketIndex !== -1) {
          // Update the status of the ticket in the array
          state.tickets[ticketIndex].status = 'closed';
        }

        // Set the current ticket to the updated one
        state.ticket = action.payload;
      })
      .addCase(openStatus.fulfilled, (state, action) => {
        const ticketIndex = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );

        if (ticketIndex !== -1) {
          // Update the status of the ticket in the array
          state.tickets[ticketIndex].status = 'open';
        }

        // Set the current ticket to the updated one
        state.ticket = action.payload;
      })
  },
})

export default dataSlice.reducer