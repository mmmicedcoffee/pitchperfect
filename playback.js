      function timecode(ms) {
        var hms = {
          h: Math.floor(ms/(60*60*1000)),
          m: Math.floor((ms/60000) % 60),
          s: Math.floor((ms/1000) % 60)
        };
        var tc = []; // Timecode array to be joined with '.'

        if (hms.h > 0) {
          tc.push(hms.h);
        }

        tc.push((hms.m < 10 && hms.h > 0 ? "0" + hms.m : hms.m));
        tc.push((hms.s < 10  ? "0" + hms.s : hms.s));

        return tc.join(':');
      }
    
    
      Recorder.initialize({
        swfSrc: "external_js/recorder.swf"
      });

      function record(){
        Recorder.record({
          start: function(){
            //alert("recording starts now. press stop when youre done. and then play or upload if you want.");
          },
          progress: function(milliseconds){
            document.getElementById("time").innerHTML = timecode(milliseconds);
          }
        });
      }
      
      function play(){
        Recorder.stop();
        Recorder.play({
          progress: function(milliseconds){
            document.getElementById("time").innerHTML = timecode(milliseconds);
          }
        });
      }
      
      function stop(){
        Recorder.stop();
      }
      
      function upload(){
        Recorder.upload({
          url:        "https://example.com/upload",
          audioParam: "your_file",
          success: function(){
            alert("your file was uploaded!");
          }
        });
      }

function playExample() {
    var Synth = function(audiolet, frequency, length) {
        AudioletGroup.apply(this, [audiolet, 0, 1]);
        this.sine = new Sine(this.audiolet, frequency);
        this.modulator = new Saw(this.audiolet, frequency * 2);
        this.modulatorMulAdd = new MulAdd(this.audiolet, frequency / 2,
                                          frequency);

        this.gain = new Gain(this.audiolet);
        this.envelope = new PercussiveEnvelope(this.audiolet, 1, 0.2, 0.2 + (0.3*length),
            function() {
                this.audiolet.scheduler.addRelative(0,
                                                    this.remove.bind(this));
            }.bind(this)
        );

        this.modulator.connect(this.modulatorMulAdd);
        this.modulatorMulAdd.connect(this.sine);

        this.envelope.connect(this.gain, 0, 1);
        this.sine.connect(this.gain);

        this.gain.connect(this.outputs[0]);
    };

    extend(Synth, AudioletGroup);

    var AudioletApp = function() {
        this.audiolet = new Audiolet();

            this.audiolet.scheduler.addAbsolute(0, function() {
                var synth = new Synth(this.audiolet, 262, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(1, function() {
                var synth = new Synth(this.audiolet, 262, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(2, function() {
                var synth = new Synth(this.audiolet, 392, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(3, function() {
                var synth = new Synth(this.audiolet, 392, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(4, function() {
                var synth = new Synth(this.audiolet, 440, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(5, function() {
                var synth = new Synth(this.audiolet, 440, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(6, function() {
                var synth = new Synth(this.audiolet, 392, 2);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(8, function() {
                var synth = new Synth(this.audiolet, 349, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(9, function() {
                var synth = new Synth(this.audiolet, 349, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(10, function() {
                var synth = new Synth(this.audiolet, 330, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(11, function() {
                var synth = new Synth(this.audiolet, 330, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(12, function() {
                var synth = new Synth(this.audiolet, 294, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(13, function() {
                var synth = new Synth(this.audiolet, 294, 1);
                synth.connect(this.audiolet.output);
            }.bind(this));

            this.audiolet.scheduler.addAbsolute(14, function() {
                var synth = new Synth(this.audiolet, 262, 2);
                synth.connect(this.audiolet.output);
            }.bind(this));
    };

    this.audioletApp = new AudioletApp();
};