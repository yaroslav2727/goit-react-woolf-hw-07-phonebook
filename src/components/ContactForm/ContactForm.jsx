import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "store/selectors.js";
import { addContact } from "api/api";

import Container from "components/Container/Container.jsx";
import { Form, Label, Input, Button, InputGroup } from "./ContactForm.styled.js";

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const [contact, setContact] = useState({ name: "", phone: "" });

  const handleChange = e => {
    const { name, value } = e.target;
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      contacts.some(
        el => el.name.toLowerCase() === contact.name.toLowerCase() || el.phone === contact.phone
      )
    ) {
      window.alert(`${contact.name} or ${contact.phone} is already a contact.`);
      return;
    }

    dispatch(addContact({ id: nanoid(), ...contact }));
    setContact({ name: "", phone: "" });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            type="text"
            required
            value={contact.name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            id="name"
            placeholder="Enter contact's name"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="phone">Number</Label>
          <Input
            name="phone"
            type="tel"
            required
            value={contact.phone}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            id="phone"
            placeholder="Enter contact's number"
          />
        </InputGroup>

        <Button type="submit">Add contact</Button>
      </Form>
    </Container>
  );
};

export default ContactForm;
