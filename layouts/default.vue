<template>
  <div class="page-container layout">
    <Header ref="header" :is-home="false" />

    <el-container class="layout__content-container" @click.native="shortenSearchInput()">
      <el-main class="layout__content pd0 mg0">
        <Nuxt />
      </el-main>
    </el-container>

    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Layout',

  components: {
    Header,
    Footer
  },

  data() {
    return {
      isNight: false
    }
  },

  methods: {
    shortenSearchInput() {
      this.$refs.header.shortenSearchInput()
    }
  }
}
</script>

<style lang="scss">
.layout {
  width: 100%;
  .layout__content-container {
    min-height: calc(100vh - 46px);
    position: relative;
    .layout__content {

    }
  }
}
</style>
