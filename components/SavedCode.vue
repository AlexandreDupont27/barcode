<template>
  <div :class="['modalContainer', { open: open }]">
    <div class="modal">
      <div class="close" @click="open = false">X</div>
      <h3>Saved Dmx:</h3>

      <div class="listBarcode">
        <div class="container">
          <ejs-datamatrixgenerator
            v-for="(code, index) in codeList"
            :key="type + code"
            class="barcodeStyle"
            id="barcode"
            ref="barcodeControl"
            :value="`s${code}`"
            width="100px"
            height="100px"
          >
          </ejs-datamatrixgenerator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'DMX',
    },
  },
  computed: {
    open: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  data() {
    return {
      codeList: [],
    }
  },
  watch: {
    value() {
      this.codeList = localStorage.getItem(`save_last_${this.type}`).split(',')
      console.log('codeList : ', this.codeList)
    },
  },
}
</script>

<style lang="scss" scoped>
.modalContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: RGBA(0, 0, 0, 0.6);
  opacity: 0;
  pointer-events: none;
  transition: all 500ms ease;

  &.open {
    opacity: 1;
    pointer-events: all;
  }

  .modal {
    min-height: 500px;
    max-width: 900px;
    width:100%;
    background-color: white;
    padding: 20px;
    position: relative;

    .close {
      position:absolute;
      top: 15px;
      right: 15px;
      padding:5px;
      cursor: pointer;
    }
  }
}
</style>
