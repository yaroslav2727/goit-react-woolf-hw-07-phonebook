import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.phonebook.contacts;
export const selectFilter = state => state.phonebook.filter;
export const selectIsLoading = state => state.phonebook.isLoading;
export const selectError = state => state.phonebook.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter?.toLowerCase() ?? "")
    );
  }
);
