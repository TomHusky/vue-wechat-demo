<template>
  <button
    class="switch"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <input
      v-bind:checked="checked"
      :style="{ width: width + 'px', height: height + 'px' }"
      v-on:change="$emit('change', $event.target.checked)"
      type="checkbox"
    />
    <span :style="{ borderRadius: height + 'px' }"
      ><i
        :style="{
          width: height - 8 + 'px',
          height: height - 8 + 'px',
          marginTop: -(height - 8) / 2 + 'px',
        }"
      ></i
    ></span>
  </button>
</template>

<script>
export default {
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 44,
    },
    height: {
      type: Number,
      default: 22,
    },
  },
};
</script>

<style lang="stylus" scoped>
.switch {
  position: relative;
  width: 44px;
  height: 22px;
  background: transparent;
  border-width: 0px;
  border: none;
  outline: none;

  i {
    position: absolute;
    left: 4px;
    top: 50%;
    margin-top: -7px;
    display: block;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.2s;
  }

  span {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #CBCBCB;
    border-radius: 22px;
    z-index: 0;
  }

  input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 44px;
    height: 22px;
    margin: 0;
    padding: 0;
    opacity: 0;
    z-index: 9999;

    &:checked + span {
      background-color: #1AAD19;
    }

    &:checked + span i {
      background-color: #fff;
      left: 26px;
    }
  }
}
</style>