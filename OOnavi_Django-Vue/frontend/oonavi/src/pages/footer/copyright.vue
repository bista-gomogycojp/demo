<template>
  <div class="flex w-full h-full">
    <div class="set-head">
      <section class="about-section-head body-font">
        <div class="copy-right-section-head" v-for="(item,i) in list" :key="i">
          <h1 class="about-section-h1">{{ item.title }}</h1>
          <div class="copy-section-content">
            <ol class="copy-right-ol">
              <li class="ol-li-one" v-for="(text,k) in item.content_one" :key="k">
                {{ text }}
              </li>
              <li>{{ item.content_two }}</li>
            </ol>
            <ol class="ol-li-two set-mt">
              <li v-for="(content,j) in item.content_three" :key="j">
                {{ content }}
              </li>
            </ol>
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
        'title': '免責事項',
        'content_one': config.copyright_content_one,
        'content_two': config.copyright_content_two,
        'content_three': config.copyright_content_three
      }
    ])
    return {list}
  }
}
</script>

<style>
.set-mt {
  margin-top: 1px;
}
</style>