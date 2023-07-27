import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useModalStore = defineStore('modal', () => {
  const modal = ref({
    state: false,
    type: null,
    content: {
      title: 'This is modal title',
      description: 'this is modal descroption',
      textBtn: 'Button',
      inputValue: 'Some Value',
      btnAction: null,
      actionParams: null
    }
  })
  const modalInput = ref('')

  // getter
  const isModalOpen = computed(() => modal.value.state) 
  const modalContent = computed(() => modal.value.content)
  const modalType = computed(() => modal.value.type)
  const modalBtnAction = computed(() => modal.value.content.btnAction)
  const modalActionParams = computed(() => modal.value.content.actionParams)
  const getModalInput = computed(() => modalInput.value)

  // action
  const closeModal =() => {
    modal.value.state = false
  }

  const openModal = () => {
    modal.value.state = true
  }

  const setModal = (type, data) => {
    modal.value.type = type
    modal.value.content.title = data?.title
    modal.value.content.description = data?.description
    modal.value.content.textBtn = data?.textBtn
    modal.value.content.inputValue = data?.inputValue
    modal.value.content.btnAction = data?.btnAction
    modal.value.content.actionParams = data?.actionParams
  }

  const setModalInput = (input) => {
    modalInput.value = input
  }

  return {
    closeModal,
    openModal,
    isModalOpen,
    setModal,
    modalContent,
    modalType,
    modalBtnAction,
    modalActionParams,
    setModalInput,
    getModalInput
  }
})