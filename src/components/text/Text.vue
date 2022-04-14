<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="operation">
      <span class="operation-icon">
        <i
          class="icon iconfont icon-emoji"
          ref="emoji"
          @click="showEmojiList"
        ></i>
      </span>
      <span class="operation-icon file-upload">
        <a href="javascript:;" class="icon iconfont icon-img">
          <input
            type="file"
            @change="selectImg($event)"
            ref="selectImg"
            accept="image/png,image/jpeg,image/gif,image/jpg"
          />
        </a>
      </span>
      <span class="operation-icon file-upload">
        <a href="javascript:;" class="icon iconfont icon-file">
          <input type="file" @change="selectFile($event)" ref="selectFile" />
        </a>
      </span>
      <transition name="showbox">
        <div class="emojiBox" v-show="showEmoji">
          <li v-for="item in emojis" :key="item.id">
            <img
              :src="'static/emoji/' + item.file"
              :data="item.code"
              @click="choiceEmoji(item)"
            />
          </li>
        </div>
      </transition>
    </div>
    <div
      id="textarea"
      contenteditable="true"
      ref="text"
      @onpaste="pasteListener($event)"
      @keydown.backspace="backspace($event)"
      @keydown.enter="onkeydown($event)"
      @paste="pasteListener"
    ></div>
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getTimestamp, getFileSizeStr } from "@/libs/tools";
export default {
  data() {
    return {
      reply: "未找到",
      frequency: 0,
      warn: false,
      showEmoji: false,
      file: null,
      emojiReg:
        /\<img lwj=\"\" wx=\"[\s\S]*\" src=\"static\/emoji\/[\s\S]*\.gif\" style=\"vertical-align: middle; width: 24px; height: 24px\" jwl=\"\"\>/g,
      imgReg:
        /\<img cct=\"1\" style=\"max-width: 140px;max-height: 160px;\" id=\"[0-9]{13}\"/g,
      fileReg:
        /\<img cct=\"2\" style=\"width: 250px;border: 1px solid #D0D0D0\" id=\"[0-9]{13}\"/g,
    };
  },
  computed: {
    ...mapState({
      selectChatId: (state) => state.chat.selectChatId,
      emojis: (state) => state.system.emojis,
      systemFileIcon: (state) => state.system.systemFileIcon,
    }),
    ...mapGetters({ selectedChat: "chat/selectedChat" }),
  },
  created() {
    document.addEventListener("click", (e) => {
      if (this.$refs.emoji == null) {
        return;
      }
      if (!this.$refs.emoji.contains(e.target)) {
        if (this.showEmoji) {
          this.showEmoji = false;
        }
      }
    });
  },
  methods: {
    pasteListener(e) {
      let items = e.clipboardData && e.clipboardData.items;
      if (items && items.length) {
        // 检索剪切板items
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            this.showImgText(items[i].getAsFile());
            break;
          } else {
            this.showFileText(items[i].getAsFile());
          }
        }
      }
      e.stopPropagation();
      e.preventDefault();
      let text = "",
        event = e.originalEvent || e;
      if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData("text/plain");
      } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData("Text");
      }
      if (document.queryCommandSupported("insertText")) {
        document.execCommand("insertText", false, text);
      } else {
        document.execCommand("paste", false, text);
      }
    },
    showEmojiList() {
      this.showEmoji = true;
    },
    // 选择表情
    choiceEmoji(item) {
      this.showEmoji = false;
      let textarea = this.$refs.text;
      let content = textarea.innerHTML;
      if (this.emojiNumIsOut(content)) {
        alert("表情数量不允许超过5个");
        return;
      }
      content += item.sign;
      let result = this.replaceEmoji(content);
      textarea.innerHTML = result;
    },
    replaceEmoji(con) {
      if (con.includes("@::tt;;@")) {
        let emojis = this.emojis;
        for (let i = 0; i < emojis.length; i++) {
          con = con.replace(
            emojis[i].reg,
            '<img lwj="" wx="' +
              emojis[i].id +
              '" src="static/emoji/' +
              emojis[i].file +
              '" style="vertical-align: middle; width: 24px; height: 24px" jwl=""/>'
          );
        }
        return con;
      }
      return con;
    },
    // 选中图片
    selectImg(e) {
      let file = e.target.files[0];
      if (file.type.split("/")[0] !== "image") {
        alert("请选择图片！");
        return false;
      }
      this.showImgText(file);
    },
    // 选择文件
    selectFile(e) {
      let file = e.target.files[0];
      this.showFileText(file);
    },
    // 显示文件对应的图片
    showFileText(file) {
      if (file) {
        let size = Math.floor(file.size / 1024);
        if (size > 10 * 1024) {
          alert("请选择10M以内的文件！");
          return false;
        }
        let textarea = this.$refs.text;
        // 声明js的文件流
        let reader = new FileReader();
        //  通过文件流将文件转换成Base64字符串
        reader.readAsDataURL(file);
        //   转换成功后
        let id = getTimestamp();
        reader.onloadend = () => {
          this.getFileHtml(file, (dataURL, fileType, fileSize) => {
            let content =
              '<img cct="2" style="width: 250px;border: 1px solid #D0D0D0" id="' +
              id +
              '" file-type="' +
              fileType +
              '" file-size="' +
              fileSize +
              '"file-name="' +
              file.name +
              '" />&nbsp';
            textarea.innerHTML = content;
            let img = document.getElementById(id);
            img.src = dataURL;
            this.file = file;
          });
        };
      }
    },
    // 根据文件生成对应的图标
    getFileHtml(file, callback) {
      let extension = file.name.substring(
        file.name.lastIndexOf("."),
        file.name.length
      );
      let img = new Image();
      img.crossOrigin = "Anonymous";
      let icon = this.systemFileIcon[extension];
      if (icon == null) {
        img.src = "static/images/file.png";
      } else {
        img.src = icon;
      }
      let canvas = document.createElement("canvas");
      canvas.height = 50;
      canvas.width = 250;
      let ctx = canvas.getContext("2d");
      //要先确保图片完整获取到，这是个异步事件
      img.onload = function () {
        ctx.drawImage(img, 5, 10, 30, 30); //将图片绘制到canvas中
        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";
        ctx.fillText(file.name, 40, 20);
        let fileSize = getFileSizeStr(file.size);
        ctx.fillText(fileSize, 40, 35);
        let dataURL = canvas.toDataURL("image/png");
        callback(dataURL, extension, fileSize); //调用回调函数
        canvas = null;
      };
    },
    showImgText(file) {
      if (file) {
        let size = Math.floor(file.size / 1024);
        if (size > 2 * 1024) {
          alert("请选择2M以内的图片！");
          return false;
        }
        let textarea = this.$refs.text;
        // 声明js的文件流
        let reader = new FileReader();
        //  通过文件流将文件转换成Base64字符串
        reader.readAsDataURL(file);
        //   转换成功后
        let id = getTimestamp();
        reader.onloadend = () => {
          let image = new Image();
          image.onload = function () {
            let width = image.width;
            let height = image.height;
            let content = textarea.innerHTML;
            content =
              '<img cct="1" style="max-width: 140px;max-height: 160px;" id="' +
              id +
              '" c-width="' +
              width +
              '" c-height="' +
              height +
              '" />';
            textarea.innerHTML = content;
            let img = document.getElementById(id);
            img.src = reader.result;
            image = null;
          };
          // 将转换结果赋值给img标签
          image.src = reader.result;
        };
      }
    },
    // 监听回退按键
    backspace(e) {
      let textarea = this.$refs.text;
      if (!this.fileReg.test(textarea.innerHTML)) {
        this.file = null;
        return;
      }
    },
    // 按回车发送信息
    onkeydown(e) {
      if (e.ctrlKey && e.keyCode == 13) {
      } else {
        this.send();
        e.preventDefault();
      }
    },
    // 点击发送按钮发送信息
    send() {
      let textarea = this.$refs.text;
      let text = textarea.innerHTML;
      let content = "";
      if (this.imgReg.test(text)) {
        content = this.replaceImgToMsg(text);
        this.sendMsg(content, 2);
        textarea.innerHTML = "";
        return;
      }
      if (this.fileReg.test(text)) {
        content = this.replaceFileToMsg(text);
        this.sendMsg(content, 3);
        textarea.innerHTML = "";
        return;
      }

      if (this.emojiNumIsOut(text)) {
        alert("表情数量不允许超过5个");
        return;
      }
      // 替换表情
      content = this.replaceEmojiToCode(text);
      if (content.length < 1) {
        this.warn = true;
        setTimeout(() => {
          this.warn = false;
        }, 1000);
        return;
      }
      this.sendMsg(content, 1);
      textarea.innerHTML = "";
    },
    sendMsg(content, type) {
      if (this.selectedChat.info.name === "机器人") {
        this.$http
          .get(`https://zhaoplus.com/api/AI?search=${content}`)
          .then((res) => {
            this.reply = res.data.result.text;
            if (content.includes("/:")) {
              this.reply = "嘻嘻";
            }
            let msg = {
              content: content,
              reply: this.reply,
            };
            this.$store.dispatch("chat/sendMessage", msg);
          });
      } else {
        let msg = {
          content: content,
          type: type,
        };
        this.$store.dispatch("chat/sendMessage", msg);
      }
    },
    // 将表情替换成code
    replaceEmojiToCode(content) {
      if (content.includes("<img lwj")) {
        let _this = this;
        while (content.includes("<img lwj")) {
          let currentId = "";
          let emojiGif = "";
          let sign = "";
          content.replace(this.emojiReg, function (match, index, originText) {
            let id = content.substring(index + 16, index + 16 + 32);
            currentId = id;
            _this.emojis
              .filter((item) => item.id === id)
              .map((emoji) => {
                emojiGif = emoji.file;
                sign = emoji.sign;
              });
          });
          let signReg = this.getEmojiSignReg(currentId, emojiGif);
          content = content.replace(signReg, sign);
        }
        // content = content.replace(reg, sign);
        return content;
      }
      return content;
    },
    // 将图片替换成消息内容
    replaceImgToMsg(content) {
      let currentId = "";
      content.replace(this.imgReg, function (match, index, originText) {
        let id = content.substring(index + 61, index + 61 + 13);
        currentId = id;
      });
      if (currentId !== "") {
        let result = {};
        let img = document.getElementById(currentId);
        result.width = parseInt(img.getAttribute("c-width"));
        result.height = parseInt(img.getAttribute("c-height"));
        result.src = img.src;
        // 将转换结果赋值给img标签
        content = result;
      }
      return content;
    },
    // 将文件替换成消息内容
    replaceFileToMsg(content) {
      let currentId = "";
      content.replace(this.fileReg, function (match, index, originText) {
        let id = content.substring(index + 64, index + 64 + 13);
        currentId = id;
      });
      if (currentId !== "") {
        let result = {};
        let img = document.getElementById(currentId);
        result.fileName = img.getAttribute("file-name");
        result.fileType = img.getAttribute("file-type");
        result.fileSize = img.getAttribute("file-size");
        result.src = this.file;
        // 将转换结果赋值给img标签
        content = result;
      }
      return content;
    },
    getEmojiSignReg(id, emojiGif) {
      let emoji = emojiGif.substring(0, emojiGif.indexOf("."));
      return new RegExp(
        '\\<img lwj=\\"\\" wx=\\"' +
          id +
          '\\" src=\\"static\\/emoji\\/' +
          emoji +
          '\\.gif\\" style=\\"vertical-align: middle; width: 24px; height: 24px\\" jwl=\\"\\"\\>',
        "g"
      );
    },
    emojiNumIsOut(content) {
      let ref = /\<img lwj=\"\" wx=\"[a-z0-9]{32}\"/g;
      let emoji = content.match(ref);
      if (emoji && emoji.length >= 5) {
        return true;
      }
      return false;
    },
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.$refs.text.focus();
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectChatId() {
      setTimeout(() => {
        this.$refs.text.focus();
      }, 0);
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === "") {
        if (this.frequency === 0) {
          this.warn = true;
          this.frequency++;
          setTimeout(() => {
            this.warn = false;
          }, 1000);
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
#textarea {
  box-sizing: border-box;
  padding-left: 30px;
  height: 110px;
  width: 690px;
  border: none;
  outline: none;
  overflow-y: scroll;
  font-family: 'Micrsofot Yahei';
  resize: none;

  .img-view {
    width: 200px;
  }
}

.text {
  position: relative;
  background: #fff;

  .operation {
    width: 100%;
    height: 40px;
    font-size: 12px;
    padding: 0 30px;
    box-sizing: border-box;
    color: #7c7c7c;

    .operation-icon {
      line-height: 40px;

      .icon-emoji {
        font-size: 18px;
      }

      .icon {
        font-size: 18px;
        color: #4C4C4C;
        cursor: pointer !important;
        margin-right: 15px;

        &:hover {
          color: #1aad19 !important;
        }
      }
    }

    .file-upload {
      overflow: hidden;

      .icon {
        position: relative;
        text-decoration: none;
        line-height: 20px;
        font-size: 19px;
        cursor: pointer;
        overflow: hidden;

        input {
          position: absolute;
          width: 100%;
          height: 20px;
          right: 0;
          top: 0;
          opacity: 0;
          // 解决cursor: pointer失效
          font-size: 0;
          cursor: pointer !important;
        }
      }
    }

    .emojiBox {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      top: -210px;
      left: -100px;
      width: 300px;
      height: 200px;
      padding: 5px;
      background-color: #fff;
      border: 1px solid #d1d1d1;
      border-radius: 2px;
      box-shadow: 0 1px 2px 1px #d1d1d1;

      &.showbox-enter-active, &.showbox-leave-active {
        transition: all 0.5s;
      }

      &.showbox-enter, &.showbox-leave-active {
        opacity: 0;
      }

      img {
        cursor: pointer;
      }
    }
  }

  .send {
    position: absolute;
    cursor: pointer;
    bottom: 10px;
    right: 30px;
    width: 75px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background: #f5f5f5;
    font-size: 14px;
    color: #7c7c7c;

    &:hover {
      background: rgb(18, 150, 17);
      color: #fff;
    }
  }

  .warn {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 110px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    box-shadow: 0 1px 5px 1px #bdbdbd;

    &.appear-enter-active, &.appear-leave-active {
      transition: all 1s;
    }

    &.appear-enter, &.appear-leave-active {
      opacity: 0;
    }

    &:before {
      content: ' ';
      position: absolute;
      top: 100%;
      right: 20px;
      border: 7px solid transparent;
      border-top-color: #fff;
      filter: drop-shadow(1px 3px 2px #bdbdbd);
    }
  }
}
</style>
