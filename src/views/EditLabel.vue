<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"
            @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>
    <div class="Notes-wrapper">
      <Notes :value="tag.name"
             @update:value="updateTag"
             field-name="标签名" placeholder="请输入1到4个字符"/>
    </div>
    <span class="reminder">亲，标签名必须是1到4个字符哦</span>
    <div class="Button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Notes},
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      this.$store.commit('updateTag', {id: this.tag.id, name: name});
    }
  }

  removeTag() {
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang='scss' scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
    color: #000;
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.Notes-wrapper {
  background: #fff;
  margin-top: 8px;
}

.reminder{
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 10px;
  color: #ff6600;
}

.Button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

</style>