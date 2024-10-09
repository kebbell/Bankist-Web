'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// Same as above!

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////

// Selecting elements
console.log(document.documentElement);

console.log(document.head);

console.log(document.body);

console.log(allSections);

document.getElementById('section--1');

document.getElementsByClassName('btn');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Okay</button>';

// header.prepend(message);
header.append(message);
// header.before(message);
// header.after(message);

// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.parentElement.removeChild(message); // OLD WAY
    message.remove();
  });

///////////////////////////////////////
// Scroll Effect (Smooth Scrolling)
// Button scroll

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // OLD WAY
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // NEW WAY (ONLY WORKS IN NEWER BROWSERS)
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// PAGE NAVIGATION
// SCROLL INTO VIEW OF ATTRIBUTION ONCE CLICKED
// THIS WAY IS ONLY GOOD FOR SMALL AMOUNTS OF ATTRIBUTIONS

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // GETS THE ATTRIBUTE VALUE FROM THE HTML
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// EVENT DELEGATION - EVENT BUBBLING - CLEANER AND MORE EFFICIENT
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  // E.TARGET HELPS SEE WHAT ELEMENT WAS CLICKED ON
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// TAB COMPONENT

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// ^ ADDING AND REMOVING CLASSES TO MANIPULATE THE PAGE ^

///////////////////////////////////////
// MENU FADE ANIMATION (HOVER FADE ANIMATION)
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
// BIND RETURNS A NEW FUNCTION
nav.addEventListener('mouseout', handleHover.bind(1));
// BIND RETURNS A NEW FUNCTION

///////////////////////////////////////
// STICKY NAVIGATION
// CAN BE SLOW ON OLD DEVICES
// const initialCoords = section1.getBoundingClientRect(); // GETS THE COORDINATES OF THE TOP LEFT CORNER OF THE ELEMENT
// console.log(initialCoords); // {top: 0, right: 0, bottom: 4992, left: 0, x: 0, y: 0}

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

///////////////////////////////////////
// STICKY NAVIGATION: INTERSECTION OBSERVER API
// OBSERVER API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

// STICKY NAVIGATION: INTERSECTION OBSERVER API
// OBSERVER API
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // WHEN THE STICKY COMES ONTO THE PAGE
});
headerObserver.observe(header);

///////////////////////////////////////
// REVEAL SECTIONS ON SCROLL
const revealSection = function (entries, observer) {
  const [entry] = entries; // [ENTRY] IS THE FIRST ENTRY
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy loading images

///////////////////////////////////////
// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries; // [ENTRY] IS THE FIRST ENTRY
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '100px',
});
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// BUILDING A SLIDER COMPONENT
// PART 1
// SLIDER

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

// slides.forEach((slide, index) => {
//   slide.style.transform = `translateX(${100 * index}%)`;
//   // 0%, 100%, 200%, 300% IS WHERE EACH SLIDE WILL BE
// });

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

// NEXT AND PREVIOUS BUTTON
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) currentSlide = 0;
  else currentSlide++;
  // console.log(currentSlide);
  goToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide - 1
  else currentSlide--;
  // console.log(currentSlide);
  goToSlide(currentSlide);
};



btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

// PART 2
// DOTS
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    slides.forEach((s, index) => {
      s.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
  }
});

//////////////////////////////////////

// 







//////////////////////////////////////
// COOKIE MESSAGE

window.addEventListener('scroll', function () {
  const cookieMessage = document.querySelector('.cookie-message');
  const bottomOfPage = document.body.scrollHeight - window.innerHeight - 40;

  if (window.scrollY > bottomOfPage) {
    cookieMessage.classList.add('sticky');
  } else {
    cookieMessage.classList.remove('sticky');
  }
});



///////////////////////////////////////
// Styles
// COOKIE MESSAGE

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 10 + 'px'; // NEW WAY

console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');







/*
// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Non-standard
console.log(logo.designer);
// logo.className = 'jonas';

const link = document.querySelector('.nav__link--btn');
link.href = 'https://www.google.com/';
link.target = '_blank';
link.textContent = 'Google';
link.title = 'Search';
console.log(link);

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes!
logo.classList.replace('c', 'k');
*/

// // Scroll Effect (Smooth Scrolling)
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // Scrolling
//   // OLD WAY
//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // NEW WAY (ONLY WORKS IN NEWER BROWSERS)
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// Types of Events and Event Handlers
// const h1 = document.querySelector('h1');

// // CAN ADD MULTIPLE LISTENERS AND REMOVE THEM IF NEEDED
// // h1.addEventListener('mouseenter', function (e) {
// //   alert('addEventListener: Great! You are reading the heading :D');
// // });

// // h1.onmouseenter = function (e) {
// //   alert('onmouseenter: Great! You are reading the heading :D')
// // };

// // TO REMOVE A LISTENER
// // WILL SHOW EVENT ONLY ONCE AS IT GOES IN ONCE AND IS THEN REMOVED

// // REMOVES EVENT AFTER THE TIMEOUT IS SET
// const alert1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

// };

// h1.addEventListener('mouseenter', alert1);

// setTimeout (function () {
//   h1.removeEventListener('mouseenter', alert1);
// }, 3000);

// // EVENT PROPAGATION IN PRACTICE
// // RANDOM COLOUR
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// // ^ A RANDOM INTEGER FUNCTION ^ //
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   // STOP PROPAGATION
//   // e.stopPropagation();
//   // STOPS THE BUBBLING UP SO ONLY THIS CHILD WILL WORK AND NO PARENTS
//   // NOT THE BEST IDEA TO STOP THE PROPAGATION
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//   },
//   // true // LISTENS TO THE EVENT TRAVELING DOWN, THE OTHER ARE BUBBLING UP
//   // ^ Capturing ^ NOT USED MUCH TODAY AND DEFAULT IS SET TO FALSE //
// );

// EVENT DELEGATION & IMPLEMENTING PAGE NAVIGATION
// DOM TRAVERSING

// const h1 = document.querySelector('h1');

// Going downwards: child

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // NODES CAN BE ANYTHING
// console.log(h1.children); // ONLY ELEMENTS (DIRECT CHILDREN)
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents

// console.log(h1.parentNode); // PARENT NODE
// console.log(h1.parentElement); // SAME AS ABOVE
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings

// console.log(h1.previousElementSibling); // PREVIOUS SIBLING
// console.log(h1.nextElementSibling); // NEXT SIBLING
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });




///////////////////////////////////////
// Lifecycle DOM Events

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// CLOSING TAB

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  return 'Are you sure you want to leave this page?';
});
