<!-- 消息框 -->
<template>
  <div class="message">
    <template v-if="selectedChat.type === 1">
      <FriendMessage></FriendMessage>
    </template>
    <template v-if="selectedChat.type === 2">
      <GroupMessage></GroupMessage>
    </template>

    <CusConfirm
      :height="getWidth(imgWindow.width, imgWindow.height).height"
      :width="getWidth(imgWindow.width, imgWindow.height).width"
      :flag="imgWindow.showImgWindow"
      :okFlag="false"
      :noFlag="false"
      @cancel="cancel"
    >
      <template v-slot:confirm>
        <div
          style="
            padding: 30px 0;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :style="{
            height: getWidth(imgWindow.width, imgWindow.height).height + 'px',
            width: getWidth(imgWindow.width, imgWindow.height).width + 'px',
          }"
        >
          <img
            :src="imgWindow.src"
            :width="
              imgWindow.width < 600
                ? imgWindow.width
                : getWidth(imgWindow.width, imgWindow.height).width
            "
            :height="
              imgWindow.height < 600
                ? imgWindow.height
                : getWidth(imgWindow.width, imgWindow.height).height
            "
          />
        </div>
      </template>
    </CusConfirm>
  </div>
</template>

<script>
import CusConfirm from "@/components/other/confirm/CusConfirm";
import GroupMessage from "./GroupMessage";
import FriendMessage from "./FriendMessage";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    GroupMessage,
    FriendMessage,
    CusConfirm,
  },
  computed: {
    ...mapState({ imgWindow: (state) => state.system.imgWindow }),
    ...mapGetters({ selectedChat: "chat/selectedChat" }),
    getWidth() {
      return (width, height) => {
        let result = {
          width: width,
          height: height,
        };
        let ratioWidth = Math.floor(width / height).toFixed(1);
        let ratioHeight = Math.floor(height / width).toFixed(1);
        if (width >= height) {
          if (ratioWidth < 1.5) {
            if (width <= 300) {
              result.width = width * 2;
              result.height = height * 2;
              return result;
            }
            if (width > 300 && width < 600) {
              result.width = width * 1.5;
              result.height = height * 1.5;
              return result;
            }
            if (width >= 600 && width <= 800) {
              return result;
            }
            if (width > 800 && width <= 1200) {
              result.width = width / 1.8;
              result.height = height / 1.8;
              return result;
            }
            if (width > 1200) {
              result.width = width / 2;
              result.height = height / 2;
              return result;
            }
          }
          if (ratioWidth >= 1.5) {
            if (width < 600) {
              result.width = width * 1.5;
              return result;
            }
            if (width >= 600 && width <= 1200) {
              return result;
            }
            if (width > 1200) {
              result.width = width / 1.8;
              result.height = height / 1.8;
              return result;
            }
          }
        } else {
          if (ratioHeight < 1.5) {
            if (height <= 300) {
              result.width = width * 2;
              result.height = height * 2;
              return result;
            }
            if (height > 300 && height <= 600) {
              result.width = width * 1.5;
              result.height = height * 1.5;
              return result;
            }
            if (height > 600 && height <= 800) {
              return result;
            }
            if (height > 800 && height <= 1200) {
              result.width = width / 1.8;
              result.height = height / 1.8;
              return result;
            }
            if (height > 1200) {
              result.width = width / 2;
              result.height = height / 2;
              return result;
            }
          }
          if (ratioHeight >= 1.5) {
            if (height < 650) {
              return result;
            }
            if (height >= 650 && height <= 900) {
              result.width = width / 1.4;
              result.height = height / 1.4;
              return result;
            }
            if (height > 900 && height <= 1200) {
              result.width = width / 1.6;
              result.height = height / 1.6;
              return result;
            }
            if (height > 1200) {
              result.width = width / 2;
              result.height = height / 2;
              return result;
            }
          }
        }
        return result;
      };
    },
  },
  methods: {
    ...mapActions({ showImgWindow: "system/showImgWindow" }),
    showChatInfo() {
      this.$parent.showChatInfo(true);
    },
    cancel() {
      let value = {
        showImgWindow: false,
      };
      this.showImgWindow(value);
    },
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      if (date.getMinutes() < 10) {
        return date.getHours() + ":0" + date.getMinutes();
      } else {
        return date.getHours() + ":" + date.getMinutes();
      }
    },
  },
};
</script>

<style lang="stylus" scoped></style>
