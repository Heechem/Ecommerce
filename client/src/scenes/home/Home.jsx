import MainCaroussel from './MainCaroussel';
import ShoppingList from './ShoppingList';
import Subscribe from './Subscribe';

const Home = () => {
  return (
    <div className="home">
      <MainCaroussel />
      <ShoppingList />
      <Subscribe />
    </div>
  );
};

export default Home;
