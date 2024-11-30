<template>
  <svg id="L2"
       version="1.1"
       x="0px"
       y="0px"
       width="70px"
       height="70px"
       viewBox="0 0 100 100"
       enable-background="new 0 0 100 100"
       xml:space="preserve">
    <circle fill="none"
            :stroke='circleColor'
            stroke-width="4"
            stroke-miterlimit="10"
            cx="50"
            cy="50"
            r="48" />
    <line fill="none"
          stroke-linecap="round"
          :stroke='shortLineColor'
          stroke-width="4"
          stroke-miterlimit="10"
          x1="50"
          y1="50"
          x2="85"
          y2="50.5">
      <animateTransform attributeName="transform"
                        dur="2s"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
    </line>
    <line fill="none"
          stroke-linecap="round"
          :stroke='longLineColor'
          stroke-width="4"
          stroke-miterlimit="10"
          x1="50"
          y1="50"
          x2="49.5"
          y2="74">
      <animateTransform attributeName="transform"
                        dur="15s"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite" />
    </line>
  </svg>
</template>

<script>
export default {
  props: {
    circleColor: {
      type: String,
      default: '#E85524'
    },
    shortLineColor: {
      type: String,
      default: '#1C9349'
    },
    longLineColor: {
      type: String,
      default: '#E85524'
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
