<script setup>

import LocationIcon from '@/assets/images/HomeView/card/location.svg'
import TimeIcon from '@/assets/images/HomeView/card/time.svg'
import DepartmentIcon from '@/assets/images/HomeView/card/department.svg'
import CloseIcon from '@/assets/images/DetailView/Logo/close.svg'
import UploadIcon from '@/assets/images/DetailView/Logo/upload.svg'
import GreenTick from '@/assets/images/DetailView/Logo/green_tick.svg'
import SuccessAnnounceComponent from '@/components/ApplyForm/SuccessAnnounceComponent.vue'
import { submitJobApplication } from '@/api/api.js'
import { computed, defineProps, defineEmits, ref, watch } from 'vue'
import { HalfCircleSpinner } from 'epic-spinners'

const props = defineProps({
    id: { type: String, default: '' },
    job_title: { type: String, default: '' },
    location: { type: String, default: '' },
    submitted_at: { type: String, default: '' },
    department: { type: String, default: '' }
})

const emit = defineEmits(['toggleModal'])

const formattedSubmittedAt = computed(() => new Date(props.submitted_at).toLocaleDateString())

const toggleModal = () => {
    emit('toggleModal', false)
}

const requiredFields = ['name', 'date_of_birth', 'phone_number', 'email', 'experience', 'education_level', 'current_level', 'expected_salary', 'cv']

const isRequired = (field) => requiredFields.includes(field)

const formData = ref({
    id: props.id || '',
    position: props.job_title || '',
    name: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    experience: '',
    education_level: '',
    current_level: '',
    expected_salary: '',
    cv: null
})

watch(props, (newProps) => {
    formData.value.id = newProps.id || ''
    formData.value.position = newProps.job_title || ''
}, { immediate: true })

const isFieldEmpty = (field) => formData.value[field] === '' || formData.value[field] === null

const anyFieldEmpty = computed(()=> {
    try {
        return requiredFields.some(field => isFieldEmpty(field))
    } catch (error) {
        console.error('Error checking if any field is empty:', error)
        return true
    }
})

const validateFile = (event) => {
    const file = event.target.files[0]
    const validTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
    const maxSize = 5120 * 1024 // 5120KB in bytes

    if (!validTypes.includes(file.type)) {
        alert('Only .doc, .docx, and .pdf files are allowed.')
        formData.value.cv = null
        event.target.value = ''
        return
    }

    if (file.size > maxSize) {
        alert('File size must be less than 5120KB.')
        formData.value.cv = null
        event.target.value = ''
        return
    }

    formData.value.cv = file
}

const triggerFileInput = () => {
    document.getElementById('cv').click()
}


const isAnnouncementModalOpen = ref(false)
const isLoading = ref(false)
const successSubmit = ref(false)

const submitApplication = async () => {
    try {
        isLoading.value = true;
        // Use FormData for file uploads
        const form = new FormData();
        form.append("job_opening_id", formData.value.id);
        form.append("position", formData.value.position);
        form.append("full_name", formData.value.name);
        form.append("date_of_birth", formData.value.date_of_birth);
        form.append("phone_number", formData.value.phone_number);
        form.append("email", formData.value.email);
        form.append("experience", formData.value.experience);
        form.append("current_level", formData.value.current_level);
        form.append("education_level", formData.value.education_level);
        form.append("expected_salary", formData.value.expected_salary);
        if (formData.value.cv) {
            form.append("cv_file", formData.value.cv);
        }

        await submitJobApplication(form);

        isAnnouncementModalOpen.value = true;
        setTimeout(() => {
            isAnnouncementModalOpen.value = false;
        }, 5000);
    } catch (error) {
        console.error("Error during submission:", error);
    } finally {
        isLoading.value = false;
        successSubmit.value = true;
    }
};

const uploadedFileName = computed(() => formData.value.cv ? formData.value.cv.name : '')

</script>

<template>
    <div>
        <button @click="toggleModal" class="inline-flex justify-end items-center w-full h-full">
            <img :src="CloseIcon" alt="Close Button" class="w-4 h-4">
        </button>
    </div>
    <div class="flex flex-col justify-center items-center w-full h-full gap-3 text-black py-3 lg:px-32 xl:px-40">
        <p class="font-bold sm:text-base md:text-lg lg:text-2xl">Ứng Tuyển {{ job_title }}</p>

        <div class="inline-flex items-center justify-center w-fit h-full gap-6 text-nowrap">
            <div class="inline-flex items-center justify-center w-full h-full">
                <img :src="LocationIcon" alt="Location" class="sm:h-3 sm:w-3 lg:h-5 lg:w-5">
                <p class="sm:text-xs lg:text-sm ml-2">{{ location }}</p>
            </div>
            <div class="inline-flex items-center justify-center w-full h-full">
                <img :src="TimeIcon" alt="Location" class="sm:h-3 sm:w-3 lg:h-5 lg:w-5">
                <p class="sm:text-xs lg:text-sm ml-2">{{ formattedSubmittedAt }}</p>
            </div>
            <div class="inline-flex items-center justify-center w-full h-full">
                <img :src="DepartmentIcon"   alt="Location" class="sm:h-3 sm:w-3 lg:h-5 lg:w-5">
                <p class="sm:text-xs lg:text-sm ml-2">{{ department }}</p>
            </div>
        </div>

        <p v-if="anyFieldEmpty" class="sm:text-xs 2xl:text-sm font-normal text-red-500 italic">Vui lòng nhập đầy đủ các thông tin dưới đây để hoàn tất ứng tuyển vị trí</p>
    </div>
    <div class="flex flex-col justify-center items-center w-full h-full py-2 px-5 gap-4 text-black">
        <div class="grid grid-cols-2 gap-3 w-full h-full">
            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="id" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">Mã ứng tuyển</label>
                <input type="text" id="id" v-model="formData.id" class="w-full h-8 border read-only:bg-gray-200 read-only:border-gray-300 rounded-sm px-3 py-2 mt-2" disabled readonly>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="position" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">Vị trí ứng tuyển</label>
                <input type="text" id="position" v-model="formData.position" class="w-full h-8 border read-only:bg-gray-200 read-only:border-gray-300 rounded-sm px-3 py-2 mt-2" disabled readonly>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="name" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Họ & tên
                    <span v-if="isRequired('name') && isFieldEmpty('name')" class="text-red-500">*</span>
                </label>
                <input type="text" id="name" v-model="formData.name" placeholder="Nhập họ & tên" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="date_of_birth" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Ngày sinh
                    <span v-if="isRequired('date_of_birth') && isFieldEmpty('date_of_birth')" class="text-red-500">*</span>
                </label>
                <input type="date" id="date_of_birth" v-model="formData.date_of_birth" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="phone_number" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Số điện thoại
                    <span v-if="isRequired('phone_number') && isFieldEmpty('phone_number')" class="text-red-500">*</span>
                </label>
                <input type="text" id="phone_number" v-model="formData.phone_number" placeholder="Ví dụ: 0987 654 321" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="email" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Địa chỉ email
                    <span v-if="isRequired('email') && isFieldEmpty('email')" class="text-red-500">*</span>
                </label>
                <input type="email" id="email" v-model="formData.email" placeholder="Ex: anguyenvan@gmail.com" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="experience" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Kinh nghiệm làm việc
                    <span v-if="isRequired('experience') && isFieldEmpty('experience')" class="text-red-500">*</span>
                </label>
                <input type="text" id="experience" v-model="formData.experience" placeholder="Ví dụ: 2 năm" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="education_level" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Trình độ học vấn
                    <span v-if="isRequired('education_level') && isFieldEmpty('education_level')" class="text-red-500">*</span>
                </label>
                <input type="text" id="education_level" v-model="formData.education_level" placeholder="Ví dụ: đại học" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="current_level" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Cấp bậc hiện tại
                    <span v-if="isRequired('current_level') && isFieldEmpty('current_level')" class="text-red-500">*</span>
                </label>
                <input type="text" id="current_level" v-model="formData.current_level" placeholder="Ví dụ: Trưởng phòng" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>

            <div class="flex flex-col justify-center items-start w-full h-full">
                <label for="expected_salary" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                    Mức lương mong muốn
                    <span v-if="isRequired('expected_salary') && isFieldEmpty('expected_salary')" class="text-red-500">*</span>
                </label>
                <input type="text" id="expected_salary" v-model="formData.expected_salary" placeholder="Nhập mức lương" class="w-full h-8 border border-gray-300 rounded-sm px-3 py-2 mt-2" required>
            </div>
        </div>
        <div class="flex flex-col justify-center items-start w-full h-full gap-2">
            <label for="cv" class="font-semibold sm:text-xs lg:text-sm xl:text-sm">
                CV của bạn
                <span v-if="isRequired('cv') && isFieldEmpty('cv')" class="text-red-500">*</span>
            </label>
            <div class="flex flex-col justify-center items-center w-full h-full border border-dashed border-gray-300 rounded-sm p-6 gap-5">
                <input type="file" id="cv" @change="validateFile" class="hidden" accept=".doc,.docx,.pdf" required>
                <button @click="triggerFileInput" class="upload-button inline-flex justify-center items-center gap-2 px-8 py-3 rounded-3xl w-fit h-fit" style="background-color: #E5F1FF">
                    <img :src="UploadIcon" alt="Upload Icon" class="w-5 h-5">
                    <span class="ml-2 font-normal sm:text-xs lg:text-sm text-blue-500">Upload your CV</span>
                </button>
                <p v-if="!uploadedFileName" class="font-normal text-gray-500 sm:text-xs lg:text-sm italic">.doc, .docx and .pdf files that are less than 5120KB in size</p>
                <p @click="triggerFileInput" v-if="uploadedFileName" class="inline-flex justify-center items-center ont-normal text-black sm:text-xs lg:text-sm italic"> <img :src="GreenTick" alt="green tick" class="w-4 h-4 mr-2"> Uploaded file: {{ uploadedFileName }}</p>
            </div>
        </div>

        <button v-if="!anyFieldEmpty && !isLoading && !successSubmit" @click="submitApplication" class="bg-blue-500 text-white font-bold rounded-lg py-3 sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base sm:px-6 md:px-7 lg:px-8 xl:px-9 2xl:px-10 hover:bg-blue-600 active:bg-blue-700">Ứng tuyển ngay !</button>
        <button v-if="isLoading" class="bg-blue-500 text-white font-bold rounded-lg py-3 sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base sm:px-6 md:px-7 lg:px-8 xl:px-9 2xl:px-10 hover:bg-blue-600 active:bg-blue-700"><half-circle-spinner :animation-duration="1000" :size="20" color="#ffffff" /></button>
        <button v-if="successSubmit" class="bg-gray-400 text-white font-normal italic rounded-lg py-3 sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base sm:px-6 md:px-7 lg:px-8 xl:px-9 2xl:px-10" disabled>Ứng tuyển thành công!</button>

        <div v-if="isAnnouncementModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <SuccessAnnounceComponent />
            </div>
        </div>
    </div>
</template>

<style scoped>
.upload-button {
    background-color: #E5F1FF;
    transition: transform 0.2s;
}

.upload-button:hover {
    transform: scale(1.05);
}

.upload-button:active {
    transform: scale(0.95);
}
</style>
