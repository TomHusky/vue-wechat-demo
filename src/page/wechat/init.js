import store from '@/store/index.js'
export function initInfo() {
    initFriendList();
    initGroupChatList();
}

export function initSystemInfo() {
    initSystemIcon();
}

function initSystemIcon() {
    if (store.state.system.systemFileIcon != null) {
        return;
    }
    // listSystemIcon().then((res) => {
    //     if (res.code == 0) {
    //         store.commit("system/setSystemFileIcon", res.data);
    //     }
    // })
}

function initFriendList() {
    // listFriendInfo()
    //     .then((res) => {
    //         if (res.code == 0) {
    //             store.commit("friend/addFriendList", res.data);
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     })
}

function initGroupChatList() {
    for (let group of store.state.groupchat.groupChatList) {
        let user = store.getters["user/getUser"];
        user.groupNickname = user.nickname;
        let value = {
            groupNo: group.groupNo,
            user: user
        }
        store.commit("groupchat/groupAddUser", value);
    }
    // listGroupChat()
    //     .then((res) => {
    //         if (res.code == 0) {
    //             store.commit("groupchat/addGroupChatList", res.data);
    //         }
    //     })
}