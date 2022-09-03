<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad @update:value="onUpdateAmount"/>
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes"/>
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
import {Component} from 'vue-property-decorator';

type Record={
  tags:string[],
  notes:string,
  type:string,
  amount:string
}

@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];
  record:Record={
    tags:[],
    notes:'',
    type:'',
    amount:'0'
  }
  onUpdateTags(tags:string[]){
    this.record.tags=tags
  }
  onUpdateNotes(notes:string){
    this.record.notes=notes
  }
  onUpdateAmount(value:string){
    this.record.amount=value
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
</style>



