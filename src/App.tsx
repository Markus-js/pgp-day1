import React, { useEffect, useState, useRef } from 'react';
import './App.scss';

interface Location {
  city: string,
  country: string,
  postcode: number,
  state: string,
  street?: any
}

interface Name {
  first: string,
  last: string,
  title: string
}
// interface IUser {
//   name: Name,
//   address: Location,
//   age: number
// }

function App() {

  const [name, setName] = useState<Name | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => {
        setName(data.results[0].name)
        setAge(data.results[0].dob.age);
        setLocation(data.results[0].location);
      })
  }, [])

  const changeName = () => {
    if (inputField.current && name) {
      setName({ ...name, first: inputField.current.value })
      inputField.current.value = '';
    }
  }

  return name ? (
    <>
      <section className="input-container">
        <input ref={inputField} type="text" />
        <button onClick={changeName}>Change Name</button>
      </section>
      <section className="user-container">
        <h2>{name.title} {name.first} {name.last}</h2>
      </section>
      <section className="location-container">
        <h3>Location</h3>
        <p>
          {location?.street.name} {location?.street.number}, {location?.postcode} {location?.city} {location?.country}
        </p>
        <h3>Age</h3>
        <p>{age}</p>
      </section>
    </>
  ) : null;
}

export default App;
