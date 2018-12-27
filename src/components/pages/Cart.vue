<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <HomeNavbar/>
    <section class="container">
      <div class="jumbotron text-center" v-if="cart.carts.length === 0">
        <div class="h2 mb-5">購物車內無商品</div>
        <router-link class="btn btn-minor btn-xl text-primary font-weight-bold" to="/shopping">前往商城選購</router-link>
      </div>
      <div class="row cart" v-else>
        <div class="col-lg-8 px-0 px-md-1">
          <h1 class="h4 bg-primary-200 text-center font-weight-bold py-2 mb-0">
            您的購物車
          </h1>
          <div class="cart-row d-flex flex-column flex-md-row pt-3 py-md-3" v-for="item in cart.carts" :key="item.id" v-if="cart.carts">
            <div class="d-flex align-items-center flex-grow-1">
              <div class="flex-grow-1 flex-md-grow-0 mr-2 mr-md-6">
                <div class="cart-image" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
              </div>
              <div class="d-flex align-items-center justify-content-between flex-column flex-md-row">
                <div class="mr-auto mr-md-8 mr-lg-6">
                  <span class="h5">{{ item.product.title }}</span><br>
                  <span>{{ item.qty }} {{ item.product.unit }}</span>
                  <span>NT$ {{ item.total | currency }}</span>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-end ml-md-auto flex-md-row-reverse price py-3 mt-1 mt-md-0">
              <a href="#" class="btn d-none d-md-block"><span class="material-icons" @click="removeCartItem(item.id)">delete_outline</span></a>
              <span class="h5 mb-0 mr-md-4 font-weight-bold">NT$ {{ item.total }}</span>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mt-5 mt-lg-0 px-0 px-md-1">
          <div class="cart-info-box px-3 pb-2">
            <h2 class="h4 font-weight-bold text-center cart-info-title m-0 py-2">訂單摘要</h2>
            <hr class="border-white mt-0">
            <div class="d-flex justify-content-between mb-1" v-if="cart.total === cart.final_total">
              <span>小計</span>
              <span>NT$ {{ cart.total | currency }}</span>
            </div>
            <div class="d-flex justify-content-between mb-1" v-else>
              <span>小計</span>
              <span>NT$ {{ cart.final_total | currency }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3">
              <span>運費</span>
              <span>NT$ 60</span>
            </div>
            <div class="input-group mb3 input-group-sm mb-2">
              <input type="text" class="form-control" v-model="coupon_code" placeholder="輸入優惠碼">
              <div class="input-group-append">
                <button class="btn btn-minor text-primary" @click="addCouponCode">套用優惠碼</button>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <span class="h5 m-0 font-weight-bold">總計</span>
              <span class="h5 m-0 font-weight-bold">NT$ {{ cart.final_total + 60 | currency }}</span>
            </div>
          </div>
          <router-link class="btn btn-minor btn-block btn-xl text-primary font-weight-bold" to="/checkout">結帳</router-link>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import HomeNavbar from '../HomeNavbar';
import Footer from '../Footer';

export default {
  components: {
    HomeNavbar,
    Footer,
  },
  data() {
    return {
      status: {
        loadingItem: '',
      },
      cart: {},
      isLoading: false,
      coupon_code: '',
    };
  },
  methods: {
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
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        vm.getCart();
        console.log(response);
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(url, {data:coupon}).then((response) => {
        console.log(response);
        this.getCart();
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, {data:order}).then((response) => {
            console.log('訂單已建立', response);
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
            // this.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  created() {
    this.getCart();

  },
}
</script>