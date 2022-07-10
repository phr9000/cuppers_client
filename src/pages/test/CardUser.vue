<template>
  <div v-if="userCardActive">
    <div class="user-card-container">
      <div class="user-card-inner">
        <!-- top -->
        <div class="top">
          <!-- user 사진 -->
          <div class="user-pic">
            <img src="/icons/avatar.jpg" alt="profile 사진" />
          </div>
          <!-- user 이름 -->
          <strong class="user-name">hr@gmail.com</strong>
          <!-- user 소개 -->
          <div class="user-intro">커피를 통해 세상을 아름답게</div>
        </div>

        <div class="bottom">
          <!-- user info -->
          <div class="user-info">
            <div class="box">
              <p class="num">11,947</p>
              <p class="txt">팔로워</p>
            </div>
            <div class="box">
              <p class="num">4</p>
              <p class="txt">팔로잉</p>
            </div>
            <div class="box">
              <p class="num">15</p>
              <p class="txt">리뷰</p>
            </div>
            <div class="box">
              <p class="num">9</p>
              <p class="txt">커핑노트</p>
            </div>
          </div>
          <!-- btn area -->
          <div class="btn-area">
            <div class="btn follow">팔로우</div>
            <div class="btn see-more">자세히보기</div>
          </div>
        </div>
      </div>
      <div class="close close3" @click="close()"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userCardActive: true
    }
  },
  methods: {
    close() {
      this.userCardActive = false
    }
  }
}
</script>
<style lang="scss" scoped>
.user-card-container {
  position: relative;
  margin: 30px;
  width: 350px;
  height: auto;
  // border: 1px solid #ccc;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 16px;
  text-align: center;
  .user-card-inner {
    padding: 10px 0;
    padding-top: 20px;
  }

  .top {
    position: relative;

    .user-pic {
      margin: 0 auto;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
      }
    }
    .user-name {
      display: block;
      padding: 7px 0 0;
      font-size: 16px;
      font-weight: 800;
    }
    &:after {
      position: absolute;
      bottom: -11px;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      content: '';
      width: 80%;
      border: 1px solid #eaeaea;
    }
    .user-intro {
      color: #a6a6a6;
      font-weight: 700;
      font-size: 12px;
    }
  }

  .bottom {
    .user-info {
      margin-top: 6px;
      padding: 0 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      .box {
        width: 25%;
        padding-top: 10px;
        > p {
          margin: 0;
        }
        .num {
          font-size: 16px;
          font-weight: 900;
          color: #474747;
          margin: 0;
        }
        .txt {
          font-size: 12px;
          color: #bdbdbd;
          font-weight: 900;
          margin-bottom: 10px;
        }
      }
    }
    .btn-area {
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        padding: 5px 3px;
        font-weight: bold;
        width: calc(28% - 10px);
        border-radius: 18px;
        font-size: 12px;
        cursor: pointer;
        &.follow {
          color: #fff;
          background-color: #50a3a4;
        }
        &.see-more {
          margin-left: 20px;
          color: #50a3a4;
          border: 1px solid #50a3a4;
        }
      }
    }
  }
  // 엑스버튼
  .close {
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: -14px;
    float: left;
    display: inline-block;
    *display: inline;
    width: 35px;
    height: 41px;
    text-align: center;
    margin-right: 20px;
  }
  .close3:after {
    content: '\00d7';
    font-size: 23pt;
    line-height: 35px;
  }
}
</style>
