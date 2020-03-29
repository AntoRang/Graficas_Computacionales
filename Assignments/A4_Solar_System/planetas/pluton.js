$(document).ready(function () {

    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/plutomap1k.jpg';
    const textureMoonsUrl = 'textures/moon_1024.jpg'

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    const textureMoons = new THREE.TextureLoader().load(textureMoonsUrl);
    const materialMoons = new THREE.MeshPhongMaterial( {map : textureMoons} )

    // ------------------------------ Pluton ------------------------------
    let grupoSol = grupos[0];

    var grupoPluton = new THREE.Object3D;
    grupoSol.group.add(grupoPluton);
    grupoPluton.position.set( Math.sin(140 * Math.PI /180) * 325, 0, Math.cos(140 * Math.PI /180) * 325);

    let geometry = new THREE.SphereGeometry( 0.9, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoPluton.add(sphere);

    grupos.push({
        'group':grupoPluton,
        'figure':sphere,
        'planet':'pluton',
        'satelites':[]
    });

    // ------------------------------ Satelite ------------------------------

    for (var i = 0; i < 3; i++){
        let sateliteGeo = new THREE.SphereGeometry(0.35, 32, 32);
        let satelite = new THREE.Mesh(sateliteGeo, materialMoons);
        let angle = getRdmInt(0, 360);
        if(i % 2 === 0){
            satelite.position.set(Math.sin(angle * Math.PI /180) * 1.3, 0, Math.cos(angle * Math.PI /180) * 1.3);
        }else{
            satelite.position.set(Math.sin(angle * Math.PI /180) * 1.3, Math.cos(angle * Math.PI /180) * 1.3, 0);
        }
       
        grupos[9].satelites.push(satelite);
        grupoPluton.add(satelite);
    }

});