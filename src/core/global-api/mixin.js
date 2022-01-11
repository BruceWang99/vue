/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 合并: 深拷贝, 这是全局的
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
