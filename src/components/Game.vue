<template>
  <div class="game-background">
    <div class="counter" :class="!started && 'hidden'">SCORE: {{counter}}</div>

    <div class="main-section" :class="started && 'hidden'">
      <div>
        <div class="game-title">
          <h1>
            <span class="red-color">S</span><span class="blue-color">U</span><span class="yellow-color">P</span><span class="blue-color">E</span><span class="green-color">R</span> 
            <span class="green-color">M</span><span class="blue-color">A</span><span class="yellow-color">R</span><span class="red-color">I</span><span class="green-color">O</span>
          </h1>
          <h1>
            <span class="yellow-color">G</span><span class="blue-color">A</span><span class="green-color">M</span><span class="red-color">E</span>
          </h1>
        </div>

        <div v-if="counter > 0" class="counter">YOUR SCORE: {{counter}}</div>

        <div class="action-buttons">
          <button @click="startGame" class="start-button">{{counter == 0 ? 'START GAME' : 'TRY AGAIN'}}</button>
          <button v-if="counter > 0" class="ranking-button">SAVE RESULT</button>
          <button class="ranking-button">RANKING</button>
        </div>
      </div>
    </div>

    <div class="game-area">
      <img ref="character" src="../assets/gifs/mario.gif" class="character" :class="started && 'started'">
      <img ref="block" src="../assets/gifs/goomba.gif" class="block" :class="started && 'started'">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0,
      level: 1,
      oldLevel: 1,
      started: false
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
        if (!this.started) return

        const blockXPosition = this.getPosition(this.$refs.block).xPos;

        if  (blockXPosition > 200 && blockXPosition < 300 && this.getPosition(this.$refs.character).yPos > 570 ) {
          this.started = false
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
      if (!this.started || this.$refs.character.classList == 'jump') return
      
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
        speed = 1
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
    },

    startGame() {
      this.$refs.block.style.animation = 'none'
      this.started = true;
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
      url('../assets/images/ground.png'),
      url('../assets/images/sunny.png'),
      url('../assets/images/mountains.png'),
      url('../assets/images/clouds.png');
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

    .counter {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      left: auto;
      font-size: 1.5rem;
      font-weight: bold;
      color: #FFFFFF;
    }

    .main-section {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;

      .counter {
        position: initial;
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        font-size: 1.6rem;
      }

      .game-title {
        margin-top: 5rem;

        h1 span {
          font-family: 'Super Mario 256', Arial, sans-serif;
         -webkit-text-stroke: 2px #000000;
        }

        h1 {
          text-align: center;
          font-size: 4rem;
        }

        h1:last-child {
          font-size: 10rem;
        }
      }

      button {
        background-color: transparent;
        border: none;
        color: #FFFFFF;
        font-size: 2.2rem;
        font-weight: bolder;
        margin-top: 1rem;
        text-align: center;
        width: 100%;
        height: 3.5rem;

        &:hover, &:active, &:focus {
          background-color: #FFFFFF;
          color: #00DDFF;
          font-size: 2.2rem;
          font-weight: bolder;
          width: 100%;
          border: none;
          border-radius: 0.5rem;
          box-shadow: 1px 3px 6px 0px rgba(60, 60, 60, 0.74);
        }
      }
    }

    .game-area {
      width: 100%;
      height: 300px;
      margin-top: 7rem;

      .character {
        width: 130px;
        position: relative;
        top: 282px;
        left: -200px;
      }

      .block {
        width: 65px;
        position: relative;
        top: 285px;
        left: 100%;
        animation: block 5s 1 linear;
      }

      .jump {
        animation: jump 400ms infinite;
        animation-timing-function: ease;
      }

      .block.started {
        animation: block 3s infinite linear !important;
      }

      .character.started {
        left: 200px;
        transition: left 1s;
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
        left 0px bottom $groundHeight,
        left 0 top 5rem;
    }
    50% {
      background-position:
        left (-($groundWidth * 12)) bottom 0px,
        right 4rem top 5rem,
        left (-($mountainsWidth * 0.5)) bottom 50px,
        left 0 top 8rem;
    }
    100% {
      background-position:
        left (-($groundWidth * 24)) bottom 0px,
        right 2rem top 3rem,
        left (-($mountainsWidth * 1)) bottom $groundHeight,
        left 0 top 5rem;
    }
  }

  .red-color {
    color: #FF0225;
  }

  .blue-color {
    color: #00DDFF;
  }

  .yellow-color {
    color: #FFC600;
  }

  .green-color {
    color: #00D000;
  }
</style>