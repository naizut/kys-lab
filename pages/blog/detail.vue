<template>
  <div class="article-detail">
    <div class="article__content inner-wrap">
      <div class="bread-crumb pd20 mb50 pl0">
        <router-link to="/home">Home</router-link> > Blog > <span class="text-primary">{{ article.type }}</span>
      </div>
      <h1>{{ article.title }}</h1>
      <time>{{ article.modified_on }}</time>
      <article class="mt100"
               v-html="article.content" />
      <div class="mt100">分类: {{ article.type }}</div>
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
      url: '/api/articles/detail/' + $nuxt.route.query.id,
    }).then((res) => {
      article = {...res.data}
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
}
</script>
<style lang="scss" scoped>
.article-detail {
  overflow: hidden;
  padding: 15px 0;
  padding-bottom: 60px;
}
</style>
