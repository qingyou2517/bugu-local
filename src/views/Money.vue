<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="wrapper">
      <Notes field-name="备注："
             placeholder="可以在这里输入备注"
             @update:value="onUpdateNotes"/>
    </div>
    <Tags :data-source.sync="tags"
          @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = tagList;
  // Record类型的数组，每一项都是一个Record类型的数据
  recordList: RecordItem[] = recordList;
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '',
    amount: 0
  };

  onUpdateTags(tags: string[]) {
    this.record.tags = tags;
  }

  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    const record2 = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.wrapper{
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>



