<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="wrapper">
      <Notes field-name="备注："
             placeholder="可以在这里输入备注"
             @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {Tags, Notes, Types, NumberPad},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  // Record类型的数组，每一项都是一个Record类型的数据
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '',
    amount: 0
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
    this.$store.commit('createRecord', this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.wrapper {
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>



