<script setup>
import WelfareStateComponent from '@/components/DetailView/Body/DetailSectionComponents/WelfareStateComponent.vue'
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps(['description', 'requirements'])

const descriptionList = computed( () => {
    return props.description.split('.').filter(item => item.trim() !== '')
})

const requirementList = computed( () => {
    return props.requirements.split('.').filter(item => item.trim() !== '')
})

const emit = defineEmits(['toggleModal'])

const toggleModal = () => {
    emit('toggleModal', true)
}
</script>

<template>
    <div class="flex flex-col justify-center items-start w-full h-full px-10 py-8 text-black bg-white rounded-lg shadow-md">
        <p class="font-semibold sm:text-lg xl:text-xl 2xl:text-xl">Mô tả công việc</p>
        <ul class="list-disc pl-5 mt-2">
            <li v-for="(item, index) in descriptionList" :key="index" class="font-normal sm:text-sm xl:text-base 2xl:text-base mt-2">{{ item.trim() }}.</li>
        </ul>

        <p class="font-semibold sm:text-lg xl:text-xl 2xl:text-xl mt-5">Yêu cầu</p>
        <ul class="list-disc pl-5 mt-2">
            <li v-for="(item, index) in requirementList" :key="index" class="font-normal sm:text-sm xl:text-base 2xl:text-base mt-2">{{ item.trim() }}.</li>
        </ul>

        <p class="font-semibold sm:text-lg xl:text-xl 2xl:text-xl my-5">Chế độ & phúc lợi</p>
        <WelfareStateComponent/>

        <button @click="toggleModal" class="bg-blue-500 text-white font-bold rounded-lg py-3 sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base sm:px-6 md:px-7 lg:px-8 xl:px-9 2xl:px-10 hover:bg-blue-600 active:bg-blue-700 mt-8">Ứng tuyển</button>

    </div>
</template>

<style scoped>

</style>
