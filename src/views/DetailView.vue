<script setup>
import HeaderComponent from '@/components/DetailView/HeaderComponent.vue'
import FooterComponent from '@/components/DetailView/FooterComponent.vue'
import TitleSectionComponent from '@/components/DetailView/Body/TitleSectionComponent.vue'
import DetailSectionComponent from '@/components/DetailView/Body/DetailSectionComponent.vue'
import RecommendComponent from '@/components/DetailView/Body/DetailSectionComponents/RecommendComponent.vue'
import ApplyFormComponent from '@/components/ApplyForm/ApplyFormComponent.vue'
import { computed, ref } from 'vue'
import { useJobDetailStore} from '@/stores/jobOpeningPinia.js'
import { getJobOpeningDetail } from '@/api/api.js'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import backgroundImg from '@/assets/images/DetailView/background.svg'

const jobDetailStore = useJobDetailStore()

const route = useRoute()

const fetchJobDetail = async (id) => {
    try {
        const jobDetail = await getJobOpeningDetail(id)
        jobDetailStore.setJobDetail(jobDetail)
    } catch (error) {
        console.error('Error fetching job detail:', error)
    }
}

const isModalOpen = ref(false)

const toggleModal = (value) => {
    isModalOpen.value = value
}

const jobDetail = computed(() => jobDetailStore.jobDetail)
const id = computed(() => jobDetail.value?.id)
const job_title = computed(() => jobDetail.value?.job_title)
const location = computed(() => jobDetail.value?.location)
const submitted_at = computed(() => jobDetail.value?.submitted_at)
const department = computed(() => jobDetail.value?.department)
const lower_range = computed(() => jobDetail.value?.lower_range)
const upper_range = computed(() => jobDetail.value?.upper_range)
const currency = computed(() => jobDetail.value?.currency)
const description = computed(() => jobDetail.value?.description)
const requirements = computed(() => jobDetail.value?.requirements)

onBeforeRouteUpdate((to, from, next) => {
    fetchJobDetail(to.params.id)
    next()
})

// Fetch the initial job detail when the component is mounted
fetchJobDetail(route.params.id)
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-full" style="background-color: #f2f8ff">
        <div class="w-full absolute top-0" :style="{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'top', height: '100%'}"></div>
        <div class="w-full h-full flex flex-col justify-center items-center">
            <HeaderComponent class="z-10" :job_title="job_title" />
            <TitleSectionComponent class="z-10" :job_title="job_title" :location="location" :submitted_at="submitted_at" :department="department" @toggleModal="toggleModal"/>
            <DetailSectionComponent class="z-10" v-if="jobDetail" :location="location" :submitted_at="submitted_at" :lower_range="lower_range" :upper_range="upper_range" :currency="currency" :description="description" :requirements="requirements" @toggleModal="toggleModal"/>
            <RecommendComponent class="z-10" v-if="jobDetail" :id="id" :job_title="job_title" :location="location" :submitted_at="submitted_at" :lower_range="lower_range" :upper_range="upper_range" :currency="currency" :department="department"/>
            <FooterComponent />
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <ApplyFormComponent :id="id" :job_title="job_title" :department="department" :location="location" :submitted_at="submitted_at" @toggleModal="toggleModal"/>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
