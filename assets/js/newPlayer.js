jQuery(function($) {
  "use strict";
  var x = document.getElementById("audio1");
  var supportsAudio = !!document.createElement("audio").canPlayType;
  if (supportsAudio) {
    // initialize plyr
    var player = new Plyr("#audio1", {
      controls: [
        "restart",
        "play",
        "progress",
        "current-time",
        "duration",
        "mute",
        "volume",
        "download"
      ]
    });

    var index = 0,
      shuffleToggle=false,
      playing = false,
      normalSpeed=1,
      mediaPath = "./assets/audio/",
      extension = "",
      tracks = [
        {
          track: 1,
          name: "Arash & Masih-Damet_Garm",
          duration: "2:46",
          file: "JLS_ATI"
        },
        {
          track: 2,
          name: "Arash & Masih-Mord",
          duration: "8:30",
          file: "BS_TF"
        },
        {
          track: 3,
          name: "zharfaye_zan_bodan_chapter01",
          duration: "5:01",
          file: "BS_ATKM"
        },
        {
          track: 4,
          name: "zharfaye_zan_bodan_chapter02",
          duration: "8:31",
          file: "BSFM_TF"
        },
        {
          track: 5,
          name: "zharfaye_zan_bodan_chapter03",
          duration: "5:05",
          file: "BSFM_ATKM"
        },
        {
          track: 6,
          name: "zharfaye_zan_bodan_chapter04",
          duration: "2:48",
          file: "AC_ATI"
        },
        {
          track: 7,
          name: "zharfaye_zan_bodan_chapter05",
          duration: "5:44",
          file: "AC_ATKMTake_1"
        }
      ],
      buildPlaylist = $.each(tracks, function(key, value) {
        var trackNumber = value.track,
          trackName = value.name,
          trackDuration = value.duration;
        if (trackNumber.toString().length === 1) {
          trackNumber = "0" + trackNumber;
        }
        $("#plList").append(
          '<li> \
                    <div class="plItem"> \
                        <span class="plNum">' +
            trackNumber +
            '.</span> \
                        <span class="plTitle">' +
            trackName +
            '</span> \
                        <span class="plLength">' +
            trackDuration +
            "</span> \
                    </div> \
                </li>"
        );
      }),
      trackCount = tracks.length,
      npAction = $("#npAction"),
      npTitle = $("#npTitle"),
      audio = $("#audio1")
        .on("play", function() {
          playing = true;
          npAction.text("Now Playing...");
        })
        .on("pause", function() {
          playing = false;
          npAction.text("Paused...");
        })
        .on("ended", function() {

          npAction.text("Paused...");
          if (!shuffleToggle) {
            if (index + 1 < trackCount) {
              index++;
              loadTrack(index);
              audio.play();
            } else {
              audio.pause();
              index = 0;
              loadTrack(index);
            }
          }else{
            audio.pause();
            index = Number(Math.random()*tracks.length);
            console.log('loaded track is '+index);
            loadTrack(Math.floor(index));
            audio.play();
          }
          

        })
        .get(0),
      btnPrev = $("#btnPrev").on("click", function() {
        if (index - 1 > -1) {
          index--;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      btnPly = $("#btnPly").on("click", function() {
        if (playing) {
          audio.pause();
        } else {
          audio.play();
        }
      }),
      btnSpdBack = $("#btnSpdBack").on("click", function() {
        alert("btn spd back");
      }),
      btnSpdForward_1 = $("#btnSpdForwrd").on("click", function() {
        
        x.playbackRate = 0.5;
        console.log(x.playbackRate);
      }),
      btnSpdForward_2 = $("#btnSpdForwrd1").on("click", function() {
        
        if(x.playbackRate==1){
          x.playbackRate = 1;
        }
        else
          x.playbackRate = 1;
        console.log(x.playbackRate);
      }),
      btnSpdForward_3 = $("#btnSpdForwrd2").on("click", function() {
        if(x.playbackRate==1.5){
          x.playbackRate = 1;
        }
        else 
          x.playbackRate = 1.5;
        console.log(x.playbackRate);
      }),
      btnSpdForward_4 = $("#btnSpdForwrd3").on("click", function() {
        if(x.playbackRate==1.75){
          x.playbackRate = 1;
        }
        else 
          x.playbackRate = 1.75;
        console.log(x.playbackRate);
      }),
      btnSpdForward_5 = $("#btnSpdForwrd4").on("click", function() {
        if(x.playbackRate==2){
          x.playbackRate = 1;
        }
        else 
          x.playbackRate = 2;
        console.log(x.playbackRate);
      }),
      btnShuffle = $("#shuffle").on("click", function() {
        shuffleToggle=!shuffleToggle;
        $("#shuffle").toggleClass('enabled');
        $("#shuffle").css("background",shuffleToggle?"blue": "transparent");
      }),
      btnNext = $("#btnNext").on("click", function() {
        if (index + 1 < trackCount) {
          index++;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      li = $("#plList li").on("click", function() {
        var id = parseInt($(this).index());
        if (id !== index) {
          playTrack(id);
        }
      }),
      loadTrack = function(id) {
        $(".plSel").removeClass("plSel");
        $("#plList li:eq(" + id + ")").addClass("plSel");
        npTitle.text(tracks[id].name);
        index = id;
        audio.src = mediaPath + tracks[id].name + extension;
        updateDownload(id, audio.src);
      },
      updateDownload = function(id, source) {
        player.on("loadedmetadata", function() {
          $('a[data-plyr="download"]').attr("href", source);
        });
      },
      playTrack = function(id) {
        loadTrack(id);
        audio.play();
      };
    extension = audio.canPlayType("audio/mpeg")
      ? ".mp3"
      : audio.canPlayType("audio/ogg")
      ? ".ogg"
      : "";
    loadTrack(index);
  } else {
    // no audio support
    $(".column").addClass("hidden");
    var noSupport = $("#audio1").text();
    $(".container").append('<p class="no-support">' + noSupport + "</p>");
  }
});
