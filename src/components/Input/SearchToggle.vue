<template>
  <div class="search_toggle">
    <q-input
      v-if="searchMode"
      @keyup.enter="handleClickSearch"
      @blur="searchMode = false"
      v-model="search"
      clearable
      dense
      :placeholder="placeholder"
      class="text-center text-grey-5 q-px-md"
      style="width: 300px"
    >
      <template v-slot:prepend>
        <q-btn @click="handleClickSearch" round dense flat icon="search" />
      </template>
    </q-input>
    <q-btn v-else @click="searchMode = true" flat icon="search"></q-btn>
  </div>
</template>

<script>
export default {
  name: 'SearchToggle',
  props: {
    placeholder: {
      type: String,
      default: () => {
        return '검색어를 입력해주세요'
      }
    }
  },

  data() {
    return {
      searchMode: false,
      search: ''
    }
  },
  methods: {
    handleClickSearch() {
      this.$emit('search', this.search)
    }
  }
}
</script>

<style></style>
