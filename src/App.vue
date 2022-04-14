<template>
  <div id="app">
    <!-- <div id="top-button" v-if="showRegister">
      <span><a class="register" @click="register">注册</a></span>
      <span><a>忘记密码</a></span>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    this.$store.dispatch("chat/initData");
    window.fullHeight = document.documentElement.clientHeight;
    window.fullWidth = document.documentElement.clientWidth;
    this.$store.commit("system/setWindowWidth", window.fullWidth);
    this.$store.commit("system/setwindowHeight", window.fullHeight);

    //阻止F5刷新
    this.stopF5Refresh();
    //监听刷新事件
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
  },
  data() {
    return {
      showRegister: true,
      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        if (route.path === "/login") {
          this.showRegister = true;
        } else {
          this.showRegister = false;
        }
      },
    },
  },
  methods: {
    ...mapActions({
      handleLogout: "user/handleLogout",
    }),
    //阻止F5刷新
    stopF5Refresh() {
      document.onkeydown = function (e) {
        var evt = window.event || e;
        var code = evt.keyCode || evt.which;
        if (code == 116) {
          if (evt.preventDefault) {
            evt.preventDefault();
          } else {
            evt.keyCode = 0;
            evt.returnValue = false;
          }
        }
      };
    },
    //浏览器刷新事件
    beforeunloadHandler(e) {
      this.handleLogout();
      if (
        JSON.parse(localStorage.getItem("havePlay")) &&
        JSON.parse(localStorage.getItem("havePlay")).currentTime ==
          this.currentTime
      ) {
        window.localStorage.removeItem("havePlay");
      }
    },
    // register() {
    //   switch (process.env.NODE_ENV) {
    //     case "development":
    //       window.open("http://y2725078j3.qicp.vip/chat/register.html");
    //       break;
    //     case "production":
    //       window.open("http://y2725078j3.qicp.vip/chat/register.html");
    //       break;
    //   }
    // },
  },
};
</script>
<style lang="stylus" >
#app {
  height: 100%;
}

#top-button {
  position: fixed;
  display: inline-block;
  top: 20px;
  right: 20px;

  a {
    font-size: 18px;
    margin-left: 30px;
    color: #fff;
    padding: 5px 8px;
    cursor: pointer;
  }

  .register {
    background-color: #14B9F8;
    padding: 5px 15px;
    border-radius: 2px;
  }
}

.scrollbar {
  overflow: hidden;
}

.scrollbar:hover {
  overflow-y: auto;
  /* 设置滚动条不占空间 */
  overflow-y: overlay;
}

.selectNone {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
<style lang="stylus" scoped></style>
