<template>
  <div class="content">
    <div class="msglist">
      <SearchList :placeholder="placeholder" v-drag></SearchList>
      <ChatList></ChatList>
    </div>
    <div class="chatbox">
      <MessageChat class="message" :key="selectChatId"></MessageChat>
      <VText class="text"></VText>
    </div>
    <div v-if="isShow" class="chatInfo">
      <FriendChatInfo v-if="selectedChat.type == 1" id="info"></FriendChatInfo>
      <GroupChatInfo v-if="selectedChat.type == 2" id="info"></GroupChatInfo>
    </div>
  </div>
</template>

<script>
import SearchList from "@/components/search/SearchList";
import ChatList from "@/components/chatlist/ChatList";
import FriendChatInfo from "@/components/chatlist/FriendChatInfo";
import GroupChatInfo from "@/components/chatlist/GroupChatInfo";
import MessageChat from "@/components/message/MessageChat";
import VText from "@/components/text/Text";
import { mapGetters,mapState } from "vuex";
export default {
  components: {
    SearchList,
    ChatList,
    FriendChatInfo,
    GroupChatInfo,
    VText,
    MessageChat,
  },
  data() {
    return {
      isShow: false,
      showIng: false,
      placeholder: "搜索",
    };
  },
  computed: {
    ...mapState({
      selectChatId: (state) => state.chat.selectChatId,
    }),
    ...mapGetters({ selectedChat: "chat/selectedChat" }),
  },
  created() {
    document.addEventListener("click", (e) => {
      let info = document.getElementById("info");
      if (info) {
        if (!info.contains(e.target)) {
          if (this.showIng) {
            this.showIng = false;
          } else {
            this.isShow = false;
          }
        }
      }
    });
  },
  methods: {
    showChatInfo(showIng) {
      this.showIng = showIng;
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;
  width: 100%;

  .msglist {
    width: 250px;
    background: #E6E6E6;
    border-right: 1px solid #d6d6d6;
  }

  .chatbox {
    height: 630px;
    flex: 1;

    .message {
      height: 480px;
    }

    .text {
      height: 150px;
    }
  }

  .chatInfo {
    position: absolute;
    right: -250px;
    height: 630px;
    width: 250px;
    background-color: #F5F5F5;
    border-left: 1px solid #ECECEC;
  }
}
</style>
