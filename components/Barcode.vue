<template>
  <div class="barcodeStyleImg" id="barcode" ref="barcodeControl">
    <div v-if="title" class="title">{{ title }}</div>
    <div class="infoContainer">
      <img :src="`https://barcode.tec-it.com/barcode.ashx?data=${code}&code=${linkSuffix}&translate-esc=on`" />
      <div class="hover">
        <slot name="control"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Barcode',
  props: {
    code: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: null,
    },
    linkSuffix: {
      type: String,
      default: 'UPCA',
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  border-bottom: 0;
  text-align: center;
  padding-top:5px;
}

.barcodeStyleImg {
  max-width: rem(250);
  width: 100%;
  margin: rem(10);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  border: 1px solid grey;

  .infoContainer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding-top: rem(15);
  }

  img {
    max-height: rem(100);
    width: rem(225);
  }

  .control {
    background-color: RGBA(0, 0, 0, 0.6);
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: all 250ms ease;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
      z-index: 999999;
      background: lime;
      position: relative;
    }
  }

  &:hover {
    cursor: pointer;

    .control {
      opacity: 1;
      pointer-events: all;
    }
  }

  .code {
    margin-top: rem(10);
    font-size: rem(14) !important;
    width: 100%;
  }

  @media screen and (max-width: 767px) {
    width: 100%;

    img {
      width: 100%;
    }
  }
}
</style>
