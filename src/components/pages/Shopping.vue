<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <HomeNavbar/>
    <div class="container px-0 px-md-1 mb-0 mb-md-7">
      <header class="header">
        <div class="bg-cover header-main-image" style="background-image: url(https://images.unsplash.com/photo-1512484457149-266d165a4eca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=786581a33fd6c9343735655439ce2e5a&auto=format&fit=crop&w=800&q=60)">
          <h1 class="text-hide">Sweetaste 甜點
            <img src="static/images/lg-想吃甜點是不需要理由的.svg" class="header-image-slogan" width="89" alt="">
          </h1>
        </div>
      </header>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-4 px-0 px-md-1">
          <div class="sticky-top" style="top: 20px;">
            <h2 class="h4 font-weight-bold bg-primary text-white text-center mb-0 py-2">甜點類別</h2>
          <ul class="list-group text-center mb-5 sticky-top">
            <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action" :class="{'active': category === '所有甜點'}" @click.prevent="category = '所有甜點'; getProducts()">所有甜點</a>
            <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action" :class="{'active': category === '人氣商品'}" @click.prevent="category = '人氣商品'; getProducts()">人氣商品</a>
            <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action" :class="{'active': category === '新品上市'}" @click.prevent="category = '新品上市'; getProducts()">新品上市</a>
            <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action" :class="{'active': category === '本日精選'}" @click.prevent="category = '本日精選'; getProducts()">本日精選</a>
            <!-- <a href="#" class="h4 font-weight-bold list-group-item list-group-item-action" :class="{'active': category === item}" v-for="item in categoryList" :key="item" @click.prevent="category = item; getProducts()">{{ item }}</a> -->
          </ul>
          </div>
          
        </div>
        <div class="col-lg-8">
          <div class="row">
            <div class="col-md-6 mb-5 mb-md-3" v-for="item in filterData" :key="item.id">
              <div class="product-card">
                <div class="product-image" :style="{backgroundImage: `url(${item.imageUrl})`}">
                  <div class="product-tag">{{ item.category }}</div>
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
                <router-link class="product-body text-center d-flex" :to="`/shopping/${item.id}`">
                  <div class="product-name col">{{ item.title }}</div>
                  <strong class="product-price col">NT$ {{ item.price }}</strong>
                </router-link>
                <a href="#" class="btn btn-primary-lighter btn-block btn-xl mt-0"
                @click.prevent="addtoCart(item.id)">加入購物車</a>
              </div>
            </div>
          </div>

          <div class="mt-1 mb-7">
            <Pagination :pages="pagination" @emitPages="getProducts" v-if="pagination"></Pagination>
          </div>
        </div>
      </div>
    </div>
    <Footer/>

  </div>
</template>


<script>
import HomeNavbar from '../HomeNavbar';
import Footer from '../Footer';
import Pagination from '../Pagination';
import { mapGetters } from 'vuex';

export default {
  components: {
    HomeNavbar,
    Footer,
    Pagination,
  },
  data() {
    return {
      category: '所有甜點',
    };
  },
  methods: {
    getProducts(page = 1) {
      let url = this.category === '所有甜點'
        ?`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page=${page}`
        :`${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products/all`; 
      this.$store.dispatch('getProducts', url);
    },
    // getCategoryList() {
    //   const vm = this;
    //   const categoryList = new Set();
    //   vm.products.forEach((item, i) => {
    //     categoryList.add(item.category);
    //   });
    //   console.log(categoryList);
    //   vm.categoryList = Array.from(categoryList).sort();
    // },
    addtoCart(id, qty = 1) {
      this.$store.dispatch('addtoCart', {id, qty});
    },
    getCart() {
      this.$store.dispatch('getCart');
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'products', 'pagination', 'cart']),
    // categoryList() {
    //   return this.$store.state.categoryList;
    // },
    filterData() {
      const vm = this;
      return vm.products.filter((item) => {
        if (vm.category === '所有甜點') {
          return item;
        } else {
          return item.category === vm.category;
        }
      })
    },
  },
  created() {
    this.getProducts();
  },
}
</script>