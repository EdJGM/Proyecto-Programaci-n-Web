import { useState } from 'react';
import Header from './Componentes/Header';
import SecondaryNav from './Componentes/SecondaryNav';
import Article from './Componentes/Article';
import SeccionesImagenes from './Componentes/SeccionesImagenes';
import ProductList from './Componentes/ProductList';
import Comentarios from './Componentes/Comentarios';
import Info from './Componentes/Info';
import Subscription from './Componentes/Subscription';
import Footer from './Componentes/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Srceens/Login';
import Register from './Srceens/Register';
import Categoria from './Srceens/Categoria';
import Contacto from './Srceens/Contacto';
import Servicios from './Srceens/Servicios';
import ConfirmarCarro from './Srceens/ConfirmarCarro';
import { AuthProvider } from './Srceens/AuthContext';

function App() {

  const [allProducts, setAllProducts] = useState(() => {
    const savedCart = localStorage.getItem('allProducts');
    if (savedCart) {
      return JSON.parse(savedCart);
    } else {
      return [];
    }
  });
  const [total, setTotal] = useState(() => {
    const savedTotal = localStorage.getItem('total');
    return savedTotal ? JSON.parse(savedTotal) : 0;
  });
  const [countProducts, setCountProducts] = useState(() => {
    const savedCount = localStorage.getItem('countProducts');
    return savedCount ? JSON.parse(savedCount) : 0;
  });

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/confirmarcarro" element={
            <ConfirmarCarro
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          } />
          <Route path="/login" element={
            <Login
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          } />
          <Route path="/register" element={
            <Register
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          } />
          <Route path="/servicios" element={
            <Servicios
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          } />
          <Route path="/contacto" element={
            <Contacto
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          } />
          <Route path="/categoria/:categoriaId" element={
            <Categoria
              allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}
            />
          } />
          <Route path="/*" element={
            <>
              <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <SecondaryNav />
              <Article />
              <br />
              <SeccionesImagenes />
              <br />
              <ProductList
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
              />
              <br />
              <br />
              <Comentarios />
              <br />
              <Info />
              <Subscription />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
