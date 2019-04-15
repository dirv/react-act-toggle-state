import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const App = ({ fetcher }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await fetcher();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <span className={isSubmitting ? "submittingIndicator" : null} />
      <input type="submit" />
    </form>
  );
};
