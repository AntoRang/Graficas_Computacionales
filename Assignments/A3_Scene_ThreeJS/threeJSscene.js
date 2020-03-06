let renderer = null, 
scene = null, 
camera = null,
cube = null,
sphere = null,
cone = null,
octahedron = null,
icosahedron = null, 
dodecahedron = null,
tetrahedron = null,
torus = null
;
let principalGroup = null,
cubeGroup =null,
sphereGroup = null,
octahedronGroup = null,
icosahedronGroup = null,
dodecahedronGroup = null,
tetrahedronGroup = null,
torusGroup = null
;

let x = null, y=null, z=null;
let array_figures = ['cube', 'sphere','octahedron','icosahedron','dodecahedron','tetrahedron','torus'];
let array_init = ['cube'];
let array_group = []

let duration = 5000; // ms
let currentTime = Date.now();

const textureUrl = "../images/ash_uvgrid01.jpg";
const texture = new THREE.TextureLoader().load(textureUrl);
const material = new THREE.MeshPhongMaterial({ map: texture });

function animate() 
{
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;

    // Rotate the cube about its Y axis
    // cube.rotation.y += angle; 

    principalGroup.children.forEach((i) => {
        // console.log(i);
        
        i.rotation.y += angle;
        i.rotation.z += angle *2;
 
       })

    // Rotate the sphere group about its Y axis

    // Rotate the cone about its X axis (tumble forward)

}

function run() {
    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();
}

function createScene(canvas)
{    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Set the background color 
    scene.background = new THREE.Color( 0.2, 0.2, 0.2 );
    // scene.background = new THREE.Color( "rgb(100, 100, 100)" );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);

    // Add a directional light to show off the objects
    let light = new THREE.DirectionalLight( 0xffffff, 1.0);
    // let light = new THREE.DirectionalLight( "rgb(255, 255, 100)", 1.5);

    // Position the light out from the scene, pointing at the origin
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    let ambientLight = new THREE.AmbientLight(0xffccaa, 0.2);
    scene.add(ambientLight);

    // let textureUrl = "../../Code-samples/images/ash_uvgrid01.jpg";
    // let texture = new THREE.TextureLoader().load(textureUrl);
    // material = new THREE.MeshPhongMaterial({ map: texture });

    // Create a group to hold all the objects

    principalGroup = new THREE.Object3D;
    addition_geometry_scene('cube', principalGroup, material);
    principalGroup.position.set(1, 0, -0.5); 

    // console.log(principalGroup);
        
    // Now add the group to our scene
    scene.add( principalGroup );
    
    // add mouse handling so we can rotate the scene
    addMouseHandler(canvas, principalGroup);
   
}

function addition_geometry_scene(name, principalGroup, material){
    let {x, y, z} = rdm_coord(3, 15);
    switch(name){
        case 'cube':
            if(principalGroup.children.length > 1){
                break;
            }else{
                cubeGroup = new THREE.Object3D;
                let cube_geometry = new THREE.CubeGeometry(2, 2, 2);
                cube = new THREE.Mesh(cube_geometry, material);
                cube.rotation.x = Math.PI / 5;
                cube.rotation.y = Math.PI / 5;
                cubeGroup.add( cube );
                // cubeGroup.position.set(0, rdm_position(-10, 10) +3, -4);
                principalGroup.add(cubeGroup)
                array_group.push(cubeGroup);
                break;
            }
        case 'sphere':
            console.log(x);
            sphereGroup = new THREE.Object3D;
            let sphere_geometry = new THREE.SphereGeometry(1, 20, 20);
            sphere = new THREE.Mesh(sphere_geometry, material);
            sphereGroup.add( sphere );
            principalGroup.add(sphereGroup);
            sphereGroup.position.set(x, -y, z);
            array_group.push(sphereGroup);
            break;
        case 'octahedron':
            octahedronGroup = new THREE.Object3D;
            let octahedron_geometry = new THREE.OctahedronGeometry(1,0);
            octahedron = new THREE.Mesh(octahedron_geometry, material);
            octahedronGroup.add(octahedron);
            principalGroup.add(octahedronGroup);
            octahedronGroup.position.set(x, -y, z);
            array_group.push(octahedronGroup);
            break;
        case 'icosahedron':
            icosahedronGroup = new THREE.Object3D;
            let icosahedron_geometry = new THREE.IcosahedronGeometry(1,0);
            icosahedron = new THREE.Mesh(icosahedron_geometry, material);
            icosahedronGroup.add(icosahedron);
            principalGroup.add(icosahedronGroup);
            icosahedronGroup.position.set(x, -y, z);
            array_group.push(icosahedronGroup);
            break;
        case 'dodecahedron':
            dodecahedronGroup = new THREE.Object3D;
            let dodecahedron_geometry = new THREE.DodecahedronGeometry(1,0);
            dodecahedron = new THREE.Mesh(dodecahedron_geometry, material);
            dodecahedronGroup.add(dodecahedron);
            principalGroup.add(dodecahedronGroup);
            dodecahedronGroup.position.set(x, -y, z);
            array_group.push(dodecahedronGroup);
            break;
        case 'tetrahedron':
            tetrahedronGroup = new THREE.Object3D;
            let tetrahedron_geometry = new THREE.TetrahedronGeometry(1,0);
            tetrahedron = new THREE.Mesh(tetrahedron_geometry, material);
            tetrahedronGroup.add(tetrahedron);
            principalGroup.add(tetrahedronGroup);
            tetrahedronGroup.position.set(x, y, z);
            array_group.push(tetrahedronGroup);
            break;
        case 'torus':
            torusGroup = new THREE.Object3D;
            let torus_geometry = new THREE.TorusGeometry(0.75, 0.45, 16, 100);
            torus = new THREE.Mesh(torus_geometry, material);
            torusGroup.add(torus);
            torusGroup.position.set(x, y, z);
            principalGroup.add(torusGroup);
            array_group.push(torusGroup);
            break;
        default:
            break;
    }

}

function addition_satelite_scene(group, material){
    let cylinder_geometry = new THREE.CylinderGeometry(0, .333, .444, 20, 5);
    cone = new THREE.Mesh(cylinder_geometry, material);
    // Move the cone up and out from the sphere
    cone.position.set(1.5, 1.5, -.667);
    group.add( cone );
}

function add_figure(rnd_number){
    if(array_figures[rnd_number] === 'cube'){
        array_init.push(array_figures[rnd_number+1]);
        addition_geometry_scene(array_figures[rnd_number+1], principalGroup, material);
    }else{
        array_init.push(array_figures[rnd_number]);
        addition_geometry_scene(array_figures[rnd_number], principalGroup, material);
    }
    
    console.log(array_init);
}

function reset(canvas){
    console.log('clear');
    $("#slider").slider({min: 0.1, max: 2, value: 1, step: 0.01, animate: false});
    if (scene.children.length > 3) {
        console.log(scene.children);
        scene.children.pop()
        console.log(scene.children);
        array_init = ['cube'];
        array_group = [];

        
    }
    principalGroup = new THREE.Object3D;
    addition_geometry_scene('cube', principalGroup, material);
    principalGroup.position.set(1, 0, -0.5); 

    // console.log(principalGroup);
        
    // Now add the group to our scene
    scene.add( principalGroup );

    addMouseHandler(canvas, principalGroup);

}

function add_satelite(){
    if(array_init.length > 1){
        let num = rdm_num(array_init.length);
        while(num === 0 || num === NaN){
            num = rdm_num();
        }
        addition_satelite_scene(array_group[num], material);
        
    }else{
        console.log("No hay figuras");
    }
}

function rdm_num(n){
    return Math.floor(Math.random() * n);
}

function rdm_coord(min, max) {
  const MIN = -1
  const MAX = 1
  let x = (Math.random() * (MAX - MIN) + MIN) > 0 ?
            Math.random() * (max - min) + min :
            -(Math.random() * (max - min) + min)
  let y = (Math.random() * (MAX - MIN) + MIN) > 0 ?
            Math.random() * (max - min) + min :
            -(Math.random() * (max - min) + min)
  let z = (Math.random() * (MAX - MIN) + MIN) > 0 ?
            Math.random() * (max - min) + min :
            -(Math.random() * (max - min) + min)
  return {x, y, z}
}
