float circle(vec2 p, float r) {
    return length(p) - pow(r, 2.);
}
void main() {
    
    vec3 sun  ;
    float hs = 2.;
    float ds = 10.;
    sun.z = sin(-time / hs ) / 2.;
    sun.x = cos(time / hs) * ds ;
    sun.y = sin(time / hs) * ds ;
    vec4 land = texture2D(channel1, uvN() )  ;
    // land = vec4(-circle(uv(), 1.));
    
    
    float c = circle(uv() + sun.xy, .2) < 0. ? sun.z : 0.;
    
    float a = atan((uv() + sun.xy).x, (uv() + sun.xy).y)  ;
    
    vec2 st = vec2(sin(a), cos(a)) / resolution ;
    // a = atan(uv().x, uv().y);
    // float q = 
    
    float horizon = circle(uv(), 100.);
    float h = land.z  - horizon;
    // h = uv().y;
    float q = sun.z;
    
    float dh;
    float g;
    float s; 
    vec2 uvs = uvN(); 
    for (int i=0; i<100; i++) {
        
        g = texture2D(channel1, uvs + st).z - circle((uvN() + st - .5) * 2., 100.)  ;
        uvs += st;
        // a = atan((uvs + sun.xy).x, (uvs + sun.xy).y)  ;
        
        dh = sin(q);
        if (h + dh < g) {
            break;
        }
    };
    
    s = h + dh > g? land.z : land.x / 3.;
    
    gl_FragColor.xyz = vec3(s);
    // gl_FragColor.x += land.x / 3.;
    gl_FragColor.x += c;
        
}
