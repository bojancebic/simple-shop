import { useContext, useState, useEffect } from 'react';
import { Store } from '../store';
import { serviceCall } from '../service';
import { localizeCurrency } from '../helpers';
import '../App.css';

const chunk = 20;
function ProductsList() {
  const { state, dispatch } = useContext(Store);
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [productsPaginationPage, setProductsPaginationPage] = useState(1);

  useEffect(() => {
    if (state.products.list) {
      setProducts([...state.products.list]);
    } else {
      serviceCall('products', 'GET', null, (data) => {
        dispatch({  
          type: 'SET_PRODUCTS',
          data: data
        })
      });
    }
  }, [state.products, dispatch]);

  useEffect(() => {
    console.log('products', products);
    setProductsToDisplay(products.slice(0, chunk));
    setProductsPaginationPage(1);
  }, [products]);

  const loadMore = () => {
    let pagination = productsPaginationPage + 1;
    setProductsToDisplay(products.slice(0, (chunk * pagination)));
    setProductsPaginationPage(pagination);
  }
  
  const addToCart = (product) => {
    dispatch({  
      type: 'ADD_TO_CART',
      data: product
    })
  }
  
  let typeTimeout;
  const searchProducts = (event) => {
    let value = event.target.value;
    if (typeTimeout) clearTimeout(typeTimeout);
    typeTimeout = setTimeout(() => {
      serviceCall(`products?q=${value}`, 'GET', null, (data) => {
        setProducts(data);
      });
    }, 1500);
  }

  const flippCard = (index) => {
    let product = productsToDisplay.find((item, i) => i === index);
    product.flipped = !product.flipped;
    setProductsToDisplay([...productsToDisplay]);
  }

  return (
    <div className="list-wrapper d-flex">
      <div className="flex-100 search-wrapper">
        <input placeholder="Search for products" onChange={searchProducts}></input>
      </div>
      {productsToDisplay.map((product, index) => (
        <div className="card" key={product.id}>
          <div className={"content " + (product.flipped ? 'flipped' : '')}>
            <div className="front" style={{backgroundImage:`url('${product.defaultImage}')`}}>
              <div className="inner">
                <h2>{product.name}</h2>
                <button onClick={() => flippCard(index)}>More info</button>
              </div>
            </div>
            <div className="back">
              <div className="inner">
                <div className="description">
                  <div className="d-flex">
                    <div className="location">{product.name}</div>
                    <div className="price">{localizeCurrency(product.price, 'EUR')}</div>
                  </div>
                  <p>{product.description}</p>
                </div>
                <button onClick={() => flippCard(index)}>back</button>
                <button onClick={() => addToCart(product)}>buy</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex-100 text-center">
        <button className="black-btn" onClick={loadMore}>load more</button>
      </div>
    </div>
  )
}

export default ProductsList;
