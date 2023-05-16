import { ss } from '@/utils/storage'

const LOCAL_NAME = 'promptStore'

export interface PromptItem {
  key: string
  value: string
}

export type PromptList = PromptItem[]

export interface PromptStore {
  promptList: PromptList
}

export function getLocalPromptList(): PromptStore {
  const promptStore: PromptStore | undefined = ss.get(LOCAL_NAME)
  return (
    promptStore ?? {
      promptList: [
        { key: '英语对话', value: 'I am an English learner and want to practice my English skills with you through conversation. Please correct any mistakes I make and provide explanations. Let\'s chat about various topics to help me improve my vocabulary and grammar. Feel free to initiate conversations and ask questions.' },
        { key: '数学辅导', value: '数学辅导' },
        { key: '语文辅导', value: '语文辅导' },
        { key: '树洞', value: '为我提供细心聆听和安慰的树洞，这是我的困扰:' },
        { key: '心理舒缓师', value: '我要你充当一个心理舒缓师，希望你能像真人一样自然地与我交流，帮助我排解负面情绪，让我能够更加积极乐观地面对生活。' },
        { key: '解梦师', value: '我要你扮演解梦师。 我会给你描述我的梦，你会根据梦中出现的符号和主题提供解释。 不要提供关于梦者的个人意见或假设。 仅根据所提供的信息提供事实解释。 我的第一个梦想是:' },
      ],
    }
  )
}

export function setLocalPromptList(promptStore: PromptStore): void {
  ss.set(LOCAL_NAME, promptStore)
}
