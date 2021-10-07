<template>
  <nav class="footer">
    <div class="inner-wrap f12 text-center">
      <span>Copyright © 2018</span>
      <span class="ml5 bei-an">
        <a href="https://beian.aliyun.com/">沪ICP备16033447号-3</a>
      </span>
      <span id="tech-stack" class="ml10">Based on Nuxt.js / Egg.js / Element UI</span>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Footer',
  components: {}
}
</script>
<style lang="scss" scoped>
.footer {
  border-top: 1px solid $mainColor;
  background-color: #000;
  color: #fff;
  .inner-wrap {
    line-height: 45px;
    font-family: 'Alfphabet';
    .bei-an a {
      color: $mainColor;
    }
    #tech-stack {
      @media screen and (max-width: 1200px) {
        display: block;
      }
    }
  }
}
</style>
