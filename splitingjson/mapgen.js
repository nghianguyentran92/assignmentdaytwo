const ljf = require( "load-json-file" );
const wjf = require( "write-json-file" );
const regions = [
    {
        name: "centralregionmap",
        id: "SgkhNupCR4x"
    },
    {
        name: "highlandregionmap",
        id: "bJ55F4lb3WJ"
    },
    {
        name: "northregionmap",
        id: "JzKStMojAGA"
    },
    {
        name: "southregionmap",
        id: "T6shP0GyRuQ"
    }
]

const loadjsonfile = () => {
  return new Promise( (res, rej) => {
      res(ljf.sync("./data/vnProv.json"));
  });
};

loadjsonfile().then (result => {
    regions.forEach( regions => {
            let orgUnitList = {features:[]};
            orgUnitList.features = result.features.filter( feature => feature.properties.parent === regions.id );
            jsonCreateFormatAndCreateFile( orgUnitList, regions );
    });
}
)

const jsonCreateFormatAndCreateFile = (data, regions) => {
  createFile( data.features.map( feature => {
    return {
      id: feature.id,
      coordinates: feature.geometry.coordinates,
      geometryType: feature.geometry.type,
      code: feature.properties.code,
      level: feature.properties.level,
      name: feature.properties.name,
	  parent: feature.properties.parent
    };
  } ), regions )
};

const createFile = (features, regions) => {
	wjf.sync( `./data/${regions.name}.json`, features, {indent: 2} );
}