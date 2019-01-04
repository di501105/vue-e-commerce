<template>
  <div>
    <Navbar/>
    <Alert/>
    <div class="container">
      <div class="row">
        <main role="main" class="col px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../Navbar';
import Alert from '../AlertMessage'

export default {
  components: {
    Navbar,
    Alert,
  },
}
</script>