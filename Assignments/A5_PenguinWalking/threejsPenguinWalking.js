let renderer = null, 
scene = null, 
camera = null,
root = null,
group = null,
orbitControls = null;;

let objLoader = null;
objectList = [];
let animator = null,
crateAnimator = null,
duration = 10, // sec
lightAnimator = null,
rad = 90,
move = 180 ;

let directionalLight = null;
let spotLight = null;
let ambientLight = null;
let pointLight = null;
let loopAnimation = false, animateLight = true,animateCrate = true;


let SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;
let objModelUrl = {obj:'../../Code-Samples/models/obj/Penguin_obj/penguin.obj', map:'../../Code-Samples/models/obj/Penguin_obj/peng_texture.jpg'};
let mapUrl = '../../Code-samples/images/colors.jpg'
;
// pingu

function run() 
{
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );

    // Update the animations
    KF.update();
    // console.log(animator);

    // Update the camera controller
    orbitControls.update();
}


function promisifyLoader ( loader, onProgress ) 
{
    function promiseLoader ( url ) {
  
      return new Promise( ( resolve, reject ) => {
  
        loader.load( url, resolve, onProgress, reject );
  
      } );
    }
  
    return {
      originalLoader: loader,
      load: promiseLoader,
    };
}

async function loadObj(objModelUrl)
{
    const objPromiseLoader = promisifyLoader(new THREE.OBJLoader());

    try {
        const object = await objPromiseLoader.load(objModelUrl.obj);
        
        let texture = objModelUrl.hasOwnProperty('map') ? new THREE.TextureLoader().load(objModelUrl.map) : null;
        let normalMap = objModelUrl.hasOwnProperty('normalMap') ? new THREE.TextureLoader().load(objModelUrl.normalMap) : null;
        let specularMap = objModelUrl.hasOwnProperty('specularMap') ? new THREE.TextureLoader().load(objModelUrl.specularMap) : null;

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = texture;
                child.material.normalMap = normalMap;
                child.material.specularMap = specularMap;
            }
        });

        object.scale.set(2, 2, 2);
        object.position.z = 0;
        object.position.x = 0;
        object.rotation.y = 0.5;
        object.name = "objObject";
        
        objectList.push(object);

        scene.add(object);
        initAnimations();
        animator.start();
        
    }
    catch (err) {
        return onError(err);
    }
}

const onError = ( ( err ) => { console.error( err ); } );


function setLightColor(light, r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;
    
    light.color.setRGB(r, g, b);
}

function createScene(canvas) 
{

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Turn on shadows
    renderer.shadowMap.enabled = true;
    // Options are THREE.BasicShadowMap, THREE.PCFShadowMap, PCFSoftShadowMap
    renderer.shadowMap.type = THREE.BasicShadowMap;


    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(150, 250, 400);
    scene.add(camera);

    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0x000000, 1);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

     // Create and add all the lights
     directionalLight.position.set(.5, 1, -3);
     directionalLight.target.position.set(0,0,0);
     directionalLight.castShadow = true;
     root.add(directionalLight);
 
     spotLight = new THREE.SpotLight (0xffffff);
    spotLight.position.set(2, 8, 200);
    spotLight.target.position.set(-2, 0, 100);

    root.add(spotLight);

    // spot light
    spotLight.castShadow = true;

    spotLight.shadow.camera.near = 1;
    spotLight.shadow. camera.far = 400;
    spotLight.shadow.camera.fov = 45;

    spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
 
     ambientLight = new THREE.AmbientLight ( 0x1a181a, 0.8);
     root.add(ambientLight);

     // Create the objects
    loadObj(objModelUrl);
    
    group = new THREE.Object3D;
    root.add(group);

    // Create a texture map
    let map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(8, 8);

    let color = 0xffffff;

    // let asteroid = new THREE.Object3D();
    // Put in a ground plane to show off the lighting
    let geometry = new THREE.PlaneGeometry(600, 500, 50, 50);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color, map:map, side:THREE.DoubleSide}));

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4.02;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add( mesh );

    // Create a group to hold the objects
    
    // Now add the group to our scene
    scene.add( root );
}

function initAnimations() 
{
    objectList.forEach(idx=>{

        if(animateCrate){
            animator = new KF.KeyFrameAnimator;
            animator.init({ 
            interps:
                [
                    { 
                        keys:[0, .5, 1], 
                        values:[
                                { z : 0.25 },
                                { z : 0 },
                                { z : -0.25},
                                ],
                        target:idx.rotation,
                        
                    },
                    { 
                        keys:[0, .05, .1, .15, .2, .25, .3, .35, .4, .45, .5, .55, .6, .65, .7, .75, .8, .85, .9, 1], 
                        values:[
                                            // Primer circulo
                            {x : Math.cos( (1 * Math.PI) / 5 ) * rad , z:  Math.sin( (1 * Math.PI) / 5 ) * rad },         //0 Key:0   B
                            {x : Math.cos( (2 * Math.PI) / 5 ) * rad, z : Math.sin( (2 * Math.PI) / 5 ) * rad },          //1 Key:.05  C
                            {x : Math.cos( (3 * Math.PI) / 5 ) * rad, z : Math.sin( (3 * Math.PI) / 5 ) * rad },          //2 Key:.1 D
                            {x : Math.cos( (4 * Math.PI) / 5 ) * rad, z : Math.sin( (4 * Math.PI) / 5 ) * rad },          //3 Key:.15  E
                            {x : Math.cos( (5 * Math.PI) / 5 ) * rad, z : Math.sin( (5 * Math.PI) / 5 ) * rad },          //4 Key:.2 F
                            {x : Math.cos( (6 * Math.PI) / 5 ) * rad, z : Math.sin( (6 * Math.PI) / 5 ) * rad },          //5 Key:.25  G
                            {x : Math.cos( (7 * Math.PI) / 5 ) * rad, z : Math.sin( (7 * Math.PI) / 5 ) * rad },          //6 Key:.3 H
                            {x : Math.cos( (8 * Math.PI) / 5 ) * rad, z : Math.sin( (8 * Math.PI) / 5 ) * rad },          //7 Key:.35  I
                            {x : Math.cos( (9 * Math.PI) / 5 ) * rad, z : Math.sin( (9 * Math.PI) / 5 ) * rad },          //8 Key:.4 J
                            {x : Math.cos( (10 * Math.PI) / 5 ) * rad, z : Math.sin( (10 * Math.PI) / 5 ) * rad },         //9 Key:.45 A

                                            // segundo circulo
                            
                            {x : move + (Math.cos( (4 * Math.PI) / 5 ) * rad), z : (Math.sin( (4 * Math.PI) / 5 ) * rad) },          //10 Key:.5     E
                            {x : move + (Math.cos( (3 * Math.PI) / 5 ) * rad), z : (Math.sin( (3 * Math.PI) / 5 ) * rad) },          //11 Key:.55    D
                            {x : move + (Math.cos( (2 * Math.PI) / 5 ) * rad), z : (Math.sin( (2 * Math.PI) / 5 ) * rad) },          //12 Key:.6     C
                            {x : move + (Math.cos( (1 * Math.PI) / 5 ) * rad), z : (Math.sin( (1 * Math.PI) / 5 ) * rad) },         //13 Key:.65     B
                            {x : move + (Math.cos( (10 * Math.PI) / 5 ) * rad), z : (Math.sin( (10 * Math.PI) / 5 ) * rad) },        //14 Key:.7     A
                            {x : move + (Math.cos( (9 * Math.PI) / 5 ) * rad), z : (Math.sin( (9 * Math.PI) / 5 ) * rad) },          //15 Key:.75    J
                            {x : move + (Math.cos( (8 * Math.PI) / 5 ) * rad), z : (Math.sin( (8 * Math.PI) / 5 ) * rad) },          //16 Key:.8     I
                            {x : move + (Math.cos( (7 * Math.PI) / 5 ) * rad), z : (Math.sin( (7 * Math.PI) / 5 ) * rad) },          //17 Key:.85    H
                            {x : move + (Math.cos( (6 * Math.PI) / 5 ) * rad), z : (Math.sin( (6 * Math.PI) / 5 ) * rad) },          //18 Key:.9     G
                            {x : move + (Math.cos( (5 * Math.PI) / 5 ) * rad), z : (Math.sin( (5 * Math.PI) / 5 ) * rad) },          //19 Key:1      F
                            
                        ],
                        target:idx.position
                    },
                    { 
                        keys:[0, .05, .1, .15, .2, .25, .3, .35, .4, .45, .5, .55, .6, .65, .7, .75, .8, .85, .9, 1], 
                        values:[

                                { x : 0, y : 0, z : 0},
                                { x : Math.PI / 12, y : -1, z : Math.PI / 12 },
                                { x : 0, y : -2, z : Math.PI / 12  },
                                { x : -Math.PI / 12, y : -2.5, z : -Math.PI / 12 },
                                { y : -3, x : 0, z : 0 },
                                { y : -3.5, x : Math.PI / 12, z : Math.PI / 12 },
                                { y : -4, x : 0, z : Math.PI / 12},
                                { y : -4.5, x : -Math.PI / 12, z : -Math.PI / 12},
                                { y : -5, x : 0, z : 0 },
                                { y : -6, x : Math.PI / 12, z : Math.PI / 12 },

                                { y : -6, x : 0, z : Math.PI / 12 },
                                { y : -5, x : -Math.PI / 12, z : -Math.PI / 12},
                                { y : -4.5, x : 0, z : 0 },
                                { y : -4, x : Math.PI / 12, z : Math.PI / 12 },
                                { y : -3.5, x : 0, z : Math.PI / 12 },
                                { y : -3, x : -Math.PI / 12, z : -Math.PI / 12},
                                { y : Math.sin((8 * Math.PI) / 5), x : 0, z : 0 },
                                { y : Math.sin((7 * Math.PI) / 5), x : Math.PI / 12, z : Math.PI / 12 },
                                { y : Math.sin((6 * Math.PI) / 5), x : 0, z : Math.PI / 12 },
                                { y : Math.sin((5 * Math.PI) / 5), x : -Math.PI / 12, z : -Math.PI / 12},
                                ],
                        target:idx.rotation
                    },
                ],
            loop: loopAnimation,
            duration: duration * 3000
        });
        }
    })
    
}


function playAnimations()
{
    animator.start();
}














