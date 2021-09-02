<template>
    <div class="link">
        <div class="title">连线题</div>
        <div class="subtitle">根据音乐片段链接曲目</div>
        <div class="content">
            <div class="list">
                <div class="item" v-for="(item, $index) in quDetail.answerList" :key="item.id">
                    <div class="left">
                        <VueAudio :theUrl="item.contentUrl" :theControlList="'onlyOnePlaying noVolume'" :type="'link'"/>
                        <div class="dot" @click="clickLeft(item, $index)" :ref="item.id"></div>
                    </div>
                    <div class="right">
                        <div class="dot" @click="clickRight(item)" :ref="item.answerId"></div>
                        {{item.content}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { jsPlumb } from 'jsplumb'
import VueAudio from './VueAudio.vue'

export default {
    data () {
        return {
            currentLeft: null,
            currentRigth: null,
            answers: [null, null, null, null],
            currentIndex: null,
            answerId: null
        }
    },
    props: {
        quDetail: {
            type: Object,
            default: {
                answerList: []
            }
        }
    },
    components: {
        VueAudio
    },
    watch: {
        quDetail() {
            this.$nextTick(e => {
                if(Array.isArray(this.quDetail.answer)) {
                    this.quDetail.answer.forEach((item, index) => {
                        if(!item) return 
                        jsPlumb.ready(() => {
                            this.ins = jsPlumb.connect({
                                source: this.$refs[this.quDetail.answerList[index].id],
                                target: this.$refs[item],
                                endpoint: 'Blank',
                                connector: ['Straight'],
                                anchor: ['Left', 'Right'],
                                paintStyle: { stroke: '#009DFF', strokeWidth: 3 },
                                maxConnections: 1
                            })
                        })
                    })
                }
            })
        }
    },
    methods: {
        reset () {
            jsPlumb.deleteEveryConnection()
            this.currentLeft = null
            this.currentRigth = null
            this.answers = [null, null, null, null]
            this.currentIndex = null
            this.answerId = null
        },
        clickLeft (item, index) {
            if(this.$refs[item.id][0].className.includes('jtk-connected')) return
            this.currentLeft = this.$refs[item.id]
            this.currentIndex = index
            if(this.currentRigth) {
                this.link()
            }
        },
        clickRight (item) {
            if(this.$refs[item.answerId][0].className.includes('jtk-connected')) return
            this.currentRigth = this.$refs[item.answerId]
            this.answerId = item.answerId
            if(this.currentLeft) {
                this.link()
            }
        },
        link () {
            this.answers[this.currentIndex] = this.answerId
            jsPlumb.ready(() => {
                this.ins = jsPlumb.connect({
                    source: this.currentLeft,
                    target: this.currentRigth,
                    endpoint: 'Blank',
                    connector: ['Straight'],
                    anchor: ['Left', 'Right'],
                    paintStyle: { stroke: '#009DFF', strokeWidth: 3 },
                    maxConnections: 1
                })
            })
            this.currentLeft = null
            this.currentRigth = null
        }
    }
}
</script>

<style lang="scss" scoped>
.link {
    padding-left: 15px;
    .title {
        font-size: 20px;
        font-weight: Bold;
        text-align: left;
        color: #333333;
        line-height: 20px;
        margin: 16px 0 36px 0;
    }
    .subtitle {
        margin-bottom: 36px;
    }
    .content {
        width: 80%;
        height: 343px;
        background: #ebe3ee;
        border: 1px solid #777777;
        padding-top: 55px;
        .list {
            ::v-deep .el-slider {
                width: 100%;
            }
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-left: 100px;
                .dot {
                    display: inline-block;
                }
                .left {
                    display: flex;
                    align-items: center;
                    width: 40%;
                    .dot {
                        width: 15px;
                        height: 15px;
                        background: #009DFF;
                        border-radius: 20px;
                    }
                }
                .right {
                    width: 30%;
                    display: flex;
                    align-items: center;
                    display: flex;
                    .dot {
                        margin-right: 20px;
                        width: 15px;
                        height: 15px;
                        border: 2px solid #009DFF;
                        border-radius: 20px;
                    }
                }
            }
        }
    }
}
</style>