<template>
  <div class="popup-body" v-if="loading">
    <div :style="{ fontSize: size + 'px', '--color': color }" class="loader">
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupLoading",
  props: {
    load: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 5,
    },
    times: {
      type: Number,
      default: null,
    },
    color: {
      type: String,
      default: "#C4C4C4",
    },
  },
  data() {
    return {
      loading: this.load,
    };
  },
  watch: {
    load(value) {
      this.loading = value;
      let t = null;
      if (value) {
        if (times != null && this.times != 0) {
          t = setTimeout(() => {
            this.loading = false;
          }, times * 1000);
        }
      } else {
        if (t != null) {
          clearTimeout(t);
        }
      }
    },
  },
};
</script>

<style scoped>
.popup-body {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(252, 252, 252, 0.7);
}
.loader {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  text-indent: -9999em;
  animation: load-effect 1s infinite linear;
}

@keyframes load-effect {
  /*
      0:左移3em
      -3em:下移2em
      0:模糊距离0，即纯色
      .2em:外扩.2em
      var(--color):白色
    */
  0% {
    box-shadow: 0 -3em 0 0.2em var(--color), /*上*/ 2em -2em 0 0 var(--color),
      /*右上*/ 3em 0 0 -0.5em var(--color), /*右*/ 2em 2em 0 -0.5em var(--color),
      /*右下*/ 0 3em 0 -0.5em var(--color),
      /*下*/ -2em 2em 0 -0.5em var(--color),
      /*左下*/ -3em 0 0 -0.5em var(--color), /*左*/ -2em -2em 0 0 var(--color); /*左上*/
  }
  12.5% {
    box-shadow: 0 -3em 0 0 var(--color), 2em -2em 0 0.2em var(--color),
      3em 0 0 0 var(--color), 2em 2em 0 -0.5em var(--color),
      0 3em 0 -0.5em var(--color), -2em 2em 0 -0.5em var(--color),
      -3em 0 0 -0.5em var(--color), -2em -2em 0 -0.5em var(--color);
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em var(--color), 2em -2em 0 0 var(--color),
      3em 0 0 0.2em var(--color), 2em 2em 0 0 var(--color),
      0 3em 0 -0.5em var(--color), -2em 2em 0 -0.5em var(--color),
      -3em 0 0 -0.5em var(--color), -2em -2em 0 -0.5em var(--color);
  }
  37.5% {
    box-shadow: 0 -3em 0 -0.5em var(--color), 2em -2em 0 -0.5em var(--color),
      3em 0 0 0 var(--color), 2em 2em 0 0.2em var(--color),
      0 3em 0 0 var(--color), -2em 2em 0 -0.5em var(--color),
      -3em 0 0 -0.5em var(--color), -2em -2em 0 -0.5em var(--color);
  }
  50% {
    box-shadow: 0 -3em 0 -0.5em var(--color), 2em -2em 0 -0.5em var(--color),
      3em 0 0 -0.5em var(--color), 2em 2em 0 0 var(--color),
      0 3em 0 0.2em var(--color), -2em 2em 0 0 var(--color),
      -3em 0 0 -0.5em var(--color), -2em -2em 0 -0.5em var(--color);
  }
  62.5% {
    box-shadow: 0 -3em 0 -0.5em var(--color), 2em -2em 0 -0.5em var(--color),
      3em 0 0 -0.5em var(--color), 2em 2em 0 -0.5em var(--color),
      0 3em 0 0 var(--color), -2em 2em 0 0.2em var(--color),
      -3em 0 0 0 var(--color), -2em -2em 0 -0.5em var(--color);
  }
  75% {
    box-shadow: 0 -3em 0 -0.5em var(--color), 2em -2em 0 -0.5em var(--color),
      3em 0 0 -0.5em var(--color), 2em 2em 0 -0.5em var(--color),
      0 3em 0 -0.5em var(--color), -2em 2em 0 0 var(--color),
      -3em 0 0 0.2em var(--color), -2em -2em 0 0 var(--color);
  }
  87.5% {
    box-shadow: 0 -3em 0 0 var(--color), 2em -2em 0 -0.5em var(--color),
      3em 0 0 -0.5em var(--color), 2em 2em 0 -0.5em var(--color),
      0 3em 0 -0.5em var(--color), -2em 2em 0 0 var(--color),
      -3em 0 0 0 var(--color), -2em -2em 0 0.2em var(--color);
  }
  100% {
    box-shadow: 0 -3em 0 0.2em var(--color), 2em -2em 0 0 var(--color),
      3em 0 0 -0.5em var(--color), 2em 2em 0 -0.5em var(--color),
      0 3em 0 -0.5em var(--color), -2em 2em 0 -0.5em var(--color),
      -3em 0 0 -0.5em var(--color), -2em -2em 0 0 var(--color);
  }
}
</style>