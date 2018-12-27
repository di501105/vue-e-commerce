<template>
  <div>
    <HomeNavbar/>
    <HomeContent/>
    <HomeProducts/>
    <Footer/>
  </div>
</template>

<script>
import HomeNavbar from '../HomeNavbar';
import HomeContent from '../HomeContent';
import HomeProducts from '../HomeProducts';
import Footer from '../Footer';

export default {
  components: {
    HomeNavbar,
    HomeContent,
    HomeProducts,
    Footer,
  },
}
</script>