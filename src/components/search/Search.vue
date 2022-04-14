<!-- 搜索框 -->
<template>
  <div class="search-wrapper">
    <div class="search">
      <i
        class="icon iconfont icon-search"
        v-bind:class="{ 'icon-search-color': searchIconColor }"
      ></i>
      <input
        type="text"
        class="searchInput"
        @focus="inputFocus"
        @blur="inputBlur"
        v-model="content"
        @keyup="change"
        :placeholder="placeholder"
      />
      <div
        class="searchInput-delete"
        v-show="showDelete"
        @mousedown="del"
      ></div>
    </div>
    <button class="btn" v-if="showBtn" @click="search">搜索</button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索",
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    change() {
      this.$emit("change", this.content);
    },
    search(){
      this.$emit("search", this.content);
    },
    inputFocus(e) {
      e.target.placeholder = "";
      this.searchIconColor = true;
      this.showDelete = true;
    },
    inputBlur(e) {
      e.target.placeholder = "搜索";
      this.searchIconColor = false;
      this.showDelete = false;
    },
    del(e) {
      // 即可阻止点击按钮时触发input失去焦点事件
      // e.preventDefault();
      this.content = "";
      this.change();
    },
  },
  data() {
    return {
      content: "",
      active: false,
      searchIconColor: false,
      showDelete: false,
    };
  },
  computed: {
    // noText() {
    //   if (this.search === "") return true;
    //   return false;
    // },
    // haveText() {
    //   if (this.search === "") return false;
    //   return true;
    // },
  },
};
</script>

<style lang="stylus" scoped>
.search-wrapper {
  padding: 22px 12px 12px 12px;
  background-color: #f7f7f7;
  display: flex;
}

.btn{
  margin-left: 30px;
  width: 50px;
  background-color: #1AAD19;
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
}

.search {
  position: relative;
  display: flex;
  box-sizing: border-box;
  height: 26px;
  width: 100%;
  background-color: #E2E2E2;
  border: 1px solid #E2E2E2;
  border-radius: 5px;

  .searchInput {
    flex: 1;
    font-size: 12px;
    padding: 6px;
    background-color: #E2E2E2;
    outline: none;

    &:focus {
      background-color: #f7f7f7;
    }
  }

  .icon-search {
    display: inline-block;
    width: 24px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    transform: rotateY(180deg);
  }

  .icon-search-color {
    background-color: #f7f7f7;
  }

  .searchInput-delete {
    display: block;
    position: absolute;
    outline: none;
    top: 0;
    right: 0;
    width: 24px;
    height: 100%;
    background-image: url('delete.png');
    background-size: 26px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}

</style>
