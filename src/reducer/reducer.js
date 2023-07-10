const initialState = {
  totalCount: 0,
  products: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newProd = action.payload;

      return {
        products: [...state.products, newProd],
        totalCount: state.products.length + 1
      };

    case "DEL_FROM_CART":
      const newList = state.products.filter((produc) => {
        return Number(produc.id) !== Number(action.payload);
      });
      console.log(newList);
      return {
        products: newList,
        totalCount: newList.length
      };

    default:
      return state;
  }
};
