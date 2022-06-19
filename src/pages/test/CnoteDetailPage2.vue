<template>
  <q-page>
    <div class="cupping-writer-container">
      <!-- editor 영역 -->
      <div class="editor-container">
        <div class="title-area">
          <!-- title 영역 -->
          <div class="title-area-inner">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              v-model="editor.title"
              class="input-box title"
            />
            <input
              type="text"
              placeholder="제목을 입력하세요"
              v-model="editor.description"
              class="input-box description"
            />
          </div>
          <!-- dim -->
          <div class="dim"></div>
        </div>

        <div class="content-area">test</div>
        <q-toggle
          class="public-btn"
          v-model="accept"
          label="커핑노트 공개여부"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      editor: {
        title: '핸드드립을 맛있게 내리는 팁 - 2',
        description: '지난 글에서 이야기 했던 것을 이어나가려 한다.'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cupping-writer-container {
  width: 100%;
  // height: 100%;

  // editor container
  .editor-container {
    width: 100%;
    .title-area {
      position: relative;
      z-index: 1;
      width: 100%;
      max-height: 840px;
      // background-color: pink;
      border-bottom: 1px solid #cccc;
      overflow: hidden;
      background-image: url('https://wishbeen-seoul.s3.ap-northeast-2.amazonaws.com/plan/1498208096160_17881746_1930702927147954_3202367211201101824_n.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      &:after {
        display: block;
        content: '';
        padding-bottom: 56.25%;
        max-height: 840px;
      }
      .title-area-inner {
        width: 100%;
        position: absolute;
        z-index: 100;
        bottom: 4.285%;
        left: 0;
        z-index: 3;
        .input-box {
          width: 100%;
          border: none;
          text-align: center;
          background-color: transparent;
          color: #fff;
          &:focus {
            outline: none;
          }
          &.title {
            left: 0;
            font-size: 34px;
          }
          &.description {
            left: 0;
            font-size: 16px;
            bottom: 0px;
            left: 0;
          }
        }
      }
    }
    .dim {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
