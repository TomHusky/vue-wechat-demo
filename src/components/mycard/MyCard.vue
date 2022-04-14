<!-- 最左边的选择框 -->
<template>
  <div class="mycard selectNone" v-drag>
    <header>
      <img
        id="headMenu"
        @click.prevent="openMenu($event)"
        :src="getUser.avatar"
        class="avatar"
      />
    </header>
    <div class="navbar" @click="clearSearch">
      <router-link to="/chat" class="icon iconfont icon-msg">
        <Badge
          v-if="getTotalNewMsgs > 0"
          :count="getTotalNewMsgs"
          :overflowCount="99"
          :width="16"
          :height="16"
        ></Badge>
      </router-link>
      <router-link to="/friend" class="icon iconfont icon-friend">
        <Badge
          v-if="getNewFriendNums > 0"
          :count="getNewFriendNums"
          :overflowCount="99"
          :width="16"
          :height="16"
        ></Badge>
      </router-link>
      <router-link
        to="/game"
        class="icon iconfont icon-collection"
      ></router-link>
    </div>
    <footer>
      <i class="icon iconfont icon-san"></i>
    </footer>
  </div>
</template>

<script>
import Badge from "@/components/other/Badge";
import { mapGetters } from "vuex";
export default {
  components: {
    Badge,
  },
  computed: {
    ...mapGetters({
      getNewFriendNums: "friend/getNewFriendNums",
      getTotalNewMsgs: "chat/getTotalNewMsgs",
      getUser: "user/getUser",
    }),
  },
  data() {
    return {};
  },
  methods: {
    clearSearch() {
      this.$store.dispatch("system/search", "");
    },
    openMenu(e) {
      let info = {
        clientX: e.clientX,
        clientY: e.clientY,
        self: true,
        visible: true,
        visibleIng: true,
        info: this.getUser,
      };
      this.$store.commit("system/setHeadMenu", info);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../assets/fonts/iconfont.css';

.mycard {
  position: relative;
  width: 100%;
  height: 100%;

  .avatar {
    cursor: pointer;
    width: 37px;
    height: 37px;
    margin: 25px 9px 0px 9px;
  }

  .navbar {
    width: 100%;
    text-align: center;
  }

  .icon {
    display: inline-block;
    font-size: 19px;
    margin-top: 28px;
    padding: 0 18px;
    box-sizing: border-box;
    color: rgb(151, 151, 151);
    cursor: pointer;

    &.active {
      color: rgb(0, 220, 65);
    }

    &:hover {
      opacity: 1;
      color: rgb(163, 163, 163);
    }
  }

  .icon-msg, .icon-more, .icon-friend {
    font-size: 18px;
  }

  .icon-msg, .icon-friend {
    position: relative;
    padding: 0 19px;
  }

  .badge {
    right: 8px !important;
  }
}

footer {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}
</style>
