<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      if (this.selectedTags.length >= 1) {
        this.selectedTags = [];
      }
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang='scss' scoped>
.tags {
  background: #fff;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;
    margin-right: -16px;
    height: calc(100vh - 50px - 80px - 58px - 192px - 54px - 72px);
    overflow-y: auto;
    //&::-webkit-scrollbar {
    //  display: none;
    //}

    > li {
      $h: 28px;
      height: $h;
      display: flex;
      justify-content: center;
      width: 72px;
      background: #fef0eb;
      margin-right: 17px;
      margin-top: 8px;
      border-radius: $h/2;
      line-height: $h;
      text-align: center;

      &.selected {
        background: orange;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #f60;
      padding: 0 3px;
    }
  }
}
</style>