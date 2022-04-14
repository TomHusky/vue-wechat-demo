const state = {
  windowWidth: null,
  windowHeight: null,
  imgWindow: {
    width: 0,
    height: 0,
    showImgWindow: false,
    src: null
  },
  network: true,
  headMenu: {
    visibleIng: false,
    visible: false,
    clientX: 0,
    clienty: 0,
    self: true,
    type: 1, //类型 1 好友 2 群聊
  },
  // 系统图标
  systemFileIcon: null,
  // 输入的搜索值
  searchText: '',
  emojis: [{
      sign: "@::tt;;@f179c32a157fc3905b3f845cdde9d786@",
      file: "100.gif",
      code: "/::)",
      title: "微笑",
      reg: /@::tt;;@f179c32a157fc3905b3f845cdde9d786@/g,
      id: "f179c32a157fc3905b3f845cdde9d786"
    },
    {
      sign: "@::tt;;@d3af995fbd5e85690dc7fad8f72e117b@",
      file: "101.gif",
      code: "/::~",
      title: "伤心",
      reg: /@::tt;;@d3af995fbd5e85690dc7fad8f72e117b@/g,
      id: "d3af995fbd5e85690dc7fad8f72e117b"
    },
    {
      sign: "@::tt;;@c973e1eff6c08a3e195f1bfbd4fe6e38@",
      file: "102.gif",
      code: "/::B",
      title: "美女",
      reg: /@::tt;;@c973e1eff6c08a3e195f1bfbd4fe6e38@/g,
      id: "c973e1eff6c08a3e195f1bfbd4fe6e38"
    },
    {
      sign: "@::tt;;@d778401b0c2d91ba64e632312e98d91a@",
      file: "103.gif",
      code: "/::|",
      title: "发呆",
      reg: /@::tt;;@d778401b0c2d91ba64e632312e98d91a@/g,
      id: "d778401b0c2d91ba64e632312e98d91a"
    },
    {
      sign: "@::tt;;@daea8564a1977711c1bf1a583efbc813@",
      file: "104.gif",
      code: "/:8-)",
      title: "墨镜",
      reg: /@::tt;;@daea8564a1977711c1bf1a583efbc813@/g,
      id: "daea8564a1977711c1bf1a583efbc813"
    },
    {
      sign: "@::tt;;@39b3c431d9e5c681f893fff06c808e6c@",
      file: "105.gif",
      code: "/::<",
      title: "哭",
      reg: /@::tt;;@39b3c431d9e5c681f893fff06c808e6c@/g,
      id: "39b3c431d9e5c681f893fff06c808e6c"
    },
    {
      sign: "@::tt;;@1417b83427473d13fb560f10f7a602b1@",
      file: "106.gif",
      code: "/::$",
      title: "羞",
      reg: /@::tt;;@1417b83427473d13fb560f10f7a602b1@/g,
      id: "1417b83427473d13fb560f10f7a602b1"
    },
    {
      sign: "@::tt;;@e46ca940d8c5752a1c3070b7c80119f3@",
      file: "107.gif",
      code: "/::X",
      title: "哑",
      reg: /@::tt;;@e46ca940d8c5752a1c3070b7c80119f3@/g,
      id: "e46ca940d8c5752a1c3070b7c80119f3"
    },
    {
      sign: "@::tt;;@1ed1f8223ccc40a2798c79ab9e97cc86@",
      file: "108.gif",
      code: "/::Z",
      title: "睡",
      reg: /@::tt;;@1ed1f8223ccc40a2798c79ab9e97cc86@/g,
      id: "1ed1f8223ccc40a2798c79ab9e97cc86"
    },
    {
      sign: "@::tt;;@6ccf78fca7ae7e9197f4f7bee43c091b@",
      file: "109.gif",
      code: "/::'(",
      title: "哭",
      reg: /@::tt;;@6ccf78fca7ae7e9197f4f7bee43c091b@/g,
      id: "6ccf78fca7ae7e9197f4f7bee43c091b"
    },
    {
      sign: "@::tt;;@7ade152d7fbb765fcc4892049a1e8968@",
      file: "110.gif",
      code: "/::-|",
      title: "囧",
      reg: /@::tt;;@7ade152d7fbb765fcc4892049a1e8968@/g,
      id: "7ade152d7fbb765fcc4892049a1e8968"
    },
    {
      sign: "@::tt;;@c557456dd4f7edbbe7f008525576b115@",
      file: "111.gif",
      code: "/::@",
      title: "怒",
      reg: /@::tt;;@c557456dd4f7edbbe7f008525576b115@/g,
      id: "c557456dd4f7edbbe7f008525576b115"
    },
    {
      sign: "@::tt;;@823b425ba05d9e2a5622dabef7c06f1a@",
      file: "112.gif",
      code: "/::P",
      title: "调皮",
      reg: /@::tt;;@823b425ba05d9e2a5622dabef7c06f1a@/g,
      id: "823b425ba05d9e2a5622dabef7c06f1a"
    },
    {
      sign: "@::tt;;@1cb4c147d8565bf1c1c59773c99f3fb7@",
      file: "113.gif",
      code: "/::D",
      title: "笑",
      reg: /@::tt;;@1cb4c147d8565bf1c1c59773c99f3fb7@/g,
      id: "1cb4c147d8565bf1c1c59773c99f3fb7"
    },
    {
      sign: "@::tt;;@40f2b9435c51445a7cb997d39f6595b1@",
      file: "114.gif",
      code: "/::O",
      title: "惊讶",
      reg: /@::tt;;@40f2b9435c51445a7cb997d39f6595b1@/g,
      id: "40f2b9435c51445a7cb997d39f6595b1"
    },
    {
      sign: "@::tt;;@cd3b0753e4e83687ee6756388e2375b3@",
      file: "115.gif",
      code: "/::(",
      title: "难过",
      reg: /@::tt;;@cd3b0753e4e83687ee6756388e2375b3@/g,
      id: "cd3b0753e4e83687ee6756388e2375b3"
    },
    {
      sign: "@::tt;;@a8f656fec90f7e095008469adc36d435@",
      file: "116.gif",
      code: "/::+",
      title: "酷",
      reg: /@::tt;;@a8f656fec90f7e095008469adc36d435@/g,
      id: "a8f656fec90f7e095008469adc36d435"
    },
    {
      sign: "@::tt;;@a6b13b7ab7e75ce00952405ac3719079@",
      file: "117.gif",
      code: "/:--b",
      title: "汗",
      reg: /@::tt;;@a6b13b7ab7e75ce00952405ac3719079@/g,
      id: "a6b13b7ab7e75ce00952405ac3719079"
    },
    {
      sign: "@::tt;;@aa456f549ef37198dd834794df369fb5@",
      file: "118.gif",
      code: "/::Q",
      title: "抓狂",
      reg: /@::tt;;@aa456f549ef37198dd834794df369fb5@/g,
      id: "aa456f549ef37198dd834794df369fb5"
    },
    {
      sign: "@::tt;;@aad1c8aed57088087adc91083e2d959e@",
      file: "119.gif",
      code: "/::T",
      title: "吐",
      reg: /@::tt;;@aad1c8aed57088087adc91083e2d959e@/g,
      id: "aad1c8aed57088087adc91083e2d959e"
    },
    {
      sign: "@::tt;;@af20e3336e30e97680d55e7d6970e73a@",
      file: "120.gif",
      code: "/:,@P",
      title: "笑",
      reg: /@::tt;;@af20e3336e30e97680d55e7d6970e73a@/g,
      id: "af20e3336e30e97680d55e7d6970e73a"
    },
    {
      sign: "@::tt;;@5a2b231cd427b824b81c8fe21b7611a7@",
      file: "121.gif",
      code: "/:,@-D",
      title: "快乐",
      reg: /@::tt;;@5a2b231cd427b824b81c8fe21b7611a7@/g,
      id: "5a2b231cd427b824b81c8fe21b7611a7"
    },
    {
      sign: "@::tt;;@134c72ddb7863f00d779dec5f91c2328@",
      file: "122.gif",
      code: "/::d",
      title: "奇",
      reg: /@::tt;;@134c72ddb7863f00d779dec5f91c2328@/g,
      id: "134c72ddb7863f00d779dec5f91c2328"
    },
    {
      sign: "@::tt;;@bb88dbaa22df021e3c2fe60a278e77f7@",
      file: "123.gif",
      code: "/:,@o",
      title: "傲",
      reg: /@::tt;;@bb88dbaa22df021e3c2fe60a278e77f7@/g,
      id: "bb88dbaa22df021e3c2fe60a278e77f7"
    },
    {
      sign: "@::tt;;@bcef0a306a9e8e261a968a6df3184dbf@",
      file: "124.gif",
      code: "/::g",
      title: "饿",
      reg: /@::tt;;@bcef0a306a9e8e261a968a6df3184dbf@/g,
      id: "bcef0a306a9e8e261a968a6df3184dbf"
    },
    {
      sign: "@::tt;;@a969ccfcc3a3d38df58239ad03264580@",
      file: "125.gif",
      code: "/:|-)",
      title: "累",
      reg: /@::tt;;@a969ccfcc3a3d38df58239ad03264580@/g,
      id: "a969ccfcc3a3d38df58239ad03264580"
    },
    {
      sign: "@::tt;;@fb621ae0139922d295053d202e91e0e2@",
      file: "126.gif",
      code: "/::!",
      title: "吓",
      reg: /@::tt;;@fb621ae0139922d295053d202e91e0e2@/g,
      id: "fb621ae0139922d295053d202e91e0e2"
    },
    {
      sign: "@::tt;;@1a6335f67cc1c053b985044087969a2b@",
      file: "127.gif",
      code: "/::L",
      title: "汗",
      reg: /@::tt;;@1a6335f67cc1c053b985044087969a2b@/g,
      id: "1a6335f67cc1c053b985044087969a2b"
    },
    {
      sign: "@::tt;;@4ff0999d86a4027d888f7ed0c9176bd9@",
      file: "128.gif",
      code: "/::>",
      title: "高兴",
      reg: /@::tt;;@4ff0999d86a4027d888f7ed0c9176bd9@/g,
      id: "4ff0999d86a4027d888f7ed0c9176bd9"
    },
    {
      sign: "@::tt;;@17c07d6a3cd57c6654c75728987b93dc@",
      file: "129.gif",
      code: "/::,@",
      title: "闲",
      reg: /@::tt;;@17c07d6a3cd57c6654c75728987b93dc@/g,
      id: "17c07d6a3cd57c6654c75728987b93dc"
    },
    {
      sign: "@::tt;;@b85b57d747a269bb09195ca14bba8d21@",
      file: "130.gif",
      code: "/:,@f",
      title: "努力",
      reg: /@::tt;;@b85b57d747a269bb09195ca14bba8d21@/g,
      id: "b85b57d747a269bb09195ca14bba8d21"
    },
    {
      sign: "@::tt;;@3df9ccfc7ec35fa45e4bdfb5b3babb4a@",
      file: "131.gif",
      code: "/::-S",
      title: "骂",
      reg: /@::tt;;@3df9ccfc7ec35fa45e4bdfb5b3babb4a@/g,
      id: "3df9ccfc7ec35fa45e4bdfb5b3babb4a"
    },
    {
      sign: "@::tt;;@0b5a0d2de31fe977a592a4260143e387@",
      file: "133.gif",
      code: "/:,@x",
      title: "秘密",
      reg: /@::tt;;@0b5a0d2de31fe977a592a4260143e387@/g,
      id: "0b5a0d2de31fe977a592a4260143e387"
    },
    {
      sign: "@::tt;;@462febe1d3f1e5875eacf0c26430bd3f@",
      file: "134.gif",
      code: "/:,@@",
      title: "乱",
      reg: /@::tt;;@462febe1d3f1e5875eacf0c26430bd3f@/g,
      id: "462febe1d3f1e5875eacf0c26430bd3f"
    },
    {
      sign: "@::tt;;@29df5d6d123a472a6232058850630d58@",
      file: "135.gif",
      code: "/::8",
      title: "疯",
      reg: /@::tt;;@29df5d6d123a472a6232058850630d58@/g,
      id: "29df5d6d123a472a6232058850630d58"
    },
    {
      sign: "@::tt;;@0bc574c5ce818a0ce53303e2a845e870@",
      file: "136.gif",
      code: "/:,@!",
      title: "哀",
      reg: /@::tt;;@0bc574c5ce818a0ce53303e2a845e870@/g,
      id: "0bc574c5ce818a0ce53303e2a845e870"
    },
    {
      sign: "@::tt;;@29d7abf636d7b27d2b1e9860c676f837@",
      file: "137.gif",
      code: "/:!!!",
      title: "鬼",
      reg: /@::tt;;@29d7abf636d7b27d2b1e9860c676f837@/g,
      id: "29d7abf636d7b27d2b1e9860c676f837"
    },
    {
      sign: "@::tt;;@48fd3166cf469c4d4ef373b440528970@",
      file: "138.gif",
      code: "/:xx",
      title: "打击",
      reg: /@::tt;;@48fd3166cf469c4d4ef373b440528970@/g,
      id: "48fd3166cf469c4d4ef373b440528970"
    },
    {
      sign: "@::tt;;@355b1fc77e01efe9df1aa7ef79fa795e@",
      file: "139.gif",
      code: "/:bye",
      title: "bye",
      reg: /@::tt;;@355b1fc77e01efe9df1aa7ef79fa795e@/g,
      id: "355b1fc77e01efe9df1aa7ef79fa795e"
    },
    {
      sign: "@::tt;;@f48a8e03a205440524e8771d2af651fc@",
      file: "142.gif",
      code: "/:handclap",
      title: "鼓掌",
      reg: /@::tt;;@f48a8e03a205440524e8771d2af651fc@/g,
      id: "f48a8e03a205440524e8771d2af651fc"
    },
    {
      sign: "@::tt;;@2f79734263557bf9ef9e5735b6e55d9e@",
      file: "145.gif",
      code: "/:<@",
      title: "什么",
      reg: /@::tt;;@2f79734263557bf9ef9e5735b6e55d9e@/g,
      id: "2f79734263557bf9ef9e5735b6e55d9e"
    },
    {
      sign: "@::tt;;@ba9de0195f8c074887fd42ff40ed7fc4@",
      file: "147.gif",
      code: "/::-O",
      title: "累",
      reg: /@::tt;;@ba9de0195f8c074887fd42ff40ed7fc4@/g,
      id: "ba9de0195f8c074887fd42ff40ed7fc4"
    },
    {
      sign: "@::tt;;@eaf33fcf7ca79fd880dc452935e56b5d@",
      file: "153.gif",
      code: "/:@x",
      title: "吓",
      reg: /@::tt;;@eaf33fcf7ca79fd880dc452935e56b5d@/g,
      id: "eaf33fcf7ca79fd880dc452935e56b5d"
    },
    {
      sign: "@::tt;;@029d557f8df103f1e7c01756edd76925@",
      file: "155.gif",
      code: "/:pd",
      title: "刀",
      reg: /@::tt;;@029d557f8df103f1e7c01756edd76925@/g,
      id: "029d557f8df103f1e7c01756edd76925"
    },
    {
      sign: "@::tt;;@d951791a7736204ba05800effe1add00@",
      file: "156.gif",
      code: "/:<W>",
      title: "水果",
      reg: /@::tt;;@d951791a7736204ba05800effe1add00@/g,
      id: "d951791a7736204ba05800effe1add00"
    },
    {
      sign: "@::tt;;@0dce1f683af61ade7464712af3d327b3@",
      file: "157.gif",
      code: "/:beer",
      title: "酒",
      reg: /@::tt;;@0dce1f683af61ade7464712af3d327b3@/g,
      id: "0dce1f683af61ade7464712af3d327b3"
    },
    {
      sign: "@::tt;;@aef9805cdbaacdd52d57f02a9d868c2e@",
      file: "158.gif",
      code: "/:basketb",
      title: "篮球",
      reg: /@::tt;;@aef9805cdbaacdd52d57f02a9d868c2e@/g,
      id: "aef9805cdbaacdd52d57f02a9d868c2e"
    },
    {
      sign: "@::tt;;@47fe0e89215badee7b4669b0e5d3876e@",
      file: "159.gif",
      code: "/:oo",
      title: "乒乓",
      reg: /@::tt;;@47fe0e89215badee7b4669b0e5d3876e@/g,
      id: "47fe0e89215badee7b4669b0e5d3876e"
    },
    {
      sign: "@::tt;;@fff800a15c2cfbce7fea77afa302d331@",
      file: "195.gif",
      code: "/:circle",
      title: "跳舞",
      reg: /@::tt;;@fff800a15c2cfbce7fea77afa302d331@/g,
      id: "fff800a15c2cfbce7fea77afa302d331"
    },
    {
      sign: "@::tt;;@21fbc6afc1969b206ca5485de3aa1bd7@",
      file: "160.gif",
      code: "/:coffee",
      title: "咖啡",
      reg: /@::tt;;@21fbc6afc1969b206ca5485de3aa1bd7@/g,
      id: "21fbc6afc1969b206ca5485de3aa1bd7"
    }
  ],
}
const mutations = {
  setSystemFileIcon(state, value) {
    state.systemFileIcon = value;
  },
  showImgWindow(state, value) {
    state.imgWindow.showImgWindow = value.showImgWindow;
    if (!value.showImgWindow) {
      state.imgWindow.src = null;
    } else {
      state.imgWindow.src = value.src;
      if (value.width) {
        state.imgWindow.width = value.width;
      }
      if (value.height) {
        state.imgWindow.height = value.height;
      }
    }
  },
  setNetwork(state, value) {
    state.network = value;
  },
  setWindowWidth(state, value) {
    state.windowWidth = value;
  },
  setwindowHeight(state, value) {
    state.windowHeight = value;
  },
  // 获取搜索值
  search(state, value) {
    state.searchText = value
  },
  setHeadMenu(state, value) {
    state.headMenu = value;
  }
}

const actions = {
  setSystemFileIcon: ({
    commit
  }, value) => {
    commit('setSystemFileIcon', value)
  },
  search: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  setNetwork: ({
    commit
  }, value) => {
    setTimeout(() => {
      commit('search', value)
    }, 100)
  },
  showImgWindow: ({
    commit
  }, value) => {
    commit('showImgWindow', value)
  },
}
const getters = {
  getHeadMenuInfo(state, params, rootState) {
    let friend = rootState.friend.friendlist.find(friend => friend.username === state.headMenu.username);
    return friend;
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