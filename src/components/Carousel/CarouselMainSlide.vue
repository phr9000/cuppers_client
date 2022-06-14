<template>
  <div class="slide-container">
    <swiper :slides-per-view="3" :space-between="0">
      <swiper-slide style="width: 320px">
        <ul class="slide-container slide-container1">
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/5fa226153eb945489e14772a7c48d31d"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/2359e14af9dd4270bfd02276dbabcc21"
                class="img_pic"
                alt="캠핑 밴에 사는<br>골드코스트의 히피들<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide style="width: 960px">
        <ul class="slide-container slide-container">
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/7cc0844444db44c7970663cb74b7364f"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/d9602a28c42248f1b406695658e36c52"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/ab3848ca65d3409ba7cbd2d2431ff419"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide>
        <ul class="slide-container slide-container1">
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/5fa226153eb945489e14772a7c48d31d"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/2359e14af9dd4270bfd02276dbabcc21"
                class="img_pic"
                alt="캠핑 밴에 사는<br>골드코스트의 히피들<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide>
        <ul class="slide-container slide-container">
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/7cc0844444db44c7970663cb74b7364f"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/d9602a28c42248f1b406695658e36c52"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/ab3848ca65d3409ba7cbd2d2431ff419"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
          </li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import cafeData from '../../data/cafeData.json'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  // 2.
  swiperOptions: {
    // 네비게이션
    navigation: true,

    // 페이지네이션
    pagination: true,

    slidesPerView: 6,
    slidesPerGroup: 6,
    spaceBetween: 10,
    // 반응형 breakpoints
    breakpoints: {
      375: {
        slidesPerView: 1
      },
      425: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      1400: {
        slidesPerView: 5,
        slidesPerGroup: 5
      }
    }
  },
  data() {
    return {
      cafeData
    }
  }
}
</script>

<style lang="scss" scope>
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.swiper-slide {
  overflow: hidden;
}
.swiper {
  overflow: hidden;
  height: 520px;
  .slide-container {
    display: flex;
    .slide {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      .img-area {
        &:hover {
          transition: all 0.5s;
          transform: scale(1.1);
          background-color: transparent;
          opacity: 1;
        }
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          opacity: 0.5;
          background-color: rgb(0, 0, 0);
        }
      }
      .txt-area {
        position: absolute;
        z-index: 2;
        color: red;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &.slide-container1 {
      width: 320px;
      flex-direction: column;
      .swiper-slide {
        width: 320px !important;
      }
      .slide {
        height: 280px;
      }
    }
    &.slide-container2 {
      flex-direction: row;
      width: 100%;
      .slide {
        width: 33%;
        height: 280px;
      }
    }
  }
}
</style>
