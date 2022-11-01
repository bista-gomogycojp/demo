<template>
    <div class="cls-item-center justify-center" :id="`category-` + getCategory">
      <a :href="getUrl" class="table-content-a" :title="getTitle" :id="`place-` + getId"
         target="_blank">
        <span v-if="getTitle.length < 13">{{ getTitle }}</span>
        <span v-else>{{ getTitle.substring(0, 13) + ".." }}</span>
      </a>
    </div>
</template>

<script>
import {toRef} from 'vue';
export default {
  name: "CatItemColumn",
  props: {
    title: String,
    url: String,
    category: Number,
    id:Number,
  },
  setup(props){
    const getTitle = toRef(props, 'title')
    const getUrl = toRef(props, 'url')
    const getCategory = toRef(props, 'category')
    const getId = toRef(props, 'id')


    return { close, getTitle , getUrl, getCategory, getId }
  }
}
</script>

<style scoped>

</style>