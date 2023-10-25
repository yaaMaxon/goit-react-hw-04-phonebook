import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
state = {
  contacts: [],
  filter: '',
}

componentDidMount() {
  const stringifiedContacts = localStorage.getItem('contact');
  const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
  this.setState({
    contacts: parsedContacts,
  })
}


componentDidUpdate(_, prevState) {

  if(this.state.contacts.length !== prevState.contacts.length) {
const stringifiedContacts = JSON.stringify(this.state.contacts)
localStorage.setItem('contact', stringifiedContacts);
  }

}

// Додавання контактів
handleAddInf = contact => {
// console.log('element:', contact);

const isContactDuplicate = this.state.contacts.some(user => 
  user.name.toLowerCase() === contact.name.toLowerCase());

if(isContactDuplicate){
  alert(`${contact.name} is already in contacts.`);
  return;
}

this.setState(prevState => {
  return {
    contacts: [contact, ...prevState.contacts],
  }
});

}

handleChange = event => {
this.setState({
  filter: event.target.value,
})
}

onDelete = contactId => {
// console.log('contactId:', contactId)

this.setState(prevState => {
  return {
    contacts: prevState.contacts.filter(contact => 
      contact.id !== contactId)
  }
})
}

  render() {
    const {contacts, filter} = this.state;
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
        <ContactForm handleAddInf={this.handleAddInf}/>
        <h2 
        style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: '15px',
            color: '#333'
          }}>
          Contacts
          </h2>
        <Filter filter={filter} handleChange={this.handleChange}/>
        <ContactList contacts={filteredContacts} onDelete={this.onDelete}/>
      </div>
    );
      }
};
