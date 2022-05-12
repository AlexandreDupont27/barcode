<template>
  <Modal v-model="open">
    <template>
      <h3>Saved {{ type }}:</h3>
      <label>
        <span>Add name :</span>
        <input v-model="title" type="text" />
      </label>

      <div class="listBarcode flex-start">
        <div class="container">
          <DMX v-if="type === 'DMX'" :code="code"></DMX>
          <Barcode v-else :code="code.toString()" :link-suffix="barcodeSuffix"></Barcode>
        </div>
      </div>

      <div @click="save" class="btn">Save</div>
    </template>
  </Modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    barcodeSuffix: {
      type: String,
      default: '',
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
      title: '',
    }
  },
  methods: {
    save() {
      let savedCode = null

      if (this.type === 'DMX') {
        savedCode = {
          code: this.code,
          title: this.title,
        }
      } else {
        savedCode = {
          code: this.code,
          title: this.title,
          suffix: this.barcodeSuffix,
        }
      }

      let codes = JSON.parse(localStorage.getItem(`save_${this.type}`))

      if (!codes) {
        codes = []
      }

      codes.push(savedCode)

      localStorage.setItem(`save_${this.type}`, JSON.stringify(codes))
      this.open = false
    },
  },
}
</script>

<style lang="scss" scoped>
.modalContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
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
    width: 100%;
    background-color: white;
    padding: 20px;
    position: relative;

    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px;
      cursor: pointer;
    }
  }
}

.listBarcode {
  max-height: 500px;
  overflow: auto;

  @media screen and (max-width: 767px) {
    max-height: 95%;
  }
}

.flex-start {
  justify-content: flex-start;
}
</style>
