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
        <article class="mt10" v-html="article.content" />
        <div class="mt10">{{ isCN ? '分类' : 'type' }}: {{ article.type }}</div>
        <div v-if="article.tag" class="mt10">
          <span
            v-for="(tag, tagIndex) in article.tag.split(',')"
            :key="tagIndex"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <hr />

        <h2>Discussion</h2>
        <div
          v-for="(commentItem, commentIndex) in comments.items"
          :key="commentItem.id"
        >
          {{ commentIndex }}# {{ commentItem.author }} <br />
          {{ commentItem.content }}
        </div>
        <div>
          <div style="display: flex; justify-content: space-between;">
            <el-input
              v-model="comment.author"
              type="text"
              placeholder="Your Name"
              maxlength="20"
              show-word-limit
              class="mr5"
            >
            </el-input>
            <el-input
              v-model="comment.author_email"
              type="text"
              placeholder="Your Email"
              maxlength="100"
              show-word-limit
              class="ml5"
            >
            </el-input>
          </div>
          <el-input
            v-model="comment.content"
            type="textarea"
            placeholder="请输入内容"
            maxlength="200"
            show-word-limit
            class="mt10"
          >
          </el-input>
          <el-button class="mt10" @click="handleSubmit">Submit</el-button>
        </div>
      </div>

      <div class="right-sidebar">
        Advertisement
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlogDetail',
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
      comment: {
        author: '',
        author_email: '',
        content: '',
      },
      comments: {
        items: [],
        totalCount: 0,
      },
      queryInput: {
        keywords: '',
        articleId: Number(this.$route.query.id),
        pageIndex: 1,
        pageSize: 10,
      },
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

  async mounted() {
    await this.$axios({
      method: 'post',
      url: `/api/comments/query`,
      data: {
        keywords: '',
        articleId: Number(this.$route.query.id),
        pageIndex: 1,
        pageSize: 10,
      },
    })
      .then((res) => {
        this.comments = { ...res.data.result }
        console.log(this.comments)
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    async handleSubmit() {
      const { author, content } = this.comment
      if (!author || !content) {
        alert('plz input author and content')
        return
      }

      await this.$axios({
        method: 'post',
        url: `/api/comments/create`,
        data: {
          ...this.comment,
          articleId: this.article.id,
        },
      })
        .then((res) => {
          alert('success')
          location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.article-detail {
  overflow: hidden;
  padding: 15px 0;
  padding-bottom: 60px;

  .inner-wrap {
    display: flex;
    align-items: flex-start;

    .article__content {
      width: 80%;
      margin: 0;

      article {
        min-height: 35vh;
        h1 {
          font-weight: bold;
        }
      }
    }

    .right-sidebar {
      flex: 1;
    }
  }
}
</style>
