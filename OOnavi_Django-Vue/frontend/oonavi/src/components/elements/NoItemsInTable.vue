<template>
  <tr v-for="(val, key) in placeholders" :key="key" class="table-tr" >
    <td class="none-cat"></td>
    <td v-for="(item, i) in placeholders[0].data" :key="i" class="table-content-td">
      <a class="none-cat-item"></a>
    </td>
  </tr>
</template>

<script>
import { range } from "lodash";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const placeCaregory = range(10).fill({});
    const placeItems = range(5).fill({});
    const placeholders = ref([]);
    onMounted(() => {
      placeholders.value = placeCaregory.map((category) => ({
        ...category,
        data: placeItems
          .slice(0, 5),
      }));
    });
    return { placeholders };
  },
};
</script>

<style></style>
