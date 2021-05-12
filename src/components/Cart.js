import { useContext } from 'react';
import { Store } from '../store';
import { localizeCurrency } from '../helpers';
import '../App.css';

function Cart() {
  const { state, dispatch } = useContext(Store);

  const removeFromCart = (index) => {
    dispatch({  
      type: 'REMOVE_FROM_CART',
      data: index
    })
  }

  const getCartTotal = () => {
    if (!state.cart.length) return "";
    let totalPrice = state.cart.reduce((total, item) => total += item.price, 0);
    return `Total: ${localizeCurrency(totalPrice, 'EUR')}`
  }

  return (
    <div className="cart-wrapper">
			{state.cart.map((item, index) => (
        <div key={index} className="cart-item d-flex">
          <div className="flex-auto img-wrapper">
            <img alt={item.name} src={item.defaultImage} />
          </div>
          <div className="flex-max">
            <div className="plr-10">
              <p>{item.name}</p>
              <p className="price">{localizeCurrency(item.price, 'EUR')}</p>
            </div>
          </div>
          <div className="flex-auto">
            <button className="black-btn" onClick={() => removeFromCart(index)}>remove</button>
          </div>
        </div>
      ))}
      <div className="total">{getCartTotal()}</div>
		</div>
  )
}

export default Cart;
