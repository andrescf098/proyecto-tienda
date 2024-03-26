import { useContext } from 'react';
import Card from '../../components/card';
import Layout from '../../components/layout';
import ProductDetail from '../../components/productDetail';
import { ShoppingCartContext } from '../../context';

function Home() {
  const context = useContext(ShoppingCartContext);
  const renderCards = () => {
    return context.filteredItems?.length > 0
      ? context.filteredItems
      : context.items;
  };
  return (
    <Layout>
      <div className='flex flex-wrap gap-5 justify-center'>
        {renderCards().map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              name={item.nameProduct}
              price={item.priceProduct}
              url={item.image}
              category={item.category.category}
              description={item.descriptionProduct}
            />
          );
        })}
      </div>
      <ProductDetail />
    </Layout>
  );
}
export default Home;
