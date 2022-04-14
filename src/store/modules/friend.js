const state = {
  friendlist: [{
      id: -1,
      wxid: "wx001", //微信号
      initial: 'A', //姓名首字母
      username: "99",
      avatar: 'static/images/vue.jpg', //头像
      signature: "他什么也没有说", //个性签名
      nickname: "机器人", //昵称
      sex: 0, //性别 1为男，0为女
      remark: "偷懒的机器人", //备注
      origin: "官方",
      area: "广东广州", //地区
    },
    {
      "username": "1486842355",
      "wxid": "1486842355n7dg",
      "nickname": "面白い男",
      "email": "1486842355@qq.com",
      "phone": null,
      "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160332031-1473597366.jpg",
      "sex": 1,
      "signature": "",
      "remark": "胡裕嵩",
      "area": "湖南长沙",
      "origin": "扫一扫",
      "label": null,
      "notDisturb": false,
      "initial": "M"
    },
    {
      "username": "1025431504",
      "wxid": "1025431504CtZx",
      "nickname": "简单丶爱才美",
      "email": "1025431504@qq.com",
      "phone": null,
      "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160401526-1461243363.jpg",
      "sex": 1,
      "signature": "",
      "remark": "简单丶爱才美",
      "area": null,
      "origin": "账号搜索",
      "label": null,
      "notDisturb": false,
      "initial": "J"
    },
    {
      "username": "1398952749",
      "wxid": "1398952749sqK7",
      "nickname": "我不听",
      "email": "1398952749@qq.com",
      "phone": null,
      "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160406881-373503134.jpg",
      "sex": 1,
      "signature": "闪电五连鞭！",
      "remark": "我不听",
      "area": null,
      "origin": "账号搜索",
      "label": null,
      "notDisturb": false,
      "initial": "W"
    },
    {
      "username": "1053692173",
      "wxid": "1053692173TTGF",
      "nickname": "元逍",
      "email": "1053692173@qq.com",
      "phone": null,
      "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160338342-264344984.jpg",
      "sex": 1,
      "signature": "",
      "remark": "元逍",
      "area": null,
      "origin": "账号搜索",
      "label": null,
      "notDisturb": false,
      "initial": "Y"
    },
    {
      "username": "591754925",
      "wxid": "591754925KsbG",
      "nickname": "呆呆獸",
      "email": "591754925@qq.com",
      "phone": null,
      "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160411759-1598871399.jpg",
      "sex": 1,
      "signature": "",
      "remark": "呆呆獸",
      "area": null,
      "origin": "账号搜索",
      "label": null,
      "notDisturb": false,
      "initial": "D"
    },
    {
      "username": "1653887048",
      "wxid": "1653887048KlA7",
      "nickname": "清风流水",
      "email": "1653887048@qq.com",
      "phone": null,
      "avatar": "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160346563-821241686.jpg",
      "sex": 1,
      "signature": "",
      "remark": "清风流水",
      "area": null,
      "origin": "账号搜索",
      "label": null,
      "notDisturb": false,
      "initial": "Q"
    }
  ],
  // 好友请求列表
  newFriendList: [{
    applyId: "apply_0101",
    username: "1737401145",
    wxid: "lwj11111",
    nickname: "码云",
    avatar: "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210929094050713-2085134549.png",
    sex: 1,
    info: "我是jack码",
    status: 0,
    userInfo: {
      username: "1737401145",
      wxid: "lwj11111",
      nickname: "码云",
      email: "1737401145@qq.com",
      phone: null,
      avatar: "https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210929094050713-2085134549.png",
      sex: 1,
      signature: "你犯法了知道吗？",
      remark: "jack码",
      area: "广东广州",
      origin: "qq搜索",
      label: "警局",
      notDisturb: false,
      initial: "F"
    }
  }, ],
  newfriend: {
    id: 0,
    wxid: "1", //微信号
    username: "1",
    initial: "新的朋友", //姓名首字母
    avatar: "static/images/newfriend.jpg", //头像
    signature: "", //个性签名
    nickname: "新的朋友", //昵称
    sex: 0, //性别 1为男，0为女
    remark: "新的朋友", //备注
    area: "", //地区
  },
  groupChat: {
    id: 0,
    wxid: "2",
    username: "2",
    initial: "群聊",
    avatar: "static/images/group.png",
    signature: "",
    nickname: "群聊",
    sex: 0,
    remark: "群聊",
    area: "",
  },
  // 得知当前选择的是哪个好友
  selectFriendNo: '1'
}
const mutations = {
  // 得知用户当前选择的是哪个好友。
  selectFriend(state, value) {
    state.selectFriendNo = value
  },
  addFriend(state, value) {
    let friend = state.friendlist.find(friend => friend.username === value.username);
    if (friend == null) {
      state.friendlist.push(value);
    }
  },
  updateFriend(state, value) {
    let tmp = state.friendlist.find((i) => i.username === value.username)
    Object.assign(tmp, value);
  },
  addFriendList(state, value) {
    state.friendlist = state.friendlist.filter((x, index) => {
      if (x.id == -1 || value.find((y) => x.username === y.username)) {
        return x;
      }
    });
    let add = value.filter(x => !state.friendlist.find((y) => x.username === y.username));
    for (let i = 0; i < add.length; i++) {
      state.friendlist.push(add[i]);
    }
  },
  addNewFriend(state, value) {
    let add = value.filter(x => !state.newFriendList.find((y) => x.applyId === y.applyId));
    for (let i = 0; i < add.length; i++) {
      state.newFriendList.push(add[i]);
    }
  },
  updateNewFriendStatus(state, value) {
    let newFriend = state.newFriendList.find(msg => msg.applyId === value.applyId);
    newFriend.status = value.status;
  }
}
const actions = {
  selectFriend: ({
    commit
  }, value) => commit('selectFriend', value),
  addFriendList: ({
    commit
  }, value) => commit('addFriendList', value),
  updateFriend: ({
    commit
  }, value) => commit('updateFriend', value),
  addFriend: ({
    commit
  }, value) => commit('addFriend', value),
  addNewFriend: ({
    commit
  }, value) => commit('addNewFriend', value),
  updateNewFriendStatus: ({
    commit
  }, value) => commit('updateNewFriendStatus', value),
}
const getters = {
  getNewFriendNums(state) {
    let nums = 0;
    for (let i = 0; i < state.newFriendList.length; i++) {
      if (state.newFriendList[i].status == 0) {
        nums++;
      }
    }
    return nums;
  },
  // 筛选出含有搜索值的好友列表
  searchedFriendlist(state, params, rootState) {
    let friends = state.friendlist.filter(friends => friends.remark.includes(rootState.system.searchText));
    return friends
  },
  // 通过当前选择是哪个好友匹配相应的好友
  selectedFriend(state) {
    if (state.selectFriendNo === '1') {
      return state.newfriend;
    }
    if (state.selectFriendNo === '2') {
      return state.groupChat;
    }
    let friend = state.friendlist.find(friend => friend.username === state.selectFriendNo);
    return friend
  },
  selectedChatFriend(state, getters, rootState) {
    let friend = state.friendlist.find(friend => friend.username === rootState.chat.selectChatId);
    return friend
  },
  selectedFriendByUsername(state) {
    return function (username) {
      return state.friendlist.find(friend => friend.username === username)
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