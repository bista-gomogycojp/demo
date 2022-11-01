<template>
  <div v-if="query">
    <table class="w-full" v-if="state.items.length >1">
      <draggable v-model="state.items" item-key="id" class="grid sm:gap-1 sm:grid-cols-3 lg:gap-2 lg:grid-cols-5">
        <template #item="{ element, index }" :key="index">
          <div class="pop-search-td">
            <a :href="element.url" target="_blank" :title="element.title">
              {{ element.title }}
            </a>
          </div>
        </template>
      </draggable>
    </table>
    <div v-else class="text-center">{{ textNoResult }}</div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {reactive, ref, watch, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import axios from "../../plugins/axios";

export default {
  name: "DragSearchPopUp",
  components: {draggable},
  setup() {
    const query = ref();
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const textNoResult = computed(() => {
          return `いつも当サイトをご覧頂きありがとうございます。「${query.value}」で検索しましたがページが見つかりませんでした。`
        }
    )
    const state = reactive({
      items: [],
    })
    const listItem = computed(() => store.getters.getItems)
    watch(
        () => route.query.q,
        async (q) => {
          if (q) {
            query.value = q
            handeSearch(q)
          } else {
            store.commit("setIsLoading", false);
            router.push({
              name: route.name,
            });
          }
        }
    )

    async function handeSearch(q) {
      query.value = q.trim()
      if (route.name === 'user') {
        state.items = listItem.value.filter(item => {
          return item.title.toLowerCase().includes(query.value.toLowerCase())
        })
        store.commit("setIsLoading", false);
      } else {
        const {data} = await axios.get(`/list?search=` + query.value);
        state.items = data.results;
        store.commit("setIsLoading", false);
      }
    }

    return {state, textNoResult, query}
  }
}
</script>

<style scoped>

</style>