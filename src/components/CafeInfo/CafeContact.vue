<template>
  <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
  <div>
    <p>{{ firstContact.tel }}</p>
    <q-icon :name="language" /><a href="">{{ firstContact.web }}</a>
    <br />
    <a href="">{{ firstContact.insta }}</a>
  </div>
</template>

<script>
import { language } from '@quasar/extras/material-icons'
import CafeContactData from '../../data/CafeContactData'

export default {
  name: 'CafeContact',
  props: {
    CafeContactData: Array
  },
  created() {
    this.language = language
  },
  data() {
    return {
      CafeContact: CafeContactData
    }
  },
  computed: {
    firstContact() {
      return this.CafeContact[0]
    }
  }
}
</script>

<style lang="scss" scoped></style>
