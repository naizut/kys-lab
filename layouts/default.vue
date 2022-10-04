<template>
  <div class="page-container layout">
    <Header ref="header" :is-home="false" />

    <div class="layout__content-container" @click="shortenSearchInput()">
      <div class="layout__content pd0 mg0">
        <Nuxt />
      </div>
    </div>

    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Business/header'
import Footer from '@/components/Business/footer'

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
