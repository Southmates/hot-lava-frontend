function navigation() {
  
  // LENIS ANCHOR NAVIGATION
  const logoLink = document.querySelector(".logo")
  const aboutLink = document.querySelector(".about-link")
  const ourWayLink = document.querySelector(".our-way-link")
  const workLink = document.querySelector(".work-link")
  const contactLink = document.querySelector(".contact-link")

  const heroEl = document.querySelector("#hero")
  const aboutEl = document.querySelector("#about-us")
  const ourWayEl = document.querySelector("#our-way")
  const workEl = document.querySelector("#works")
  const contactEl = document.querySelector("#contact")
  const mobileNavBtn = document.querySelector(".mobile-nav")
  const mobileNav = document.querySelector(".mobile")
  let mobileNavOpen = false

  const setBlankMenu = () => {
    aboutLink.classList.remove("active")
    ourWayLink.classList.remove("active")
    workLink.classList.remove("active")
    contactLink.classList.remove("active")

    mobileNav.classList.add("hidden")
    mobileNavOpen = false
  }

  const setAboutMenu = () => {
    aboutLink.classList.add("active")
    ourWayLink.classList.remove("active")
    workLink.classList.remove("active")
    contactLink.classList.remove("active")

    mobileNav.classList.add("hidden")
    mobileNavOpen = false
  }

  const setOurWayMenu = () => {
    aboutLink.classList.remove("active")
    ourWayLink.classList.add("active")
    workLink.classList.remove("active")
    contactLink.classList.remove("active")

    mobileNav.classList.add("hidden")
    mobileNavOpen = false
  }

  const setWorkMenu = () => {
    workLink.classList.add("active")
    ourWayLink.classList.remove("active")
    aboutLink.classList.remove("active")
    contactLink.classList.remove("active")

    mobileNav.classList.add("hidden")
    mobileNavOpen = false
  }

  const setContactMenu = () => {
    contactLink.classList.add("active")
    aboutLink.classList.remove("active")
    ourWayLink.classList.remove("active")
    workLink.classList.remove("active")
    
    mobileNav.classList.add("hidden")
    mobileNavOpen = false
  }

  aboutLink.addEventListener("click", () => {lenis.scrollTo(aboutEl), setAboutMenu()})
  ourWayLink.addEventListener("click", () => {lenis.scrollTo(ourWayEl), setOurWayMenu()})
  workLink.addEventListener("click", () => {lenis.scrollTo(workEl), setWorkMenu()})
  contactLink.addEventListener("click", () => {lenis.scrollTo(contactEl), setContactMenu()})

  // logoLink.addEventListener("click", () => lenis.scrollTo(heroEl))
  // logoLink.addEventListener("click", () => window.scrollTo(0, 0))

  mobileNavBtn.addEventListener("click", () => {
    if(mobileNavOpen) {
      mobileNav.classList.add("hidden")
      mobileNavOpen = false
    } else {
      mobileNav.classList.remove("hidden")
      mobileNavOpen = true
    }
  })
}

export default navigation 