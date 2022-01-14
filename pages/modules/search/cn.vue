<template>
  <div class="search-result">
    <div class="inner-wrap">
      <el-row class="text-left mt50">
        <h2 v-if="articles.length > 0" class="mt0">为您找到 {{ articles.length }} 条 &lt; <span class="text-primary">{{ keyword }}</span> &gt;的结果 </h2>
        <h2 v-else>找到 0 条结果.</h2>
      </el-row>
      <section class="mt50 text-left">
        <div v-for="article in articles"
             :key="article.id"
             style="line-height: 50px"
        >
          <router-link :to="`/blog/detail?id=${article.id}`">
            <h1>&lt; {{ article.title }} &gt;</h1>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
    name: 'Search',
    data() {
        return {
            keyword: this.$route.query.keyword,
            articles: {}
        }
    },
    mounted() {
    this.$axios({
      method: 'post',
      url: '/api/articles/query',
      data: {
        type: '',
        keywords: this.keyword || '',
        pageIndex: 1,
        pageSize: 10,
      },
    }).then((res) => {
      this.articles = res.data.result.items
    })
    }
}
</script>
<style lang="scss">
.search-result {
  h1,h2,h3,span {font-weight: 300}
  a {font-size: 24px;}
}
</style>
