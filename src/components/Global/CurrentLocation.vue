<template>
  <div v-show="false">{{ locState }}</div>
</template>
<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const MAX_TRY = 3

export default defineComponent({
  name: 'CurrentLocation',
  setup() {
    const $store = useStore()

    const locState = computed({
      get: () => $store.state.map.loc,
      set: (val) => {
        $store.commit('map/setLoc', val)
      }
    })

    return {
      locState
    }
  },
  data() {
    return {
      try: 0
    }
  },
  computed: {
    locationSupported() {
      if ('geolocation' in navigator) return true
      return false
    }
  },
  mounted() {
    // 내위치(위도,경도) 좌표 구하기
    if (!this.locState && this.locationSupported) {
      this.setCurrentLocation()
    }
  },
  methods: {
    setCurrentLocation() {
      // this.locationLoading = true
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Get Current Position Success')
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: null
          }
          this.saveLocToStore(this.currentLocation)
        },
        (err) => {
          if (this.try < MAX_TRY) {
            this.try++
            console.log('try again')
            this.setCurrentLocation()
          } else {
            this.locationError()
          }
        },
        { timeout: 1500 }
      )
    },
    saveLocToStore(current_location) {
      this.locState = current_location
    },
    locationError() {
      console.log('현재 위치를 찾을 수 없습니다.')

      this.locationLoading = false
    },
    // 추후 사용을 위해 남겨둠
    locationSuccess(result) {
      this.currentLocation.city = result.data.city
      // console.log(result.data.city)
      console.log(result.data.country)
      this.locationLoading = false
    }
    // 추후 사용을 위해 남겨둠
    // getCityAndCountry(position) {
    //   let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
    //   this.$axios
    //     .get(apiUrl)
    //     .then((result) => {
    //       this.locationSuccess(result)
    //     })
    //     .catch((err) => {
    //       this.locationError()
    //     })
    // }
  }
})
</script>
