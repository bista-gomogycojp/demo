<template>
  <a :href="getUrl" :title="getTitle" target="_blank" v-if="getImage">
    <img :src="getImage" :alt="getTitle" class="w-28 h-auto"/>
  </a>
  <a :href="getUrl" :title="getTitle" target="_blank" v-else>{{ getTitle }}</a>
</template>

<script>
import {toRef} from 'vue';

export default {
  name: "LogoElement",
  props: {
    title: String,
    url: String,
    image: String,
  },
  setup(props) {
    const getTitle = toRef(props, 'title')
    const getUrl = toRef(props, 'url')
    const getImage = toRef(props, 'image')

    return {close, getTitle, getUrl, getImage}
  }
}
</script>

<style scoped>

</style>