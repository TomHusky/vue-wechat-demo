<template>
  <div
    :style="{
      left: menuPosition.clientX + 'px',
      top: menuPosition.clientY + 'px',
    }"
    v-if="user != null && headMenu.visible"
    class="headmenu"
  >
    <div class="esInfo">
      <div class="left">
        <div class="people">
          <div class="nickname">{{ user.nickname }}</div>
          <div
            :class="[user.sex === 1 ? 'gender-male' : 'gender-female']"
          ></div>
          <div class="infoItem">
            <div class="item wxid">
              <div class="lable" style="width: 50px">微信号:</div>
              <div class="lable" style="margin-left: 5px">{{ user.wxid }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <img class="avatar" width="60" height="60" :src="user.avatar" />
      </div>
    </div>
    <div class="division"></div>
    <div class="infoItem">
      <div v-if="!headMenu.self && user.remark != null" class="item">
        <span class="lable">备&emsp;注</span>
        <span
          class="value editText"
          @blur="updateRemark($event)"
          :contentEditable="
            !headMenu.self && user.initial != null && user.initial.trim() !== ''
          "
          >{{ user.remark }}</span
        >
      </div>
      <div v-if="headMenu.type == 2" class="item">
        <span class="lable">群昵称</span>
        <span class="value">白云三手房东</span>
      </div>
      <div class="item">
        <span class="lable">地&emsp;区</span>
        <span class="value">{{ user.area }}</span>
      </div>
      <div v-if="!headMenu.self && user.origin != null" class="item">
        <span class="lable">来&emsp;源</span>
        <span class="value">{{ user.origin }}</span>
      </div>
      <div v-if="user.label != null" class="item">
        <span class="lable">标&emsp;签</span>
        <span class="value">{{ user.label }}</span>
      </div>
    </div>
    <div
      class="signature"
      :class="{ editText: headMenu.self }"
      @blur="updateSignature($event)"
      :contentEditable="headMenu.self"
    >
      {{ user.signature }}
    </div>
    <div class="button">
      <img width="85px" height="35px" src="./headIcon.png" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "HeadMenu",
  props: {
    refId: {
      type: String,
      default: "headMenu",
    },
    offset: {
      type: Object,
      default: () => {
        return {
          clientX: 0,
          clientY: 0,
        };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      headMenu: (state) => state.system.headMenu,
    }),
    ...mapGetters({
      getUser: "user/getUser",
      selectedFriendByUsername: "friend/selectedFriendByUsername",
    }),
    menuPosition() {
      let windowWidth = this.$store.state.system.windowWidth;
      let windowHeight = this.$store.state.system.windowHeight;
      let position = {
        clientX: this.headMenu.clientX,
        clientY: this.headMenu.clientY,
      };
      if (windowWidth - this.headMenu.clientX < 300) {
        position.clientX = this.headMenu.clientX - 300;
      }
      // if (windowHeight - this.headMenu.clientY < 500) {
      //   position.clientY = this.headMenu.clientY - 500;
      // }
      return position;
    },
    user() {
      return this.headMenu.info;
    },
  },
  watch: {
    headMenu(value) {
      // 更新好友信息
      if (
        value.visible &&
        !value.self &&
        value.info.initial != null &&
        value.info.initial.trim() !== ""
      ) {
        // getFriendInfo(value.info.username).then((res) => {
        //   if (res.code == 0) {
        //     this.updateFriend(res.data);
        //   }
        // });
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.closeMenu);
  },
  destroyed() {
    document.removeEventListener("click", this.closeMenu);
  },
  methods: {
    ...mapActions({
      updateFriend: "friend/updateFriend",
      setUserInfo: "user/setUserInfo",
    }),
    closeMenu(event) {
      let headMenu = document.getElementById(this.refId);
      if (headMenu) {
        if (!headMenu.contains(event.target)) {
          if (this.headMenu.visibleIng) {
            this.headMenu.visibleIng = false;
          } else {
            this.headMenu.visible = false;
            this.$store.commit("system/setHeadMenu", this.headMenu);
          }
        }
      }
    },
    updateRemark(event) {
      let remark = event.target.innerText.trim();
      if (remark === "") {
        event.target.innerText = this.user.remark;
        return;
      }
      if (remark === this.user.remark) {
        return;
      }
      let params = {
        username: this.user.username,
        remark: remark,
      };
      // updateFriendInfo(params).then((res) => {
      //   if (res.code == 0) {
      //     let friend = this.selectedFriendByUsername(this.user.username);
      //     friend.remark = remark;
      //     this.updateFriend(friend);
      //   }
      // });
    },
    updateSignature(event) {
      let signature = event.target.innerText.trim();
      if (signature === "") {
        event.target.innerText = this.user.signature;
        return;
      }
      if (signature === this.user.signature) {
        return;
      }
      let params = {
        signature: signature,
      };
      // updateInfo(params).then((res) => {
      //   if (res.code == 0) {
      //     let user = this.getUser;
      //     user.signature = signature;
      //     this.setUserInfo(user);
      //   }
      // });
    },
  },
};
</script>

<style scoped lang="stylus">
.division {
  margin: 15px 0 15px 0;
}

.headmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  border-radius: 2px;
  font-weight: 400;
  color: #333;
  width: 300px;
  box-shadow: 2px 2px 10px #aaa;
  -o-box-shadow: 2px 2px 10px #aaa;
  -webkit-box-shadow: 2px 2px 10px #aaa;
  -moz-box-shadow: 2px 2px 10px #aaa;
  box-sizing: border-box;
  padding: 30px;
}

.esInfo {
  display: flex;
  align-items: flex-start;

  .left {
    flex: 1;

    .people {
      .nickname {
        display: inline-block;
        font-size: 18px;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .gender-male, .gender-female {
        margin-bottom: 5px;
        display: inline-block;
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }

      .gender-male {
        background-image: url('../../../components/info/man.png');
        background-size: cover;
      }

      .gender-female {
        background-image: url('../../../components/info/woman.png');
        background-size: cover;
      }

      .wxid {
        display: -webkit-flex;
        display: fixed;
        align-items: flex-start;

        div {
          width: 115px;
          white-space: normal;
          word-break: break-all;
          word-wrap: break-word;
          display: inline-block;
        }
      }
    }
  }

  .right {
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 3px;
    }
  }
}

.signature {
  border: 1px solid transparent;
  display: inline-block;
  margin-top: 20px;
  font-size: 10px;
  color: #302e2e;
}

.editText {
  cursor: pointer;
  outline: none;
  padding: 2px 1px;
  box-sizing: content-box;
  white-space: nowrap; /* 强制span不换行 */
  max-width: 220px; /* 限制宽度 */
  overflow: hidden; /* 超出宽度部分隐藏 */
  display: inline-block;
  text-overflow: ellipsis; /* 超出部分以点号代替 */

  &:hover {
    border: 1px solid #BDC9D6 !important;
    border-radius: 5px;
  }
}

.button {
  margin-top: 15px;

  img {
    float: right;
  }
}

.infoItem {
  margin-top: 10px;

  .item {
    font-size: 14px;
    margin: 10px 0;

    .lable {
      margin-bottom: 10px;
      vertical-align: middle;
      color: #999;
    }

    .value {
      margin-left: 20px;
      color: #000000;
      vertical-align: middle;
      border: 1px solid transparent;
    }
  }
}

.border-top {
  border-top: 1px solid #ECECEC;
}
</style>