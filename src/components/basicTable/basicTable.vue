<!-- 基本表格组件 -->
<template>
  <div class="basicTable">
    <el-table
      v-if="showTable"
      :height="height"
      :data="tableData"
      :stripe="stripe"
      :tooltip-effect="tooltipEffect"
      :empty-text="emptyText"
      :row-key="rowKey"
      size="small"
      ref="basicTable"
      style="width:100%"
      v-cloak
      highlight-current-row
      :cell-class-name="cellClassNameFilter"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="checkbox"
        type="selection"
        :width="checkboxWidth"
        align="center"
        :reserve-selection="reserveSelection"
      />
      <el-table-column
        v-if="index"
        type="index"
        :label="indexLabel"
        :width="indexWidth"
        align="center"
      />
      <el-table-column
        v-for="item in tableHead"
        :key="autoColumnKey?Math.random().toString():item.label"
        v-if="item.show || true"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :min-width="item.minWidth"
        :class-name="item.className"
        :align="item.contentAlign || 'center'"
        :header-align="item.headerAlign || 'center'"
        show-overflow-tooltip
      >
        <template v-if="item.slot" v-slot="scope" >
          <slot :name="item.prop" :index="scope.$index" :row="scope.row">
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-if="hasPagination" class="">
      <el-pagination
        :current-page.sync="page.currentPage"
        :page-size.sync="page.pageSize"
        :total="page.total"
        :page-count="pageCount"
        :page-sizes="pageSizes"
        :background="background"
        :small="small"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handlePaginationChange"
        @current-change="handlePaginationChange"
      />
    </div>
  </div>
</template>

<script>
  import pageOption from "../paginationOption"

  export default {
    name: 'basicTable',
    components: {},
    data() {
      return {
        /*　分页选项个数　*/
        pageCount: pageOption.pageCount,
        /* 分页大小 */
        pageSizes: pageOption.pageSizes,
      }
    },
    props: {
      /*------- 表格 start --------*/
      /* 表头
      *  数组item实例
      *  {
      *   label:表格列名,
      *   show:是否显示列
      *   prop:列参数
      *   width:列宽度
      *   min-width:最小宽度
      *   className:列样式名
      *   contentAlign:列内容对齐方式
      *   headerAlign:列头部对齐方式
      *  }
      *  */
      tableHead: {
        type: Array,
        required: true,
        default: _ => []
      },
      /* 表数据 */
      tableData: {
        type: Array,
        required: true,
        default: _ => []
      },
      /* 显示表格 */
      showTable: {
        type: Boolean,
        default: true,
      },
      /* 是否有斑马纹 */
      stripe: {
        type: Boolean,
        default: true,
      },
      /* 是否有边框 */
      border: {
        type: Boolean,
        default: true,
      },
      /* 数据缺省文字 */
      emptyText: {
        type: String,
        default: '暂无数据',
      },
      /* 是否有单选框 */
      checkbox: {
        type: Boolean,
        default: false,
      },
      /* 单选框格子的宽度 */
      checkboxWidth: [Number | String],
      /* 是否有文本溢出提示框 */
      tooltipEffect: {
        type: String,
        default: 'light',
        validator: function (prop) {
          return ['dark', 'light'].indexOf(prop) !== -1;
        }
      },
      /* rowKey 用于优化表数据,在type=selection回显时,必须使用 */
      rowKey: [String, Function],
      /* 单选框分页切换回显
      *  需要和row-key结合使用
      *  */
      reserveSelection: {
        type: Boolean,
        default: false,
      },
      /* 表格高度 */
      height: [String, Number],
      /* 是否有序号 */
      index: {
        type: Boolean,
        default: false,
      },
      /* 序号列宽度 */
      indexWidth: [String, Number],
      /* 序列列列名 */
      indexLabel: {
        type: String,
        default: "序号"
      },
      /* 是否有分页 */
      hasPagination: {
        type: Boolean,
        default: false,
      },
      /* 随机生成key
      *  代表每次数据更新都会刷新表格,表格会闪烁
      *  */
      autoColumnKey: Boolean,
      /* 单元格className过滤方法 */
      cellClassName: Function,
      /*------- 表格 end --------*/

      /*------- 分页 start --------*/
      /* 分页数据
      *  currentPage: 当前页 默认为 1
      *  pageSize: 当前页大小 默认为 10
      *  total: 总数据条数 默认为0
      *  */
      page: Object,
      background: Boolean,
      small: Boolean,
      /*------- 分页 end --------*/
    },
    methods: {
      /* 表格行单击 */
      handleRowClick(row) {//{row, column, event}
        this.$refs['basicTable'].toggleRowSelection(row)
      },
      /* 表格行单击, 向父组件返回选中的selection*/
      handleSelectionChange(selection) {
        this.$emit("handleSelectionChange", selection)
      },
      /* 单元格样式过滤方法 */
      cellClassNameFilter({row, column, rowIndex}) {
        if (this.cellClassName) {
          return this.cellClassName({row, column, rowIndex})
        }
      },
      /*　分页页码改变事件 */
      /*　分页大小改变事件　*/
      handlePaginationChange() {
        this.$emit('paginationChange', this.page)
      },
    }
  }
</script>

<style scoped lang="less">
</style>
