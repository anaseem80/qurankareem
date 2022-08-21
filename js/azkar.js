$.get("js/azkar.json",function(data){
    data.forEach(zekr => {
        $(".azkar-content")[0].innerHTML+=`
            <div class="${zekr.col} mb-3">
                <div class="zekr-container ${zekr.color} rounded p-3 text-center" onclick="toggleZekrs(this)" data-zekr="zekr_${zekr.en}">
                    ${zekr.fontawosome}
                    <p class="m-0 fs-2 text-light">${zekr.title}</p>
                </div>
            </div>
        `
        $('.zekr-content')[0].innerHTML += `
        <div class="text-end zekr_${zekr.en}" style="display:none">
            <div class="text-end d-flex justify-content-between flex-wrap align-items-center">
                <p onclick="backOneAzkar(this)" class="mb-3 text-start" style="cursor:pointer"><i class="fas fa-long-arrow-alt-left fs-2"></i></p>
                <h1 class="mb-3">${zekr.title}</h1>
            </div>
        </div>
        `
    });
}).done(function(j){
    j.forEach(zekr => {
        zekr.content.forEach((ze,index)=>{
            $('.'+`zekr_${zekr.en}`)[0].innerHTML+=`
            <div class="zekr p-5 text-center mb-3">
                <p class="fs-3 mb-3 d-inline-block bg-danger px-3 py-2 rounded-circle" style="width: 53px;color:#fff !important">${index}</p>
                <p class="fs-3">${ze.zekr}</p>
                <p class="fs-3"><span class="bg-primary px-2 text-light rounded-circle">${ze.repeat}</span> عدد التكرارات</p>
            </div>
            `
        })
    });
})

function toggleZekrs(e){
    $('.'+$(e).data("zekr")).css("display","block").siblings().css("display","none")
    $('.azkar-content').css("display","none")
}
function backOneAzkar(e){
    $(e).parent().parent().css("display","none")
    $('.azkar-content').css("display","flex")
}