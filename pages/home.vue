<template>
  <div class="home">
    <div class="body">
      <div class="banner-zone text-center">
        <div class="inner-wrap">
          <div class="banner-text-wrap">
            <el-row class="banner-text">
              <template v-if="isCN">
                艺术之 <span class="text-primary">设计</span>.
              </template>
              <template v-else>
                The Art of <span class="text-primary">Design</span>.
              </template>
            </el-row>
            <!-- <el-row class="banner-text pt0">
              In <span class="text-primary">DESIGN</span> we believe.
            </el-row> -->
            <el-row class="banner-text pt0 mt50">
              <button class="f100"
                      @click="scrollToService()">
              <template v-if="isCN">
                立刻体验
              </template>
              <template v-else>
                Get Design Now
              </template>
                <i class="el-icon-right ml5" />
              </button>
            </el-row>
          </div>

        </div>
      </div>

      <div class="home-news">
        <div class="inner-wrap">
          <h1>News</h1>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="news in newsList"
                              :key="news">
              <h3>{{ news }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div id="ourService"
           class="home-design">
        <div class="inner-wrap">
          <h1 class="text-center">Service</h1>
          <ul>
            <li>Responsive Design</li>
            <li>Affordable price</li>
          </ul>
        </div>
      </div>
      
      <div class="home-about">
        <h1 class="mb30">About Ky's Lab</h1>
        <div class="inner-wrap">
          <h3>Ky's Lab is where <span class="text-primary"
                  style="cursor: pointer"
                  @click="$router.push('/about')">Ky</span>
            shares his extra-ordinary fatastic ideas and all ready to make them real with codes. Anyone want to join is welcome.
          </h3>
        </div>
      </div>

      <div class="home-topic">
        <div class="inner-wrap">
          <h1 class="mb30">Join Us</h1>
          <h3>We desire for talented designers! <router-link class="text-primary"
                         to="/about">Contact Me Now
            </router-link>
          </h3>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      newsList: [],
    }
  },

  head() {
    return {
      title: "Ky's Lab - 记录生活, 分享观点 | Kevin Zhou的个人网站",
    }
  },

  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    },
  },

  mounted() {
    this.loadPageDatas()
  },

  methods: {
    async loadPageDatas() {
      const res = await this.$axios({
        url: '/api/articles/list',
        method: 'get',
      })
      this.newsList = res.data.rows
        .filter((x) => x.type == '新闻')
        .sort((v1, v2) => {
          return new Date(v2.created_on) - new Date(v1.created_on)
        })
    },
    
    scrollToService() {
      this.$nextTick(() => {
        const top = document.getElementById('ourService').offsetTop
        window.scrollTo({
          top,
          behavior: 'smooth',
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  .body {
    .banner-zone {
      height: calc(100vh - 100px);
      overflow: hidden;

      img {
        width: 100%;
      }

      button {
        text-align: left;
        color: #000;
        font-size: 48px;
        border: 1px solid #f2f2f2;
        border-radius: 50px;
        cursor: pointer;
        font-size: 48px;
        font-weight: 300;
        padding: 10px 30px;
        transition: all 0.6s;
        animation-delay: 2s;

        a {
          transition: all 0.6s;
        }

        &:hover {
          background: #000;
          color: #fff;

          a {
            color: #fff;
          }
        }

        @media screen and (max-width: 425px) {
          font-size: 22px;
        }
      }

      .banner-text-wrap {
        margin-top: calc(50vh - 50px);
        transform: translateY(-50%);
        .banner-text {
          text-align: left;
          color: #000;
          font-size: 100px;
          font-weight: 300;
          opacity: 0;
          animation: fadeInTop 2s forwards;

          &:nth-of-type(2) {
            animation-delay: 0.5s;
          }

          &:nth-of-type(3) {
            animation-delay: 1s;
          }

          @media screen and (max-width: 1024px) {
            padding-top: 120px;
          }

          @media screen and (max-width: 425px) {
            padding-top: 60px;
            max-width: 250px;
            text-align: center;
            margin: auto;
          }
        }
      }
    }

    .home-news,
    .home-about,
    .home-topic {
      // background: #000;
      // color: #fff;
      padding: 100px 0;
      h1 {
        font-size: 48px;
      }
    }

    .home-about {
      border-bottom: 1px solid #ccc;
      margin: 0 calc((100vw - 1200px) / 2);
    }

    .home-news {
      text-align: left;
    }

    .home-design {
      text-align: left;
      padding: 30px 0;

      h1 {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
