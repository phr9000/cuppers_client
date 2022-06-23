<template>
  <!-- <div class="row items-center" style="max-width: 60px"> -->
  <div class="facility_item row items-center">
    <q-icon v-if="eva" size="xs" :name="icon" color="brown-6" />
    <q-avatar v-if="url" size="xs" square>
      <img :src="url" />
    </q-avatar>
    <div class="q-pl-xs text-brown-5">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'FacilityItem',
  props: {
    icon: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  data() {
    return {
      // isImageIcon: false
      eva: '',
      url: ''
    }
  },
  mounted() {
    if (this.icon) {
      if (this.icon.includes('http')) {
        this.url = this.icon
      } else if (this.icon.includes('eva-')) {
        this.eva = this.icon
      }
      // this.isImageIcon = true
      // console.log(this.icon)
    }
  }
}
</script>

<style lang="scss" scoped>
.facility_item {
  min-height: 24px;
}
</style>
