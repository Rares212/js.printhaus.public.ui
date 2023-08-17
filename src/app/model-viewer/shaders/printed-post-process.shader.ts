export const postProcessShader = {
    uniforms: {
        tDiffuse: { type: "t", value: null }, // Original rendered scene
        tDepth: { type: "t", value: null },   // Depth texture
        layerHeight: { type: "f", value: 0.05 } // Thickness of each "layer"
    },
    vertexShader: /* GLSL */`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: /* GLSL */`
        uniform sampler2D tDiffuse;
        uniform sampler2D tDepth;
        uniform float layerHeight;
        varying vec2 vUv;

        void main() {
            float depth = texture2D(tDepth, vUv).r; // Get depth of the fragment
            float layerEffect = mod(depth / layerHeight, 1.0); // Get where the fragment is in its "layer"

            // Modify fragment color based on layerEffect...
            vec4 originalColor = texture2D(tDiffuse, vUv);
            gl_FragColor = vec4(originalColor.rgb * layerEffect, originalColor.a);
        }
    `
};
