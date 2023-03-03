import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { savePost } from './api';

export const Editor = () => {
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(true);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { name, email } = e.target.elements;
    await savePost({
      name: name.value,
      email: email.value,
    });

    name.value = '';
    email.value = '';

    setSubmitting(false);

    setRedirect(true);
  };

  if (redirect) {
    <Redirect to='/' />;
  }

  return (
    <form onSubmit={handleSumbit}>
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
