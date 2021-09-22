import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { CardRow, Container, Footer, Header } from './styles/elements';
import Wilder, { WilderProps } from './Wilder';
import AddWilder from './AddWilder';

function App() {
  const [wilders, setWilders]: [WilderProps[], any] = useState([]);

  useEffect(() => {
    const fetchWilders = async () => {
      try {
        const result = await axios('http://localhost:5000/api/wilders');
        setWilders(result.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWilders();
  }, []);

  return (
    <div>
      <Header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </Header>
      <Container>
        <AddWilder />
      </Container>
      <Container>
        <h2>Wilders</h2>
        <CardRow>
          {wilders.map((wilder) => (
            <Wilder
              key={wilder._id}
              city={wilder.city}
              _id={wilder._id}
              justAdded={wilder.justAdded}
              name={wilder.name}
              skills={wilder.skills}
            />
          ))}
        </CardRow>
      </Container>
      <Footer>
        <Container>
          <p>&copy; 2020 Wild Code School</p>
        </Container>
      </Footer>
    </div>
  );
}

export default App;
