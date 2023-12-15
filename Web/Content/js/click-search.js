$(document).ready(function() {
    $(".button-search").click(function() {
        $(".form-search").toggle("slow/400/fast", function() {
            $(this).css({
                transition: "all 1s",
            });
        });
    });
    $(".multiple-items").owlCarousel({
        items: 4,
        loop: true,
        margin: 50,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
            // // breakpoint from 0 up
            0: {
                items: 1,
                margin: 20,
            },
            // // breakpoint from 480 up
            480: {
                items: 2,
                margin: 20,
            },
            // breakpoint from 768 up
            768: {
                items: 3,
                margin: 50,
            },
            1200: {
                items: 4,
                margin: 50,
            },
        },
    });
});