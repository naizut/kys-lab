<template>
  <div class="nav-menu-mobile">
    <div class="nav-menu-mobile-header">
      <div class="pull-left f30"
           @click="goto('/home')">
        {{isCN?'奇思实验室':`Ky's Lab`}}
      </div>
      <div class="close"
           @click="hideNavMenuMobile">
        <i class="el-icon-close" />
      </div>
    </div>

    <div class="nav-menu-mobile-body">
      <ul>
        <li @click="goto('/home')">
          <router-link to="/home">{{isCN?'首页':'Home'}}</router-link>
          <i class="el-icon-arrow-right pull-right" />
        </li>
        <li @click="goto('/about')">
          <router-link to="/about">{{isCN?'关于':'About'}}</router-link>
          <i class="el-icon-arrow-right pull-right" />
          <ul />
        </li>
        <li @click="goto('/blog')">
          <router-link to="/blog">{{isCN?'博客':'Blog'}}</router-link>
          <i class="el-icon-arrow-right pull-right" />
          <ul />
        </li>
      </ul>
    </div>

    <div class="nav-menu-mobile-footer">
      <span @click="setCN">中文</span> / <span @click="setEN">EN</span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    },
  },

  methods: {
    goto(url) {
      this.hideNavMenuMobile()
      this.$router.replace(url)
    },

    hideNavMenuMobile() {
      document.querySelector('.nav-menu-mobile').classList.remove('active')
    },

    setCN() {
      document.querySelector('.nav-menu-mobile').classList.remove('active')
      setTimeout(() => {
        this.$store.dispatch('switchLanguage', 'cn')
      }, 300)
    },

    async setEN() {
      await this.$store.dispatch('switchLanguage', 'en')
      document.querySelector('.nav-menu-mobile').classList.remove('active')
    },
  },
}
</script>
<style lang="scss" scoped>
.nav-menu-mobile {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  z-index: 999;
  transform: translateZ(0);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;

  color: #fff;
  a {
    color: #fff;
  }

  &.active {
    transform: scaleX(1);
  }
  .el-icon-arrow-right {
    margin-top: 2px;
  }
  .nav-menu-mobile-header {
    padding: 35px 20px;
    overflow: hidden;
    .close {
      float: right;
      font-size: 28px;
    }
  }

  .nav-menu-mobile-body {
    padding: 20px;

    > ul {
      text-align: left;
      font-size: 28px;
      li {
        margin-bottom: 20px;
      }
      ul {
        height: 0;
        &.active {
          height: auto;
        }
      }
    }
  }

  .nav-menu-mobile-footer {
    font-size: 28px;
    padding: 20px;
    margin-top: 88px;
  }
}
</style>
