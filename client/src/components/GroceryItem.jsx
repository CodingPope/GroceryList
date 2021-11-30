import React from 'react';
import GroceryListItem from './GroceryListItem.jsx';

const GroceryList = ({ groceries, deleteGrocery, updateGrocery }) => (
  <ul className="groceries">
    {groceries.map((grocery) => (
      <GroceryListItem
        grocery={grocery}
        key={grocery.id}
        deleteGrocery={deleteGrocery}
        updateGrocery={updateGrocery}
      />
    ))}
  </ul>
);

export default GroceryList;
