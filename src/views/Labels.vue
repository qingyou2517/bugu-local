<template>
  <Layout>
<!--    <h1 class="bugu">布谷布谷，每日一记</h1>-->
    <div class="tagsWrapper">
      <router-link class="tagItem"
                   v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span class="tag-name">{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>

</template>

<script lang='ts'>
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component({
  components: {Button},
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }


}
</script>

<style lang='scss' scoped>
//.bugu{
//  color: #000000;
//  font-size: 24px;
//}
.tagsWrapper {
  margin-top: 18px;
  background: #f5f5f5;
  font-size: 16px;
  padding-left: 16px;
  height: calc(100vh - 120px - 54px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  > .tagItem {
    background: #ffffff;
    margin-right: 16px;
    padding-left: 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: inset 0 0px 5px -5px rgb(0 0 0 / 25%), inset 0 5px 5px -5px rgb(0 0 0 / 25%);
    .tag-name{
      font-weight: 540;
    }
    svg {
      color: #333;
      margin-right: 16px;
    }
  }
}

.createTag {
  border: none;
  background: #ff898d;
  color: white;
  border-radius: 8px;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}

</style>