<template>
  <div :class="['modalContainer', { open: open }]">
    <div class="modal">
      <div class="modalScroll">
        <div class="close" @click="open = false">X</div>
        <slot></slot>
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
    padding: rem(20);
    position: relative;
    z-index: 200;

    .close {
      position:absolute;
      top: 15px;
      right: 15px;
      padding:5px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 767px) {
    .modal {
      min-height: unset;
      max-height: 95%;
      max-width: 95%;
        overflow: auto;

      .modalScroll {
        // overflow: auto;
        padding-bottom: rem(200);
        background-color:white;
      }
    }
  }
}

</style>
