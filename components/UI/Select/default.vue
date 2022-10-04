<template>
  <div class="k-select-wrapper"
       @mouseenter="handleMouseenter"
       @mouseleave="handleMouseleave">
    <div class="k-select" @click="visible = true">
      <span>{{ valueText }}</span>
      <i class="el-icon-arrow-down"
         :class="visible && 'active'"></i>
    </div>

    <div class="k-select-dropdown"
         :class="visible && 'active'">
      <div v-for="option in options"
           :key="option.id"
           class="k-select-dropdown__item"
           @click="handleSelect(option)">
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KSelect',
  model: {
    prop: 'value'
  },

  props: {
    trigger: {
      type: String,
      default: 'click'
    },

    options: {
      type: Array,
      default: () => []
    },

    placeholder: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      visible: false
    }
  },

  computed: {
    valueText() {
      return this.options.find((x) => x.value == this.value).label
    }
  },

  methods: {
    handleMouseenter() {
      if (this.trigger == 'hover') this.visible = true
    },
    handleMouseleave() {
      if (this.trigger == 'hover') this.visible = false
    },
    handleSelect(obj) {
      this.visible = false
      this.$emit('change', obj.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.k-select-wrapper {
  position: relative;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  .k-select {
    .el-icon-arrow-down {
      transition: all 0.3s;
      &.active {
        transform: rotate(180deg);
      }
    }
  }

  .k-select-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    z-index: 1000;
    transition: all 0.3s ease;
    transform: translateX(-50%);
    border: 1px solid #ccc;
    opacity: 0;

    &.active {
      opacity: 1;
    }

    &::after {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 10px 5px;
      border-style: solid;
      border-color: transparent transparent #fff; /*白色的倒三角*/
    }

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      border-style: solid;
      border-width: 10px 5px;
      border-color: transparent transparent #ccc;
    }

    > div {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      white-space: nowrap;

      &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}
</style>
