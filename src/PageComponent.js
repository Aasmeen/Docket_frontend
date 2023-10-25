
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ListComponent from './ListComponent';
import ModalForm from './ModalForm';
import BASE_URL from './constants';

function PageComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]); // List of items

  useEffect(() => {
    if (!isModalOpen) {
      axios.get(BASE_URL + 'docket/list/')
        .then(response => {
          // Handle the successful response, e.g., update state with the data
          const items = response.data;
          // Update state with the retrieved items
          setItems(items);
        })
        .catch(error => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
        });
    }
  }, [isModalOpen]); // The empty dependency array ensures the effect runs only once on component mount
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="open-button">
        Add Item
      </button>
      <ListComponent items={items} />

      <ModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}

export default PageComponent;
