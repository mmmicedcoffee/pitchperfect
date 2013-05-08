$(function () {
	// CANVAS STUFF
	var canvas = $("canvas")[0];
	canvas.width = $("#music-pane").width();

	drawCanvas(canvas);

	$(window).resize(function(){
		canvas.width = $("#music-pane").width();
		drawCanvas(canvas);
	});
});

function drawCanvas(canvas) {
    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
    var w = canvas.width - 20;

    var ctx = renderer.getContext();
    var stave1 = new Vex.Flow.Stave(10, 0, w/2);
    stave1.addClef("treble").setContext(ctx).draw();
    stave1.addTimeSignature("4/4").setContext(ctx).draw();

    var stave2 = new Vex.Flow.Stave(stave1.width + stave1.x, stave1.y, w/2);
	stave2.setContext(ctx).draw();

    var stave3 = new Vex.Flow.Stave(10, 100, w/2);
    stave3.addClef("treble").setContext(ctx).draw();

    var stave4 = new Vex.Flow.Stave(stave3.width + stave3.x, stave3.y, w/2);
    stave4.setContext(ctx).draw();

    var stave5 = new Vex.Flow.Stave(10, 200, w/2);
    stave5.addClef("treble").setContext(ctx).draw();

    var stave6 = new Vex.Flow.Stave(stave5.width + stave5.x, stave5.y, w/2);
    stave6.setContext(ctx).draw();

    var stave7 = new Vex.Flow.Stave(10, 300, w/2);
    stave7.addClef("treble").setContext(ctx).draw();

    var stave8 = new Vex.Flow.Stave(stave7.width + stave7.x, stave7.y, w/2);
    stave8.setContext(ctx).draw();

    var stave9 = new Vex.Flow.Stave(10, 400, w/2);
    stave9.addClef("treble").setContext(ctx).draw();

    var stave10 = new Vex.Flow.Stave(stave9.width + stave9.x, stave9.y, w/2);
    stave10.setContext(ctx).draw();

    var stave11 = new Vex.Flow.Stave(10, 500, w/2);
    stave11.addClef("treble").setContext(ctx).draw();

    var stave12 = new Vex.Flow.Stave(stave11.width + stave11.x, stave11.y, w/2);
    stave12.setEndBarType(Vex.Flow.Barline.type.END);
    stave12.setContext(ctx).draw();

    // Create the notes
	var notes1 = [
	    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	];

	var notes2 = [
	    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "h" }),
    ];

    var notes3 = [
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
    ];

    var notes4 = [
	    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "h" }),
    ];

	var notes5 = [
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	];

	var notes6 = [
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "h" }),
    ];

    var notes7 = [
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
    ];

    var notes8_1 = [
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
    ];
    var notes8_2 = [
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "8" }),
    ];
    var notes8_3 = [
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
    ];
    var beam1 = new Vex.Flow.Beam(notes8_2);
    var notes8 = notes8_1.concat(notes8_2).concat(notes8_3);

   	var notes9 = [
	    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "q" }),
	];

	var notes10 = [
	    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["a/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["g/4"], duration: "h" }),
    ];

    var notes11 = [
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
    ];

    var notes12_1 = [
	    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
    ];

    var notes12_2 = [
	    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
	    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "8" }),
    ];

    var notes12_3 = [
	    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "h" }),
    ];
    var beam2 = new Vex.Flow.Beam(notes12_2);
    var notes12 = notes12_1.concat(notes12_2).concat(notes12_3);

	Vex.Flow.Formatter.FormatAndDraw(ctx, stave1, notes1);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave2, notes2);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave3, notes3);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave4, notes4);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave5, notes5);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave6, notes6);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave7, notes7);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave8, notes8);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave9, notes9);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave10, notes10);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave11, notes11);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave12, notes12);

	beam1.setContext(ctx).draw();
	beam2.setContext(ctx).draw();
}