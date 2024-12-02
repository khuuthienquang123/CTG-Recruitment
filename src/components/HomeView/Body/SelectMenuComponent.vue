<script setup>
import { ref, watch, defineEmits } from 'vue'

const companies = ['Tất cả', 'CT Group', 'CTM', 'Steal Star', 'CCTPA']
const departments = ['Tất cả', 'Phòng Hạ Tầng - CG', 'Phòng Phát Triển & Vận hành ứng dụng - CG', 'Ban Truyền Thông - CG', 'Kế toán', 'Tổng vụ - GAD']
const types = ['Tất cả', 'Toàn thời gian', 'Bán thời gian - CTV', 'Thực tập sinh']
const workLocations = ['Tất cả', 'Leman Trương Định', 'Gò Vấp', 'Tân Bình']

const selectCompanies = ref([])
const selectDepartments = ref([])
const selectTypes = ref([])
const selectWorkLocations = ref([])

const clearAllSelections = () => {
    selectCompanies.value = []
    selectDepartments.value = []
    selectTypes.value = []
    selectWorkLocations.value = []
}

const emit = defineEmits(['filter-card'])

const handleFilter = () => {
    emit('filter-card', {
        companies: selectCompanies.value,
        departments: selectDepartments.value,
        types: selectTypes.value,
        workLocations: selectWorkLocations.value
    })
}

watch([selectCompanies, selectDepartments, selectTypes, selectWorkLocations], handleFilter)

</script>

<template>
    <div class="w-1/4 h-full flex flex-col items-center justify-center space-y-6 sm:px-3 lg:px-4 xl:p-5 2xl:p-6 bg-white text-black rounded-xl shadow-md">
        <div class="inline-flex items-center justify-between w-full h-full border-b border-gray-500 pb-3">
            <p class="font-semibold md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl text-start">Bộ lọc</p>
            <p @click="clearAllSelections" class="sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-sm text-blue-500 text-end hover:underline hover:cursor-pointer active:text-blue-900">Xóa tất cả</p>
        </div>

        <div class="flex flex-col items-start justify-center w-full h-full space-y-3 mt-6">
            <p class="font-medium sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">Công ty</p>
            <div v-for="(company, index) in companies" :key="index" class="w-full gap-4 sm:text-xs xl:text-sm 2xl:text-base">
                <input type="checkbox" :id="'company' + index" name="company" :value="company" v-model="selectCompanies" autocomplete="off">
                <label :for="'company' + index" class="ml-3">{{ company }}</label>
            </div>
        </div>

        <div class="flex flex-col items-start justify-center w-full h-full space-y-3 mt-6">
            <p class="font-medium sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">Bộ phận/ Phòng ban</p>
            <div v-for="(department, index) in departments" :key="index" class="w-full gap-4 sm:text-xs xl:text-sm 2xl:text-base">
                <input type="checkbox" :id="'department' + index" name="department" :value="department" v-model="selectDepartments" autocomplete="off">
                <label :for="'department' + index" class="ml-3">{{ department }}</label>
            </div>
        </div>

        <div class="flex flex-col items-start justify-center w-full h-full space-y-3 mt-6">
            <p class="font-medium sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">Loại</p>
            <div v-for="(type, index) in types" :key="index" class="w-full gap-4 space-y-2 sm:text-xs xl:text-sm 2xl:text-base">
                <input type="checkbox" :id="'type' + index" name="type" :value="type" v-model="selectTypes" autocomplete="off">
                <label :for="'type' + index" class="ml-3">{{ type }}</label>
            </div>
        </div>

        <div class="flex flex-col items-start justify-center w-full h-full space-y-3 mt-6">
            <p class="font-medium sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-lg">Nơi làm việc</p>
            <div v-for="(location, index) in workLocations" :key="index" class="w-full gap-4 space-y-2 sm:text-xs xl:text-sm 2xl:text-base">
                <input type="checkbox" :id="'location' + index" name="location" :value="location" v-model="selectWorkLocations" autocomplete="off">
                <label :for="'location' + index" class="ml-3">{{ location }}</label>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
