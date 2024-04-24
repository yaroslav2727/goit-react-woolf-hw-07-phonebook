import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const NAME_GET_ALL = "contacts/getAll";
const NAME_ADD_CONTACT = "contacts/addContact";
const NAME_DELETE_CONTACT = "contacts/deleteContact";

const contactsInstance = axios.create({
  baseURL: "https://6628aa9f54afcabd07367e99.mockapi.io/contacts",
});

export const fetchContacts = createAsyncThunk(NAME_GET_ALL, async (_, thunkAPI) => {
  try {
    const response = await contactsInstance.get("/");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addContact = createAsyncThunk(NAME_ADD_CONTACT, async (contactObj, thunkAPI) => {
  try {
    const response = await contactsInstance.post("/", contactObj);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deleteContact = createAsyncThunk(NAME_DELETE_CONTACT, async (contactId, thunkAPI) => {
  try {
    await contactsInstance.delete(`/${contactId}`);
    return contactId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
