<template>
  <div>
    <About v-if="!isCN" />
    <AboutCN v-else />
  </div>
</template>

<script>
import About from './modules/about/en.vue'
import AboutCN from './modules/about/cn.vue'

export default {
  components: {
    About,
    AboutCN
  },
  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    }
  }
}
</script>