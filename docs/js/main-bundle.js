function stringToNumber(str) {
	if(typeof str === 'undefined' || str === null) {
		return NaN;
	}

	return parseFloat(str.replace(/[^0-9.-]/g,''));
}

function formatNumber(number, format) {
	switch(format) {			
		case "0":
			return number.toString();
		case "0,0":
		default:
			return formatNumberStandard(number);
	}	
}
	
function formatNumberStandard(number) {
	let nStr = number.toString();
	nStr += '';
	const x = nStr.split('.');
	let x1 = x[0];
	const x2 = x.length > 1 ? '.' + x[1] : '';
	const rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function linear(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * currentIteration / totalIterations + startValue;
}

function easeInOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
	}
	return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
}

function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

function	easeInCubic(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
}

function numericycle(element) {

	let currentIteration;
	let totalIterations;
	let changeInValue;
	let animationRequestId;
	let settings;

	const defaults = {
			duration: 2000,
			easing: 'easeOut',
			format: '0,0'
		};

	const fps = 60;

	function cycle(options) {
		settings = Object.assign({}, defaults, options);

		verifyDuration();		
		verifyInitialValue();
		verifyFinalValue();		
		
		if (!window.requestAnimationFrame || 
			settings.duration === 0 || 
			settings.finalValue === settings.initialValue) {
			updateElementContent(settings.finalValue);			
		} else {
			if(animationRequestId != null) {
				window.cancelAnimationFrame(animationRequestId);
			}

			currentIteration = 0;
			totalIterations = Math.ceil(fps*(settings.duration/1000));
			changeInValue = settings.finalValue - settings.initialValue;
			updateElementContent(settings.initialValue);

			animationRequestId = window.requestAnimationFrame(onAnimationFrame);
		}
	}

	function verifyInitialValue() {
		if(isNaN(settings.initialValue)) {
			settings.initialValue = stringToNumber(element.textContent);
		}

		if(isNaN(settings.initialValue)) {
			throw new TypeError("initialValue must be a number");
		}
	}

	function verifyFinalValue() {
		if(isNaN(settings.finalValue)) {
			throw new TypeError("finalValue must be a number");
		}
	}

	function verifyDuration() {
		if(isNaN(settings.duration)) { 
			throw new TypeError("duration must be a number");
		} else if(settings.duration < 0) {
			throw new RangeError("duration cannot be a negative number")
		}
	}

	function getCurrentValue() {
		const easingFunction = getEasingFunction();		
		return Math.round(easingFunction(currentIteration, settings.initialValue, changeInValue, totalIterations));
	}

	function getEasingFunction() {
		switch(settings.easing) {
			case "easeOut":
				return easeOutCubic;
			case "easeInOut":
				return easeInOutCubic;
			case "easeIn":
				return easeInCubic;
			default:
				return linear;
		}
	}

	function onAnimationFrame() {		
		if(currentIteration < totalIterations) {
			currentIteration++;
			updateElementContent(getCurrentValue());
			animationRequestId = window.requestAnimationFrame(onAnimationFrame);
		} 
	}

	function updateElementContent(value) {
		element.textContent = formatNumber(value, settings.format);
	}

	return {
		cycle
	};
}

const statsPanel = () => {
    const statsEl = document.querySelector('.section--stats');
    const cycleEls = Array.from(document.querySelectorAll('.stat__number'));

    const createObserver = () => {
        const intersectionOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };
        const observer = new IntersectionObserver(onIntersection, intersectionOptions);
        observer.observe(statsEl);
    };

    const onIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cycle(cycleEls);
            }
        });
    };

    const cycle = els => {
        els.forEach(el => numericycle(el).cycle({
            initialValue: 0,
            finalValue: el.dataset.stat,
            duration: 1000,
            easing: 'easeInOut',
            format: '0'
        }));
    };

    window.addEventListener("load", function (event) {
        createObserver();
    }, false);
};

const init = () => {
	statsPanel();
};

init();
