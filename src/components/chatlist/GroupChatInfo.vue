<template>
  <div class="info selectNone">
    <div class="header">
      <Search :placeholder="placeholder" :showBtn="false"></Search>
    </div>
    <div class="content scrollbar">
      <div class="chatUserList">
        <div class="userHead">
          <div class="add">
            <img alt="添加" width="15px" src="static/images/icon/add.svg" />
          </div>
          <div class="name">添加</div>
        </div>
        <div
          class="userHead"
          v-for="item in selectedGroupChat.userDetails"
          :key="item.id"
        >
          <img
            class="avatar"
            width="35"
            height="35"
            :alt="item.nickname"
            :src="item.avatar"
            @click="openMenu($event, item)"
          />
          <div v-if="item.remark == null" class="name">{{ item.nickname }}</div>
          <div v-if="item.remark != null" class="name">{{ item.remark }}</div>
        </div>
      </div>
      <div class="division"></div>
      <div class="chatItem">
        <div class="item">
          <p class="lable">群聊名称</p>
          <p
            class="value"
            :class="{ editText: selectedGroupChat.ownerId === user.username }"
            :contentEditable="selectedGroupChat.ownerId === user.username"
          >
            {{ selectedGroupChat.groupName }}
          </p>
        </div>
        <div class="item">
          <p class="lable">群公告</p>
          <p class="value">
            {{
              selectedGroupChat.notice == null ||
              selectedGroupChat.notice === ""
                ? "未设置"
                : selectedGroupChat.notice
            }}
          </p>
        </div>
        <div class="item">
          <p class="lable">备注</p>
          <p
            class="value editText"
            @focus="focusRemark($event)"
            @blur="updateRemark($event)"
            contentEditable
          >
            {{
              selectedGroupChat.remark == null ||
              selectedGroupChat.remark === ""
                ? "群聊的备注仅自己可见"
                : selectedGroupChat.remark
            }}
          </p>
        </div>
        <div class="item">
          <p class="lable">我在本群的昵称</p>
          <p
            class="value editText"
            @blur="updateNickname($event)"
            contentEditable
          >
            {{ getMsgUserInfo(user.username).groupNickname }}
          </p>
        </div>
      </div>
      <div class="division"></div>
      <div class="chatItem">
        <div class="item chatSwitchItem">
          <p class="switchLable">显示群成员昵称</p>
          <p class="switchValue">
            <Switched :width="40" :height="18"></Switched>
          </p>
        </div>
        <div class="item chatSwitchItem">
          <p class="switchLable">消息免打扰</p>
          <p class="switchValue">
            <Switched
              :width="40"
              :checked="selectedGroupChat.notDisturb"
              :height="18"
            ></Switched>
          </p>
        </div>
        <div class="item chatSwitchItem">
          <p class="switchLable">置顶聊天</p>
          <p class="switchValue">
            <Switched :width="40" :height="18"></Switched>
          </p>
        </div>
      </div>
      <div class="division"></div>
      <div class="exit">
        <span @click="exit">删除并退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/search/Search";
import Switched from "@/components/other/Switch";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
    Search,
    Switched,
  },
  data() {
    return {
      placeholder: "搜索群好友",
    };
  },
  created() {
    document.addEventListener("click", (e) => {
      if (this.$refs.info == null) {
        return;
      }
      if (!this.$refs.info.contains(e.target)) {
        if (this.isShow) {
          this.isShow = false;
        }
      }
    });
  },
  computed: {
    ...mapState({
      user: (state) => state.user.info,
      searchText: (state) => state.system.searchText,
    }),
    ...mapGetters({
      selectedGroupChat: "groupchat/selectedGroupChat",
      selectedFriendByUsername: "friend/selectedFriendByUsername",
    }),
    isSelf() {
      return (username) => {
        return username === this.user.username;
      };
    },
    getMsgUserInfo() {
      return (username) => {
        let user = this.selectedGroupChat.userDetails.find(
          (user) => user.username === username
        );
        let friend = this.selectedFriendByUsername(username);
        if (friend != null) {
          user.groupNickname = friend.remark;
        }
        return user;
      };
    },
  },
  methods: {
    ...mapActions({
      deleteGroupChat: "groupchat/deleteGroupChat",
      deleteChatByChatId: "chat/deleteChatByChatId",
    }),
    openMenu(e, item) {
      let info = {
        clientX: e.clientX,
        clientY: e.clientY,
        self: this.isSelf(item.username),
        visible: true,
        visibleIng: true,
        info: this.isSelf(item.username)
          ? this.user
          : this.getMsgUserInfo(item.username),
      };
      this.$store.commit("system/setHeadMenu", info);
    },
    focusRemark(event) {
      if (this.selectedGroupChat.remark === null) {
        event.target.innerText = "";
        // 解决情况之后光标消失问题
        this.focusRange(event.target);
      }
    },
    focusRange(obj) {
      if (window.getSelection) {
        //ie11 10 9 ff safari
        obj.focus(); //解决ff不获取焦点无法定位问题
        let range = window.getSelection(); //创建range
        range.selectAllChildren(obj); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      } else if (document.selection) {
        //ie10 9 8 7 6 5
        let range = document.selection.createRange(); //创建选择对象
        //var range = document.body.createTextRange();
        range.moveToElementText(obj); //range定位到obj
        range.collapse(false); //光标移至最后
        range.select();
      }
    },
    updateRemark(event) {
      let remark = event.target.innerText.trim();
      if (remark === "") {
        if (this.selectedGroupChat.remark == null) {
          event.target.innerText = "群聊的备注仅自己可见";
        } else {
          event.target.innerText = this.selectedGroupChat.remark;
        }
        return;
      }
      if (remark === this.selectedGroupChat.remark) {
        return;
      }
    },
    updateNickname(event) {
      let nickname = event.target.innerText.trim();
      if (nickname === "") {
        event.target.innerText = this.getMsgUserInfo(
          this.user.username
        ).groupNickname;
        return;
      }
      if (nickname === this.getMsgUserInfo(this.user.username).groupNickname) {
        return;
      }
    },
    exit() {
      let groupNo = this.selectedGroupChat.groupNo;
      // deleteChatUser(groupNo).then((res) => {
      //   if (res.code == 0) {
      //     this.deleteChatByChatId(groupNo);
      //     this.deleteGroupChat(groupNo);
      //   }
      // });
    },
  },
};
</script>

<style lang="stylus" scoped>
.division {
  width: 205px;
  margin: 10px 0 10px 20px;
}

.info {
  .header {
    margin: 0 13px;
  }

  .content {
    height: 570px;
  }

  .chatUserList {
    width: 245px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin: 5px 15px 5px 15px;

    .userHead {
      margin: 10px 4px;
      width: 47px;
      height: 50px;
      text-align: center;
      cursor: pointer;

      .add {
        width: 35px;
        height: 35px;
        border: 1px solid #DADADA;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;

        &:hover {
          border-color: #CDCDCD;
        }
      }

      .avatar {
        text-align: center;
        margin: 0 auto;
        border-radius: 2px;
      }

      .name {
        color: #444444;
        width: 42px;
        text-align: center;
        margin: 0 auto;
        margin-top: 4px;
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .chatItem {
    width: 205px;
    margin: 10px 20px;

    .item {
      font-size: 14px;
      margin: 20px 0;

      .lable {
        padding: 0 2px;
        margin-bottom: 10px;
      }

      .value {
        padding: 0 2px;
        color: #999;
      }

      .editText {
        cursor: pointer;
        outline: none;
        box-sizing: content-box;
        white-space: nowrap; /* 强制span不换行 */
        max-width: 200px; /* 限制宽度 */
        overflow: hidden; /* 超出宽度部分隐藏 */
        display: inline-block;
        text-overflow: ellipsis; /* 超出部分以点号代替 */
      }
    }

    .chatSwitchItem {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .switchLable {
        left: 0;
      }

      .switchValue {
        right: 0;
      }
    }
  }

  .exit {
    width: 245px;
    color: #F45471;
    text-align: center;
    margin: 20px 0px;
    font-size: 14px;

    span {
      cursor: pointer;
    }
  }
}
</style>