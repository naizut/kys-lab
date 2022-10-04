import Vue from 'vue'
import KUI from '@/components/UI/index.js'

Object.keys(KUI).forEach((key) => {
  if (key == 'name' || key == '_Ctor') return
  Vue.component(key, KUI[key])
})
