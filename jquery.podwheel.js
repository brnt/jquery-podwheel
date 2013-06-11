/**
 * Copyright
 *
 *     Copyright (C) 2013 Brent Thomson
 *
 * License
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Lesser General Public License as published
 *     by the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *     GNU Lesser General Public License for more details at
 *     <http://www.gnu.org/licenses/lgpl-3.0-standalone.html>
 *
 * Feedback
 *
 *     Please drop me a line if you find this useful. I love to see examples of
 *     Podwheel in the wild.
 *
 */
(function($) {
	$.fn.podwheel = function(options) {
		var settings = $.extend({}, $.fn.podwheel.defaults, options);
		if (settings.svg) {
			settings.svg = $(settings.svg);
		} else {
			var center = Math.round(settings.size / 2);
			var rKnob = Math.round(settings.knobSize / 2);
			settings.svg = $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' +
					'width="' + settings.size + '" height="' + settings.size + '" class="podwheel">' +
				'<circle class="wheel" cx="' + center + '" cy="' + center +
					'" r="' + (center - 2) + '" stroke="black" stroke-width="1" fill="#FFF"/>' +
				'<circle class="innerwheel" cx="' + center + '" cy="' + center +
					'" r="' + (center - settings.knobSize - 4) + '" stroke="black" stroke-width="1" fill="transparent"/>' +
				'<text class="display" font-size="' + settings.fontSize + 'px"' +
					'x="' + center + '" y="' + (center + settings.fontSize/3) + '" text-anchor="middle"></text>' +
				'<circle class="knob" cx="' + center + '" cy="' + (rKnob+3) + '"' +
					'r="' + rKnob + '" stroke="none" fill="#69F"/></svg>');
			this.after(settings.svg);
		}

		var input = this.attr('type','hidden');
		var wheel = settings.svg.find('.wheel');
		var knob = settings.svg.find('.knob');
		var display = settings.svg.find('.display');

		var minRevs = Math.round(settings.min/settings.scale);
		var maxRevs = Math.round(settings.max/settings.scale);

		var data = {
			wheelSize: parseInt(wheel.attr('r')),
			knobSize: parseInt(knob.attr('r')) + 1,
			centerX: parseInt(wheel.attr('cx')),
			centerY: parseInt(wheel.attr('cy')),
			offsetX: 0,
			offsetY: 0
		};

		function calcPos(a) {
			return {
				x: data.centerX + Math.sin(a)*(data.wheelSize-data.knobSize),
				y: data.centerY + Math.cos(a)*(data.wheelSize-data.knobSize)
			};
		}

		var lastAngle = Math.PI, revs = 0;
		knob.draggable({
			start: function(ev, ui) {
				data.offsetX = ev.offsetX - knob.attr('cx');
				data.offsetY = ev.offsetY - knob.attr('cy');
			},
			drag: function(ev, ui) {
				var angle = Math.atan2(ev.offsetX - data.centerX - data.offsetX, ev.offsetY - data.centerY - data.offsetY);

				var diff = lastAngle - angle;
				if (diff > 6 && revs >= minRevs) {
					revs -= 1;
				} else if (diff < -6 && revs <= maxRevs) {
					revs += 1;
				}

				var val = (revs + calcValue(angle)) * settings.scale;
				if (val < settings.min) {
					val = settings.min;
					angle = calcAngle(val / settings.scale);
					if (calcValue(angle) == 0) angle = -Math.abs(angle); // allows us to increment out of the min position
				} else if (val > settings.max) {
					val = settings.max;
					angle = calcAngle((val % settings.scale) / settings.scale);
				}

				display.text(val.toFixed(settings.precision));
				lastAngle = angle;

				var pos = calcPos(angle);
				ev.target.setAttribute('cx', pos.x);
				ev.target.setAttribute('cy', pos.y);
			},

			stop: function(ev, ui) {
				var angle = Math.atan2(ev.offsetX - data.centerX - data.offsetX, ev.offsetY - data.centerY - data.offsetY);
				var val = (revs + calcValue(angle)) * settings.scale;
				input.attr('value', val.toFixed(settings.precision));
			}
		});

		var v = input.attr('value');
		if (v) {
			var dist = v/settings.scale;
			var pos = calcPos(calcAngle(dist));
			knob.attr('cx', pos.x);
			knob.attr('cy', pos.y);
			revs = Math.floor(dist);
			display.text(parseFloat(v).toFixed(settings.precision));
		}
	};
	
	$.fn.podwheel.defaults = {
		id: null,
		scale: 60,
		min: Number.NEGATIVE_INFINITY,
		max: Number.POSITIVE_INFINITY,
		precision: 0,
		value: 0,
		size: 240,
		knobSize: 64,
		fontSize: 55,
		svg: null
	};

	function calcValue(angle) {
		return (Math.PI - angle)/(2 * Math.PI);
	}

	function calcAngle(value) {
		return -(value * (2*Math.PI) - Math.PI);
	}
	
}(jQuery));
