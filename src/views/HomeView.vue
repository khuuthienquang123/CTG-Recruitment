<script setup>
import backgroundImage from '@/assets/images/HomeView/background_2.png'
import latestButtonIcon from '@/assets/images/HomeView/card/latest_button_icon.svg'
import oldestButtonIcon from '@/assets/images/HomeView/card/oldest_button_icon.svg'
import previousPageIcon from '@/assets/images/HomeView/card/previous_page_icon.svg'
import nextPageIcon from '@/assets/images/HomeView/card/next_page_icon.svg'
// import chatbotIcon from '@/assets/images/Chatbot/chatbot_icon.svg'

import FooterComponent from '@/components/HomeView/FooterComponent.vue'
import CardComponent from '@/components/HomeView/Body/CardComponent.vue'
import SelectMenuComponent from '@/components/HomeView/Body/SelectMenuComponent.vue'
import SearchBarComponent from '@/components/HomeView/Body/SearchBarComponent.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { HalfCircleSpinner } from 'epic-spinners'
// import ChatbotComponent from '@/components/Chatbot/ChatbotComponent.vue'

const latestButton = ref(false)
const currentPage = ref(1)
const cardsPerPage = 6

const cards = ref([])
const isLoading = ref(false)
const fetchCards = async () => {
    try {
        isLoading.value = true
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/method/ctg_custom.ctg_custom.recruitment.admin.job_opening_management.get_job_opening_list`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        cards.value.push(...response.data)
        filterCards()
    } catch (error) {
        console.error('Error fetching cards:', error)
    } finally {
        isLoading.value = false
    }
}

const searchText = ref('')
const selectedLocation = ref('')
const selectFilters = ref({
    companies: [],
    departments: [],
    types: [],
    workLocations: []
})

const filteredCards = ref([...cards.value])


const filterCards = () => {
    filteredCards.value = cards.value.filter((card) => {
        const matchesSearchText = !searchText.value || card.job_title.toLowerCase().includes(searchText.value.toLowerCase())
        const matchesLocation = !selectedLocation.value || selectedLocation.value === 'Tất cả' || card.location === selectedLocation.value
        const matchesCompany = selectFilters.value.companies.length === 0 || selectFilters.value.companies.includes(card.company) || selectFilters.value.companies.includes('Tất cả')
        const matchesDepartment = selectFilters.value.departments.length === 0 || selectFilters.value.departments.includes(card.department) || selectFilters.value.departments.includes('Tất cả')
        const matchesType = selectFilters.value.types.length === 0 || selectFilters.value.types.includes(card.type) || selectFilters.value.types.includes('Tất cả')
        const matchesWorkLocation = selectFilters.value.workLocations.length === 0 || selectFilters.value.workLocations.includes(card.location) || selectFilters.value.workLocations.includes('Tất cả')

        return matchesSearchText && (matchesLocation || selectedLocation.value === '') && matchesCompany && matchesDepartment && matchesType && matchesWorkLocation

    })
}

const sortCards = () => {
    cards.value.sort((a, b) => {
        const dateA = new Date(a.submitted_at)
        const dateB = new Date(b.submitted_at)
        return latestButton.value ? dateA - dateB : dateB - dateA
     })
    latestButton.value = !latestButton.value
    filterCards()
}

const handleSearch = (searchData) => {
    searchText.value = searchData.searchText
    selectedLocation.value = searchData.selected
    filterCards()
}

const handleFilter = (filters) => {
    selectFilters.value = filters
}

const totalPages = computed(() => {
    return Math.ceil(filteredCards.value.length / cardsPerPage)
})

const paginatedCards = computed(() => {
    const startIndex = (currentPage.value - 1) * cardsPerPage
    const endIndex = currentPage.value * cardsPerPage
    return filteredCards.value.slice(startIndex, endIndex)
})

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// const chatbot = ref(false)
// const openChatbot = () => {
//     chatbot.value = !chatbot.value
// }
//
// const toggleChatBot = (value) => {
//     chatbot.value = value
// }

onMounted(() => {
    fetchCards()
})
</script>

<template>
    <div
        class="flex flex-col justify-center items-center w-full h-full space-y-4"
        style="background-color: #f2f8ff"
    >
        <div class="flex justify-center items-center w-full h-full bg-center bg-cover">
            <img :src="backgroundImage" alt="backgroundImage" class="w-full h-full object-cover" />
        </div>

        <div class="w-full h-full sm:px-12 md:px-20 lg:px-48 xl:px-80 2xl:px-96">
            <SearchBarComponent @search="handleSearch" />
        </div>

        <div class="inline-flex justify-center items-start gap-4 w-full h-full sm:px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28">
            <SelectMenuComponent @filter-card="handleFilter"/>

            <div class="flex flex-col justify-center items-center gap-4 w-full h-full">
                <div class=" w-full inline-flex justify-between items-center bg-white text-black rounded-xl sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 sm:py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 shadow-md">
                    <div class="">
                        <p class="sm:text-xs md:text-sm lg:text-base ">Có <span class="text-blue-500"> {{ cards.length }} </span> vị trí việc làm đang chờ đón bạn</p>
                    </div>

                    <div class="inline-flex justify-center items-end gap-4 border-l border-gray-200 px-4 sm:w-28">
                        <button @click="sortCards">
                            <img :src="latestButton.valueOf() ? latestButtonIcon : oldestButtonIcon" alt="sort button" />
                        </button>
                    </div>
                </div>
                <div v-if="!isLoading && paginatedCards" class="w-full h-full flex flex-col justify-center items-center gap-4">
                    <div v-for="(card, index) in paginatedCards" :key="index" class="w-full h-full">
                            <CardComponent
                                :id="card.id"
                                :job_title="card.job_title"
                                :location="card.location"
                                :department="card.department"
                                :type="card.type"
                                :salary_type="card.salary_type"
                                :lower_range="card.lower_range"
                                :upper_range="card.upper_range"
                                :currency="card.currency"
                                :submitted_at="card.submitted_at"
                            />
                    </div>
                </div>

                <div v-else-if="!paginatedCards" class="text-base font-medium text-gray-500 italic">
                    Không tìm thấy kết quả phù hợp
                </div>
                <div v-else class="w-full h-full flex flex-col justify-center items-center">
                    <half-circle-spinner :animation-duration="1000" :size="40" color="#3b82f6" />
                </div>
                <div class="flex self-end">
                    <ol class="flex justify-end text-xs font-medium space-x-1">
                        <li>
                            <a href="#" @click.prevent="changePage(currentPage - 1)" class="inline-flex items-center justify-center w-8 h-8 rounded">
                                <img :src="previousPageIcon" alt="previous page icon">
                            </a>
                        </li>

                        <li v-for="page in totalPages" :key="page">
                            <a v-if="currentPage === page" href="#" @click.prevent="changePage(page)" :class="['block w-8 h-8 text-center border border-gray-500 rounded leading-8', { 'bg-blue-600 text-white': currentPage === page }]">
                                {{ page }}
                            </a>

                            <a v-else href="#" @click.prevent="changePage(page)" class="block w-8 h-8 text-center border border-gray-500 text-gray-500 rounded leading-8 hover:bg-blue-600 hover:text-white">
                                {{ page }}
                            </a>
                        </li>

                        <li>
                            <a href="#" @click.prevent="changePage(currentPage + 1)" class="inline-flex items-center justify-center w-8 h-8 rounded">
                                <img :src="nextPageIcon" alt="next page icon">
                            </a>
                        </li>
                    </ol>
                </div>
            </div>

<!--            <div class="z-99 fixed hover:cursor-pointer right-5 bottom-5">-->
<!--                <img @click="openChatbot"  v-if="!chatbot" :src="chatbotIcon" alt="Chatbot Icon" class="w-32 h-32">-->
<!--                <ChatbotComponent @toggleChatbot="toggleChatBot" v-else />-->
<!--            </div>-->
        </div>

        <FooterComponent />
    </div>
</template>

<style scoped></style>
