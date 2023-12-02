
mat2 rot(float q) {
    return mat2(cos(q), -sin(q), sin(q), cos(q));
}

void main() {
    
    float r = .5;
    float n = 10.;
    float q1 = 0.;
    float q2 = time / 10.;
    
    vec2 fuv = (fract(((rot(q1) * uv() ) * 2.)  * n) - .5) * 2.; 
    float c = length(fuv) - pow(r, 2.); 
    c = c < 0. ? 1. : 0.;
    
    vec2 fuvr = (fract(((rot(q2) * uv() ) * 2.)  * n) - .5) * 2.; 
    float cc = length(fuvr) - pow(r, 2.); 
    cc = cc < 0. ? 1. : 0.;
    
    float a = 0.;
    if (c == 1. && cc == 1.) {
        a = 1.;
    }
     
    gl_FragColor = vec4(a);

    
}

