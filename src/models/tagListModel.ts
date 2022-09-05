const localStorageKeyName = 'tagList';
type Tag = {
  id: string
  name: string
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  create: (name: string) => 'success' | 'duplicated'
}

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  create(name: string) {
    //this.data=[{id:'1',name:'1'},{id:'2',name:'2'}...]
    //截取this.data里的name组成names数组
    const names=this.data.map(item=>item.name)
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    //id为以后服务器生成id做准备，以后再更改id
    this.data.push({id:name,name:name});
    this.save();
    return 'success';
  }
};

export default tagListModel;