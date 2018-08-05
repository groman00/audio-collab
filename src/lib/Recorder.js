// https://github.com/mattdiamond/Recorderjs
// https://medium.com/creative-technology-concepts-code/recording-syncing-and-exporting-web-audio-1e1a1e35ef08

class Recorder {
  constructor(source, cfg) {
    // if ('Worker' in window) {
    //   const worker = new Worker("./worker.js");
    //   console.log('foo', worker);
    //   worker.onmessage = (e) => {
    //     console.log('message from worker', e);
    //   };
    // } else {
    //   alert("Sorry! No Web Worker support.");
    // }

    var config = cfg || {
      workerPath: "./worker.js"
    };
    var bufferLen = config.bufferLen || 8192; //4096
    var numChannels = config.numChannels || 2;
    this.context = source.context;
    this.node = (
      this.context.createScriptProcessor || this.context.createJavaScriptNode
    ).call(this.context, bufferLen, numChannels, numChannels);
    this.worker = new Worker(config.workerPath || WORKER_PATH);
    this.worker.postMessage({
      command: "init",
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: numChannels
      }
    });
    this.recording = false;
    this.currCallback;
    // var recording = false,
    //   currCallback;

    this.node.onaudioprocess = (e) => {
      if (!this.recording) return;
      console.log('recording', e);
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++) {
        buffer.push(e.inputBuffer.getChannelData(channel));
      }
      this.worker.postMessage({
        command: "record",
        buffer: buffer
      });
    };

    this.worker.onmessage = (e) => {
      var blob = e.data;
      this.currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination); //this should not be necessary

    console.log(this);
  }

  // stopWorker() {
  // w.terminate();
  // w = undefined;
  // }
  record() {
    this.recording = true;
  }

  stop() {
    this.recording = false;
  }

  exportWAV(cb, type, before, after){
    // this.currCallback = cb || config.callback;
    this.currCallback = cb;
    type = type || 'audio/wav';
    // type = type || config.type || 'audio/wav';
    if (!this.currCallback) throw new Error('Callback not set');
    this.worker.postMessage({
      command: 'exportWAV',
      type: type,
      before: before,
      after: after
    });
  }
}

export default Recorder;
