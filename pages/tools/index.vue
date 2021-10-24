<template>
  <div class="my-tools app-list">
    <div class="inner-wrap">
      <el-row :gutter="20">
        <el-col :span="8"
                class="app pd20"
                @click.native="gotoTODO()"
        >
          <el-row>
            <el-image :src="require('@/assets/images/todolist.png')" />
          </el-row>
          <el-row class="name">
            ToDoList
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    gotoTODO(pathName) {
      this.$router.push('/tools/to-do-list')
    }
  }
}
</script>
<style lang="scss" scoped>
.my-tools {
  .app {
    border: 1px solid #eee;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.6s;
    .name {
      font-size: 24px;
      font-family: 'Lato';
      line-height: 28px;
    }
  }
}
</style>
