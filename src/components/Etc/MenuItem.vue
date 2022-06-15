<template>
  <div>
    <div class="q-mb-xs row items-center">
      <q-icon
        v-if="type === 'br'"
        size="xs"
        name="img:/icons/br.png"
        class="q-mr-xs"
      /><q-icon v-else size="xs" name="img:/icons/va.png" class="q-mr-xs" />{{
        name
      }}
    </div>
    <div v-if="aromaNotes" class="aromanote_wrap">
      <badge-aroma
        v-for="aroma in aromaNotes"
        :key="aroma.keyword_name"
        :value="aroma.keyword_name"
      />
    </div>
  </div>
</template>

<script>
import BadgeAroma from 'src/components/Badge/BadgeAroma.vue'
export default {
  components: { BadgeAroma },
  props: {
    name: { type: String, default: '음료 이름' },
    aromaNotes: {
      type: Array,
      default: () => {
        return null
      }
    },
    type: { type: String, default: 'br' }
  }
}
</script>

<style></style>
