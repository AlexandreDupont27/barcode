<template>
  <div class="dmxStyleImg" id="barcode" ref="barcodeControl">
    <div v-if="title" class="title">{{ title }}</div>
    <div class="infoContainer">
      <img
        :src="`https://barcode.tec-it.com/barcode.ashx?data=${code}&code=DataMatrix&translate-esc=on`"
      />
      <div class="code">{{ code }}</div>
      <div class="hover">
        <slot name="control"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DMX',
  props: {
    code: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: null,
    },
  },
  watch: {
    code(val) {
      console.log('value code : ', val)
    }
  },
  mounted() {
    console.log('Coode : ', this.code)
  }
}
</script>

<style lang="scss" scoped>
.title {
  width:100%;
  border: 1px solid grey;
  border-bottom: 0;
  text-align: center;
}
</style>
