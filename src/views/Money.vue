<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>

    <div class="notes" >
      <Notes field-name="备注："
             placeholder="可以在这里输入备注"
             :value.sync="record.notes"/>
    </div>
    <div class="createdAt" >
      <Notes field-name="日期："
             type="date"
             placeholder="可以在这里输入日期"
             :value.sync="record.createdAt"/>
    </div>
    <Tags @update:value="record.tags = $event" />
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type" />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Tags, Notes, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  // Record类型的数组，每一项都是一个Record类型的数据
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0,
    createdAt:new Date().toISOString()
  };

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return this.$message({
        type: 'warning',
        message: '请至少选择一个标签',
        duration: 2000,
        // 自定义消息弹出框的标签类名
        customClass: '.el-message',
      });
    }
    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      this.$message({
        type: 'success',
        message: '已保存',
        duration: 2000,
        // 自定义消息弹出框的标签类名
        customClass: '.el-message',
      });
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  //padding-bottom: 12px;
  background: #ffffff;
}
.createdAt{
  //padding-top: 12px;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>



