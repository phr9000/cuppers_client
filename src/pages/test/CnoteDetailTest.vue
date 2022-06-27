<template>
  <!-- edit 할 곳  -->
  <div id="editor" class="editor-container">test</div>
  <div class="btn-box">
    <button class="send-btn" @click="sendCnote()">등록하기</button>
  </div>
  <!-- 에디터 내용을 받을 곳  -->
  <div id="contents"></div>
</template>

<script>
// import { ref } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
const onUploadImage = async (blob, callback) => {
  console.log(blob)
}
export default {
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      previewStyle: 'tab',
      viewer: true,
      hooks: {
        addImageBlobHook: (blob, callback) => {
          this.onUploadImage(blob).then((res) => {
            const path = res.path
            callback(path, 'img')
          })
        }
      }
    })
  },
  methods: {
    //전송하기 눌렀을 때 html을 받아서 저장하면 됨
    sendCnote() {
      console.log(this.editor.getHTML())
    }
  }
}
</script>

<style lang="scss" scope>
// .toastui-editor-mode-switch {
//   display: none !important;
// }
.btn-box {
  padding: 0 10px;
  .send-btn {
    width: 100%;
    cursor: pointer;
  }
}
.editor-container {
  padding: 10px;
}
</style>
