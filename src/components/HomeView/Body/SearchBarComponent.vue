<script setup>
    import SearchLogo from '@/assets/images/HomeView/searchbar/search_icon.svg'
    import SelectMenuLogo from '@/assets/images/HomeView/searchbar/select_menu.svg'

    import { ref } from 'vue'

    const selected = ref('')
    const searchText = ref('')

    const emit = defineEmits(['search'])

    const handleSearch = () => {
        console.log('searchText:', searchText.value)
        emit('search', {
            selected: selected.value,
            searchText: searchText.value
        })
    }
</script>

<template>
<div class="inline-flex justify-between items-center w-full h-full px-4 py-2 bg-white rounded-lg shadow-md">
    <div class="inline-flex justify-start items-center w-full h-full gap-2">
        <img :src="SearchLogo" alt="search" class="sm:w-4 xl:w-5 2xl:w-6 sm:h-4 xl:h-5 2xl:h-6" />
        <input v-model="searchText" type="text" placeholder="Cơ hội việc làm dành cho bạn..." class="w-full h-full px-4 py-2 rounded-lg text-black" />
    </div>

    <div class="inline-flex justify-end items-center w-full h-full gap-4 text-black ">
        <img :src="SelectMenuLogo" alt="select menu" class="sm:w-4 xl:w-6 2xl:w-9 sm:h-4 xl:h-6 2xl:h-6" />
        <select v-model="selected" class="py-3">
            <option class="text-gray-500" disabled value="">Nơi làm việc</option>
            <option class="text-black">Tất cả</option>
            <option class="text-black">Le’man Trương Định</option>
            <option class="text-black">Gò Vấp</option>
            <option class="text-black">Tân Bình</option>
        </select>
        <button @click="handleSearch" class="bg-blue-500 text-white font-bold rounded-lg py-3 sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base sm:px-1 md:px-2 lg:px-3 xl:px-4 2xl:px-5 ml-4 hover:bg-blue-600 active:bg-blue-700">Tìm kiếm</button>
    </div>

</div>
</template>

<style scoped>
</style>
