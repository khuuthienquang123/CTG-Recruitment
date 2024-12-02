<script setup>
    import ReturnArrow from '@/assets/images/DetailView/Logo/return_arrow.svg'
    import LocationIcon from '@/assets/images/HomeView/card/location.svg'
    import TimeIcon from '@/assets/images/HomeView/card/time.svg'
    import DepartmentIcon from '@/assets/images/HomeView/card/department.svg'
    import { computed, defineProps, defineEmits } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const props = defineProps(['job_title', 'location', 'submitted_at', 'department'])
    const emit = defineEmits(['toggleModal'])

    const returnToHome = () => {
        router.push({ name: 'home' })
    }

    const formattedSubmittedAt = computed(() => new Date(props.submitted_at).toLocaleDateString())

    const toggleModal = () => {
        emit('toggleModal', true)
    }
</script>

<template>
     <div class="inline-flex items-start justify-between w-full h-full py-14 sm:px-10 lg:px-20 xl:px-24 2xl:px-32 text-black">
         <button @click="returnToHome" class="self-start ml-10">
             <img :src="ReturnArrow" alt="Return Arrow" class="sm:h-8 sm:w-8 lg:h-10 lg:w-10">
         </button>

         <div class="flex flex-col justify-center items-center w-full h-full gap-10">
             <p class="font-bold sm:text-2xl lg:text-3xl">{{ job_title }}</p>

             <div class="inline-flex items-center justify-center w-fit h-full gap-8 text-nowrap">
                    <div class="inline-flex items-center justify-center w-full h-full">
                        <img :src="LocationIcon" alt="Location" class="h-5 w-5">
                        <p class="text-sm ml-2">{{ location }}</p>
                    </div>
                 <div class="inline-flex items-center justify-center w-full h-full">
                     <img :src="TimeIcon" alt="Location" class="h-5 w-5">
                     <p class="text-sm ml-2">{{ formattedSubmittedAt }}</p>
                 </div>
                 <div class="inline-flex items-center justify-center w-full h-full">
                     <img :src="DepartmentIcon" alt="Location" class="h-5 w-5">
                     <p class="text-sm ml-2">{{ department }}</p>
                 </div>
             </div>

             <button @click="toggleModal" class="bg-blue-500 text-white font-bold rounded-lg py-3 sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base sm:px-6 md:px-7 lg:px-8 xl:px-9 2xl:px-10 ml-4 hover:bg-blue-600 active:bg-blue-700">Ứng tuyển</button>
         </div>

     </div>
</template>

<style scoped>

</style>
