<script setup>
    import BonusIcon from '@/assets/images/DetailView/Logo/bonus.svg'
    import HealthInsuranceIcon from '@/assets/images/DetailView/Logo/health_insurance.svg'
    import DayOffIcon from '@/assets/images/DetailView/Logo/day_off.svg'
    import AllowanceIcon from '@/assets/images/DetailView/Logo/allowance.svg'
    import TransportationIcon from '@/assets/images/DetailView/Logo/transportation.svg'
</script>

<template>
<div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="inline-flex justify-start items-center w-full h-full border border-blue-300 gap-5 xl:text-nowrap rounded-md px-3 py-2">
            <div class="p-2 rounded-md" style="background-color: #CCE4FF">
                <img :src="BonusIcon" alt="Bonus Icon" class="sm:w-2 sm:h-2 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">
            </div>
            <div class="flex flex-col justify-center items-start gap-2">
                <p class="font-semibold sm:text-sm xl:text-base 2xl:text-lg">Tiền thưởng</p>
                <p class="sm:text-xs xl:text-sm 2xl:text-base">Thưởng tháng 13, tháng 14</p>
            </div>
        </div>

        <div class="inline-flex justify-start items-center w-full h-full border border-blue-300 gap-5 xl:text-nowrap rounded-md px-3 py-2">
            <div class="p-2 rounded-md" style="background-color: #CCE4FF">
                <img :src="HealthInsuranceIcon" alt="Health Insurance Icon" class="sm:w-2 sm:h-2 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">
            </div>

            <div class="flex flex-col justify-center items-start gap-2">
                <p class="font-semibold sm:text-sm xl:text-base 2xl:text-lg">Bảo hiểm sức khỏe</p>
                <p class="sm:text-xs xl:text-sm 2xl:text-base">Bảo hiểm 24/7 cho nhân viên + 2 người thân</p>
            </div>
        </div>

        <div class="inline-flex justify-start items-center w-full h-full border border-blue-300 gap-5 xl:text-nowrap rounded-md px-3 py-2">
            <div class="p-2 rounded-md" style="background-color: #CCE4FF">
                <img :src="DayOffIcon" alt="Day-off icon" class="sm:w-2 sm:h-2 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">
            </div>

            <div class="flex flex-col justify-center items-start gap-2">
                <p class="font-semibold sm:text-sm xl:text-base 2xl:text-lg">Ngày phép</p>
                <p class="sm:text-xs xl:text-sm 2xl:text-base">16++ ngày phép / năm</p>
            </div>
        </div>

        <div class="inline-flex justify-start items-center w-full h-full border border-blue-300 gap-5 xl:text-nowrap rounded-md px-3 py-2">
            <div class="p-2 rounded-md" style="background-color: #CCE4FF">
                <img :src="AllowanceIcon" alt="Allowance Icon" class="sm:w-2 sm:h-2 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">
            </div>

            <div class="flex flex-col justify-center items-start gap-2">
                <p class="font-semibold sm:text-sm xl:text-base 2xl:text-lg">Phụ cấp</p>
                <p class="sm:text-xs xl:text-sm 2xl:text-base">Cơm trưa, phí gửi xe</p>
            </div>
        </div>

        <div class="inline-flex justify-start items-center w-full h-full border border-blue-300 gap-5 xl:text-nowrap rounded-md px-3 py-2">
            <div class="p-2 rounded-md" style="background-color: #CCE4FF">
                <img :src="TransportationIcon" alt="Transportation Icon" class="sm:w-2 sm:h-2 md:w-4 md:h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10">
            </div>

            <div class="flex flex-col justify-center items-start gap-2">
                <p class="font-semibold sm:text-sm xl:text-base 2xl:text-lg">Di chuyển</p>
                <p class="sm:text-xs xl:text-sm 2xl:text-base">Xe đưa đón, nhà công vụ</p>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>
