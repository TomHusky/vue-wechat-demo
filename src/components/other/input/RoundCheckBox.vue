<template>
  <input
    :style="{
      '--width': width + 'px',
      '--height': height + 'px',
      '--color': color,
    }"
    v-bind:checked="checked"
    class="layers-item-selector"
    v-on:change="$emit('change', $event.target.checked,value)"
    type="checkbox"
  />
</template>

<script>
export default {
  name: "c-checkbox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    value:{},
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 15,
    },
    color: {
      type: String,
      default: "#1aad19",
    },
  },
};
</script>

<style scoped>
.layers-item-selector {
  outline: none;
  width: var(--width);
  height: var(--height);
  background-color: #ffffff;
  /* border: solid 0px #CECECE; */
  border: solid 1px #cecece;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -webkit-user-select: none;
  user-select: none;
}
/*直接用图片代替选中的样子，如果不需要，可设置背景色*/
.layers-item-selector:checked {
  border: 0px;
  background: url("../../../../public/static/images/select.png") var(--color)
    center center no-repeat;
  background-size: 60% 60%;
}
</style>