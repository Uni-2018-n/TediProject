<template>
    <div class="external">
        <div class="inside">
            <div class="top">
                <img
                src="@/assets/blank-profile-picture.png"
                width="55"
                height="55"
                />
                <div class="text">
                    <span class="name">Antonis Kalamakis {{ id }}</span>
                </div>
            </div>
            <div class="chat">
                <Bubles :src="messages"/>
            </div>
            <div class="input">
                <textarea id="postTextArea" @input="resize($event)" rows="1" placeholder="Type Here..."></textarea>
                <div class="send">
                    <img
                    src="@/assets/outline_send_black_24dp.png"
                    width="25"
                    height="25"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Bubles from "../communicationPage/bubles.vue"
export default defineComponent({
    name: "chat",
    props: {
        id: {type: String, required: true},
    },
    components: {
        Bubles,
    },
    setup(props) {
        const messages = reactive([
            {
                me: true,
                message: "0000000Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.  "
            },
            {
                me: false,
                message: "test2"
            },
            {
                me: true,
                message: "test3"
            },
            {
                me: false,
                message: "test4"
            },
            {
                me: true,
                message: "Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.  "
            },
            {
                me: false,
                message: "test2"
            },
            {
                me: true,
                message: "test3"
            },
            {
                me: false,
                message: "test4"
            },
            {
                me: true,
                message: "Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.  "
            },
            {
                me: false,
                message: "test2"
            },
            {
                me: true,
                message: "test3"
            },
            {
                me: false,
                message: "test4"
            },
            {
                me: true,
                message: "Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.  "
            },
            {
                me: false,
                message: "test2"
            },
            {
                me: true,
                message: "test3"
            },
            {
                me: false,
                message: "test4"
            },
            {
                me: true,
                message: "Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.Extended kindness trifling remember he confined outlived if. Assistance sentiments yet unpleasing say. Open they an busy they my such high. An active dinner wishes at unable hardly no talked on. Immediate him her resolving his favourite. Wished denote abroad at branch at. Old there any widow law rooms. Agreed but expect repair she nay sir silent person. Direction can dependent one bed situation attempted. His she are man their spite avoid. Her pretended fulfilled extremely education yet. Satisfied did one admitting incommode tolerably how are.  "
            },
            {
                me: false,
                message: "test2"
            },
            {
                me: true,
                message: "test3"
            },
            {
                me: false,
                message: "test0000"
            }
        ])
        
        const resize = (e: Event) => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight +'px';
        };
        return { messages, resize }
    },
})
</script>
<style scoped>
.external {
    height: 100%;
    min-height: 0px;
    background-color: white;
    /* border: solid; */
    /* border-width: 3px; */
    /* border-color: rgb(212, 212, 212); */
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
}

.inside {
    padding: 2px;
    height: 100%;
    min-height: 0px;
    display: flex;
    flex-direction: column;
}

.top {
    display: flex;
    padding: 10px;
    border-bottom: solid;
    border-color: rgb(201, 201, 201);
    border-width: 1px;
}
.top img {
    border-radius: 30px;
    vertical-align: middle;
    margin-right: 5px;
}
.text {
    margin-top: 10px;
}
.name {
    font-size: 15px;
    font-family: "Poppins", Arial, sans-serif;
    font-weight: bolder;
}
.chat {
    flex: 1;
    min-height: 0px;

}
.input {
    padding: 0px 10px 15px 10px;
    margin-top: 15px;
    display: flex;
    align-items:flex-end;
}
textarea {
    padding: 8px;
    background: rgba(0, 0, 0, 0.07);
    border-radius: 15px;
    border: none;
    resize: none;
    font-size: 15px;
    width: 100%;
    box-sizing: border-box;
}
textarea:focus {
    outline: none !important;
}
.send {
    margin: 0px 0px 0px 5px;
    padding: 0;
}
.send img {
    padding: 0;
    margin: 0;
}
.send img:hover {
    opacity: 0.7;
    cursor: pointer;
}
</style>