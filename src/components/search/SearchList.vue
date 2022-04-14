<!-- 搜索框 -->
<template>
  <div class="search-list-wrapper">
    <div class="search-list">
      <i
        class="icon iconfont icon-search"
        v-bind:class="{ 'icon-search-color': searchIconColor }"
      ></i>
      <input
        type="text"
        class="searchInput"
        @focus="inputFocus"
        @blur="inputBlur"
        v-model="search"
        @keyup="change"
        :placeholder="placeholder"
      />
      <div
        class="searchInput-delete"
        v-show="showDelete"
        @mousedown="del"
      ></div>
    </div>
    <div class="add" @click="$emit('add')">
      <i class="icon iconfont icon-add"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeholder"],
  methods: {
    change() {
      this.$store.dispatch("system/search", this.search);
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
      this.search = "";
      this.change();
    },
  },
  data() {
    return {
      search: "",
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
.search-list-wrapper {
  padding: 22px 12px 12px 12px;
  background-color: #f7f7f7;
  display: flex;
}

.add {
  margin-left: 10px;
  background-color: #E2E2E2;
  padding: 0 6px;
  border-radius: 5px;
  cursor: pointer;

  i {
    display: inline-block;
    font-size: 12px !important;
    font-weight: bold;
    line-height: 26px;
    -webkit-transform: scale(0.8);
  }
}

.search-list {
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
