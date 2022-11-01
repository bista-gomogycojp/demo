<template>
  <div class="conf-head">{{ getTitle}}</div>
  <div class="block font-mono">
    <div class="conf-note">
      <div class="conf-note-font" v-for="(note,i) in ElmNote" :key="i">{{ note.name }}</div>
    </div>
    <div class="block my-4" v-for="(elm,i) in ElmForm" :key="i">
      <div class="conf-label w-15">{{ elm.label }}</div>
      <div class="conf-textarea" v-if="!elm.textarea">{{ elm.content }}</div>
      <textarea v-else disabled class="conf-content">{{ elm.content }}</textarea>
    </div>
  </div>
  <div class="conf-btn-head">
    <div v-for="(bt,i) in ElmButton" :key="i">
      <button
          @click="bt.event"
          :class="{'bg-indigo-500':bt.css,'border-gray-200':!bt.css,'hover:bg-indigo-600':bt.css, 'text-white':bt.css}"
          class="conf-btn">
        {{ bt.name }}
      </button>
    </div>
  </div>
</template>

<script>
import {ref, toRef, computed } from "vue"
import {useStore} from "vuex"
import {notification_error, notification_success} from "../../utilities/composition/useNotification";
import {notification} from "ant-design-vue"
export default {
  name: "ConfirmContact",
  props: {
    name: String,
    email: String,
    content: String,
    code: String,
  },
  emits: ["evtContact","evtSuccess"],
  setup(props, {emit}) {
    const store = useStore()
    const name = toRef(props, "name")
    const email = toRef(props, "email")
    const content = toRef(props, "content")
    const code = toRef(props, "code")
    const getTitle = computed(()=> '入力内容の確認')
    const ElmForm = ref([
      {
        'label': 'お名前',
        'content': name.value,
        'textarea': false,
      },
      {
        'label': 'メールアドレス',
        'content': email.value,
        'textarea': false,
      },
      {
        'label': 'お問合せ内容',
        'content': content.value,
        'textarea': true,
      },
    ])
    const ElmNote = ref([{'name': '入力内容をご確認の上、「送信する」を押してください。'}, {'name': '修正する場合は、「入力画面へ戻る」を押してください。'}])
    const ElmButton = ref([
      {'name': '入力画面へ戻る', 'event': handleContact, 'css': false},
      {'name': '送信する', 'event': handleSubmit, 'css': true},
    ])

    async function handleSubmit(e) {
      e.preventDefault();
      const data = {
        name: name.value,
        email: email.value,
        content: content.value,
        code: code.value,

      }
      await store.dispatch("actContactForm", data)
          .then((res) => {
            if (res.status) {
              notification_success(notification, 'ご入力いただいたメールアドレス宛に、お問い合わせの受付確認メールを自動送信いたしました。')
              emit("evtSuccess", {'isOpenContact':true,'isOpenConfirm':false,'valEmpty':''});
            } else {
              notification_error(notification, "メール送信に失敗しました。 内容を改めてご確認ください。")
            }
          })
    }

    function handleContact(e) {
      e.preventDefault();
      emit("evtContact", {'isOpenContact':true,'isOpenConfirm':false});
    }

    return { ElmForm, ElmButton, ElmNote, getTitle}
  }
}
</script>

<style scoped>

</style>