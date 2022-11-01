<template>
  <div class="inquiry">
    <div class="set-head">
      <section class="inquiry-section body-font">
        <div class="px-5">
          <template v-if="isOpenContact">
            <div class="inquiry-title">
              <h1 class="inquiry-h1 title-font">{{ getTitle }}</h1>
              <p class="lg:w-2/3 inquiry-p">{{ getSubTitle }}</p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <template v-for="(elm,i) in ElmForm" :key="i">
                  <div class="p-2" :class="{'w-1/2':!elm.css, 'w-full':elm.css}">
                    <div class="relative" v-if="!elm.button">
                      <label :for="elm.id" class="inquiry-label">{{ elm.label }}<span
                          class="text-red-500">※</span></label>
                      <input v-if="!elm.textarea" type="text" :id="elm.id" :name="elm.id" v-model="elm.input"
                             class="inquiry-input leading-8">
                      <div v-else>
                        <textarea :id="elm.id" :name="elm.id" v-model="content"
                                  class="inquiry-input resize-none leading-6 h-32"></textarea>
                        <p class="inquiry-note">{{ elm.note }}</p>
                      </div>
                    </div>
                    <button v-else @click="elm.input" class="inquiry-btn">{{ elm.label }}</button>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <confirm-contact @evtContact="handleContact" @evtSuccess="handleSuccess" v-if="isOpenConfirmContact"
                           :name="name" :email="email" :content="content" :code="code"/>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import {ref, computed} from "vue"
import ConfirmContact from "./ConfirmContact";
import {notification_error} from "../../utilities/composition/useNotification";
import {notification} from "ant-design-vue"

export default {
  name: "inquiry",
  components: {ConfirmContact},
  setup() {
    const isOpenContact = ref(true)
    const isOpenConfirmContact = ref(false)
    const name = ref('')
    const email = ref('')
    const content = ref('')
    const code = ref('')
    const getTitle = computed(() => 'お問い合わせ')
    const getSubTitle = computed(() => '下記からお問い合わせください。')
    const ElmForm = ref([
      {
        'label': 'お名前',
        'input': name,
        'id': 'name',
        'note': '',
        'css': false,
        'button': false,
        'textarea': false,
      },
      {
        'label': 'メールアドレス',
        'input': email,
        'id': 'email',
        'note': '',
        'css': false,
        'button': false,
        'textarea': false,
      },
      {
        'label': 'お問合せ内容',
        'input': content,
        'id': 'message',
        'note': '※必須項目',
        'css': true,
        'button': false,
        'textarea': true,
      },
      {
        'label': '確認画面へ進む',
        'input': openContact,
        'id': 'message',
        'note': '',
        'css': true,
        'button': true,
        'textarea': false,
      },
    ])

    function handleSuccess(data) {
      isOpenConfirmContact.value = data.isOpenConfirm
      isOpenContact.value = data.isOpenContact
      name.value = data.valEmpty
      email.value = data.valEmpty
      content.value = data.valEmpty

    }

    function handleContact(data) {
      isOpenConfirmContact.value = data.isOpenConfirm
      isOpenContact.value = data.isOpenContact
    }

    function validateName(name) {
      const re = /^([^<>()[\]\\.,;:\s@"][^0-9]{2,10})$/;
      return re.test(String(name).toLowerCase());
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validateContent(content) {
      if (content.trim().length <= 10) {
        return {
          "isVal": false,
          "message": '内容が短すぎます。最小10文字が必要です。'
        }
      }
      if (content.trim().length >= 500) {
        return {
          "isVal": false,
          "message": '内容が長すぎます。最大500文字が必要です。'
        }
      }
      return {
        "isVal": true,
        "message": '内容が正しいです。'
      }
    }

    function openContact(e) {
      e.preventDefault();
      const valName = validateName(name.value)
      const valEmail = validateEmail(email.value)
      const valContent = validateContent(content.value)
      const stringRandom = Math.random().toString(36).substring(2, 8);


      if (name.value.trim() && email.value.trim() && content.value.trim() && stringRandom) {
        if (!valName) {
          notification_error(notification, '無効なお名前です。')
          name.value = ''
          return
        }
        if (!valEmail) {
          notification_error(notification, '無効なメールアドレスです。')
          email.value = ''
          return
        }

        if (!valContent.isVal) {
          notification_error(notification, valContent.message)
          return
        }
        code.value = stringRandom
        isOpenConfirmContact.value = true
        isOpenContact.value = false
      } else {
        notification_error(notification, 'データを入力してください。')
      }
    }

    return {
      openContact,
      name,
      email,
      content,
      code,
      isOpenContact,
      isOpenConfirmContact,
      handleContact,
      handleSuccess,
      ElmForm,
      getTitle,
      getSubTitle
    }
  }
}
</script>

<style scoped>

</style>