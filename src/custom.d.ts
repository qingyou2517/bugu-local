type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,   //基本数据类型
  createdAt?: Date    //类、构造函数均属于object类型，问号表示允许没有它
}

type Tag = {
  id: string
  name: string
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  save: () => void
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  create: (name: string) => 'success' | 'duplicated'
}

interface Window {
  tagList: Tag[];
}