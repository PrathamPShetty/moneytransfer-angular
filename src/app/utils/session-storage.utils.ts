

export function setConfig(config:any){
  if (config) {
    sessionStorage.setItem('config', JSON.stringify(config));
  }
}

export function getConfig(){
  let config = sessionStorage.getItem('config');
  if (config) {
    return JSON.parse(config);
  }
  return null;
}
