<!-- 群聊信息 -->
<template>
  <div class="create-group-wrapper selectNone">
    <CusConfirm
      :height="480"
      :width="550"
      :flag="showConfirm"
      @cancel="createGroupCancel"
      @confirm="createGroupChat"
      :isActive="selectFriendList.length > 0"
    >
      <template v-slot:confirm>
        <PopupLoading
          v-if="loading"
          :load="loading"
          :color="'#1AAD19'"
        ></PopupLoading>
        <div class="left">
          <div class="search-content">
            <Search
              class="friend-search"
              :showBtn="false"
              :placeholder="'搜索'"
              @change="friendSearch"
            ></Search>
          </div>
          <div class="friendlist scrollbar">
            <ul>
              <li
                v-for="item in friendListSearch"
                class="frienditem"
                :class="{ noborder: !item.initial }"
                :key="item.wxid"
              >
                <div class="list-title" v-if="item.initial">
                  {{ item.initial }}
                </div>
                <div
                  class="friend-info"
                  :class="{ active: item.wxid === selectFriendWxid }"
                  @click="selectFriend(item)"
                >
                  <img
                    class="avatar"
                    width="36"
                    height="36"
                    :src="item.avatar"
                  />
                  <div class="remark">{{ item.remark }}</div>
                  <RoundCheckBox
                    class="round-checkbox"
                    :value="item"
                    :checked="isSelect(item)"
                    :width="20"
                    :height="20"
                  >
                  </RoundCheckBox>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="select-nums">
            已选择了{{ selectFriendList.length }}个联系人
          </div>
          <div class="friendlist scrollbar">
            <ul>
              <li
                v-for="item in selectFriendList"
                class="frienditem"
                :key="item.wxid"
              >
                <div class="friend-info">
                  <img
                    class="avatar"
                    width="36"
                    height="36"
                    :src="item.avatar"
                  />
                  <div class="remark">{{ item.remark }}</div>
                  <div class="close-select" @click="removeFriend(item)"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </CusConfirm>
  </div>
</template>

<script>
import CusConfirm from "@/components/other/confirm/CusConfirm";
import RoundCheckBox from "@/components/other/input/RoundCheckBox";
import PopupLoading from "@/components/other/loading/PopupLoading";
import Search from "@/components/search/Search";
import { mapActions, mapState } from "vuex";
import { getIndex } from "@/libs/tools";
export default {
  components: {
    Search,
    CusConfirm,
    RoundCheckBox,
    PopupLoading,
  },
  props: {
    showCreate: { type: Boolean, default: false },
  },
  data() {
    return {
      selectFriendWxid: "",
      searchText: "",
      showConfirm: false,
      selectFriendList: [],
      loading: false,
    };
  },
  watch: {
    showCreate(value) {
      this.showConfirm = value;
    },
  },
  computed: {
    ...mapState({
      friendlist: (state) => state.friend.friendlist,
    }),
    friendListSearch() {
      if (this.searchText != null && this.searchText !== "") {
        let friends = this.friendlist.filter((friends) =>
          friends.remark.includes(this.searchText)
        );
        return friends;
      }
      return this.friendlist;
    },
  },
  methods: {
    ...mapActions({
      addGroupChat: "groupchat/addGroupChat",
    }),
    friendSearch(value) {
      this.searchText = value;
    },
    // 判断当前itme是否被选中
    isSelect(item) {
      return getIndex(this.selectFriendList, "username", item.username) != -1;
    },
    // 选择好友
    selectFriend(item) {
      this.selectFriendWxid = item.wxid;
      let index = getIndex(this.selectFriendList, "username", item.username);
      if (index == -1) {
        this.selectFriendList.push(item);
      } else {
        this.selectFriendList.splice(index, 1);
      }
    },
    // 删除选中的好友
    removeFriend(item) {
      let index = getIndex(this.selectFriendList, "username", item.username);
      if (index != -1) {
        this.selectFriendList.splice(index, 1);
      }
    },
    createGroupChat() {
      if (this.selectFriendList.length < 1) {
        return;
      }
      let users = this.selectFriendList.map((value) => value.username);
      let params = {
        usernames: users,
      };
      this.loading = true;
      // createChat(params)
      //   .then((res) => {
      //     if (res.code == 0) {
      //       this.clear();
      //       this.$emit("cancel");
      //       this.addGroupChat(res.data);
      //     }
      //   })
      //   .catch((err) => {
      //     this.loading = false;
      //   });
    },
    clear() {
      this.selectFriendWxid = "";
      this.searchText = "";
      this.showConfirm = false;
      this.selectFriendList = [];
      this.loading = false;
    },
    createGroupCancel() {
      this.clear();
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="stylus" scoped>
.left {
  width: 275px;
  float: left;
  border-right: 1px solid #e7e7e7;
  box-sizing: border-box;
  -moz-box-sizing: border-box;

  .search-content {
    .friend-search {
      width: 215px;
      margin: 0 auto;
    }
  }

  .friendlist {
    height: 400px;
    width: 275px;

    .frienditem {
      text-align: left;

      &:first-child, &.noborder {
        border-top: none;
      }

      .list-title {
        box-sizing: border-box;
        width: 100%;
        font-size: 12px;
        padding: 10px 0 3px 30px;
        color: #999;
      }

      .friend-info {
        display: flex;
        align-items: center;
        padding: 12px 30px;
        transition: background-color 0.1s;
        font-size: 0;

        &:hover {
          background-color: #E8E7E7;
        }

        &.active {
          background-color: #D5D4D4;
        }

        .info-avatar {
          position: relative;

          .avatar {
            border-radius: 2px;
          }
        }

        .remark {
          margin-left: 12px;
          font-size: 14px;
          line-height: 36px;
        }

        .round-checkbox {
          margin-left: auto;
        }
      }
    }
  }
}

.right {
  float: right;
  width: 275px;
  height: 300px;

  .select-nums {
    margin: 30px 30px;
  }

  .friendlist {
    height: 375px;
    width: 275px;
    text-align: left;

    .friend-info {
      display: flex;
      align-items: center;
      padding: 12px 30px;
      transition: background-color 0.1s;
      font-size: 0;

      .info-avatar {
        position: relative;

        .avatar {
          border-radius: 2px;
        }
      }

      .remark {
        margin-left: 12px;
        font-size: 14px;
        line-height: 36px;
      }

      .close-select {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        cursor: pointer;
        margin-left: auto;
        background: url('../../../public/static/images/close.png') #DADADA center center no-repeat;
        background-size: 50% 50%;

        &:hover {
          background-color: #B8B8B8;
        }
      }
    }
  }
}
</style>

