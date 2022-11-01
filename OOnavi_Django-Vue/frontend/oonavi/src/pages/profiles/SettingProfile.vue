<template>
  <div class="setting-profile" v-for="(elm,i) in ElmForm" :key="i">
    <label class="setting-label" :for="elm.id">{{ elm.label }}</label>
    <input
        v-if="!elm.sex"
        :type="elm.type"
        :name="elm.id"
        v-model="elm.input"
        :id="elm.id"
        class="change-pass-inp "
        :placeholder="elm.placeholder"
    />
    <select
        v-else
        class="setting-select"
        :id="elm.id"
        :name="elm.id"
        v-model="elm.input"
    >
      <option v-for="(option,index) in options"
              :key="index" class="text-gray-500"
              :value="option.value"
              :selected="getGender === index
      ">
        {{ option.text }}
      </option>
    </select>
  </div>
  <save-button type="update-user" :getId="getIdUser" :user_name="getUserName" :email="getEmail"
               :first_name="getFirstName" :gender="parseInt(getGender)" :birthday="getBirthday"/>
</template>

<script>
import SaveButton from "../../components/SaveButton.vue";
import {ref} from "vue"
import {useStore} from "vuex";

export default {
  components: {SaveButton},
  setup() {
    const store = useStore();
    const selected = ref();
    const getIdUser = ref();
    const getUserName = ref();
    const getEmail = ref();
    const getFirstName = ref("");
    const getGender = ref();
    const getBirthday = ref();
    const ElmForm = ref([
      {
        'label': 'ユーザー名',
        'input': getUserName,
        'id': 'username',
        'type': 'text',
        'placeholder': 'yamata',
        'sex': false,

      },
      {
        'label': 'メールアドレス',
        'input': getEmail,
        'id': 'email',
        'type': 'text',
        'placeholder': 'yamata@gmail.com',
        'sex': false,

      },
      {
        'label': '氏名',
        'input': getFirstName,
        'id': 'name',
        'type': 'text',
        'placeholder': '山田',
        'sex': false,
      },
      {
        'label': '誕生日',
        'input': getBirthday,
        'id': 'birthday',
        'type': 'date',
        'sex': false,
      },
      {
        'label': '性別',
        'input': getGender,
        'id': 'sex',
        'type': '',
        'sex': true,
      },
    ])
    const options = ref([
      {text: '未登録', value: '0'},
      {text: '男性', value: '1'},
      {text: '女性', value: '2'}])
    const currentUser = store.getters.getCurrentUser
    if (currentUser) {
      getUserName.value = currentUser.user_name
      getIdUser.value = currentUser.id
      getEmail.value = currentUser.email
      getFirstName.value = currentUser.first_name
      getGender.value = currentUser.gender
      getBirthday.value = currentUser.birthday
    }


    return {ElmForm, getIdUser, getUserName, getEmail, getFirstName, getGender, getBirthday, options, selected}
  }
};
</script>

<style></style>
