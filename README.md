jquery-podwheel
===============

An iPod-like scroll wheel widget for jQuery.

Usage
-----

This library requires jQuery (obviously) and [jQuery.svg by Keith
Wood](http://keith-wood.name/svg.html). Additionally, to make things happy on
touch devices, use the [Touch Punch](http://touchpunch.furf.com/) jQuery module
(which, in turn, depends on jQuery-ui). Usage of jquery-podwheel is simple:

	<html>
		<head>
			<script type="text/javascript" src="jquery.js"></script>
			<script type="text/javascript" src="jquery.svg.js"></script>
			<script type="text/javascript" src="jquery.podwheel.js"></script>
			<script type="text/javascript">
				$(function(ev) {
					$('#duration').podwheel();
				});
			</script>
		</head>
		<body>
			<input type="text" id="duration" name="duration" value="15"/>
		</body>
	</html>

This code will create a Podwheel widget, associate it with the input field, and
then hide the input field. The widget is an SVG element, which means that a
relatively recent (but not necessarily bleeding edge) browser is required.

Configuration
-------------

There are several configuration options you can include when creating a
Podwheel widget (with their default values):

	{
		id: null, // value to be assigned to the generated SVG element
		scale: 60, // the value of one full revolution
		min: Number.NEGATIVE_INFINITY, // the widget's lower bound
		max: Number.POSITIVE_INFINITY, // the widget's upper bound
		precision: 0, // the number of decimal places to round
		size: 240, // the width (in pixels) of the generated widget
		knobSize: 64, // the diameter of the control handle of the generated widget
		fontSize: 55, // the font height (in pixels) of the display of the generated widget
		svg: null // an existing SVG element (embedded, not linked) to use instead of generating one
	}

The relevant part of the example from earlier might look like this when
specifying custom parameters:

	$('#duration').podwheel({min:0, max:120});

If the form input has an initial value, the Podwheel widget will be initialized
to that value.

Customizing Podwheel Widgets
----------------------------

The easiest way to customize your Podwheel widgets is with CSS. Each of the
components of a generated widget have class names that generally make sense.
Here's a chunk of CSS code that you can use as a starting point for applying
styles to your widgets:

	.podwheel
	{
		/* the outermost SVG element */
	}
	.podwheel .wheel
	{
		/* the outer circle in the widget; surrounds the knob's path of travel */
	}
	.podwheel .innerwheel
	{
		/* the inner circle in the widget; surrounds the value display area */
	}
	.podwheel .display
	{
		/* the text element that displays the widget's value */
	}
	.podwheel .knob
	{
		/* the draggable circle element */
	}

The most powerful way to customize the look of your Podwheel widgets is to use
your own SVG image and then assigning it to the widget using the `svg`
configuration parameter. Please note that your SVG image must be **inline** not
linked:

	...
	<input type="text" id="duration" name="duration" value="15"/>
	<svg id="custom-podwheel" width="240" height="240" version="1.1"
			xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink">
		<circle class="wheel" cx="120" cy="120" r="118" stroke="black" stroke-width="1" fill="#FFF"/>
		<circle class="innerwheel" cx="120" cy="120" r="52" stroke="black" stroke-width="1" fill="transparent"/>
		<text class="display" font-size="55px" x="120" y="138" text-anchor="middle"></text>
		<circle class="knob" cx="120" cy="35" r="32" stroke="none" fill="#69F"/>
	</svg>
	...

Each of the main Podwheel elements must be present, of the expected type (i.e.,
`circle` or `text`), and classed with the correct name (`podwheel`, `wheel`,
etc). Beyond that, you can make your SVG as funky as you like.

Copyright
---------

Copyright (C) 2013 Brent Thomson

License
-------
This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Lesser General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details
at http://www.gnu.org/licenses/lgpl-3.0-standalone.html

