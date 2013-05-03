function drawCanvas(canvas) {
    var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
    var w = canvas.width - 20;

    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 0, w/2);
    stave.addClef("treble").setContext(ctx).draw();
    stave.addTimeSignature("4/4").setContext(ctx).draw();

    var staveTwo = new Vex.Flow.Stave(stave.width + stave.x, stave.y, w/2);
	staveTwo.setContext(ctx).draw();

    var stave3 = new Vex.Flow.Stave(10, 100, w/2);
    stave3.addClef("treble").setContext(ctx).draw();
    stave3.addTimeSignature("4/4").setContext(ctx).draw();

    var stave4 = new Vex.Flow.Stave(stave3.width + stave3.x, stave3.y, w/2);
    stave4.setEndBarType(Vex.Flow.Barline.type.END);
    stave4.setContext(ctx).draw();

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

	Vex.Flow.Formatter.FormatAndDraw(ctx, stave, notes1);
	Vex.Flow.Formatter.FormatAndDraw(ctx, staveTwo, notes2);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave3, notes3);
	Vex.Flow.Formatter.FormatAndDraw(ctx, stave4, notes4);
}