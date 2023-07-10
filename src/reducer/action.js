export function addAction(product) {
  return {
    type: "ADD_TO_CART",
    payload: product
  };
}

export function deleteFromCart(id) {
  return {
    type: "DEL_FROM_CART",
    payload: id
  };
}
