import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VendorDashboard() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    fetchVendorItems();
  }, []);

  // Fetch all items for the logged-in vendor
  const fetchVendorItems = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/items/vendor-items', {
        headers: { Authorization: token },
      });
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items', err);
    }
  };

  // Add new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/items/add',
        newItem,
        { headers: { Authorization: token } }
      );
      setNewItem({ name: '', price: '', description: '' });
      fetchVendorItems();
    } catch (err) {
      console.error('Error adding item', err);
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/items/${itemId}`, {
        headers: { Authorization: token },
      });
      fetchVendorItems();
    } catch (err) {
      console.error('Error deleting item', err);
    }
  };

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <h2>Manage Items</h2>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <h3>Your Items</h3>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.name}</strong> - ${item.price}
            <p>{item.description}</p>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VendorDashboard;
