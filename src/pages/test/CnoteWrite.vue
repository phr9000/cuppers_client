<template>
  <!-- edit 할 곳  -->
  <q-page class="editor-container">
    <div class="btn-box">
      <span class="send-btn" @click="sendCnote()">글 로스팅하기</span>
    </div>
    <div class="title-container">
      <div class="title-container-inner">제목을 입력해주세요</div>
    </div>
    <div id="editor" class="editor-">
      <!-- 에디터 내용을 받을 곳  -->
      <div id="contents" @change="onChange()"></div>
    </div>
  </q-page>
</template>

<script>
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'

import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
// const onUploadImage = async (blob, callback) => {
//   console.log(blob)
// }

export default {
  name: 'App',
  components: {},
  data() {
    return {
      editor: null,
      images: []
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
      language: 'ko-KR',
      hideModeSwitch: true,
      plugins: [colorSyntax],
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'indent', 'outdent'],
        ['image'],
        ['scrollSync']
      ],
      hooks: {
        addImageBlobHook: async (blob, callback) => {
          console.log(blob)
          const formData = new FormData()
          const url = 'http://localhost:3000/static/images/'
          formData.append('image', blob)
          await this.$axios
            .post('http://localhost:3000/api/upload/image', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((r) => {
              console.log(r)
              console.log(r.data.path)
              this.images.push(r.data.path)
              callback(url + r.data.filename, 'alt text')
            })
            .catch((e) => {
              console.log(e)
            })
          // console.log(res.path)

          return false
        }
      }
    })
  },
  methods: {
    sendCnote() {
      console.log(this.editor.getHTML())
    },
    getImage() {
      console.log(this.images)
    }
  }
}
</script>

<style lang="scss" scope>
.editor-container {
  padding-top: 1rem;

  .title-container {
    width: 100%;
    .title-container-inner {
      // padding: px;
      padding-top: 20px;
      height: 450px;
      border-bottom: 1px solid #eee;
      color: #ccc;
      font-size: 38px;
      text-align: center;
    }
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 20px;
    .send-btn {
      padding: 5px 7px;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      border-radius: 15px;
      border: 1px solid #bbb;
    }
  }
  #editor {
    padding: 20px;
    padding-top: 15px;
  }
  .toastui-editor-defaultUI {
    border: none;
  }
  .toastui-editor-defaultUI-toolbar {
    background-color: transparent;
    border-bottom: 0;
    border-radius: 0;
    justify-content: right;
  }
}
</style>
