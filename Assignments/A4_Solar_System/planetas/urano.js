$(document).ready(function () {

    // ------------------------------ TexturesUrl ------------------------------
    const textureUrl = 'textures/planets/uranusmap.jpg';
    const textureRingUrl = 'textures/planets/rings/uranusringtrans.gif';
    const textureMoonsUrl = 'textures/planets/moons/mimasMoon.jpg'

    // ------------------------------ Texture and Material ------------------------------
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    const textureMoons = new THREE.TextureLoader().load(textureMoonsUrl);
    const materialMoons = new THREE.MeshPhongMaterial( {map : textureMoons} )

    // ------------------------------ Anillo de saturno ------------------------------
    const textureRing  = new THREE.TextureLoader().load(textureRingUrl);
    const matieralRing = new THREE.MeshPhongMaterial({ map : textureRing});

    // ------------------------------ Urano ------------------------------

    let grupoSol = grupos[0];

    var grupoUrano = new THREE.Object3D;
    grupoSol.group.add(grupoUrano);
    grupoUrano.position.set(-265, 0, 0);

    let geometry = new THREE.SphereGeometry( 7.2, 32, 32 );

    sphere = new THREE.Mesh(geometry, material);
    grupoUrano.add(sphere);

    grupos.push({
        'group':grupoUrano ,
        'figure':sphere,
        'planet':'urano',
        'satelites':[]
    });

    // ------------------------------ Anillo ------------------------------

    let anilloUrano = new THREE.RingGeometry( 8.2, 12, 30, 20, 0, 6.3 );
    let anillo = new THREE.Mesh(anilloUrano, matieralRing);
    anillo.position.set(0, 0, 0);
    anillo.rotateX(270);
    anillo.rotateY(270);
    grupos[7].satelites.push(anillo);
    grupoUrano.add(anillo);

    // ------------------------------ Satelite ------------------------------

    for (var i = 0; i < 27; i++){
        let sateliteGeo = new THREE.SphereGeometry(0.5, 32, 32);
        let satelite = new THREE.Mesh(sateliteGeo, materialMoons);
        let angle = getRdmInt(0, 360);
        if(i % 2 === 0){
            satelite.position.set(Math.sin(angle * Math.PI /180) * 9, 0, Math.cos(angle * Math.PI /180) * 9);
        }else{
            satelite.position.set(Math.sin(angle * Math.PI /180) * 9, Math.cos(angle * Math.PI /180) * 9, 0);
        }
       
        grupos[7].satelites.push(satelite);
        grupoUrano.add(satelite);
    }

});