<template>
  <Layout>
    <div class="tagsList">
      <router-link class="tagItem"
                   v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>

</template>

<script lang='ts'>

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component({
  components: {Button},
})
export default class Labels extends mixins(TagHelper) {
  get tagList() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }


}
</script>

<style lang='scss' scoped>
.tagsList {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tagItem {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #333;
      margin-right: 16px;
    }
  }
}

.createTag {
  border: none;
  background: #767676;
  color: white;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}

</style>