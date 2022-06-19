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
        <!-- (등록페이지) 공개여부  -->
        <q-toggle
          class="public-btn"
          v-model="accept"
          label="커핑노트 공개여부"
          v-if="writeType"
        />
        <!-- (상세페이지) 좋아요, 북마크 영역 -->
        <div class="row bage-area">
          <div class="flex flex-center bage-area-inner">
            <div class="like-area">좋아요</div>
            <div class="bookmark-area">북마크</div>
          </div>
        </div>
        <!-- content 영역 -->
        <div class="content-area">
          <div class="content-inner">
            <textarea class="contents" v-model="editor.content"> </textarea>
          </div>
        </div>
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
        description: '지난 글에서 이야기 했던 것을 이어나가려 한다.',
        content:
          'Text in a pre element\nis displayed in a fixed-width\nifont, and it preserves\nboth  spaces and\niline breaks'
      },
      wrtieType: false
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
    // title 영역
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
      background-size: 100% auto;
      background-attachment: fixed;
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
    // 좋아요, 북마크 영역
    .bage-area {
      .bage-area-inner {
        justify-content: flex-end;
        padding: 20px 40px 0px 40px;
        .like-area {
          margin-right: 20px;
          cursor: pointer;
        }
        .bookmark-area {
          cursor: pointer;
        }
      }
    }

    // content 영역
    .content-area {
      width: 100%;
      height: 100%;
      .content-inner {
        padding: 60px 40px;
        // TODO: textarea 높이 스크립트 바꿔야됨 지금은 스크롤 생김
        .contents {
          width: 100%;
          min-height: 200px; // 임의로 글자 높이에 맞춰 설정함
          height: auto !important;
          border: none;
          // overflow: auto;
          outline: none;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          resize: none; /*remove the resize handle on the bottom right*/
        }
      }
    }
  }
}
</style>
