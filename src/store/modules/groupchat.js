const state = {
  groupChatList: [{
    "ownerId": "1677900582",
    "groupName": "五道口职业技术学院校友会",
    "groupNo": "A_t431FMe74187",
    "notice": null,
    "remark": "校友会的叼毛们",
    "groupAvatar": "https://img2022.cnblogs.com/blog/1556860/202202/1556860-20220221135450877-25718536.jpg",
    "notDisturb": false,
    "userDetails": [{
        "username": "1677900582",
        "wxid": "lwj123213",
        "type": 0,
        "nickname": "麻花藤",
        "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160352097-806662701.jpg",
        "sex": 1,
        "signature": "开心开不开心",
        "area": "广东深圳",
        "groupNickname": "马化腾"
      },
      {
        "username": "1737401145",
        "wxid": "lwj11111",
        "type": 1,
        "nickname": "码云",
        "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210929094050713-2085134549.png",
        "sex": 1,
        "signature": "你犯法了知道吗？",
        "area": "广东广州",
        "groupNickname": "码云"
      },
      {
        "username": "1486842355",
        "wxid": "1486842355n7dg",
        "type": 1,
        "nickname": "面白い男",
        "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160332031-1473597366.jpg",
        "sex": 1,
        "signature": "",
        "area": "湖南长沙",
        "groupNickname": "面白い男"
      },
      {
        "username": "1025431504",
        "wxid": "1025431504CtZx",
        "type": 1,
        "nickname": "简单丶爱才美",
        "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160401526-1461243363.jpg",
        "sex": 1,
        "signature": "",
        "area": null,
        "groupNickname": "简单丶爱才美"
      },
      {
        "username": "1398952749",
        "wxid": "1398952749sqK7",
        "type": 1,
        "nickname": "我不听",
        "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160406881-373503134.jpg",
        "sex": 1,
        "signature": "闪电五连鞭！",
        "area": null,
        "groupNickname": "我不听"
      }
    ],
  }],
  searchText: ""
}
const mutations = {
  // 搜索值
  search(state, value) {
    state.searchText = value
  },
  addGroupChat(state, value) {
    let groupChat = state.groupChatList.find(groupChat => groupChat.groupNo === value.groupNo);
    if (groupChat == null) {
      state.groupChatList.push(value);
    }
  },
  groupAddUser(state, value) {
    let groupChat = state.groupChatList.find(groupChat => groupChat.groupNo === value.groupNo);
    if (groupChat != null) {
      groupChat.userDetails.unshift(value.user);
    }
  },
  deleteGroupChat(state, value) {
    let index = -1;
    for (let i = 0; i < state.groupChatList.length; i++) {
      let x = state.groupChatList[i];
      if (x.groupNo === value) {
        index = i;
      }
    }
    if (index != -1) {
      state.groupChatList.splice(index, 1);
    }
  },
  addGroupChatList(state, value) {
    for (let i = 0; i < state.groupChatList.length; i++) {
      let x = state.groupChatList[i];
      if (!value.find((y) => x.groupNo === y.groupNo)) {
        x.deleted = true;
      }
    }
    let add = value.filter(x => !state.groupChatList.find((y) => x.groupNo === y.groupNo));
    for (let i = 0; i < add.length; i++) {
      state.groupChatList.push(add[i]);
    }
  }
}
const actions = {
  search: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  addGroupChat: ({
    commit
  }, value) => commit('addGroupChat', value),
  groupAddUser: ({
    commit
  }, value) => commit('groupAddUser', value),
  addGroupChatList: ({
    commit
  }, value) => commit('addGroupChatList', value),
  deleteGroupChat: ({
    commit
  }, value) => commit('deleteGroupChat', value),
}
const getters = {
  // 筛选出含有搜索值的好友列表
  searchedGroupChatList(state, params, rootState) {
    return state.groupChatList.filter(group => !group.deleted && (group.groupName.includes(state.searchText)));
  },
  // 根据群编号获取群信息
  selectedGroupChat(state, params, rootState) {
    return state.groupChatList.find(group => group.groupNo === rootState.chat.selectChatId);
  },
  selectedGroupChatByNo(state) {
    return function (groupNo) {
      return state.groupChatList.find(group => !group.deleted && (group.groupNo === groupNo))
    }
  },
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