<template>
  <div class="game-background">
    <div class="count">SCORE: {{counter}}</div>

    <div class="game-area">
      <img ref="character" src="../assets/mario.gif" class="character">
      <img ref="block" src="../assets/goomba.gif" class="block">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0,
      level: 1,
      oldLevel: 1
    }
  },

  mounted() {
    this.checkGameState()
    this.keydownListener()
  },

  updated() {
    this.updateLevel()
    if (this.level != this.oldLevel) {
      this.updateAnimationSpeed()

      this.oldLevel = this.level
    }
  },

  methods: {
    checkGameState() {
      setInterval((() => {
        const blockXPosition = this.getPosition(this.$refs.block).xPos;

        if  (blockXPosition > 200 && blockXPosition < 300 && this.getPosition(this.$refs.character).yPos > 570 ) {
          console.log(blockXPosition)
          this.$refs.block.style.animation = 'none'

          alert(`Game Over. score:  ${this.counter}`)

          this.counter = 0
      } else {
        this.counter++

        this.updateLevel()
      }
      }).bind(this), 15)
    },

    keydownListener() {
      window.addEventListener('keydown', event => {
        if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) {
          this.characterJump()
        }
      }); 
    },

    characterJump() {
      if (this.$refs.character.classList == 'jump') return
      
      this.$refs.character.classList.add('jump')

      setTimeout(() => {
        this.$refs.character.classList.remove('jump')
      }, 300)
    },

    updateLevel() {
      if (this.counter > 1000) {
        this.level = 2;
      } else if (this.counter > 2000) {
        this.level = 3;
      } else if (this.counter > 3000) {
        this.level = 4;
      }
    },

    updateAnimationSpeed() {
      let speed = 0;

      if (this.level == 1) {
        speed = 3;
      } else if (this.level == 2) {
        speed = 2.5;
      } else if (this.level == 3) {
        speed = 2;
      } else if (this.level == 4) {
        speed = 1.5
      }
      
      const interval = setInterval((() => {
        if (this.getPosition(this.$refs.block).xPos > -100) return;

        this.$refs.block.style.animationDuration = `${speed}s`

        clearInterval(interval)
      }).bind(interval), 5)
    },

    getPosition(element) {
      return {
        xPos: element.offsetLeft - element.scrollLeft + element.clientLeft,
        yPos: element.offsetTop - element.scrollTop + element.clientTop
      }
    }
  }
}
</script>
<style lang="scss">
  $groundWidth: 320px; 
  $groundHeight: 111px;
  $mountainsWidth: 931px;

  .game-background {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-image:
      url('../assets/ground.png'),
      url('../assets/sunny.png'),
      url('../assets/mountains.png'),
      url('../assets/clouds.png');
    background-repeat:
      repeat-x,
      no-repeat,
      repeat-x,
      repeat-x;
    background-position:
      left 0px bottom 0px,
      right 0px top 0px,
      left 0px bottom 0px,
      left 0px bottom 0px;
    animation: back 2s infinite linear;

    .count {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      left: auto;
      font-size: 1.5rem;
      font-weight: bold;
      color: #FFFFFF;
    }

    .game-area {
      width: 100%;
      height: 300px;
      margin-top: 7rem;

      .character {
        width: 130px;
        position: relative;
        top: 282px;
        left: 200px;
      }

      .block {
        width: 65px;
        position: relative;
        top: 285px;
        left: 100%;
        animation: block 3s infinite linear;
      }

      .jump {
        animation: jump 400ms infinite;
        animation-timing-function: ease;
      }
    }
  }

  @keyframes jump {
    0% { top: 275px; }
    10% { top: 200px; }
    20% { top: 180px; }
    30% { top: 180px; }  
    97% { top: 200px; }
    100%{ top: 275px; }
  }

  @keyframes block {
    0% { 
      left: 100%;
    }
    100% { 
      left: -1000px;
    }
  }

  @keyframes back {
    0% {
      background-position:
        left 0px bottom 0px,
        right 2rem top 3rem,
        left 0px bottom 
        $groundHeight,
        left 0 top 5rem;
    }
    50% {
      background-position:
        left (-($groundWidth * 12)) bottom 0px,
        right 4rem top 5rem,
        left (-($mountainsWidth * 0.5)) bottom 
        $groundHeight - 3,
        left 0 top 8rem;
    }
    100% {
      background-position:
        left (-($groundWidth * 24)) bottom 0px,
        right 2rem top 3rem,
        left (-($mountainsWidth * 1)) bottom 
        $groundHeight,
        left 0 top 5rem;
    }
  }
</style>