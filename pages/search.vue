<template>
  <div>
    <Search v-if="!isCN" />
    <SearchCN v-else />
  </div>
</template>

<script>
import Search from './modules/search/en.vue'
import SearchCN from './modules/search/cn.vue'

export default {
  components: {
    Search,
    SearchCN
  },
  
  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    }
  }
}
</script>
