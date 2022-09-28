import React, { useState, useRef } from 'react';

export default function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [configuration, setConfiguration] = useState({});
  const dialogRef = useRef();

  function resolve() {
    setIsOpen(false);
    return dialogRef.current.resolve(true);
  }

  function reject() {
    setIsOpen(false);
    return dialogRef.current.reject();
  }

  function displayYesNo({ message }) {
    return display({ message });
  }

  function display({ message }) {
    setConfiguration({
      message,
    });
    setIsOpen(true);

    return new Promise((resolve, reject) => {
      dialogRef.current = { resolve, reject };
    });
  }

  return {
    configuration,
    displayYesNo,
    isOpen,
    resolve,
    reject,
  };
}
