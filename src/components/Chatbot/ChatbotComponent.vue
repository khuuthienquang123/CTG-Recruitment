<script setup>
import ChaBotIcon from '@/assets/images/Chatbot/header/chatbot_icon.svg'
import RefreshChatIcon from '@/assets/images/Chatbot/header/refresh_chat_icon.svg'
import SendButtonIcon from '@/assets/images/Chatbot//send_btn.svg'
import ChatBotMessageMenuIcon from '@/assets/images/Chatbot/chatbot_main.svg'
import CloseButtonIcon from '@/assets/images/Chatbot/close_button.svg'

import { ref } from 'vue'
import ChatLoadingAnimation from '@/components/Chatbot/ChatLoadingAnimation.vue'

const messages = ref([])
const newMessage = ref('')
const loadingBotResponse = ref(false)

const emit = defineEmits(['toggle-chatbot'])
const toggleChatBot = () => {
    emit('toggle-chatbot', false)
}

const sendMessage = () => {
    if (newMessage.value !== '') {
        messages.value.push({
            type: 'user',
            content: newMessage.value,
        })
        newMessage.value = ''
        messages.value.push({ type: 'bot', content: '...', isLoading: true })

        loadingBotResponse.value = true
        setTimeout(() => {
            messages.value.pop()
            messages.value.push({ type: 'bot', content: 'This is a response from the bot.' })
            loadingBotResponse.value = false
        }, 5000)
    }
}

const refreshChat = () => {
    messages.value = []
}
</script>

<template>
        <div
            class="flex flex-col justify-center items-center bg-white shadow-md rounded-lg w-full h-full"
        >
            <!--HEADER-->
            <div
                class="inline-flex justify-between items-center w-full h-fit py-2 sm:px-2 md:px-3 lg:px-4 rounded-t-lg bg-blue-500"
            >
                <div class="inline-flex justify-start items-center w-full h-full">
                    <img
                        :src="ChaBotIcon"
                        alt="Chatbot Icon"
                        class="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:14 2xl:14"
                    />
                    <p
                        class="font-bold text-base sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-white text-nowrap"
                    >
                        CT Assistant
                    </p>
                </div>
                <div class="inline-flex justify-end items-center w-full h-full gap-4">
                    <img
                        @click="refreshChat"
                        :src="RefreshChatIcon"
                        alt="refresh chat icon"
                        class="sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 cursor-pointer"
                    />

                    <img @click="toggleChatBot" :src="CloseButtonIcon" alt="Close button" class="w-3 h-3">
                </div>
            </div>

            <!--BODY-->
            <div
                class="flex flex-col justify-start items-start w-full h-full p-2 overflow-y-auto chat_height"
            >
                <div
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="{
                        'self-end': message.type === 'user',
                        'self-start ': message.type === 'bot' && !loadingBotResponse,
                    }"
                    class="mb-2 inline-flex justify-start items-center w-fit h-fit"
                >
                    <img
                        v-if="message.type === 'bot'"
                        :src="ChatBotMessageMenuIcon"
                        alt="Chatbot Message Icon"
                        class="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14"
                    />
                    <p
                        v-if="!message.isLoading && message.type === 'user'"
                        class="border border-blue-500 text-black p-2 rounded-md text-wrap sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base"
                    >
                        {{ message.content }}
                    </p>
                    <p
                        v-else-if="!message.isLoading && message.type === 'bot'"
                        class="bg-blue-300 p-2 rounded-md text-black w-3/4 text-wrap text-start sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base"
                    >
                        {{ message.content }}
                    </p>
                    <ChatLoadingAnimation v-else />
                </div>
            </div>

            <!--INPUT-->
            <div class="inline-flex justify-center items-center w-full h-fit gap-4 px-4 py-2">
                <input
                    v-model="newMessage"
                    @keyup.enter="sendMessage"
                    type="text"
                    placeholder="Viết gì đó đi nào..."
                    class="border border-gray-300 rounded-lg text-black w-full h-full px-2 sm:py-0 md:py-1 lg:py-2 xl:py-3"
                />
                <button @click="sendMessage" class="rounded-lg bg-blue-500 p-2">
                    <img
                        :src="SendButtonIcon"
                        alt="Send Button Icon"
                        class="sm:w-2 sm:h-2 md:w-4 md:h-4 lg:h-6 lg:w-6 xl:w-8 xl:h-8 mr-2"
                    />
                </button>
            </div>
        </div>
</template>

<style scoped>
.self-end {
    align-self: flex-end;
    text-align: right;
}

.self-start {
    align-self: flex-start;
    text-align: left;
}

@media (min-width: 640px) and (max-width: 767px) {
    .chat_height {
        height: 200px;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .chat_height {
        height: 250px;
    }
}

@media (min-width: 1024px) and (max-width: 1535px) {
    .chat_height {
        height: 300px;
    }
}

@media (min-width: 1536px) {
    .chat_height {
        height: 400px;
        width: 350px;
    }
}
</style>
