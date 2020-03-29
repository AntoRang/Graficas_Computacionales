$(document).ready(function () {
    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/saturnmap.jpg';
    const textureRingUrl = 'textures/planets/rings/saturnringcolor.jpg';
    const textureUrlMoon1 = 'textures/planets/moons/titanMoon.png';
    const textureUrlMoon2 = 'textures/planets/moons/lapetus.jpg';
    const textureUrlMoon3 = 'textures/planets/moons/mimasMoon.jpg';


    // ------------------------------ Texture and Material ------------------------------

    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Titan
    const titanTexture = new THREE.TextureLoader().load(textureUrlMoon1);
    const titanMaterial = new THREE.MeshPhongMaterial({ map: titanTexture });

    // Lapetus 
    const lapetusTexture = new THREE.TextureLoader().load(textureUrlMoon2);
    const lapetusMaterial = new THREE.MeshPhongMaterial({ map: lapetusTexture });

    // Mimas
    const mimasTexture = new THREE.TextureLoader().load(textureUrlMoon3);
    const mimasMaterial = new THREE.MeshPhongMaterial({ map: mimasTexture });
    

    // ------------------------------ Anillo de saturno ------------------------------

    const textureRing  = new THREE.TextureLoader().load(textureRingUrl);
    const matieralRing = new THREE.MeshPhongMaterial({ map : textureRing});

    // ------------------------------ Saturno ------------------------------


    let grupoSol = grupos[0];

    var grupoSaturno = new THREE.Object3D;
    grupoSol.group.add(grupoSaturno);
    grupoSaturno.position.set( Math.sin(240 * Math.PI /180) * 230, 0, Math.cos(240 * Math.PI /180) * 230 );

    let geometry = new THREE.SphereGeometry( 12.01, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoSaturno.add(sphere);

    grupos.push({
        'group':grupoSaturno,
        'figure':sphere,
        'planet':'saturno',
        'satelites':[]
    });


    // ------------------------------ Anillo ------------------------------
    
    let anilloSaturno = new THREE.RingGeometry( 13.01, 17, 30, 20, 0, 6.3 );

    let anillo = new THREE.Mesh(anilloSaturno, matieralRing);
    anillo.position.set(0, 0, 0);
    anillo.rotateX(270);
    anillo.rotateY(270);
    grupos[6].satelites.push(anillo);
    grupoSaturno.add(anillo);


    // ------------------------------ Satelite ------------------------------

    for (var i = 0; i < 62; i++){
        let sateliteGeo = new THREE.SphereGeometry(0.5, 32, 32);
        let satelite = new THREE.Mesh(sateliteGeo, titanMaterial);
        let angle = getRdmInt(0, 360);
        if(i % 2 === 0){
            satelite.position.set(Math.sin(angle * Math.PI /180) * 15, 1, Math.cos(angle * Math.PI /180) * 15);
        }else{
            satelite.position.set(Math.sin(angle * Math.PI /180) * 15, Math.cos(angle * Math.PI /180) * 15, 1);
        }
       
        grupos[6].satelites.push(satelite);
        grupoSaturno.add(satelite);
    }
    
    // let sateliteGeometry1 = new THREE.SphereGeometry( 1, 32, 32 );

    // let sateliteGeometry2 = new THREE.SphereGeometry( 1, 32, 32 );

    // let sateliteGeometry3 = new THREE.SphereGeometry( 1, 32, 32 );


    // let satelite1 = new THREE.Mesh(sateliteGeometry1, titanMaterial);
    // satelite1.position.set(8, 0, 0);
    // grupos[6].satelites.push(satelite1);          // Saturno
    // grupoSaturno.add(satelite1);

    // let satelite2 = new THREE.Mesh(sateliteGeometry2, lapetusMaterial);
    // satelite2.position.set(-8, 0, -8);
    // grupos[6].satelites.push(satelite2);          // Saturno
    // grupoSaturno.add(satelite2);

    // let satelite3 = new THREE.Mesh(sateliteGeometry3, mimasMaterial);
    // satelite3.position.set(8, 0, 8);
    // grupos[6].satelites.push(satelite3);          // Saturno
    // grupoSaturno.add(satelite3);

});
