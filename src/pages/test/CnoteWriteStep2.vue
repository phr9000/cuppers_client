<template>
  <!-- edit 할 곳  -->
  <q-page class="editor-container">
    <div class="btn-box">
      <!-- 글 올리기 -->
      <span class="send-btn" @click="sendCnote()">글 로스팅하기</span>
      <!-- 공개여부 -->
      <label class="switch">
        <input
          type="checkbox"
          v-model="isPublic"
          @click="isPublic = !isPublic"
        />
        <span class="slider round"></span>
      </label>
      <div style="min-width: 40px">
        <span
          class="public-txt public"
          v-if="isPublic"
          style="position: relative; padding: 0 4px; padding-left: 10px"
          >공개</span
        >
        <span
          class="public-txt"
          v-if="!isPublic"
          style="position: relative; padding: 0 4px"
          >비공개</span
        >
      </div>
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
      isPublic: true,
      editor: null,
      writeType: true,
      backgroundImg: '',
      images: [],
      cafeids: [3, 4, 5],
      cnote: {
        user_id: '3',
        title: '',
        content: ''
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
      placeholder: '-',
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
  created() {
    // this.sendCnote()
  },
  methods: {
    sendCnote() {
      // console.log(this.editor.getHTML())
      this.cnote.content = this.editor.getHTML()
      this.$axios
        .post(`${process.env.API}/cnote`, {
          param: {
            user_id: this.cnote.user_id,
            cnote_title: this.cnote.title,
            cnote_content: this.cnote.content,
            cnote_published: this.isPublic
          }
        })
        .then((response) => {
          console.log(response)
          alert('성공적으로 보내짐')
        })
        .catch((ex) => {
          alert('post 실패')
          console.log(ex)
        })
    },
    getImage() {
      console.log(this.images)
    }

    // cnote post 저장하기
  }
}
</script>

<style lang="scss">
// toast ui 모듈에서 가져오는거라 scoped 하면 안되요~
// 유니크 클래스 : editor-container //
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
        margin-top: 20px;
        height: 200px;
      }
      @media (max-width: 500px) {
        margin-top: 36px;
        height: 120px;
      }
      .input-box {
        position: absolute;
        bottom: 100px;
        color: #333;
        font-size: 38px;
        text-align: center;
        transition: all 0.5s;
        @media (max-width: 500px) {
          font-size: 18px;
        }
        &:focus {
          padding-bottom: 20px;
        }
      }
    }
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 20px;
    @media (max-width: 1200px) {
      margin-right: 10px;
    }

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

  // slide toggle
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 51px;
    height: 27px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 6px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: $dark;
  }

  input:focus + .slider {
    // box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .public-txt {
    font-size: 12px;
    color: #666;
    // &.public {
    //   &:before {
    //     content: '';
    //     position: relative;
    //     margin-left: 6px;
    //   }
    // }
  }

  // 에디터 style
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
