import Vue from 'vue'
import IconClose from '../components/icons/IconClose'
import IconFacebook from '../components/icons/IconFacebook'
import IconGithub from '../components/icons/IconGithub'
import IconInstagram from '../components/icons/IconInstagram'
import IconMinus from '../components/icons/IconMinus'
import IconPlus from '../components/icons/IconPlus'
import IconStars from '../components/icons/IconStars'
import IconTag from '../components/icons/IconTag'
import IconTwitter from '../components/icons/IconTwitter'

const components = { 
  IconClose,
  IconFacebook, 
  IconGithub, 
  IconInstagram,
  IconMinus,
  IconPlus,
  IconStars,
  IconTag,
  IconTwitter
}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})