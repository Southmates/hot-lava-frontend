function videoMuting() {
  // assume only one video is playing at a time
  var videoPlaying = null;

  const onPlay = function () {
  if (videoPlaying && videoPlaying != this) {
    videoPlaying.pause();
  }
    videoPlaying = this;
  };

  // get all iframes in the scene
  let allIframesOnScene = document.getElementsByTagName("iframe");

  // init event handler
  // const videos = document.querySelectorAll(".card video");
  /* for (let i = 0; i < allIframesOnScene.length; i++) {
    allIframesOnScene[i].addEventListener("click", onPlay);
    console.log(allIframesOnScene[i]);
  } */
  /* for(let i = 0; i < allIframesOnScene.length; i++) {
    // filtra elementos que no contengan player.vimeo.com en el src
    if(allIframesOnScene[i].src == null || allIframesOnScene[i].src.indexOf("player.vimeo.com") == -1) {
      continue;
    }
    
    let iframe = allIframesOnScene[i];
    let player = new Vimeo.Player(iframe);
    
      player.on('pause', function() {
        console.log('paused');
      });
    
    player.pause();
  } */

  let closebtn = document.querySelector(".js-close");
  closebtn.addEventListener("click", function (e) { 
    /* document.querySelectorAll("video").forEach((v) => {
        v.pause();
    }); */
    for(let i = 0; i < allIframesOnScene.length; i++) {
      // filtra elementos que no contengan player.vimeo.com en el src
      if(allIframesOnScene[i].src == null || allIframesOnScene[i].src.indexOf("player.vimeo.com") == -1) {
        continue;
      }
      
      let iframe = allIframesOnScene[i];
      let player = new Vimeo.Player(iframe);
      
          player.on('pause', function() {
          console.log('paused');
        });
      
      player.pause();
    }
  });
}

export default videoMuting 