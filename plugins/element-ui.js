import Vue from 'vue'
import {
  Container,
  Button,
  Input,
  Row,
  Col,
  Option,
  Select
} from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

const components = [
  Container,
  Select,
  Option,
  Button,
  Input,
  Row,
  Col
]

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

Vue.use(Element, { locale })
