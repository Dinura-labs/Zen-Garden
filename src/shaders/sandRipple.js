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
    float ripple1 = sin(dist * 15.0 - uTime * 3.0) * exp(-dist * 3.0);
    float ripple2 = sin(dist * 20.0 - uTime * 4.0) * exp(-dist * 4.0);
    float ripple3 = sin(dist * 25.0 - uTime * 5.0) * exp(-dist * 5.0);
    
    // Combine ripples
    float elevation = (ripple1 + ripple2 * 0.5 + ripple3 * 0.3) * 0.15;
    
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
    // Base sand color
    vec3 sandColor = uIsGoldenHour 
      ? vec3(0.85, 0.75, 0.6)   // Warm golden sand
      : vec3(0.4, 0.45, 0.5);    // Cool neon-noir sand
    
    // Glow color for ripples
    vec3 glowColor = uIsGoldenHour
      ? vec3(1.0, 0.6, 0.2)      // Warm orange glow
      : vec3(0.0, 1.0, 1.0);      // Cyan glow
    
    // Calculate distance from mouse
    float dist = distance(vUv, uMouse);
    
    // Animated glow ring
    float ring = smoothstep(0.05, 0.0, abs(dist - mod(uTime * 0.3, 1.0))) * (1.0 - dist);
    
    // Elevation-based glow
    float elevationGlow = abs(vElevation) * 8.0;
    
    // Combine colors
    vec3 finalColor = sandColor + glowColor * (elevationGlow + ring * 0.8);
    
    // Add subtle sparkle
    float sparkle = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
    sparkle = step(0.98, sparkle) * 0.3;
    finalColor += vec3(sparkle);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
