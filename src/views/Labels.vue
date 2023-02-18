<template>
  <Layout>
    <div class="projectTitle">
      <svg class="icon icon-bird">
        <use xlink:href="#icon-bird"/>
      </svg>
    </div>
    <div class="tagsWrapper">
      <router-link class="tagItem"
                   v-for="tag in tags" :key="tag.id"
                   :to="`/labels/edit/${tag.id}`">
        <span class="tag-name">{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <el-button type="primary" size="medium" class="createTag" @click="createTag">新增<i class="el-icon-edit"></i>
      </el-button>
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
.projectTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
  background: linear-gradient(90deg, rgba(255, 204, 199, 1) 20%, rgba(255, 204, 199, 1) 36%, rgba(255, 163, 158, 1) 60%, rgba(255, 120, 117, 1) 75%);

  > .icon-bird {
    width: 2.5em;
    height: 2.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}


.tagsWrapper {
  margin-top: 18px;
  background: #f5f5f5;
  font-size: 16px;
  padding-left: 16px;
  height: calc(var(--vh, 1vh)*100 - 120px - 48px - 40px - 56px);
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

    .tag-name {
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
  //background: #ff898d;
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