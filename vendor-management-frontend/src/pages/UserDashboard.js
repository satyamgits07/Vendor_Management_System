import React, { useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/dashboard/user', {
      headers: {
        Authorization: token,
      },
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error('Access Denied', err);
    });
  }, []);

  return <h1>User Dashboard</h1>;
}

export default UserDashboard;
