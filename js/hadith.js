$.get('https://api.hadith.sutanlab.id/books/',function(data){
    data.data.forEach((hadithName,index) => {    
        $('.row-hadith-owners')[0].innerHTML+=`
            <div class="col-lg-4" data-hadith="hadith_${hadithName.id}">
                <div class="hadith-owner p-4 rounded position-relative text-end mb-3" onclick="getHadithContent(this)">
                    <div class="owner-hadith-div">
                        <p class="hadith-owner-name fs-4">${convertName(hadithName.name)}</p>
                        <p class="hadith-owner-name">الاحاديث المتاحة: <span class="text-success fw-bold">${hadithName.available}</span></p>
                    </div>
                    <span class="count position-absolute rounded-circle">${index + 1}</span>
                </div>
            </div>
        `
        getAllHadiths(hadithName.id)
    });
})

function getAllHadiths(id){
    let allHadiths = []
    $.get(`https://api.hadith.sutanlab.id/books/${id}?range=300-251`,function(hadithNames){
        
        if(hadithNames.data==undefined){
            allHadiths.push(JSON.parse(hadithNames))
        }else{
            allHadiths.push(hadithNames)
        }
        $(".hadith-conent")[0].innerHTML+=`
        <div class="${allHadiths[0].data.id} text-center fs-3 hadith_${allHadiths[0].data.id}" style="display:none">
        <div class="text-end d-flex justify-content-between flex-wrap">
            <p onclick="backOne(this)" class="mb-3 text-start" style="cursor:pointer"><i class="fas fa-long-arrow-alt-left"></i></p>
            <p class="mb-3 text-end">${convertName(allHadiths[0].data.name)}</p>
        </div>
        </div>`
        for(i=0;i<allHadiths[0].data.hadiths.length;i++){
            $(`.hadith_${allHadiths[0].data.id}`)[0].innerHTML+=`
            <div class="p-4 text-end fs-5 mb-5 hadith-content position-relative">${allHadiths[0].data.hadiths[i].arab}<span class="count position-absolute rounded-circle" style="left: -7px;top: -17px;">${i+1}</span></div>
            </div>
        `
        }
    })

}

function convertName(name){
    switch(name){
        case "HR. Abu Daud": 
            name="سنن الأمام ابو داوود";
        break;
        case "HR. Ahmad": 
            name="سنن الأمام احمد";
        break;
        case "HR. Bukhari": 
            name="سنن الأمام البخاري";
        break;
        case "HR. Darimi": 
            name="سنن الأمام الدرامي";
        break;
        case "HR. Ibnu Majah": 
            name="سنن الأمام ابن ماجه";
        break;
        case "HR. Malik": 
            name="سنن الأمام مالك";
        break;
        case "HR. Muslim": 
            name="سنن الأمام مسلم";
        break;
        case "HR. Nasai": 
            name="سنن الأمام النسائي";
        break;
        case "HR. Tirmidzi": 
            name="سنن الأمام الترمذي";
        break;
    }
    return name
}

function getHadithContent(e){
    $('.'+$(e).parent().data("hadith")).css("display","block").siblings().css("display","none")
    $(".row-hadith-owners").css("display","none")
}
function backOne(e){
    $(e).parent().parent().css("display","none")
    $(".row-hadith-owners").css("display","flex")
}