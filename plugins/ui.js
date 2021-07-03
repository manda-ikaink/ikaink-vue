import Vue from 'vue'
import UiOffcanvas from '../components/ui/UiOffcanvas'
import UiOffcanvasBtn from '../components/ui/UiOffcanvasBtn'

const components = { 
  UiOffcanvas, 
  UiOffcanvasBtn
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})