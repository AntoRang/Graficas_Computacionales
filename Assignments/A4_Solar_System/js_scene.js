// ------------------------------ Variables Globales ------------------------------
var composer, clock, uniforms;
let estrellas, renderer, canvas, camera, scene, controls, sol, asteroidesGeo;
let grupos = [];
let duration = 5000; // ms
let currentTime = Date.now();


// ------------------------------ addScene() ------------------------------
function addScene(item) {
    console.log(item);
    scene.add(item)
}

// ------------------------------ planetsAnimate() ------------------------------

function planetsAnimate () {
    if (grupos.length === 0) { return }
    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 0.2 * fract;
    
    grupos.forEach((g, index) => {    
        g.group.rotation.y -= angle;
        g.figure.rotation.x += angle;
        g.figure.rotation.z += angle;


        g.satelites.forEach((s) => {
            if (index === 0){               // Sol
                s.rotation.z += angle;
            }else if(index === 6 || index === 7){          // Saturno y Urano
                s.rotation.x += angle;
            }else
                s.rotation.y += angle;

        });
    })
    
}

// ------------------------------ animate() ------------------------------
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    var delta = 5 * clock.getDelta();

	uniforms[ "time" ].value += 0.2 * delta;

    renderer.render(scene, camera);
}


// ------------------------------ run() ------------------------------
function run() {
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );
    planetsAnimate();
    
    animate();
}

function getRdmInt(min, max){
    return Math.random() * (max - min) + min;
}


// ------------------------------ createScene() ------------------------------
function createScene(canvasDom) {
    canvas = canvasDom;
    // Create the Three.js renderer and attach it to our canvas
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera( 100, canvas.width / canvas.height, 1, 10000 );
    

    // ------------------------------ Orbit Controls ------------------------------

    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    document.body.appendChild( renderer.domElement );
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // ------------------------------ Camara ------------------------------

    camera.position.set( 0, 20, 100 );
    scene.add(camera);

    // ------------------------------ Point Light ------------------------------

    // Add a directional light to show off the objects
    let light = new THREE.PointLight( 0xfffff0, 5, 0, 1 );
    // let light = new THREE.DirectionalLight( "rgb(255, 255, 100)", 1.5);

    // Position the light out from the scene, pointing at the origin
    light.position.set( 0, 0, 0 );
    // light.target.position.set(0,-2,0);
    scene.add(light);

    // ------------------------------ Estrellas ------------------------------

    const textureUrl = 'textures/star.png';
    
    let starGeo = new THREE.Geometry();

    for (let i = 0; i < 10000; i++) {
        let star = new THREE.Vector3(
            (Math.random() * 2 - 1) * 1000,
            (Math.random() * 2 - 1) * 1000,
            (Math.random() * 2 - 1) * 1000
        );
        starGeo.vertices.push(star);
    }
    
    let sprite = new THREE.TextureLoader().load(textureUrl);
    let starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        map: sprite
    });

    estrellas = new THREE.Points(starGeo, starMaterial);
    scene.add(estrellas);



    // ------------------------------ Vertex Shader & Fragment Shader Sol ------------------------------

    var textureLoader = new THREE.TextureLoader();

    uniforms = {

        // "fogDensity": { value: 0.45 },
        // "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
        "time": { value: 1.0 },
        "uvScale": { value: new THREE.Vector2( 2.0, 1 ) },
        "texture1": { value: textureLoader.load( 'textures/cloud.png' ) },
        "texture2": { value: textureLoader.load( 'textures/lavatile.jpg' ) }

    };



    uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
	uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        transparent:true
    });


    // ------------------------------ Sol ------------------------------

    let grupoSol = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry( 25, 32, 32 );

    sol = new THREE.Mesh(geometry, material);

    sol.rotation.x = 0.3;

    grupos.push({
        figure:sol,
        group: grupoSol,
        planet:'sol',
        satelites:[]
    });
    
    grupoSol.add( sol );
    grupoSol.position.set(0, 0, 0);

    scene.add(grupoSol)

    // ------------------------------ Orbitas ------------------------------

    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff } );


    let geoMercurio = new THREE.TorusGeometry( 40, 0.1, 2, 100, 6.3 );
    var mercurio = new THREE.Mesh( geoMercurio, materialOrbit );
    mercurio.position.set(0, 0, 0);
    mercurio.rotateX(300);
    // mercurio.rotateY(270);
    scene.add(mercurio);

    let geoVenus = new THREE.TorusGeometry( 55, 0.1, 2, 100, 6.3 );
    var venus = new THREE.Mesh( geoVenus, materialOrbit );
    venus.position.set(0, 0, 0);
    venus.rotateX(300);
    scene.add(venus);


    let geotierra = new THREE.TorusGeometry( 70, 0.1, 2, 100, 6.3 );
    var tierra = new THREE.Mesh( geotierra, materialOrbit );
    tierra.position.set(0, 0, 0);
    tierra.rotateX(300);
    scene.add(tierra);


    let geoMarte = new THREE.TorusGeometry( 90, 0.1, 2, 100, 6.3 );
    var marte = new THREE.Mesh( geoMarte, materialOrbit );
    marte.position.set(0, 0, 0);
    marte.rotateX(300);
    scene.add(marte);


    let geoJupiter = new THREE.TorusGeometry( 180, 0.1, 2, 100, 6.3 );
    var jupiter = new THREE.Mesh( geoJupiter, materialOrbit );
    jupiter.position.set(0, 0, 0);
    jupiter.rotateX(300);
    scene.add(jupiter);

    let geoSaturno = new THREE.TorusGeometry( 230, 0.1, 2, 100, 6.3 );
    var saturno = new THREE.Mesh( geoSaturno, materialOrbit );
    saturno.position.set(0, 0, 0);
    saturno.rotateX(300);
    scene.add(saturno);


    let geoUrano = new THREE.TorusGeometry( 265, 0.1, 2, 100, 6.3 );
    var urano = new THREE.Mesh( geoUrano, materialOrbit );
    urano.position.set(0, 0, 0);
    urano.rotateX(300);
    scene.add(urano);


    let geoNeptuno = new THREE.TorusGeometry( 295, 0.1, 2, 100, 6.3 );
    var neptuno = new THREE.Mesh( geoNeptuno, materialOrbit );
    neptuno.position.set(0, 0, 0);
    neptuno.rotateX(300);
    scene.add(neptuno);


    let geoPluton = new THREE.TorusGeometry( 325, 0.1, 2, 100, 6.3 );
    var pluton = new THREE.Mesh( geoPluton, materialOrbit );
    pluton.position.set(0, 0, 0);
    pluton.rotateX(300);
    scene.add(pluton);


    // ------------------------------ Asteroides ------------------------------

    
    const textureUrlAsteroide = 'textures/asteroide.jpg';
    
    let asteroidesGeo = new THREE.Geometry();

    for (let i = 0; i < 500; i++) {
        let posXZ = getRdmInt(120, 150);
        let rad = getRdmInt(0, 360);
        let posY = getRdmInt(-5, 5);
 
        let asteroide = new THREE.Vector3(
            Math.sin(rad * Math.PI / 180) * posXZ,
            posY,
            Math.cos(rad * Math.PI / 180) * posXZ
        );
        asteroidesGeo.vertices.push(asteroide);
    }
    
    let spriteAsteroide = new THREE.TextureLoader().load(textureUrlAsteroide);

    let asteroidesMaterial = new THREE.PointsMaterial({
        size: 2,
        map: spriteAsteroide
    });

    
    asteroides = new THREE.Points(asteroidesGeo, asteroidesMaterial);
    scene.add(asteroides);

}


