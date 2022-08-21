var names = {"1":"الفاتحة","2":"البقرة","3":"آل عمران","4":"النساء","5":"المائدة","6":"الأنعام","7":"الأعراف","8":"الأنفال","9":"التوبة","10":"يونس","11":"هود","12":"يوسف","13":"الرعد","14":"إبراهيم","15":"الحجر","16":"النحل","17":"الإسراء","18":"الكهف","19":"مريم","20":"طه","21":"الأنبياء","22":"الحج","23":"المؤمنون","24":"النور","25":"الفرقان","26":"الشعراء","27":"النمل","28":"القصص","29":"العنكبوت","30":"الروم","31":"لقمان","32":"السجدة","33":"الأحزاب","34":"سبأ","35":"فاطر","36":"يس","37":"الصافات","38":"ص","39":"الزمر","40":"غافر","41":"فصلت","42":"الشورى","43":"الزخرف ","44":"الدخان","45":"الجاثية","46":"الأحقاف","47":"محمد","48":"الفتح","49":"الحجرات","50":"ق","51":"الذاريات","52":"الطور","53":"النجم","54":"القمر","55":"الرحمن","56":"الواقعة","57":"الحديد","58":"المجادلة","59":"الحشر","60":"الممتحنة","61":"الصف","62":"الجمعة","63":"المنافقون","64":"التغابن","65":"الطلاق","66":"التحريم","67":"الملك","68":"القلم","69":"الحاقة","70":"المعارج","71":"نوح","72":"الجن","73":"المزمل","74":"المدثر","75":"القيامة","76":"الإنسان","77":"المرسلات","78":"النبأ","79":"النازعات","80":"عبس","81":"التكوير","82":"الانفطار","83":"المطففين","84":"الانشقاق","85":"البروج","86":"الطارق","87":"الأعلى","88":"الغاشية","89":"الفجر","90":"البلد","91":"الشمس","92":"الليل","93":"الضحى","94":"الشرح","95":"التين","96":"العلق","97":"القدر","98":"البينة","99":"الزلزلة","100":"العاديات","101":"القارعة","102":"التكاثر","103":"العصر","104":"الهُمزة","105":"الفيل","106":"قريش","107":"الماعون","108":"الكوثر","109":"الكافرون","110":"النصر","111":"المسد","112":"الإخلاص","113":"الفلق","114":"الناس"};

for (const property in names) {
    if(localStorage.getItem("favName_"+names[property])){
        $(fav_empty).css("display","none")
        let favSura = JSON.parse(localStorage.getItem("favName_"+names[property]))
        let server = favSura.server
        fav.innerHTML+=`
            <div style="cursor:pointer" class="my-2 col-lg-6 text-end position-relative">
            <div class="sheikh-info sura p-3 rounded position-relative">
                <div class="sura_btns">
                    <span class="hoverd name_sura me-2" dir="rtl">
                    ${favSura.suraLength} ${favSura.name}
                    </span>
                    <i class="fa fa-play count hoverd rounded-circle play_sura" style="cursor:pointer" onclick="audioFav(this,'${server}')" data-quran=${favSura.sura}></i> 
                    <i class="fa fa-pause count hoverd rounded-circle pause_sura" style="cursor:pointer;display:none"></i>
                </div>
                <div class="position-absolute icons-sura">
                    <a href="${server}" download><ion-icon name="cloud-download-outline" class="fs-4"></ion-icon></a>
                    <i class="fa fa-heart fs-4 text-danger heart-colored-color heart" onclick="removeFromFavAudio('${favSura.name}',this,'${favSura.suraLength}')"></i>
                </div>
            </div>
        </div>
        `
    }
}

audioFav = (e,server) =>{
    lisent.src = server;
    localStorage.setItem("playerSrc",server);
    play_butt.style.display = "none"
    pause_butt.style.display = "block";
}

function removeFromFavAudio(n,e,f){
    localStorage.removeItem("favName_"+n);
    $(e).css("display","none")
    $(e).prev().css("display","inline-block")
    $(e).parent().parent().parent().remove()
}