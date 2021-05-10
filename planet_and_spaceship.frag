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
//   data = vec2(0.);
  vec3 color = vec3(0.);
  
  vec4 val = read(uvN());
  float a = val.x;
  float b = val.z;
  
  float ship = val.w;
  

  vec2 uvr = uv() * rot(time/ .3) / 2. ;
  
  

  float rate_a = .9 - pow((uvr.y), 2.) ;
  float rate_b = .5 - pow((uvr.x), 2.) ;
  float feed = .8 * - circle(uv(), (.75 + sin(time ) / 8.));// + data.y / 10.;
  float kill =  .4 * circle(uv(), (.5 + sin(time / 5.) / 12.)); // + data.x / 10.; 
  float speed = 1.;
  
  
  // spaceship
  vec2 uvm = uv() * rot(time / 2.) + vec2(.2 + sin(time / 1.62) / 3., + sin(time / 1.62 * .3));
//   vec2 uvf = (uv() * rot(time ) + vec2(1. + sin(time / 1.62) / 3., 0.1 + sin(time / 1.62) / 3.));

  
  float sr = .2;
  ship += - circle(uvm, sr) ;
  color.z += circle(uvm, sr + .08) < 0. ?  ship * 10. : 0.;
  
  color.x += sin(circle(uvm , sr) * (400. + sin(time) * 130.)) < 0. ? color.z * 4.: 0.;
  
  rate_b += circle(uvm, sr) < 0. ? 49. : 0.; 
  rate_a -= circle(uvm, sr) < 0. ? 38. : 0.; 

  kill = circle(uvm, .3 ) < 0. ? 0. : kill;




  
  mat3 m = mat3(val.x, 0.,             0.,
                0.,    -val.x + val.z, 0.,
                0.,    0.,             val.x);

  ivec2 coord = ivec2(gl_FragCoord.xy);
  float da =   rate_a * conv(coord, gauss, m ).x  - a*b*b + conv(coord, gauss, idm).x * feed * (1.-a);
  float db =  rate_b * conv(coord, gauss, m).z + a*b*b - kill * b;

  color += val.xyz + vec3(da, 0, db) * speed;
  
  vec2 uvp = vec2(uv().x - data.x, -uv().y - (data.y) )  - vec2(.1);
  
  // planet core
  uvp = uv();
  vec3 core = vec3(0.);
  core += paint * ( circle(uvp, .2 + sin(time * .6) / 4.) < 0. ? (sin(circle(uvp, .3 + sin(time * 6.) / 10.) * (10. + 5. * sin(time * 9.))) < 0. ?  vec3(sin(time), 0., 0.) : vec3(0.)) : vec3(0.));
  core += paint * (circle(uvp, .2 + sin(time * .16) / 6.) < 0. ? (sin(circle(uvp, .3 + sin(time * 16.) / 60.) * (300. + 100. * sin(time * 30.))) < 0. ?  vec3(0., 0., sin(time*5.)) : vec3(0.)) : vec3(0.));
  color += core * circle(uvp, .4);


//   color.y = - circle(uv(), (.7 + sin(time / .5) / 15.)) * 10.;
//   color = smoothstep(0., .5, color);
;
  gl_FragColor = vec4(color, ship) ;
  
}
