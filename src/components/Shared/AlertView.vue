<template>
    <v-alert @input="onClose" :value="true" border="left" close-text="Close Alert" color="warning accent-4" dark dismissible>
       {{ text }}
    </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>
