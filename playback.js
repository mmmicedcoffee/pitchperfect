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

function playExample() {
    extend(Synth, AudioletGroup);
    this.audioletApp = new AudioletApp();
};

function stopExample() {
    this.audioletApp.audiolet.disconnect(this.audioletApp.audiolet.output);   
}