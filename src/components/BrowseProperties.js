// rentchain-frontend/src/components/BrowseProperties.js
import React from 'react';

export default function BrowseProperties({ properties }) {
  return (
    <div>
      <h2>Available Properties</h2>
      {properties.length === 0 ? (
        <p>No properties listed yet.</p>
      ) : (
        properties.map((property, index) => (
          <div key={index} style={{ border: '1px solid #aaa', margin: 10, padding: 10 }}>
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p>Status: {property.available ? 'Available' : 'Rented'}</p>
          </div>
        ))
      )}
    </div>
  );
}
