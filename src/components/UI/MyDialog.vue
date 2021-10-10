<template>
  <div class="dialog"
       v-if="show"
       @click="hideDialog"
  >
    <div
        class="dialog__content"
        @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
   name: "my-dialog",
   mixins: [toggleMixin],
   mounted() {
      console.log('default mounted')
   }
}
</script>

<style scoped>
.dialog{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #0005;
  position: fixed;
  display: flex;
}
.dialog__content{
  margin: auto;
  background: white;
  border-radius: 20px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>