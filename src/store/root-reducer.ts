import { combineReducers } from '@reduxjs/toolkit';
// Import slices here as they are created
// import authReducer from '@/features/auth/auth.slice';
// import cartReducer from '@/features/cart/cart.slice';

const rootReducer = combineReducers({
  // auth: authReducer,
  // cart: cartReducer,
  // For now, we need at least one reducer to avoid errors or we can leave it empty if toolkit allows,
  // but usually it's better to have a dummy one or just wait until we have slices.
  // Let's add a dummy/placeholder for now to ensure store creates successfully.
  _persist: (state = { version: -1 }) => state,
});

export default rootReducer;
