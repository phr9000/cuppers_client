<template>
  <div>
    <!-- 유저 정보 -->
    <div v-if="user_info" class="user_card_wrap">
      <div class="user_card_inner">
        <!-- top -->
        <div class="top">
          <!-- user 사진 -->
          <div class="user-pic">
            <q-img :src="user_info.thumbUrl" alt="profile 사진" />
          </div>
          <!-- user 이름 -->
          <strong class="user-name">{{ user_info.user_email }}</strong>
          <!-- user 소개 -->
          <div class="user-intro">{{ user_info.user_introduce }}</div>
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
          <!-- <div class="btn-area">
            <div class="btn follow">팔로우</div>
            <div class="btn see-more">자세히보기</div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- skeleton -->
    <div v-else class="user_card_wrap">
      <div class="user_card_inner">
        <!-- top -->
        <div class="top">
          <!-- user 사진 -->
          <div class="user-pic">
            <q-skeleton type="QAvatar" />
          </div>
          <!-- user 이름 -->
          <div class="user-name">
            <q-skeleton
              type="rect"
              width="150px"
              height="20px"
              style="margin: 0 auto"
            />
          </div>
          <!-- user 소개 -->
          <div class="q-pt-xs">
            <q-skeleton
              type="rect"
              width="150px"
              height="14px"
              style="margin: 0 auto"
            />
          </div>
        </div>

        <div class="bottom">
          <div class="user-info">
            <div class="box q-mt-xs" v-for="i in 4" :key="i">
              <p class="num">
                <q-skeleton
                  type="rect"
                  width="60px"
                  height="20px"
                  style="margin: 0 auto"
                />
              </p>
              <p class="txt q-pt-xs">
                <q-skeleton
                  type="rect"
                  width="60px"
                  height="14px"
                  style="margin: 0 auto"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardUserInfo',
  components: {},
  props: {
    user_info: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.userCardActive = false
    }
  }
}
</script>
<style lang="scss" scoped>
.user_card_wrap {
  text-align: center;
  .user_card_inner {
    padding: 0;
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
      bottom: -7px;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      content: '';
      width: 95%;
      border-bottom: 1px solid #eaeaea;
    }
    .user-intro {
      padding-bottom: 8px;
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
        padding: 12px 0;
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
    display: inline-block;
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
