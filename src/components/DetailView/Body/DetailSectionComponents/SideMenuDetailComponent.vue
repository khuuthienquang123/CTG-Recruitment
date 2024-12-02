<script setup>
    import CalendarIcon from '@/assets/images/DetailView/Logo/calendar_icon.svg'
    import SalaryIcon from '@/assets/images/DetailView/Logo/salary_icon.svg'
    import LocationIcon from '@/assets/images/DetailView/Logo/location_icon.svg'
    import { defineProps } from 'vue'

    const props = defineProps(['lower_range', 'upper_range', 'location', 'submitted_at' , 'currency'])

</script>

<template>
<div class="flex flex-col justify-center items-center w-fit h-full text-black bg-white rounded-lg text-nowrap shadow-md">
    <div class="flex flex-col justify-center items-start w-full h-full py-4 pl-6 pr-8 space-y-2 border-b ">
        <div class="inline-flex justify-center items-center">
            <img :src="SalaryIcon" alt="Salary Icon" class="sm:w-4 sm:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
            <p class="font-normal sm:text-xs xl:text-sm 2xl:text-base mx-2">Mức lương</p>
        </div>

        <p v-if="props.lower_range" class="font-semibold sm:text-base xl:text-lg text-nowrap">{{ lower_range }} - {{ upper_range }} {{ currency }}</p>
        <p v-else class="font-semibold sm:text-base xl:text-lg text-nowrap">Thoả thuận</p>
    </div>

    <div class="flex flex-col justify-center items-start w-full h-full py-4 pl-6 pr-6 space-y-2 border-b">
        <div class="inline-flex justify-center items-center">
            <img :src="LocationIcon" alt="Location Icon" class="sm:w-4 sm:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
            <p class="font-normal sm:text-xs xl:text-sm 2xl:text-base mx-2 text-nowrap">Địa điểm làm việc</p>
        </div>

        <p class="font-semibold sm:text-base xl:text-lg 2xl:text-xl text-nowrap">{{ location }}</p>
    </div>

    <div class="flex flex-col justify-center items-start w-full h-full py-4 pl-6 pr-6 space-y-2">
        <div class="inline-flex justify-center items-center">
            <img :src="CalendarIcon" alt="Calendar Icon" class="sm:w-4 sm:h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
            <p class="font-normal sm:text-xs xl:text-sm 2xl:text-base mx-2 text-nowrap">Hạn nộp</p>
        </div>

        <p class="font-semibold sm:text-base xl:text-lg 2xl:text-xl text-nowrap">{{ submitted_at }}</p>
    </div>
</div>
</template>

<style scoped>

</style>
