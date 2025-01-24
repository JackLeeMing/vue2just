<template>
  <div class="card-page"
       :style="{height: `${Math.ceil(total / 2) * 200 + 44}px`}">
    <div v-for="(card, i) in cards"
         :key="card.id"
         class="card"
         :style="open ? cardStyleOpen(i,card) : cardStyle(i,card)"
         @click="onCardClick(card)">
      <span v-show="card.isCardFlipped"
            class="card-rotate">你猜🤣</span>
      <span v-show="!card.isCardFlipped"
            class="card-content">
        {{card.content}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          content: '卡片1',
          isCardFlipped: false
        },
        {
          id: 2,
          content: '卡片2',
          isCardFlipped: false
        },
        {
          id: 3,
          content: '卡片3',
          isCardFlipped: false
        },
        {
          id: 4,
          content: '卡片4',
          isCardFlipped: false
        },
        {
          id: 5,
          content: '卡片5',
          isCardFlipped: false
        },
        {
          id: 6,
          content: '卡片6',
          isCardFlipped: false
        }
      ],
      open: false
    }
  },
  computed: {
    total() {
      const cards = this.cards
      return cards.length
    }
  },
  methods: {
    onCardClick(card) {
      if (card.id === 1) {
        this.open = !this.open
        return
      }
      if (this.open) {
        //  transform: `rotateY(${isCardFlipped ? 180 : 0}deg)`,
        card.isCardFlipped = !card.isCardFlipped
      }
    },
    cardStyle(cardItemIndex) {
      return {
        position: 'absolute',
        top: '0px',
        transformStyle: 'preserve-3d',
        boxShadow: 'rgba(0, 0, 0, 0.15) 3px 0px 6px -3px',
        height: '200px',
        transform: `translate(${cardItemIndex * 8}px, 0px) scale(1) rotateY(0)`,
        transitionDelay: `${((cardItemIndex > 6 ? 6 : cardItemIndex) / 60).toFixed(3)}s`,
        zIndex: this.total - cardItemIndex
      }
    },
    cardStyleOpen(cardItemIndex, card) {
      return {
        position: 'absolute',
        top: '0px',
        transformStyle: 'preserve-3d',
        boxShadow: 'rgba(0, 0, 0, 0.15) 3px 0px 6px -3px',
        height: '200px',
        transform: `translate(${(cardItemIndex % 2) * 100}%, ${
          Math.floor(cardItemIndex / 2) * 200
        }px) scale(0.95) rotateY(${card.isCardFlipped ? 180 : 0}deg)`,
        transitionDelay: `${((cardItemIndex > 6 ? 6 : cardItemIndex) / 60).toFixed(3)}s`,
        transformOrigin: '50% 50%',
        zIndex: this.total - cardItemIndex
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-page {
  position: absolute;
  width: 80%;
  height: 90%;
  background-color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}
.card {
  box-sizing: border-box;
  background-color: white;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  .card-rotate {
    transition: all 0.3s;
    transform: rotateY(180deg);
  }
  .card-content {
    transition: all 0.3s;
    &:hover {
      transform: scale(0.97);
    }
  }
}
</style>