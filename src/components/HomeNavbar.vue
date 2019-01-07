<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-white">
      <div class="container">
        <button class="navbar-toggler d-md-none d-flex align-items-center" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="material-icons">menu</i>
        </button>
        <router-link class="navbar-brand" to="/home">
          <img src="static/images/logo-all-dark.svg" width="220" height="40" alt="" class="d-none d-md-inline-block">
          <img src="static/images/logotype-sm-dark.svg" width="114" height="18" alt="" class="d-inline-block d-md-none">
        </router-link>
        <router-link class="nav-link d-flex align-items-center order-md-1 btn-cart" to="/cart">
          <i class="material-icons">shopping_cart</i>
          <span class="badge badge-pill badge-danger" v-if="cart.carts">{{ cart.carts.length }}</span>
        </router-link>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold" to="/home" active-class="active">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold" to="/shopping" active-class="active">甜點</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link font-weight-bold" to="/login" active-class="active">登入</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    getCart() {
      this.$store.dispatch('getCart');
    },
    removeCartItem(id) {
      this.$store.dispatch('removeCartItem', id);
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'cart']),
  },
  created() {
    this.getCart();
  },
}
</script>

<style lang="scss" scoped>
.btn-cart {
  background-color: transparent;
  position: relative;
  .badge {
    position: absolute;
    top: -1px;
    right: -1px;
  }
}
</style>