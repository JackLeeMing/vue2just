<template>
  <svg width="50px"
       height="50px">
    <circle r="20"
            cx="25"
            cy="25"
            stroke-width="3"
            :stroke="outerColor"
            stroke-linecap="round"
            fill="transparent"
            stroke-dasharray="31.415, 31.415">
      <animateTransform dur="1.5s"
                        type="rotate"
                        repeatCount="indefinite"
                        attributeName="transform"
                        values="0, 25 25;360, 25 25">
      </animateTransform>
      <animate dur="3s"
               attributeName="stroke"
               repeatCount="indefinite"
               :values="`${outerColor};${outerColor};${outerColor}`">
      </animate>
    </circle>
    <circle r="10"
            cx="25"
            cy="25"
            fill="transparent"
            stroke-width="3"
            stroke-dasharray="15.7, 15.7"
            :stroke="innerColor"
            stroke-linecap="round">
      <animateTransform dur="1.5s"
                        type="rotate"
                        repeatCount="indefinite"
                        attributeName="transform"
                        values="360, 25 25;0, 25 25">
      </animateTransform>
      <animate dur="3s"
               attributeName="stroke"
               repeatCount="indefinite"
               :values="`${innerColor};${innerColor};${innerColor}`">
      </animate>
    </circle>
  </svg>
</template>

<script>
export default {
  props: {
    outerColor: {
      type: String,
      default: '#1989fa'
    },
    innerColor: {
      type: String,
      default: '#1989fa'
    }
  }
}
</script>

<style>
</style>
