import { configureStore } from '@reduxjs/toolkit';
import leadReducer from '@/app/store/leadSlice';

export const store = configureStore({
  reducer: {
    lead: leadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;