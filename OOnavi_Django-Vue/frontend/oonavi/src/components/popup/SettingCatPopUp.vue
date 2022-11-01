<template>
  <div v-if="isSettingCatOpen">
    <section class="pop-search-header" @click="closeModal"></section>
    <div class="ab-pop">
      <div class="fx-h">
        <div class="form-head lg:w-11/12 sm:w-full">
          <setting-logo @closeModalAndSave="closeModalAndSave"/>
          <hr>
          <setting-footer @closeModal="closeModal"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router";
import SettingLogo from "./element/SettingLogo";
import SettingFooter from "./element/SettingFooter";

export default {
  name: "SettingCatPopUp",
  components: {SettingFooter, SettingLogo},

  emits: ["closeTableLogo"],
  setup(props, {emit}) {
    const store = useStore()
    const isSettingCatOpen = computed(() => store.state.isSettingCatOpen)

    const router = useRouter();
    const route = useRoute();

    const closeModalAndSave = (data) => {
      emit("closeTableLogo", data);
    }

    const closeModal = () => {
      router.push({
        name: route.name,
      });
      store.commit("setSettingCatModal", false)
    }

    return {isSettingCatOpen, closeModalAndSave , closeModal}
  }
}
</script>

<style scoped>

</style>
