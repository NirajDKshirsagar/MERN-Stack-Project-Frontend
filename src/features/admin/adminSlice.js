import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import adminService from './adminService'

import { extractErrorMessage } from '../../utils'

// Get admin from localstorage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
  admin: admin ? admin : null,
  isLoading: false,
}

// Register new admin
export const register = createAsyncThunk(
  'admin/register',
  async (admin, thunkAPI) => {
    try {
      return await adminService.register(admin)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Login admin
export const login = createAsyncThunk('admin/login', async (admin, thunkAPI) => {
  try {
    return await adminService.login(admin)
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error))
  }
})

// Logout user
export const logout = createAction('admin/logout', () => {
  adminService.logout()
  return {}
})

// NOTE: in cases of login or register pending or rejected then user will
// already be null so no need to set to null in these cases

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.admin = action.payload
        state.isLoading = false
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.admin = action.payload
        state.isLoading = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export default adminSlice.reducer