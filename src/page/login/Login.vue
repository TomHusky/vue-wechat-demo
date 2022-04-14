<template>
  <div class="login">
    <div class="label"></div>
    <div class="header">
      <img id="headMenu" :src="user.avatar" class="avatar" />
    </div>
    <div class="loginInfo">
      <input class="account" v-model="form.nickname" placeholder="昵称"/>
      <input class="account" maxlength="14" oninput="value=value.replace(/[^\w\.\s\/]/ig,'')" v-model="form.username" placeholder="账号" />
      <!-- <input class="password" type="password" v-model="form.password" /> -->
    </div>
    <div class="loginBotton" @click="login">
      <span>登录</span>
    </div>
    <!-- <div class="select">
      <CheckBox
        @change="remember"
        type="checkbox"
        :checked="rememberPass"
        :width="12"
        :height="12"
        :fontSize="8"
        :label="'记住密码'"
      />
    </div> -->
  </div>
</template>

<script>
import CheckBox from "@/components/other/input/CheckBox";
import { mapActions } from "vuex";
export default {
  components: {
    CheckBox,
  },
  data() {
    return {
      rememberPass:
        localStorage.getItem("rememberPass") === null ||
        localStorage.getItem("rememberPass") === ""
          ? false
          : true,
      form: {
        nickname:
          localStorage.getItem("nickname") === null
            ? ""
            : localStorage.getItem("nickname"),
        username:
          localStorage.getItem("username") === null
            ? ""
            : localStorage.getItem("username"),
        password:
          localStorage.getItem("password") === null
            ? ""
            : localStorage.getItem("password"),
        auto: true,
      },
    };
  },
  computed: {
    user() {
      let user = this.$store.getters["user/getUser"];
      user.self = true;
      return user;
    },
  },
  methods: {
    ...mapActions({
      handleLogin: "user/handleLogin",
      listFriendInfo: "user/listFriendInfo",
      setUserInfo: "user/setUserInfo",
    }),
    remember(value) {
      if (value) {
        localStorage.setItem("rememberPass", value);
        localStorage.setItem("password", this.form.password);
      } else {
        localStorage.setItem("rememberPass", "");
        localStorage.removeItem("password");
      }
    },
    login() {
      let username = this.form.username;
      let password = this.form.password;
      let nickname = this.form.nickname;
      if (
        username === "" ||
        username === null ||
        nickname === "" ||
        nickname === null
      ) {
        this.$message({
          content: "用户名和昵称不能为空",
          time: 2500,
          type: "warning",
          hasClose: true,
        });
        return;
      }
      let saveUsername = localStorage.getItem("username", username);
      if (saveUsername != null && saveUsername !== username) {
        localStorage.removeItem("vue-wechat");
      }
      localStorage.setItem("username", username);
      localStorage.setItem("nickname", this.form.nickname);
      let auto = this.form.auto;
      this.handleLogin({ username, nickname, password, auto })
        .then((res) => {
          this.setUserInfo(res);
          this.$router.push({ path: "/chat" });
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 1s;
}

.login {
  width: 280px;
  height: 400px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background-color: #F5F5F5;
  border-radius: 3px;
  text-align: center;

  .header {
    margin-top: 70px;
    margin-bottom: 30px;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 3px;
    }
  }

  .loginInfo {
    margin: 0px auto;

    .account {
      background-image: url('./account.svg');

      &:focus {
        background-image: url('./account-choice.svg');
      }
    }

    .password {
      background-image: url('./password.svg');

      &:focus {
        background-image: url('./password-choice.svg');
      }
    }

    input {
      font-size: 16px;
      width: 135px;
      padding: 4px 15px 4px 30px;
      margin-bottom: 10px;
      border-bottom: 1px solid #D6D6D6;
      font-family: inherit;
      overflow: hidden;
      background-color: #F5F5F5;
      background-repeat: no-repeat;
      background-position: center;
      background-position-x: 5px;
      background-size: 15px 15px;

      &:focus {
        border-bottom-color: #1aad19;
        outline: 0;
        // -webkit-box-shadow: inset 0 1px 1px rgba(26,173,25,.075),0 0 8px rgba(26,173,25,.6)
        // box-shadow: inset 0 1px 1px rgba(26,173,25,.075),0 0 8px rgba(26,173,25,.6)
      }
    }
  }

  .select {
    margin-top: 5px;
  }

  .loginBotton {
    margin: 0 auto;
    margin-top: 35px;
    width: 180px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    background-color: #1aad19;
    cursor: pointer;
    border-radius: 1px;

    &:hover {
      background: rgb(18, 150, 17);
    }
  }
}
</style>