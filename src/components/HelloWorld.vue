<template>
  <div class="hello">
    <basic-table
      :table-data="tableData"
      :table-head="tableHead"
      :page="page"
      index
      checkbox
      has-pagination
    >
      <!-- # 等价于 v-slot: -->
      <template #col4="props">
        <el-button size="mini" @click.stop="tableClick(props)">点击</el-button>
      </template>
    </basic-table>
    <el-button @click="doRequest" type="primary" size="mini">点击</el-button>
    <tween-number :value="tweenValue"/>
    <el-date-picker
      v-model="value1"
      type="week"
      format="yyyy 第 WW 周"
      placeholder="选择周"
    @change="getWeek"
    >
    </el-date-picker>
    <router-view/>
  </div>
</template>

<script>
  import basicTable from "./basicTable/basicTable";
  import tweenNumber from "./tweenNumber/tweenNumber";

  export default {
    name: 'HelloWorld',
    components: {
      'basic-table': basicTable,
      'tween-number': tweenNumber,
    },
    data() {
      return {
        value1: '',
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        tableData: [
          {col: "zhenhao", col2: "hasdi", col4: "asdad2", col3: "adasdasd"},
          {col: "zhenhao", col2: "hasdi", col4: "asdad2", col3: "adasdasd"},
          {col: "zhenhao", col2: "hasdi", col4: "asdad2", col3: "adasdasd"},
          {col: "zhenhao", col2: "hasdi", col4: "asdad2", col3: "adasdasd"},
        ],
        tableHead: [
          {label: '列1', prop: 'col', show: true,},
          {label: '列2', prop: 'col2', show: true,},
          {label: '列3', prop: 'col3', show: true,},
          {label: '列4', prop: 'col4', show: true, slot: true},
        ],
        tweenValue:100,
      }
    },
    methods: {
      doRequest() {
          this.tweenValue += 100;
        // this.$axios.post("/getSum", {start: "1", end: "10"}).then((res) => {
        //   console.log('1 - 请求成功');
        // }).catch(err => {
        //   // console.log(err);
        // })
        // this.$axios.post("/getSum", {start: "1", end: "10"}).then((res) => {
        //   console.log('2 - 请求成功');
        // }).catch(err => {
        //   // console.log(err);
        // })
        // setTimeout(() => {
        //   this.$axios.post("/getSum", {start: "1", end: "10"}).then((res) => {
        //     console.log('3 - 请求成功');
        //   }).catch(err => {
        //     // console.log(err);
        //   })
        // }, 3000)
      },
      /* 表格插槽作用域处理 */
      tableClick(props) {
        console.log(props);
      },
      getWeek(){
        console.log(this.value1)
      }
    },
    mounted() {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
