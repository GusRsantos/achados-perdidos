import React, { createContext, useState, useContext } from 'react';

const ObjectContext = createContext();

export function ObjectProvider({ children }) {
  const [objects, setObjects] = useState([]);

  const addObject = (newObject) => {
    setObjects(prev => [...prev, { ...newObject, id: Date.now() }]);
  };

  return (
    <ObjectContext.Provider value={{ objects, addObject }}>
      {children}
    </ObjectContext.Provider>
  );
}

export function useObjects() {
  return useContext(ObjectContext);
}