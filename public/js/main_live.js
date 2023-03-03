var isPaused;
var censoring = false;
var timeouts = [];
var isSoundLoaded = false;

function loadScript(sURL, onLoad) {
  function loadScriptHandler() {
    var rs = this.readyState;
    if (rs == 'loaded' || rs == 'complete') {
      this.onreadystatechange = null;
      this.onload = null;
      if (onLoad) {
        onLoad();
      }
    }
  }

function scriptOnload() {
    this.onreadystatechange = null;
    this.onload = null;
    window.setTimeout(onLoad,20);
  }

  var oS = document.createElement('script');
  oS.type = 'text/javascript';
  if (onLoad) {
    oS.onreadystatechange = loadScriptHandler;
    oS.onload = scriptOnload;
  }
  oS.src = sURL;
  document.getElementsByTagName('head')[0].appendChild(oS);
}

window.onload = function() {
  setTimeout(function() {
    loadScript('mp3-player-button/script/soundmanager2.js', function() {
      window.setTimeout(function() {
        console.log('soundmanager2.js loaded, delaying before setup()...');
      }, 500);
      window.setTimeout(function() {
        soundManager.setup({
          url: 'mp3-player-button/swf/',
          onready: function() {
            isSoundLoaded = true;
          },
          ontimeout: function() {
            console.log('Loaded OK, but unable to start: unsupported/flash blocked, etc.');
          }
        });
        // ensure start-up in case document.readyState and/or DOMContentLoaded are unavailable
        soundManager.beginDelayedInit();
      }, 1000);
    });
  }, 1000);
  $("#playbutton").hide();
  $("#pausebutton").hide(); 

  

}

var loadClip = function(songUrl) {
  if (isSoundLoaded) {
    soundManager.stopAll();
    soundManager.createSound({
        id: songUrl,
        url: songUrl
    }).play();

    isPaused = false;  
    $("#playbutton").hide();
    $("#pausebutton").show();
    
    // set timings for No Church in the Wild
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    timeouts = [];
                                                                                      //human              
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 12000)); //beings
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 12500)); //mob
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 13500)); //king
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 16500)); //God
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 19000)); //believe
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 29000)); //make
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 30000)); //alive
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 35000)); //church   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 36000)); //wild
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 37000)); //tears
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 37500)); //mosuleam   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 38500)); //floor   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 39000)); //blood   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 39500)); //stains   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 40000)); //coluseum   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 41000)); //doors   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 42000)); //lies   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 42500)); //lips   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 43000)); //priest   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 44000)); //thanksgiving   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 45000)); //disguided
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 46000)); //feast   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 47000)); //rolling   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 47500)); //rolls   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 48000)); //royce   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 48500)); //corniche   
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 49000)); //doctors  
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 50000)); //hiding  
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 51000)); //police  
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 53000)); //seats  
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 54000)); //white     
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 55000)); //like    
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 56000)); //thing    
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 56500)); //bleached            
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 58000)); //drug            
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 58500)); //dealer            
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 59000)); //chic            
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 60000)); //wondering    
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 61000)); //prayers            
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 61500)); //reach
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 62000)); //pios
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 63000)); //cause
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 64000)); //loves
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 65000)); //socrates
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 65500)); //asked
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 66000)); //bias
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 66500)); //seek
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 68000)); //plato
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 69000)); //screech
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 70000)); //know
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 71000)); //hear
    timeouts.push(setTimeout(function() {$.fn.fullpage.moveSectionDown();}, 72000)); //sneaks



  }
  else {
    console.log("FAILED TO LOAD!!!");
    setTimeout(function() {loadClip(songUrl)}, 500);
  }

}

var activeRapper;
var switchActiveRapper = function(newActiveRapper) {
	console.log(activeRapper + "->" + newActiveRapper);
  $(activeRapper).removeClass("activeRapper");
  $(newActiveRapper).addClass("activeRapper");
  activeRapper = newActiveRapper;
  window.scrollTo(0, 0);
}

var togglePlay = function() {
    if (isPaused) {
        soundManager.resumeAll();
        isPaused = false;
        $("#playbutton").hide();
        $("#pausebutton").show();
    }
    else {
        soundManager.pauseAll();
        isPaused = true;
        $("#playbutton").show();
        $("#pausebutton").hide();
    }
}


var hashRouter = function() {
    $(window).off('hashchange').on('hashchange', function() {
        console.log('Current hash is ' + location.hash);

        if (location.hash == "#biggie") getRapper('/biggie');
        else if (location.hash == "#krsone") getRapper('/krsone');
        else if (location.hash == "#drake") getRapper('/drake');
        else if (location.hash == "#kanye") getRapper('/kanye');
        else if (location.hash == "#kendrick") getRapper('/kendrick');
        else if (location.hash == "#lilwayne") getRapper('/lilwayne');
        else if (location.hash == "#missyelliot") getRapper('/missyelliot');
        else if (location.hash == "#nas") getRapper('/nas');
        else if (location.hash == "#nicki") getRapper('/nicki');
        else if (location.hash == "#publicenemy") getRapper('/publicenemy');
        else if (location.hash == "#queenlatifah") getRapper('/queenlatifah');
        else if (location.hash == "#rakim") getRapper('/rakim');
        else if (location.hash == "#jayz") getRapper('/jayz');
        else empty();
        attachEvents();
    });
};

function attachEvents() {
    //click listener for buttons etc.
};

function getRapper(rapper) {

    console.log('lets get ' +rapper);
    //get this data from the (app.get('/biggie' ...)
    $.get(rapper, function(results) {
        //for every item you get display the img
        //$(".ui360").append('<a href="music/Juicy.mp3">Juicy by Notorious B.I.G.</a></div>');
        
        console.log(results);

        $("#maindiv").empty();

        var playerHtml = '<div id="jquery_jplayer_1" class="cp-jplayer"></div>' +
            '<div id="cp_container_1" class="cp-container">' +
            '   <div class="cp-buffer-holder"> <!-- .cp-gt50 only needed when buffer is > than 50% -->' +
            '        <div class="cp-buffer-1"></div>' +
            '        <div class="cp-buffer-2"></div>' +
            '    </div>' +
            '    <div class="cp-progress-holder"> <!-- .cp-gt50 only needed when progress is > than 50% -->' +
            '        <div class="cp-progress-1"></div>' +
            '        <div class="cp-progress-2"></div>' +
            '    </div>' +
            '   <div class="cp-circle-control"></div>' +
            '    <ul class="cp-controls">' +
            '        <li><a class="cp-play" tabindex="1">play</a></li>' +
            '        <li><a class="cp-pause" style="display:none;" tabindex="1">pause</a></li> <!-- Needs the inline style here, or jQuery.show() uses display:inline instead of display:block -->' +
            '    </ul>' +
            '</div>';



        var mp3link;
        if (rapper == '/biggie')    mp3link = 'music/Juicy.mp3';
        else if (rapper == '/krsone')    mp3link = 'music/Sound_of_da_Police.mp3';
        else if (rapper == '/drake')    mp3link = 'music/Know_Yourself.mp3';
        else if (rapper == '/kanye')    mp3link = 'music/No_Church_in_the_Wild.mp3';
        else if (rapper == '/kendrick')    mp3link = 'music/King_Kunta.mp3';
        else if (rapper == '/lilwayne')    mp3link = 'music/A_Milli.mp3';
        else if (rapper == '/missyelliot')    mp3link = 'music/The_Rain.m4a';
        else if (rapper == '/nas')    mp3link = 'music/I_Can.m4a';
        else if (rapper == '/nicki')    mp3link = 'music/Feeling_Myself.mp3';
        else if (rapper == '/publicenemy')    mp3link = 'music/Fight_the_Power.mp3';
        else if (rapper == '/queenlatifah')    mp3link = 'music/U.N.I.T.Y.mp3';        
        else if (rapper == '/rakim')    mp3link = 'music/I_Know_You_Got_Soul.mp3';
        else if (rapper == '/jayz')    mp3link = 'music/Public_Service_Announcement.m4a';


        if (rapper == '/biggie')    $("#descriptionText").html("The Notorious B.I.G., Juicy");
        else if (rapper == '/krsone')    $("#descriptionText").html("KRS-ONE, Sound of da Police");
        else if (rapper == '/drake')    $("#descriptionText").html("Drake, Know Yourself");
        else if (rapper == '/kanye')   $("#descriptionText").html("Kanye West, No Church in the Wild");
        else if (rapper == '/kendrick')   $("#descriptionText").html("Kendrick Lamar, King Kunta");
        else if (rapper == '/lilwayne')    $("#descriptionText").html("Lil Wayne, A Milli");
        else if (rapper == '/missyelliot')    $("#descriptionText").html("Missy Elliot, The Rain");
        else if (rapper == '/nas')    $("#descriptionText").html("Nas, I Can");
        else if (rapper == '/nicki')    $("#descriptionText").html("Nicki Minaj, Feeling Myself");
        else if (rapper == '/publicenemy')    $("#descriptionText").html("Public Enemy, Fight the Power");
        else if (rapper == '/queenlatifah')    $("#descriptionText").html("Queen Latifah, U.N.I.T.Y");    
        else if (rapper == '/rakim')    $("#descriptionText").html("Rakim (Produced By Eric B), I Know You Got Soul");
        else if (rapper == '/jayz')    $("#descriptionText").html("Jay Z, Public Service Announcement");


        if (rapper == '/biggie')    switchActiveRapper("#biggie");
        else if (rapper == '/krsone')    switchActiveRapper("#krsone");
        else if (rapper == '/drake')    switchActiveRapper("#drake");
        else if (rapper == '/kanye')   switchActiveRapper("#kanye");
        else if (rapper == '/kendrick')   switchActiveRapper("#kendrick");
        else if (rapper == '/lilwayne')    switchActiveRapper("#lilwayne");
        else if (rapper == '/missyelliot')    switchActiveRapper("#missyelliot");
        else if (rapper == '/nas')    switchActiveRapper("#nas");
        else if (rapper == '/nicki')    switchActiveRapper("#nicki");
        else if (rapper == '/publicenemy')    switchActiveRapper("#publicenemy");
        else if (rapper == '/queenlatifah')    switchActiveRapper("#queenlatifah");     
        else if (rapper == '/rakim')    switchActiveRapper("#rakim");
        else if (rapper == '/jayz')    switchActiveRapper("#jayz");



        console.log("link is " + mp3link);
        

        loadClip(mp3link);

        
        for (i = 0; i < results.sendData.words.length; i++) {

        	if(censoring && results.sendData.words[i].word.toLowerCase().includes("nigger")) {
        		console.log("CENSORED!");
        		continue;
        	}

            $("#maindiv").append('<div class="section" id="wordsection'+i+'">');

            $("#wordsection"+i).append('<div id="word'+i+'" class="scrollable">');


            $("#word"+i).append('<div id="dispWord'+i+'" class="dispWord"><h1>'+results.sendData.words[i].word+'</h1><div>');
            $("#word"+i).append('<div id="dispSpacer'+i+'" class="dispSpacer"> </div>');
            $("#word"+i).append('<div id="dispImages'+i+'" class="dispImages">');
            //get element by its id
            
            var imageUrl;
            var foundImage = false;
            var indexImage = 0;
            while (!foundImage) {
              if (!results.sendData.words[i].images[indexImage].imageBroken) {
                foundImage = true;
                imageUrl = results.sendData.words[i].images[indexImage].thumb.replace("web-thumb", "web-large");
              }
              else {
                indexImage++;
              }
            
            }
            

            $("#dispImages"+i).append('<a href=\"'+results.sendData.words[i].images[0].href+'" data-featherlight="iframe" data-featherlight-iframe-width="1024" data-featherlight-iframe-min-height="500" data-featherlight-iframe-maxWidth="100%" data-featherlight-loading="<h2>Loading The Metropolitan Museum of Art</h2>"><img src="' + imageUrl + '"></a>');
            
            /*
            setTimeout(function() {
              $.fn.fullpage.moveSectionDown();
            }, timing);
            timing += 1000;
            console.log("make new word "+timing);
            */
        };


        $('#fullpage').fullpage({});
        // $.fn.fullpage.setKeyboardScrolling(true);


      
    });
};

function empty() {
	//clear maindiv
    // $("#maindiv").html("<center>Choose a rapper to begin.</center>");
    window.location.href="/live.html#kanye";
}

$(document).ready(function() {
	//always start on that page
    location.hash = "";
    //when everything is loaded start these functions
    


    empty();
    // console.log('hello1');
    hashRouter();
    // console.log('hello2');

    
    

})