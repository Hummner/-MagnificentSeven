<template>Add commentMore actions
    <div class="card">
        <!-- Slot für beliebigen Inhalt -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BaseCard'
}
</script>

<style scoped>
.card {
    background-color: #011F35;
    border-radius: 16px;
    padding: 24px 32px;
}

h1 {
  color: white;
}
</style>
