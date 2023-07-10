import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useDispatch } from "react-redux";
import { addAction, deleteFromCart } from "../reducer/action";

export const Home = () => {
  let [productList, setProductList] = useState([]);
  let [completeList, setCompleteList] = useState([]);
  let [modalState, setModalState] = useState(false);
  let [searchText, setSearchText] = useState("");
  let [sort, setSortText] = useState("asc");
  const dispatch = useDispatch();
  let inputData = {
    pageNumber: 1,
    pageSize: 5
  };

  function onPaginate(no) {
    let start = 0;
    if (no != 1) {
      start = (no - 1) * inputData.pageSize;
    }
    setProductList(completeList.slice(start, no * inputData.pageSize));
    inputData.pageNumber = no;
  }

  function onChangeVal(evt) {
    setSearchText(evt.target.value);
  }

  function searchFunc(event) {
    event.preventDefault();
    setProductList(
      completeList.filter((product) => product.title == searchText)
    );
  }

  function sorting() {
    setSortText("dsc");
    setProductList(productList.sort((a, b) => b.price - a.price));
  }

  function catChange(evt) {
    setProductList(
      completeList.filter((product) => product.category == evt.target.value)
    );
  }

  function addToCart(prod) {
    dispatch(addAction(prod));
    // setCartPram((previousState) => ({
    //   ...previousState,
    //   totalCount: cartParam.totalCount + 1
    // }));
  }

  function removeFromCart(id) {
    dispatch(deleteFromCart(id));
    // let tcoc = cartParam.totalCount - 1 > 0 ? cartParam.totalCount - 1 : 0;
    // setCartPram((previousState) => ({
    //   ...previousState,
    //   totalCount: tcoc
    // }));
  }

  useEffect(() => {
    try {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
          setCompleteList(data.products.sort((a, b) => a.price - b.price));
          setProductList(completeList.slice(0, 1 * inputData.pageSize));
        });
    } catch {
      console.log("something failed");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Better Buy!!</h1>
      <div className="search">
        <input
          className="search"
          type="text"
          placeholder="search product here"
          onChange={onChangeVal}
          value={searchText}
        ></input>
        <button onClick={searchFunc}>Search</button>
        <div>
          <label for="cate">Choose a categeory</label>
          <select name="cate" onChange={catChange}>
            <option value="skincare">skincare</option>
            <option value="fragrances">fragrances</option>
            <option value="groceries">groceries</option>
            <option value="smartphones">smartphones</option>
            <option value="home-decoration">home-decoration</option>
          </select>
        </div>
      </div>

      <div className="mainTable">
        <table>
          <tr className="heading">
            <th>Product</th>
            <th>Image</th>
            <th>Description</th>
            <th onClick={sorting}>Price{sort == "asc" ? "^" : "v"}</th>
            <th>Categeory</th>
          </tr>
          {productList &&
            productList.map((product) => (
              <tr>
                <td className="titleRow">
                  {product.title}
                  <div className="buttons">
                    <button
                      className="addButton"
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </button>
                    <button
                      className="delButton"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
                <td>
                  <img
                    width={"100px"}
                    height={"100px"}
                    src={product.thumbnail}
                    alt="Img"
                    onClick={""}
                  ></img>
                </td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          {productList.length == 0 && <h2>OOps no items found!! </h2>}
        </table>
      </div>
      {searchText.length <= 0 && (
        <div className="page">
          <div class="pagination">
            <a onClick={() => onPaginate(1)}>1</a>
            <a onClick={() => onPaginate(2)}>2</a>
            <a onClick={() => onPaginate(3)}>3</a>
            <a onClick={() => onPaginate(4)}>4</a>
            <a onClick={() => onPaginate(5)}>5</a>
            <a onClick={() => onPaginate(6)}>6</a>
          </div>

          <div class="dropdown">
            <button class="dropbtn">PageSize</button>
            <div class="dropdown-content">
              <a onClick={() => (inputData.pageSize = 5)}>5</a>
              <a onClick={() => (inputData.pageSize = 10)}>10</a>
            </div>
          </div>
        </div>
      )}
      <footer>Footer Icons</footer>
    </div>
  );
};
