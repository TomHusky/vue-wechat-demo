<template>
  <transition name="fade">
    <div class="message" :class="type" v-if="visible">
      <i class="icon-type iconfont" :class="'icon-' + type"></i>
      <div class="content">
        {{ content }}
        <i
          v-if="hasClose"
          class="btn-close iconfont icon-close"
          @click="visible = false"
        ></i>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyMessage",
  data() {
    return {
      content: "",
      time: 3000,
      visible: false,
      type: "info", //'info','warning','error'
      hasClose: false,
    };
  },
  mounted() {
    this.close();
  },
  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false;
      }, this.time);
    },
  },
};
</script>
<style lang="stylus" scoped>
.message {
  padding: 8px 40px;
  border-radius: 3px;
  color: #fff;
  z-index: 999999999;
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
}
.btn-close{
  margin-left: 10px;
}

.info {
  background-color: rgba(65, 183, 131, 0.7);
}

.warning {
  background-color: rgba(255, 153, 0, 0.7);
}

.error {
  background-color: rgba(243, 81, 30, 0.7);
}

.icon-info {
  color: #fff;
}

.icon-warning {
  color: #fff;
}

.icon-error {
  color: #fff;
}
</style>