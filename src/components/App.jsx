import { useState } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { useEffect } from "react";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


useEffect(() => {
  const stringifiedContacts = localStorage.getItem('contact');
  const parsedContacts = JSON.parse(stringifiedContacts) ?? [];

  setContacts(parsedContacts);
}, [])


useEffect(() => {
  const stringifiedContacts = JSON.stringify(contacts)
  localStorage.setItem('contact', stringifiedContacts);
}, [contacts])


// Додавання контактів
const handleAddInf = contact => {

const isContactDuplicate = contacts.some(user => 
  user.name.toLowerCase() === contact.name.toLowerCase());

if(isContactDuplicate){
  alert(`${contact.name} is already in contacts.`);
  return;
}

setContacts([contact, ...contacts])
}


const handleChange = event => {
  setFilter(event.target.value)
}


const onDelete = contactId => {
  setContacts(contacts.filter(contact => contact.id !== contactId))
}

const filteredContacts = contacts.filter( contact =>  
  contact.name.toLowerCase().includes(filter.toLowerCase()));

    return (
      <div
      style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          backgroundColor: '#f2f2f2',
          padding: '20px',
        }}>
        <h1
        style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: '15px',
            color: '#333'
          }}>
            Phonebook
            </h1>
        <ContactForm handleAddInf={handleAddInf}/>
        <h2 
        style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: '15px',
            color: '#333'
          }}>
          Contacts
          </h2>
        <Filter filter={filter} handleChange={handleChange}/>
        <ContactList contacts={filteredContacts} onDelete={onDelete}/>
      </div>
    );
};
