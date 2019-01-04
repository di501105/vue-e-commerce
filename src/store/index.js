import Vue from 'vue';
import Vuex from 'vuex';
import axiox from 'axios';


Vue.use(Vuex);


export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    pagination: {},
    cart: {
      carts: [],
    },
    // categoryList: [],
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context, payload) {
      const url = payload;
      context.commit('LOADING', true);
      axiox.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('PAGINATION', response.data.pagination);
        // context.commit('CATEGORYLIST', response.data.products);
        console.log(response);
        context.commit('LOADING', false);
      });
    },
    getCart(context) {
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axiox.get(url).then((response) => {
        context.commit('CART', response.data.data);
        console.log(response);
        context.commit('LOADING', false);
      });
    },
    removeCartItem(context, id) {
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axiox.delete(url).then((response) => {
        context.dispatch('getCart');
        console.log(response);
        context.commit('LOADING', false);
      });
    },
    addtoCart(context, {id, qty}) {
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const cart = {
        product_id: id,
        qty,
      };
      axiox.post(url, { data: cart }).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
        console.log(response);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION (state, payload) {
      state.pagination = payload;
    },
    // CATEGORYLIST(state, payload) {
    //   const categoryList = new Set();
    //   payload.forEach((item) => {
    //     categoryList.add(item.category);
    //   });
    //   console.log(categoryList);
    //   state.categoryList = Array.from(categoryList).sort();
    // },
    CART(state, payload) {
      state.cart = payload;
    },
  },
  getters: {
    isLoading: state => state.isLoading,
    products: state => state.products,
    pagination: state => state.pagination,
    cart: state => state.cart,
  },
});