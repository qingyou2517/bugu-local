<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <div class="ul-wrapper" :style="{height:h+'px'}">
      <ul class="current">
        <li v-for="tag in tagList" :key="tag.id"
            :class="{selected: selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">
          <div class="tagBox">
            {{ tag.name }}
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];
  h = document.body.clientHeight - 50 - 44 - 40 - 58 - 192 - 54 - 72;

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

  > .ul-wrapper {
    //height: calc(100vh - 50px - 44px - 40px - 58px - 192px - 54px - 72px);

    > .current {
      display: flex;
      flex-wrap: wrap;
      //多行flex布局
      align-content: flex-start;
      margin-right: -16px;
      height: 100%;
      overflow-y: auto;
      //&::-webkit-scrollbar {
      //  display: none;
      //}

      //响应式平均布局：
      //让 li 宽度占父容器的 25%，这样无论怎么拉伸，一行始终4个
      //在 li 里面再放 tag，tag宽度占满 li 的宽度，tag设置 margin-right 保持 tag 间距
      //li 的父容器设 负margin，值等于tag的margin-right
      > li {
        $h: 32px;
        height: $h;
        display: flex;
        justify-content: center;
        width: 25%;
        line-height: $h;
        text-align: center;
        margin-top: 8px;

        > .tagBox {
          width: 100%;
          background: #fef0eb;
          margin-right: 16px;
          white-space: nowrap;
          border-radius: $h/2;
          display: flex;
          justify-content: center;
          align-items: center;


        }

        &.selected .tagBox {
          background: lightpink;
        }
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