<template>
  <template v-for="(item,i) in listLogo" :key="i">
    <router-link to="/user"  v-if="isLoggedIn">
      <img :class="item.class" :src="item.src" alt="Oonavi"/>
    </router-link>

    <router-link to="/" v-else>
      <img :class="item.class" :src="item.src" alt="Oonavi"/>
    </router-link>

  </template>
</template>
<script>
import { useStore } from "vuex";
import  {computed, ref} from "vue"
export default {
  name: "logo-menu",
  setup(){
    const store = useStore();
    const isLoggedIn = computed(()=>store.getters.isLogin)
    const listLogo = ref([
      {type:'mobi',src: "/images/oonavi-logo.jpg",class:'img-logo-mobi'},
      {type:'desktop',src: "/images/oonavi-logo.jpg",class:'img-logo'},
    ])
    return { isLoggedIn, listLogo }
  }
};
</script>

<style></style>
