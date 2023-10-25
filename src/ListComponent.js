import React from 'react';

function ListComponent({ items }) {
  return (
    <div>
      {items && items.length !== 0 ? (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Number of Hours Worked</th>
              <th>Rate Per Hour</th>
              <th>Supplier Name</th>
              <th>PO number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.start_time}</td>
                <td>{item.end_time}</td>
                <td>{item.no_of_hours_worked}</td>
                <td>{item.rate_per_hour}</td>
                <td>{item.supplier_name}</td>
                <td>{item.po_number}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Docket Found</p>
      )}
    </div>
  );
}

export default ListComponent;
