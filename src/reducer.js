export const initialState = {
  basket: [],
  order: [],
  user: null,
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'ADD_TO_BASKET':
      //logic for adding item to basket
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case 'ADD_TO_ORDER':
      //logic for adding basket items to order
      return {
        ...state,
        order: [...state.order, action.item],
      };
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };

    case 'REMOVE_FROM_BASKET':
      //logic for removing item from basket
      let newBasket = [...state.basket];

      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in the basket`
        );
      }

      return { ...state, basket: newBasket };
    default:
      return state;
  }
};

export default reducer;
