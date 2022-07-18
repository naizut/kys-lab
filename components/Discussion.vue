<template>
  <div class="discussion">
    <h2 class="mb50">Discussion</h2>
    <div
      v-for="(commentItem, commentIndex) in comments.items"
      :key="commentItem.id"
    >
      {{ commentIndex }}# {{ commentItem.author }} <br />
      {{ commentItem.content }}
    </div>
    <div class="comment-form">
      <div class="comment-contact">
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
</template>

<script>
export default {
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  
  data() {
    return {
      comment: {
        author: '',
        author_email: '',
        content: '',
      },
      comments: {
        items: [],
        totalCount: 0,
      },
    }
  },
  
  async mounted() {
    const res = await this.$axios({
      method: 'post',
      url: `/api/comments/query`,
      data: {
        keywords: '',
        articleId: Number(this.articleId),
        pageIndex: 1,
        pageSize: 10,
      },
    })
    if (res.isSuccess) {
      this.comments = { ...res.data.result }
    }
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
.discussion {
  .comment-form {
    .comment-contact {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>