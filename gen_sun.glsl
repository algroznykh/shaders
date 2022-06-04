void main () {    vec2 uvp = vec2(fract(length(uv()) * 4500000.), fract(atan(uv().x, uv().y) / acos(-1.) * 100.)  );	gl_FragColor = vec4(uvp.x * uvp.y);}
