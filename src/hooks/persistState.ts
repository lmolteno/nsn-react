import React, { useEffect } from 'react';

export const usePersistState = <Type>(key: string, defaultValue: Type):[Type, React.Dispatch<React.SetStateAction<Type>>] => {
  const [state, setState] = React.useState<Type>(
    () => JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
  );
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}


export const useSetPersistState = <Type>(key: string, defaultValue: Set<Type>):[Set<Type>, React.Dispatch<React.SetStateAction<Set<Type>>>] => {
  const [state, setState] = React.useState<Set<Type>>(
    () => new Set<Type>(JSON.parse(localStorage.getItem(key))) || defaultValue
  );
  useEffect(() => {
      console.log('storing', state)
    localStorage.setItem(key, JSON.stringify([...state]));
  }, [key, state]);
  return [state, setState];
}