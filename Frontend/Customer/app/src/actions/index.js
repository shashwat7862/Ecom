
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { REQUEST_PATH } from '../utils/paths-config';
import { getRequest } from '../utils/request';
import * as types from '../constants/ActionTypes';

export const fetchProductsBegin = () => ({
	type: types.FETCH_PRODUCTS_BEGIN
});

export const receiveProducts = products => ({
	type: types.RECEIVE_PRODUCTS,
	products
})

export const IsLoggeIn = isLogin => ({
	type: types.IS_LOGIN,
	isLogin
})

export const getAllProducts = () => dispatch => {
	dispatch(fetchProductsBegin());
	return function (dispatch) {
		getRequest(REQUEST_PATH.productList)
    .then(({ data }) => {
      dispatch(receiveProducts(data));
    })
    .catch(error => {
      console.log('getAllProducts error *****', error.response)
    })
	};
}

export const fetchSingleProduct = productId => ({
	type: types.FETCH_SINGLE_PRODUCT,
	productId
})

//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => (dispatch) => {
	toast.success("Item Added to Cart");
	dispatch(addToCartUnsafe(product, qty))

}
export const addToCartAndRemoveWishlist = (product, qty) => (dispatch) => {
	toast.success("Item Added to Cart");
	dispatch(addToCartUnsafe(product, qty));
	dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
	type: types.ADD_TO_CART,
	product,
	qty
});
export const removeFromCart = product_id => (dispatch) => {
	toast.error("Item Removed from Cart");
	dispatch({
		type: types.REMOVE_FROM_CART,
		product_id
	})
};
export const incrementQty = (product, qty) => (dispatch) => {
	toast.success("Item Added to Cart");
	dispatch(addToCartUnsafe(product, qty))

}
export const decrementQty = productId => (dispatch) => {
	toast.warn("Item Decrement Qty to Cart");

	dispatch({
		type: types.DECREMENT_QTY,
		productId
	})
};

//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
	toast.success("Item Added to Wishlist");
	dispatch(addToWishlistUnsafe(product))

}
export const addToWishlistUnsafe = (product) => ({
	type: types.ADD_TO_WISHLIST,
	product
});
export const removeFromWishlist = product_id => (dispatch) => {
	toast.error("Item Removed from Wishlist");
	dispatch({
		type: types.REMOVE_FROM_WISHLIST,
		product_id
	})
};

//Compare Products
export const addToCompare = (product) => (dispatch) => {
	toast.success("Item Added to Compare");
	dispatch(addToCompareUnsafe(product))

}
export const addToCompareUnsafe = (product) => ({
	type: types.ADD_TO_COMPARE,
	product
});
export const removeFromCompare = product_id => ({
	type: types.REMOVE_FROM_COMPARE,
	product_id
});


// Filters
export const filterBrand = (brand) => ({
	type: types.FILTER_BRAND,
	brand
});
export const filterColor = (color) => ({
	type: types.FILTER_COLOR,
	color
});
export const filterPrice = (value) => ({
	type: types.FILTER_PRICE,
	value
});
export const filterSort = (sort_by) => ({
	type: types.SORT_BY,
	sort_by
});


// Currency
export const changeCurrency = (symbol) => ({
	type: types.CHANGE_CURRENCY,
	symbol
});

