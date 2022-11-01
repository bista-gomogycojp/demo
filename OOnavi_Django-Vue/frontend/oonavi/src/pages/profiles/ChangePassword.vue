<template>
  <div class="change-pass" v-for="(elm,i) in ElmForm" :key="i">
    <label class="change-pass-label" :for="elm.id"> {{ elm.label }}
      <span aria-label="eyes" class="px-2" v-if="elm.icon">
          <IconButton
              @click="elm.event"
              icon="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943
              9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              iconEyes="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              :showClass="{ hidden: !elm.show, block: elm.show }"
          />
          <IconButton
              @click="elm.event"
              icon="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97
              9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88
              9.88L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112
              5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              :showClass="{ block: !elm.show, hidden: elm.show }"
          />
        </span>
    </label>
    <input
        autocomplete="on"
        :disabled="elm.disabled"
        :type="elm.type"
        :name="elm.id"
        :id="elm.id"
        v-model="elm.input"
        class="change-pass-inp"
        :placeholder="elm.placeholder"
    />
  </div>
  <save-button :new_password="get_new_password" :old_password="get_old_password"
               :confirm_password="get_confirm_password" type="change-password"/>
</template>

<script>
import SaveButton from "../../components/SaveButton.vue";
import {useStore} from "vuex"
import {ref} from "vue"
import IconButton from "../../components/header-menus/IconButton";

export default {
  components: {IconButton, SaveButton},
  setup() {
    const show = ref(true)
    const show_old = ref(true)
    const store = useStore()
    const getUserName = ref();
    const get_new_password = ref();
    const get_old_password = ref();
    const get_confirm_password = ref();
    const text_old = ref('password')
    const text_new = ref('password')
    const ElmForm = ref([
      {
        'label': '現在のパスワード',
        'input': get_old_password,
        'id': 'current-password',
        'event': evtShowOldPassword,
        'disabled': false,
        'type': text_old,
        'placeholder': '*****************',
        'show': show_old,
        'icon': true,

      },
      {
        'label': '新パスワード',
        'input': get_new_password,
        'id': 'new-password',
        'event': evtShowNewPassword,
        'disabled': false,
        'type': text_new,
        'placeholder': '*****************',
        'show': show,
        'icon': true,

      },
      {
        'label': '新パスワード（確認用）',
        'input': get_confirm_password,
        'id': 'confirm-password',
        'event': '',
        'disabled': false,
        'type': text_new,
        'placeholder': '*****************',
        'show': show,
        'icon': false,

      },

    ])

    function evtShowOldPassword() {
      text_old.value = show_old.value ? 'text' : 'password'
      return show_old.value = !show_old.value
    }

    function evtShowNewPassword() {
      text_new.value = show.value ? 'text' : 'password'
      return show.value = !show.value
    }

    const currentUser = store.getters.getCurrentUser

    if (currentUser) {
      getUserName.value = currentUser.user_name
    }

    return {ElmForm, show, show_old, getUserName, get_new_password, get_old_password, get_confirm_password}
  },
};
</script>

<style></style>
