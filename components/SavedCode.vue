<template>
  <Modal v-model="open">
    <template>
      <h3>Saved Dmx:</h3>
      <label>
        <span>Add name :</span>
        <input v-model="title" type="text" />
      </label>

      <div class="">
        <div class="container">
          <DMX :code="code"></DMX>
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
      const savedCode = {
        code: this.code,
        title: this.title,
      }

      let codes = JSON.parse(localStorage.getItem(`save_${this.type}`))

      if (!codes) {
        codes = []
      }

      codes.push(savedCode)

      console.log('codes :', codes)

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
</style>
