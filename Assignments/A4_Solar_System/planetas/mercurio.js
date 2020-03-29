$(document).ready(function () {

    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/mercurymap.jpg';

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // ------------------------------ Mercurio ------------------------------
    let grupoSol = grupos[0];
    var grupoMercurio = new THREE.Object3D;
    grupoSol.group.add(grupoMercurio);
    grupoMercurio.position.set( Math.sin(220 * Math.PI /180) * 40, 0, Math.cos(220 * Math.PI /180) * 40);

    let geometry = new THREE.SphereGeometry( 0.884, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoMercurio.add(sphere);

    grupos.push({
        'group':grupoMercurio,
        'figure':sphere,
        'planet':'mercurio',
        'satelites':[]
    });


});