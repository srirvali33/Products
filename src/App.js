import { Home } from "./sale/Home";
import "./styles.css";
import { Provider } from "react-redux";
import { store } from "./reducer/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartPage } from "./sale/CartPage";
import NoPage from "./sale/NoPage";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </>
  );
}
