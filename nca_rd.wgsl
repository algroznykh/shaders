const N = 12u;
const S = 5000.;
const B = array<i32, 12> (-248,8,-492,-478,231,365,-269,-110,340,-2,-613,-59);
const W = array<array<i32, 12>, 48>(
        array<i32, 12>(-452,-455,-265,-574,160,-232,-111,-151,234,61,283,538),         array<i32, 12>(161,-1046,-318,-612,693,-164,-256,200,2,-251,198,-415),         array<i32, 12>(-295,454,-649,-52,297,-150,440,-108,66,-368,-75,-369),         array<i32, 12>(533,154,76,-720,-250,161,-58,291,35,-131,-413,-22),         array<i32, 12>(-198,-641,-243,480,-926,-34,-346,-116,-68,67,-261,440),         array<i32, 12>(-47,-237,105,275,269,-1367,121,202,27,-166,-377,-369),         array<i32, 12>(-106,350,-99,-156,506,-39,-1369,-246,220,-7,-366,-395),         array<i32, 12>(209,-265,-99,30,31,106,-29,-1076,-59,270,217,184),         array<i32, 12>(-519,404,53,-727,-233,-327,-133,-107,-583,635,615,-99),         array<i32, 12>(208,137,187,188,36,42,-44,-193,-633,-1212,263,-262),         array<i32, 12>(333,-66,169,246,50,225,76,-88,-611,318,-694,-50),         array<i32, 12>(128,8,208,39,-278,95,401,-239,115,-35,220,-902),         array<i32, 12>(231,-150,-203,-62,-5,-62,-7,39,113,63,0,-34),         array<i32, 12>(-188,179,-78,-24,112,-84,-29,-40,-7,-12,44,40),         array<i32, 12>(-8,-23,378,25,65,105,-43,-70,-38,-33,36,-47),         array<i32, 12>(283,147,21,336,-27,-74,-37,-63,-21,72,96,-44),         array<i32, 12>(-137,-212,-25,143,273,20,-79,28,-60,24,75,93),         array<i32, 12>(55,-25,-30,39,6,364,-53,37,30,-4,-30,-1),         array<i32, 12>(-18,54,1,-47,6,34,366,4,-45,-44,-84,23),         array<i32, 12>(12,-63,-175,44,-65,-51,-69,274,11,24,5,-63),         array<i32, 12>(-83,122,39,20,-37,14,-8,3,344,71,-86,38),         array<i32, 12>(113,70,38,86,-22,-30,40,-48,-40,380,50,92),         array<i32, 12>(-106,-122,-26,38,24,49,-5,-22,-52,-89,420,14),         array<i32, 12>(48,32,79,14,10,-44,-3,105,14,123,17,291),         array<i32, 12>(-114,-49,184,313,-52,-149,99,29,8,130,441,57),         array<i32, 12>(-273,-7,-33,177,40,-20,-57,-77,85,157,259,-157),         array<i32, 12>(100,-127,-40,160,-268,-361,122,217,65,-14,419,-200),         array<i32, 12>(-202,-293,17,0,133,-209,-80,-34,97,-64,100,4),         array<i32, 12>(253,187,-70,-24,79,24,-127,463,14,190,-127,-341),         array<i32, 12>(-665,214,42,303,618,75,299,108,-319,-316,180,-330),         array<i32, 12>(219,-232,-187,229,697,264,-271,643,-467,569,696,-107),         array<i32, 12>(-202,-122,-22,-86,87,96,-237,191,-156,78,-67,-17),         array<i32, 12>(-487,27,58,276,-142,21,157,-64,98,-119,-262,-218),         array<i32, 12>(191,189,-2,-170,-26,173,-404,517,-77,173,-103,-258),         array<i32, 12>(-288,-143,-106,-208,-59,-86,-93,46,270,-257,-37,161),         array<i32, 12>(-190,102,-13,275,109,-30,213,45,-24,-109,38,43),         array<i32, 12>(-88,-2,63,39,-25,-56,3,-21,56,8,-47,35),         array<i32, 12>(83,95,-13,-36,-2,-59,7,97,-11,34,-72,-13),         array<i32, 12>(45,1,-42,-85,-77,69,134,-16,-24,-6,25,-48),         array<i32, 12>(224,211,99,-126,34,-145,114,193,185,-150,52,24),         array<i32, 12>(115,64,-23,-123,72,-43,-21,-55,57,73,124,-44),         array<i32, 12>(41,-33,33,185,-136,-63,126,-230,80,-117,-95,43),         array<i32, 12>(50,86,31,5,-131,70,-25,19,33,-103,-72,10),         array<i32, 12>(64,-49,-4,12,-30,-165,199,-132,-87,-315,44,103),         array<i32, 12>(-99,-59,-36,146,18,-117,69,58,116,-18,47,40),         array<i32, 12>(-8,-37,-1,-107,-159,-66,16,138,-204,-142,-104,-87),         array<i32, 12>(-16,-149,-28,205,-30,-105,174,-55,41,-89,-18,-139),         array<i32, 12>(-20,-39,-2,57,-137,-178,-24,-156,-130,-7,-41,96), );


#storage states array<array<f32,N>>
var<private> current_index: int2;


// size of a simulation
const SW = 256 ;
const SH = 128 ;

fn R(dx: i32, dy: i32, c: u32) -> f32 {
    let x = (current_index.x + dx + SW) % SW;
    let y = (current_index.y + dy + SH) % SH;
    let i = x + y*SW;
    return states[i][c];
}

fn sobx(c: u32) -> f32 {
    return R(-1, 1, c) + R(-1, 0, c)*2.0 + R(-1,-1, c)
          -R( 1, 1, c) - R( 1, 0, c)*2.0 - R( 1,-1, c);
}

fn soby(c: u32) -> f32 {
    return R( 1, 1, c)+R( 0, 1, c)*2.0+R(-1, 1, c)
          -R( 1,-1, c)-R( 0,-1, c)*2.0-R(-1,-1, c);
}


fn lap(c: u32) -> f32 {
    return R(1,1,c)+R(1,-1,c)+R(-1,1,c)+R(-1,-1,c) 
        +2.0* ( R(0,1,c)+R(0,-1,c)+R(1,0,c)+R(-1,0,c) ) - 12.0*R(0, 0,c);
}

fn update(ys: array<f32, N>, ps: array<f32, N>) -> array<f32, N> {
  // for some reason, accessing consts is very expensive, hence local vars
  var ws = W;
  var bs = B;

  var ys_v = ys;
  var ps_v = ps; // vulkan target in naga does not allow indexing an argument array

  // construct hidden state
  var hs = array<f32, 48>();
  for (var i = 0u; i<N; i++) {
    hs[i] = ys_v[i];
    hs[i+N] = ps_v[i];
    hs[i+N*2u] = abs(ys_v[i]);
    hs[i+N*3u] = abs(ps_v[i]);
  }

  // do 1x1 conv
  var dy = array<f32, N>();
  for (var c = 0u; c < N; c++) {
      var us = f32(bs[c]);

      for (var i = 0u; i < 48u; i++) {
          us += hs[i] * f32(ws[i][c]);
      }
      dy[c] = us / S;
  }

  return dy;
}

fn get_index(idx : u32, idy: u32, screen_size: uint2) -> u32 {
    return  idx + idy * u32(SW);
}


@compute @workgroup_size(16, 16)
fn main_image(@builtin(global_invocation_id) id: uint3) {
    // setup
    let screen_size = uint2(textureDimensions(screen));
    if (id.x < u32(SW) && id.y < u32(SH)) { 
    current_index = int2(int(id.x), int(id.y));

    // initial state
    if (time.frame == 0u) {
        for (var s=0u; s<N; s++) {
            // let i = id.x + id.y * SW;
            let i = get_index(id.x, id.y, screen_size);
            let rand = fract(sin(f32(i + N * s) / f32(SW)) * 43758.5453123) + .5;
            states[i][s] = floor(rand);
        }

    return;
    }


    // construct state + perception vectors
    var xs = array<f32, N>();
    for (var c=0u; c<N; c++) {
        // let i = id.x + id.y * SW;
        let i = get_index(id.x, id.y, screen_size);
        xs[c] = states[i][c]  ;
    }

    var ps = array<f32, 12>(
        lap(0u),
        lap(1u),
        lap(2u),
        lap(3u),

        lap(4u),
        lap(5u),
        lap(6u),
        lap(7u),

        lap(8u),
        lap(9u),
        lap(10u),// + pow(sin(length(vec2<f32>(id.xy)) * fract(time.elapsed)) , 5.) * .2,
        lap(11u)
    );
    // update state
    var dx = update(xs, ps);

    // save state
    for (var s=0u; s<N; s++) {
        // let i = id.x + id.y * SW;
        let i = get_index(id.x, id.y, screen_size);
        states[i][s] += dx[s] ; // + pow(sin(length(vec2<f32>(id.xy)) * f32(s) * time.elapsed) , 5.) ;
    }
    }

    // display rgba channels 
    // let i = id.x + id.y * SW;

    // resize texture to the screen size: id / size(tex) * screen_size
    var idxs = u32(f32(id.x) / f32(screen_size.x) * f32(SW));
    var idys = u32(f32(id.y) / f32(screen_size.y) * f32(SH));

    // idxs = i32(id.x);
    // idxy = i32(id.y);
    let i = get_index(idxs, idys, screen_size);
    var xrgb = vec4(states[i][0], states[i][1], states[i][2], states[i][3]) + .5;
    

    textureStore(
        screen,
        int2(id.xy),
        xrgb
    );
}
