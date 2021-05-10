vec4 read(vec2 p) {
    return texture2D(backbuffer, p);
}


const mat3 gauss = mat3(1.0, 2.0, 1.0, 
                        2.0,-12.0, 2.0, 
                        1.0, 2.0, 1.0) / 8.0;   


const mat3 idm = mat3(1., 0., 0.,
                      0., 1., 0., 
                      0., 0., 1.);


mat2 rot(float a) {
    return mat2(cos(a), -sin(a), 
                sin(a),  cos(a));
}


vec3 conv (ivec2 xy, mat3 filter, mat3 m) {
    
    vec3 l = vec3(0.0);
    
    filter *= m;

    for (int y=0; y<3; ++y)
        for (int x=0; x<3; ++x) {
            ivec2 p = xy + ivec2(x-1, y-1);
            vec4 v = read(vec2(p) / (resolution.xy - vec2(.5) ));
            l += filter[x][y] * v.xyz;
        }
    
    return l;  
}  


float circle(vec2 p, float r) {
    return length(p) - pow(r, 2.);
}


void main () {
    
  float paint = 1.;

    
  vec2 data = ((mouse.xy / resolution.xy) - vec2(1.)) * vec2(2., 1.);

  vec3 color = vec3(0.);
  
  vec4 val = read(uvN());
  float a = val.x;
  float b = val.z;
  
  float ship = val.w;
  
   // spaceship
  vec2 uvm = uv() * rot(time / 2.) + vec2(.2 + sin(time / 1.62) / 3., + sin(time / 1.62 * .3));
  //   vec2 uvf = (uv() * rot(time ) + vec2(1. + sin(time / 1.62) / 3., 0.1 + sin(time / 1.62) / 3.));

  
  float sr = sin(time / 7.) * .1 + .3;
  ship += - circle(uvm, sr) ;
  color.z += circle(uvm, sr) < 0. ?  ship *- circle(uvm, sr) : 0.;
  color.x += circle(uvm, sr) < 0. ? (sin(circle(uvm , sr) * (400. + sin(time) * 30.)) < 0. ? color.z * 4.: 0.) : 0.;
  


  float rate_a = 1. ;
  float rate_b = .5 ;
  
  float feed = .055 + uv().x / 100.; 
  float kill = .055 + uv().y / 100.;
  float speed = 1.;
  
  
  mat3 m = mat3(val.x, 0.,             0.,
                0.,    -val.x + val.z, 0.,
                0.,    0.,             val.x);


  ivec2 coord = ivec2(gl_FragCoord.xy);
  float da =   rate_a * conv(coord, gauss, m ).x  - a*b*b + conv(coord, gauss, idm).x * feed * (1.-a) ;
  float db =  rate_b * conv(coord, gauss, m).z + a*b*b - kill * b;

  color += val.xyz + vec3(da, 0, db) * speed;
  
  color *= clamp(-circle(uvm, sr* 4.), 0., 1.);
  
  gl_FragColor = vec4(color, ship) ;
  
}
