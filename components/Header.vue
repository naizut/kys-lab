<template>
  <nav class="header">
    <div class="header__content">
      <router-link to="/home"
                   class="logo"
      >
        <!-- <img src="@/assets/brand.png"
             alt="Logo"
        >
        <span>s</span> -->
        <span>{{isCN?'奇思实验室':`Ky's Lab`}}</span>
      </router-link>
      <NavMenuPc ref="navbarPC" :is-home="isHome" />
    </div>
  </nav>
</template>
<script>
import NavMenuPc from './NavMenuPc'

export default {
  name: 'Header',
  components: {
    NavMenuPc
  },

  props: {
    isHome: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    }
  },
  
  methods: {
    shortenSearchInput() {
      this.$refs.navbarPC.hideSearchBar()
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 5px solid transparent;
  box-sizing: border-box;

  height: 80px;
  width: 100%;
  // position: fixed;
  // top: 0;
  z-index: 1;
  .header__content {
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    @media screen and (max-width: 1200px) {
      padding: 0 20px;
    }
    a.logo {
      display: flex;
      line-height: 80px;
      text-decoration: none;
      width: 218px;
      img {
        height: 80px;
      }
      span {
        color: #000;
        font-size: 30px;

        @media screen and (max-width: 375px) {
          font-size: 24px;
        }
      }
    }
  }
}
</style>
