import * as React from 'react';
import axios from 'axios';

function GreetingLoader() {
  const [greeting, setGreeting] = React.useState('');
  async function loadGreetingForInput(e) {
    e.preventDefault();
    const { data } = await axios.post('/greeting', {
      message: e.target.elements.name.value,
    });
    setGreeting(data.greeting);
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor='name'>Name</label>
      <input id='name' />
      <button type='submit'>Load Greeting</button>
      <div aria-label='greeting'>{greeting}</div>
    </form>
  );
}

export { GreetingLoader };
