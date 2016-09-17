## Usage

- `npm install @lukeboyle/mouse-near`

```javascript
import mouseNear from '../src/index';

mouseNear('.element-1', () => {
    document.querySelector('.element-1').classList.add('active');
});
```

See the demo [mouse-near.3stacks.me](mouse-near.3stacks.me).

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