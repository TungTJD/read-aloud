<template>
  <div>
    <a-button style="display: block;margin-bottom: 16px" @click="flushed">开始朗读</a-button>
    <span
      style="letter-spacing: 3px;display: inline-block;word-break: break-all;"
      :style="{ textIndent : !index? '2em': 0, color: index == textIndex ? 'dodgerblue' : '#333'}"
      v-for="(item,index) in textList"
      :key="'text' + index"
    >{{ item }}</span>
  </div>
</template>

<script setup>
import { Button as AButton } from "ant-design-vue";
const readText = '人生的旅途就像一场长跑，前路漫漫，充满了坎坷和挑战。在这条路上，有人顺利地到达了终点，而有人却屡次跌倒，不得不重新爬起。但无论是成功还是失败，每一步都是一种收获，是人生路上宝贵的经验。' +
    '人生的成功与否，往往取决于你的心态。面对挫折和困难，有人会灰心丧气，被打败；而有人却会坚定不移地向前，不断寻找解决问题的方法，最终取得成功。这是因为成功的人不会放弃，而是把每次挫败看作是自己的成长机会。正是这种积极的心态，让他们在人生的道路上行进得更加稳健。' +
    '当然，追求成功并不是人生的唯一目标。在这段旅途中，我们也应该学会欣赏身边的美好，感受生活的情趣。在生活的点滴中，有快乐，有悲伤，有幸福，也有痛苦，但这些都是构成人生的一部分。拥有一颗感恩的心，学会珍惜，也许才是人生真正的成功。' +
    '无论在人生的哪个阶段，我们都需要有一个积极向上的心态。因为只有这样，我们才能在前行的路上越走越坚定，取得更多的成就。让我们用一颗乐观的心态，去迎接人生的挑战和机遇，不断向前，不断超越自己。'
const { textList } = reactive({
  textList: [],
})
let { textIndex } = {
  textIndex: ref([0])
}
// const websocket = new WebSocket('ws://localhost:8080/websocket')
const audioContext = new AudioContext();
let audioSource = null;
// let audioSource = audioContext.createBufferSource();
const websocket = new WebSocket('ws://localhost:8080/websocket');
websocket.binaryType = 'arraybuffer';

const loadingSong = (data) => {
  if(audioSource !== null) {
    audioSource.stop()
  }

  // 接收到二进制数据，使用 ArrayBuffer 类型处理
  const audioData = new Float32Array(data);
  const dataView = new DataView(audioData.buffer);


  const channels = 1; // 声道数
  const sampleRate = 16000; // 采样率
  const byteRate = sampleRate * channels * 2; // 每秒采样字节数
  const blockAlign = channels * 2; // 每个采样帧的字节数
  const startOffset = 0; // 开始偏移
  const endOffset = audioData.buffer.byteLength; // 结束偏移，即 PCM 数据的总字节数

  // 创建 AudioBuffer
  const audioBuffer = audioContext.createBuffer(
    channels, // 声道数
    endOffset / blockAlign, // 采样帧数
    sampleRate // 采样率
  );

  // 将 PCM 数据写入 AudioBuffer
  for (let channel = 0; channel < channels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = startOffset; i < endOffset; i += blockAlign) {
      const sample = dataView.getInt16(i, true) / 32768; // 读取一个采样，转换为 [-1, 1] 之间的浮点数
      channelData[(i - startOffset) / blockAlign] = sample; // 写入 AudioBuffer
    }
  }


  audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.connect(audioContext.destination);

  audioSource.onended = () => {
    flushed()
  }

  audioSource.start();
  textIndex.value ++;
}


const flushed = () => {
  textList[textIndex.value] && websocket.send(textList[textIndex.value])
}

websocket.onopen = () => {
  console.log("WebSocket opened.");
}

websocket.onclose = function() {
  console.log("WebSocket closed.");
};

websocket.onerror = function(event) {
  console.log("WebSocket error: " + event);
};

websocket.onmessage = (event) => {
  if (event.data instanceof ArrayBuffer) {
    loadingSong(event.data)
  }
}

let _bit = 0
for (let i in readText) {
  if(readText[i] === '，' || readText[i] === '。') {
    textList.push(readText.slice(_bit, Number(i) + 1))
    _bit = Number(i) + 1
  }
}

</script>
