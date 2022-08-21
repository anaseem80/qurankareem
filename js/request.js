var names = {"1":"الفاتحة","2":"البقرة","3":"آل عمران","4":"النساء","5":"المائدة","6":"الأنعام","7":"الأعراف","8":"الأنفال","9":"التوبة","10":"يونس","11":"هود","12":"يوسف","13":"الرعد","14":"إبراهيم","15":"الحجر","16":"النحل","17":"الإسراء","18":"الكهف","19":"مريم","20":"طه","21":"الأنبياء","22":"الحج","23":"المؤمنون","24":"النور","25":"الفرقان","26":"الشعراء","27":"النمل","28":"القصص","29":"العنكبوت","30":"الروم","31":"لقمان","32":"السجدة","33":"الأحزاب","34":"سبأ","35":"فاطر","36":"يس","37":"الصافات","38":"ص","39":"الزمر","40":"غافر","41":"فصلت","42":"الشورى","43":"الزخرف ","44":"الدخان","45":"الجاثية","46":"الأحقاف","47":"محمد","48":"الفتح","49":"الحجرات","50":"ق","51":"الذاريات","52":"الطور","53":"النجم","54":"القمر","55":"الرحمن","56":"الواقعة","57":"الحديد","58":"المجادلة","59":"الحشر","60":"الممتحنة","61":"الصف","62":"الجمعة","63":"المنافقون","64":"التغابن","65":"الطلاق","66":"التحريم","67":"الملك","68":"القلم","69":"الحاقة","70":"المعارج","71":"نوح","72":"الجن","73":"المزمل","74":"المدثر","75":"القيامة","76":"الإنسان","77":"المرسلات","78":"النبأ","79":"النازعات","80":"عبس","81":"التكوير","82":"الانفطار","83":"المطففين","84":"الانشقاق","85":"البروج","86":"الطارق","87":"الأعلى","88":"الغاشية","89":"الفجر","90":"البلد","91":"الشمس","92":"الليل","93":"الضحى","94":"الشرح","95":"التين","96":"العلق","97":"القدر","98":"البينة","99":"الزلزلة","100":"العاديات","101":"القارعة","102":"التكاثر","103":"العصر","104":"الهُمزة","105":"الفيل","106":"قريش","107":"الماعون","108":"الكوثر","109":"الكافرون","110":"النصر","111":"المسد","112":"الإخلاص","113":"الفلق","114":"الناس"};
let url = new URL(window.location)
let parms = new URLSearchParams(url.search);
let reciter = parms.get("reciter")
let currentReciter = {}
$.ajax({
    url:"https://qurani-api.herokuapp.com/api/reciters",
    method:"get",
    success:function(data){
        if(!reciter){
            sheikh.innerHTML = ''
            let letters = []
            let readers = []
            let all = {}
            data.map((quran,index) => {
                letters.push(quran.letter)
                readers.push(quran)
                all.read = readers
                all.lette = letters
            })
            
            new Set(all.lette).forEach(lett =>{
                sheikh.innerHTML += `
                <div class="letter_${lett} letters row position-relative py-5" data-letter="${lett}" id="letter_${lett}">
                    <div class="lett position-absolute"><p class="small-letter text-center rounded-circle m-0">${lett}</p></div>
                </div>`
                all.read.map((quran,index) => {
                    if(quran.letter === lett){
                        $('.letters').each(function(){
                            if($(this).data("letter") === quran.letter){
                                this.innerHTML +=
                                `<div class="my-2 col-lg-4 text-end test">
                                    <div class="sheikh-info p-3 rounded position-relative">
                                        <span class="count position-absolute rounded-circle">${index}</span>
                                        <i class="fa fa-heart d-block my-2 heart"></i>
                                        <a href="?reciter=${quran.id}" class="text-decoration-none">
                                        <p class="fw-bold m-0 name_reader">${quran.name}</p>
                                        <p class="mb-3 fs-5">${quran.rewaya}</p>
                                        </a>
                                    </div>
                                </div>`
                            }
                        })
                    }
                })
            })

        }else{
            let info = {}
            $('#search_reader').css("display","block")
            $('#search').css("display","none");
            data.map(quran =>{
                if(reciter === quran.id){
                    currentReciter.name=quran.name;
                    currentReciter.rewaya=quran.rewaya;
                    $(".sheikh").addClass("row")
                    $('.quran-title').text(quran.name)
                    $('.quran-title-header')[0].innerHTML = quran.rewaya
                    $('.btns-header').css("display","none")
                    info.server = quran.Server
                    info.suras = [quran.suras]
                    info.name = quran.name
                    info.rewaya = quran.rewaya
                    info.count = quran.count
                }
            })

            info.suras[0].split(",").map(sura => {
                let suraNum = `${sura.length == 1 ? "00" + sura : (sura.length == 2 ? "0" + sura : sura)}`
                sheikh.innerHTML += `
                <div style="cursor:pointer" class="my-2 col-lg-6 text-end position-relative">
                    <div class="sheikh-info sura p-3 rounded position-relative">
                        <div class="sura_btns">
                            <span class="hoverd name_sura me-2" dir="rtl">
                             ${suraNum} ${names[sura]}
                            </span>
                            <i class="fa fa-play count hoverd rounded-circle play_sura" style="cursor:pointer" onclick="audio(this,'${info.server}')" data-quran=${sura}></i> 
                            <i class="fa fa-pause count hoverd rounded-circle pause_sura" style="cursor:pointer;display:none"></i>
                        </div>
                        <div class="position-absolute icons-sura">
                            <a href="${info.server}/${suraNum}.mp3" download><ion-icon name="cloud-download-outline" class="fs-4"></ion-icon></a>
                            <i class="fa fa-heart fs-4 heart-none-color heart" onclick="addToFav('${names[sura]}','${info.server}/${suraNum}.mp3',this,'${suraNum}',${sura})"></i>
                            <i class="fa fa-heart fs-4 text-danger heart-colored-color heart" style="display:none" onclick="removeFromFav('${names[sura]}',this,'${suraNum}')"></i>
                        </div>
                    </div>
                </div>`
            })
        }
    },
    error:function(err){console.log("حدث خطأ غير متوقع")}
}).done(function(data){
    
    let letters = Array.from(document.querySelectorAll(".letters .sheikh-info .name_reader"))
    let pre = Array.from(document.querySelectorAll(".letters"))
    search.oninput = function(){
        let searchValue = search.value;
        pre.forEach(ppp =>{
            $(ppp).css("display","none")
            letters.forEach(lett =>{
                $(lett).parent().parent().parent().css("display","none")
                if(lett.innerHTML.includes(searchValue)){
                    $(lett).parent().parent().parent().css("display","block")
                    $(lett).parent().parent().parent().parent().css("display","flex")
                }
            })
        })
    }

    let letters_sura = Array.from(document.querySelectorAll(".sheikh-info .name_sura"))
    search_reader.oninput = function(){
        let searchValue = search_reader.value;
        letters_sura.forEach(lett =>{
            $(lett).parent().parent().parent().css("display","none")
            if(lett.innerHTML.includes(searchValue)){
                $(lett).parent().parent().parent().css("display","block")
            }
        })
    }

 
    $(loading).css("display","none")
    $('.loading-page').fadeToggle()
    $(side_bar).css("display","block")
    $(play_audio).css("display","block")
    setInterval(() => {
        getTime(lisent.duration,lisent.currentTime)
        let currentTimee = 100 * (lisent.currentTime / lisent.duration);
        canhge.value = currentTimee
    }, 1000);
    if(lisent.play()){
        setInterval(() => {
            localStorage.setItem("current",lisent.currentTime)
        }, 1000);
    }

    $(".play_sura").each(function(){
        $(this).click(function(){
            play_butt.style.display = "none"
            pause_butt.style.display = "block";
            removeClassFun()
            $(this).css("display","none")
            $(this).next().css("display","inline-block")
        })
    })
    $(".pause_sura").each(function(){
        $(this).click(function(){
            console.log("clicked")
            play_butt.style.display = "block"
            pause_butt.style.display = "none";
            $(this).css("display","none")
            $(this).prev().css("display","inline-block")
            lisent.pause()
        })
    })
})

