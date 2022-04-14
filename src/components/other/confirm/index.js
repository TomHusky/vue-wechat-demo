import Vue from 'vue'
import CusConfirm from './CusConfirm.vue'

const Confirm = Vue.extend(CusConfirm)

CusConfirm.install = function (data) {
  /**
   * options的其他情况自行判断添加默认值等等
   */
  if (data === undefined || data === null) {
    data = {
      title: '确认'
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      title: options
    }
  }

  let instance = new Confirm({
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.flag = true //记得这里是控制弹窗显隐的状态，一定要同自定义组件里边 v-if 后面的值相同
  })
}

export default CusConfirm
