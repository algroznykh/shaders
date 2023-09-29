void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;
    uv -= .5;
    uv *= 2.;
    
    vec2 V = vec2(uv.x, uv.y);
    mat2 W = mat2(.0, 1., -32., -30.);  
    vec2 B = vec2(0., 2.1);
    
    vec2 R = sin(V * W + B);
    
    vec3 col = vec3(R.x + R.y);

    // Output to screen
    fragColor = vec4(col,1.0);
}
