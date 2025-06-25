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
    background-color: #023A6233;
    border-radius: 16px;
    padding: 24px 32px;
    display: flex;
    gap: 24px;
    
}

p {
    color: white;
}

h2 {
  color: white;
}

li {
    color: white;
}
</style>
