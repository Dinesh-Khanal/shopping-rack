import { useEffect } from 'react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Layout from './components/Layout';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchProduct } from './redux/productSlice';

function App() {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home productState={productState} />} />
      </Route>
    </Routes>
  );
}

export default App;
