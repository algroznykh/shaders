
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
	
		
	vec2 uvi = uvN() + vec2(0., .5) ;
	
    float pixel_angle = atan(uv().x ,uv().y) + acos(-1.);
    float pixel_distance =  length(uv() * .6) ;
    
    vec2 st = vec2(pixel_angle , pixel_distance);//pixel_angle


    // polar sound
    
    vec2 sts = vec2(st.x / acos(-1.) / 2. , 1.03 - st.y );
    sts.x -= .1;
    
    float sound = 0.;
    
    sts.x = sin(sts.y * (9. + 2. * sin(sound)));
    sound = conv(sts, channel0, sobelY ).x * 8.;
    
    
    sound += texture2D(backbuffer, uvN()).z * .01;
    sound *= (sts.y - .5) * 2.;
    
    
    // polar camera
    vec2 stc = st;
    stc.y *= 1.3;
    stc.x /= acos(-1.) * 2.;
    stc.y = .7   - stc.y ;
    stc.y *= sound > .1 ? 1.-sin(sound) : 1.;
    
	inside = conv(stc, channel1, laplace).xyz * 100.;
    inside *= sin(stc.x * acos(-1.));
    
    
    sound /= sts.y;
    
    // sound = sts.y * red;
    
    // sound = sts.y * white;
 
// 	inside += inside;
// 	inside *= cos(sound);
    
    vec2 uvr = vuv;
    
    float f = time * .001;
    
    // float f *= sound.x;
    
    uvr *= rot(f);
    uvr.x /= 2. * atan(f);
    uvr.x += .5 ; 
    
    uvr.y /= 2.;
    uvr.y += .5;
    
  
    vec3 sky = read(uvr, backbuffer) * 1.5  * purple ;
    
    // inside *= sound;
    inside += sky;
    
    // color += sound * red * 10.;
    
    // inside += sound * red;
    
    
	color += c2 < sound ? inside : sky * (st.y * 1.7 - 1.) ;  ;
	
// 	color = c2 < sound  ? black : white;
// 	color = red;
	
// 	color = sound * purple;
// 	color = uvr.y * red;
	

    
	gl_FragColor = vec4(color, sound);    
    
    

    
    
	
	
	

}
