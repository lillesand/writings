(function() {

    /*
     Three.js "tutorials by example"
     Author: Lee Stemkoski
     Date: July 2013 (three.js v59dev)
     */

// MAIN

    // standard global variables
    var container, scene, camera, renderer;

    // custom global variables
    var video, videoImage, videoImageContext, videoTexture;

    init();
    animate();

    // FUNCTIONS
    function init()
    {
        // SCENE
        scene = new THREE.Scene();

        // CAMERA
        var SCREEN_WIDTH = 500, SCREEN_HEIGHT = 300;
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
        camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(camera);
        camera.position.set(0,150,400);
        camera.lookAt(scene.position);

        renderer = new THREE.WebGLRenderer( {antialias:true} );
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

        container = document.getElementById('3d-demo');
        container.appendChild( renderer.domElement );

        // LIGHT
        var light = new THREE.PointLight(0xffffff);
        light.position.set(0,250,0);
        scene.add(light);

        // FLOOR
        var floorTexture = new THREE.ImageUtils.loadTexture('/img/checkerboard.jpg');
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set( 10, 10 );
        var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
        var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.rotation.x = Math.PI / 2;
        scene.add(floor);

        // SKYBOX/FOG
        scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

        // VIDEO
        video = document.getElementById( 'monitor' );

        videoImage = document.getElementById( 'videoImage' );
        videoImageContext = videoImage.getContext( '2d' );
        // background color if no video present
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

        videoTexture = new THREE.Texture( videoImage );
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;

        var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
        // the geometry on which the movie will be displayed;
        // 		movie image will be scaled to fit these dimensions.
        var movieGeometry = new THREE.PlaneGeometry( 100, 100, 1, 1 );
        var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
        movieScreen.position.set(0,50,0);
        scene.add(movieScreen);

        camera.position.set(0,150,300);
        camera.lookAt(movieScreen.position);
    }

    function animate()
    {
        requestAnimationFrame( animate );
        render();
    }

    function render()
    {
        if ( video.readyState === video.HAVE_ENOUGH_DATA )
        {
            videoImageContext.drawImage( video, 0, 0, videoImage.width, videoImage.height );
            if ( videoTexture )
                videoTexture.needsUpdate = true;
        }

        renderer.render( scene, camera );
    }


})();