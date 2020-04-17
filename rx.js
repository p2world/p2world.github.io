const Rx = require('rxjs')
const ops = require('rxjs/operators')

const observer = {
    next: console.log,
    error: console.error,
    complete() {
        console.log('complete')
    }
}

const f1 = () => {
    const observable = interval(1000)
    
    
    
    observable.pipe(
        take(3)
    ).subscribe(observer)
    
    
    setTimeout(()=>{
        observable.subscribe(observer);
    }, 3000)
}

function f2_zip() {
    zip(
        from('abc'),
        interval(500),
    ).pipe(
        ops.map(c=>c[0]),
    ).subscribe(observer)
}

function f3_buffer() {
    interval(100).pipe(
        ops.buffer(interval(300)),
    ).subscribe(observer)
}

function f4_merge() {
    Rx.merge(
        Rx.interval(100).pipe(ops.take(3)),
        Rx.interval(200).pipe(ops.take(2)),
    ).subscribe(observer)
}

function f5_group() {
    Rx.interval(200).pipe(
        ops.take(10),
        ops.groupBy(i => i%3),
    ).subscribe(v => {
        v.subscribe(i => {
            console.log(v.key + '组:', i)
        })
    })
}

/**
 * a---b---c
 * 0123456789
 * a0 a1 a2 a3 b4 b5 b6 b7
 */
function f6_latest() {
    Rx.combineLatest(
        Rx.zip(
            Rx.from('abc'),
            Rx.timer(0,500)
        ),
        Rx.timer(0, 100),
    ).subscribe(observer);
}

f5_group()