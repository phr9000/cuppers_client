<template>
  <div class="slide-container">
    <swiper
      ref="mySwiper"
      :options="swiperOption"
      @slideChange="slideChangeTransitionStart"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: false }"
      :slides-per-view="2"
    >
      <swiper-slide>
        <ul class="slide-container slide-container1">
          <li class="slide">
            <div class="img-area">
              <img
                :src="cnote.cnote_thumbnail"
                class="img_pic"
                alt="한 잔의 커피는 나의 아낭케"
              />
            </div>
            <div class="txt-area">
              <div class="title">{{ cnote.cnote_title }}</div>
              <div class="desc">
                <p>{{ cnote.cnote_content }}</p>
              </div>
              <div class="writer">by {{ cnote.user_name }}</div>
            </div>
            <div class="dim"></div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/2359e14af9dd4270bfd02276dbabcc21"
                class="img_pic"
                alt="캠핑 밴에 사는<br>골드코스트의 히피들<br>"
              />
            </div>
            <div class="txt-area">
              <div class="title">
                미니멀리즘으로 가는<br />
                한달살기
              </div>
              <div class="desc">
                미니멀리즘으로 사는것은 어렵지만 해볼만한 가치가 있는
                것이라고...
              </div>
              <div class="writer">by 위트립</div>
            </div>
            <div class="dim"></div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide>
        <ul class="slide-container slide-container">
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/e56017e9572e43a68279370cd769983d"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">
              <div class="title">
                핸드드립을 맛있게<br />
                내리는 팁 - 2
              </div>
              <div class="desc">
                지난 글에서는 핸드드립을 본격적으로 내려 마시기 전에 고민해야 할
                몇가지 ...
              </div>
              <div class="writer">by 봉선</div>
            </div>
            <div class="dim"></div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/3c29644f2fef4c19bae2e64fee105612"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">
              <div class="title">
                샤로수길에서 찾은<br />
                힙한 카페
              </div>
              <div class="desc">
                생각해보면 돌아봤을 때 더 기억에 더 남는 장소가 있다. abc 카페가
                나에겐 그런 카페인 것 같다..
              </div>
              <div class="writer">by 재훈</div>
            </div>
            <div class="dim"></div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C520x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/32b33b09b41a4282912e67ca80c2a2cf"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">
              <div class="title">미니멀리즘으로 사는것은 어렵지만</div>
              <div class="desc">
                미니멀리즘으로 사는것은 어렵지만 해볼만한 가치가 있는
                것이라고...
              </div>
              <div class="writer">by</div>
            </div>
            <div class="dim"></div>
          </li>
        </ul>
      </swiper-slide>
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
            <div class="txt-area">
              <div class="title">
                상해 도심에서<br />
                스페셜티 카페를 찾다
              </div>
              <div class="writer">by 성우</div>
            </div>
            <div class="dim"></div>
          </li>
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/2359e14af9dd4270bfd02276dbabcc21"
                class="img_pic"
                alt="캠핑 밴에 사는<br>골드코스트의 히피들<br>"
              />
            </div>
            <div class="txt-area">
              <div class="title">
                한달만 좀 예쁜 제주도 카페에서 푹 쉬고 싶다.
              </div>
              <div class="writer">by 해람</div>
            </div>
            <div class="dim"></div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide style="width: 960px">
        <ul class="slide-container slide-container">
          <li class="slide">
            <div class="img-area">
              <img
                src="//img1.daumcdn.net/thumb/C520x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/32b33b09b41a4282912e67ca80c2a2cf"
                class="img_pic"
                alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
              />
            </div>
            <div class="txt-area">test</div>
            <div class="dim"></div>
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
            <div class="dim"></div>
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
            <div class="dim"></div>
          </li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
// import 'swiper/components/pagination/pagination.scss'
// import 'swiper/components/navigation/navigation.min.css'
SwiperCore.use([Pagination, Navigation])

export default {
  name: 'FilterSwiper',
  data() {
    return {
      swiperOption: {
        slidesPerView: '1',
        spaceBetween: 6, // swiper-slide 사이의 간격 지정
        slidesOffsetBefore: 0, // slidesOffsetBefore는 첫번째 슬라이드의 시작점에 대한 변경할 때 사용
        slidesOffsetAfter: 0, // slidesOffsetAfter는 마지막 슬라이드 시작점 + 마지막 슬라이드 너비에 해당하는 위치의 변경이 필요할 때 사용
        freeMode: true, // freeMode를 사용시 스크롤하는 느낌으로 구현 가능
        centerInsufficientSlides: true, // 컨텐츠의 수량에 따라 중앙정렬 여부를 결정함,
        touchRatio: 0 //드래그 금지
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    cnote: {
      type: Object,
      default: () => {
        return {
          cnote_id: 2,
          user_id: 2,
          user_name: '커퍼',
          cnote_title: '한 잔의 커피는 나의 아낭케',
          cnote_content:
            '오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.',
          cnote_thumbnail:
            'https://cdn.mhns.co.kr/news/photo/202103/502451_604128_1858.jpg',
          create_at: '2022-06-14 14:30:55'
        }
      }
    },
    computed: {
      createDate() {
        return format(new Date(), 'MMM dd. yyyy')
      },
      swiper() {
        return this.$refs.mySwiper
      }
    }
  }
}
</script>

<style lang="scss" scope>
// 1) swiper slide 너비 설정 (important 넣는 이유는 무시될 가능성 있어서)
.swiper-wrapper {
  .swiper-slide:nth-child(1) {
    width: 320px !important;
    margin-left: 1.6rem;
  }
  .swiper-slide:nth-child(2) {
    width: 960px !important;
    li {
      width: 33.4% !important;
    }
  }
  .swiper-slide:nth-child(3) {
    width: 320px !important;
  }
  .swiper-slide:nth-child(4) {
    width: 960px !important;
    li {
      width: 33.4% !important;
    }
  }
}

.slide {
  position: relative;
  .dim {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease-in-out;
    background-color: #000;
    opacity: 0.4;
  }
}

.swiper-button-disabled {
  display: none;
}
ul {
  padding: 0 !important;
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
    margin: 0 !important;
    display: flex;
    .slide {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        .dim {
          opacity: 0.6;
        }
        .img-area {
          transition: all 0.4s;
          transform: scale(1.1);
        }
      }

      .txt-area {
        position: absolute;
        z-index: 2;
        color: #fff;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .title {
          width: 300px;
          padding-bottom: 8px;
          font-size: 28px;
          font-weight: normal;
          word-break: keep-all;
          letter-spacing: -0.25px;
          line-height: 36px;
          font-family: 'Nanum Myeongjo', sans-serif;
        }
        .desc {
          width: 250px;
          margin: 0 auto;
          margin-bottom: 4px;
          font-size: 12px;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          display: -webkit-box;
        }
      }
    }
    &.slide-container1 {
      width: 320px;
      flex-direction: column;
      .swiper-slide {
        width: 320px !important;
      }
      .slide {
        height: 260px;
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
.swiper-pagination-bullet {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.5);
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.8);
}
.swiper-button-prev {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  color: #333;
  opacity: 0.3;
}
.swiper-button-next {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  color: #333;
  opacity: 0.3;
}
</style>
