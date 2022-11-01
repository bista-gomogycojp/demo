<template>
  <div v-if="isSettingIconOpen">
    <section class="pop-search-header" @click="closeModal"></section>
    <div class="ab-pop">
      <div class="fx-h">
        <div class="form-head lg:w-11/12 sm:w-full">
          <setting-logo @closeModalAndSave="closeModalAndSave" :logo="listLogo" @reset="reset"/>
          <hr>
          <setting-footer @closeModal="closeModal"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { computed, toRef } from "vue"
import { useStore } from "vuex"
import { useRouter, useRoute } from "vue-router";
import SettingLogo from "./element/SettingLogo";
import SettingFooter from "./element/SettingFooter";

export default {
  name: "SettingIconPopUp",
  components: {SettingFooter, SettingLogo},
  props: {
    logo: Object,
  },
  emits: ["closeTableLogo", "resetLogo"],
  setup(props, {emit}) {
    const store = useStore()
    const isSettingIconOpen = computed(() => store.state.isSettingIconOpen)
    const listLogo = toRef(props, "logo");
    const router = useRouter();
    const route = useRoute();

    const closeModalAndSave = (data) => {
      emit("closeTableLogo", data);
    }


    const reset = (data) => {
      emit("resetLogo", data);
    }

    const closeModal = () => {
      router.push({
        name: route.name,
      });
      store.commit("setSettingIconModal", false)
    }

    return {isSettingIconOpen, closeModalAndSave , closeModal, listLogo, reset}
  }
}
</script>

<style scoped>

</style>
