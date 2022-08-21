$(".li-item").each(function(){
    this.onclick=function(){
        if(reciter){
            $('.quran-title')[0].innerHTML = currentReciter.name
            $('.quran-title-header')[0].innerHTML = currentReciter.rewaya
            $(sheikh).data("title",currentReciter.name)
            $(sheikh).data("content",currentReciter.rewaya)
            $('#search').css("display","none")
            $('#search_reader').css("display","block")
        }
        $($(this)).addClass("active").siblings().removeClass("active")
        $('.'+$(this).data("div")).css("display","flex").siblings().css("display","none")
        $('.quran-title').text($('.'+$(this).data("div")).data("title"))
        $('.quran-title-header').text($('.'+$(this).data("div")).data("content"))
        $('.btns-header').css("display","none");
        $('#search').css("display",$('.'+$(this).data("div")).data("display"))
        $('#search_reader').css("display",$('.'+$(this).data("div")).data("display"))
        if($(this).data("div")=="fav" || $(this).data("div")=="radio"){
            $('#search').css("display","none")
            $('#search_reader').css("display","block")
        }
        if($(this).data("div")=="sheikh"){
            $('#search').css("display","block")
            $('#search_reader').css("display","none")
        }
        if($(this).data("div")=="sheikh" && reciter){
            $('#search').css("display","none")
            $('#search_reader').css("display","block")
        }

    }
})
if(!reciter){
    $(back).css("display","none")
}
let media = window.matchMedia("(min-width:776px)")
if(media.matches){
    onscroll = function(){
        if(this.pageYOffset-500 >= $('.quran-content')[0].offsetTop){
            $('.side_bar').css("position","fixed")
            $('.side_bar').css("top","120px")
        }else{
            $('.side_bar').css("position","relative")
            $('.side_bar').css("top","0")
        }
    }
}else{
    $(".li-item").each(function(){
        this.onclick=function(){
            $('.side_bar').removeClass("active")
            $(document.body).css("overflow","scroll")
            if(reciter){
                $('.quran-title')[0].innerHTML = currentReciter.name
                $('.quran-title-header')[0].innerHTML = currentReciter.rewaya
                $(sheikh).data("title",currentReciter.name)
                $(sheikh).data("content",currentReciter.rewaya)
            }
            $($(this)).addClass("active").siblings().removeClass("active")
            $('.'+$(this).data("div")).css("display","flex").siblings().css("display","none")
            $('.quran-title').text($('.'+$(this).data("div")).data("title"))
            $('.quran-title-header').text($('.'+$(this).data("div")).data("content"))
            $('.btns-header').css("display","none")
            $('#search').css("display",$('.'+$(this).data("div")).data("display"))
            $('#search_reader').css("display",$('.'+$(this).data("div")).data("display"))
            if($(this).data("div")=="fav" || $(this).data("div")=="radio"){
                $('#search').css("display","none")
                $('#search_reader').css("display","block")
            }
            if($(this).data("div")=="sheikh"){
                $('#search').css("display","block")
                $('#search_reader').css("display","none")
            }
            if($(this).data("div")=="sheikh" && reciter){
                $('#search').css("display","none")
                $('#search_reader').css("display","block")
            }
        }
    })
}
$('.menu-icon').click(function(){
    $('.side_bar').toggleClass("active")
    $('.side_bar').css("transition","0.3s")
    $(document.body).css("overflow","hidden")
})
$('.close-side').click(function(){
    $('.side_bar').toggleClass("active")
    $('.side_bar').css("transition","0.8s")
    $(document.body).css("overflow","visible")
})

$('.live-quran').click(function(){
    $('.radio-item').addClass("active").siblings().removeClass("active")
})