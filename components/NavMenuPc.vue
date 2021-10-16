<template>
  <div class="navbar-container">
    <div class="pull-right nav-pc">
      <div class="search-zone"
           :class="isHome?'is-home':''"
           @click="showSearchBar"
           @mouseenter="showSearchBar"
           @mouseleave="hideSearchBar">
        <el-input ref="search"
                  v-model="searchText"
                  :placeholder="isCN?'搜索文章标题':'Search Title.'"
                  :class="searchActive?'active':''"
                  @keyup.enter.native="onSearch(searchText)">
          <i slot="suffix"
             class="el-input__icon el-icon-search" />
        </el-input>
      </div>
    </div>

    <div class="pull-right nav-pc">
      <ul class="nav-menu-pc pull-right pr40">
        <li v-for="route in routes"
            :key="route.id"
            :class="{ active: route.path === pathname }">

          <template v-if="route.id == 1">
            <a href="#"
               class="is-blog"
               @click="showTypesDropdown=!showTypesDropdown">{{ isCN?route.nameCN:route.name }}</a>
          </template>
          <router-link v-else
                       :to="route.path"
                       :class="[isHome?'is-home':'']">{{ isCN?route.nameCN:route.name }}</router-link>
        </li>
      </ul>
    </div>

    <div id="languageSwitch"
         class="pull-right nav-pc">
      <el-select v-model="language"
                 :placeholder="isCN?'选择语言':'Select Language'"
                 @change="switchLanguage"
                 >
        <el-option v-for="langOption in langOptions"
                   :key="langOption.name"
                   :label="langOption.name"
                   :value="langOption.value">
        </el-option>
      </el-select>
    </div>

    <div v-if="$route.path == '/blog/detail'"
          id="modeSwitch"
         class="pull-right nav-pc"
         :title="isCN?'切换博客模式':'Switch Blog Mode'"
         @click="switchBlogMode"
         >
      <button>
        <i :class="isCenter?'text-primary':''" class="el-icon-reading"></i>
      </button>
    </div>

    <div class="pull-right nav-mobile"
         @click="showNavMobile">
      <div class="burger" />
    </div>

    <div id="typesDropdown"
         :class="showTypesDropdown?'active':''"
         @mouseover="showTypesDropdown=true"
         @mouseleave="showTypesDropdown=false">
      <div class="inner-wrap">
        <el-col v-for="type in types"
                :key="type.id"
                :span="6"
                class="text-left">
          <router-link :to="`/blog?type=${type}`">{{ type }}</router-link>
        </el-col>
      </div>
    </div>
    <NavMenuMobile />
  </div>

</template>

<script>
import NavMenuMobile from './NavMenuMobile.vue'

export default {
  components: {
    NavMenuMobile,
  },

  props: {
    isHome: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      pathname: '',
      nowIndex: '',
      language: this.$store.state.lang,
      isCenter: false,
      isCN: this.$store.state.lang == 'cn',
      langOptions: [
        { name: 'English', value: 'en' },
        { name: '简体中文', value: 'cn' },
      ],
      routes: [
        {
          id: 0,
          name: 'About',
          nameCN: '关于我',
          path: '/about',
        },
        {
          id: 1,
          name: 'Blog',
          nameCN: '博客',
          path: '/blog',
        },
      ],
      types: [],
      searchActive: false,
      searchText: '',
      showTypesDropdown: false,
    }
  },

  watch: {
    $route(to, from) {
      this.isCenter = false
      this.pathname = window.location.pathname
      if (to.path == from.path) {
        this.$router.go(0)
      }
    },

    '$store.state.lang'() {
      this.isCN = this.$store.state.lang == 'cn'
    },
  },

  mounted() {
    this.pathname = window.location.pathname
    this.loadPageDatas()
    this.bindEvents()
  },

  methods: {
    async loadPageDatas() {
      const res = await this.$axios({
        methods: 'get',
        url: '/api/articles/types',
      })
      this.types = Array.from(new Set(res.data.map((x) => x.type)))
    },

    bindEvents() {
      document.querySelector('.is-blog').onmouseover = () => {
        this.showTypesDropdown = true
      }
      document.querySelector('.is-blog').onmouseout = () => {
        this.showTypesDropdown = false
      }
    },

    showSearchBar() {
      this.searchActive = true
    },

    hideSearchBar() {
      if (!this.$refs.search.focused) {
        this.searchActive = false
      }
    },

    onSearch(value) {
      if (value) {
        this.$router.push({
          path: '/search',
          query: {
            keyword: value,
          },
        })
      }
    },

    showNavMobile() {
      document.querySelector('.nav-menu-mobile').classList.add('active')
    },

    switchBlogMode() {
      Array.from(document.getElementsByClassName('inner-wrap')).forEach(
        (dom) => {
          dom.classList.toggle('blog-mode')
          this.isCenter = dom.classList.contains('blog-mode')
        }
      )
    },

    switchLanguage() {
      Array.from(document.getElementsByClassName('inner-wrap')).forEach(
        (dom) => {
          dom.classList.remove('blog-mode')
          this.isCenter = false
        }
      )
      this.$store.dispatch('switchLanguage', this.language)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar-container {
  width: 100%;
  .el-col {
    transition: all 0.6s ease-in-out;
    margin-bottom: 12px;
  }
  ul.nav-menu-pc {
    margin: 0;
    display: flex;
    align-items: center;
    li {
      text-align: left;
      cursor: pointer;
      transition: ease 0.3s all;
      a {
        color: #000;
        font-size: 18px;
        line-height: 100px;
        transition: ease 0.3s all;
        display: block;
        padding: 0 20px;
        font-weight: 400;
        // &.is-home {color: #fff;}
      }
      &.active a {
        color: $mainColor;
      }
      &:hover {
        // background-color: #333;
        opacity: 0.7;
      }
    }
  }
  .search-zone {
    cursor: pointer;
  }
  #modeSwitch {
    font-size: 12px;
    margin-top: 40px;

    button {
      color: #666;
      cursor: pointer;
      background: #fff;
      border: none;
      font-size: 18px;
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }

  #languageSwitch {
    margin-right: 20px;
    margin-top: 30px;

    max-width: 100px;
  }

  #typesDropdown {
    box-sizing: border-box;
    position: absolute;
    top: 100px;
    right: 0;
    width: 100%;
    height: 0px;
    border-bottom: 1px solid #dadada;
    background: #fff;
    overflow: hidden;

    transition: all 0.6s ease;
    z-index: 999;
    &.active {
      height: 100px;
    }

    a.nuxt-link-exact-active {
      color: $mainColor;
    }

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }

  .nav-pc {
    @media screen and (max-width: 1200px) {
      display: none;
    }
  }
  .nav-mobile {
    display: none;
    margin-top: 40px;
    @media screen and (max-width: 1200px) {
      display: block;
    }
  }
}
</style>
