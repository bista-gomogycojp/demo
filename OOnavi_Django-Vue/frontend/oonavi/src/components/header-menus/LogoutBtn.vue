<template>
  <div>
    <a @click="showModal" class="btn-in-out">
      <IconButton :icon="getIcon"/>
      {{ getBtn }}
    </a>
    <a-modal
        :visible="visible"
        :confirm-loading="confirmLoading"
        ok-text="ログアウト"
        cancel-text="キャンセル"
        @ok="handleLogout"
        @cancel="handleCancel"
    >
      <p class="text-base">本当にログアウトしますか？ <span class="text-sm text-gray-500">{{ getTimeSecond }}</span></p>
    </a-modal>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {notification_success} from '../../utilities/composition/useNotification';
import {useRouter} from 'vue-router'
import {notification} from "ant-design-vue"
import IconButton from './IconButton'
import {computed,ref} from 'vue'

export default {
  components: {IconButton},
  setup() {
    const store = useStore()
    const router = useRouter()

    const getIcon = computed(() => 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1')
    const getBtn = computed(() => 'ログアウト')
    const showTime = ref(5)
    const totalSeconds = ref(5)
    const clearTime = ref()
    const getTimeSecond = computed(() => `${showTime.value} 秒` )



    const visible = ref(false);
    const confirmLoading = ref(false);

    async function handleLogout() {
      clearInterval(clearTime.value)
      await store.dispatch("actLogout").then(() => {
        store.commit("setMobileModal", false)
        store.commit("setDarkModal", false)
        store.commit("setIsLoggedIn", false)
        notification_success(notification, '正常にログアウトしました。')
        router.push("/")
      })
    }

    function showModal() {
      visible.value = true;
      clearTime.value = setInterval(() =>{
        showTime.value = totalSeconds.value - 1
        totalSeconds.value--;
        if(totalSeconds.value === -1){
          handleLogout()
        }

      }, 1000);
    }

    function handleCancel(e) {
      clearInterval(clearTime.value)
      totalSeconds.value = 5
      showTime.value = 5
      visible.value = false;
    }

    return {handleLogout, getIcon, getBtn,visible,confirmLoading,showModal,handleCancel, getTimeSecond}
  },
}
</script>