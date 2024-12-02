<script setup>
    import CompanyLogo from '@/assets/images/DetailView/Logo/company_logo.svg'
    import NextVector from '@/assets/images/DetailView/Logo/next_vector.svg'
    import { defineProps } from 'vue'
    import { useRouter } from 'vue-router'

    defineProps(['job_title'])
    const router = useRouter()
    const directToHome = () => {
        router.push({ name: 'home' })
    }
</script>

<template>
    <div class="inline-flex justify-start items-center w-full h-full gap-4 py-3 sm:px-10 lg:px-20 xl:px-24 2xl:px-32 text-sm font-normal bg-white text-black shadow-md">
        <img @click="window.location.reload()" :src="CompanyLogo" alt="Company Logo" class="h-13 w-10 hover:cursor-pointer">
<!--        <p class="hover:cursor-pointer hover:underline ml-4">Home</p>-->
<!--        <img :src="NextVector" alt="Next Vector" class="h-2 w-2">-->
        <p @click="directToHome" class="hover:cursor-pointer hover:underline ml-2">Tuyển dụng</p>
        <img :src="NextVector" alt="Next Vector" class="h-2 w-2">
        <p class="hover:cursor-pointer hover:underline text-blue-500">{{ job_title }}</p>
    </div>
</template>

<style scoped>

</style>
