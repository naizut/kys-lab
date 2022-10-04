<template>
  <div>
    <canvas id="myCanvas" height="600" width="800"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      const c = document.getElementById('myCanvas')
      const $ = c.getContext('2d')

      let w = (c.width = window.innerWidth)
      let h = (c.height = window.innerHeight)

      const draw = function (a, b, t) {
        $.lineWidth = 0.8
        $.fillStyle = 'white'
        $.fillRect(0, 0, w, h)
        for (let i = -60; i < 60; i += 1) {
          $.strokeStyle = 'rgba(128,255,255, .05)'
          $.beginPath()
          $.moveTo(0, h / 2)
          for (let j = 0; j < w; j += 10) {
            $.lineTo(
              10 * Math.sin(i / 10) + j + 0.008 * j * j,
              Math.floor(
                h / 2 +
                  (j / 2) * Math.sin(j / 50 - t / 50 - i / 118) +
                  i * 0.9 * Math.sin(j / 25 - (i + t) / 65)
              )
            )
          }
          $.stroke()
        }
      }
      let t = 0

      window.addEventListener(
        'resize',
        function () {
          c.width = w = window.innerWidth
          c.height = h = window.innerHeight
          $.fillStyle = 'rgba(128,255,255, .05)'
        },
        false
      )

      const run = function () {
        window.requestAnimationFrame(run)
        t += 1
        draw(33, 52 * Math.sin(t / 2400), t)
      }
      run()
    })
  }
}
</script>

<style lang="scss" scoped>
#myCanvas {
  position: absolute;
  left: 0;

  @media screen and (max-width: 1024px) {
    top: -88px;
  }
}
</style>
