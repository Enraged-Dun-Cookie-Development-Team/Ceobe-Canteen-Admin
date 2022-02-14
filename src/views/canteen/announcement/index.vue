<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="100" />
    </div>
    <div class="editor-content" v-html="content" />
    <img src="https://i2.hdslb.com/bfs/archive/e3dfafb045081803b4032d29d657f35e5f77a235.jpg@200w_125h_1c.webp" alt="">
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>