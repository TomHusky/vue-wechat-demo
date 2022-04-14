<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header selectNone" v-drag>
      <div class="friendName">
        <span style="cursor: pointer" @click="showChatInfo">{{
          selectedChat.info.remark === ""
            ? selectedChat.info.nickname
            : selectedChat.info.remark
        }}</span>
      </div>
      <i
        style="cursor: pointer"
        @click="showChatInfo"
        class="icon iconfont icon-more info"
      ></i>
    </header>
    <div
      class="message-wrapper scrollbar"
      @scroll="handleScroll"
      @mousewheel="mousewheel"
      ref="list"
    >
      <div class="more">
        <Loading v-if="showLoading" :load="showLoading" :size="3"></Loading>
        <span v-if="showMoreInfo">查看更多消息</span>
      </div>
      <ul v-if="selectedChat">
        <li v-for="item in showMessages" class="message-item" :key="item.id">
          <div class="time selectNone">
            <span v-if="item.showTime">{{ item.date | time }}</span>
          </div>
          <div class="main" :class="{ self: isSelf(item.username), other: !isSelf(item.username) }">
            <img
              class="avatar selectNone"
              width="36"
              height="36"
              @click.prevent="openMenu($event, item)"
              :src="isSelf(item.username) ? user.avatar : selectedChat.info.avatar"
            />
            <div class="content" :class="{ 'text-msg': item.type == 1 }">
              <img
                class="img-msg"
                @click="
                  showImgWindow({
                    showImgWindow: true,
                    src: item.content.src,
                    width: item.content.width,
                    height: item.content.height,
                  })
                "
                v-if="item.type == 2"
                :src="item.content.src"
              />
              <div
                class="file-msg"
                v-if="item.type == 3"
                @click="downloadFile(item.content.src)"
              >
                <p class="file-name">{{ item.content.fileName }}</p>
                <p class="file-size">{{ item.content.fileSize }}</p>
                <img
                  :src="
                    systemFileIcon[item.content.fileType] != null
                      ? systemFileIcon[item.content.fileType]
                      : 'static/images/file.png'
                  "
                  style="width: 40px"
                />
              </div>
              <div
                class="text"
                v-if="item.type == 1"
                v-html="replaceFace(item.content)"
              ></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Loading from "@/components/other/loading/Loading";
export default {
  components: {
    Loading,
  },
  computed: {
    ...mapGetters({
      selectedChat: "chat/selectedChat",
      messages: "chat/messages",
      selectedChatFriend: "friend/selectedChatFriend",
    }),
    ...mapState({
      emojis: (state) => state.system.emojis,
      systemFileIcon: (state) => state.system.systemFileIcon,
    }),
    user() {
      return this.$store.state.user.info;
    },
    isSelf() {
      return (username) => {
        return username === this.user.username;
      };
    },
  },
  data() {
    return {
      showMessages: [],
      roll: 0,
      pageIndex: -1,
      pageSize: 15,
      showMoreInfo: false,
      showLoading: false,
    };
  },
  mounted() {
    //  在页面加载时让信息滚动到最下面
    setTimeout(
      () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
      0
    );
  },
  beforeMount() {
    this.loadMessage();
  },
  created() {
    // for(let i= 0;i<this.emojis.length;i++){
    //   let id = md5(this.emojis[i].code);
    //   this.emojis[i].id= id;
    //   this.emojis[i].reg='/@::tt;;@'+id+'@/g';
    // }
    // console.log(JSON.stringify(this.emojis));
  },
  watch: {
    // 发送信息后,让信息滚动到最下面
    messages() {
      this.showMessages.push(this.messages[this.messages.length - 1]);
      setTimeout(
        () => (this.$refs.list.scrollTop = this.$refs.list.scrollHeight),
        0
      );
    },
  },
  methods: {
    ...mapActions({
      showImgWindow: "system/showImgWindow",
    }),
    mousewheel() {
      if (this.pageIndex == 0) {
        return;
      }
      if (this.showMoreInfo) {
        this.showMoreInfo = false;
        this.showLoading = true;
        this.loadMessage();
      }
    },
    handleScroll() {
      if (this.pageIndex == 0) {
        return;
      }
      let scrollTop = this.$refs.list.scrollTop;
      let scroll = scrollTop - this.roll;
      if (scroll < 0) {
        if (!this.showMoreInfo) {
          if (this.$refs.list.scrollTop == 0) {
            this.showMoreInfo = true;
          }
        }
      }
      this.roll = this.$refs.list.scrollTop;
      //业务操作
    },
    loadMessage() {
      setTimeout(() => {
        this.showLoading = false;
      }, 100);
      if (this.pageIndex == -1) {
        this.pageIndex = this.selectedChat.messages.length;
      }
      // 下一页的位置
      let nextIndex = this.pageIndex - this.pageSize;
      if (nextIndex < 0) {
        nextIndex = 0;
      }
      let data = this.selectedChat.messages.slice(nextIndex, this.pageIndex);
      this.pageIndex = nextIndex;
      if (this.pageSize < 50) {
        this.pageSize += 10;
      }
      if (data.length > 0) {
        for (let i = data.length - 1; i >= 0; i--) {
          this.showMessages.unshift(data[i]);
        }
      }
    },
    openMenu(e, item) {
      let info = {
        clientX: e.clientX,
        clientY: e.clientY,
        self: item.self,
        visible: true,
        visibleIng: true,
        info: item.self ? this.user : this.selectedChatFriend,
      };
      this.$store.commit("system/setHeadMenu", info);
    },
    showChatInfo() {
      this.$parent.showChatInfo();
    },
    //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceFace(con) {
      if (con.includes("@::tt;;@")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            '<img src="static/emoji/' +
              emojis[i].file +
              '"  alt="" style="vertical-align: middle; width: 24px; height: 24px" />'
          );
        }
        return con;
      }
      return con;
    },
    downloadFile(src) {
      window.open(src);
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

<style lang="stylus" scoped>
.message {
  width: 100%;
  height: 100;
  background-color: #F5F5F5;

  .header {
    height: 60px;
    padding: 20px 0 0 30px;
    box-sizing: border-box;

    .friendName {
      font-size: 19px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .info {
      color: #7F7F7F;
      margin-right: 10px;
      font-size: 25px;
      float: right;
      line-height: 10px;

      &:hover {
        color: #3F3F3F;
      }
    }
  }

  .message-wrapper {
    min-height: 420px;
    max-height: 420px;
    padding: 0 15px 18px 15px;
    box-sizing: border-box;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;

    .more {
      text-align: center;
      color: #2C90FF;
      margin-top: 8px;
      font-size: 12px;
    }

    .message-item {
      margin-top: 16px;
    }

    .message {
      margin-bottom: 15px;
    }

    .time {
      width: 100%;
      font-size: 12px;
      margin-top: 7px;
      margin-bottom: 10px;
      text-align: center;

      span {
        display: inline-block;
        padding: 4px 6px;
        color: #fff;
        border-radius: 3px;
        background-color: #dcdcdc;
      }
    }

    .main {
      .avatar {
        cursor: pointer;
        float: left;
        margin-left: 15px;
        border-radius: 3px;
      }

      .text-msg {
        padding: 6px 10px;
        max-width: 330px;
        min-height: 36px;
        line-height: 24px;
        box-sizing: border-box;
        font-size: 14px;
        text-align: left;
        word-break: break-all;
        background-color: #FFFFFF;
        border: 1px solid #ECECEC;
        border-radius: 4px;

        &:hover {
          border: 1px solid #E7E7E7;
        }

        &:before, &:after {
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          content: '';
          border: solid transparent;
          border-right-color: #FFFFFF;
        }
      }

      .img-msg {
        max-width: 180px;
        max-height: 180px;
        border-radius: 3px;
        cursor: pointer;
      }

      .file-msg {
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #ECECEC;
        height: 75px;
        width: 200px;
        cursor: pointer;
        position: relative;

        &:hover {
          border: 1px solid #E7E7E7;
        }

        &:before, &:after {
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          content: '';
          border: solid transparent;
          border-right-color: #FFFFFF;
        }

        .file-name {
          position: absolute;
          top: 20px;
          left: 15px;
          font-size: 13px;
          width: 132px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .file-size {
          position: absolute;
          left: 15px;
          top: 40px;
          color: #999;
          font-size: 12px;
        }

        img {
          position: absolute;
          right: 12px;
          top: 15px;
          width: 40px;
        }
      }

      .content {
        display: inline-block;
        margin-left: 10px;
        position: relative;
      }
    }

    .other {
      .text-msg {
        &:before {
          border-right-color: #E7E7E7;
          border-width: 6px;
          top: 11px;
          right: 100%;
        }

        &:after {
          top: 12px;
          border-right-color: #fff;
          border-width: 5px;
          right: 100%;
        }
      }

      .file-msg {
        &:before {
          border-right-color: #E7E7E7;
          border-width: 6px;
          top: 11px;
          right: 100%;
        }

        &:after {
          top: 12px;
          border-right-color: #fff;
          border-width: 5px;
          right: 100%;
        }
      }

      .content {
        &:before {
          border-right-color: #E7E7E7;
          border-width: 6px;
          top: 11px;
          right: 100%;
        }

        &:after {
          top: 12px;
          border-right-color: #fff;
          border-width: 5px;
          right: 100%;
        }
      }
    }

    .self {
      display: flex;
      flex-direction: row-reverse;

      .avatar {
        margin: 0 15px;
      }

      .text-msg {
        &:before {
          border-left-color: #9EEA6A;
          border-width: 6px;
          top: 11px;
          left: 100%;
        }

        &:after {
          top: 12px;
          border-left-color: #9EEA6A;
          border-width: 5px;
          left: 100%;
        }
      }

      .file-msg {
        &:before {
          border-left-color: #E7E7E7;
          border-width: 6px;
          top: 11px;
          left: 100%;
        }

        &:after {
          top: 12px;
          border-left-color: #fff;
          border-width: 5px;
          left: 100%;
        }
      }

      .text-msg {
        background-color: #9EEA6A;

        &:before {
          right: -12px;
          vertical-align: middle;
          border-right-color: transparent;
          border-left-color: #9EEA6A;
        }
      }
    }
  }
}
</style>
