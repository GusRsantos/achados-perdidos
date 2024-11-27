import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do contexto
const ObjectContext = createContext();

// Componente provider para envolver a aplicação e compartilhar o estado dos objetos
export function ObjectProvider({ children }) {
  const [objects, setObjects] = useState(() => {
    // Carrega os objetos salvos no localStorage, se existirem
    const savedObjects = localStorage.getItem('objects');
    return savedObjects ? JSON.parse(savedObjects) : [];
  });

  // Efeito para salvar o estado dos objetos no localStorage sempre que forem atualizados
  useEffect(() => {
    localStorage.setItem('objects', JSON.stringify(objects));
  }, [objects]);

  // Função para adicionar um novo objeto
  const addObject = (newObject) => {
    setObjects(prev => [...prev, { ...newObject, id: Date.now().toString() }]);
  };

  // Função para atualizar um objeto existente
  const updateObject = (updatedObject) => {
    setObjects(prev => prev.map(obj => obj.id === updatedObject.id ? updatedObject : obj));
  };

  // Função para remover um objeto pelo ID
  const removeObject = (id) => {
    setObjects(prev => prev.filter(obj => obj.id !== id));
  };

  return (
    <ObjectContext.Provider value={{ objects, addObject, updateObject, removeObject }}>
      {children}
    </ObjectContext.Provider>
  );
}

// Hook para facilitar o acesso ao contexto em outros componentes
export function useObjects() {
  return useContext(ObjectContext);
}
