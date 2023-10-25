import React, { Component } from 'react';
import css from './Filter.module.css';

export class Filter extends Component {
  render() {
    const {filter, handleChange} = this.props;
    return (
      <label
      className={css.label}>
            <span
            className={css.findContacts}
            >
                Find contacts by name
            </span>
            <input 
            onChange={handleChange} 
            value={filter} 
            type="text" 
            name="filter" />
          </label>
    )
  }
}
