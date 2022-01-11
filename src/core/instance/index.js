import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// vue的构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 在Vue上挂了一个_init()方法
initMixin(Vue)
// 在Vue增加$data/$set/$props/$delete/$watch属性
stateMixin(Vue)
// 在Vue上挂$on/$once/$off/$emit方法
eventsMixin(Vue)
// 在Vue上挂生命周期方法
lifecycleMixin(Vue)
// 混入render 
// $nextTick/_render
renderMixin(Vue)

export default Vue
