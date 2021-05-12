import React from 'react';
import ProductsList from '../components/ProductsList'
import Cart from '../components/Cart'

function Shop() {
  return (
    <div className="d-flex">
      <div className="flex-max">
        <ProductsList />
      </div>
      <div className="flex-auto">
        <Cart />
      </div>
    </div>
  )
}

export default Shop;
