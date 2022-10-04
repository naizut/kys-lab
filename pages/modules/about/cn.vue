<template>
  <div class="about">
    <div class="inner-wrap">
      <!-- BreadCrumb Here -->
      <div class="bread-crumb pd20 mb50 pl0">
        <router-link to="/home">首页</router-link> > <span class="text-primary">关于</span>
      </div>

      <div class="my-profile">
        <div class="avatar f28">
          <div class="avatar-img">我是头像 :D</div>
          <div class="info mt30">
            <h4>Kevin Zhou</h4>
            <p>坐标上海，一枚95后前端攻城狮 拥有三年web前端开发经验</p>
            <p>主要爱好足球，英超阿森纳足球俱乐部支持者，个人游戏开发爱好者，女声Trance</p>
          </div>
        </div>

        <div class="contact">
          <h1>联系方式</h1>
          <p class="f28">微信: <span class="text-primary">vincarchou</span> (推荐)</p>
        </div>
      </div>

      <div class="my-production">
        <el-row class="text-center f24 mt30">
          曾作为主程参与以下项目的开发：
        </el-row>

        <el-row class="projects" :gutter="20">
          <el-col v-for="(proj, index) in projects"
                  :key="index"
                  class="item mt50"
                  :sm="8"
                  :xs="12"
                  @click.native="goTo(proj.url)">
            <div class="cover">
              <img :src="getProjImg(proj.filename)"/>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          name: '紫江',
          filename: 'zijiang.svg',
          url: 'http://zijiangfoundation.com/'
        },
        {
          name: 'Tuntex',
          filename: 'tuntex.svg',
          url: 'https://www.tuntex-carpet.com/'
        },
        {
          name: 'high创',
          filename: 'highco.svg',
          url: 'http://www.highcogroup.com'
        },
        {
          name: 'WeEn-semi',
          filename: 'ween.svg',
          url: 'https://www.ween-semi.com/'
        },
        {
          name: '幸福五号',
          filename: 'zizhu.svg',
          url: 'http://www.zizhufive.org/'
        }
      ]
    }
  },

  head() {
    return {
      title: `Moi, je suis Kevin Zhou`
    }
  },

  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    }
  },

  methods: {
    getProjImg(filename) {
      return require('@/assets/images/about/' + filename)
    },
    goTo(url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  .my-profile {
    overflow: hidden;
    margin-bottom: 150px;

    > * {
      width: 50%;
      float: left;
      text-align: left;
      box-sizing: border-box;
    }

    h4 {
      margin-top: 5px;
    }

    .avatar {
      .avatar-img {
        border: 1px solid #f2f2f2;
        border-radius: 150px;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
        font-size: 20px;
        animation: fadeInLeft 2s;
      }

      .info {
        animation: fadeInLeft 2s;
      }

      @media screen and (max-width: 768px) {
        margin: auto;
        float: none;
        text-align: center;
        width: 100%;

        .avatar-img {
          margin: auto;
        }
      }
    }

    .contact {
      border-left: 1px solid #c2c2c2;
      padding-left: 30px;
      padding-bottom: 50px;
      animation: fadeInTop 2s;

      h1 {
        margin: 0;
        line-height: 150px;
        font-size: 44px;
      }

      p {
        margin-top: 30px;
      }

      @media screen and (max-width: 768px) {
        border-left: none;
        padding-left: 0px;
        width: 100%;
        text-align: center;

        p {
          margin-top: 0px;
        }

        h1 {
          line-height: 120px;
          margin-top: 30px;
        }
      }
    }

    .contact > * {
      font-weight: 300;
    }
  }

  .my-production {
    padding-bottom: 30px;

    .projects {
      .item {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          opacity: 0.7;
        }

        .cover {
          margin: auto;

          height: 100px;
          line-height: 100px;
          width: 100px;

          img {
            width: 100%;
            vertical-align: middle;
            transition: all 0.3s;
          }

          &:hover {
            img {
              transform: scale(1.5);
            }
          }
        }

        .name {
          font-size: 28px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
