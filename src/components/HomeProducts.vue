<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="container mb-5 mb-md-7">
      <div class="row">
        <div class="col-md-4 mb-5 mb-md-0" v-for="(item, i) in products" :key="item.id" v-if="i < 3">
          <div class="product-card">
            <div class="product-image" :style="{backgroundImage: `url(${item.imageUrl})`}">
              <div class="product-tag">本日精選</div>
              <div class="product-favorite">
                <label class="favorite-checked-display">
                  <input type="checkbox" class="favorite-checkbox">
                  <i class="material-icons favorite">
                    favorite
                  </i>
                  <i class="material-icons unfavorite">
                    favorite_border
                  </i>
                </label>
              </div>
            </div>
            <router-link class="product-body text-center d-flex" to="">
              <div class="product-name col">{{ item.title }}</div>
              <strong class="product-price col">NT$ {{ item.price }}</strong>
            </router-link>
            <a href="#" class="btn btn-primary-lighter btn-block btn-xl" @click.prevent="addtoCart(item.id)">加入購物車</a>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>


<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      cart: {},
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        console.log(response);
        vm.status.loadingItem = '';
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, {data:cart}).then((response) => {
        console.log(response);
        $('#productModal').modal('hide');
        vm.status.loadingItem = '';
        vm.getCart();
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        console.log(response);
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();

  },
}
</script>