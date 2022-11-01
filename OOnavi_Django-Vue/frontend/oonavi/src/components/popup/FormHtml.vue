<template>
  <div class="form-head lg:w-1/2 xl:w-1/3 w-5/6" id="click" @keyup.enter="handleSubmit" tabindex="0">
    <div class="close text-gray-500" @click="closeModal" title="閉じる">
      <IconButton :icon="closeIcon"/>
    </div>
    <form class="p-2 my-2">
      <div class="form-content">
        <h1 class="form-title">{{ title }}</h1>
        <template v-for="(item,index) in ElmForm" :key="index">
          <div class="mb-4" v-if="item.level[0] === level || item.level[1] === level || item.level[2] === level">
            <label class="form-label" :for="item.name" v-if="!item.icon">
              {{ item.label }}
            </label>
            <div class="flex" v-else>
              <label class="form-label" :for="item.name">
                {{ item.label }}
              </label>
              <span aria-label="eyes" class="inline-block mt-1 cursor-pointer">
                <IconButton
                    @click="show = !show"
                    v-if="item.level[0] === level || item.level[1] === level"
                    :icon="iconElm[1].eyesOn"
                    iconEyes="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    :showClass="{ hidden: !show, block: show }"
                />
                <IconButton
                    @click="show = !show"
                    :icon="iconElm[0].eyesOff"
                    iconEyes="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    :showClass="{ block: !show, hidden: show }"
                />
              </span>
            </div>
            <input
                class="form-input"
                @change="handleChangeVal(item)"
                :id="item.name"
                :name="item.name"
                :type="item.type === 'password' ? show ? 'password' : 'text' : item.type"
                v-model="item.input"
                :autocomplete="item.saveUser"
                required
                :placeholder="item.placeholder"
            />
            <p v-if="!item.input  && item.note" class="form-input-note">
              {{ item.note }}
            </p>
          </div>
        </template>
        <KeepLogin :level="level" :name="keepLogin[0].name" :class="keepLogin[0].class" :val="keepLogin[0].value"
                   :label="keepLogin[0].label" @toggleAutoSave="toggleAutoSave"/>
        <ButtonElement  @handleSubmit="handleSubmit" :level="level" :loading="isLoading" :button="button"/>
      </div>
    </form>
  </div>
</template>

<script>
import {ref, toRef, computed} from "vue"
import {useStore} from "vuex"
import {useRouter} from 'vue-router'
import {notification} from "ant-design-vue"
import {setHandleSubmit} from "../../utilities/helps/setHandleSubmit";
import IconButton from "../header-menus/IconButton";
import IconLoading from "./IconLoading";
import KeepLogin from "../elements/KeepLogin";
import ButtonElement from "../elements/ButtonElement";

export default {
  name: "FormHtml",
  components: {ButtonElement, KeepLogin, IconLoading, IconButton},
  emits: ["close"],
  props: {
    title: String,
    button: String,
    level: Number
  },
  setup(props,{emit}) {
    const router = useRouter()
    const show = ref(true)
    const isLoading = ref(false)
    const title = toRef(props, "title");
    const button = toRef(props, "button");
    const level = toRef(props, "level");
    const store = useStore()
    const username = ref('')
    const password = ref('')
    const code = ref('')
    const confirm_password = ref('')
    const email = ref('')
    const message = ref('')
    const autoSave = ref(false)
    const times = ref(1)
    const closeIcon = computed(() => 'M6 18L18 6M6 6l12 12')

    const getUserName = computed(() => {
      const storeUser = localStorage.getItem('saveAccount');
      if (storeUser) {
        const returnParse = JSON.parse(storeUser)
        return username.value = returnParse.user_name
      }
    })
    const getPassword = computed(() => {
      const storeUser = localStorage.getItem('saveAccount');
      if (storeUser) {
        const returnParse = JSON.parse(storeUser)
        return password.value = returnParse.password
      }
    })
    const getAutoSaveBtn = computed(() => {
      const autoSaveBtn = localStorage.getItem('autoSaveBtn');
      if(autoSaveBtn) return  autoSave.value = true
      return  autoSave.value = false;
    })

    const iconElm = ref([
      {
        'eyesOff': 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02\n' +
            '                    8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88L6.59 6.59m7.532 7.532l3.29\n' +
            '                    3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132\n' +
            '                    5.411m0 0L21 21'
      },
      {
        'eyesOn': 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
      }

    ])
    const keepLogin = ref([
      {
        'label': 'ログインしたままにする'
      }
    ])
    const ElmForm = ref([
      {
        'label': 'ユーザー名',
        'name': 'username',
        'input': getUserName.value ? getUserName.value : username,
        'type': 'username',
        'icon': false,
        'note': '',
        'placeholder': 'ユーザー名を入力してください。',
        'saveUser': getAutoSaveBtn.value,
        'level': [1, 2]

      },
      {
        'label': 'メールアドレス',
        'name': 'email',
        'input': email,
        'type': 'email',
        'icon': false,
        'note': '',
        'placeholder': 'メールアドレを入力してください。',
        'saveUser': false,
        'level': [1, 3]
      },
      {
        'label': 'コード',
        'name': 'code',
        'input': code,
        'type': 'text',
        'icon': false,
        'note': '',
        'placeholder': 'コードを入力してください。',
        'saveUser': false,
        'level': [4]
      },
      {
        'label': 'パスワード',
        'name': 'password',
        'input': getPassword.value ? getPassword.value : password,
        'type': 'password',
        'icon': true,
        'note': (level.value === 1 || level.value === 4) ? '最小8文字、1つの数字、および1つの特殊文字が必要です。' : 'パスワードを入力してください。',
        'placeholder': (level.value === 1 || level.value === 4) ? 'パスワードを入力してください。' : '****************',
        'saveUser': getAutoSaveBtn.value,
        'level': [1, 2, 4]
      },
      {
        'label': 'パスワード（確認用）',
        'name': 'confirm-password',
        'input': confirm_password,
        'type': 'password',
        'icon': false,
        'note': 'もう一度パスワードを入力してください。',
        'placeholder': '****************',
        'saveUser': false,
        'level': [1, 4]
      },


    ])
    function closeModal() {
      emit("close");
    }

    function handleChangeVal(data) {
      if (data.name === 'username') {
        username.value = data.input
      }
      if (data.name === 'password') {
        password.value = data.input
      }
    }


    function toggleAutoSave(data) {
      autoSave.value = data
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
      const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
      return re.test(String(password));
    }

    function handleSubmit(e) {
      e.preventDefault();
      setHandleSubmit(isLoading.value, autoSave, password, confirm_password, notification,
          username, email, validateEmail, validatePassword,
          store, message.value, level.value, times, code, router
      )
    }

    return {
      level,
      title,
      button,
      show,
      email,
      confirm_password,
      password,
      username,
      isLoading,
      handleSubmit,
      handleChangeVal,
      toggleAutoSave,
      closeModal,
      closeIcon,
      iconElm,
      keepLogin,
      ElmForm
    }
  },
}
</script>

<style scoped>

</style>
