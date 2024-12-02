<template>
      <section class="w-full px-6 space-y-10 text-white" style="padding: 40px 150px;background-color: #0F1C2F;">
            <div class="flex flex-col justify-between w-full space-y-10">
                  <div class="xl:flex-row flex sm:flex-col xl:justify-between justify-start items-center gap-7 flex-1">
                        <div class="inline-flex justify-center items-center gap-8">
                            <img :src="Logo" alt="logo" class="sm:h-24 sm:w-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-56 2xl:h-56 ">

                            <div class="flex flex-col text-start gap-2">
                                  <p class="sm:text-base md:text-lg xl:text-xl 2xl:text-2xl font-bold">
                                    Home Media CT Group
                                  </p>
                                  <p class="sm:text-xs md:text-sm xl:text-base 2xl:text-xl">
                                    Léman Building – 20 Trương Định, Quận 3, TP.Hồ Chí Minh
                                  </p>
                                  <p class="sm:text-xs md:text-sm xl:text-base 2xl:text-xl">
                                    info@ctgroupvietnam.com
                                  </p>
                                  <p class="sm:text-xs md:text-sm xl:text-base 2xl:text-xl">
                                    (+84) 911 807 668 - (+84) 911 807 667
                                  </p>
                            </div>
                        </div>

                        <div class="xl:grid xl:grid-cols-4 sm:inline-flex gap-4 justify-center items-center mt-4 md:mt-0">
                            <img :src="facebookLogo" alt="facebook" class="" style="cursor: pointer;" @click="openFacebook">
                            <img :src="tiktokLogo" alt="tiktok" class="" style="cursor: pointer;" @click="openTiktok">
                            <img :src="gmailLogo" alt="gmail" class="" style="cursor: pointer;" @click="openGmail">
                            <img :src="instagramLogo" alt="instagram" class="" style="cursor: pointer;" @click="openInstagram">
                            <img :src="linkedlnLogo" alt="linkedln" class="" style="cursor: pointer;" @click="openLinkedln">
                            <img :src="twitterLogo" alt="twitter" class="" style="cursor: pointer;" @click="openTwitter">
                            <img :src="youtubeLogo" alt="youtube" class="" style="cursor: pointer;" @click="openYoutube">
                            <img :src="zaloLogo" alt="zalo" class="" style="cursor: pointer;" @click="openZalo">
                        </div>
                  </div>
            </div>

            <hr class="border-t border-gray-500 my-2 hidden lg:grid">

            <p class="text-center hidden lg:grid">© Copyright by CT GROUP</p>
      </section>
</template>

<script setup>
import Logo from '@/assets/images/HomeView/icons/company_icon.svg'
import facebookLogo from '@/assets/images/HomeView/icons/facebook_icon.svg'
import tiktokLogo from '@/assets/images/HomeView/icons/tiktok_icon.svg'
import gmailLogo from '@/assets/images/HomeView/icons/gmail_icon.svg'
import instagramLogo from '@/assets/images/HomeView/icons/instagram_icon.svg'
import linkedlnLogo from '@/assets/images/HomeView/icons/linkedIn_icon.svg'
import twitterLogo from '@/assets/images/HomeView/icons/twitter_icon.svg'
import youtubeLogo from '@/assets/images/HomeView/icons/youtube_icon.svg'
import zaloLogo from '@/assets/images/HomeView/icons/zalo_icon.svg'

const facebookLink = 'https://www.facebook.com/CTgroupVN'
const tiktokLink = 'https://www.tiktok.com/@tapdoanctgroupvn'
const gmailLink = 'http://info@ctgroupvietnam.com'
const instagramLink = 'https://www.instagram.com/ctgroup.vietnam/'
const linkedlnLink = 'https://www.linkedin.com/company/t%E1%BA%ADp-%C4%91o%C3%A0n-c.t-group/'
const twitterLink = 'https://twitter.com/CTGroup_vietnam'
const youtubeLink = 'https://www.youtube.com/channel/UC-iFhtlJaIhlyp_GGFvpRMg'
const zaloLink = 'https://zalo.me/1371516702089438441'

const openLink = (link) => {
  window.open(link, '_blank')
}

const openFacebook = () => {
  openLink(facebookLink)
}

const openTiktok = () => {
  openLink(tiktokLink)
}

const openGmail = () => {
  openLink(gmailLink)
}

const openInstagram = () => {
  openLink(instagramLink)
}

const openLinkedln = () => {
  openLink(linkedlnLink)
}

const openTwitter = () => {
  openLink(twitterLink)
}

const openYoutube = () => {
  openLink(youtubeLink)
}

const openZalo = () => {
  openLink(zaloLink)
}


</script>

<style scoped>
/* Add any scoped styles here */
</style>
