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
      workerPath: './worker.js'
    };
    var bufferLen = config.bufferLen || 8192; //4096
    var numChannels = config.numChannels || 2;
    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
                 this.context.createJavaScriptNode).call(this.context,
                 bufferLen, numChannels, numChannels);
    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: numChannels
      }
    });
    var recording = false,
      currCallback;


    this.node.onaudioprocess = function(e){
      console.log(e);
      if (!recording) return;
      var buffer = [];
      for (var channel = 0; channel < numChannels; channel++){
          buffer.push(e.inputBuffer.getChannelData(channel));
      }
      worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    }


    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary

    console.log(this);
  }

  // stopWorker() {
    // w.terminate();
    // w = undefined;
  // }

}

export default Recorder;