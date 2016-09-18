import mouseNear from '../../../index';

window.addEventListener('load', function() {
    mouseNear('.element-1', () => {
        console.log('one');
        document.querySelector('.element-1').innerHTML = 'Triggered';
        document.querySelector('.element-1').classList.add('active');
    });

    mouseNear('.element-2', () => {
        console.log('two');
        document.querySelector('.element-2').innerHTML = 'Triggered';
        document.querySelector('.element-2').classList.add('active');
    }, {distance: 40});
});