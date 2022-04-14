<template>
  <div class="select">
    <input
      v-bind:checked="checked"
      :style="{
        '--width': width + 'px',
        '--height': height + 'px',
        '--fontSize': fontSize + 'px',
        '--color': color,
      }"
      v-on:change="$emit('change', $event.target.checked)"
      type="checkbox"
    />
    <span :style="{ fontSize: fontSize + 'px' }">{{ label }}</span>
  </div>
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
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 15,
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    color: {
      type: String,
      default: "#1aad19",
    },
    label: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.select {
  display: inline-block;
}
.select input,
span {
  margin-left: 3px;
  vertical-align: bottom;
}

input[type="checkbox"] {
  cursor: pointer;
  position: relative;
  width: var(--width);
  height: var(--height);
  font-size: var(--fontSize);
}

input[type="checkbox"]::after {
  position: absolute;
  top: 0;
  width: var(--width);
  height: var(--height);
  color: var(--color);
  font-size: var(--fontSize);
  display: inline-block;
  visibility: visible;
  text-align: center;
  content: " ";
}

input[type="checkbox"]:checked::after {
  content: "✓";
  color: #fff;
  line-height: var(--height);
  background-color: var(--color);
  font-size: var(--fontSize);
  /* background-color: #1aad19; */
}
</style>