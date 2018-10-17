import numericycle from '@degjs/numericycle';

const statsPanel = () => {
    const statsEl = document.querySelector('.section--stats');
    const cycleEls = Array.from(document.querySelectorAll('.stat__number'));

    const createObserver = () => {
        const intersectionOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        const observer = new IntersectionObserver(onIntersection, intersectionOptions);
        observer.observe(statsEl);
    };

    const onIntersection = (entries, observer) => {
        cycle(cycleEls);
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

export default statsPanel;