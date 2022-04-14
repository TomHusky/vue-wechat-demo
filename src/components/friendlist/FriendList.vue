<!-- 好友列表 -->
<template>
  <div class="friendlist scrollbar selectNone">
    <ul>
      <li class="frienditem" :class="{ noborder: !newfriend.initial }">
        <div class="list_title" v-if="newfriend.initial">
          {{ newfriend.initial }}
        </div>
        <div
          class="friend-info"
          :class="{ active: newfriend.username === selectFriendNo }"
          @click="selectFriend(newfriend.username)"
        >
          <div class="info-avatar">
            <img
              class="avatar"
              style="background-color: red"
              width="36"
              height="36"
              :src="newfriend.avatar"
            />
            <Badge
              v-if="getNewFriendNums > 0"
              :count="1"
              :overflowCount="9"
              :width="16"
              :height="16"
            ></Badge>
          </div>

          <div class="remark">{{ newfriend.remark }}</div>
        </div>
      </li>
      <li class="frienditem" :class="{ noborder: !groupChat.initial }">
        <div class="list_title" v-if="groupChat.initial">
          {{ groupChat.initial }}
        </div>
        <div
          class="friend-info"
          :class="{ active: groupChat.username === selectFriendNo }"
          @click="selectFriend(groupChat.username)"
        >
          <img class="avatar" width="36" height="36" :src="groupChat.avatar" />
          <div class="remark">{{ groupChat.remark }}</div>
        </div>
      </li>
      <li
        v-for="item in searchedFriendlist"
        class="frienditem"
        :class="{ noborder: !item.initial }"
        :key="item.username"
      >
        <div class="list_title" v-if="item.initial">{{ item.initial }}</div>
        <div
          class="friend-info"
          :class="{ active: item.username === selectFriendNo }"
          @click="selectFriend(item.username)"
        >
          <img class="avatar" width="36" height="36" :src="item.avatar" />
          <div class="remark">{{ item.remark }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Badge from "@/components/other/Badge";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Badge,
  },
  computed: {
    ...mapState({
      newfriend: (state) => state.friend.newfriend,
      groupChat: (state) => state.friend.groupChat,
      selectFriendNo: (state) => state.friend.selectFriendNo,
      searchText: (state) => state.system.searchText,
    }),
    ...mapGetters({
      searchedFriendlist: "friend/searchedFriendlist",
      getNewFriendNums: "friend/getNewFriendNums",
    }),
  },
  methods: {
    ...mapActions({ selectFriend: "friend/selectFriend" }),
  },
};
</script>

<style lang="stylus" scoped>
.friendlist {
  height: 570px;

  .frienditem {
    border-top: 1px solid #dadada;

    &:first-child, &.noborder {
      border-top: none;
    }

    .list_title {
      box-sizing: border-box;
      width: 100%;
      font-size: 12px;
      padding: 15px 0 3px 12px;
      color: #999;
    }

    .friend-info {
      display: flex;
      padding: 12px;
      transition: background-color 0.1s;
      font-size: 0;

      &:hover {
        background-color: #DCDADA;
      }

      &.active {
        background-color: #C5C5C5;
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
    }
  }
}
</style>
