float circle(vec2 p, float r) {
    return length(p) - pow(r, 2.);
}

void main(){
    vec2 uv = uv();
    float w = 0.;
    
    for (int i=0; i<32; i++)
        if (mod(float(i), 2.) !=0. ) {
            w += sin(2. * acos(-1.) * circle(uv, .5) * float(i)) ;
        }
        
    // w = sin(circle(uv, 1.) * 8.);
    vec3 color = w > 0. ? vec3(w, 0., 0.): vec3(0., 0., abs(w));
    gl_FragColor = vec4(color, 1.) / 4.;
}
