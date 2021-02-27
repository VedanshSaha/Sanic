//Making variables
var monkey, monkey_running;
var bananaImage, obstacleImage;
var obstacle, obstacleGroup1, obtstacleGroup2;
var score;
var ground, groundimg, invisibleGround;
var back, bg;
var bananaGroup1, bananaGroup2;
var banana3;
var sonic;
var jump;
var like, like2, likeimg;
var speed = 0;
const LIVE = 0;
const DEAD = 1;
var health = LIVE;
var chance = 0;

function preload() {
  monkey_running = loadAnimation(
    "Jog1.png",
    "jog2.png",
    "jog3.png",
    "jog4.png",
    "jog5.png",
    "jog6.png",
    "jog7.png",
    "jog8.png",
    "jog9.png",
    "Jog10.png"
  );

  groundimg = loadImage("okk.png");
  bananaImage = loadImage("ring.png");
  obstacleImage = loadAnimation("egg.png.png");
  back = loadImage("bg.png");
  sonic = loadSound("SONICMANIA.mp3");
  jump = loadAnimation("jump.png", "jump.png");
  likeimg = loadImage("likee.png");
}

function setup() {
  createCanvas(windowWidth, 450);

  score = 50;

  ground = createSprite(0, 250);
  ground.addImage("ground", groundimg);

  monkey = createSprite(70, 300);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 1;
  monkey.frameDelay = 4;

  invisibleGround = createSprite(70, 380, 700, 10);
  invisibleGround.visible = false;

  bananaGroup1 = new Group();
  bananaGroup2 = new Group();

  obstacleGroup1 = new Group();
  obstacleGroup2 = new Group();
  sonic.loop();

  banana3 = createSprite(windowWidth, 120);
  banana3.y = round(random(200, 400));
  banana3.addImage("banana", bananaImage);
  banana3.velocityX = -3;
  banana3.scale = 0.1;

  like = createSprite(120, 30);
  like.addImage("like it", likeimg);
  like.scale = 0.7;
  like.visible = false;

  like2 = createSprite(windowWidth - 120, 30);
  like2.addImage("like it", likeimg);
  like2.scale = 0.7;
  like2.visible = false;
}

function draw() {
  StopSpeed();

  background(back);
  if (health === LIVE) {
    like.y = Math.sin(speed / 4) * 5 + 35;
    like2.y = Math.sin(speed / 4) * 5 + 35;
    speed += 0.5;
    if (frameCount > 500) {
      like.visible = true;
      like2.visible = true;
    }

    if (frameCount > 100) {
      monkey.frameDelay = 3;
    }

    if (frameCount > 300) {
      monkey.frameDelay = 2.5;
    }

    if (frameCount > 500) {
      monkey.frameDelay = 2;
    }

    if (frameCount > 900) {
      monkey.frameDelay = 1.5;
    }

    if (frameCount > 1500) {
      monkey.frameDelay = 1;
    }
    if (frameCount > 2500) {
      monkey.frameDelay = 0.5;
    }

    if (frameCount % 400 === 0) {
      spawnObstacles();
    }

    // console.log("ground.velocityX = "+ground.velocityX)

    // console.log(monkey.frameDelay)

    ground.velocityX = -(frameCount / 100);

    if (ground.x < -230) {
      ground.x = 600;
    }

    if (frameCount % 30 === 0) {
      score -= 1;
    }

    monkey.scale -= 0.0001

    if (
      (keyDown("space") && monkey.y > 300) ||
      (touches.length > 0 && monkey.y > 300)
    ) {
      monkey.velocityY = -18;
      monkey.addAnimation("jump", jump);
      //touches[];
    }
    //adding gravity
    monkey.velocityY = monkey.velocityY + 0.9;

    spawnBananas1();
    spawnBananas2();

    if (monkey.isTouching(bananaGroup1)) {
      bananaGroup1.destroyEach();
      score = 50;
      monkey.scale += 0.1
    }
    if (monkey.isTouching(bananaGroup2)) {
      bananaGroup2.destroyEach();
      score = 50;
      monkey.scale += 0.1
    }
    if (monkey.isTouching(banana3)) {
      banana3.y = 1000;
      score = 50;
      monkey.scale += 0.1
    }

    if (monkey.isTouching(obstacleGroup1) || score < 1) {
      health = DEAD;
    }
  } //Statement Live ends

  monkey.collide(invisibleGround);

  //drawSprites function
  drawSprites();

  if (health === DEAD) {
    ground.velocityX = 0;
    monkey.pause();
    bananaGroup2.destroyEach();
    bananaGroup1.destroyEach();
    obstacleGroup1.destroyEach();
    fill("red");
    stroke("black");
    textSize(60);
    strokeWeight("10");
    text("SONIC DIED :(", windowWidth / 2 - 120, 450 / 2);
    monkey.destroy()
  }

  //setup for the survival time
  fill("red");
  stroke("black");
  textSize(30);
  strokeWeight("5");
  text("SurvivalTime:  " + score, windowWidth / 2 - 80, 50);
}

function spawnBananas1() {
  if (health === LIVE) {
    if (frameCount % round(random(600, 400)) === 0) {
      var banana = createSprite(windowWidth, 120);
      banana.y = round(random(150, 200));
      banana.addImage("banana", bananaImage);
      banana.velocityX = -(frameCount / 100);
      banana.scale = 0.1;
      bananaGroup1.add(banana);
    }
  }
}
function spawnBananas2() {
  if (health === LIVE) {
    if (frameCount % round(random(400, 600)) === 0) {
      var banana2 = createSprite(windowWidth, 120);
      banana2.y = round(random(150, 200));
      banana2.addImage("banana", bananaImage);
      banana2.velocityX = -(frameCount / 100);
      banana2.scale = 0.1;
      bananaGroup2.add(banana2);
      bananaGroup2.setColliderEach("circle", 0, 0, 50);
    }
  }
}
function spawnObstacles() {
  if (health === LIVE) {
    if (frameCount % round(random(350, 600))) {
      obstacle = createSprite(windowWidth, 300);
      obstacle.addAnimation("EGGMAN", obstacleImage);
      obstacle.velocityX = -(frameCount / 100) - 2;
      obstacle.lifetime = 450;
      obstacle.scale = 0.2;
      obstacle.rotation = 0;
      obstacleGroup1.add(obstacle);
      obstacleGroup1.setColliderEach("circle", 0, 0, 150);
      chance += 1
      if(chance===1){
        obstacleGroup1.destroyEach()
      }
    }
  }
}

function StopSpeed() {
  if (ground.velocityX < -70) {
    ground.velocityX = -70;
    bananaGroup1.velocityX = -70;
    bananaGroup2.velocityX = -70;
  }
}

(function YO() {
  var w = window,
    C = "___grecaptcha_cfg",
    cfg = (w[C] = w[C] || {}),
    N = "grecaptcha";
  var gr = (w[N] = w[N] || {});
  gr.ready =
    gr.ready ||
    function (f) {
      (cfg["fns"] = cfg["fns"] || []).push(f);
    };
  w["__recaptcha_api"] = "https://www.google.com/recaptcha/api2/";
  (cfg["render"] = cfg["render"] || []).push("explicit");
  (cfg["onload"] = cfg["onload"] || []).push("onloadCallback");
  w["__google_recaptcha_client"] = true;
  var d = document,
    po = d.createElement("script");
  po.type = "text/javascript";
  po.async = true;
  po.src =
    "https://www.gstatic.com/recaptcha/releases/qc5B-qjP0QEimFYUxcpWJy5B/recaptcha__en.js";
  po.crossOrigin = "anonymous";
  po.integrity =
    "sha384-EauiKN7dy30bq/wDo7lcvebLQr7wwQPtEV6A1G43RAWnhPwxWZFCCTOT/hE+ffe3";
  var e = d.querySelector("script[nonce]"),
    n = e && (e["nonce"] || e.getAttribute("nonce"));
  if (n) {
    po.setAttribute("nonce", n);
  }
  var s = d.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(po, s);
})();
