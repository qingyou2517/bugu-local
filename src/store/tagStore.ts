import tagListModel from '@/models/tagListModel';

const tagStore = {
  tagList: tagListModel.fetch(),
  //也可以不用箭头函数，因为箭头函数无this
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },

  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复了');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },

  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },

  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  }
};

export default tagStore;