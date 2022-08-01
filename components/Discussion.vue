<template>
  <div class="discussion">
    <h2 class="discussion-title">Discussion</h2>
    <div
      v-for="(commentItem, commentItemIndex) in comments.items"
      :key="commentItem.id"
      class="comment-item"
    >
      <!-- <div v-show="commentItem.target_comment_id">
        Reply To: #{{commentItem.target_comment_floor_num}} {{commentItem.target_comment_author}}
      </div> -->
      <div>
        <h3>{{ commentItem.author }}</h3>
        <a
          href="javascript:void()"
          @click="doReply(commentItem, commentItemIndex)"
          >Reply</a
        >
      </div>
      <time>Posted on {{ commentItem.created_on }}</time>
      <br />
      <p>{{ commentItem.content }}</p>

      <div v-for="(subComment, subCommentIndex) in commentItem.children" :key="subComment.id" class="comment-level-2 ml20 mt20">
        <div>
          <h3>{{ subComment.author }}</h3>
          <a
            href="javascript:void()"
            @click="doReply(subComment, subCommentIndex)"
            >Reply</a
          >
        </div>
        <time>Posted on {{ subComment.created_on }}</time>
        <br />
        <p>{{ commentItem.content }}</p>
      </div>
    </div>
    <div class="comment-form">
      <div v-show="comment.targetCommentId" class="comment-reply">
        Reply to:{{ comment.targetCommentAuthor }}
      </div>
      <div class="comment-contact">
        <el-input
          v-model="comment.author"
          type="text"
          placeholder="Your Name"
          maxlength="20"
          show-word-limit
          class="mr5"
          round
        >
        </el-input>
        <el-input
          v-model="comment.authorEmail"
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
        maxlength="500"
        show-word-limit
        class="mt10"
        :autosize="{ minRows: 10, maxRows: 30 }"
      >
      </el-input>
      <el-button class="mt10" @click="doSubmit">Submit</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      comment: {
        content: '',
        author: '',
        authorEmail: '',
        articleId: -1,
        rootCommentId: -1,
        targetCommentId: -1,
        targetCommentFloorNum: -1,
        targetCommentAuthor: '',
      },
      comments: {
        items: [],
        totalCount: 0,
      },
    }
  },

  created() {
    this.getComments()
  },

  methods: {
    async getComments() {
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
      if (res.data.code == 200) {
        this.comments = { ...res.data.result }
        this.comments.items = this.comments.items.filter(
          (x) => !x.root_comment_id
        )
        this.comments.items = this.comments.items.map((x) => {
          x.children = [
            ...res.data.result.items.filter((y) => y.root_comment_id == x.id),
          ]
          return x
        })
      }
    },
    doReply(obj, index) {
      if(obj.rootCommentId) {
        this.comment.rootCommentId = obj.rootCommentId
      }else {
        this.comment.rootCommentId = obj.id
      }
      this.comment.targetCommentId = obj.id
      this.comment.targetCommentAuthor = obj.author
      this.comment.targetCommentFloorNum = index
    },
    async doSubmit() {
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
          articleId: this.articleId,
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
  width: 100%;
  margin-top: 100px;

  .discussion-title {
    font-size: 38px;
  }

  .comment-item {
    margin: 16px 0;
    padding: 16px;
    border: 1px solid #ccc;

    div {
      overflow: hidden;
      h3 {
        margin: 0;
        font-weight: bold;
      }
      a {
        text-decoration: underline;
        float: right;
        margin-top: 5px;
      }
    }

    p {
      margin-top: 10px;
      font-family: Lato;
      font-weight: 600;
    }
    time {
      font-size: 12px;
    }
  }
  .comment-form {
    .comment-reply {
      margin-bottom: 16px;
    }
    .comment-contact {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
