<template>
  <Layout class-prefix="layout" :style="{height:h+'px'}">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>

    <div class="notes">
      <Notes field-name="备注："
             placeholder="可以在这里输入备注，至多10个字符"
             :value.sync="record.notes"/>
    </div>
    <div class="date-wrapper">
      <div class="date-box">
        <div class="block date">
          <el-date-picker
              v-model="record.createdAt"
              type="date"
              placeholder="选择日期"
              :editable="false"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <Tags @update:value="record.tags = $event"/>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
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
 h = document.body.clientHeight;

  data() {
    return {
      pickerOptions: {
        disabledDate(time: any) {
          return time.getTime() > Date.now();
        },
      },
    };
  }

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
    createdAt: new Date().toISOString()
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
.date-wrapper {
  //order: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
  background: #ffccc7;

  > .date-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    background: var(--bg-color-white);

    > .date {
      width: 100%;
      margin: 10px 16px 10px;

      .el-date-editor.el-input {
        width: 100%;
      }
    }
  }
}

::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  //padding-bottom: 12px;
  background: #ffffff;
}

.createdAt {
  //padding-top: 12px;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>



