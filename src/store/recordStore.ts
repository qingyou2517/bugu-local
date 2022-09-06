import recordListModel from '@/models/recordListModel';

const recordStore = {
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.createItem(record),
};

export default recordStore;