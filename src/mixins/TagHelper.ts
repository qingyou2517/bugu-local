import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
  //tag push 进tags,并保存
  createTag() {
    const name = window.prompt('请输入标签名：');
    if (!name) {
      window.alert('标签名不能为空！');
      return;
    }
    this.$store.commit('createTag', name);
  }
}

export default TagHelper;