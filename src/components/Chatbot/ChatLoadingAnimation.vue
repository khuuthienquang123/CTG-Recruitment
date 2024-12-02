<template>
    <div class="loading-dots w-full h-full rounded-md border bg-blue-300 px-3" v-if="loadingBotResponse">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const loadingBotResponse = ref(true)
</script>

<style scoped>
.loading-dots {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
    width: 6px;
    height: 6px;
    margin: 0 2px;
    background-color: #000000;
    border-radius: 50%;
    animation: loading 0.8s infinite;
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes loading {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
</style>
