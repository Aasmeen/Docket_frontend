import React, { useState, useEffect } from 'react';

import axios from 'axios';
import BASE_URL from './constants';


function ModalForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    noOfHoursWorked: '',
    ratePerHour: '',
    supplierName: '',
    purchaseOrder: '',
  });
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [poNumbers, setPoNumbers] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL+'docket/supplier-list/')
      .then(response => {
        const suppliers = response.data;
        setSupplierOptions(suppliers);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleSupplierChange = (event) => {
    const selectedSupplier = event.target.value;
  
    // Make an API request to get PO numbers based on the selected supplier
    axios.get(BASE_URL+`docket/po-list/${selectedSupplier}/`)
      .then(response => {
        const poNumbersList = response.data;
        // Update state with the retrieved PO numbers
        setPoNumbers(poNumbersList);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Construct the data to be sent to Django
    const data = {
      name: formData.name,
      startTime: formData.startTime,
      endTime: formData.endTime,
      noOfHoursWorked: formData.noOfHoursWorked,
      ratePerHour: formData.ratePerHour,
      supplierName: formData.supplierName,
      po: formData.purchaseOrder,
    };
  
    // Send a POST request to your Djadocketngo server
    axios.post(BASE_URL+'docket/', data)
      .then((response) => {
        // Handle the response from Django, e.g., show a success message
        console.log('Django response:', response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });
    onClose();
  };
  

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form>
          <div className='div'>
            <label>Name: </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className='div'>
            <label>Start Time: </label>
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
          </div>
          <div className='div'>
            <label>End Time: </label>
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
          </div>
          <div className='div'>
            <label>No. of Hours Worked: </label>
            <input type="number" name="noOfHoursWorked" value={formData.noOfHoursWorked} onChange={handleChange} />
          </div>
          <div className='div'>
            <label>Rate Per Hour: </label>
            <input type="number" name="ratePerHour" value={formData.ratePerHour} onChange={handleChange} />
          </div>
          <div className='div'>
            <label>Supplier: </label>
            <select name="supplierName" value={formData.supplierName} onChange={
                (e) => {handleSupplierChange(e); handleChange(e);}
              }
            >
              <option value="">Select a Supplier</option>
              {supplierOptions.map(supplier => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>
          <div className='div'>
            <label>Purchase Order: </label>
            <select name="purchaseOrder" value={formData.purchaseOrder} onChange={handleChange}>
              <option value="">Select a Purchase Order</option>
              {poNumbers.map(poNumber => (
                <option key={poNumber} value={poNumber}>
                  {poNumber}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
