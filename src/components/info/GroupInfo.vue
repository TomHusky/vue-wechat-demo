<!-- 群聊信息 -->
<template>
  <div class="Info-wrapper selectNone">
    <div class="info-head" v-drag>
      <div class="nickname">全部群聊</div>
    </div>
    <div class="group-list">
      <div class="search">
        <Search
          :showBtn="false"
          @change="search"
          :placeholder="'搜索群聊'"
        ></Search>
      </div>
      <div class="content scrollbar">
        <div class="groupHead" @click="openCreateGroupChat">
          <div class="add">
            <img
              alt="添加"
              width="25px"
              class="avatar"
              src="static/images/icon/add.svg"
            />
          </div>
          <div class="name">添加</div>
        </div>
        <div
          class="groupHead"
          v-for="item in searchedGroupChatList"
          @click="toChat(item)"
          :key="item.groupNo"
        >
          <img
            class="avatar"
            width="50"
            height="50"
            :alt="item.groupName"
            :src="item.groupAvatar"
          />
          <div class="name">
            {{ item.groupName }}
          </div>
        </div>
      </div>
    </div>
    <CreateGroupChat
      @cancel="closeCreateGroupChat"
      :showCreate="showCreate"
    ></CreateGroupChat>
  </div>
</template>

<script>
import CreateGroupChat from "@/components/chatlist/CreateGroupChat";
import Search from "@/components/search/Search";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Search,
    CreateGroupChat,
  },
  computed: {
    ...mapGetters({
      searchedGroupChatList: "groupchat/searchedGroupChatList",
      getChatByChatId: "chat/getChatByChatId",
    }),
  },
  data() {
    return {
      showCreate: false,
    };
  },
  methods: {
    ...mapActions({ search: "groupchat/search" }),
    openCreateGroupChat() {
      this.showCreate = true;
    },
    closeCreateGroupChat() {
      this.showCreate = false;
    },
    toChat(item) {
      let chat = this.getChatByChatId(item.groupNo);
      if (!chat) {
        chat = {
          type: 2,
          chatId: item.groupNo,
          info: {
            nickname: item.groupName,
            avatar: item.groupAvatar,
            remark: item.remark,
            notDisturb: item.notDisturb,
          },
          lastMsgTime: new Date(),
          newMsgNum: 0,
          messages: [],
        };
        this.$store.dispatch("chat/topChat", chat);
        this.$store.dispatch("chat/selectSession", chat.chatId);
      } else {
        this.$store.dispatch("chat/selectSession", chat.chatId);
      }
      this.$router.push({ path: "/chat" });
    },
  },
};
</script>

<style lang="stylus" scoped>
.info-head {
  height: 60px;
  padding: 28px 0 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
}

.group-list {
  .search {
    margin: 0px 50px;
    margin-bottom: 10px;
  }

  .content {
    height: 500px;
    padding-left: 58px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    text-align: center;

    .groupHead {
      margin: 10px 0px;
      padding: 10px;
      width: 65px;
      height: 90px;
      text-align: center;
      cursor: pointer;
      box-sizing: ceil;

      .avatar {
        text-align: center;
        margin: 0 auto;
        border-radius: 50%;
      }

      .name {
        color: #444444;
        width: 65px;
        text-align: center;
        margin: 0 auto;
        margin-top: 10px;
        font-size: 14px;
        height: 15px;
        line-height: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .add {
        width: 50px;
        height: 50px;
        border: 1px solid #DADADA;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }

      &:hover {
        background-color: #E6E6E6;
      }
    }
  }
}
</style>

