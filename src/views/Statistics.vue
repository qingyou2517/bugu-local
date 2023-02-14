<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <span class="introduction">最近30天</span>
    <div class="lineChart-wrapper chart-box" ref="chartWrapper">
      <Chart class="lineChart" :options="lineChartOptions"/>
    </div>
    <span class="introduction">构成</span>
    <div class="pieChart-wrapper chart-box">
      <Chart class="pieChart" :options="pieChartOption"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';

@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  mounted() {
    //让横向滚动条默认跑最右边，从而显示最新几天的数据
    if (this.$refs.chartWrapper) {
      const div = this.$refs.chartWrapper as HTMLDivElement;
      div.scrollLeft = div.scrollWidth;
    }
  }

  // 获取折线图最近一个月的支出数据
  get lineKeyValueList() {
    // console.log(this.groupedList);
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      // this.recordList=[{createdAt:'2022-09-01',amount:1.00,...},{},]
      // this.groupedList=[{title:'2022-09-01',items:[{},{},],total:1.00,...},{},]
      // array=[{key:'2022-09-01',value:1.00},{},]

      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');

      const found = _.find(this.groupedList, {title: dateString});

      array.push({key: dateString, value: found ? found.total : 0});
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    // console.log(array);
    // console.log(this.recordList.map(r => _.pick(r, 'createdAt', 'amount')));
    return array;
  }

  // 获取饼图最近一个月的支出数据
  get pieKeyValueList() {
    // 用来存放标签以及对应的金额的哈希表和数组
    const map = new Map();
    const array: { key: string, value: number }[] = [];
    const today = new Date();

    // 到今天为止的最近30天
    for (let i = 0; i <= 1; i++) {
      // 格式化时间字符串，以便根据 时间字符串 搜索该天对应的支出数据：found
      const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');

      const found = _.find(this.groupedList, {title: dateString});

      // 如果这一天的收/支金额不为空，那么就统计每个标签对应的收/支
      if (found) {
        for (let j = 0; j <= found.items.length; j++) {
          if (found.items[j]) {
            //map.set(key,value) 构造 {key => value} 的键值对
            map.set(found.items[j].tags[0].name, found.items[j].amount);
          }
        }
      }
    }
    // console.log('map', map);

    // // 遍历哈希表生成数组
    map.forEach((key: string, value: number) => array.push({key, value}));
    // console.log('array', array);
    return array;
  }

  //折线图配置项
  get lineChartOptions() {
    const dates = this.lineKeyValueList.map(item => item.key);
    const values = this.lineKeyValueList.map(item => item.value);
    // console.log(values);
    return {
      //消除echarts的四周padding(来自谷歌：echarts padding解答，事实上官方文档里echarts的绘图区域是grid)
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 30
      },
      xAxis: {
        axisTick: {
          show: true,
          alignWithLabel: true
        },
        axisLabel: {
          // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
          formatter: function (value: string, index: number) {
            // 格式化成月-日
            return value.substring(5);
          }
        },
        type: 'category',
        data: dates
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbolSize: 12,
        data: values,
        type: 'line'
      }],
      tooltip: {show: true}
    };
  }

  // 饼图配置选项
  get pieChartOption() {
    const array = this.pieKeyValueList;
    // console.log('array',array);
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: array,
        }
      ]
    };
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
::v-deep {
  .type-tabs-item {
    background: #ff898d;
    color: #ffffff;
    //border: 1px solid red;
    &.selected {
      color: lightskyblue;
      border-bottom: 3px solid #000;

      &::after {
        display: none;
        //border-bottom: 2px solid #000;
      }
    }
  }
}

.introduction {
  font-weight: 550;
  font-size: 20px;
  display: inline-block;
  padding: 20px 16px;
}

.lineChart {
  //希望一个屏幕展示7天数据，那30天需要 4+（2/7）个屏幕，约430%
  width: 430%;

  &-wrapper {
    //横向滚动
    overflow: auto;
    //google: css hide scrollbar
    //隐藏滚动条，PC端需要方向键滚动
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.chart-box{
  padding: 0px 5px;
  background: #fff;
}


</style>