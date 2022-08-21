$.get('https://api.mp3quran.net/radios/radio_arabic.json',function(data){
    data.radios.forEach(radioo=>{
        radio.innerHTML+=`
        <div style="cursor:pointer" class="my-2 col-lg-6 text-end position-relative">
        <div class="sheikh-info sura p-3 rounded position-relative">
            <div class="sura_btns">
                <span class="hoverd name_sura me-2" dir="rtl">
                ${radioo.name}
                </span>
                <i class="fa fa-play count hoverd rounded-circle play_sura" style="cursor:pointer" onclick="audioFav(this,'${radioo.radio_url}')"></i> 
                <i class="fa fa-pause count hoverd rounded-circle pause_sura" style="cursor:pointer;display:none"></i>
            </div>
        </div>
    </div>
    `
    })
})