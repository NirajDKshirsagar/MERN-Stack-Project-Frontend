import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import adminReducer from '../features/admin/adminSlice'
import dataReducer from '../features/data/dataSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    admin: adminReducer,
    data: dataReducer,
    note: noteReducer
  },
});
