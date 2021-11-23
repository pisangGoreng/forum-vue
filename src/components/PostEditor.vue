<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          v-model="text"
          rows="10"
          name=""
          id=""
          cols="30"
          class="form-input"
        />
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    save() {
      const post = {
        text: this.text
      }

      this.$emit('save', { post }) // this.$emit('nama_event', payload)
      // ! send payload to parent component with emit some event
      // ! im parent component, we can receive event listeners with $nama_event

      this.text = ''
    }
  }
}
</script>

<style></style>
