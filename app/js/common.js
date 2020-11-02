$(function(){
    $('.reviews').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 679,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });
    $('.otzyvy .prev').click(function(){
    	$('.otzyvy .slick-prev').trigger("click");
	});
    $('.otzyvy .next').click(function(){
        $('.otzyvy .slick-next').trigger("click");
    });
    $('.galler').slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 679,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    });
})
