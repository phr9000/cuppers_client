<template>
  <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
  <div>
    <p>{{ CafeContactData[0].tel }}</p>
    <a href="">{{ CafeContactData[0].web }}</a>
    <br />
    <a href="">{{ CafeContactData[0].insta }}</a>
  </div>
</template>

<script>
export default {
  name: 'CafeContact',
  props: {
    CafeContactData: Array
  }
}
</script>

<style lang="scss" scoped>
a,
p {
  padding-left: 10px;
  margin-bottom: 5px;
}
</style>
