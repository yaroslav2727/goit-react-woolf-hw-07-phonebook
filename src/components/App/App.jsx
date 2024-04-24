import React from "react";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/Filter/Filter";
import ContactList from "components/ContactList/ContactList";
import { PageTitle } from "./App.styled";

const App = () => {
  return (
    <>
      <PageTitle>Phonebook</PageTitle>
      <ContactForm />
      <Filter />
      <ContactList />
    </>
  );
};

export default App;
