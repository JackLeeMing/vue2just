<template>
  <div class="zdog-page">
    <canvas class="item zdog-canvas"
            width="480"
            height="480">
    </canvas>
    <canvas class="item zdog-canvas2"
            width="480"
            height="480">
    </canvas>
    <canvas class="item zdog-canvas3"
            width="480"
            height="480">
    </canvas>
    <div v-for="d in 6"
         :key="d"
         class="item">
      {{d}}
    </div>
  </div>
</template>

<script>
import Zdog from 'zdog'
export default {
  methods: {
    initZdog() {
      // Made with Zdog

      let isSpinning = true

      let illo = new Zdog.Illustration({
        element: '.zdog-canvas',
        dragRotate: true,
        // stop spinning when drag starts
        onDragStart: function () {
          isSpinning = false
        }
      })

      // circle
      new Zdog.Ellipse({
        addTo: illo,
        diameter: 80,
        translate: { z: 40 },
        stroke: 20,
        color: '#636'
      })

      // square
      new Zdog.Rect({
        addTo: illo,
        width: 80,
        height: 80,
        translate: { z: -40 },
        stroke: 12,
        color: '#E62',
        fill: true
      })

      function animate() {
        illo.rotate.y += isSpinning ? 0.03 : 0
        illo.updateRenderGraph()
        requestAnimationFrame(animate)
      }

      animate()
    },
    init2Zdog() {
      // Made with Zdog

      const TAU = Zdog.TAU
      const offWhite = '#FED'
      const gold = '#EA0'
      const garnet = '#C25'
      const eggplant = '#636'

      const illo = new Zdog.Illustration({
        element: '.zdog-canvas2',
        zoom: 5,
        rotate: { y: -TAU / 8 },
        dragRotate: true
      })

      // ----- model ----- //

      var hipX = 3
      // hips
      var hips = new Zdog.Shape({
        addTo: illo,
        path: [{ x: -hipX }, { x: hipX }],
        translate: { y: 2 },
        stroke: 4,
        color: eggplant
      })

      // ----- legs ----- //

      var leg = new Zdog.Shape({
        addTo: hips,
        path: [{ y: 0 }, { y: 12 }],
        translate: { x: -hipX },
        rotate: { x: TAU / 4 },
        color: eggplant,
        stroke: 4
      })

      // foot
      var foot = new Zdog.RoundedRect({
        addTo: leg,
        width: 2,
        height: 4,
        cornerRadius: 1,
        translate: { y: 14, z: 2 },
        rotate: { x: TAU / 4 },
        color: garnet,
        fill: true,
        stroke: 4
      })

      var standLeg = leg.copy({
        translate: { x: hipX },
        rotate: { x: -TAU / 8 }
      })

      foot.copy({
        addTo: standLeg,
        rotate: { x: -TAU / 8 }
      })

      // ----- upper body ----- //

      var spine = new Zdog.Anchor({
        addTo: hips,
        rotate: { x: TAU / 8 }
      })

      var chest = new Zdog.Shape({
        addTo: spine,
        path: [{ x: -1.5 }, { x: 1.5 }],
        translate: { y: -6.5 },
        stroke: 9,
        color: garnet
      })

      var head = new Zdog.Shape({
        addTo: chest,
        stroke: 12,
        translate: { y: -9.5 },
        color: gold
      })

      var eye = new Zdog.Ellipse({
        addTo: head,
        diameter: 2,
        quarters: 2,
        translate: { x: -2, y: 1, z: 4.5 },
        rotate: { z: -TAU / 4 },
        color: eggplant,
        stroke: 0.5,
        backface: false
      })
      eye.copy({
        translate: { x: 2, y: 1, z: 4.5 }
      })
      // smile
      new Zdog.Ellipse({
        addTo: head,
        diameter: 3,
        quarters: 2,
        translate: { y: 2.5, z: 4.5 },
        rotate: { z: TAU / 4 },
        closed: true,
        color: '#FED',
        stroke: 0.5,
        fill: true,
        backface: false
      })

      // ----- arms ----- //

      var armSize = 6

      // arm on left
      var upperArm = new Zdog.Shape({
        addTo: chest,
        path: [{ y: 0 }, { y: armSize }],
        translate: { x: -5, y: -2 },
        rotate: { x: -TAU / 4 },
        color: eggplant,
        stroke: 4
      })

      var forearm = new Zdog.Shape({
        addTo: upperArm,
        path: [{ y: 0 }, { y: armSize }],
        translate: { y: armSize },
        rotate: { x: TAU / 8 },
        color: gold,
        stroke: 4
      })

      // hand
      new Zdog.Shape({
        addTo: forearm,
        translate: { z: 1, y: armSize },
        stroke: 6,
        color: gold
      })

      // arm on right
      upperArm.copyGraph({
        translate: { x: 5, y: -2 },
        rotate: { x: TAU / 4 }
      })

      function animate() {
        illo.updateRenderGraph()
        requestAnimationFrame(animate)
      }

      animate()
    },
    init3Zdog() {
      // Made with Zdog

      var yellow = '#ED0'
      var gold = '#EA0'
      var orange = '#E62'
      var garnet = '#C25'
      var eggplant = '#636'
      const TAU = Zdog.TAU

      var illo = new Zdog.Illustration({
        element: '.zdog-canvas3',
        dragRotate: true
      })

      var eyeGroup = new Zdog.Group({
        addTo: illo,
        translate: { z: 20 }
      })

      // eye white
      new Zdog.Ellipse({
        addTo: eyeGroup,
        width: 160,
        height: 80,
        stroke: 8,
        fill: true,
        color: 'white'
      })

      var iris = new Zdog.Ellipse({
        addTo: eyeGroup,
        diameter: 70,
        stroke: 8,
        fill: true,
        color: gold
      })
      // pupil
      iris.copy({
        diameter: 40,
        color: eggplant
      })
      // highlight
      iris.copy({
        diameter: 30,
        translate: { x: 15, y: -15 },
        color: 'white'
      })

      function animate() {
        illo.updateRenderGraph()
        requestAnimationFrame(animate)
      }

      animate()
    }
  },
  mounted() {
    this.initZdog()
    this.init2Zdog()
    this.init3Zdog()
  }
}
</script>

<style lang="scss" scoped>
.zdog-page {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 480px 480px 480px;
  grid-auto-rows: 480px 480px 480px;
}
.zdog-canvas3 {
  background: #fdb;
  cursor: move;
}
.zdog-canvas {
  background: #fdb;
  cursor: move;
}
.item {
  border: 1px solid #efefef;
}
</style>