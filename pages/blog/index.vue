<template>
  <div class="article-list-page">
    <div class="inner-wrap">
      <!-- BreadCrumb Here -->
      <div class="bread-crumb pd20 mb10 pl0">
        <router-link to="/home">{{ isCN ? '首页' : 'Home' }}</router-link> >
        {{ isCN ? '博客' : 'Blog' }}
        <template v-if="$route.query.type"
          >> <span class="text-primary">{{ $route.query.type }}</span></template
        >
      </div>

      <!-- Banner && Brief Here -->
      <!-- Filter Here -->
      <el-row class="article-filters pull-left mb30">
        <div class="article-filter">
          <el-row class="article-filter-label mb10">
            {{ isCN ? '文章分类' : 'Types' }}：
          </el-row>
          <el-select
            v-model="type"
            :placeholder="isCN ? '选择文章分类' : 'Select Type'"
            @change="handleTypeSelect"
          >
            <el-option :label="isCN ? '全部' : 'All'" :value="''"></el-option>
            <el-option
              v-for="item in types"
              :key="item"
              :value="item"
              :label="item"
            />
          </el-select>
        </div>
      </el-row>
      <!-- 多个分类的前几篇文章代替filters -->
      <!-- 列表模块 -->
      <el-row class="article-list-title mb50 fadeIn">
        <span class="pull-left f24">{{ isCN ? '文章列表' : 'Articles' }}</span>
        <span class="pull-right f14">More</span>
      </el-row>
      <div class="article-list">
        <el-row v-for="article in articles" :key="article.id" class="article">
          <el-row class="title">
            <NuxtLink :to="`/blog/detail?id=${article.id}`">
              <h1>&lt; {{ article.title }} &gt;</h1>
            </NuxtLink>
          </el-row>
          <el-row class="f14">
            <p>最后编辑时间: {{ article.modified_on }}</p>
          </el-row>
          <el-row class="mt5 tags">
            <span
              v-for="(tag, tagIndex) in article.tags.split(',')"
              :key="tagIndex"
              class="tag"
            >
              {{ tag }}
            </span>
          </el-row>
        </el-row>
      </div>
    </div>
    <el-pagination
      v-if="totalCount>10"
      :current-page="queryInput.pageIndex"
      :page-size="queryInput.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Blog',

  async asyncData($nuxt) {
    let types = {}
    await $nuxt.$axios({
      methods: 'get',
      url: '/api/articles/types',
    })
    .then((res) => {
      types = [...res.data.result]
    })

    let articles = {}
    let totalCount = 0

    const queryInput = {
      type: $nuxt.route.query.type || '',
      keywords: '',
      pageIndex: 1,
      pageSize: 10,
    }

    await $nuxt.$axios({
      url: '/api/articles/query',
      method: 'post',
      data: queryInput,
    })
    .then((res) => {
      articles = [...res.data.result.items]
      totalCount = res.data.result.totalCount
    })

    return {
      articles,
      types,
      totalCount,
      queryInput
    }
  },

  data() {
    return {
      articles: {},
      types: [],
      type: this.$route.query.type || '',
    }
  },

  head() {
    return {
      title: `My Blog | Ky's lab - Idea Factory, Mind Blasting`,
    }
  },

  computed: {
    isCN() {
      return this.$store.state.lang == 'cn'
    },
  },

  methods: {
    async initArticles() {
      this.loading = true

      await this.$axios({
        url: '/api/articles/query',
        method: 'post',
        data: this.queryInput,
      }).then((res) => {
        this.articles = res.data.result.items
        this.totalCount = res.data.result.totalCount
      })

      this.loading = false
    },

    handleCurrentChange(i) {
      this.queryInput.pageIndex = i
      this.initArticles()
    },

    handleSizeChange(size) {
      this.queryInput.pageIndex = 1
      this.queryInput.pageSize = size
      this.initArticles()
    },

    handleTypeSelect(v) {
      this.$router.replace(`/blog?type=${v}`)
      this.initArticles()
    },
  },
}
</script>

<style lang="scss" scoped>
.article-list-page {
  padding-bottom: 60px;

  .article-filters {
    text-align: left;
  }

  .article-list-title {
    text-align: left;
    clear: both;
  }

  .article-list {
    min-height: 80vh;

    .article {
      text-align: left;
      transition: all 0.2s;
      position: relative;
      border-left: 2px solid #f2f2f2;
      padding: 0 20px 15px 20px;

      &::after {
        content: '';
        position: absolute;
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        background: #ccc;
        border-radius: 10px;
      }

      &:hover {
        opacity: 0.5;
      }
      
      .title {
        a,
        h1 {
          font-size: 20px;
          line-height: 48px;
          font-weight: 300;
          color: #666;
        }
      }
    }
  }
}
</style>
