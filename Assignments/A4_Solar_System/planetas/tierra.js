$(document).ready(function () {
    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/earthmap1k.jpg';
    const moonTextureUrl = 'textures/moon_1024.jpg';

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });
        
    const moonTexture = new THREE.TextureLoader().load(moonTextureUrl);
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });


    // ------------------------------ Tierra ------------------------------

    let grupoSol = grupos[0];    

    var grupoTierra = new THREE.Object3D;
    grupoSol.group.add(grupoTierra);
    grupoTierra.position.set(0, 0, -70);

    let geometry = new THREE.SphereGeometry( 1.8, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoTierra.add(sphere);

    grupos.push({
        'group':grupoTierra,
        'figure':sphere,
        'planet':'tierra',
        'satelites':[]
    });

    // ------------------------------ Satelite ------------------------------


    let sateliteGeometry = new THREE.SphereGeometry( 0.4, 32, 32 );
    let satelite = new THREE.Mesh(sateliteGeometry, moonMaterial);
    satelite.position.set(3, 0, 0);
    grupos[3].satelites.push(satelite);          // Tierra
    grupoTierra.add(satelite);

});