import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "api/api";
import { handleFulfilled, handlePending, handleRejected } from "./handlers";

export const phonebookSlice = createSlice({
  name: "phonebook",
  initialState: {
    contacts: [],
    filter: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(contact => contact.id !== payload);
      })
      .addMatcher(action => action.type.endsWith("fulfilled"), handleFulfilled)
      .addMatcher(action => action.type.endsWith("pending"), handlePending)
      .addMatcher(action => action.type.endsWith("rejected"), handleRejected);
  },
});

export const { updateFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;
