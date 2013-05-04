$(function() {
    // play/pause toggle
    var init = true;
    var playing = false;

    // TODO: when it's done playing, reset back to playing = false!
    $("#playButton").click(function() {
        if (init) {
            initPlayback();
            playing = true;
            $("#playIcon").addClass("icon-pause");
            $("#playIcon").removeClass("icon-play");
            $("#playIcon").removeClass("play-color");
            init = false;
        } else {
            if (!playing) {
                unpausePlayback();
                playing = true;
                $("#playIcon").addClass("icon-pause");
                $("#playIcon").removeClass("icon-play");
                $("#playIcon").removeClass("play-color");
            } else {
                pausePlayback();
                playing = false;
                $("#playIcon").addClass("icon-play");
                $("#playIcon").addClass("play-color");
                $("#playIcon").removeClass("icon-pause");
            }
        }
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
};

function pausePlayback() {
    this.audioletApp.pause();
}

function unpausePlayback() {
    this.audioletApp.unpause();
}