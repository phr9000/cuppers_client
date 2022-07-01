<template>
  <div class="editor-page">
    <div>
      <div id="summernote"></div>
      <button @click="test()">등록하기</button>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
export default {
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    $('#summernote').summernote({
      callbacks: {
        onImageUpload: function (files) {
          // upload image to server and create imgNode...
          $summernote.summernote('insertNode', imgNode)
        }
      },
      height: 800,
      minHeight: null,
      maxHeight: null,
      focus: true,
      toolbar: [
        ['style', ['bold', 'italic', 'underline']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['paragraph']],
        ['height', ['height']],
        ['Insert', ['picture']],
        ['Mics', ['codeview']]
      ],
      lang: 'ko-KR'
    })
  },
  methods: {
    test() {
      var markupStr = $('#summernote').summernote('code')
      console.log(markupStr)
    }
  }
}
</script>

<style lang="scss" scoped></style>
