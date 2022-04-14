<template>
  <div class="body">
    <div
      v-if="loading"
      :style="{ fontSize: size + 'px', '--color': color }"
      class="loader"
    >
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
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
.body {
  text-align: center;
  display: inline-block;
  padding: 5px;
}
.loader {
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