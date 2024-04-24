import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "api/api";
import { selectFilteredContacts, selectIsLoading } from "store/selectors";

import Loader from "components/Loader/Loader";
import Container from "components/Container/Container";

import { List, Item, Button, Contactbox } from "./ContactList.styled";

const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const loading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <List>
          {filteredContacts?.map(contact => (
            <Item key={contact.id}>
              <Contactbox>
                {contact.name} - {contact.phone}
              </Contactbox>
              <Button onClick={() => dispatch(deleteContact(contact.id))}>Delete</Button>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ContactList;
