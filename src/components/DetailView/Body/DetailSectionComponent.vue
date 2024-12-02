<script setup>
import SideMenuDetailComponent from '@/components/DetailView/Body/DetailSectionComponents/SideMenuDetailComponent.vue'

import { computed, defineProps, defineEmits } from 'vue'
import MainMenuDetailComponent from '@/components/DetailView/Body/DetailSectionComponents/MainMenuDetailComponent.vue'

const props = defineProps(['lower_range', 'upper_range', 'location', 'submitted_at', 'currency', 'description', 'requirements'])

const formattedSubmittedAt = computed(() => new Date(props.submitted_at).toLocaleDateString())
const formattedLowerRange = computed(() => props.lower_range ? `${(props.lower_range / 1000000).toFixed(0)}` : 'N/A')
const formattedUpperRange = computed(() => props.upper_range ? `${(props.upper_range / 1000000).toFixed(0)} Triệu` : 'N/A')

const emit = defineEmits(['toggleModal'])

const handleToggleModal = () => {
    emit('toggleModal', true)
}
</script>

<template>
<div class="inline-flex justify-center items-start w-full h-full sm:px-10 lg:px-20 xl:px-24 2xl:px-32 gap-5">
    <SideMenuDetailComponent :lower_range="formattedLowerRange" :upper_range="formattedUpperRange" :location="location" :submitted_at="formattedSubmittedAt" :currency="currency"/>
    <MainMenuDetailComponent :description="description" :requirements="requirements" @toggleModal="handleToggleModal"/>
</div>
</template>

<style scoped>

</style>
