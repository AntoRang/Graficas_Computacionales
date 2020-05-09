var renderer = null,
scene = null,
camera = null
let duration = 20000; // ms
let currentTime = Date.now();
// Score
let score = 0;
let max_score = 0;
// Array of aliens and collision boxes
let aliens = null;
let aliens_colbox = null;
// object alien
let alien = null;
// load
let loaded = false;
// the distance after the aliens enter in state threaten
let distance = 200;
// mouse
let mouse = new THREE.Vector2(), INTERSECTED, CLICKED;
let raycaster;

let animation = "Run_L";
var playing_state = "NEW_GAME";

var alien_states = {
  'state': [],
  'time_in_state': [],
  'animation_list': [],
  'animation': [],
  'KF_animator': []
};

let var_timer = 30, blockScore = false;

function run()
{
  if(playing_state == "NEW_GAME"){
    requestAnimationFrame(function() { run(); });
    renderer.render( scene, camera );
  
    if (loaded){
      animate();
      alienController();
      
    }
  }
}

function timer(){
  setInterval(function(){

    if(loaded){
      let countdown = var_timer --;
      $('#Timer').html(`Timer: ${countdown}`);

      if (countdown <= -1){
        $('#Timer').html(`Se acabo el tiempo`);
        blockScore = true;
        loaded = false;
      }
    }

  },1000);
}

function reset(canvas){
  loaded = false;
  if(score > max_score){
    max_score = score;
    $("#max_score").html("Max Score " + score);
  }else{
    $("#max_score").html("Max Score " + max_score);
  }
  score = 0;
  $("#Score").html("Score: " + score);
  $('#Timer').html(`Se acabo el tiempo`);
  scene.children.pop()
  aliens = null;
  aliens_colbox = null;
  
  animation = "Run_L";
  alien_states = {
    'state': [],
    'time_in_state': [],
    'animation_list': [],
    'animation': [],
    'KF_animator': []
  };
  mouse = new THREE.Vector2(), INTERSECTED, CLICKED;
  raycaster = null;
  blockScore = false;
  var_timer = 30;
  createScene(canvas);
  run();

}

function incrementScore()
{
    score += 1;
    $("#Score").html("Score: " + score);
}

function decrementScore(){
  score -= 1;
    $("#Score").html("Score: " + score);
}

function createScene(canvas)
{
  var container = document.createElement( 'div' );
  document.body.appendChild( container );
  document.addEventListener('mousedown', onDocumentMouseDown);
  window.addEventListener( 'resize', onWindowResize);

  // Create the Three.js renderer and attach it to our canvas
  renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth*.99, window.innerHeight*.98 );
  container.appendChild( renderer.domElement );

  // Create a new Three.js scene
  scene = new THREE.Scene();

  // Add  a camera so we can view the scene
  camera = new THREE.PerspectiveCamera( 70, canvas.width / canvas.height, 1, 10000 );
  camera.position.set(0, 250, 300);
  camera.lookAt(0,0,0);
  scene.add(camera);

  //Contains all aliens in scene
  aliens = new THREE.Object3D;
  aliens_colbox = new THREE.Object3D;

  scene.add(new THREE.AmbientLight( 0xffffff));

  geometry = new THREE.PlaneGeometry(500, 700, 1, 1);
  var material  = new THREE.MeshPhongMaterial({
    color: 0xCCCCCC,
    side: THREE.DoubleSide
  })
  floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -4.02;


  scene.add( floor );
  scene.add (aliens);
  scene.add(aliens_colbox);
  scene.background = new THREE.Color( 0xffffff );

  loadGLTF();

  raycaster = new THREE.Raycaster();

  
}

/*
IDEA: Add object to scene, then clone alien
*/

async function loadGLTF()
{
  let gltfLoader = new THREE.GLTFLoader();
  let loader = promisifyLoader(gltfLoader);
  try
  {
    // Run_L, Threaten, back, idle

    for (var i = 0; i < 7; i++){
      let result = await loader.load("../../Code-samples/models/gltf/raptoid/scene.gltf");
      alien = result.scene.children[0];      
      alien.scale.set(0.2, 0.2, 0.2);
      alien.rotation.z = -Math.PI/2.2;
      alien.position.x = -120+(i*40);
      alien.position.z =-315 ;
      alien.position.y -= 3.8;
      alien.name = "alien";
      
      alien.traverse(child =>{
        if(child.isMesh)
        {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      aliens.add(alien);

      let alien_actions = [];
      result.animations.forEach(element => {
        alien_actions[element.name] = new THREE.AnimationMixer( scene ).clipAction(element, alien);
        alien_actions[element.name].play();
      });

      alien_states.animation_list.push(alien_actions);
      alien_states.animation.push(animation);
      alien_states.state.push("idle");
      alien_states.time_in_state.push(0);

      var geometry = new THREE.BoxGeometry( 30, 20, 30 );
      var material = new THREE.MeshBasicMaterial( {color: 0xCCCCCC} );
      var cube = new THREE.Mesh( geometry, material );
      cube.position.x = alien.position.x;
      cube.position.y = alien.position.y;
      cube.position.z = alien.position.z;

      aliens_colbox.add(cube)

      createDeadAnimation(i);

    }

    loaded = true;
    
  }
  catch(err){console.error(err); }

  timer();
}

function animate() {

  let now = Date.now();
  let deltat = now - currentTime;
  currentTime = now;

  aliens.children.forEach((idx, i) => {
    if(idx && alien_states.animation_list[i][alien_states.animation[i]])
    {
      alien_states.animation_list[i][alien_states.animation[i]].getMixer().update(deltat * 0.001);
    }

    if(alien_states.animation[i] == "dead"){
      alien_states.KF_animator[i].update();
      if(!alien_states.KF_animator[i].running){
          for(let j = 0; j<= alien_states.KF_animator[i].interps.length-1; j++){
            alien_states.KF_animator[i].interps[j].target = idx.rotation;
          }
          alien_states.KF_animator[i].start();
      }
    }
  });
  
}

function alienController(){

  //Controls all alien. Important: Reset time in state on state switch

  for (i in aliens.children){

    switch (alien_states.state[i]){
      case "idle":
        alien_states.animation[i] = "idle";
        aliens.children[i].rotation.z = -Math.PI/2.2;

        //If alien has run space but is idle, switch to run
        if (aliens.children[i].position.z < distance){
          alien_states.state[i] = "run";
          alien_states.time_in_state[i] = 0;
        }
        break;

      case "run":
        alien_states.animation[i] = "Run_L";
        //If alien in run state, run to attack/threaten point
        if (aliens.children[i].position.z < distance){
          aliens.children[i].position.z +=2;
        } else if (aliens.children[i].position.z >= distance){
          alien_states.state[i] = "threaten";
          alien_states.time_in_state[i] = 0;
        }
        break;

      case "threaten":
        alien_states.animation[i] = "Threaten";
        //If given time passes, returns to start
        if (alien_states.time_in_state[i] > 100){
          //aliens.children[i].position.z =-100;
          alien_states.state[i] = "dead";
          alien_states.time_in_state[i] = 0;
        }
        break;

      case "dead":
        alien_states.animation[i] = "dead";
        //If given time passes, returns to start
        if (alien_states.time_in_state[i] > 30){
          //Reset Position, rotation
          if(!blockScore){
            decrementScore();
          }
          aliens.children[i].position.z =-315;
          alien_states.state[i] = "idle";
        }
        break;

      case "dead_by_clicked":
        alien_states.animation[i] = "dead";
        //If given time passes, returns to start
        if (alien_states.time_in_state[i] > 35){
          //Reset Position, rotation
          aliens.children[i].position.z =-315;
          alien_states.state[i] = "idle";
        }
        break;

    }
    //Count time
    alien_states.time_in_state[i]+=1;

    //Attach collision box
    aliens_colbox.children[i].position.z = aliens.children[i].position.z;

    

    if (alien_states.state[i] == 'dead_by_clicked'){
      aliens_colbox.children[i].material.color.setHex( 0xFF0000 );
    }else{
      aliens_colbox.children[i].material.color.setHex( 0xCCCCCC );
    }
  }


}


function createDeadAnimation(i)
{

  alien_states.KF_animator[i] = new KF.KeyFrameAnimator;
  alien_states.KF_animator[i].init({
      interps:
          [
              {
                  keys:[0, .5, 1],
                  values:[
                          { z : 0 },
                          { z : -Math.PI  },
                          { z : -Math.PI * 2 },
                          ],
              },
          ],
      loop: true,
      duration:1 * 1000,
  });
  
}


function onDocumentMouseDown(event)
{
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // find intersections
    raycaster.setFromCamera( mouse, camera );
    let intersects = raycaster.intersectObjects( aliens_colbox.children );

    if ( intersects.length > 0 )
    {
        CLICKED = intersects[ intersects.length - 1 ].object;
        for (i in aliens_colbox.children){

          if (CLICKED == aliens_colbox.children[i]){
            alien_states.state[i] = "dead_by_clicked";
            alien_states.time_in_state[i] = 0;
            if(! blockScore){ incrementScore();}
           
            
          }

          }
    }
    else
    {
        CLICKED = null;
    }
}

function onWindowResize() 
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}