import React, { useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/dashboard/admin', {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error('Access Denied', err);
    });
  }, []);

  return <h1>Admin Dashboard</h1>;
}

export default AdminDashboard;
