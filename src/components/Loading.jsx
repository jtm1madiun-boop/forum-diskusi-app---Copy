import React from 'react';
import { useSelector } from 'react-redux';

function Loading() {
  // Ambil state 'loading' dari Redux store
  const isLoading = useSelector((states) => states.loading);

  // Jika state isLoading adalah false, jangan render apa-apa
  if (!isLoading) {
    return null;
  }

  // Jika state isLoading adalah true, render loading bar
  return (
    <div className="loading-bar"></div>
  );
}

export default Loading;