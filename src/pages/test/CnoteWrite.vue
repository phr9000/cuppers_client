<template>
  <!-- edit 할 곳  -->
  <q-page class="editor-container">
    <div class="btn-box">
      <!-- 글 올리기 -->
      <span class="send-btn" @click="sendCnote()">글 로스팅하기</span>
      <!-- 공개여부 -->
      <q-toggle class="public-btn" label="공개" v-if="writeType" />
    </div>
    <div class="title-container">
      <div
        class="title-area-inner"
        v-bind:style="{ 'background-image': 'url(' + backgroundImg + ')' }"
      >
        <input
          type="text"
          placeholder="제목을 입력하세요"
          class="input-box"
          v-model="cnote.title"
        />
      </div>
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
      writeType: true,
      images: [],
      backgroundImg: '',
      // 가라데이터 (cafe_id, user_id)
      cnote: {
        cafe_id: '3',
        user_id: '2',
        title: ''
      }
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
          // console.log(blob)
          const formData = new FormData()
          const url = 'http://localhost:3000/static/images/'
          formData.append('image', blob)
          await this.$axios
            .post('http://localhost:3000/api/upload/image', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((r) => {
              // console.log(r)
              // console.log(r.data.path)
              this.images.push(r.data.path)
              callback(url + r.data.filename, 'alt text')
            })
            .catch((e) => {
              // console.log(e)
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
    // cnote post 저장하기
  }
}
</script>

<style lang="scss" scope>
.editor-container {
  padding-top: 15px;

  .title-container {
    position: relative;
    width: 100%;
    .title-area-inner {
      // padding: px;
      margin-top: 15px;
      height: 450px;
      border-bottom: 1px solid #eee;
      @media (max-width: 700px) {
        height: 200px;
      }
      @media (max-width: 500px) {
        height: 120px;
      }
      .input-box {
        position: absolute;
        bottom: 100px;
        color: #333;
        font-size: 38px;
        text-align: center;
        @media (max-width: 500px) {
          font-size: 18px;
        }
      }
    }
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 10px;

    .send-btn {
      margin-right: 10px;
      padding: 5px 7px;
      cursor: pointer;
      font-size: 12px;
      color: #666;
      border-radius: 15px;
      border: 1px solid #bbb;
    }
    .public-btn {
      font-size: 12px;
      color: #666;
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
  .toastui-editor-toolbar-icons {
    &.outdent,
    &.indent {
      display: none;
    }
  }
  .toastui-editor-ww-container {
    display: block;
    height: auto;
  }
  .toastui-editor-ww-container {
    .toastui-editor-contents {
      overflow: intial;
      height: auto;
    }
  }
}
</style>
