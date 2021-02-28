// docs https://github.com/shawnlawson/The_Force/wiki/API

vec4 read(vec2 p) {
    return texture2D(backbuffer, p);
}


const mat3 gauss = mat3(1.0, 2.0, 1.0, 
                        2.0,-12.0, 2.0, 
                        1.0, 2.0, 1.0) / 8.0;   

const mat3 sobelX = mat3(-1., 0., 1.,
                         -2., 0., 2.,
                         -1., 0., 1.) / 8.;

const mat3 sobelY = mat3(-1., -2., -1., 
                          0., 0., 0.,
                          1., 2., 1.) / 8.;
                          
mat2 rot(float a) {
    
    return mat2(cos(a), -sin(a), 
                sin(a), cos(a));
}


vec4 conv (ivec2 xy, mat3 filter, float a) {
    
    vec4 l = vec4(0.0);
    
    for (int y=0; y<3; ++y)
        for (int x=0; x<3; ++x) {
            ivec2 p = xy + ivec2(x-1, y-1);
            l += filter[x][y] * read((vec2(p) / (resolution.xy -vec2(.5)) ));
        }
    
    return l;  
}  


void main () {
    
  // read input
  vec2 data = mouse.xy / resolution.xy  ;
  data -= vec2(1.);
  //data *= 2.;
  
  
  // set parameters
  float rate_a = 1.;
  float rate_b = .5;
  float feed = 0.055 * uv().x  + data.x / 10.;
  float kill = 0.055 * uv().y + data.y / 10.;
  float speed = 1.;
  
  
  //read prev state
  vec4 val = read(uvN());
  float a = val.x;
  float b = val.z;
  
  
  // rotate sobel filters
  float phi = sin(time / 6.) * 6.28  ;
  vec2 dir = vec2(1., 0.);
  
  
  // process state
  ivec2 coord = ivec2(gl_FragCoord.xy);
  vec2 rot_dir = rot(phi) * dir;
  float da =  conv(coord, sobelX, phi).x * rot_dir.x + conv(coord, sobelY, phi).x * rot_dir.y  + rate_a * conv(coord, gauss, phi).x  - a*b*b + feed * (1.-a);
  float db = conv(coord, sobelX, phi).z *rot_dir.x + conv(coord, sobelY, phi).z *rot_dir.y  + rate_b * conv(coord, gauss,phi).z + a*b*b - (kill + feed) * b;
  
  
  // set new state
  vec4 color = val + vec4(da, 0, db, 1) * speed;
  
  
  // paint 
  if (length(vec2(uv().x - data.x * 2., -uv().y - (data.y) )  - vec2(.1)) < .1) 
      color = vec4(sin(time* 5.), 0, cos(time * 5.), 1);

  
  // write to buffer
  gl_FragColor = color;
  

}
