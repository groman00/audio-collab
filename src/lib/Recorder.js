/**
 * Modified from Recorderjs
 *
 * https://github.com/mattdiamond/Recorderjs
 * https://medium.com/creative-technology-concepts-code/recording-syncing-and-exporting-web-audio-1e1a1e35ef08
 */

const config = {
  workerPath: './worker.js',
  numChannels: 2,
  bufferLen: 8192 //4096
};

class Recorder {
  constructor(source) {
    const { bufferLen, numChannels, workerPath } = config;
    const { context } = source;

    this.recording = false;
    this.currCallback = Function.prototype;

    this.node = (
      context.createScriptProcessor || context.createJavaScriptNode
    ).call(context, bufferLen, numChannels, numChannels);

    this.worker = new Worker(workerPath);
    this.worker.postMessage({
      command: 'init',
      config: {
        sampleRate: context.sampleRate,
        numChannels: numChannels
      }
    });
    this.node.onaudioprocess = e => {
      if (!this.recording) return;
      console.log('recording', e);
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++) {
        buffer.push(e.inputBuffer.getChannelData(channel));
      }
      this.worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    };
    this.worker.onmessage = e => {
      var blob = e.data;
      this.currCallback(blob);
    };
    source.connect(this.node);
    this.node.connect(context.destination);
  }

  stopWorker() {
    this.worker.terminate();
    this.worker = undefined;
  }

  record() {
    this.recording = true;
  }

  stop() {
    this.recording = false;
  }

  exportWAV(cb, type, before, after) {
    this.currCallback = cb;
    type = type || 'audio/wav';
    this.worker.postMessage({
      command: 'exportWAV',
      type: type,
      before: before,
      after: after
    });
  }
}

export default Recorder;
