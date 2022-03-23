<template>
  <div class="errorPage">
    <div class="wrapper">
      <h1 v-if="error.statusCode === 404">{{ $t('error.404.title') }}</h1>
      <h1 v-if="error.statusCode != 404">{{ $t('error.500.title') }}</h1>
      <h3 v-if="error.statusCode === 404">{{ $t('error.404.text') }}</h3>
      <h3 v-if="error.statusCode != 404">{{ $t('error.500.text') }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
