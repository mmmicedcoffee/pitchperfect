var metronomeState = 0;

function toggleMetronome() {
  if (metronomeState == 0) {
    // $("#metronomeButton").addClass("btn-info");
    metronomeState = 1;
    adjustMetronome(true);
  } else { 
    // $("#metronomeButton").removeClass("btn-info");
    metronomeState = 0;
    adjustMetronome(false);
  }
}

$(function() {
    // SLIDER STUFF
    $("#tempoSlider").slider({
        range: "min",
        value:$("#tempo").val(),
        min:1,
        max:180,
        slide: function(event,ui) {
        	$("#tempo").val(ui.value);
          adjustTempo(ui.value);
        },
        stop: function(event,ui) {
          adjustTempo(ui.value);
        }
    });
    $("#myVoicePartSlider").slider({
      	range: "min",
      	value:75,
      	min:0,
      	max:100,
      	slide: function(event,ui) {
      		$("#myVoicePartLabel").text(ui.value + "%");
          adjustVolume(ui.value/100);
      	},
        stop: function(event,ui) {
          adjustVolume(ui.value/100);
        }
    });
    $("#otherVoicePartSlider").slider({
      	range: "min",
      	value:$("#otherVoicePart").val(),
      	min:1,
      	max:100,
      	slide: function(event,ui) {
      		$("#otherVoicePart").val(ui.value);
      	}
    });
    $("#metronomeSlider").slider({
      	range: "min",
      	value:$("#metronome").val(),
      	min:1,
      	max:180,
      	slide: function(event,ui) {
      		$("#metronome").val(ui.value);
      	}
    });

    // INPUT STUFF
    $("#tempo").change(function () {
      	if (this.value > 180) {
    		this.value = 180;
      	} else if (this.value < 0) {
            this.value = 0;
        }
        var value = this.value;
        $("#tempoSlider").slider("value", parseInt(value));
        adjustTempo(this.value);
    });
    $("#metronome").change(function () {
      	if (this.value > 180) {
    		this.value = 180;
      	} else if (this.value < 0) {
            this.value = 0;
        }
        var value = this.value;
        $("#metronomeSlider").slider("value", parseInt(value));
    });
    $("#myVoicePart").change(function () {
      	if (this.value > 100) {
    		this.value = 100;
      	} else if (this.value < 0) {
            this.value = 0;
        }
        var value = this.value;
        $("#myVoicePartSlider").slider("value", parseInt(value));
    });
    $("#otherVoicePart").change(function () {
      	if (this.value > 100) {
      		this.value = 100;
      	} else if (this.value < 0) {
            this.value = 0;
        }
        var value = this.value;
        $("#otherVoicePartSlider").slider("value", parseInt(value));
    });

  $("#metronomeCheckbox").change(function() {
    toggleMetronome();
  });
});


