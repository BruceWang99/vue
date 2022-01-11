/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          // 调用 Vue.extend, extend做的就是返回VueComponent这个构造函数, 这个构造函数的原型是Vue
          // Vue.extent顿悟: Vue构造函数的一个子构造函数(VueComponent), 拥有Vue构造函数的所有功能, 也可以拥有自己特定的功能. 可以用做全局的toast提示组件, 以及其他需要只影响子构造函数实例, 不影响Vue的全局组件
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 存储全局的这几个方法
        // Vue.component就是Vue.extend一种具象化的表现形式
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
