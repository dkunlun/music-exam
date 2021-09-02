<template>
    <div class="content">
        <div class="left">
            <div class="item" @click="clickLeft(item)" v-for="item in listLeft" :key="item" :ref="item">{{item}}</div>
        </div>
        <div class="right">
            <div class="item" @click="clickRight(item)" v-for="item in listRight" :key="item" :ref="item">{{item}}</div>
        </div>
        <audio controls>
            <source src="static/music.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <button class="recorder" @click="recorder">recorder</button>
        <button class="play" @click="play">play</button>
        <button class="download" @click="download">download</button>
        <video id="video"></video>
        <input type="file" ref="file">
    </div>
</template>

<script>
import { jsPlumb } from 'jsplumb'
import Recorder from 'js-audio-recorder'
import { upload } from '../api'

export default {
    data () {
        return {
            listLeft: ['A', 'B', 'C', 'D'],
            listRight: ['E', 'F', 'G', 'H'],
            currentLeft: null,
            currentRigth: null,
            ins: {},
            recordIns: new Recorder()
        }
    },
    methods: {
        clickLeft (item) {
            console.log(this.ins)
            this.currentLeft = this.$refs[item]
        },
        clickRight (item) {
            this.currentRigth = this.$refs[item]
            if(this.currentLeft) {
                jsPlumb.ready(() => {
                    jsPlumb.bind('beforeDrop', function (info) {
                        console.log(info)
                    })
                    this.ins = jsPlumb.connect({
                        source: this.currentLeft,
                        target: this.currentRigth,
                        endpoint: 'Blank',
                        connector: ['Straight'],
                        anchor: ['Left', 'Right'],
                        paintStyle: { stroke: 'red', strokeWidth: 3 },
                        maxConnections: 1
                    })
                })
                this.currentLeft = null
            }
        },
        async recorder () {
            this.recordIns.start().then(() => {
                console.log('开始录音')
            }, (error) => {
                // 出错了
                console.log(`${error.name} : ${error.message}`);
            });
        },
        play () {
            console.log(this.recordIns.getPCMBlob())
            this.recordIns.play()
        },
        download () {
            var formData = new FormData()
            let files = new window.File([this.recordIns.getWAVBlob()], new Date().getTime()+'.wav', {type: 'wav'})
            formData.append('file', files)
            upload(formData)
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    display: flex;
    justify-content: space-around;
    .item {
        cursor: pointer;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: red;
        margin-bottom: 10px;
    }
}
</style>