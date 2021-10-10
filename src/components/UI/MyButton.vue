<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style scoped>
.btn{
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 1em;
  padding: 0.5em 0.5em;
  border: 1.5px solid teal;
  font-weight: bold;
  color: teal;
}
.btn:hover{
    background: #ccc;
}
</style>