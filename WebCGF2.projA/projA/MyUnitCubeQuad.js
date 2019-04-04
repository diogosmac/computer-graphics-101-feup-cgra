/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        this.initTextures();
    }
    
    initTextures() {
        this.sideTexture = new CGFtexture(this.scene, 'images/mineSide.png');
        this.topTexture = new CGFtexture(this.scene, 'images/mineTop.png');
        this.bottomTexture = new CGFtexture(this.scene, 'images/mineBottom.png');
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }
    
    disableNormalViz() {
        this.quad.disableNormalViz();
    }

    display() {

        this.scene.matteMaterial.setTexture(this.sideTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.matteMaterial.apply();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.5);
        this.quad.display(); //face de lado

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display(); //face de lado

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display(); //face de lado

        this.scene.popMatrix();
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI , 0, 1, 0);
        this.quad.display(); //face de lado

        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        this.scene.matteMaterial.setTexture(this.topTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.matteMaterial.apply();

        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display(); //face de cima

        this.scene.popMatrix();

        this.scene.matteMaterial.setTexture(this.bottomTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        this.scene.matteMaterial.apply();

        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display(); //face de baixo
    }
}