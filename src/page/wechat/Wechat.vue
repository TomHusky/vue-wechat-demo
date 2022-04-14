<template>
  <div id="wechat">
    <div class="network-bar" v-if="!network">
      <p>
        <i class="icon iconfont icon-warn"></i
        >连接失败，请检查你的网络或刷新页面
      </p>
    </div>
    <div class="sidebar">
      <MyCard></MyCard>
    </div>
    <div class="main">
      <div class="systemBottom">
        <i class="icon iconfont icon-window-ding"></i>
        <i class="icon iconfont icon-window-min"></i>
        <i class="icon iconfont icon-window-max"></i>
        <i @click="exit" class="icon iconfont icon-close close"></i>
      </div>
      <router-view></router-view>
    </div>
    <HeadMenu class="right-menu" id="friendHeadMenu" :refId="'friendHeadMenu'">
    </HeadMenu>
  </div>
</template>

<script>
import HeadMenu from "@/components/other/menu/HeadMenu";
import MyCard from "@/components/mycard/MyCard";
import { initInfo, initSystemInfo } from "@/page/wechat/init.js";
import { getToken } from "@/libs/util";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    MyCard,
    HeadMenu,
  },
  data() {
    return {
      moveDataelse: {
        x: null,
        y: null,
      },
    };
  },
  computed: {
    ...mapState({
      network: (state) => state.system.network,
    }),
  },
  created() {
    initInfo();
    initSystemInfo();
    // 允许浏览器通知
    this.allowNotification();
  },
  beforeMount() {
    if (!getToken()) {
      return;
    }
  },
  mounted() {
    const that = this;
    that.updateAppPosition(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.$store.commit("system/setWindowWidth", window.fullWidth);
        that.$store.commit("system/setwindowHeight", window.fullHeight);
        that.updateAppPosition(window.fullWidth, window.fullHeight);
      })();
    };
  },
  methods: {
    ...mapActions({
      handleLogout:"user/handleLogout"
    }),
    //申请浏览器通知权限，具体参见链接 https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    allowNotification() {
      if (!("Notification" in window)) {
        this.$message({
          content: "浏览器不支持消息通知",
          time: 2500,
          type: "warning",
          hasClose: true,
        });
        return;
      }
      const permission = Notification.permission;
      if (permission === "granted") {
        return;
      }
      Notification.requestPermission((permission) => {
        if (permission !== "granted") {
          this.$message({
            content: "无法提示新消息！",
            time: 2500,
            type: "warning",
            hasClose: true,
          });
        }
      });
    },
    updateAppPosition(width, height) {
      // 设置窗口位置
      let app = document.getElementById("wechat");
      app.style.left = (width - app.offsetWidth) / 2 + "px";
      app.style.top = (height - app.offsetHeight) / 2 + "px";
    },
    exit() {
      this.handleLogout();
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
#wechat {
  position: absolute;
  display: flex;
  border-radius: 50px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 1018px;
  height: 630px;
  background-color: #fff;

  .network-bar {
    position: absolute;
    height: 34px;
    width: 320px;
    background-color: #CC5353;
    top: -38px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    border-radius: 3px;

    p {
      font-size: 13px;
      font-weight: 100;
      color: #fff;
      line-height: 34px;

      i {
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }

  .sidebar {
    width: 55px;
    height: 630px;
    background: #2E2E2E;
  }

  .main {
    flex: 1;
    height: 630px;
    background: #F5F5F5;
  }

  .systemBottom {
    position: absolute;
    right: 0px;

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
}
</style>
