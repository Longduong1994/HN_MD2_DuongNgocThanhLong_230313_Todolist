import React, { useState } from 'react';

function Product(props) {
  const { products, cartItems, setCartItems } = props;

  const handleAddCart = (index) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === products[index].id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems([...updatedItems]);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...products[index], quantity: 1 }]);
    }
  };

  const handleDecrease = (index) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === products[index].id);

    if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity -= 1;
      setCartItems([...updatedItems]);
    }
  };

  return (
    <div className='list-product'>
      {products.map((product, index) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        const isAdded = cartItem !== undefined;

        return (
          <div className='product' key={product.id}>
            <div className='content'>
              <p>
                <i className="fa-brands fa-apple"></i>
              </p>
              <p>in Store</p>
            </div>
            <img src={product.imageUrl} alt="" />
            <div className='info'>
              <div className='product-name'>
                <p>{product.name}</p>
                <p>
                  <i className="fa-solid fa-heart"></i>
                </p>
              </div>
              <div className='hidden'>
                <div className='info-product'>
                  <p>{product.des}</p>
                </div>
                <div className='active'>
                  <p>{product.price}</p>
                  {isAdded ? (
                    <div>
                      <button onClick={() => handleDecrease(index)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      {cartItem.quantity}
                      <button onClick={() => handleAddCart(index)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  ) : (
                    <button className='add-btn' onClick={() => handleAddCart(index)}>
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
