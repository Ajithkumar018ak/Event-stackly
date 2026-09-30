/* =========================================================
   VYBE — MAIN JAVASCRIPT
   Vanilla JavaScript Only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const preloader = document.getElementById("preloader");
    const loaderPercent = document.getElementById("loaderPercent");

    const siteHeader = document.getElementById("siteHeader");

    const scrollProgress = document.getElementById("scrollProgress");

    const micCursor = document.getElementById("micCursor");

    const menuToggle = document.getElementById("menuToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const drawerClose = document.getElementById("drawerClose");

    const backToTop = document.getElementById("backToTop");

    const artistImages =
        document.querySelectorAll(".artist-image");

    const artistPrev =
        document.getElementById("artistPrev");

    const artistNext =
        document.getElementById("artistNext");

    const artistNumber =
        document.getElementById("artistNumber");

    const artistCategory =
        document.getElementById("artistCategory");

    const artistName =
        document.getElementById("artistName");

    const artistDescription =
        document.getElementById("artistDescription");

    const artistDate =
        document.getElementById("artistDate");

    const artistVenue =
        document.getElementById("artistVenue");

    const artistCity =
        document.getElementById("artistCity");

    const artistPrice =
        document.getElementById("artistPrice");

    const artistProgress =
        document.getElementById("artistProgress");

    const progressPercent =
        document.getElementById("progressPercent");

    const newsletterForm =
        document.getElementById("newsletterForm");


    /* =====================================================
       PRELOADER
    ===================================================== */

    let loaderValue = 0;

    const loaderInterval = setInterval(() => {

        loaderValue += Math.floor(Math.random() * 7) + 2;

        if (loaderValue >= 100) {
            loaderValue = 100;
            clearInterval(loaderInterval);
        }

        if (loaderPercent) {
            loaderPercent.textContent = loaderValue;
        }

    }, 75);


    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loaderPercent) {
                loaderPercent.textContent = "100";
            }

            if (preloader) {
                preloader.classList.add("loaded");
            }

            body.classList.add("page-loaded");

        }, 700);

    });


    /* =====================================================
       CUSTOM MIC CURSOR
    ===================================================== */

    if (micCursor && window.matchMedia("(pointer: fine)").matches) {

        let mouseX = 0;
        let mouseY = 0;

        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            micCursor.classList.add("visible");

        });

        document.addEventListener("mouseleave", () => {
            micCursor.classList.remove("visible");
        });

        const animateCursor = () => {

            cursorX += (mouseX - cursorX) * 0.16;
            cursorY += (mouseY - cursorY) * 0.16;

            micCursor.style.left = `${cursorX}px`;
            micCursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();


        document.querySelectorAll("a, button").forEach((element) => {

            element.addEventListener("mouseenter", () => {
                micCursor.style.transform =
                    "translate(-50%, -50%) scale(1.25)";
            });

            element.addEventListener("mouseleave", () => {
                micCursor.style.transform =
                    "translate(-50%, -50%) scale(1)";
            });

        });

    }


    /* =====================================================
       HEADER + SCROLL PROGRESS
    ===================================================== */

    const updateScrollUI = () => {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        if (scrollProgress) {
            scrollProgress.style.width = `${percentage}%`;
        }

        if (siteHeader) {

            if (scrollTop > 40) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }

        }

        if (backToTop) {

            if (scrollTop > 650) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

        }

    };


    window.addEventListener("scroll", updateScrollUI, {
        passive: true
    });

    updateScrollUI();


    /* =====================================================
       MOBILE DRAWER
    ===================================================== */

    const openDrawer = () => {
        if (!mobileDrawer || !mobileOverlay) {
            return;
        }
        mobileDrawer.classList.add("active");
        mobileOverlay.classList.add("active");
        if (menuToggle) menuToggle.classList.add("active");
        document.body.style.overflow = "hidden";
        body.classList.add("drawer-open");
    };

    const closeDrawer = () => {
        if (!mobileDrawer || !mobileOverlay) {
            return;
        }
        mobileDrawer.classList.remove("active");
        mobileOverlay.classList.remove("active");
        if (menuToggle) menuToggle.classList.remove("active");
        document.body.style.overflow = "";
        body.classList.remove("drawer-open");
    };

    const toggleDrawer = () => {
        if (mobileDrawer && mobileDrawer.classList.contains("active")) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleDrawer();
        });
    }

    if (drawerClose) {
        drawerClose.addEventListener("click", closeDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeDrawer);
    }

    document
        .querySelectorAll(".drawer-navigation a, #mobileLoginButton")
        .forEach((link) => {
            link.addEventListener("click", () => {
                closeDrawer();
            });
        });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDrawer();
        }
    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerOffset = 95;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const activateNav = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        if (sections.length > 0) {
            navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                if (href && href.startsWith("#")) {
                    link.classList.remove("active");
                    if (href === `#${currentSection}`) {
                        link.classList.add("active");
                    }
                }
            });
        }

    };

    window.addEventListener("scroll", activateNav, {
        passive: true
    });

    activateNav();


    /* =====================================================
       ARTIST SLIDER DATA
    ===================================================== */

    const artists = [

        {
            name: "Anirudh Ravichander",
            category: "LIVE CONCERT",
            description:
                "A high-energy live performance built around powerful rhythms, cinematic sounds and an audience that never stops moving.",
            date: "18 OCT 2026",
            venue: "CHENNAI ARENA",
            city: "CHENNAI",
            price: "₹999"
        },

        {
            name: "Yuvan Shankar Raja",
            category: "LIVE MUSIC",
            description:
                "Timeless melodies, immersive arrangements and a live atmosphere created for people who grew up with the music.",
            date: "22 NOV 2026",
            venue: "CHENNAI ARENA",
            city: "CHENNAI",
            price: "₹899"
        },

        {
            name: "Hiphop Tamizha",
            category: "LIVE CONCERT",
            description:
                "Rhythm, culture and a high-voltage performance combining contemporary sounds with an energetic live crowd.",
            date: "04 DEC 2026",
            venue: "CITY STADIUM",
            city: "CHENNAI",
            price: "₹799"
        },

        {
            name: "Jonita Gandhi",
            category: "LIVE VOCALS",
            description:
                "An intimate evening of powerful vocals, expressive melodies and a stage built around unforgettable songs.",
            date: "08 JAN 2027",
            venue: "MUSIC HALL",
            city: "CHENNAI",
            price: "₹699"
        }

    ];


    let currentArtist = 0;
    let sliderTimer = null;


    const updateArtist = (index, direction = 1) => {

        if (!artistImages.length) {
            return;
        }

        currentArtist =
            (index + artists.length) %
            artists.length;


        artistImages.forEach((image, imageIndex) => {

            image.classList.toggle(
                "active",
                imageIndex === currentArtist
            );

        });


        const artist = artists[currentArtist];

        if (artistNumber) {
            artistNumber.textContent =
                String(currentArtist + 1).padStart(2, "0");
        }

        if (artistCategory) {
            artistCategory.textContent =
                artist.category;
        }

        if (artistName) {
            artistName.textContent =
                artist.name;
        }

        if (artistDescription) {
            artistDescription.textContent =
                artist.description;
        }

        if (artistDate) {
            artistDate.textContent =
                artist.date;
        }

        if (artistVenue) {
            artistVenue.textContent =
                artist.venue;
        }

        if (artistCity) {
            artistCity.textContent =
                artist.city;
        }

        if (artistPrice) {
            artistPrice.textContent =
                artist.price;
        }


        const progress =
            ((currentArtist + 1) / artists.length) * 100;

        if (artistProgress) {
            artistProgress.style.width =
                `${progress}%`;
        }

        if (progressPercent) {
            progressPercent.textContent =
                `${Math.round(progress)}%`;
        }

    };


    if (artistNext) {

        artistNext.addEventListener("click", () => {

            updateArtist(
                currentArtist + 1,
                1
            );

            restartSlider();

        });

    }


    if (artistPrev) {

        artistPrev.addEventListener("click", () => {

            updateArtist(
                currentArtist - 1,
                -1
            );

            restartSlider();

        });

    }


    const startSlider = () => {

        sliderTimer = setInterval(() => {

            updateArtist(currentArtist + 1);

        }, 6500);

    };


    const restartSlider = () => {

        clearInterval(sliderTimer);

        startSlider();

    };


    updateArtist(0);
    startSlider();


    /* =====================================================
       PAUSE SLIDER WHEN HERO NOT VISIBLE
    ===================================================== */

    const heroSection =
        document.querySelector(".hero-section");

    if (heroSection && "IntersectionObserver" in window) {

        const heroObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            if (!sliderTimer) {
                                startSlider();
                            }

                        } else {

                            clearInterval(sliderTimer);
                            sliderTimer = null;

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );

        heroObserver.observe(heroSection);

    }


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index % 5, 4) * 70}ms`;

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       IMAGE REVEAL
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        if (image.complete) {
            image.classList.add("image-loaded");
            return;
        }

        image.addEventListener("load", () => {
            image.classList.add("image-loaded");
        });

        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const emailInput =
                document.getElementById(
                    "newsletterEmail"
                );

            if (!emailInput) {
                return;
            }

            const email =
                emailInput.value.trim();

            if (!email) {

                emailInput.focus();

                return;

            }

            const button =
                newsletterForm.querySelector("button");

            if (button) {

                const originalText =
                    button.textContent;

                button.textContent =
                    "Subscribed ✓";

                button.style.color =
                    "#46db8d";

                emailInput.value = "";

                setTimeout(() => {

                    button.textContent =
                        originalText;

                    button.style.color = "";

                }, 3000);

            }

        });

    }


    /* =====================================================
       BUTTON MICRO INTERACTIONS
    ===================================================== */

    document
        .querySelectorAll(
            ".hero-primary-button, " +
            ".hero-secondary-button, " +
            ".final-primary-button, " +
            ".final-secondary-button, " +
            ".dark-button"
        )
        .forEach((button) => {

            button.addEventListener("mouseenter", () => {

                button.style.setProperty(
                    "--button-x",
                    "0px"
                );

            });

        });


    /* =====================================================
       PARALLAX HERO LIGHTS
    ===================================================== */

    const heroLights =
        document.querySelectorAll(".hero-light");

    if (
        heroLights.length &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        document.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - .5);

            const y =
                (event.clientY / window.innerHeight - .5);

            heroLights.forEach((light, index) => {

                const multiplier =
                    (index + 1) * 10;

                light.style.transform =
                    `translate(${x * multiplier}px, ${y * multiplier}px)`;

            });

        });

    }


    /* =====================================================
       CARD TILT — SUBTLE
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".event-card, .how-card"
        );

    if (window.matchMedia("(pointer: fine)").matches) {

        tiltCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - .5) * -3;

                const rotateY =
                    ((x / rect.width) - .5) * 3;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       ESCAPE ANY ACTIVE HOVER / DRAWER
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 1150 &&
            mobileDrawer &&
            mobileDrawer.classList.contains("active")
        ) {
            closeDrawer();
        }

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );

});








/* =========================================================
   VYBE — LOGIN MODAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    const loginModal = document.getElementById("loginModal");
    const openLoginModal = document.getElementById("openLoginModal");
    const mobileLoginButton = document.getElementById("mobileLoginButton");
    const loginModalClose = document.getElementById("loginModalClose");


    /*
    =========================================================
    OPEN LOGIN
    =========================================================
    */

    function openLogin() {

        if (!loginModal) return;

        loginModal.classList.add("active");

        loginModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("login-modal-open");

        setTimeout(() => {

            const firstInput =
                loginModal.querySelector(
                    ".login-form.active input"
                );

            if (firstInput) {
                firstInput.focus();
            }

        }, 350);
    }


    /*
    =========================================================
    CLOSE LOGIN
    =========================================================
    */

    function closeLogin() {

        if (!loginModal) return;

        loginModal.classList.remove("active");

        loginModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "login-modal-open"
        );
    }


    /*
    =========================================================
    OPEN BUTTONS
    =========================================================
    */

    if (openLoginModal) {

        openLoginModal.addEventListener(
            "click",
            openLogin
        );

    }


    if (mobileLoginButton) {

        mobileLoginButton.addEventListener(
            "click",
            () => {

                /* close mobile drawer */

                const drawer =
                    document.getElementById(
                        "mobileDrawer"
                    );

                const overlay =
                    document.getElementById(
                        "mobileOverlay"
                    );

                if (drawer) {
                    drawer.classList.remove("active");
                }

                if (overlay) {
                    overlay.classList.remove("active");
                }

                document.body.classList.remove(
                    "drawer-open"
                );

                openLogin();

            }
        );

    }


    /*
    =========================================================
    CLOSE BUTTON
    =========================================================
    */

    if (loginModalClose) {

        loginModalClose.addEventListener(
            "click",
            closeLogin
        );

    }


    /*
    =========================================================
    CLICK OUTSIDE
    =========================================================
    */

    if (loginModal) {

        loginModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === loginModal
                ) {
                    closeLogin();
                }

            }
        );

    }


    /*
    =========================================================
    ESCAPE
    =========================================================
    */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                loginModal &&
                loginModal.classList.contains("active")
            ) {

                closeLogin();

            }

        }
    );


    /*
    =========================================================
    PASSWORD SHOW / HIDE
    =========================================================
    */

    const passwordButtons =
        document.querySelectorAll(
            "[data-password-toggle]"
        );


    passwordButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.getAttribute(
                        "data-password-toggle"
                    );

                const input =
                    document.getElementById(
                        targetId
                    );

                if (!input) return;


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.innerHTML =
                        "<span>◉</span>";

                    button.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                } else {

                    input.type = "password";

                    button.innerHTML =
                        "<span>◉</span>";

                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                }

            }
        );

    });


    /*
    =========================================================
    LOGIN TABS
    =========================================================
    */

    const loginTabs =
        document.querySelectorAll(
            "[data-login-tab]"
        );

    const loginForms =
        document.querySelectorAll(
            "[data-login-form]"
        );


    loginTabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                const selected =
                    tab.getAttribute(
                        "data-login-tab"
                    );


                loginTabs.forEach((item) => {

                    item.classList.remove(
                        "active"
                    );

                });


                loginForms.forEach((form) => {

                    form.classList.remove(
                        "active"
                    );

                });


                tab.classList.add("active");


                const targetForm =
                    document.querySelector(
                        `[data-login-form="${selected}"]`
                    );


                if (targetForm) {

                    targetForm.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /*
    =========================================================
    USER LOGIN
    =========================================================
    */

    const userLoginForm =
        document.getElementById(
            "userLoginForm"
        );


    if (userLoginForm) {

        userLoginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "userEmail"
                    );


                const password =
                    document.getElementById(
                        "userPassword"
                    );


                if (
                    !email.value.trim() ||
                    !password.value.trim()
                ) {

                    return;

                }


                /*
                Store only display name
                for dashboard greeting.
                */

                let userName =
                    email.value
                        .split("@")[0]
                        .trim();


                userName =
                    userName
                        .replace(/[._-]+/g, " ")
                        .replace(/\b\w/g, char =>
                            char.toUpperCase()
                        );


                sessionStorage.setItem(
                    "vybeUserName",
                    userName
                );


                window.location.href =
                    "user-dashboard.html";

            }
        );

    }


    /*
    =========================================================
    ADMIN LOGIN
    =========================================================
    */

    const adminLoginForm =
        document.getElementById(
            "adminLoginForm"
        );


    if (adminLoginForm) {

        adminLoginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "adminEmail"
                    );


                const password =
                    document.getElementById(
                        "adminPassword"
                    );


                if (
                    !email.value.trim() ||
                    !password.value.trim()
                ) {

                    return;

                }


                sessionStorage.setItem(
                    "vybeAdminEmail",
                    email.value.trim()
                );


                window.location.href =
                    "admin-dashboard.html";

            }
        );

    }


});





/* =========================================================
   VYBE — CINEMATIC PRELOADER JS
   DRUM → JOIN → MICROPHONE → TICKET → EXIT
   Total Duration: ~3 Seconds
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    const stage = document.getElementById("preloaderStage");

    const drums = document.querySelectorAll(".preloader-drum");

    const leftDrum = document.querySelector(".drum-left");
    const rightDrum = document.querySelector(".drum-right");

    const impactLeft = document.querySelector(".impact-left");
    const impactRight = document.querySelector(".impact-right");

    const beatText = document.querySelector(".preloader-beat-text");

    const joinFlash = document.querySelector(".drum-join-flash");

    const microphone = document.getElementById("preloaderMicrophone");

    const micWaves = document.querySelectorAll(".mic-wave");

    const ticket = document.getElementById("preloaderTicket");

    const ticketTrail = document.querySelector(".ticket-trail");

    const ticketText = document.querySelector(".ticket-fly-text");

    const loaderPercent = document.getElementById("loaderPercent");

    const statusText = document.querySelector(".loader-status-text");


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    document.body.style.overflow = "hidden";

    preloader.classList.remove("preloader-hide");

    preloader.style.opacity = "1";
    preloader.style.visibility = "visible";
    preloader.style.pointerEvents = "auto";

    if (stage) {
        stage.classList.remove("stage-active");
    }

    drums.forEach((drum) => {
        drum.classList.remove(
            "is-beating",
            "is-joining",
            "is-joined"
        );
    });

    if (microphone) {
        microphone.classList.remove(
            "mic-show",
            "mic-active"
        );
    }

    if (ticket) {
        ticket.classList.remove(
            "ticket-show",
            "ticket-fly"
        );
    }

    if (ticketTrail) {
        ticketTrail.classList.remove("trail-show");
    }

    if (ticketText) {
        ticketText.classList.remove("ticket-text-show");
    }

    if (joinFlash) {
        joinFlash.classList.remove("flash-show");
    }

    micWaves.forEach((wave) => {
        wave.classList.remove("wave-show");
    });


    /* =====================================================
       FORCE BROWSER TO REGISTER INITIAL STATE
    ===================================================== */

    void preloader.offsetWidth;


    /* =====================================================
       STAGE START
    ===================================================== */

    setTimeout(() => {

        if (stage) {
            stage.classList.add("stage-active");
        }

        /* DRUM BEAT START */

        if (leftDrum) {
            leftDrum.classList.add("is-beating");
        }

        if (rightDrum) {
            rightDrum.classList.add("is-beating");
        }

        if (impactLeft) {
            impactLeft.classList.add("impact-show");
        }

        if (impactRight) {
            impactRight.classList.add("impact-show");
        }

        if (beatText) {
            beatText.classList.add("beat-show");
        }

    }, 100);


    /* =====================================================
       SECOND DRUM BEAT
    ===================================================== */

    setTimeout(() => {

        if (leftDrum) {
            leftDrum.classList.remove("is-beating");
            void leftDrum.offsetWidth;
            leftDrum.classList.add("is-beating");
        }

        if (rightDrum) {
            rightDrum.classList.remove("is-beating");
            void rightDrum.offsetWidth;
            rightDrum.classList.add("is-beating");
        }

    }, 420);


    /* =====================================================
       DRUMS MOVE TO CENTER
    ===================================================== */

    setTimeout(() => {

        if (leftDrum) {
            leftDrum.classList.remove("is-beating");
            leftDrum.classList.add("is-joining");
        }

        if (rightDrum) {
            rightDrum.classList.remove("is-beating");
            rightDrum.classList.add("is-joining");
        }

        if (beatText) {
            beatText.classList.add("beat-hide");
        }

    }, 850);


    /* =====================================================
       DRUMS JOIN
    ===================================================== */

    setTimeout(() => {

        if (leftDrum) {
            leftDrum.classList.remove("is-joining");
            leftDrum.classList.add("is-joined");
        }

        if (rightDrum) {
            rightDrum.classList.remove("is-joining");
            rightDrum.classList.add("is-joined");
        }

        if (joinFlash) {
            joinFlash.classList.add("flash-show");
        }

        if (impactLeft) {
            impactLeft.classList.remove("impact-show");
        }

        if (impactRight) {
            impactRight.classList.remove("impact-show");
        }

    }, 1350);


    /* =====================================================
       MICROPHONE APPEARS
    ===================================================== */

    setTimeout(() => {

        if (microphone) {
            microphone.classList.add("mic-show");

            setTimeout(() => {
                microphone.classList.add("mic-active");
            }, 80);
        }

        /* MIC WAVES */

        micWaves.forEach((wave, index) => {

            setTimeout(() => {
                wave.classList.add("wave-show");
            }, index * 100);

        });

        /* DRUMS FADE BACK */

        if (leftDrum) {
            leftDrum.classList.add("drums-fade");
        }

        if (rightDrum) {
            rightDrum.classList.add("drums-fade");
        }

    }, 1500);


    /* =====================================================
       TICKET START
    ===================================================== */

    setTimeout(() => {

        if (ticket) {

            ticket.classList.add("ticket-show");

            /*
             * Small delay makes the ticket feel like
             * it is physically coming OUT of the mic.
             */

            setTimeout(() => {
                ticket.classList.add("ticket-fly");
            }, 50);
        }

        if (ticketTrail) {
            ticketTrail.classList.add("trail-show");
        }

        if (ticketText) {
            ticketText.classList.add("ticket-text-show");
        }

        if (statusText) {
            statusText.textContent = "YOUR EXPERIENCE IS READY";
        }

    }, 1900);


    /* =====================================================
       LOADER PERCENTAGE
    ===================================================== */

    const startTime = performance.now();

    const TOTAL_TIME = 3000;

    function updateProgress(currentTime) {

        const elapsed = currentTime - startTime;

        let percentage = Math.round(
            (elapsed / TOTAL_TIME) * 100
        );

        percentage = Math.min(percentage, 100);

        if (loaderPercent) {
            loaderPercent.textContent = percentage;
        }

        if (elapsed < TOTAL_TIME) {
            requestAnimationFrame(updateProgress);
        }

    }

    requestAnimationFrame(updateProgress);


    /* =====================================================
       FINISH
    ===================================================== */

    setTimeout(() => {

        if (loaderPercent) {
            loaderPercent.textContent = "100";
        }

        if (statusText) {
            statusText.textContent = "WELCOME TO VYBE";
        }

        /*
         * Keep ticket visible for a moment.
         * Then fade the COMPLETE preloader.
         */

        setTimeout(() => {

            preloader.classList.add("preloader-hide");

            document.body.style.overflow = "";

        }, 220);

    }, TOTAL_TIME);


    /* =====================================================
       REMOVE FROM DOM
    ===================================================== */

    setTimeout(() => {

        if (preloader) {
            preloader.remove();
        }

    }, 3650);


});













document.addEventListener("DOMContentLoaded", () => {

    const images = document.querySelectorAll(".about-gallery-image");
    const counter = document.getElementById("aboutSlideNumber");

    if (!images.length) return;

    let currentIndex = 0;

    function changeAboutSlide() {

        images[currentIndex].classList.remove("active");

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        images[currentIndex].classList.add("active");

        if (counter) {
            counter.textContent = String(currentIndex + 1).padStart(2, "0");
        }
    }

    setInterval(changeAboutSlide, 3500);

});