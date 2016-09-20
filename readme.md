# mouse-near 

[![Build Status](https://travis-ci.org/3stacks/mouse-near.svg?branch=master)](https://travis-ci.org/3stacks/mouse-near)

Detect when the mouse is near/on an element of your choosing and trigger a callback.

## Usage

- `npm install @lukeboyle/mouse-near`

```javascript
import mouseNear from '../src/index';

mouseNear('.element-1', () => {
    document.querySelector('.element-1').classList.add('active');
});
```

See the demo [mouse-near.3stacks.me](mouse-near.3stacks.me).

### Parameters

| Argument | Type | Example |
| ------ | ----- | ------ |
| element | HTMLElement OR querySelector String | document.querySelector('#element'); |
| callback | Function | (event) => { console.log(event) }
| options | Object | { distance: 40 } |

#### Options

Currently supported options

- distance - The amount in pixels to trigger outside the bounds of the selected element/

## Known Issues

mouse-near depends on `element.getBoundingClientRect()`, so positioning styles must be applied before 
the listeners are added. If you are using a deferred script in the head, you must add an eventListener for 'load'.

Example: 

```javascript
import mouseNear from 'mouse-near';

window.addEventListener('load', () => {
    mouseNear('.element', function() {
        console.log('it\'s gucci');
    })
})
```