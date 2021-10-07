<template>
  <div class="home">
    <div class="body">
      <div class="banner-zone text-center">
        <Animation />
        <div class="inner-wrap">
          <div class="banner-text-wrap">
            <el-row class="banner-text">
              艺术之 <span class="text-primary">设计</span>.
            </el-row>
            <!-- <el-row class="banner-text pt0">
              In <span class="text-primary">DESIGN</span> we believe.
            </el-row> -->
            <el-row class="banner-text pt0 mt50">
              <button class="f100"
                      @click="scrollToService()">
                立刻体验
                <i class="el-icon-right ml5" />
              </button>
            </el-row>
          </div>

        </div>
      </div>

      <!-- <div class="home-news">
        <div class="inner-wrap">
          <h1>News</h1>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="news in newsList"
                              :key="news">
              <h3>{{ news }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div> -->

      <div id="ourService"
           class="home-design">
        <div class="inner-wrap">
          <h1>服务</h1>
          <el-row :gutter="30"
                  class="img-container">
            <el-col :span="16">
              <img src="@/assets/images/service.jpg" />
              <p>个人/企业网站定制</p>
            </el-col>
            <el-col :span="8"
                    @click.native="$router.push('/about')">
              <img src="@/assets/images/consult.jpg" />
              <p>IT咨询/技术支持</p>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="home-about">
        <h1 class="mb30">关于奇思实验室</h1>
        <div class="inner-wrap">
          <h3>奇思实验室是二进制世界的 <span class="text-primary"
                  style="cursor: pointer"
                  @click="$router.push('/about')">Ky</span>
            用作记录他稍瞬即逝 迸裂灵感并进行实践的超空间。欢迎拥有共同价值观与志向的伙伴！
          </h3>
        </div>
      </div>

      <div class="home-topic">
        <div class="inner-wrap">
          <h1 class="mb30">加入我们</h1>
          <h3>我们需要设计天赋过人、才华洋溢的你！<router-link class="text-primary"
                         to="/about">了解详情
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
      position: relative;

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

        @media screen and (max-width: 568px) {
          font-size: 18px;
        }
      }

      .banner-text-wrap {
        margin-top: calc(50vh - 50px);
        transform: translateY(-50%);
        .banner-text {
          text-align: left;
          color: #000;
          font-size: 88px;
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
            font-size: 36px;
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
      @media screen and (max-width: 768px) {
        padding: 20px;
      }
    }

    .home-about {
      border-top: 1px solid #ccc;
      margin: 0 calc((100vw - 1200px) / 2);

      @media screen and (max-width: 768px) {
        margin: 0 auto;
      }
    }

    .home-news {
      text-align: left;
    }

    .home-design {
      text-align: left;
      padding-bottom: 100px;

      h1 {
        margin-bottom: 20px;
        text-align: right;
        font-weight: 500;
      }
      @media screen and (max-width: 568px) {
        padding-bottom: 20px;
      }
    }

    #ourService {
      text-align: center;
      overflow: hidden;

      h1 {
        line-height: 100px;
      }

      i {
        font-size: 60px;
      }

      .img-container {
        height: 500px;
        overflow: hidden;

        & > * {
          position: relative;
          height: 100%;
        }

        img {
          cursor: pointer;
          transition: all 0.3s;
          position: relative;

          & + p {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            font-size: 18px;
            border-top: 1px solid #fff;
            padding-top: 10px;
            transition: all 0.3s;
          }

          &:hover {
            opacity: 0.8;

            & + p {
              padding-left: 10px;
              padding-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
