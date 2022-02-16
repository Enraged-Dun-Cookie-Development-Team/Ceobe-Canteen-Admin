<template>
  <div>
    <div id="richtext" ref="richtext" @input="change"></div>
  </div>
</template>
<script>
import wangEditor from 'wangeditor'  // 通过npm 下载并引入wangeditor
export default {
  name: 'RichEditor',
  props: ['value'],   // 组件引用时添加v-model指令，所以value属性就存在，他的值为v-model等于号后面的变量，通过props将他传递过来
  methods: {
    initEditor () {
      const editor = new wangEditor(this.$refs.richtext) 
      editor.create()
      editor.txt.html(this.value)  
      this.$watch('value', () => {  
        editor.txt.html(this.value)
      })
    },
    change (e) {
      this.$emit('input', e.target.innerHTML)
    }
  },
  mounted () {
    this.initEditor()
  }
}
</script>
<style>
</style>