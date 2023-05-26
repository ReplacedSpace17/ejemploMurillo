
import './App.css';
import Targeta from './Tarjeta';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './firebaseConfig';

const App = () => {
  const [data, setData] = useState('');
  const [data2, setData2] = useState('');

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database().ref('/tec');

    const database2 = firebase.database().ref('/testsensor');
    /*nodo 1*/
    database.on('value', (snapshot) => {
      const value = snapshot.val();
      setData(value);
    });
      /*nodo 2*/
      database2.on('value', (snapshot) => {
        const value = snapshot.val();
        setData2(value);
      });

    return () => {
      database.off();
    };
  }, []);

  return (
<div className="App">

<div className='contTitle'>
<h1>Ejemplo de React</h1>
</div>
<div className='contTarget'>
  <Targeta texto={data} />
  <Targeta texto={data2} />
</div>

</div>
  );
};

export default App;
