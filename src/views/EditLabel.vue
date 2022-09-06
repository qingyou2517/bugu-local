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
             field-name="标签名" placeholder="请输入标签名"/>
    </div>
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
import store from '@/store/index2';

@Component({
  components: {Button, Notes}
})
export default class EditLabel extends Vue {
  tag?: { id: string, name: string } = undefined;

  created() {
    this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string) {
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }
  }

  removeTag() {
    if (this.tag) {
      if(store.removeTag(this.tag.id)){
        this.$router.back()
      }else {
        window.alert('删除失败')
      }
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

.Button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

</style>