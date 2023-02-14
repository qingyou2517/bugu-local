import Vue from 'vue';
import Component from 'vue-class-component';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
  //tag push 进tags,并保存
  createTag() {
    this.$prompt('请输入标签名', '新增标签', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^.{1,4}$/,
      inputPlaceholder: '请输入1到4个字符',
      inputErrorMessage: '标签名不能为空，且不超过4个字符',
    }).then((name) => {
      this.$message({
        type: 'success',
        message: '创建成功',
        duration: 2000,
        // 自定义消息弹出框的标签类名
        customClass: '.el-message',
      });
      // console.log(name);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if ('value' in name) {this.$store.commit('createTag', name.value);}
      if (this.$store.state.createTagError) {
        this.$message({
          type: 'error',
          message: map[this.$store.state.createTagError.message] || '未知错误',
          duration: 2000,
        });
      }
    }).catch((err) => { console.log(err)});
  }
}

export default TagHelper;