import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getUsers')
      .then(response => {
        setUsers(response.data);
        // console.log(response.data);

      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <div>
      <p>test connexion avec symfony et la bdd :</p>
      {
        users.map(user => (
          <div key={user.id}>
            <p>utilisateur {user.id} : {user.firstName} {user.lastName}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;