<template>
  <div v-if="query">
    <table class="w-full" v-if="state.items.length >1">
      <draggable v-model="state.items" item-key="title" :id="`category-${query}`" class="grid sm:gap-1 sm:grid-cols-3 lg:gap-2 lg:grid-cols-5"
                 @end="end">
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
import {handleDragPop} from "../../utilities/helps/handleDragPop";


export default {
  name: "DragItemPopUp",
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

    watch(
        () => route.query.g,
        async (id) => {
          if (id) {
            const getId = parseInt(id);
            query.value = getId
            const listItems = store.getters.getItems
                .filter((item) => getId === item.category)
                .sort((a, b) => a.place - b.place)
            if (listItems.length) {
              state.items = listItems
              store.commit("setIsLoading", false);
            } else {
              state.items = []
              store.commit("setIsLoading", false);
            }
          } else {
            router.push({
              name: route.name,
            });
            store.commit("setIsLoading", false);
          }
        }
    )

    async function end(e) {
      await handleDragPop(e,state.items, store);
    }

    return {state, textNoResult, query, end}
  }
}
</script>

<style scoped>

</style>