import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LeadState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedin?: string;
  visaInterest: string[];
  helpText: string;
}

const initialState: LeadState = {
  loading: false,
  error: null,
  success: false,
};

export const submitLeadForm = createAsyncThunk(
  'lead/submitLeadForm',
  async (formData: LeadFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/leads', formData);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

const leadSlice = createSlice({
  name: 'lead',
  initialState,
  reducers: {
    resetStatus(state) {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLeadForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitLeadForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitLeadForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = leadSlice.actions;
export default leadSlice.reducer;
export const selectLeadState = (state: { lead: LeadState }) => state.lead;