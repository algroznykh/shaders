#define N_HIDDEN 24

vec4 bufA[N_HIDDEN/4];
vec4 bufB[N_HIDDEN/2];


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
                     
                     
                     
                    
vec4 conv(vec2 p, mat3 filter) {
    vec4 l = vec4(0.);
    for (int y=0; y<3; y++)
        for (int x = 0; x < 3; x++) {
                
            // p *= vec2(1.1, 1.);
            // p += vec2(-.05, 0.);
            l += filter[x][y] * texture2D(channel0, p + vec2(x - 1, y - 1) / resolution ) ;
            
            
            
          
            
            
        }
    return l;
}

mat2 rot(float phi) {
    return mat2(cos(phi), -sin(phi), sin(phi), cos(phi));
}

float circle(vec2 p, float r) {
    return length(p) - r;
    
}

void main () {
	
	vec2 uv = uv();
	
	
	float grid = step(.5, step(.96, fract(uvN().x * 40.)));
	grid += step(.5, step(.96, fract(uvN().y * 20.)));
	
	
	
    // vec3 color = vec3(0.0);
    
    float c0 = circle((uv )  * vec2(1., 1.), .9);
    
    float c1 = circle((uv )  * vec2(1., 1.), .89);
    
    float c2 = circle((uv )  * vec2(1., 1.), .88);
    
    
	vec3 color = c2 > 0.? grid * purple: vec3(0.);
	color = vec3(0.);
	
    color += step(.0, - sin(max(c0, -c1) ) )  * vec3(1, 0, 0);
    color += step(.0, - sin(max(c1, -c2) ))  * vec3(0, 0, 1);
    
// 	color = vec3(0.);
// 	color += feed.xyz;
	
// 	vec4 back = texture2D(backbuffer, uv) * 0.;
	
// 	vec4 sound = texture2D(channel1, uv() + 2.);
	
    
    // vec4 c = conv(clamp(uvN(), 0.18, .8) * vec2(.6, .8) + vec2(.2, .1 ), laplace) * 1.;	
// 	color = vec3(0.);

    
    //vout =vec4(c) * vec4(1, 0, 1, 1) + vec4(color, 1.);
	
	vec4 vout = vec4(color, 1.); //  
// 	vout += vec4(0., 1., 0., 1.) * texture2D(channel1, clamp(uvN() + vec2(.5, .5), .1, .8));  
// 	vout += texture2D(backbuffer, clamp(uvN(), .11, .88)) * .9 * vec4(0, 1,0,1);
    // vec2 uvc = vec2(uvN().x * .3 + .35, uvN().y * .57 + .18);
    vec2 uvc = vec2(uvN());
    // uvc =  (uv*rot(-.015) / vec2(3.2, 2.) + vec2(.5)) * vec2(.76, .57)  + vec2(0.12, .18);
    // uvc =  (uv*rot(.008) / vec2(2.99, 1.86) + vec2(.5)) * vec2(.776, .58)  + vec2(0.115, .19);

    
    

// 	vout += c2 < 0.? conv(uvc, sobelX) *4.3  * vec4(.5, 0, .5, 1) : vec4(0.);
// 	vout += c2 < 0.? conv(uvc, sobelY) *4.3 * vec4(.5, 0, .5, 1) : vec4(0.);

    // vout += c2 > 0.? texture2D(channel0, uvc) * .3 : vec4(0.);
    
	
	vec4 inside = vec4(0.);
	
		
	vec2 uvi = uvN() + vec2(0., .5) ;
	
    float pixel_angle = atan(uv.x ,uv.y) + acos(-1.);
    float pixel_distance =  length(uvi) * 2. ;
    
    vec2 st = vec2(pixel_angle , pixel_distance);//pixel_angle

    st.x /= 12.;
    
// 	inside = texture2D(channel0, st );
	
	inside = conv(st, laplace) * 10.;
	
	vout += c2 < 0.? inside : vec4(0.);
    

	gl_FragColor = vout    ;
	
// 	vec4 debug = texture2D(channel0, uvN());
// 	gl_FragColor = debug;


    
    // gl_FragColor = vec4(st.x / acos(-1.) * 2. );

    
    

    
    
	
	
	

}
