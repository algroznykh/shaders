float circle(vec2 p, float r) {
    return length(p) - pow(r, 2.);
}

mat2 rot(float q) {
    return mat2(cos(q), -sin(q), sin(q), cos(q));
}

void main() {
    
    vec4 tex;
    
    vec4 sound = texture2D(channel1, uvN());

    
    vec2 uvm = uv() * rot(sound.x) ;
    uvm *= .5;
    uvm += .5;
    tex = texture2D(channel0, uvm);
    
    tex *= 56.9;
    
    vec3 color;
    
    
    color *- circle(uv(), 1.);
    
    
    gl_FragColor = tex + vec4(color, 1.);
    
    
    // gl_FragColor = sound * .5;
    
    
}
