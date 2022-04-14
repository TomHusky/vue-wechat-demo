<!-- 好友信息 -->
<template>
  <div class="Info-wrapper selectNone">
    <div class="info-head" v-drag>
      <div class="newfriend">
        <div class="nickname">{{ selectedFriend.nickname }}</div>
      </div>
    </div>
    <div class="newFriendList">
      <ul>
        <template v-for="item in newFriendList">
          <li :key="item.applyId" class="friendlist">
            <div class="list-left">
              <img
                class="avatar"
                width="50"
                height="50"
                :alt="item.nickname"
                :src="item.avatar"
              />
            </div>
            <div class="list-right">
              <p class="nickname">
                {{ item.nickname }}
              </p>
              <div class="status">
                <span v-if="item.status == 1">已添加</span>
                <span v-if="item.status == 2" style="color: #fa5151"
                  >已拒绝</span
                >
                <button
                  class="reject"
                  @click="reject(item)"
                  v-if="item.status == 0"
                >
                  拒绝
                </button>
                <button
                  class="agree"
                  @click="agree(item)"
                  v-if="item.status == 0"
                >
                  同意
                </button>
              </div>
              <p class="info">{{ item.info }}</p>
            </div>
            <div class="division"></div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      newFriendList: (state) => state.friend.newFriendList,
    }),
    ...mapGetters({
      selectedFriend: "friend/selectedFriend",
    }),
  },
  methods: {
    ...mapActions({
      updateNewFriendStatus: "friend/updateNewFriendStatus",
      addFriend: "friend/addFriend",
    }),
    reject(item) {
      this.handleApply(item, 2);
    },
    agree(item) {
      this.handleApply(item, 1);
    },
    handleApply(item, status) {
      let params = {
        applyId: item.applyId,
        username: item.username,
        status: status,
      };
      this.updateNewFriendStatus(params);
      if (status == 1) {
        this.addFriend(item.userInfo);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.division {
  width: 100%;
  margin-top: 15px;
}

.info-head {
  height: 60px;

  .newfriend {
    height: 100%;
    padding: 28px 0 0 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;

    .nickname {
      font-size: 18px;
    }
  }
}

.newFriendList {
  width: 100%;
  overflow-y: auto;
  cursor: default;

  .friendlist {
    display: flex;
    padding: 15px 90px;
    font-size: 0;
    flex-wrap: wrap;

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

      .nickname {
        display: inline-block;
        vertical-align: top;
        margin-top: 3px;
        font-size: 14px;
      }

      .status {
        position: absolute;
        color: #999;
        font-size: 14px;
        right: 0;

        button {
          border-radius: 2px;
          color: #fff;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
        }

        .agree {
          background-color: #1AAD19;
        }

        .reject {
          margin-right: 15px;
          background-color: #FA5151;
        }
      }

      .info {
        position: absolute;
        max-width: 350px;
        font-size: 14px;
        height: 15px;
        line-height: 15px;
        color: #999;
        bottom: 3px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>

