<template>
  <div class="keyword">
    <h4>CAFE KEYWORD</h4>
    <p>
      <span class="txt_keyword"> 키워드로 분류된 다양한 카페 모음 </span>
    </p>
  </div>
  <div class="keyword-container">
    <div class="keyword-item" v-for="(a, i) in CafeKeywordsData" :key="i">
      <a href="#" class="keyword-link">{{ a.keyword }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CafeKeywords',
  props: {
    CafeKeywordsData: Array
  }
}
</script>
<style lang="scss" scoped>
.keyword {
  text-align: center;
}
h4 {
  margin-bottom: 15px;
}
a {
  text-decoration: none;
  color: black;
}
.keyword-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.keyword-item {
  width: 100px;
  height: 100px;
  // border: 1px solid #b5afaf;
  // margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(251, 251, 251);
  transition: 0.5s;
}
.keyword-item:hover {
  /* flex-grow: 1.5; */
  background: rgb(235, 235, 235);
  width: 105px;
  // height: 110px;
}
.keyword-link {
  font-size: 10px;
  // font-weight: bold;
  color: #555;
  text-decoration: none;
  text-align: center;
}
.keyword-link:hover {
  // color: white;
}
</style>
