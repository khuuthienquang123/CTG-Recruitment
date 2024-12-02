import { defineStore } from 'pinia'
import { getJobOpeningList } from '@/api/api.js'

export const useJobDetailStore = defineStore('jobDetail', {
    state: () => ({
        jobDetail: null,
    }),
    actions: {
        setJobDetail(detail) {
            this.jobDetail = detail
        },
    },
})

export const useJobOpeningStore = defineStore('jobOpening', {
    state: () => ({
        jobOpening: [],
    }),
    actions: {
        async fetchJobOpeningList() {
            try {
                this.jobOpening = await getJobOpeningList()
            } catch (error) {
                console.error('Error fetching job opening list: ', error)
            }
        },
    },
})
