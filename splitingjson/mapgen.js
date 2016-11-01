const ljf = require( "load-json-file" );
const wjf = require( "write-json-file" );
const southid = "T6shP0GyRuQ";
const northid = "JzKStMojAGA";
const highlandid = "bJ55F4lb3WJ";
const centralid = "SgkhNupCR4x";

let north={features:[]
};
let central={features:[]
};
let highland={features:[]
};
let south={features:[]
};

const loadjsonfile = () => {
  return new Promise(function(res, rej){
      res(ljf.sync("./data/vnProv.json"));
  });
};

loadjsonfile().then( result => {
    result.features.forEach(function(features){
        if(features.properties.parent == southid){
                south.features.push(features);
        }
        if(features.properties.parent == centralid){
                central.features.push(features);
        }
        if(features.properties.parent == highlandid){
                highland.features.push(features);
        }
        if(features.properties.parent == northid){
                north.features.push(features);
        }
    } );
    }
 )
 .then( function() {
       wjf.sync( "./data/southregionmap.json", south, {indent: 2} );
       wjf.sync( "./data/centralregionmap.json", central, {indent: 2} );
       wjf.sync( "./data/highlandregionmap.json", highland, {indent: 2} );
       wjf.sync( "./data/northregionmap.json", north, {indent: 2} );
 } );
