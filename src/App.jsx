import Meals from "./components/Meals";
import Header from "./components/Header";
import CartOpen from "./components/CartOpen";
import Checkout from "./components/Checkout";
import { Cart } from "./components/Cart";
import { UserProgressCart } from "./components/UserProgressCart";
function App() {
  return (
    <UserProgressCart>
    <Cart>
     <Header />
      <Meals />
      <CartOpen />
      <Checkout />
    </Cart>
    </UserProgressCart>
  );
}

export default App;
