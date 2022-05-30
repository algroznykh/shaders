float circle(vec2 p, float r) {
    return length(p) - pow(r, 2.);
}
void main() {
    
    vec3 sun = vec3(0.) ;
    float hs = 2.;
    sun.z = sin(-time / hs ) - .54;
    sun.x = cos(time / hs) * 1.;
    sun.y = sin(time / hs) * 1.;
    vec4 land = texture2D(channel1, uvN() ) ;
    
    float c = circle(uv() + sun.xy, .2) < 0. ? 1. : 0.;
    
    float a = atan((uv() + sun.xy).x, (uv() + sun.xy).y)  ;
    // a = atan(uv().x, uv().y);
    // float q = 
    
    float h = land.z;
    // h = uv().y;
    float q = acos(sun.z);
    
    float dh = cos(q);
    float g = texture2D(channel1, uvN() + vec2(sin(a), cos(a))).z ;
    
    float s = h + dh > g? h : 0.;
    
    
    
    // gl_FragColor = land + c ;
    gl_FragColor.xyz =  vec3(s);
    gl_FragColor += c;
    // gl_FragColor.z = .1;    
}
