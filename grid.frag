
void main () {
    
    float gridx = fract(uvN().x*9. -.05) > .9 ? 1.: 0.;
    float gridy = fract(uvN().y * 9. -.05) > .9? 1.:0.;
    
    
    vec3 color;
    color = vec3(1.) * (gridy + gridx) ;
    gl_FragColor = vec4(color, 1.);
    
}
