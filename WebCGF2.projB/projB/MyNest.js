class MyNest extends CGFobject {
    constructor(scene, x, z, size, slices) {
        super(scene);

        this.initTextures();

        this.x = x;
        this.z = z;
        this.size = size;
        this.slices = slices;
        this.rotAngle = 2 * Math.PI / this.slices;

        this.nest = new MyCylinder(this.scene, 8);
        this.base = new MyCircle(this.scene, this.slices);
        this.eeg = new MySphere(this.scene, 15, 15, 0.75);

        this.branches = [];
    }

    initTextures() {
        this.eegTexture = new CGFtexture(this.scene, 'images/egg.jpg');
        this.nestTexture = new CGFtexture(this.scene, 'images/nestTexture.jpg');
    }

    collidedWithBird(bird) {
        var xLowerLimit = this.x - this.size + 0.3;
        var xUpperLimit = this.x + this.size - 0.3;
        var zLowerLimit = this.z - this.size + 0.3;
        var zUpperLimit = this.z + this.size - 0.3;

        if((xLowerLimit < bird.xPosition) && (xUpperLimit > bird.xPosition) &&
           (zLowerLimit < bird.zPosition) && (zUpperLimit > bird.zPosition))
           return true;

        return false;
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);

        // Eggs

        this.scene.diffuseMaterial.setTexture(this.eegTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(-1.9, 0.25, -0.7)
        this.scene.rotate(-Math.PI / 4, 0, 1, 1);
        this.scene.scale(0.9, 0.65, 0.65);
        this.eeg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5, 0.25, -1.6);
        this.scene.rotate(-Math.PI / 4, 0, 1.5, 1);
        this.scene.scale(0.9, 0.65, 0.65);
        this.eeg.display();
        this.scene.popMatrix();

        // Nest

        this.scene.diffuseMaterial.setTexture(this.nestTexture);
        this.scene.diffuseMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(this.size, this.size, this.size);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.base.display();
        this.scene.popMatrix();

        for (var i = 1; i <= this.slices; i++) {
            var ang = i * this.rotAngle;
            this.scene.pushMatrix();
            this.scene.translate(Math.sin(ang), 0, Math.cos(ang));
            this.scene.rotate(ang, 0, 1, 0);
            this.scene.rotate(Math.PI / 2, 0, 0, 1);
            this.scene.scale(0.25, 9 / this.slices, 0.25);
            this.scene.translate(0, -0.5, 0);
            this.nest.display();
            this.scene.popMatrix();
        }
        
        this.scene.popMatrix();

        // Branches that it might have

        for(var i = 0; i < this.branches.length; i++) {
            this.branches[i].display();
        }

        this.scene.popMatrix();
    }
}