require('./nodash')();

console.log('### Object.pick');
var tO1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
};
var tO2 = tO1.pick('b', 'c');
if (tO2.b === tO2.b && tO2.c === tO2.c)
  console.log(' - Pass 1/2');
else
  console.error('FAILED Object.pick');

console.log('.');
console.log('.');
console.log('.');

console.log('### Array.upsert');
var tO3 = [{
  id: 1,
  a: 'a'
}, {
  id: 2,
  a: 'b'
}, {
  id: 3,
  a: 'c'
}, {
  id: 4,
  a: 'd'
}];

tO3.upsert('id', {
  id: 5,
  a: 'e'
});

if (tO3[4].a == 'e')
  console.log(' - Pass 1/2');
else
  console.error('FAILED Array.upsert');

tO3.upsert('id', {
  id: 1,
  a: 'U'
});

if (tO3[0].a == 'U')
  console.log(' - Pass 2/2');
else
  console.error('FAILED Array.upsert');


console.log('.');
console.log('.');
console.log('.');


console.log('### Array.update');
var tO4 = [{
  id: 1,
  a: 'a'
}, {
  id: 2,
  a: 'b'
}];
tO3.update('id', tO4);

if (tO3[0].a == 'a' && tO3.length === 2)
  console.log(' - Pass 1/2');
else
  console.error('FAILED Array.update', tO3[0].a, tO3.length);

var tO5 = [{
  id: 1,
  a: 'a'
}, {
  id: 2,
  a: 'b'
}, {
  id: 1,
  a: 'P'
}, {
  id: 2,
  a: 'F'
}];

tO3.update('id', tO5);

console.log(tO3);

var t = [1, 2, 3, 4, 5];
t.series(function (i, done) {
  setTimeout(function () {
    done(null, i * 6);
  }, 500);
}).then(ret => {
  console.log(ret);
});
