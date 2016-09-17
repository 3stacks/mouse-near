import throttle from 'lodash/throttle';

/**
 *
 * @param {HTMLElement | string} target - HTMLElement or querySelector string
 * @param callback
 * @param options
 */
export default function(target, callback, options = {}) {
    const element = parseElement(target);
    const elementBounds = calculateElementBounds(element.getBoundingClientRect(), options);
    const eventCallback = throttle(function(event) {
        if (isMouseInRange(event, elementBounds)) {
            callback();
            if (!options.persistent) {
                document.removeEventListener('mousemove', eventCallback);
            }
        }
    }, 100);
    document.addEventListener('mousemove', eventCallback);
}

function calculateElementBounds(elementRect, options) {
    console.log(elementRect);
    const distance = options.distance || 0;
    if (isNaN(distance)) {
        throw new TypeError('options.distance was expecting a number, was given: ' + typeof options.distance);
    } else {
        return {
            top: elementRect.top - distance,
            bottom: elementRect.bottom + distance,
            left: elementRect.left - distance,
            right: elementRect.right + distance
        }
    }
}

/**
 * @param {Event} event
 * @param {Object} elementBounds
 */
function isMouseInRange(event, elementBounds) {
    return event.clientX <= elementBounds.right
        && event.clientX >= elementBounds.left
        && event.clientY <= elementBounds.bottom
        && event.clientY >= elementBounds.top;
}

function parseElement(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    } if (selector instanceof HTMLElement) {
        return selector;
    } else {
        throw new TypeError('prefetch was expecting a querySelector string or a HTML Element');
    }
}