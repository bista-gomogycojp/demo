<template>
  <!-- Logo Box -->
  <logo-box/>
  <DragElement type="trash-top"/>
  <div class="lg:overflow-x-auto">
    <div class="home-head">
      <DragElement type="trash-left" class="home-drag dropzone"/>
      <div class="sm:w-5/6 w-full xl:w-5/6">
        <div class="home-table">
          <!-- Items  in Table-->
          <items-in-table/>
        </div>
      </div>
      <DragElement type="trash-right" class="home-drag dropzone"/>
    </div>
  </div>
  <DragElement type="trash-bottom"/>
</template>
<script>
import LogoBox from "../components/LogoBox";
import ItemsInTable from "../components/ItemsInTable";
import DragElement from "../components/elements/DragElement";

export default {
  name: "HomePage",
  components: {
    DragElement,
    LogoBox,
    ItemsInTable,
  },


};
</script>