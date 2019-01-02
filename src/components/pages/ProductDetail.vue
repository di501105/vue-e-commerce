<template>
  <div>
    <HomeNavbar/>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row mb-7">
        <div class="col-md-8">
          <div class="detail-card">
            <div class="detail-image" :style="{backgroundImage: `url(${product.imageUrl})`}">
              <div class="detail-tag">{{ product.category }}</div>
              <div class="detail-favorite">
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
          </div>
      
        </div>
        <div class="col-md-4">
            <h1 class="h2">{{ product.title }}</h1>
            <div class="d-flex justify-content-end align-items-end">
              <del class="text-primary-100">原價 {{ product.origin_price | currency }}</del>
              <div class="h3 ml-auto mb-0 text-danger">
                <small>特價 </small>
                <strong>{{ product.price | currency }}</strong>
              </div>
            </div>
            <div class="mt-3">
              <div class="h4">商品介紹</div>
              <p>{{ product.description }}</p>
            </div>
            
            <div class="input-group mt-3">
              <select name="" id="" class="form-control mr-2" v-model="count">
                <option :value="i" v-for="i in 10" :key="i">
                  {{i}} {{product.unit}}
                </option>
              </select>
              <a href="#" class="btn btn-primary" @click="addtoCart(product.id, count)">加入購物車</a>
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

export default {
  components: {
    HomeNavbar,
    Footer,
  },
  data() {
    return {
      product: [],
      productId: '',
      count: 1,
      status: {
        loadingItem: '',
      },
      isLoading: false,
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        if (response.data.success) {
          console.log(response)
          vm.product = response.data.product;
          vm.status.loadingItem = '';
        } else {
          console.log(response.data.message);
        }
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, {data: cart}).then((response) => {
        vm.isLoading = false;
        console.log(response);
        vm.status.loadingItem = '';
      });
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
    // console.log(this.productId)
  },
}
</script>