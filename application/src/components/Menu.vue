<template>
  <div v-if="!hidden" class="menu">
    <div>
      <div class="title">
        <h1>
          <span class="red-color">S</span><span class="blue-color">U</span><span class="yellow-color">P</span><span class="blue-color">E</span><span class="green-color">R</span> 
          <span class="green-color">M</span><span class="blue-color">A</span><span class="yellow-color">R</span><span class="red-color">I</span><span class="green-color">O</span>
        </h1>
        <h1>
          <span class="yellow-color">G</span><span class="blue-color">A</span><span class="green-color">M</span><span class="red-color">E</span>
        </h1>
      </div>

      <div v-if="scoreCounter > 0" class="menuScoreCounter">YOUR SCORE: {{scoreCounter}}</div>

      <div class="action-buttons">
        <button @click="startGameCallBack" class="start-button">{{scoreCounter == 0 ? 'START GAME' : 'TRY AGAIN'}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      scoreCounter: {
        type: Number,
        required: true
      },

      startGameCallBack: {
        type: Function,
        required: true
      },

      hidden: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss">
  .menu {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .menuScoreCounter {
      position: initial;
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: #FFFFFF;
    }

    .title {
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