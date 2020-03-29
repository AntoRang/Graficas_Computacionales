$(document).ready(function () {
    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/jupitermap.jpg';
    const textureUrlMoon1 = 'textures/planets/moons/ioMoon.jpg';
    const textureUrlMoon2 = 'textures/planets/moons/ganymedeMoon.jpg';
    const textureUrlMoon3 = 'textures/planets/moons/europeMoon.jpg';
    const textureUrlMoon4 = 'textures/planets/moons/callistoMoon.jpg';


    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // Io 
    const ioTexture = new THREE.TextureLoader().load(textureUrlMoon1);
    const ioMaterial = new THREE.MeshPhongMaterial({ map: ioTexture });

    // Ganymede 
    const ganymedeTexture = new THREE.TextureLoader().load(textureUrlMoon2);
    const ganymedeMaterial = new THREE.MeshPhongMaterial({ map: ganymedeTexture });

    // Europe
    const europeTexture = new THREE.TextureLoader().load(textureUrlMoon3);
    const europeMaterial = new THREE.MeshPhongMaterial({ map: europeTexture });

    // Calliston
    const callistonTexture = new THREE.TextureLoader().load(textureUrlMoon4);
    const callistonMaterial = new THREE.MeshPhongMaterial({ map: callistonTexture });

    // ------------------------------ Jupiter ------------------------------

    let grupoSol = grupos[0];

    var grupoJupiter = new THREE.Object3D;
    grupoSol.group.add(grupoJupiter);
    grupoJupiter.position.set(180, 0, 0);

    let geometry = new THREE.SphereGeometry( 15.16, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoJupiter.add(sphere);

    grupos.push({
        'group':grupoJupiter,
        'figure':sphere,
        'planet':'jupiter',
        'satelites':[]
    });


    // ------------------------------ Satelite ------------------------------

    
    for (var i = 0; i < 63; i++){
        let sateliteGeo = new THREE.SphereGeometry(0.5, 32, 32);
        let satelite = new THREE.Mesh(sateliteGeo, europeMaterial);
        let angle = getRdmInt(0, 360);
        if(i % 2 === 0){
            satelite.position.set(Math.sin(angle * Math.PI /180) * 18, 0, Math.cos(angle * Math.PI /180) * 18);
        }else{
            satelite.position.set(Math.sin(angle * Math.PI /180) * 18, Math.cos(angle * Math.PI /180) * 18, 0);
        }
       
        grupos[5].satelites.push(satelite);
        grupoJupiter.add(satelite);
    }


    // let sateliteGeometry1 = new THREE.SphereGeometry( 1, 32, 32 );

    
    // let sateliteGeometry2 = new THREE.SphereGeometry( 1, 32, 32 );

    
    // let sateliteGeometry3 = new THREE.SphereGeometry( 1, 32, 32 );

    
    // let sateliteGeometry4 = new THREE.SphereGeometry( 1, 32, 32 );


    // let satelite1 = new THREE.Mesh(sateliteGeometry1, ioMaterial);
    // satelite1.position.set(8, 0, 0);
    // grupos[5].satelites.push(satelite1);          // Jupiter
    // grupoJupiter.add(satelite1);

    // let satelite2 = new THREE.Mesh(sateliteGeometry2, ganymedeMaterial);
    // satelite2.position.set(-8, 0, -8);
    // grupos[5].satelites.push(satelite2);          // Jupiter
    // grupoJupiter.add(satelite2);

    // let satelite3 = new THREE.Mesh(sateliteGeometry3, europeMaterial);
    // satelite3.position.set(8, 0, 8);
    // grupos[5].satelites.push(satelite3);          // Jupiter
    // grupoJupiter.add(satelite3);

    // let satelite4 = new THREE.Mesh(sateliteGeometry4, callistonMaterial);
    // satelite4.position.set(-8, 0, 0);
    // grupos[5].satelites.push(satelite4);          // Jupiter
    // grupoJupiter.add(satelite4);

});