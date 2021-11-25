float circle(vec2 p, float r) {
    return length(p) - pow(r, 2.);
}

mat2 rot(float q) {
    return mat2(cos(q), -sin(q), sin(q), cos(q));
}

void main(){
    vec2 uv = uv();
    float w ; vec3 color;
    
    w = sin(circle(uv, 1.));
    color =  vec3(1.) - vec3(atan(uv).x, atan((rot(2. * acos(-1.) / 3.) * uv).x), atan( (rot(2. *  acos(-1.) * 2. / 3. ) * uv).x));
    color *= -w;
    gl_FragColor = vec4(color, 1.) ;
}
