import {
  getAvatar
} from '@/libs/tools'
import {
  removeToken,
  setToken,
  getToken
} from '@/libs/util'
const state = {
  token: getToken(),
  // 当前登录用户
  info: {
    signature: "",
    sex: 1,
    wxid: "",
    area: "广州",
    nickname: '房东的Tom',
    avatar: null,
    username: "",
  },
}
const mutations = {
  saveToken(state, {
    token,
    auto
  }) {
    if (token == null) {
      removeToken();
    } else {
      state.token = token
      setToken(token, auto)
    }
  },
  setUserInfo(state, info) {
    state.info = info;
  }
}

const actions = {
  setUserInfo: ({
    commit
  }, info) => commit('setUserInfo', info),
  // 登录
  handleLogin({
    state,
    commit
  }, {
    username,
    nickname,
    password,
    auto
  }) {
    username = username.trim();
    return new Promise((resolve, reject) => {
      let token = "1212121";
      commit('saveToken', {
        token,
        auto
      })
      state.info.signature = "走别人的路，让别人无路可走";
      state.info.sex = 1;
      state.info.wxid = "12345";
      state.info.area = "奥林帕斯山";
      state.info.nickname = nickname;
      state.info.avatar = getAvatar(nickname);
      state.info.username = username;
      resolve(state.info);
    })
  },
  // 退出登录
  handleLogout({
    commit
  }) {
    commit('saveToken', {
      token: null,
      auto: true
    })
  }
}
const getters = {
  getUser(state, mutations, rootState) {
    if (state.info.avatar == null || state.info.avatar === '') {
      state.info.avatar = getAvatar(state.info.nickname);
    }
    return state.info;
  }
}


export default {
  namespaced: true,
  // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  // 例： SET_NAME => user/SET_NAME
  state,
  mutations,
  actions,
  getters,
}