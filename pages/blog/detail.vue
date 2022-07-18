<template>
  <div class="article-detail">
    <div class="inner-wrap">
      <div class="article__content">
        <div class="bread-crumb pd20 mb20 pl0">
          <router-link to="/home">Home</router-link> > Blog
          <template v-if="$route.query.type"
            >>
            <span class="text-primary">{{ $route.query.type }}</span></template
          >
        </div>
        <h1>{{ article.title }}</h1>
        <time>{{ article.modified_on }}</time>
        <article v-html="article.content" />
        <div class="mt20">{{ isCN ? '分类' : 'Type' }}: {{ article.type }}</div>
        <div v-if="article.tag">
          <span
            v-for="(tag, tagIndex) in article.tag.split(',')"
            :key="tagIndex"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <hr />

        <Discussion :article-id="Number(id)" />
      </div>

      <!-- <div class="right-sidebar">
        Advertisement
      </div> -->
    </div>
  </div>
</template>

<script>
import Discussion from '@/components/Discussion.vue'
export default {
  name: 'BlogDetail',
  components: { Discussion },
  async asyncData($nuxt) {
    let article = {}

    await $nuxt
      .$axios({
        method: 'get',
        url: `/api/articles/get/${$nuxt.route.query.id}`,
      })
      .then((res) => {
        article = { ...res.data.result }
      })
      .catch((err) => {
        console.log(err)
        $nuxt.redirect('/blog')
      })

    return {
      article,
    }
  },

  data() {
    return {
      article: {},
      id: this.$route.query.id,
    }
  },

  head() {
    return {
      title: `${this.article.title} | Ky's lab - Idea Factory, Mind Blasting`,
    }
  },

  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    },
  },
}
</script>

<style lang="scss" scoped>
.article-detail {
  overflow: hidden;
  padding: 15px 0;
  padding-bottom: 60px;
  @media screen and (max-width: 599px) {
    padding-bottom: 60px;
  }

  .inner-wrap {
    display: flex;
    align-items: flex-start;

    .article__content {
      flex: 1;
      margin: 0;

      article {
        @media screen and (min-width: 1024px) {
          min-height: 35vh;
        }
        margin-top: 50px;
        h1 {
          font-weight: bold;
        }
      }
    }

    .right-sidebar {
      width: 225px;
      padding-left: 25px;
      @media screen and (max-width: 599px) {
        display: none;
      }
    }
  }
}
</style>
