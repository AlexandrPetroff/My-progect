let tl = gsap.timeline();

tl.from('.hero__title', {opacity: 0, y: 120, duration: 0.7})
  .from('.hero__btn', {opacity: 0, y: 80, duration: 0.7}, "-=0.7")
  .from('.hero__descr', {opacity: 0, duration: 1})
  .from('.photo_one', {opacity: 0, duration: 0.3}, "-=0.3")
  .from('.photo_two', {opacity: 0, duration: 0.3})
  .from('.photo_three', {opacity: 0, duration: 0.3})
  .from('.photos__author', {opacity: 0, duration: 1});


let btnBurger = document.querySelector("button.burger");
let btnClose = document.querySelector("button.close");

let t1 = new TimelineMax ({paused: true});

t1.to(".menu", {opacity: 1, duration: 1, width: "100%"});
t1.from('.menu__top', {opacity: 0, y: -30, duration: 0.4});
t1.from('.nav__list', {opacity: 0, y: 50, duration: 0.5});
t1.from('.social', {opacity: 0, y: 50, duration: 0.4});
t1.from('.menu__right', {opacity: 0, y: 50, duration: 0.4}, "-=0.4");

btnBurger.addEventListener('click', function() {
  t1.play();
});

btnClose.addEventListener('click', function() {
  reverseT1(t1);
});

function reverseT1(animation){
  animation.reversed() ? animation.play() : animation.reverse();
};