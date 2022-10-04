<template>
  <div>
    <Home v-if="!isCN" />
    <HomeCN v-else />
  </div>
</template>

<script>
import Home from './modules/home/en.vue'
import HomeCN from './modules/home/cn.vue'

export default {
  components: {
    Home,
    HomeCN
  },
  
  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    }
  }
}
</script>
