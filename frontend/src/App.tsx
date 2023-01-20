import { useEffect } from 'react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/Layout/About/About';
import Contact from './components/Layout/Contact/Contact';
import Layout from './components/Layout/Layout';
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
