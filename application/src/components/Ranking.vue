<template>
  <div class="ranking">
    <div class="item header">
      <p><b>#</b></p>
      <p><b>Name</b></p>
      <p><b>Score</b></p>
    </div>

    <div v-for="(data, index) in rankingData" :key="data._id">
      <div class="item">
        <p><b>{{index + 1}}</b></p>
        <p>{{data.fullName}}</p>
        <p>{{data.score}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import httpRequest from '../helpers/httpRequest'

export default {
  data() {
    return {
      isDataFetched: false,
      rankingData: []
    }
  },
  mounted() {
    httpRequest.getAsync('ranking', {}, this.showRankingItems)
  },

  methods: {
    showRankingItems(data) {
      this.isDataFetched = true
      this.rankingData = data
    }
  }
}
</script>
<style lang="scss">
  .ranking {
    background-color: #ffffff61;
    border-radius: 0.5rem;
    height: 20rem;
    overflow-x: scroll;
  }

  .item {
    display: grid;
    grid-template-columns: 10% 50% 40%;
    padding: 1rem;
    color: #1A1A1A;
    font-size: 1.5rem;
    text-align: center;
  }
</style>