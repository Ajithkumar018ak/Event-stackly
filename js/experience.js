document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       EXPERIENCE HERO CAROUSEL
    ===================================================== */

    const slides = document.querySelectorAll(
        ".experience-slide"
    );

    const nextBtn = document.getElementById(
        "experienceNext"
    );

    const prevBtn = document.getElementById(
        "experiencePrev"
    );

    const currentNumber = document.getElementById(
        "experienceCurrent"
    );

    const progress = document.getElementById(
        "experienceProgress"
    );

    let current = 0;
    let autoSlide;


    function updateSlide(index) {

        if (!slides.length) return;

        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {

            slide.classList.remove("active");

            if (i === current) {
                slide.classList.add("active");
            }

        });

        if (currentNumber) {
            currentNumber.textContent =
                String(current + 1).padStart(2, "0");
        }

        if (progress) {
            progress.style.width =
                ((current + 1) / slides.length * 100) + "%";
        }
    }


    function nextSlide() {

        updateSlide(current + 1);

        clearInterval(autoSlide);
        startAutoSlide();
    }


    function prevSlide() {

        updateSlide(current - 1);

        clearInterval(autoSlide);
        startAutoSlide();
    }


    function startAutoSlide() {

        autoSlide = setInterval(function () {

            updateSlide(current + 1);

        }, 5000);

    }


    if (nextBtn) {
        nextBtn.addEventListener(
            "click",
            nextSlide
        );
    }

    if (prevBtn) {
        prevBtn.addEventListener(
            "click",
            prevSlide
        );
    }


    updateSlide(0);
    startAutoSlide();


    /* =====================================================
       SCROLL ANIMATION
    ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".experience-intro-content, " +
        ".experience-section-heading, " +
        ".experience-pillar, " +
        ".experience-story-content, " +
        ".journey-step, " +
        ".experience-types-header, " +
        ".experience-type-card, " +
        ".experience-final-content"
    );


    animatedElements.forEach(function (element, index) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(60px)";

        element.style.transition =
            "opacity 0.9s ease, transform 1s cubic-bezier(.16,1,.3,1)";

        if (
            element.classList.contains(
                "experience-pillar"
            ) ||
            element.classList.contains(
                "journey-step"
            ) ||
            element.classList.contains(
                "experience-type-card"
            )
        ) {

            element.style.transitionDelay =
                (index % 4) * 0.12 + "s";
        }

    });


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       STORY IMAGE REVEAL
    ===================================================== */

    const storySection =
        document.querySelector(
            ".experience-story-section"
        );

    const storyImage =
        document.querySelector(
            ".experience-story-image img"
        );


    if (storyImage) {

        storyImage.style.opacity = "1";

        storyImage.style.transform =
            "scale(1.12)";

        storyImage.style.transition =
            "transform 1.8s cubic-bezier(.16,1,.3,1)";

    }


    if (storySection && storyImage) {

        const storyObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        storyImage.style.transform =
                            "scale(1)";

                        observer.unobserve(
                            storySection
                        );

                    });

                },
                {
                    threshold: 0.15
                }
            );

        storyObserver.observe(storySection);

    }


    /* =====================================================
       FINAL IMAGE REVEAL
    ===================================================== */

    const finalSection =
        document.querySelector(
            ".experience-final-section"
        );

    const finalImage =
        document.querySelector(
            ".experience-final-background img"
        );


    if (finalImage) {

        finalImage.style.opacity = "1";

        finalImage.style.transform =
            "scale(1.12)";

        finalImage.style.transition =
            "transform 1.8s cubic-bezier(.16,1,.3,1)";

    }


    if (finalSection && finalImage) {

        const finalObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        finalImage.style.transform =
                            "scale(1)";

                        observer.unobserve(
                            finalSection
                        );

                    });

                },
                {
                    threshold: 0.15
                }
            );

        finalObserver.observe(finalSection);

    }


    /* =====================================================
       PARALLAX IMAGE
    ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            const story =
                document.querySelector(
                    ".experience-story-image img"
                );

            if (story) {

                const rect =
                    story.getBoundingClientRect();

                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                ) {

                    const move =
                        (window.innerHeight / 2 -
                        rect.top) * 0.04;

                    story.style.marginTop =
                        move + "px";
                }

            }

        },
        { passive: true }
    );

});