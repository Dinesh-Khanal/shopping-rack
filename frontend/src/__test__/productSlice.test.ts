import productReducer from '../redux/productSlice';

describe('product reducer', () => {
  it('should return the initial state when passed and empty action', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = productReducer(initialState, action);
    expect(result.product_data.products).toEqual([]);
  });
});
