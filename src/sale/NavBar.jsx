import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const NavBar = (props) => {
  const totalItems = useSelector((state) => {
    return state.totalCount;
  });
  return (
    <ul className="navBar">
      <li>
        <Link to="/">Products</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
        <span className="cart">{totalItems}</span>
      </li>
    </ul>
  );
};
