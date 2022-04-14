<!-- 聊天列表 -->
<template>
  <div class="msglist selectNone">
    <ul>
      <template v-for="item in searchedChatlist">
        <li
          v-if="item.isShow"
          :key="item.id"
          class="sessionlist"
          :class="{ active: item.chatId === selectChatId }"
          @contextmenu.prevent="openMenu($event, item)"
          @click="selectSession(item.chatId)"
        >
          <div class="list-left">
            <img
              class="avatar"
              width="40"
              height="40"
              :alt="
                item.info.remark === '' ? item.info.nickname : item.info.remark
              "
              :src="item.info.avatar"
            />
            <Badge
              v-if="item.newMsgNum > 0"
              :count="item.newMsgNum"
              :overflowCount="99"
              :showNum="!item.info.notDisturb"
              :width="16"
              :height="16"
            ></Badge>
          </div>
          <div class="list-right">
            <p class="name">
              {{
                item.info.remark === null || item.info.remark === ""
                  ? item.info.nickname
                  : item.info.remark
              }}
            </p>
            <span class="time" v-text="getTimes(item.lastMsgTime)"></span>
            <p
              class="lastmsg"
              v-html="
                replaceFace(
                  item.messages.length > 0
                    ? item.messages[item.messages.length - 1]
                    : ''
                )
              "
            ></p>
          </div>
        </li>
      </template>
    </ul>
    <context-menu class="right-menu" :offset="menuOffset">
      <template v-slot:menuItem>
        <ul>
          <li @click="top">置顶</li>
          <li @click="updateMsgStatus(false)" v-if="currentChat.newMsgNum == 0">
            标记为未读
          </li>
          <li @click="updateMsgStatus(true)" v-if="currentChat.newMsgNum > 0">
            标记为已读
          </li>
          <li v-if="!currentChat.info.notDisturb" @click="setNotDisturb(true)">
            消息免打扰
          </li>
          <li v-if="currentChat.info.notDisturb" @click="setNotDisturb(false)">
            开启新消息提醒
          </li>
          <li class="border-top" @click="closeChat">不显示聊天</li>
          <li @click="deleteChat">删除聊天</li>
        </ul>
      </template>
    </context-menu>
  </div>
</template>

<script>
import Badge from "@/components/other/Badge";
import ContextMenu from "@/components/other/menu/CMenu";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    ContextMenu,
    Badge,
  },
  data() {
    return {
      menuOffset: {
        offsetLeft: 0,
        offsetWidth: 0,
        clientX: 0,
        clientY: 0,
      },
      currentChat: {
        info: {},
      },
    };
  },
  computed: {
    ...mapState({
      emojis: (state) => state.system.emojis,
      selectChatId: (state) => state.chat.selectChatId,
      searchText: (state) => state.system.searchText,
    }),
    ...mapGetters({
      searchedChatlist: "chat/searchedChatlist",
      getChatIndex: "chat/getChatIndex",
    }),
    getTimes() {
      return (date) => {
        if (date == null || date === "") {
          return "";
        }
        if (typeof date === "string") {
          date = new Date(date);
        }
        if (date.getMinutes() < 10) {
          return date.getHours() + ":0" + date.getMinutes();
        } else {
          return date.getHours() + ":" + date.getMinutes();
        }
      };
    },
  },
  methods: {
    ...mapActions({
      selectSession: "chat/selectSession",
      updateChatInfo: "chat/updateChatInfo",
      topChat: "chat/topChat",
      deleteChatByChatId: "chat/deleteChatByChatId",
    }),
    // 将内容中属于表情的部分替换成emoji图片标签
    replaceFace(msg) {
      if (msg === "") {
        return "";
      }
      if (msg.type == 2) {
        return "[图片]";
      }
      if (msg.type == 3) {
        return "[文件]";
      }
      let con = msg.content;
      if (con.includes("@::tt;;@")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            '<img src="static/emoji/' +
              emojis[i].file +
              '"  alt="" style="vertical-align: middle; width: 15px; height: 15px" />'
          );
        }
        return con;
      }
      return con;
    },
    openMenu(e, data) {
      this.menuOffset.offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      this.menuOffset.offsetWidth = this.$el.offsetWidth; // container width
      this.menuOffset.clientX = e.clientX;
      this.menuOffset.clientY = e.clientY;
      this.currentChat = data;
    },
    top() {
      this.topChat(this.currentChat);
    },
    updateMsgStatus(status) {
      if (status) {
        this.currentChat.newMsgNum = 0;
      } else {
        this.currentChat.newMsgNum = 1;
      }
      this.updateChatInfo(this.currentChat);
    },
    setNotDisturb(status) {
      this.currentChat.info.notDisturb = status;
      this.updateChatInfo(this.currentChat);
    },
    closeChat() {
      if (this.currentChat.chatId === "wx001") {
        this.$message({
          content: "机器人不能隐藏哦！",
          time: 2500,
          type: "warning",
          hasClose: true,
        });
        return;
      }
      if (this.$store.state.chat.chatlist.length < 2) {
        return;
      }
      let index = this.getChatIndex(this.currentChat.chatId);
      this.currentChat.isShow = false;
      this.updateChatInfo(this.currentChat);
      if (this.currentChat.chatId === this.selectChatId) {
        this.selectSession(this.$store.state.chat.chatlist[index].chatId);
      }
    },
    deleteChat() {
      if (this.currentChat.chatId === "99") {
        this.$message({
          content: "机器人不能删除哦！",
          time: 2500,
          type: "warning",
          hasClose: true,
        });
        return;
      }
      this.deleteChatByChatId(this.currentChat.chatId);
    },
  },
};
</script>

<style lang="stylus" scoped>
.msglist {
  width: 100%;
  height: 570px;
  overflow-y: auto;

  .sessionlist {
    cursor: default;
    display: flex;
    padding: 12px;
    transition: background-color 0.1s;
    font-size: 0;

    &:hover {
      background-color: rgb(220, 220, 220);
    }

    &.active {
      background-color: #c4c4c4;
    }

    .list-left {
      position: relative;
      margin-right: 12px;

      .avatar {
        border-radius: 2px;
      }
    }

    .list-right {
      position: relative;
      flex: 1;
      margin-top: 4px;

      .name {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
      }

      .time {
        float: right;
        color: #999;
        font-size: 10px;
        vertical-align: top;
      }

      .lastmsg {
        position: absolute;
        font-size: 12px;
        width: 130px;
        height: 15px;
        line-height: 15px;
        color: #999;
        bottom: 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
