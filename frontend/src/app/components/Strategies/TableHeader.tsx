// components/TableHeader.js
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

const TableHeader = ({ label }) => {
  return (
    <th>
      <span style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '600',
        //color: '#666666'
      }}>
        {label.toUpperCase()}
        <span style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2px'
        }}>
          <i className="bi bi-caret-up-fill" style={{ fontSize: '8px' }}></i>
          <i className="bi bi-caret-down-fill" style={{ fontSize: '8px' }}></i>
        </span>
      </span>
    </th>
  );
};

export default TableHeader;
