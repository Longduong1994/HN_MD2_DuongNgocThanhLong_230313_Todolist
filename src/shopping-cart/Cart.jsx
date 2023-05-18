import React, { useState, useEffect } from 'react';

function Cart(props) {
  const { isCart, setIsCart, cartItems, setCartItems } = props;
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  }, [cartItems]);

  const handleCart = () => {
    setIsCart(!isCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
  };

  const handleClearAll = () => {
    setCartItems([]);
  };

  const cartTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handlePlus = (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleMinus = (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handlePay = () => {
    setShowThankYou(true);
    setCartItems([]);
    setIsCart(false);
  };

  return (
    <div>
      <div className={`cart${showThankYou ? ' cart-thank-you' : ''}`}>
        {showThankYou ? (
          <div className='thank-you'>
            <p>Cảm ơn quý khách!</p>
          </div>
        ) : (
          <div>
            <p>
              <i className="fa-solid fa-cart-shopping" onClick={handleCart}></i>
            </p>
            <div className='count'>{cartItemCount}</div>
          </div>
        )}
      </div>
      {isCart ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Số Lượng</th>
                <th>Giá</th>
                <th>
                  <i className="fa-regular fa-trash-can"></i>
                </th>
              </tr>
            </thead>
            <tbody>
            {cartItems.map((item) => (
  <tr key={item.id}>
    <td>
      <img width={50} src={item.imageUrl} alt="" />
    </td>
    <td>{item.name}</td>
    <td>
      {item.quantity > 1 && (
        <button onClick={() => handleMinus(item.id)}>
          <i className="fa-solid fa-minus"></i>
        </button>
      )}
      {item.quantity}
      <button onClick={() => handlePlus(item.id)}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </td>
    <td>{item.price}</td>
    <td>
      <i
        className="fa-regular fa-trash-can"
        onClick={() => handleRemoveItem(item.id)}
      ></i>
    </td>
  </tr>
))}

            </tbody>
          </table>
          <div className='total'>
            <p>Total: {cartTotal()}</p>
          </div>
          <div className='cart-active'>
            <p>
              <button className='pay' onClick={handlePay}>
                Pay
              </button>
              <button className='clear' onClick={handleClearAll}>
                ClearAll
              </button>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
