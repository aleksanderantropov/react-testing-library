import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { savePost } from './api';

export const Editor = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { name, email } = e.target.elements;

    try {
      await savePost({
        name: name.value,
        email: email.value,
        date: new Date().toISOString(),
      });
      setRedirect(true);
    } catch (error) {
      setError(error.message);
    }

    name.value = '';
    email.value = '';

    setSubmitting(false);
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={handleSumbit}>
      {error && <div>{error}</div>}
      <div>
        <label htmlFor='name'>Name</label>
        <input id='name' name='name' />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' />
      </div>
      <button type='submit' disabled={submitting}>
        Ok
      </button>
    </form>
  );
};
