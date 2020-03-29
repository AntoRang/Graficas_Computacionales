$(document).ready(function () {

    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/neptunemap.jpg';
    const textureMoonsUrl = 'textures/planets/moons/ioMoon.jpg'

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    const textureMoons = new THREE.TextureLoader().load(textureMoonsUrl);
    const materialMoons = new THREE.MeshPhongMaterial( {map : textureMoons} )

    // ------------------------------ Neptuno ------------------------------

    let grupoSol = grupos[0];

    var grupoNeptuno = new THREE.Object3D;
    grupoSol.group.add(grupoNeptuno);
    grupoNeptuno.position.set(0, 0, 295);

    let geometry = new THREE.SphereGeometry( 6.984, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoNeptuno.add(sphere);

    grupos.push({
        'group':grupoNeptuno,
        'figure':sphere,
        'planet':'neptuno',
        'satelites':[]
    });

     // ------------------------------ Satelite ------------------------------

     for (var i = 0; i < 13; i++){
        let sateliteGeo = new THREE.SphereGeometry(0.5, 32, 32);
        let satelite = new THREE.Mesh(sateliteGeo, materialMoons);
        let angle = getRdmInt(0, 360);
        if(i % 2 === 0){
            satelite.position.set(Math.sin(angle * Math.PI /180) * 7.2, 0, Math.cos(angle * Math.PI /180) * 7.2);
        }else{
            satelite.position.set(Math.sin(angle * Math.PI /180) * 7.2, Math.cos(angle * Math.PI /180) * 7.2, 0);
        }
       
        grupos[8].satelites.push(satelite);
        grupoNeptuno.add(satelite);
    }

});
