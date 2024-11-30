<template>
  <svg id="Layer_1"
       version="1.1"
       width="100px"
       height="80px"
       x="0px"
       y="0px"
       viewBox="0 0 100 100"
       enable-background="new 0 0 100 100"
       xml:space="preserve">
    <rect :fill="colors[0]"
          width="3"
          height="100"
          transform="translate(0) rotate(180 3 50)">
      <animate attributeName="height"
               attributeType="XML"
               dur="1s"
               values="30; 100; 30"
               repeatCount="indefinite" />
    </rect>
    <rect x="17"
          :fill="colors[1]"
          width="3"
          height="100"
          transform="translate(0) rotate(180 20 50)">
      <animate attributeName="height"
               attributeType="XML"
               dur="1s"
               values="30; 100; 30"
               repeatCount="indefinite"
               begin="0.1s" />
    </rect>
    <rect x="40"
          :fill="colors[2]"
          width="3"
          height="100"
          transform="translate(0) rotate(180 40 50)">
      <animate attributeName="height"
               attributeType="XML"
               dur="1s"
               values="30; 100; 30"
               repeatCount="indefinite"
               begin="0.3s" />
    </rect>
    <rect x="60"
          :fill="colors[3]"
          width="3"
          height="100"
          transform="translate(0) rotate(180 58 50)">
      <animate attributeName="height"
               attributeType="XML"
               dur="1s"
               values="30; 100; 30"
               repeatCount="indefinite"
               begin="0.5s" />
    </rect>
    <rect x="80"
          :fill="colors[4]"
          width="3"
          height="100"
          transform="translate(0) rotate(180 76 50)">
      <animate attributeName="height"
               attributeType="XML"
               dur="1s"
               values="30; 100; 30"
               repeatCount="indefinite"
               begin="0.1s" />
    </rect>
  </svg>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      default: () => {
        return ['#E85524', '#1C9349', '#E85524', '#1C9349', '#E85524']
      }
    }
  }
}
</script>

<style>
</style>
