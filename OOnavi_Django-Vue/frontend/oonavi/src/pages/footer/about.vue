<template>
  <div class="flex w-full h-auto">
    <div class="about-head">
      <section class="about-section-head body-font">
        <div class="px-5 py-20" v-for="(item,i) in list" :key="i">
          <h1 class="about-section-h1">{{ item.title }}</h1>
          <div class="about-section-content">
            <p class="about-section-p" v-html="item.content"></p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import config from "../../utilities/content/config";

export default {
  name: "about",
  setup() {
    const list = ref([
      {
        'title': 'マルマルナビについて',
        'content': config.about
      }
    ])
    return {list}
  }
}
</script>

<style>

</style>