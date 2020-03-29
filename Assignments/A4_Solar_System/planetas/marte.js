$(document).ready(function () {
    const textureUrl = 'textures/planets/mars_1k_color.jpg';
    const moonTextureUrl = 'textures/moon_1024.jpg';

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    const moonTexture = new THREE.TextureLoader().load(moonTextureUrl);
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });


    // ------------------------------ Tierra ------------------------------

    let grupoSol = grupos[0];

    var grupoMarte = new THREE.Object3D;
    grupoSol.group.add(grupoMarte);
    grupoMarte.position.set( Math.sin(45 * Math.PI /180) * 90, 0, Math.cos(45 * Math.PI /180) * 90);

    let geometry = new THREE.SphereGeometry( 1.354, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoMarte.add(sphere);

    grupos.push({
        'group':grupoMarte,
        'figure':sphere,
        'planet':'marte',
        'satelites':[]
    });

    // ------------------------------ Satelite ------------------------------

    let sateliteGeometry = new THREE.SphereGeometry( 0.4, 32, 32 );

    let satelite1 = new THREE.Mesh(sateliteGeometry, moonMaterial);
    satelite1.position.set(2.5, 0, 0);
    grupos[4].satelites.push(satelite1);          // Marte
    grupoMarte.add(satelite1);

    let satelite2 = new THREE.Mesh(sateliteGeometry, moonMaterial);
    satelite2.position.set(-2.5, 0, 0);
    grupos[4].satelites.push(satelite2);          // Marte
    grupoMarte.add(satelite2);

});
