// Sand Ripple Shader - Vertex Shader
export const sandVertexShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Calculate distance from mouse position
    float dist = distance(uv, uMouse);
    
    // Create multiple ripples
    float ripple1 = sin(dist * 12.0 - uTime * 2.0) * exp(-dist * 4.0);
    float ripple2 = sin(dist * 18.0 - uTime * 3.0) * exp(-dist * 5.0);
    
    // Combine ripples
    float elevation = (ripple1 + ripple2 * 0.5) * 0.12;
    
    vElevation = elevation;
    pos.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Sand Ripple Shader - Fragment Shader
export const sandFragmentShader = `
  uniform vec2 uMouse;
  uniform float uTime;
  uniform bool uIsGoldenHour;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Base sand color - warm golden/earthy
    vec3 sandColor = vec3(0.5, 0.35, 0.2) + vec3(0.1, 0.08, 0.0) * sin(vUv.x * 20.0);
    
    // Glow color for ripples - pure gold
    vec3 glowColor = vec3(1.0, 0.8, 0.2);
    
    // Calculate distance from mouse
    float dist = distance(vUv, uMouse);
    
    // Elevation-based glow
    float elevationGlow = abs(vElevation) * 12.0;
    
    // Subtle mandala-like pulsing ring
    float ring = smoothstep(0.08, 0.0, abs(dist - mod(uTime * 0.2, 2.0))) * (1.0 - dist);
    
    // Combine colors
    vec3 finalColor = sandColor + glowColor * (elevationGlow * 0.6 + ring * 0.4);
    
    // Add fine sand grain texture
    float grains = fract(sin(dot(vUv * 500.0, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += vec3(grains * 0.05);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
