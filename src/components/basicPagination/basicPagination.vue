<template>
  <div class="basicPagination">
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
</template>

<script>
  import pageOption from "../paginationOption"

  export default {
    name: "basicPagination",
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
      /* 分页数据
      *  currentPage: 当前页 默认为 1
      *  pageSize: 当前页大小 默认为 10
      *  total: 总数据条数 默认为0
      *  */
      page: Object,
      background: Boolean,
      small: Boolean,
    },
    methods: {
      handlePaginationChange() {
        this.$emit('paginationChange', this.page)
      }
    },
    mounted() {
    },
    computed: {},
    filters: {},
  }
</script>

<style scoped lang="less">
</style>
