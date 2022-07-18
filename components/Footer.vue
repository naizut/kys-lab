<template>
  <nav class="footer">
    <div class="inner-wrap f12 text-center pt20 pb20">
      <span>Copyright © 2018</span>
      <span class="ml5 bei-an">
        <a href="https://beian.aliyun.com/">沪ICP备16033447号-3</a>
      </span>
      <span id="tech-stack" class="ml10">Based on Nuxt.js / Egg.js / Element UI</span>
      <div class="f12">Font made from <a href="http://www.onlinewebfonts.com" style="color: #fff">oNline Web Fonts</a>is licensed by CC BY 3.0</div>
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
    line-height: 1.5;
    font-family: 'Alfphabet';
    .bei-an a {
      color: #fff;
    }
    #tech-stack {
      @media screen and (max-width: 1200px) {
        display: block;
      }
    }
  }
}
</style>
