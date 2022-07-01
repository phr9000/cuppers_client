<template>
  <!-- edit 할 곳  -->
  <div id="editor" class="editor-container">test</div>
  <div class="btn-box">
    <button class="send-btn" @click="sendCnote()">등록하기</button>
  </div>
  <div class="btn-box">
    <button class="send-btn" @click="getImage()">images보기</button>
  </div>
  <!-- 에디터 내용을 받을 곳  -->
  <div id="contents" @change="onChange()"></div>
</template>

<script>
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
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
    addImageBlobHook: (blob, callback) => {
      const onUploadImage = async (blob, callback) => {
        console.log(blob)
        const formData = new FormData()
        formData.append('image', blob)
        const res = await axios
          .post('http://localhost:3000/api/upload/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .catch((e) => {
            console.log(e)
          })
        conole.log(res)
        callback(res.path, 'alt text')
        return false
      }
    },
    getImage() {
      console.log(this.images)
    }
  }
}
</script>

<style lang="scss" scoped></style>
