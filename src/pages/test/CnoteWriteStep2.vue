<template>
  <!-- edit 할 곳  -->
  <q-page class="editor-container">
    <div class="btn-box">
      <!-- 글 올리기 -->

      <transition name="fade">
        <span v-if="isWrote" class="send-btn edit" @click="editCnote()"
          >글이 로스팅 되었습니다</span
        >
      </transition>
      <span v-if="isWriting" class="send-btn" @click="sendCnote()"
        >글 로스팅하기</span
      >
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
        :class="{ 'background-filter': backImg }"
        v-bind:style="{ 'background-image': 'url(' + backgroundImg + ')' }"
      >
        <input
          type="text"
          placeholder="제목을 입력하세요"
          class="input-box"
          v-model="cnote.cnote_title"
        />
        <div>
          <label
            for="background-file"
            class="background-img-btn image toastui-editor-toolbar-icons"
          >
          </label>
          <input
            class="back-img-input"
            id="background-file"
            type="file"
            @change="uploadImg"
          />
        </div>
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

import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',
  components: {},
  setup() {
    const $store = useStore()

    const uid = computed({
      get: () => $store.state.user.uid
    })

    return {
      uid
    }
  },
  data() {
    return {
      // isWriting: true,
      images: [],
      isWrote: false,
      isPublic: true,
      isWriting: true,
      editor: null,
      writeType: true,
      backgroundImg: '',
      cnote: {
        user_id: '',
        cnote_title: '',
        cnote_content: '',
        cnote_img: ''
      },
      backImg: false
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
              this.images.push(r.data.path)
              callback(url + r.data.filename, 'alt text')
            })
            .catch((e) => {
              // console.log(e)
            })
          // console.log(res.path)
        }
      }
    })
  },
  methods: {
    sendCnote() {
      this.cnote.cnote_content = this.editor.getHTML()
      // store에서 user_id 받음
      this.cnote.user_id = this.uid
      if (
        this.cnote.cnote_title === '' ||
        this.cnote.cnote_title === null ||
        this.cnote.cnote_title === 0
      ) {
        alert('제목을 입력해주세요')
        return false
      } else {
        this.$axios
          .post('http://localhost:3000/api/cnote', {
            cnote: {
              user_id: this.cnote.user_id,
              cnote_title: this.cnote.cnote_title,
              cnote_content: this.cnote.cnote_content,
              cnote_published: this.isPublic,
              cnote_img: this.cnote.cnote_img
            }
          })
          .then((response) => {
            setTimeout(() => {
              alert('글이 성공적으로 로스팅 되었습니다.')
              this.$router.push('/cnote/1')
            }, 700)
          })
          .catch((ex) => {
            alert('로스팅하는데 문제가 생겼습니다.')
            console.log(ex)
          })
      }
    },
    editCnote() {
      alert('내가 작성한 글 보러가기')
    },
    getImage() {
      console.log(this.images)
    },
    async uploadImg(e) {
      let file = e.target.files
      console.log('here')
      console.log(file)
      const formData = new FormData()
      const url = 'http://localhost:3000/static/images/'
      formData.append('image', file[0])
      const res = await this.$axios
        .post('http://localhost:3000/api/upload/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .catch((e) => {
          console.log(e)
        })
        .then((r) => {
          this.backgroundImg = url + r.data.filename
          this.cnote.cnote_img = r.data.path
          console.log(this.cnote.cnote_img)
        })
      this.backImg = true
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
      position: relative;
      margin-top: 15px;
      height: 450px;
      border-bottom: 1px solid #eee;
      background-repeat: no-repeat;
      background-position: center center;
      // background-size: 100% auto;
      overflow: hidden;
      &.background-filter {
        &:after {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          content: '';
          display: block;
          width: 100%;
        }
        .input-box {
          color: #fff;
        }
      }
      @media (max-width: 700px) {
        margin-top: 20px;
        height: 200px;
      }
      @media (max-width: 500px) {
        margin-top: 36px;
        // height: 120px;
      }
      .input-box {
        position: absolute;
        bottom: 100px;
        z-index: 3;
        color: #848484;
        font-size: 38px;
        text-align: center;
        transition: all 0.5s;
        // font-weight: 500;
        font-family: 'Nanum Myeongjo';
        @media (max-width: 500px) {
          font-size: 18px;
        }
        &:focus {
          padding-bottom: 20px;
        }
      }
    }

    .background-img-btn {
      display: inline-block;
      width: 17.3px;
      height: 17.5px;
      z-index: 5;
      position: absolute;
      right: 60px;
      top: 30px;
      z-index: 5;
      background-color: white;
      cursor: pointer;
      background-position-x: -315.5px;
      background-position-y: -3.5px;
      border-radius: 2px;
      overflow: hidden;
    }
    .back-img-input {
      display: none;
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
      &.edit {
        color: #50a3a4;
        border: 1px solid #50a3a4;
      }
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
