// rentchain-frontend/src/components/ListProperty.js
import React, { useState } from 'react';

export default function ListProperty({ onList }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass the new property to the parent component
    onList({ title, location, available: true });

    // Clear the form fields
    setTitle('');
    setLocation('');
  };

  return (
    <div>
      <h2>List a Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />
        <button type="submit">List Property</button>
      </form>
    </div>
  );
}
