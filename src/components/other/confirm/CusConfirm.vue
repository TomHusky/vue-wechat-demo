<template>
  <transition name="fade">
    <div class="cus-confirm-mask" v-if="show">
      <div
        class="cus-confirm"
        :style="{
          '--widthStr': width > 1 ? width + 'px' : '100%',
          '--heightStr': height > 1 ? height + 'px' : '100%',
          '--width': width / 2 + 'px',
          '--height': height/2 + 'px',
        }"
        @click.stop
      >
        <div class="systemBottom">
          <i @click="no" class="icon iconfont icon-close close"></i>
        </div>
        <div class="confirm-title" v-if="title != null">{{ title }}</div>
        <div class="confirm-body">
          <slot name="confirm"></slot>
        </div>
        <div class="confirm-btns">
          <button
            v-if="okFlag"
            :class="{ 'ok-btn-success': isActive }"
            class="ok-btn"
            :disabled="!isActive"
            @click="sure"
          >
            确认
          </button>
          <button v-if="noFlag" class="cancel-btn" @click="no">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "CusConfirm",
  props: {
    flag: { type: Boolean, default: false },
    title: { type: String, default: null },
    noFlag: { type: Boolean, default: true },
    okFlag: { type: Boolean, default: true },
    width: {
      type: Number,
      default: 480,
    },
    height: {
      type: Number,
      default: 260,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    flag(value) {
      this.show = value;
    },
  },
  methods: {
    no() {
      this.$emit("cancel");
      this.cancel();
    },
    sure() {
      this.$emit("confirm");
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="stylus"  scoped>
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.35s;
}

.cus-confirm-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  list-style-type: none;
  border-radius: 2px;
  color: #333;
  box-shadow: 2px 2px 10px #aaa;
  -o-box-shadow: 2px 2px 10px #aaa;
  -webkit-box-shadow: 2px 2px 10px #aaa;
  -moz-box-shadow: 2px 2px 10px #aaa;

  .cus-confirm {
    max-width: var(--widthStr);
    max-height: var(--heightStr);
    box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.2);
    position: absolute;
    border-radius: 2px;
    padding-bottom: 15px;
    z-index: 999;
    top: calc(50% - var(--height));
    left: calc(50% - var(--width));
    display: flex;
    flex-direction: column;
    background: #ffffff;

    .systemBottom {
      position: absolute;
      right: 0;

      i {
        font-size: 6px !important;
        padding: 8px 10px;
        line-height: 30px;
        cursor: pointer;
        color: #7F7F7F;

        &:hover {
          background-color: #E5E5E5;
          color: #3F3F3F;
        }
      }

      .close {
        &:hover {
          background-color: #FA5151;
          color: #fff;
        }
      }
    }

    .confirm-title {
      font-size: 16px;
      margin-top: 15px;
      margin-left: 15px;
    }

    .confirm-body {
      height: 100%;
      font-size: 18px;
      background: #ffffff;
    }

    .confirm-btns {
      text-align: right;
      bottom: 0;
    }

    .confirm-btns button {
      border: 0;
      outline: none;
      padding: 6px 18px;
      margin: 0 12px;
      font-size: 12px;
      font-weight: 100;
      cursor: pointer;
    }

    .ok-btn {
      background: #8cd58c;
      color: #fff;
      cursor: default;
    }

    .ok-btn-success {
      background-color: #129611 !important;
      cursor: pointer !important;
    }

    .ok-btn-success:hover {
      cursor: pointer !important;
    }

    .cancel-btn {
      background: #fff;
      color: #000;
      border: 1px solid #e7e7e7 !important;
    }

    .ok-btn:hover {
      text-shadow: none;
      cursor: default;
    }

    .cancel-btn:hover {
      background: #efefef;
    }
  }
}
</style>
