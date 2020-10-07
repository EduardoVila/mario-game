<template>
    <div>
      <label for="fullname">Full name</label>
      <input ref="fullName" name="fullname" type="text" placeholder="Your full name here..">
      <button @click="saveResult">SAVE RESULT</button>
    </div>
</template>
<script>
import httpRequest from '../helpers/httpRequest'

export default {
  props: {
    score: {
      type: Number,
      required: true
    },
    onSave: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      errors: null
    }
  },

  methods: {
    saveResult() {
      const fields = {
        fullName: this.$refs.fullName.value,
        score: this.score
      }

      if (this.validator(fields)) return

      httpRequest.postAsync('ranking', fields, this.onSave)
    },

    validator (fields) {
      let errors = {}

      if (!fields.fullName) errors.fullNameValue = 'Full name is required'

      if (Object.keys(errors).length > 0) {
        this.errors = errors

        return errors
      }

      return
    }
  }
}
</script>
<style lang="scss">
    label {
      color: #FFFFFF;
      font-size: 1.4rem;
    }

    input {
      width: 100%;
      font-size: 1.2rem;
      padding: 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #FFFFFF71;
      color: #1A1A1A;
      margin-top: 0.2rem;
      margin-bottom: 1rem;
    }

    input::placeholder {
      color: #1A1A1A90;
    }
</style>