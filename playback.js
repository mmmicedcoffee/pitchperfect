var init = true;
var playing = false;
var tempo = 120;
var vol = 0.75;
var metronomeFlag = false;

$(function() {
    // play/pause/stop buttons
    $("#playbackBtn").click(function() {
        if (init) {
            initPlayback();
        } else {
            if (!playing) {
                unpausePlayback();
            } else {
                pausePlayback();
            }
        }
    });

    $("#stopPlaybackBtn").click(function() {
        resetPlayback();
    });
});

var Synth = function(audiolet, frequency, length) {
    AudioletGroup.apply(this, [audiolet, 0, 1]);
    this.sine = new Sine(this.audiolet, frequency);
    this.modulator = new Saw(this.audiolet, frequency * 2);
    this.modulatorMulAdd = new MulAdd(this.audiolet, frequency / 2, frequency);

    this.gain = new Gain(this.audiolet);
    this.envelope = new PercussiveEnvelope(this.audiolet, 1, 0.2, 0.2 + (0.3*length),
        function() {
            this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
        }.bind(this)
    );
    this.volumeEnvelope = new MulAdd(this.audiolet, vol);

    this.modulator.connect(this.modulatorMulAdd);
    this.modulatorMulAdd.connect(this.sine);

    this.envelope.connect(this.volumeEnvelope);
    this.volumeEnvelope.connect(this.gain, 0, 1);
    this.sine.connect(this.gain);

    this.gain.connect(this.outputs[0]);
};

var Kick = function(audiolet) {
        AudioletGroup.call(this, audiolet, 0, 1);
        // White noise source
        this.white = new WhiteNoise(audiolet);

        // Gain envelope
        this.gainEnv = new PercussiveEnvelope(audiolet, 1, 0.01, 0.05,
            function() {
                // Remove the group ASAP when env is complete
                this.audiolet.scheduler.addRelative(0,
                                                    this.remove.bind(this));
            }.bind(this)
        );
        this.gainEnvMulAdd = new MulAdd(audiolet, 0.1);
        this.gain = new Gain(audiolet);

        // Filter
        this.filter = new BandPassFilter(audiolet, 3000);

        this.upMixer = new UpMixer(audiolet, 2);

        // Connect the main signal path
        this.white.connect(this.filter);
        this.filter.connect(this.gain);

        // Connect the gain envelope
        this.gainEnv.connect(this.gainEnvMulAdd);
        this.gainEnvMulAdd.connect(this.gain, 0, 1);
        this.gain.connect(this.upMixer);
        this.upMixer.connect(this.outputs[0]);
}

var AudioletApp = function() {
    this.audiolet = new Audiolet();

    // Set BPM
    this.audiolet.scheduler.setTempo(tempo);

    // turn on metronome if set
    if (metronomeFlag) {
        this.playKick();
    }

    this.e = this.audiolet.scheduler.addAbsolute(0, function() {
        this.audiolet.scheduler.addRelative(0, function() {
            this.playNote(262, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(1, function() {
            this.playNote(262, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(2, function() {
            this.playNote(392, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(3, function() {
            this.playNote(392, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(4, function() {
            this.playNote(440, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(5, function() {
            this.playNote(440, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(6, function() {
            this.playNote(392, 2);
        }.bind(this));

        this.audiolet.scheduler.addRelative(8, function() {
            this.playNote(349, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(9, function() {
            this.playNote(349, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(10, function() {
            this.playNote(330, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(11, function() {
            this.playNote(330, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(12, function() {
            this.playNote(294, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(13, function() {
            this.playNote(294, 1);
        }.bind(this));

        this.audiolet.scheduler.addRelative(14, function() {
            this.playNote(262, 2);
            this.audiolet.scheduler.addRelative(2, function () {
                resetPlayback();
            })
        }.bind(this));

    }.bind(this));

};

AudioletApp.prototype.playNote = function(frequency, length) {
    var synth = new Synth(this.audiolet, frequency, length);
    synth.connect(this.audiolet.output);
}

AudioletApp.prototype.pause = function() {
    this.audiolet.device.paused = true;
}

AudioletApp.prototype.unpause = function() {
    this.audiolet.device.paused = false;
}

AudioletApp.prototype.playKick = function() {
    // Kick - scheduled as a poly synth (i.e. a new instance is
    // launched for each note)

    // Four to the floor pattern
    // Schedule the patterns to play
    this.audiolet.scheduler.addRelative(0.03, function() {
        this.audiolet.scheduler.play([], 1,
            function() {
                var kick = new Kick(this.audiolet);
                kick.connect(this.audiolet.output);
                console.log("Kick");
            }.bind(this)
        );
    }.bind(this));

}

function initPlayback() {
    extend(Synth, AudioletGroup);
    extend(Kick, AudioletGroup);
    this.audioletApp = new AudioletApp();
    playing = true;
    init = false;
    togglePause();
    $("#stopPlaybackBtn").removeAttr("disabled");
};

function pausePlayback() {
    this.audioletApp.pause();
    playing = false;
    togglePlay();
}

function unpausePlayback() {
    this.audioletApp.unpause();
    playing = true;
    togglePause();
}

function resetPlayback() {
    this.audioletApp.pause();
    init = true;
    playing = false;
    togglePlay();
    $("#tempoSlider").slider("option", "disabled", false);      
    $("#tempo").removeAttr("disabled");
    $("#metronomeButton").removeAttr("disabled");
    $("#stopPlaybackBtn").attr("disabled", "disabled");
}

function togglePlay() {
    $("#playbackIcon").addClass("icon-play");
    $("#playbackIcon").addClass("play-color");
    $("#playbackIcon").removeClass("icon-pause");  
}

function togglePause() {
    $("#playbackIcon").addClass("icon-pause");
    $("#playbackIcon").removeClass("icon-play");
    $("#playbackIcon").removeClass("play-color");
    $("#tempoSlider").slider("option", "disabled", true);   
    $("#tempo").attr("disabled", "disabled");
    $("#metronomeButton").attr("disabled", "disabled");
}

function adjustVolume(newVol) {
    vol = newVol;
}

function adjustTempo(newTempo) {
    tempo = newTempo;
}

function adjustMetronome(flag) {
    metronomeFlag = flag;
}