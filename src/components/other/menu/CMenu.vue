<template>
  <div
    v-show="visible"
    :style="{left:left+'px',top:top+'px'}"
    class="contextmenu"
  >
    <slot name="menuItem"></slot>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  props: {
    offset: {
      type: Object,
      default: () => {
        return {
          offsetLeft: 0,
          offsetWidth: 0,
          clientX: 0,
          clientY: 0,
        };
      },
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      visible: false,
    };
  },
  watch: {
    offset: {
      handler: function () {
        const { offsetLeft, offsetWidth, clientX, clientY } = this.offset;
        this.left = clientX;
        this.top = clientY;
        this.visible = true;
      },
      deep: true,
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  methods: {
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.contextmenu li {
  list-style-type: none;
  margin: 0;
  padding: 7px 25px;
  cursor: pointer;
}

.border-top {
  border-top: 1px solid #ECECEC;
}

.contextmenu li:hover {
  background: #E2E2E2;
}
</style>