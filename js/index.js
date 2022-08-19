var laptopscrolls = document.querySelectorAll("#laptop_scroll");
var phonescrolls = document.querySelectorAll("#phone_scroll");
var tabletscrolls = document.querySelectorAll("#tablet_scroll");

var render = function() {
    var scrolltop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var speed = 720 / document.documentElement.clientHeight;
    //console.log(windowHeight);
    scrolltop -= 20;

    for(var i = 0; i < laptopscrolls.length; i++) {
        var layer = laptopscrolls[i];
        var y = (scrolltop - layer.offsetTop) * 0.15 * speed;
        layer.style.backgroundPosition = "0px " + y + "px";
        laptopPreviewes[i].style.backgroundPosition = "0px " + y + "px";
        //console.log(y);
    }

    scrolltop -= 10;
    for(var i = 0; i < tabletscrolls.length; i++) {
        var layer = tabletscrolls[i];
        var y = (scrolltop - layer.offsetTop) * 0.2 * speed;
        layer.style.backgroundPosition = "0px " + y + "px";
        tabletPreviewes[i].style.backgroundPosition = "0px " + y + "px";
        //console.log(y);
    }

    scrolltop -= 100;
    for(var i = 0; i < phonescrolls.length; i++) {
        var layer = phonescrolls[i];
        var y = (scrolltop - layer.offsetTop) * 0.7 * speed;
        layer.style.backgroundPosition = "0px " + y + "px";
        phonePreviewes[i].style.backgroundPosition = "0px " + y + "px";
        //console.log(y);
    }
};

window.onscroll = function(){
    render();
};

setTimeout(function() {
    render();
}, 50);

var tabletPreviewes = document.querySelectorAll("#tablet_preview");
var phonePreviewes = document.querySelectorAll("#phone_preview");
var laptopPreviewes = document.querySelectorAll("#laptop_preview");
var imageCount = 0;
var updateImage = setInterval(function() {
    

    backgroundLoop();


    imageCount++;
    //console.log(imageCount%haircreatorImages.length);
}, 3000);


//tkitfacn
var realchess3rd = ["url('media/images/content/realchess3rd/1.png')", "url('media/images/content/realchess3rd/2.png')", "url('media/images/content/realchess3rd/3.png')", "url('media/images/content/realchess3rd/4.png')"];
var pocketImages = ["url('media/images/content/pocketarcadear/1.png')", "url('media/images/content/pocketarcadear/2.png')"];
var haircreatorImages = ["url('media/images/content/haircreator/1.png')", "url('media/images/content/haircreator/2.png')", "url('media/images/content/haircreator/3.png')"];
var moveonlinesImages = ["url('media/images/content/moveonlines/1.png')", "url('media/images/content/moveonlines/2.png')"];
var lazertapImages = ["url('media/images/content/lazertap/1.png')", "url('media/images/content/lazertap/2.png')"];
var bulletslayerImages = ["url('media/images/content/bulletslayer/1.png')", "url('media/images/content/bulletslayer/2.png')", "url('media/images/content/bulletslayer/3.png')"];
var makeraceImages = ["url('media/images/content/makeracetrack/1.png')", "url('media/images/content/makeracetrack/2.png')"];
var airburstImages = ["url('media/images/content/airburstreturn/1.png')", "url('media/images/content/airburstreturn/2.png')"];


//vitpr
var hippocamp3dImages = ["url('media/images/content/hippocamp3d/1.png')", "url('media/images/content/hippocamp3d/2.png')"];
var tankgunImages = ["url('media/images/content/tankgun/1.png')", "url('media/images/content/tankgun/2.png')"];
var tangleremasterImages = ["url('media/images/content/tangleremaster/1.png')", "url('media/images/content/tangleremaster/2.png')"];
var vrshooterImages = ["url('media/images/content/vrzombieshooter/1.png')", "url('media/images/content/vrzombieshooter/2.png')"];
var funraceImages = ["url('media/images/content/funrace/1.png')", "url('media/images/content/funrace/2.png')"];
var pickuptapImages = ["url('media/images/content/pickmeuptaptap/1.png')", "url('media/images/content/pickmeuptaptap/2.png')"];
var jellytapImages = ["url('media/images/content/jellytaptap/1.png')", "url('media/images/content/jellytaptap/2.png')"];

var backgroundLoop = function() {
    timeUpdateBGColor = 1;
    
    phoneLoop();
    tabletLoop();
    laptopLoop();
}

var phoneLoop = function() {
    var index = 0;
    phonePreviewes[index].style.backgroundImage = realchess3rd[imageCount%realchess3rd.length];
    index++;
    phonePreviewes[index].style.backgroundImage = pocketImages[imageCount%pocketImages.length];
    index++;
    phonePreviewes[index].style.backgroundImage = lazertapImages[imageCount%lazertapImages.length];
    index++;
    phonePreviewes[index].style.backgroundImage = airburstImages[imageCount%airburstImages.length];

    index++;
    phonePreviewes[index].style.backgroundImage = tangleremasterImages[imageCount%tangleremasterImages.length];
    index++;
    phonePreviewes[index].style.backgroundImage = funraceImages[imageCount%funraceImages.length];
    index++;
    phonePreviewes[index].style.backgroundImage = pickuptapImages[imageCount%pickuptapImages.length];
    index++;
    phonePreviewes[index].style.backgroundImage = jellytapImages[imageCount%jellytapImages.length];
}

var tabletLoop = function() {
    var index = 0;
    tabletPreviewes[index].style.backgroundImage = bulletslayerImages[imageCount%bulletslayerImages.length];
    index++;
    tabletPreviewes[index].style.backgroundImage = makeraceImages[imageCount%makeraceImages.length];

    index++;
    tabletPreviewes[index].style.backgroundImage = hippocamp3dImages[imageCount%hippocamp3dImages.length];
    index++;
    tabletPreviewes[index].style.backgroundImage = tankgunImages[imageCount%tankgunImages.length];
    index++;
    tabletPreviewes[index].style.backgroundImage = vrshooterImages[imageCount%vrshooterImages.length];
}

var laptopLoop = function() {
    var index = 0;
    laptopPreviewes[index].style.backgroundImage = haircreatorImages[imageCount%haircreatorImages.length];
    index++;
    laptopPreviewes[index].style.backgroundImage = moveonlinesImages[imageCount%moveonlinesImages.length];
}

var timeUpdateBGColor = 0.0;
var updateBGColor = setInterval(function() {
    if (timeUpdateBGColor > 0) {
        timeUpdateBGColor -= 0.05;
        var c = 255* timeUpdateBGColor;
        var white = "rgba(246, 246, 246," + timeUpdateBGColor + ")";
        var dark = "rgba(26, 27, 29," + timeUpdateBGColor + ")";
        //laptopPreviewes[0].style.backgroundColor = white;
        phonePreviewes[0].style.backgroundColor = white;
        //tabletPreviewes[0].style.backgroundColor = white;
    }
}, 100);