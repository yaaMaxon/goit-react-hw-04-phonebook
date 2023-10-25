import React, { Component } from 'react';
import { nanoid } from "nanoid";
import css from './ContactForm.module.css';

export class ContactForm extends Component {
state = {
  name: '',
  number: '',
}

// Зміна значення в стейт

handleInputChange = event => {
// console.log(event.target.value)
// console.log(event.target.name)
this.setState({
  [event.target.name]: event.target.value,
})
}

// Отримуємо контакти

handleSubmit = event => {
  event.preventDefault();

const contactData = {
  name: this.state.name,
  number: this.state.number,
  // ...this.state,
  id: nanoid(),
}

  this.props.handleAddInf(contactData);

  this.setState({
    name: '',
    number: '',
  })
}

  render() {
    return (
      <form 
      className={css.form}
      onSubmit={this.handleSubmit}>
          <label
          className={css.label}
          >
            <span>Name</span>
        <input 
        onChange={this.handleInputChange} 
        value={this.state.name} 
        type="text" 
        name="name" 
        required />
          </label>
          <label
          className={css.label}
          >
            <span>Number</span>
        <input 
        onChange={this.handleInputChange} 
        value={this.state.number} 
        type="tel" 
        name="number" 
        required />
          </label>
          <button 
          className={css.class_btn}
          type="submit">
            Add contact
            </button>
        </form>
    )
  }
}
