import express from 'express';
import compression from 'compression';

const app = express();

app.use(compression());
app.use(express.json());

//teste
import Vinted from './scrapper/vinted/vinted.js';
const { getUserID } = Vinted.User;
const { getAllProductUser } = Vinted.Product;

let Cookie = '_vinted_fr_session='
Cookie += 'WGdqVUZlbVR2VWpnV05ONkxOUEV3SS8rRTNjejBVY2JSdHpNcGd3Ull4ZXlFWjFhZVcrR3lmRzl1bjlKaVVaelMxT2Z1bGZQSXZoUHptdlVScUp0bnpDVnhTb1FBd0JVWW5PaEhNQVJ2QnBvUVV3RzAzdDBQWHh0Sk1SQmcwZDdVZXVQdUFtMlp4MEkwS3p6aTZ2bnY0NFdnZUFEYmVWTFA3U2NXakhETFpVZThGYmlhMnNmY2xiT1lKNHRiVVFwUnY5V2RqRTNnWUJhTWlLakZmN3hUVnQ2MDgyVkdzUzVkaHJQSlJrNFAxR0hHUXlEeWw3S1NYb1JDcnZCOTNUUW9uTEg1R0QvODk3ZGw2WlRkMWpiUHRpdFdueGhxNGNiUDVOT2ppaTlIaCtySXV6Rm9Dbm5DYWNjTVIzU081YVJ2c25oZkdLS04zRnczYzJsWWtlSDYvd0JwK05jWmdoUmlFUmMzaytGWDkyVUJnZ005Mk51dW5GOXMxL0lHYTI2NXBOUVNGVUMxZHorWlgvRk8rZm5NU2xCQlM5TVZrN2NMdTRlbGRhTDhxSjF2U2RYbmVXZDByc0tVdmFXcGNVVEVFZGxFNlZneGpQT0xLZEp0cEpDV2l5cEFiZ21lNWtGTExWdWdhVU5PTFZkUjdNL3hpRVVuQ0RwYTZHT1l0czl5WDNHSnZBSHJNVjI3dUtISXd4UnRnQWdVMmsvWmVZbUU3bG9jUE1iYWtjcEZIcm90ZWk0TFl1RGpXMVlZT3dxeUpJYUVySHMwNStidXFpcTI1NVVaWE55eWdoZjlkWVNmWUJYLzZUVHI4ajkzdVBhNnorUEhreTNoRTV0a0tjb0c2OERYRTF4UVNyZkFPZCtuN1RCam9CUmhyTHdRclFwMEFmSlZ1YmdvK1h3N3BOaGpkbFNpZXdXU25kK2c1WjRCMlFFQ011cERka1VDbHQyWkJwQXdRcElQdXZaUEk4U0F5enY2K05tTGpRREJ0Q0FMQVBXWXArZm84SW9EZDdPT2xTOE5RQ3MxVU96b2ZPVzBMUGNuZUs1L1BOMXc1VTB5Tm1IRlJjRHQvNEtTNUpwZlZDVTdZeVR3ZFhJcU5DdFhKRmNUeUcvWHpJRE1lUjdQUzVPM25xYVdWOXZOTmRnWnBlblR5OUl0VEU1YjRlbmRCSEFnODBUQTRSSXg2ZzhJM2FkV2p0dWVtUGVscG1Qc0hNaDJBanVaZHkwVk03RFNKQ1VhQ2xodi9wVzlDc2Noa09EQTFvV1JHOGkzV1dBRDZYVlZjeVlPc3ordFBlR01qb3FrdzZEZlEwTlVLVDVtVWZCTE1ZZWZKc1Y2QjRaTXU3V3l3czU1WmYrSlVaRlhrZm1lZEd3M1IvdnRmcU9mcFJPVjhqU0NGWUIxNTlxZ0tCVGx0OTJQQXV5SnphWC9lTU02VzVWc3VHTExZZjFnWHl0SHU5d1NhZTl3aitGdnhxSkV6OU5MWisvRmluSHJYdVdmRTE4NHA4UDA2M244di9PME56a1d2M1dwMmxIckQ2ZFFpenRvcmU2MzZjR25YaUxIKzNuUVZ5NTFJWUpxd3ZkbGthZy96U2cvb1RxV1BnYTQxcXFYVUY4TldIRjV6OTBrVDRJYVBjbXJUT2F6VXArQW5SbVBBaWp2c1RlLzMzcUZndDVpS3IyREdLZE1qV2JSNDRIdk9WZFVRc0UyYmo3U2RUSGI3aEhyRFg1ejl0dXI4WUpmNlZ5LzZzNjlCTnFaOFoxejBkU2dRSGlYUUtSTzFXVWVWWFM0ZGdZLS1wMHZkNDZaYi9JaTdEOWg0MUU1aU9BPT0%3D--ea215f0fc33bc251b82cf301017c25fbd116fb22'

getUserID({ cookie: Cookie }).then(data => {
  getAllProductUser({ cookie: Cookie, userid: data }).then((response) => {
    console.log(response);
  }).catch(error => {
    console.log("Error: " + error  );
  }); 
}).catch(error => {
  console.log("Error: " + error  );
});





/*
function RefreshToken(){
  setTimeout(() => {
    getAllProducts( Cookie );
    RefreshToken();
  }, 3000);
}

RefreshToken();
*/

app.listen(3000, () => {
  console.log(` > API: ${3000}`);
});