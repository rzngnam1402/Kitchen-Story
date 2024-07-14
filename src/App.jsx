import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./store/Store";
import FoodList from "./pages/FoodList";
import LandingPage from "./pages/LandingPage";
import FoodDetails from "./pages/FoodDetails";
import { Logout } from "./pages/Logout";
import OrderCart from "./pages/OrderCart";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route exact path="/foodlist" element={<FoodList />} />
          <Route path="/foodlist/:id" element={<FoodDetails />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/orders" element={<OrderCart />} />
          <Route path="/changepass" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
