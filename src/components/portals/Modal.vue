<template>
<portal v-if="useModal" to="body">
    <div class="fixed top-0 left-0 right-0 bottom-0 z-50">
        <div class="w-full h-full relative flex justify-center items-center">
            <div @click="handleOutModal" class="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-75 z-10"></div>
            <div ref="modal-content" class="animate__duration__0.2 animate__animated relative shadow-xl flex
                        bg-white z-50 rounded-xl overflow-hidden" :class="{
                            'animate__pulse': useModal,
                            'w-3/4': width 
                        }" :style="[{maxHeight: '80%'}, (
                            width? {width}: {}
                        )]">
                <div class="w-full overflow-auto rounded-xl" style="max-height: 80%;">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</portal>
</template>
    
<script>
export default {
    name: "Modal",
    props: ['width', 'useModal'],
    emits: ['update:useModal'],
    methods: {
        handleOutModal() {
            this.$emit('update:useModal', false);
        }
    },
    watch: {
        'useModal': {
            handler(newQuestion) {
                const element = document.getElementsByTagName('body')
                if (element && element[0]) {
                    element[0].classList.toggle('overflow-hidden', newQuestion)
                }
            },
            immediate: true
        }
    },
}
</script>
