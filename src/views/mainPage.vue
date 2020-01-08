<template>
  <div>
    mainPage
    <router-view/>
    <router-view name="other"/>
  </div>
</template>

<script>
  export default {
    name: "mainPage",
    components: {},
    data() {
      return {}
    },
    props: {},
    methods: {},
    mounted() {
    },
    computed: {},
    filters: {},
  }
</script>

<style scoped lang="less">

</style>
