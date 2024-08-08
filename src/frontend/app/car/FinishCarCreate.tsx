'use client'
import React from 'react';
import { Car } from '../interface';

interface FinishCarCreateProps {
  currCarInfo: Car; 
}

const FinishCarCreate: React.FC<FinishCarCreateProps> = ({ currCarInfo }) => {
  return (
    <div>
      <h1>Check Your Car Info</h1>
      {Object.entries(currCarInfo).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
};

export default FinishCarCreate;