<template>
  <div class="wrapper" v-if="step == 1">
    <div class="title">
      <h4>선호하는 커피취향</h4>
    </div>
    <h6>좋아하는 커피의 특징 (중복 선택 가능)</h6>
    <div class="container">
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_coffee"
          value="sour"
        />
        <div class="option_inner sour">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/br.png" />
            </div>
            <div class="name">화사한<br />산미가 있는</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_coffee"
          value="body"
        />
        <div class="option_inner body">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/br.png" />
            </div>
            <div class="name">바디감이 있는</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_coffee"
          value="darkchocolate"
        />
        <div class="option_inner darkchocolate">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/br.png" />
            </div>
            <div class="name">다크초콜릿</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_coffee"
          value="darkroasting"
        />
        <div class="option_inner darkroasting">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/br.png" />
            </div>
            <div class="name">다크로스팅</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_coffee"
          value="natural"
        />
        <div class="option_inner natural">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/br.png" />
            </div>
            <div class="name">내추럴<br />프로세싱</div>
          </div>
        </div>
      </label>
    </div>
    <h6>좋아하는 추출 방식 (중복 선택 가능)</h6>
    <div class="container">
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="espresso"
        />
        <div class="option_inner espresso">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/hot.png" />
            </div>
            <div class="name">에스프레소</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="mochapot"
        />
        <div class="option_inner mochapot">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="close" />
            </div>
            <div class="name">모카포트</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="pourover"
        />
        <div class="option_inner pourover">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="close" />
            </div>
            <div class="name">푸어오버</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="chemex"
        />
        <div class="option_inner chemex">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="close" />
            </div>
            <div class="name">케멕스</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="siphon"
        />
        <div class="option_inner siphon">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="close" />
            </div>
            <div class="name">사이폰</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="coldbrew"
        />
        <div class="option_inner coldbrew">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="close" />
            </div>
            <div class="name">콜드브루</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="select_brewing"
          value="aeropress"
        />
        <div class="option_inner aeropress">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="close" />
            </div>
            <div class="name">에어로프레소</div>
          </div>
        </div>
      </label>
    </div>
    <q-btn
      outline
      rounded
      color="primary"
      label="다음 1 / 2"
      @click="doLikeCoffee(), doSelectBrewing()"
    />
  </div>

  <div class="wrapper" v-if="step == 2">
    <div class="title">
      <h4>선호하는 카페취향</h4>
    </div>
    <h6>어떤 카페를 좋아하세요? (중복 선택 가능)</h6>
    <div class="container">
      <label class="option_item">
        <input type="checkbox" class="checkbox" name="like_cafe" value="mood" />
        <div class="option_inner mood">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="star_border" />
            </div>
            <div class="name">분위기가 있는</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_cafe"
          value="taste"
        />
        <div class="option_inner taste">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="local_cafe" />
            </div>
            <div class="name">커피의 맛</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_cafe"
          value="brewing"
        />
        <div class="option_inner brewing">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="coffee_maker" />
            </div>
            <div class="name">선택 가능한<br />브루잉 종류</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_cafe"
          value="coffeenote"
        />
        <div class="option_inner coffeenote">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="style" />
            </div>
            <div class="name">
              커피 노트나<br />커피에 대한<br />설명이 있는
            </div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_cafe"
          value="buybeans"
        />
        <div class="option_inner buybeans">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="img:/icons/br.png" />
            </div>
            <div class="name">원두 구매 가능</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_cafe"
          value="parking"
        />
        <div class="option_inner parking">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="local_parking" />
            </div>
            <div class="name">주차 가능 여부</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input
          type="checkbox"
          class="checkbox"
          name="like_cafe"
          value="place"
        />
        <div class="option_inner place">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="table_bar" />
            </div>
            <div class="name">넓은 공간,<br />많은 좌석</div>
          </div>
        </div>
      </label>
      <label class="option_item">
        <input type="checkbox" class="checkbox" name="like_cafe" value="SNS" />
        <div class="option_inner SNS">
          <div class="tickmark">
            <div class="icon">
              <q-icon class="fab" size="md" name="thumb_up" />
            </div>
            <div class="name">SNS에서<br />유명한</div>
          </div>
        </div>
      </label>
    </div>
    <q-btn outline rounded color="primary" label="이전" @click="step--" />
    <q-btn
      outline
      rounded
      class="btn-com"
      color="primary"
      label="완료 2 / 2"
      @click="completion()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    }
  },
  methods: {
    doLikeCoffee() {
      this.step++
      let likecoffee = document.getElementsByName('like_coffee')
      let checked_likecoffee = []
      for (let i = 0; i < likecoffee.length; i++) {
        if (likecoffee[i].checked) {
          checked_likecoffee.push(likecoffee[i].value)
        }
      }
      console.log(checked_likecoffee)
    },
    doSelectBrewing() {
      let selectbrewing = document.getElementsByName('select_brewing')
      let checked_selectbrewing = []
      for (let i = 0; i < selectbrewing.length; i++) {
        if (selectbrewing[i].checked) {
          checked_selectbrewing.push(selectbrewing[i].value)
        }
      }
      console.log(checked_selectbrewing)
    },
    completion() {
      let likecafe = document.getElementsByName('like_cafe')
      let checked_likecafe = []
      for (let i = 0; i < likecafe.length; i++) {
        if (likecafe[i].checked) {
          checked_likecafe.push(likecafe[i].value)
        }
      }
      console.log(checked_likecafe)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h6 {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 30px;
}
.wrapper {
  width: 700px;
  margin: 100px auto 0;
}
.wrapper .title {
  font-size: 24px;

  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.container .option_item {
  display: flex;
  position: relative;
  width: 175px;
  height: 175px;
  margin: 10px;
}
.option_item .option_inner {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  border-radius: 5px;
  text-align: center;
  padding: 58px 40px;
  cursor: pointer;
  color: #000;
  display: block;
  border: 5px solid transparent;
  position: relative;
}
.option_item .checkbox {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  opacity: 0;
}

.option_item .option_inner .icon {
  margin-bottom: 10px;
}
.option_item .option_inner .icon .fab {
  font-size: 32px;
}
.option_item .option_inner .name {
  user-select: none;
  font-size: 14px;
}
.option_item .checkbox:checked ~ .option_inner.sour {
  border-color: #deb887;
}
.option_item .checkbox:checked ~ .option_inner.body {
  border-color: #deb887;
}
.option_item .checkbox:checked ~ .option_inner.darkchocolate {
  border-color: #deb887;
}
.option_item .checkbox:checked ~ .option_inner.darkroasting {
  border-color: #deb887;
}
.option_item .checkbox:checked ~ .option_inner.natural {
  border-color: #deb887;
}
.option_item .checkbox:checked ~ .option_inner.espresso {
  border-color: #bdb76b;
}
.option_item .checkbox:checked ~ .option_inner.mochapot {
  border-color: #bdb76b;
}
.option_item .checkbox:checked ~ .option_inner.chemex {
  border-color: #bdb76b;
}
.option_item .checkbox:checked ~ .option_inner.siphon {
  border-color: #bdb76b;
}
.option_item .checkbox:checked ~ .option_inner.coldbrew {
  border-color: #bdb76b;
}
.option_item .checkbox:checked ~ .option_inner.aeropress {
  border-color: #bdb76b;
}
.option_item .checkbox:checked ~ .option_inner.mood {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.taste {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.brewing {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.coffeenote {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.buybeans {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.parking {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.place {
  border-color: #ffdead;
}
.option_item .checkbox:checked ~ .option_inner.SNS {
  border-color: #ffdead;
}
</style>
