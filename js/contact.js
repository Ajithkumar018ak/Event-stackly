/* =========================================================
   VYBE CONTACT PAGE
   FULL INTERACTION + SCROLL REVEAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       PAGE CHECK
    ===================================================== */

    const page =
        document.querySelector(".contact-page");

    if (!page) return;


    /* =====================================================
       SCROLL REVEAL ELEMENTS
    ===================================================== */

    const revealSelectors = [

        ".contact-section-label",

        ".contact-intro-content",

        ".contact-section-heading",

        ".contact-option-card",

        ".contact-form-visual",

        ".contact-form-heading",

        ".contact-direct-top",

        ".contact-direct-card",

        ".contact-reasons-heading",

        ".contact-reason",

        ".contact-faq-heading",

        ".contact-faq-item",

        ".contact-image-break",

        ".contact-service-heading",

        ".contact-service-content",

        ".contact-final-bg",

        ".contact-final-content"

    ];


    const revealElements = [];


    revealSelectors.forEach((selector) => {

        page.querySelectorAll(selector)
            .forEach((element) => {

                revealElements.push(element);

            });

    });


    /* =====================================================
       ADD OBSERVER
    ===================================================== */

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "is-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -70px 0px"
            }
        );


    revealElements.forEach((element) => {

        observer.observe(element);

    });


    /* =====================================================
       FALLBACK
       IMAGE BREAK MUST ALWAYS WORK
    ===================================================== */

    const imageBreak =
        page.querySelector(
            ".contact-image-break"
        );


    if (imageBreak) {

        /*
         * Check if browser supports
         * IntersectionObserver.
         */

        if (
            !("IntersectionObserver" in window)
        ) {

            imageBreak.classList.add(
                "is-visible"
            );

        }

    }


    /* =====================================================
       OPTION CARD STAGGER
    ===================================================== */

    page.querySelectorAll(
        ".contact-option-card"
    ).forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.12}s`;

    });


    /* =====================================================
       DIRECT CARD STAGGER
    ===================================================== */

    page.querySelectorAll(
        ".contact-direct-card"
    ).forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.12}s`;

    });


    /* =====================================================
       REASON STAGGER
    ===================================================== */

    page.querySelectorAll(
        ".contact-reason"
    ).forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 0.12}s`;

    });


    /* =====================================================
       FAQ STAGGER
    ===================================================== */

    page.querySelectorAll(
        ".contact-faq-item"
    ).forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 0.08}s`;

    });


    /* =====================================================
       FAQ — ONE OPEN AT A TIME
    ===================================================== */

    const faqItems =
        page.querySelectorAll(
            ".contact-faq-item"
        );


    faqItems.forEach((item) => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) return;


                faqItems.forEach((other) => {

                    if (
                        other !== item &&
                        other.open
                    ) {

                        other.removeAttribute(
                            "open"
                        );

                    }

                });

            }
        );

    });


    /* =====================================================
       PARALLAX IMAGES
    ===================================================== */

    const parallaxImages =
        page.querySelectorAll(
            ".contact-form-visual img," +
            ".contact-image-break img," +
            ".contact-final-bg img"
        );


    let parallaxRunning = false;


    function updateParallax() {

        const screenHeight =
            window.innerHeight;


        parallaxImages.forEach((image) => {

            const parent =
                image.closest(
                    ".contact-form-visual," +
                    ".contact-image-break," +
                    ".contact-final-bg"
                );


            if (!parent) return;


            const rect =
                parent.getBoundingClientRect();


            if (
                rect.bottom < 0 ||
                rect.top > screenHeight
            ) {
                return;
            }


            const center =
                rect.top +
                rect.height / 2;


            const distance =
                center -
                screenHeight / 2;


            const movement =
                distance * -0.025;


            image.style.transform =
                `scale(1.03) translateY(${movement}px)`;

        });


        parallaxRunning = false;

    }


    function requestParallax() {

        if (parallaxRunning) return;


        parallaxRunning = true;


        requestAnimationFrame(
            updateParallax
        );

    }


    window.addEventListener(
        "scroll",
        requestParallax,
        {
            passive: true
        }
    );


    /* =====================================================
       FORM
    ===================================================== */

    const form =
        document.getElementById(
            "contactForm"
        );


    const formMessage =
        document.getElementById(
            "contactFormMessage"
        );


    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contactName"
                    );

                const email =
                    document.getElementById(
                        "contactEmail"
                    );

                const phone =
                    document.getElementById(
                        "contactPhone"
                    );

                const topic =
                    document.getElementById(
                        "contactTopic"
                    );

                const message =
                    document.getElementById(
                        "contactMessage"
                    );


                let valid = true;


                [
                    name,
                    email,
                    phone,
                    topic,
                    message
                ].forEach((field) => {

                    if (!field) return;

                    field.classList.remove(
                        "contact-field-error"
                    );

                });


                /* NAME */

                if (
                    !name ||
                    !name.value.trim()
                ) {

                    name?.classList.add(
                        "contact-field-error"
                    );

                    valid = false;

                }


                /* EMAIL */

                if (
                    !email ||
                    !email.value.trim() ||
                    !email.validity.valid
                ) {

                    email?.classList.add(
                        "contact-field-error"
                    );

                    valid = false;

                }


                /* PHONE */

                if (
                    !phone ||
                    !phone.value.trim()
                ) {

                    phone?.classList.add(
                        "contact-field-error"
                    );

                    valid = false;

                }


                /* TOPIC */

                if (
                    !topic ||
                    !topic.value
                ) {

                    topic?.classList.add(
                        "contact-field-error"
                    );

                    valid = false;

                }


                /* MESSAGE */

                if (
                    !message ||
                    !message.value.trim()
                ) {

                    message?.classList.add(
                        "contact-field-error"
                    );

                    valid = false;

                }


                /* ERROR */

                if (!valid) {

                    if (formMessage) {

                        formMessage.textContent =
                            "PLEASE COMPLETE ALL REQUIRED FIELDS.";

                        formMessage.classList.add(
                            "form-message-show"
                        );

                    }

                    return;

                }


                /* SUCCESS */

                if (formMessage) {

                    formMessage.textContent =
                        "MESSAGE SENT — WE'LL BE IN TOUCH SOON.";

                    formMessage.classList.add(
                        "form-message-show"
                    );

                }


                form.reset();

            }
        );

    }


    /* =====================================================
       NAME VALIDATION
    ===================================================== */

    const nameInput =
        document.getElementById(
            "contactName"
        );


    if (nameInput) {

        nameInput.addEventListener(
            "input",
            () => {

                nameInput.value =
                    nameInput.value.replace(
                        /[^a-zA-Z\s.'-]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    const phoneInput =
        document.getElementById(
            "contactPhone"
        );


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+\s()-]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       FINAL CTA
    ===================================================== */

    const finalButton =
        page.querySelector(
            '.contact-final-btn[href="#contactForm"]'
        );


    if (finalButton) {

        finalButton.addEventListener(
            "click",
            (event) => {

                const formTarget =
                    document.getElementById(
                        "contactForm"
                    );


                if (!formTarget) return;


                event.preventDefault();


                formTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                setTimeout(() => {

                    const name =
                        document.getElementById(
                            "contactName"
                        );


                    if (name) {
                        name.focus();
                    }

                }, 700);

            }
        );

    }


    /* =====================================================
       INITIAL PARALLAX
    ===================================================== */

    updateParallax();


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "VYBE Contact animations initialized"
    );

});