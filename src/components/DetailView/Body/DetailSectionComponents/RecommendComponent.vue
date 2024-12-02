<script setup>
import SalaryIcon from '@/assets/images/DetailView/Logo/salary.svg'
import LocationIcon from '@/assets/images/HomeView/card/location.svg'
import CalendarIcon from '@/assets/images/HomeView/card/time.svg'
import DepartmentIcon from '@/assets/images/HomeView/card/department.svg'
import PreviousIcon from '@/assets/images/DetailView/Logo/recommend_previous.svg'
import NextIcon from '@/assets/images/DetailView/Logo/recommend_next.svg'
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useJobDetailStore, useJobOpeningStore } from '@/stores/jobOpeningPinia.js'
import { getJobOpeningDetail } from '@/api/api.js'

const router = useRouter()
const jobOpeningStore = useJobOpeningStore()
const props = defineProps(['id', 'job_title', 'lower_range', 'upper_range', 'location', 'submitted_at' , 'currency', 'department'])

const formatSubmittedAt = (submitted_at) => {
    return new Date(submitted_at).toLocaleDateString()
}

const formatLowerRange = (lower_range) => {
    return new Intl.NumberFormat('de-DE').format(lower_range)
}

const formatUpperRange = (upper_range) => {
    return new Intl.NumberFormat('de-DE').format(upper_range)
}

const navigateToRecommendationDetail = async (id) => {
    try {
        const jobDetail = await getJobOpeningDetail(id)
        const jobDetailStore = useJobDetailStore()
        jobDetailStore.setJobDetail(jobDetail)
        await router.push({ name: 'detail', params: { id: id } })
    } catch (error) {
        console.error('Error navigating to detail:', error)
    }
}

const overflowContainer = ref(null)

const scrollLeft = () => {
    if (overflowContainer.value) {
        overflowContainer.value.scrollBy({ left: -200, behavior: 'smooth' })
    }
    else {
        console.log('overflowContainer is null')
    }
}

const scrollRight = () => {
    if (overflowContainer.value) {
        overflowContainer.value.scrollBy({ left: 200, behavior: 'smooth' })
    }else {
        console.log('overflowContainer is null')
    }
}

onMounted(() => {
    jobOpeningStore.fetchJobOpeningList()
})
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-full sm:px-10 lg:px-20 xl:px-24 2xl:px-32 gap-4 my-8 text-black border-t border-t-blue-300">
        <p class="self-start sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mt-8">Vị trí bạn sẽ thích</p>
        <div class="inline-flex justify-center items-center space-x-6 w-full h-full">
            <button @click="scrollLeft" class="bg-blue-500 p-3 rounded-lg">
                <img :src="PreviousIcon" alt="Previous" class="w-4 h-4">
            </button>

            <div ref="overflowContainer" class="overflow-x-auto inline-flex justify-start items-center w-full h-full gap-6 my-4 py-6">
                <div  v-for="job in jobOpeningStore.jobOpening" :key="job.id">
                    <div v-if="job.id !== props.id" @click="navigateToRecommendationDetail(job.id, job.job_title)" class="flex flex-col justify-center items-start w-fit h-full gap-3 p-6 rounded-lg bg-white shadow-md hover:cursor-pointer active:border-gray-100">
                        <p class="font-semibold sm:text-base lg:text-base xl:text-lg 2xl:text-xl text-nowrap">{{ job.job_title }}</p>
                        <div class="inline-flex justify-start items-center gap-2 w-full h-full">
                            <img :src="LocationIcon" alt="Location" class="w-4 h-4">
                            <p class="font-normal sm:text-xs lg:text-sm xl:text-sm 2xl:text-base text-nowrap">{{ job.location }}</p>
                        </div>
                        <div class="inline-flex justify-start items-center gap-2 w-full h-full">
                            <img :src="CalendarIcon" alt="Calendar" class="w-4 h-4">
                            <p class="font-normal sm:text-xs lg:text-sm xl:text-sm 2xl:text-base text-nowrap">{{ formatSubmittedAt(job.submitted_at )}}</p>
                        </div>
                        <div class="inline-flex justify-start items-center gap-2 w-full h-full">
                            <img :src="DepartmentIcon" alt="Department" class="w-4 h-4">
                            <p class="font-normal sm:text-xs lg:text-sm xl:text-sm 2xl:text-base text-nowrap">{{ job.department }}</p>
                        </div>
                        <div class="inline-flex justify-start items-center gap-2 w-full h-full">
                            <img :src="SalaryIcon" alt="Salary" class="w-4 h-4">
                            <p v-if="props.lower_range && props.upper_range " class="font-normal sm:text-xs lg:text-sm xl:text-sm 2xl:text-base text-nowrap mr-2">{{ formatLowerRange(job.lower_range) }} - {{ formatUpperRange(job.upper_range) }} {{ job.currency }}</p>
                            <p v-else class="font-normal sm:text-xs lg:text-sm xl:text-sm 2xl:text-base text-nowrap mr-2">Thỏa thuận</p>
                        </div>
                    </div>
                </div>
            </div>

            <button @click="scrollRight" class="bg-blue-500 p-3 rounded-lg">
                <img :src="NextIcon" alt="Next" class="w-4 h-4">
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
