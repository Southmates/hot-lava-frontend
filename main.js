import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import Lenis from '@studio-freight/lenis'
import MouseFollower from "mouse-follower"

import './style.scss'
import './cursor.scss'

gsap.registerPlugin(ScrollTrigger)

// LENIS SETUP
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  ScrollTrigger.update()
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// LENIS ANCHOR
const aboutLink = document.querySelector(".about-link")
const workLink = document.querySelector(".work-link")
const contactLink = document.querySelector(".contact-link")
const aboutEl = document.querySelector("#about-us")
const workEl = document.querySelector("#our-work")
const contactEl = document.querySelector("#contact")

aboutLink.addEventListener("click", () => {
  lenis.scrollTo(aboutEl)

  aboutLink.classList.add("active")
  workLink.classList.remove("active")
  contactLink.classList.remove("active")
})
workLink.addEventListener("click", () => {
  lenis.scrollTo(workEl)

  workLink.classList.add("active");
  aboutLink.classList.remove("active")
  contactLink.classList.remove("active")
})
contactLink.addEventListener("click", () => {
  lenis.scrollTo(contactEl)

  contactLink.classList.add("active");
  aboutLink.classList.remove("active")
  workLink.classList.remove("active")
})

// GSAP BACKGROUND COLOR CHANGES
const container = document.querySelector(".main")
const hero = document.querySelector(".hero")
const fadeHero = document.querySelector(".fade-hero-section")
const about = document.querySelector(".about-section")
const howWeWork = document.querySelector(".how-we-work")
const contact = document.querySelector(".contact")

ScrollTrigger.create( {
  trigger: fadeHero,
  start: 'top top',
  end: 'bottom top',
  onEnter: () => gsap.to(container, {backgroundColor:"#EE512F", duration: 1, ease:"ease.in"}),
  onLeave: () => gsap.to(container, {backgroundColor:"#108896", duration: 1, ease:"ease.out"}),
  onLeaveBack: () => gsap.to(container, {backgroundColor:"#EE512F", duration: 1, ease:"ease.in"}),
  onEnterBack: () => gsap.to(container, {backgroundColor:"#EE512F", duration: 1, ease:"ease.in"})
})
ScrollTrigger.create( {
  trigger: about,
  start: 'top top',
  end: '+=500%',
  onEnter: () => gsap.to(container, {backgroundColor:"#108896", duration: 1, ease:"ease.in"}),
  onLeave: () => gsap.to(container, {backgroundColor:"#1C374D", duration: 1, ease:"ease.out"}),
  onLeaveBack: () => gsap.to(container, {backgroundColor:"#EE512F", duration: 1, ease:"ease.in"}),
  onEnterBack: () => gsap.to(container, {backgroundColor:"#108896", duration: 1, ease:"ease.in"})
})
ScrollTrigger.create( {
  trigger: howWeWork,
  start: '+=40%',
  end: '+=1520%',
  onEnter: () => gsap.to(container, {backgroundColor:"#1C374D", duration: 1, ease:"ease.in"}),
  onLeave: () => gsap.to(container, {backgroundColor:"#FCA720", duration: 1, ease:"ease.out"}),
  onLeaveBack: () => gsap.to(container, {backgroundColor:"#108896", duration: 1, ease:"ease.in"}),
  onEnterBack: () => gsap.to(container, {backgroundColor:"#1C374D", duration: 1, ease:"ease.in"})
})

// GSAP HORIZONTAL SCROLL
//MEMBERS
const membersSection = document.querySelector(".members")
let sectionItems = gsap.utils.toArray(".member-item")

gsap.to(sectionItems, {
  xPercent: -100 * (sectionItems.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: membersSection,
    pin: true,
    scrub: 2,
    snap: 1 / (sectionItems.length - 1),
    end: "+=" + membersSection.offsetWidth
  }
})

// HOW WE WORK
const howWeWorkSection = document.querySelector(".our-way-wrapper")
let howWeWorkItems = gsap.utils.toArray(".how-we-work-item")

gsap.to(howWeWorkItems, {
  xPercent: -120.9 * (howWeWorkItems.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: howWeWorkSection,
    pin: true,
    scrub: 2,
    end: "+=" + howWeWorkSection.offsetWidth
  }
})



// BLOB CURSOR FOLLOWER SETUP ANS STATE MANAGEMENT
MouseFollower.registerGSAP(gsap);

const cursor = new MouseFollower({
  el: null,
  container: document.body,
  className: 'mf-cursor',
  innerClassName: 'mf-cursor-inner',
  textClassName: 'mf-cursor-text',
  mediaClassName: 'mf-cursor-media',
  mediaBoxClassName: 'mf-cursor-media-box',
  iconSvgClassName: 'mf-svgsprite',
  iconSvgNamePrefix: '-',
  iconSvgSrc: '',
  dataAttr: 'cursor',
  hiddenState: '-hidden',
  textState: '-text',
  iconState: '-icon',
  activeState: '-active',
  mediaState: '-media',
  stateDetection: {
      '-pointer': 'a,button',
      '-hidden': 'iframe'
  },
  visible: true,
  visibleOnState: false,
  speed: 0.55,
  ease: 'expo.out',
  overwrite: true,
  skewing: 0,
  skewingText: 2,
  skewingIcon: 2,
  skewingMedia: 2,
  skewingDelta: 0.001,
  skewingDeltaMax: 0.15,
  stickDelta: 0.15,
  showTimeout: 20,
  hideOnLeave: true,
  hideTimeout: 300,
  hideMediaTimeout: 300
});
