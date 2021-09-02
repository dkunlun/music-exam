<template>
    <div class="choice">
        <div class="header"></div>
        <div class="radio-question" v-show="currentType === 'radioList'">
            <div class="content">
                <div class="title">选择题</div>
                <div class="desc">{{this.currentQu.content}}</div>
                <el-radio-group v-model="select">
                    <el-radio :label="item.answerId" v-for="item in this.currentQu.answerList" :key="item.answerId">
                        <span>{{item.abc}}</span>
                        {{item.content}}
                    </el-radio>
                </el-radio-group>
            </div>
            <div class="operation">
                <el-radio-group v-model="select">
                    <el-radio :label="item.answerId" v-for="item in this.currentQu.answerList" :key="item.answerId">
                        {{item.abc}}
                    </el-radio>
                </el-radio-group>
            </div>
        </div>
        <div v-show="currentType === 'linkList'" >
            <linkQu :quDetail="currentQu" ref="link"/>
            <div class="operation">
            </div>
        </div>
        <div class="system">
            <VueAudio :theUrl="'static/music.mp3'" :theControlList="'onlyOnePlaying'"/>
            <div class="btn">
                <el-button @click="prev">上一题</el-button>
                <el-button @click="next">下一题</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import VueAudio from './VueAudio.vue'
import linkQu from './LinkQu.vue'
import { onlinePaging, createPaper, paperDetail, quDetail, answer } from '../api'
import { mapActions, mapState } from 'vuex'
let quMap = {
    radioList: {
        prev: null,
        next: 'linkList',
    },
    linkList: {
        prev: 'radioList',
        next: 'singList'
    },
    singList: {
        prev: 'linkList',
        next: 'rhythmList'
    },
    rhythmList: {
        prev: 'singList',
        next: null
    }
}
export default {
    data () {
        return {
            select: null,
            currentType: 'linkList',
            currentQu: {
                answerList: []
            },
            index: 0,
            answerMap: {}
        }
    },
    components: {
        VueAudio,
        linkQu
    },
    methods: {
        ...mapActions('Users', ['setPaper', 'updateQu']),
        async getQuestionDetail () {
            let res = await quDetail({
                paperId: this.currentQuestions[this.index].paperId,
                quId: this.currentQuestions[this.index].quId
            })
            if(res.code === 0) {
                res.data.answer = this.answerMap[this.currentQuestions[this.index].quId]
                this.currentQu = res.data
            }
        },
        async prev () {
            await this.answer()
            if((this.index + 1) === this.currentQuestions.length) {
                this.$refs.link.reset()
                this.currentType = quMap[this.currentType].prev
                this.index = 0
            } else {
                this.index--
            }
            this.getQuestionDetail()
        },
        async next () {
            await this.answer()
            if((this.index + 1) === this.currentQuestions.length) {
                this.$refs.link.reset()
                this.currentType = quMap[this.currentType].next
                this.index = 0
            } else {
                this.index++
            }
            this.getQuestionDetail()
        },
        async answer () {
            var data = {
                // contentUrls: ["123@aa", "22@33"],
                paperId: this.currentQuestions[this.index].paperId,
                quId: this.currentQuestions[this.index].quId
            }
            if(this.currentType === 'radioList') {
                data.answers = [this.select]
            } else if(this.currentType === 'linkList') {
                data.answers = this.$refs.link.answers
                this.answerMap[this.currentQuestions[this.index].quId] = data.answers
            }
            return answer(data)
        }
    },
    computed: {
        ...mapState('Users', ['paperDetail']),
        currentQuestions () {
            if(this.paperDetail.id) {
                return this.paperDetail[this.currentType]
            } else {
                return null
            }
        }
    },
    async created () {
        let res = await onlinePaging({
            current: 1,
            params: {},
            size: 10,
            t: new Date().getTime
        })
        if(res.code !== 0) return
        let res2 = await createPaper({
            examId: res.data.records[1].id
        })
        if(res2.code !== 0) return
        let detail = await paperDetail({
            id: res2.data.id
        })
        if(detail.code !== 0) return
        this.setPaper(detail.data)
        this.getQuestionDetail()
    }
}
</script>

<style lang="scss" scoped>
.choice {
    .header {
        height: 71px;
        width: 100%;
        background: #5364FF;
    }
    .content {
        padding-left: 35px;
        padding-top: 16px;
        height: calc(100vh - 200px);
        .title {
            font-size: 20px;
            font-weight: Bold;
        }
        .desc {
            font-size: 20px;
            margin-top: 36px;
            margin-bottom: 31px;
        }
        .el-radio-group {
            display: flex;
            flex-direction: column;
            > .el-radio {
                margin-bottom: 16px;
                font-size: 20px;
                span {
                    margin-right: 23px;
                }
            }
        }
    }
    ::v-deep .el-radio__input {
        display: none;
    }
    .operation {
        width: 80%;
        background: #b9b2ee;
        border: 1px solid #777777;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 61px;
        .el-radio-group {
            display: flex;
        }
        ::v-deep .el-radio {
            width: 45px;
            height: 40px;
            opacity: 1;
            background: #ffffff;
            border: 1px solid #797979;
            border-radius: 21px;
            font-size: 20px;
            text-align: center;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content: center;
            &.is-checked {
                background: #9fdefd;
                .el-radio__label {
                    color: #ffffff;
                }
            }
            .el-radio__label {
                padding: 0;
            }
        }
    }
    .system {
        height: 69px;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>