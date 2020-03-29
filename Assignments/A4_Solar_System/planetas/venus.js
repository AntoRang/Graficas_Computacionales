$(document).ready(function () {

    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/venusmap.jpg';

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    // ------------------------------ Venus ------------------------------
    let grupoSol = grupos[0];
    var grupoVenus = new THREE.Object3D;
    grupoSol.group.add(grupoVenus);
    grupoVenus.position.set(Math.sin(300 * Math.PI /180) * 55, 0, Math.cos(300 * Math.PI /180) * 55);

    let geometry = new THREE.SphereGeometry( 1.71, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoVenus.add(sphere);

    grupos.push({
        'group':grupoVenus,
        'figure':sphere,
        'satelites':[]
    });

});