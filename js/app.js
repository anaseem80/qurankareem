




function removeClassFun(){
    $(".play_sura").each(function(){
        $(this).css("display","inline-block")
        $(".pause_sura").css("display","none")
    })
}

audio = (e,server) =>{
    let f = $(e).data("quran").toString()
    let test = f.length == 1 ? "00" + f : (f.length == 2 ? "0" + f : f)
    lisent.src = server + "/" + test + ".mp3";
    localStorage.setItem("playerSrc",server + "/" + test + ".mp3");
}



function getTime(dur,curr){
    let hours = ~~(dur / 60 / 60);
    let minutes = ~~((dur % 3600) / 60);
    let seconds = ~~(dur % 60);

    hours = hours > 0 ? "0"+hours+":" : ""
    minutes = minutes < 10 ? "0"+minutes+":" : minutes+":"
    seconds = seconds < 10 ? "0"+seconds : seconds
    end.innerHTML = `${hours}${minutes}${seconds}`

    /* Get Duration Time */


    /* Get Current Time */

    let hoursCur = ~~(curr / 60 / 60);
    let minutesCur = ~~((curr % 3600) / 60);
    let secondsCur = ~~(curr % 60);

    hoursCur = hoursCur > 0 ? "0"+hoursCur+":" : ""
    minutesCur = minutesCur < 10 ? "0"+minutesCur+":" : minutesCur+":"
    secondsCur = secondsCur < 10 ? "0"+secondsCur : secondsCur
    start.innerHTML = `${hoursCur}${minutesCur}${secondsCur}`

    /* Get Current Time */

    

}

function calcTime(time){
    let hoursCur = ~~(curr / 60 / 60);
    let minutesCur = ~~((curr % 3600) / 60);
    let secondsCur = ~~(curr % 60);
}

canhge.onchange = function(){
    lisent.currentTime = lisent.duration * (canhge.value / 100);
    lisent.play()
    play_butt.style.display = "none"
    pause_butt.style.display = "block";
}

play_butt.onclick = function(){
    play_butt.style.display = "none"
    pause_butt.style.display = "block"
    lisent.play();
}
pause_butt.onclick = function(){
    play_butt.style.display = "block"
    pause_butt.style.display = "none"
    lisent.pause()
}

function removeFromFav(n,e,f){
    localStorage.removeItem("favName_"+n);
    $(e).css("display","none")
    $(e).prev().css("display","inline-block")
    $.notify("تم حذف السورة من المفضلة", "error");
}

function addToFav(n,server,e,f,s){
    localStorage.setItem("favName_"+n,JSON.stringify({"name":n,"server":server,suraLength:f,sura:s,displayBlock:"block",displayNone:"none"}));
    $(e).css("display","none")
    $(e).next().css("display","inline-block");
    $.notify("تم إضافة السورة الي المفضلة!", "success");
}

if(localStorage.getItem("playerSrc")){
    lisent.src = localStorage.getItem("playerSrc")
    play_butt.style.display = "none"
    pause_butt.style.display = "block";
    lisent.play()
}else{
    lisent.src = "https://server8.mp3quran.net/ahmad_huth/001.mp3"
}
if(localStorage.getItem("current")){
    lisent.currentTime = localStorage.getItem("current")
    play_butt.style.display = "none"
    pause_butt.style.display = "block";
}