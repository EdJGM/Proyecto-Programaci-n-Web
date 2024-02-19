import { useState }  from 'react';
import  Header  from './Componentes/Header';
import  SecondaryNav  from './Componentes/SecondaryNav';
import  Article from './Componentes/Article';
import  SeccionesImagenes from './Componentes/SeccionesImagenes';
import  ProductList from './Componentes/ProductList';
import Comentarios from './Componentes/Comentarios';
import Info from './Info';
import Subscription from './Componentes/Subscription';
import Footer from './Componentes/Footer';

function App() {

  const [allProducts, setAllProducts] = useState([]); 
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  return (
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
      <br/>
      <SeccionesImagenes />
      <br/>
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
      <br/>
      <Info />
      <Subscription />
      <Footer />
    </>
  );
}

export default App;
