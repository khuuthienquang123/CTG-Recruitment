<script setup>
import LocationLogo from '@/assets/images/HomeView/card/location.svg'
import TimeLogo from '@/assets/images/HomeView/card/time.svg'
import DepartmentLogo from '@/assets/images/HomeView/card/department.svg'
import SalaryLogo from '@/assets/images/HomeView/card/salary.svg'
import { getJobOpeningDetail } from '@/api/api.js'
import { useJobDetailStore} from '@/stores/jobOpeningPinia.js'
import { defineProps, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps([
    'id',
    'job_title',
    'location',
    'department',
    'type',
    'salary_type',
    'lower_range',
    'upper_range',
    'currency',
    'submitted_at',
])
const router = useRouter()

const navigateToDetail = async () => {
    try {
        const jobDetail = await getJobOpeningDetail(props.id)
        const jobDetailStore = useJobDetailStore()
        jobDetailStore.setJobDetail(jobDetail)
        await router.push({ name: 'detail', params: { id: props.id } })
    } catch (error) {
        console.error('Error navigating to detail:', error)
    }
}

const formattedDate = computed(() => new Date(props.submitted_at).toLocaleDateString())
const formattedLowerRange = computed(() =>
    props.lower_range ? `${(props.lower_range / 1000000).toFixed(0)}` : 'N/A',
)
const formattedUpperRange = computed(() =>
    props.upper_range ? `${(props.upper_range / 1000000).toFixed(0)} Triệu` : 'N/A',
)
</script>

<template>
    <div
        class="inline-flex items-center justify-between px-8 py-6 bg-white rounded-xl w-full h-full text-black shadow-md"
    >
        <div class="flex flex-col justify-start items-start w-full h-full gap-4">
            <div>
                <p class="font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {{ job_title }}
                </p>
            </div>
            <div
                class="inline-flex items-center justify-center gap-3 sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
            >
                <img :src="DepartmentLogo" alt="department" />
                <p>{{ location }}</p>
            </div>
            <div
                class="inline-flex items-center justify-center gap-3 sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
            >
                <img :src="TimeLogo" alt="time" />
                <p>{{ formattedDate }}</p>
            </div>
            <div
                class="inline-flex items-center justify-center gap-3 sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
            >
                <img :src="LocationLogo" alt="location" />
                <p>{{ department }}</p>
            </div>
        </div>

        <div class="flex flex-col justify-start items-end w-full h-full gap-4">
            <div
                v-if="type === 'Toàn thời gian'"
                class="px-3 py-1 rounded-lg sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
                style="background-color: #d6f4de; color: #2fb350"
            >
                {{ type }}
            </div>
            <div
                v-else-if="type === 'Bán thời gian'"
                class="px-3 py-1 rounded-lg sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
                style="background-color: #e5f1ff; color: #006ee6"
            >
                {{ type }}
            </div>
            <div
                v-else-if="type === 'Thực tập sinh'"
                class="px-3 py-1 rounded-lg sm:text-xs md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
                style="background-color: #e4cfff; color: #9747ff"
            >
                {{ type }}
            </div>

            <div class="inline-flex items-center justify-center gap-3 text-xl">
                <img :src="SalaryLogo" alt="salary" />
                <p
                    v-if="salary_type !== 'negotiable'"
                    class="font-bold sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                >
                    {{ formattedLowerRange }} - {{ formattedUpperRange }} {{ currency }}
                </p>
                <p
                    v-else
                    class="font-bold sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                >
                    Thỏa thuận
                </p>
            </div>
            <button
                @click="navigateToDetail"
                class="bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white sm:text-sm md:text-base lg:text-lg sm:py-2 md:py-2 lg:py-2 xl:py-2.5 2xl:py-3 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-6 py-4 px-6 rounded-xl font-bold"
            >
                Ứng tuyển
            </button>
        </div>
    </div>
</template>

<style scoped></style>
