import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, Error, Form, Input, Label } from './styles/form-elements';

function AddWilder() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const result = await axios.post('http://localhost:5000/api/wilders', {
            name,
            city,
          });
          console.log(result);
          if (result.data.success) {
            setError('');
          }
        } catch (caughtError) {
          if (axios.isAxiosError(error)) {
            const err = caughtError as AxiosError;
            if (err.response) {
              setError(err.response.data.message);
            }
          } else {
            const err = caughtError as Error;
            if (err.message) {
              setError(err.message);
            }
          }
        }
      }}
    >
      <Label htmlFor="name-input">Name :</Label>
      <Input
        id="name-input"
        type="text"
        placeholder="Type the name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Label htmlFor="city-input">City :</Label>
      <Input
        id="city-input"
        type="text"
        placeholder="Type the city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {error !== '' && <Error>{error}</Error>}
      <Button>Add</Button>
    </Form>
  );
}

export default AddWilder;
