var init = true;
var playing = false;

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

    this.modulator.connect(this.modulatorMulAdd);
    this.modulatorMulAdd.connect(this.sine);

    this.envelope.connect(this.gain, 0, 1);
    this.sine.connect(this.gain);

    this.gain.connect(this.outputs[0]);
};

var AudioletApp = function() {
    this.audiolet = new Audiolet();

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

AudioletApp.prototype.stop = function() {
    // TODO: how to stop? D:
}

AudioletApp.prototype.pause = function() {
    this.audiolet.device.paused = true;
}

AudioletApp.prototype.unpause = function() {
    this.audiolet.device.paused = false;
}

function initPlayback() {
    extend(Synth, AudioletGroup);
    this.audioletApp = new AudioletApp();
    playing = true;
    init = false;
    togglePause();
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
}