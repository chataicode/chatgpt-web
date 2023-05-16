<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { fetchChatConfig } from '@/api'
import { useAuthStore } from '@/store'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">
      关于SiliAi
    </h2>
    <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
      <p>
        SiliAI是基于先进的ChatGPT API，致力于帮助您在短时间内掌握各种技能。通过与我们的AI聊天机器人互动，您可以获得实时反馈、建议和指导，以提高学习效率并节省宝贵时间。
      </p>
    </div>
    <div>
      <p>如需帮助，请发送邮件与我联系：<a href="mailto:chataicode@gmail.com">chataicode@gmail.com</a></p>
    </div>
  </div>
</template>
