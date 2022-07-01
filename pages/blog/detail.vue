<template>
  <div class="article-detail">
    <div class="article__content inner-wrap">
      <div class="bread-crumb pd20 mb50 pl0">
        <router-link to="/home">{{isCN?'首页':'Home'}}</router-link> > {{isCN?'博客':'Blog'}} <template v-if="$route.query.type">> <span class="text-primary">{{ $route.query.type }}</span></template>
      </div>
      <h1>{{ article.title }}</h1>
      <time>{{ article.modified_on }}</time>
      <article class="mt100"
               v-html="article.content" />
      <div class="mt100">{{isCN?'分类':'type'}}: {{ article.type }}</div>
      <div v-if="article.tag" class="mt10">
        <span v-for="(tag, tagIndex) in article.tag.split(',')"
              :key="tagIndex"
              class="tag">
          {{tag}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlogDetail',
  async asyncData($nuxt) {
    let article = {}

    await $nuxt.$axios({
      method: 'get',
      url: `/api/articles/get/${$nuxt.route.query.id}`,
    }).then((res) => {
      article = {...res.data.result}
    }).catch((err)=> {
      console.log(err)
      $nuxt.redirect('/blog')
    })

    return {
      article
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
      title: `${this.article.title} | Ky's lab - Idea Factory, Mind Blasting`
    }
  },

  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    }
  }
}
</script>

<style lang="scss" scoped>
.article-detail {
  overflow: hidden;
  padding: 15px 0;
  padding-bottom: 60px;
}
</style>
