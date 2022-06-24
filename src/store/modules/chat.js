import {
  timeDifference,
  base64toFile
} from "@/libs/tools";
const now = new Date();
// namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
// 例： SET_NAME => user/SET_NAME
const state = {
  // 对话好友列表
  chatlist: [{
      id: 1,
      type: 1,
      index: 1,
      chatId: '99',
      info: {
        username: '99',
        avatar: 'static/images/vue.jpg', //头像
        nickname: "机器人", //昵称
        remark: "偷懒的机器人", //备注
        notDisturb: true // 免打扰
      },
      newMsgNum: 1, //新消息条数
      isShow: true,
      lastMsgTime: new Date(),
      messages: [{
        username: "99",
        type: 1,
        content: '我会跟你聊聊天的哟',
        date: now,
        showTime: true
      }]
    },
    {
      id: 2,
      type: 1,
      index: 2,
      chatId: '1486842355',
      info: {
        username: "1486842355",
        avatar: 'https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160332031-1473597366.jpg',
        nickname: "面白い男",
        remark: "老胡",
        notDisturb: false
      },
      newMsgNum: 0,
      isShow: true,
      lastMsgTime: new Date(1637131427000),
      messages: [{
          type: 1,
          content: '我已经通过你的好友请求，现在可以开始聊天了',
          date: new Date(1636955087000),
          showTime: true
        }, {
          type: 1,
          content: '你好，我是老胡',
          date: new Date(1636955087000),
          showTime: false
        }, {
          type: 1,
          content: '我嚓！你这个做的可以哦',
          date: new Date(1637214287000),
          showTime: true
        }, {
          type: 1,
          content: '6666',
          date: new Date(1637131427000),
          showTime: false
        }
      ]
    },
    {
      id: 3,
      type: 1,
      index: 3,
      chatId: '1398952749',
      info: {
        username: "1398952749",
        avatar: 'https://img2020.cnblogs.com/blog/1556860/202109/1556860-20210923160406881-373503134.jpg',
        nickname: "我不听",
        remark: "马老C",
        notDisturb: false
      },
      newMsgNum: 3,
      isShow: true,
      lastMsgTime: new Date(),
      messages: [{
        type: 1,
        content: '我已经通过你的好友请求，现在可以开始聊天了',
        date: new Date(1637131427000),
        showTime: true
      }, {
        type: 1,
        content: '老哥，赶紧上号',
        date: new Date(1637131487000),
        showTime: false
      }, {
        type: 2,
        content: {
          width: 1922,
          height: 1032,
          src: 'https://img2020.cnblogs.com/blog/1556860/202111/1556860-20211118151107858-1710905478.png'
        },
        date: new Date(1637131487000),
        showTime: false
      }]
    },
    {
      id: 4,
      type: 2,
      index: 4,
      chatId: 'A_t431FMe74187',
      info: {
        groupNo: "A_t431FMe74187",
        avatar: 'https://img2022.cnblogs.com/blog/1556860/202202/1556860-20220221135450877-25718536.jpg',
        nickname: "五道口职业技术学院校友会",
        remark: "校友会的叼毛们",
        notDisturb: false
      },
      newMsgNum: 0,
      isShow: true,
      lastMsgTime: new Date(),
      messages: [{
        username: "1677900582",
        type: 1,
        content: '上号上号',
        date: new Date(1637131427000),
        showTime: true
      }, {
        username: "1486842355",
        type: 1,
        content: '老哥，赶紧上号',
        date: new Date(1637131487000),
        showTime: false
      }, {
        username: "1398952749",
        type: 1,
        content: '给兄弟们发点好康的@::tt;;@17c07d6a3cd57c6654c75728987b93dc@',
        date: new Date(1637131487000),
        showTime: false
      }, {
        username: "1486842355",
        type: 1,
        content: '我草 牛逼',
        date: new Date(1637131487000),
        showTime: false
      }, {
        username: "1486842355",
        type: 1,
        content: '别墨迹，赶紧的',
        date: new Date(1637131487000),
        showTime: false
      }, {
        username: "1486842355",
        type: 1,
        content: '快点快点',
        date: new Date(1637131487000),
        showTime: false
      }, {
        username: "1486842355",
        type: 1,
        content: '老哥，赶紧上号',
        date: new Date(1637131487000),
        showTime: false
      }]
    }
  ],
  // 得知当前选择的是哪个对话
  selectChatId: '99',
}
const mutations = {
  // 从localStorage 中获取数据
  initData(state) {
    let data = localStorage.getItem('vue-chat');
    if (data) {
      state.chatlist = JSON.parse(data);
    }
  },
  // 得知用户当前选择的是哪个对话。便于匹配对应的对话框
  selectSession(state, value) {
    state.selectChatId = value;
    let chat = state.chatlist.find(session => session.chatId === value);
    chat.newMsgNum = 0;
    chat.isShow = true;
  },
  // 更新聊天信息
  updateChatInfo(state, value) {
    let chat = state.chatlist.find(session => session.chatId === value.chatId);
    if (value.newMsgNum != null) {
      chat.newMsgNum = value.newMsgNum;
    }
    if (value.newMsgNum != null) {
      chat.isShow = value.isShow;
    }
    if (value.info.notDisturb != null) {
      chat.info.notDisturb = value.info.notDisturb;
    }
  },
  deleteChatByChatId(state, value) {
    let index = -1;
    for (let i = 0; i < state.chatlist.length; i++) {
      if (state.chatlist[i].chatId === value) {
        index = i;
      }
    }
    if (index > -1) {
      state.selectChatId = state.chatlist[index + 1].chatId;
      state.chatlist.splice(index, 1);
    }
  },
  // 发送信息
  sendMessage(state, {
    msg,
    rootState
  }) {
    let result = state.chatlist.find(session => session.chatId === state.selectChatId);
    let now = new Date();
    // 获取最后一条消息时间
    let interval = timeDifference(new Date(result.lastMsgTime), now);
    let showTime = false;
    if (interval > 3) {
      showTime = true;
    }
    result.lastMsgTime = new Date();
    result.messages.push({
      content: msg.content,
      date: now,
      type: msg.type,
      username: rootState.user.info.username,
      showTime: showTime
    });
    if (result.chatId === '99') {
      setTimeout(() => {
        result.messages.push({
          content: "由于资金不足，机器人已经跑路!",
          date: now,
          username: "001",
          type: 1,
          showTime: false
        });
      }, 200)
    } else {
      if (msg.type == 2) {
        let file = base64toFile(msg.content.src, "file");
        // 上传图片
        return;
      }
      if (msg.type == 3) {
        // 上传文件
        return;
      }
    }
  },
  async ['receiveMessage'](state, {
    commit,
    msg,
    rootGetters
  }) {
    let result = state.chatlist.find(session => session.chatId === msg.sendId);
    let showTime = true;
    if (!result) {
      let info = {};
      if (msg.msgType == 1) {
        info = rootGetters['friend/selectedFriendByUsername'](msg.username);
        info.chatId = info.username;
      } else {
        let groupChat = rootGetters['groupchat/selectedGroupChatByNo'](msg.sendId);
        info.nickname = groupChat.groupName;
        info.avatar = groupChat.groupAvatar;
        info.remark = groupChat.remark;
        info.notDisturb = groupChat.notDisturb;
        info.chatId = groupChat.groupNo;
      }
      result = {
        type: msg.msgType,
        chatId: info.chatId,
        info: {
          nickname: info.nickname,
          avatar: info.avatar,
          remark: info.remark,
          notDisturb: info.notDisturb,
        },
        isShow: true,
        newMsgNum: 0,
        messages: [],
      };
    } else {
      // 对比最后一条消息时间
      let interval = timeDifference(new Date(result.lastMsgTime), now);
      if (interval < 3) {
        showTime = false;
      }
    }
    if (state.selectChatId !== result.chatId) {
      result.newMsgNum = result.newMsgNum + 1;
    }
    result.lastMsgTime = new Date(msg.sendTime);

    result.messages.push({
      type: msg.contentType,
      username: msg.username,
      content: msg.msgContent,
      date: new Date(msg.sendTime),
      showTime: showTime
    });
    commit('topChat', result);
  },
  // 置顶聊天
  topChat(state, chat) {
    let has = false;
    let index = -1;
    for (let i = 0; i < state.chatlist.length; i++) {
      if (state.chatlist[i].chatId === chat.chatId) {
        state.chatlist[i].id = 1;
        state.chatlist[i].index = 1;
        index = i;
        has = true;
      } else {
        state.chatlist[i].id++;
        state.chatlist[i].index++;
      }
    }
    if (has) {
      state.chatlist.unshift(state.chatlist.splice(index, 1)[0]);
    } else {
      chat.index = 1;
      chat.id = 1;
      chat.isShow = true;
      state.chatlist.unshift(chat);
    }
  },
}
const actions = {
  selectSession: ({
    commit
  }, value) => commit('selectSession', value),
  initData: ({
    commit
  }) => commit('initData'),
  updateChatInfo: ({
    commit
  }, value) => commit('updateChatInfo', value),
  deleteChatByChatId: ({
    commit
  }, value) => commit('deleteChatByChatId', value),
  sendMessage: ({
    commit,
    dispatch,
    state,
    rootState,
    rootGetters
  }, msg) => commit('sendMessage', {
    msg,
    rootState
  }),
  async ['receiveMessage'](store, msg) {
    const {
      commit,
      dispatch,
      state,
      rootState,
      rootGetters
    } = store
    commit('receiveMessage', {
      commit,
      msg,
      rootGetters
    })
  },
  topChat: ({
    commit
  }, chat) => commit('topChat', chat),
}

const getters = {
  getTotalNewMsgs(state) {
    let nums = 0;
    for (let i = 0; i < state.chatlist.length; i++) {
      if (!state.chatlist[i].info.notDisturb && state.chatlist[i].newMsgNum > 0) {
        nums += state.chatlist[i].newMsgNum;
      }
    }
    return nums;
  },
  // 筛选出含有搜索值的聊天列表
  searchedChatlist(state, getters, rootState) {
    let remarkSessions = state.chatlist.filter(sessions => sessions.info.remark != null && sessions.info.remark.includes(rootState.system.searchText));
    let sessions = state.chatlist.filter(sessions => sessions.info.nickname.includes(rootState.system.searchText));
    let add = sessions.filter(x => !remarkSessions.find((y) => x.chatId === y.chatId));
    for (let i = 0; i < add.length; i++) {
      remarkSessions.push(add[i]);
    }
    return remarkSessions
  },
  getChatIndex: state => chatId => {
    for (let i = 0; i < state.chatlist.length; i++) {
      if (state.chatlist[i].chatId == chatId) {
        return i;
      }
    }
    return -1;
  },
  // 筛选出含有搜索值的聊天列表
  getChatByChatId(state, getters, rootState) {
    return function (chatId) {
      return state.chatlist.find(session => session.chatId === chatId);
    }
  },
  // 通过当前选择是哪个对话匹配相应的对话
  selectedChat(state) {
    let session = state.chatlist.find(session => session.chatId === state.selectChatId);
    return session
  },
  messages(state) {
    let session = state.chatlist.find(session => session.chatId === state.selectChatId);
    return session.messages
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