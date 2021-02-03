#version 150

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform vec3 spectrum;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D prevFrame;
uniform sampler2D prevPass;

uniform int frame1;

uniform int value1;

uniform sampler2D noise1;

uniform float screenWidth;
uniform float screenHeight;


uniform sampler2D tSource;


in VertexData
{
    vec4 v_position;
    vec3 v_normal;
    vec2 v_texcoord;
} inData;

out vec4 fragColor;

float delta = 0.001;
float feed = .1;
float kill = .1;
vec4 color1 = vec4(.1, 0, .5, 1);
vec4 color2 = vec4(0, 1, 0, 1);
vec4 color3 = vec4(0, 0, 1, 1);
vec4 color4 = vec4(0, 1, 1, 1);
vec4 color5 = vec4(0, 0, 1, 1);
vec4 color6 = vec4(1, 0, 1, 1);

    void main(void)
      {
        // Extract the v value from the sourcetexture
        vec2 vUv = inData.v_texcoord;
        
//        float e = 0.001;
//        if (pow(vUv.x - mouse.x, 2) + pow(1 - mouse.y - vUv.y , 2) < e) {
//            fragColor=vec4(1);
//            return;
//        }
        
        float value = 0.;
        
        if (frame1 == 0) {
            vec4 t = texture2D(tSource, vUv);
            value = t.r + t.g + t.b;
            }
        else {
            vec4 t = texture2D(prevPass, vUv);
            value = t.r + t.g + t.b;
            }
        float a;
        vec3 col;
        
        if (value <= color1.x) {
          col = color1.rgb;
        } else if (value <= color2.a) {
          a = (value - color1.a)/(color2.a - color1.a);
          col = mix(color1.rgb, color2.rgb, a);
        } else if (value <= color3.a) {
          a = (value - color2.a)/(color3.a - color2.a);
          col = mix(color2.rgb, color3.rgb, a);
        } else if (value <= color4.a) {
          a = (value - color3.a)/(color4.a - color3.a);
          col = mix(color3.rgb, color4.rgb, a);
        } else if (value <= color5.a) {
          a = (value - color4.a)/(color5.a - color4.a);
          col = mix(color4.rgb, color5.rgb, a);
        } else if (value <= color6.a) {
          a = (value - color5.a)/(color6.a - color5.a);
          col = mix(color5.rgb, color6.rgb, a);
        } else {
          col = color6.rgb;
        }
        fragColor = vec4(col.r, col.g, col.b, 1.0);
    }

