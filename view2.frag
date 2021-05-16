
mat3 laplace = mat3(0, 1, 0, 
                    1, -4, 1,
                    0, 1, 0) / 8.;
                    
mat3 sobelX = mat3(-1, 0, 1,
                    -2, 0, 2, 
                    -1, 0, 1) / 8.;
mat3 sobelY = mat3(-1, -2, -1,
                    0, 0, 0, 
                    1, 2, 1) / 8.;
                    
mat3 identity = mat3(1, 0, 0, 
                     0, 1, 0,
                     0, 0, 1) / 8.;
                     
                     
                     
    
vec3 read(vec2 p, sampler2D tex) {
    return texture2D(tex, p).xyz;
}
                    
vec3 conv(vec2 p, sampler2D tex, mat3 filter) {
    vec3 l = vec3(0.);
    for (int y=0; y<3; y++)
        for (int x = 0; x < 3; x++) {

            l += filter[x][y] * texture2D(tex, p + vec2(x - 1, y - 1) / resolution ).xyz ;
  
        }
    return l;
}

mat2 rot(float phi) {
    return mat2(cos(phi), -sin(phi), 
                sin(phi), cos(phi));
}

float circle(vec2 p, float r) {
    return length(p) - r;
    
}

void main () {
	
    vec2 vuv = uvN() * 2. - 1.;
	
	
	float grid = step(.5, step(.96, fract(uvN().x * 40.)));
	grid += step(.5, step(.96, fract(uvN().y * 20.)));
	
	
    float c0 = circle((uv() )  * vec2(1., 1.), .9);
    
    float c1 = circle((uv() )  * vec2(1., 1.), .89);
    
    float c2 = circle((uv() )  * vec2(1., 1.), .88);
    
    
    vec3 color = vec3(0.);
// 	color = c2 > 0.? grid * purple: vec3(0.);
	

	vec3 inside = vec3(0.);
	
	float sound = texture2D(backbuffer, uvN()).z * .1;
	
		
	vec2 uvp = uv() ;
	
    float pixel_angle = atan(uvp.x ,uvp.y) + acos(-1.);
    float pixel_distance =  length(uvp* .6) ;
    
    vec2 st = vec2(pixel_angle , pixel_distance);
    

    vec2 sts = vec2(st.x / acos(-1.) / 2. , 1.03 - st.y );
    sts.x -= .1;
    
    sts.x = sin(sts.y * 20.);
    sts.y -= .4;
    sound += conv(sts, channel0, sobelY ).x *8.;
    
    
    // sound *= (sts.y - .5) * 2.;
    
    // color += sound;
    
    
    // polar camera
    vec2 stc = st;
    stc.y *= 1.3;
    stc.x /= acos(-1.) * 2.;
    stc.y = .7 + sin(time) / 100.   - stc.y ;
    // stc.y *= sound > .1 ? 1.-sin(sound) : 1.;
    
	inside = conv(stc, channel1, laplace).xyz * 103.;
    inside *= sin(stc.x * acos(-1.));
    inside.x *= stc.x * 2.;
    inside.y *= (1.-stc.x );
    // inside *= 10.;
    
    
    // sound /= sts.y;
    
    // sound = sts.y * red;
    
    // sound = sts.y * white;
 
// 	inside += inside;
// 	inside *= cos(sound);
    
    
    vec2 uvr = vec2(vuv);
    

    // color = vuv.y * red;
    
    float f = time ;
    // f*=0.;
    
    // float f = 0.1;
    
    
    uvr = mat2(cos(f), -sin(f), sin(f), cos(f)) * uvr;
    // float f *= sound.x;
    
    
    
    float pi = acos(-1.);
    
    uvr.x *= (2. + cos(f * 2. +pi/4.) / 4.);
    uvr.x /= (1. - sin(f * 2. + pi / 4. ) / 4.);
    uvr.x /= 4.;
    
    // uvr.x *= (2. - cos(f * 2.) / 2.) ;
    uvr.x += .5; 
    
    
    // uvr.y /= 2.; //+ cos(f * 2. - 3.14/4.);;
    
    
    uvr.y *= (2. - cos(f * 2. +pi/4.) / 8. ) ;
    uvr.y /= (1. + sin(f * 2. +pi/4. ) / 4.);
    // uvr.y /= (1. + sin(f * 2.) / 2.);
    uvr.y /= 2.;
    // uvr.y /= 2.;
    
    uvr.y += .5;
    
    
    
    color = read(uvr, backbuffer) * 2.0* green;
    
  
    vec3 sky = conv(uvr.xy, backbuffer, laplace) * 8. * purple  ;
    // sky += sound;
    // color = black;
    
    // inside *= sound;
    inside += sky;
    
    // color += sound * red * 10.;
    
    // inside += sound * red;
    
    
	color += c2 < sound ? inside : sky  ;
	
// 	color = c2 < sound  ? black : white;
// 	color = red;
	
// 	color = sound * purple;
// 	color = uvr.y * red;
	

    // color = black;
    
	gl_FragColor = vec4(color, sound);    
    
    

  
	

}
