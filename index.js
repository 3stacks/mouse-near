'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var throttle = _interopDefault(require('lodash/throttle'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

/**
 *
 * @param {HTMLElement | string} target - HTMLElement or querySelector string
 * @param callback
 * @param options
 */
function index (target, callback) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var element = parseElement(target);
    var elementBounds = calculateElementBounds(element.getBoundingClientRect(), options);
    var eventCallback = throttle(function (event) {
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
    var distance = options.distance || 0;
    if (isNaN(distance)) {
        throw new TypeError('options.distance was expecting a number, was given: ' + _typeof(options.distance));
    } else {
        return {
            top: elementRect.top - distance,
            bottom: elementRect.bottom + distance,
            left: elementRect.left - distance,
            right: elementRect.right + distance
        };
    }
}

/**
 * @param {Event} event
 * @param {Object} elementBounds
 */
function isMouseInRange(event, elementBounds) {
    return event.clientX <= elementBounds.right && event.clientX >= elementBounds.left && event.clientY <= elementBounds.bottom && event.clientY >= elementBounds.top;
}

function parseElement(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    }if (selector instanceof HTMLElement) {
        return selector;
    } else {
        throw new TypeError('prefetch was expecting a querySelector string or a HTML Element');
    }
}

module.exports = index;