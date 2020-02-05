$(document).ready(function(){

  // init ScrollMagic
  var controller = new ScrollMagic.Controller();

  /* pin example
     =========== */
  // pin the intro
  var pinIntroScene = new ScrollMagic.Scene({
    triggerElement: '#intro',
    triggerHook: 0,
    duration: '30%'
  })
    .setPin('#intro', {pushFollowers: false})
    .addTo(controller);

  // pin again
  var pinIntroScene2 = new ScrollMagic.Scene({
    triggerElement: '#project01',
    triggerHook: 0.4
  })
    .setPin('#intro', {pushFollowers: false})
    .addTo(controller);


  /* integration of animate.css
     ========================== */
  var animate1 = new ScrollMagic.Scene({
    triggerElement: '#intro img',
    triggerHook: 1,
  })
    .setClassToggle('#intro img','lightSpeedIn')   //adds animate.css class (issue toggling multiple classes - add 'animate' to base html)
    // .addIndicators()
    .addTo(controller);



  /* add class example
     ================= */
  // scene for prj1 - fade in
  var ourScene = new ScrollMagic.Scene({
      triggerElement: '#project01 img',       //css selector (allows great precision for scene start)
      // duration: '90%',                          // scene lasting for duration (px or %)
      triggerHook: 0.9,                      //(0-top, 0.5-center, 1-bottom)
      reverse: false,                        //if false, wont reverse when scroll back up, so effect not applied when scroll down again
      // offset: 50,                            //offset past trigger elem
    })
    .setClassToggle('#project01','fade-in')   //adds class to project01
    // .addIndicators()
    .addTo(controller);

  ourScene.addIndicators({name: "scene 1 (duration: 300)",
                          colorStart: "orange", colorEnd: "purple", colorTrigger: "blue" });



  /* technique to add scene to multiple elems
     ======================================== */
  // loop through each elem - identify via class .project
  $('.loop-technique').each(function(){     //jq each()

    // build a scene
    console.log(this);   //can see elem we are dealing with

    var ourScene = new ScrollMagic.Scene({
      triggerElement: this.children[0],     //drill down to <img> child (first in children native NodeList obj)
      triggerHook: 0.9,
      reverse: false,
    })
      .setClassToggle(this, 'fade-in') // add class to project01
      .addTo(controller);

    ourScene.addIndicators({name: "scene 1 (duration: 300)",
      colorStart: "orange", colorEnd: "purple", colorTrigger: "blue" });

  });



  /* technique to add parallax scene
   ================================= */
  var parallaxTl = new TimelineMax();
  parallaxTl
    .from('.content-wrapper', 0.4, {autoAlpha: 0, ease:Power0.easeNone}, 0.4)
    .from('.bcg', 2, {y: '-30%', ease:Power0.easeNone}, 0)
  ;

  var slideParallaxScene = new ScrollMagic.Scene({
    triggerElement: '.bcg-parallax',
    triggerHook: 1,
    duration: '150%'
  })
    .setTween(parallaxTl)
    // .setTween(TweenMax.from('.bcg', 1, {y: '-30%', ease:Power0.easeNone}) )
    .addTo(controller);

});


















