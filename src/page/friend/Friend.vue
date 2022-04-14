<template>
  <div class="content">
    <div class="friend-wrapper" v-drag>
      <SearchList @add="addFirend" :placeholder="'搜索'"></SearchList>
      <FriendList></FriendList>
    </div>
    <div class="friendinfo">
      <Info></Info>
    </div>
    <CusConfirm
      :height="520"
      :width="350"
      :flag="showConfirm"
      @cancel="addUserCancel"
      @confirm="addUserConfirm"
      :isActive="searchUser != null"
      :title="'添加好友'"
    >
      <template v-slot:confirm>
        <div class="add-firend">
          <Search @search="userSearch"></Search>
          <div class="userInfo" v-if="searchUser != null">
            <div class="esInfo">
              <div class="right">
                <img
                  class="avatar"
                  width="60"
                  height="60"
                  :src="searchUser.avatar"
                />
              </div>
              <div class="left">
                <div class="people">
                  <div class="nickname">{{ searchUser.nickname }}</div>
                  <div
                    :class="[
                      searchUser.sex === 1 ? 'gender-male' : 'gender-female',
                    ]"
                  ></div>
                </div>
                <div
                  class="signature"
                  v-text="
                    searchUser.signature == null || searchUser.signature === ''
                      ? '这个人什么也留下'
                      : searchUser.signature
                  "
                ></div>
              </div>
            </div>
            <div class="detInfo">
              <div class="wxid">
                <span>账&nbsp&nbsp&nbsp号</span>{{ searchUser.username }}
              </div>
              <div class="wxid"><span>微信号</span>{{ searchUser.wxid }}</div>
              <div class="area">
                <span>地&nbsp&nbsp&nbsp区</span>{{ searchUser.area }}
              </div>
            </div>
          </div>
          <div class="editInfo" v-if="searchUser != null">
            <div class="info">
              <p>发送好友申请</p>
              <input v-model="edit.info" />
            </div>
            <div class="remark">
              <p>备注名</p>
              <input v-model="edit.remark" />
            </div>
          </div>
        </div>
      </template>
    </CusConfirm>
  </div>
</template>

<script>
import CusConfirm from "@/components/other/confirm/CusConfirm";
import SearchList from "@/components/search/SearchList";
import Search from "@/components/search/Search";
import FriendList from "@/components/friendlist/FriendList";
import Info from "@/components/info/Info";
export default {
  components: {
    SearchList,
    Search,
    CusConfirm,
    FriendList,
    Info,
  },
  data() {
    return {
      showConfirm: false,
      searchUser: null,
      edit: {
        remark: "",
        info: "",
      },
    };
  },
  methods: {
    addFirend() {
      this.showConfirm = true;
    },
    addUserConfirm() {
      let params = {
        username: this.searchUser.username,
        info: this.edit.info,
        remark: this.edit.remark,
      };
      // applyAddFriend(params).then((res) => {
      //   if (res.code == 0) {
      //     this.$message({
      //       content: "发送成功",
      //       time: 2500,
      //       type: "info",
      //       hasClose: true,
      //     });
      //     this.showConfirm = false;
      //   }
      // });
    },
    addUserCancel() {
      this.showConfirm = false;
      this.searchUser = null;
    },
    userSearch(value) {
      if (value == null || value === "") {
        this.searchUser = null;
        return;
      }
      // selectUser(value)
      //   .then((res) => {
      //     if (res.code == 0) {
      //       this.searchUser = res.data;
      //       this.edit.remark = this.searchUser.nickname;
      //       this.edit.info = "我是" + this.$store.state.user.info.nickname;
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>

<style lang="stylus" scoped>
.content {
  display: flex;
  height: 630px;
  width: 100%;

  .friend-wrapper {
    width: 250px;
    background: rgb(229, 229, 230);
    border-right: 1px solid #d6d6d6;
  }

  .friendinfo {
    flex: 1;
    background-color: #F5F5F5;
  }

  .add-firend{
    height: 465px;
    width: 350px;
  }

  .userInfo {
    margin: 10px auto;
    padding: 0 50px;
    text-align: left;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;

    .esInfo {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .left {
        flex: 1;

        .people {
          .nickname {
            display: inline-block;
            font-size: 20px;
            margin-bottom: 16px;
          }

          .gender-male, .gender-female {
            display: inline-block;
            width: 18px;
            height: 18px;
            vertical-align: top;
            margin-top: 2px;
            margin-left: 5px;
          }

          .gender-male {
            background-image: url('../../components/info/man.png');
            background-size: cover;
          }

          .gender-female {
            background-image: url('../../components/info/woman.png');
            background-size: cover;
          }
        }

        .signature {
          font-size: 14px;
          color: rgba(153, 153, 153, 0.8);
        }
      }

      .right {
        margin-right: 20px;

        .avatar {
          border-radius: 3px;
        }
      }
    }

    .detInfo {
      padding: 20px 0;
      margin-bottom: 20px;

      .area, .wxid {
        font-size: 14px;
        margin-top: 20px;

        span {
          font-size: 14px;
          color: rgba(153, 153, 153, 0.8);
          margin-right: 40px;
        }
      }
    }
  }

  .editInfo {
    margin: 10px auto;
    padding: 0 50px;
    text-align: left;
    font-size: 14px;

    p {
      font-size: 14px;
      color: rgba(153, 153, 153, 0.8);
      margin-right: 40px;
    }

    input {
      margin: 8px 0;
      width: 100%;
      background-color: #E2E2E2;
      padding: 1px 10px;
      height: 30px;
      border-radius: 2px;

      &:focus {
        outline: none;
        border-color: #E2E2E2;
      }
    }
  }
}
</style>