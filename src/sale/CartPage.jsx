import { NavBar } from "./NavBar";
import { useSelector, useDispatch } from "react-redux";
import { addAction, deleteFromCart } from "../reducer/action";

export const CartPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });

  const totalQuant = useSelector((state) => {
    return state.totalCount;
  });

  function addToCart(product) {
    dispatch(addAction(product));
  }

  function removeFromCart(id) {
    dispatch(deleteFromCart(id));
  }
  return (
    <>
      <NavBar />
      <div className="cartDiv">
        <div className="cartTable1">
          <table className="">
            <tr>
              <th> Items in Cart</th>
            </tr>
            <tr>
              <td className="">
                {products.map((item) => (
                  <>
                    <div className="cartTable">
                      <img
                        src={item.thumbnail}
                        width="100px"
                        height="100px"
                        alt="Img"
                      ></img>
                      <p>{item.title}</p>

                      <button
                        className="delButton"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ))}
              </td>
            </tr>
          </table>
        </div>
        <div className="orderBill">
          <h3>Order Details </h3>
          <h4>Total Quantity : {totalQuant}</h4>
          <h4>Total Price: {totalQuant * 100}</h4>
          <h4>Tax:{3.2}</h4>
          <h4>Total:{totalQuant * 100 + 3.2}</h4>
        </div>
      </div>
    </>
  );
};
