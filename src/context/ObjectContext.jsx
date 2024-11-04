import React, { createContext, useState, useContext, useEffect } from 'react';

const ObjectContext = createContext();

export function ObjectProvider({ children }) {
  const [objects, setObjects] = useState(() => {
    const savedObjects = localStorage.getItem('objects');
    return savedObjects ? JSON.parse(savedObjects) : [];
  });

  useEffect(() => {
    localStorage.setItem('objects', JSON.stringify(objects));
  }, [objects]);

  const addObject = (newObject) => {
    setObjects(prev => [...prev, { ...newObject, id: Date.now().toString() }]);
  };

  const updateObject = (updatedObject) => {
    setObjects(prev => prev.map(obj => obj.id === updatedObject.id ? updatedObject : obj));
  };

  return (
    <ObjectContext.Provider value={{ objects, addObject, updateObject }}>
      {children}
    </ObjectContext.Provider>
  );
}

export function useObjects() {
  return useContext(ObjectContext);
}