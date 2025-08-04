import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  
  return (
    <div className="min-h-screen bg-brand-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1>Order Details - {orderId}</h1>
        <Link to="/account">Back to Account</Link>
      </div>
    </div>
  );
};

export default OrderDetails; 