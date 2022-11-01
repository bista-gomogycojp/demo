<template>
  <div class="inline-flex items-center" v-if="getLevel === 2">
    <a-checkbox @change="handleAutoSave" :defaultChecked="getAutoSaveBtn">
      <span class="text-gray-800">{{ getLabel }}</span>
    </a-checkbox>
  </div>
</template>

<script>
import {toRef, ref, computed} from 'vue';
export default {
  name: "KeepLogin",
  emits: ["toggleAutoSave"],
  props: {
    level:Number,
    label:String,
    val:Boolean,

  },
  setup(props, {emit}){
    const autoSave = ref(true)
    const getLevel = toRef(props, 'level')
    const getName = toRef(props, 'name')
    const getClass= toRef(props, 'class')
    const getLabel = toRef(props, 'label')

    function handleAutoSave(e){
      emit("toggleAutoSave", e.target.checked);
      return e.target.checked
    }
    const getAutoSaveBtn = computed(() => {
      const autoSaveBtn = localStorage.getItem('autoSaveBtn');
      if(autoSaveBtn) return  true
      return  false;
    })

    return { getLevel, getName , getClass, getLabel, autoSave, handleAutoSave, getAutoSaveBtn }
  }
}
</script>

<style scoped>

</style>