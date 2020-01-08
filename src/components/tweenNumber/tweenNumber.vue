<template>
    <span>
      {{tweeningValue}}
    </span>
</template>

<script>
  import TWEEN from '@tweenjs/tween.js'

  export default {
    name: "tweenNumber",
    components: {},
    data() {
      return {
        tweeningValue: 0
      }
    },
    props: {
      /** 不要不见的value
       * @description 只能是整数
       *  */
      value: {
        type: Number,
        required: true,
      }
    },
    methods: {
      tween: function (startValue, endValue) {
        function animate() {
          // 调用更新
          if (TWEEN.update()) {
            //平滑
            requestAnimationFrame(animate)
          }
        }

        /* Tween 初始化
        *  to 结束值
        *  onUpdate 监听数值改变,使用回调方法获取每次更新的值 ps:toFixed只能对Number使用,但是返回值是string 要转一下
        *  start 启动补间
        *  */
        new TWEEN.Tween({value: startValue})
          .to({value: endValue}, 1500)
          .easing(TWEEN.Easing.Linear.None)
          .onUpdate((cb_Value) => {
            this.tweeningValue = cb_Value.value.toFixed(0) * 1;
          }).start();

        animate()
      }
    },
    mounted() {
      this.tween(0, this.value)
    },
    computed: {},
    filters: {},
    watch: {
      value: function (newValue, oldValue) {
        this.tween(oldValue, newValue)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
