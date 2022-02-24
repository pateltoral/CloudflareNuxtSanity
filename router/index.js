import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export function createRouter(ssrContext, createDefaultRouter, routerOptions, config) {
  const options = routerOptions || createDefaultRouter(ssrContext, config).options;
  const hostname = ssrContext ? ssrContext.req.headers.host : location.host;
  const url = ssrContext ? ssrContext.req.url : location.pathname;
  return new Router({
    ...options,
    routes: fixRoutes(options.routes, hostname, url),
    fallback: true
  });
}
function fixRoutes(defaultRoutes, hostname, url) {
  if (hostname.includes('email')) return emailRoutes(defaultRoutes, url);
  if (hostname.includes('games')) return gamesRoutes(defaultRoutes, url);
  return nubisoftRoutes(defaultRoutes);
}
function nubisoftRoutes(defaultRoutes) {
  return defaultRoutes.filter(r => r.name !== 'email' && 'games');
}
function emailRoutes(defaultRoutes, url) {
  var url = url?.substring(0, url.lastIndexOf("/"));
  if (!url){
    var route = defaultRoutes.find(r => r.name.includes("email"));
    route.path = "/";
  } else {
    var route = defaultRoutes.find(r => r.name.includes("email") && r.path.includes(url));
  }
  if(!route){
    var route = defaultRoutes.find(r => r.name === "index");
  }
  return [route];
}
function gamesRoutes(defaultRoutes, url) {
  var url = url?.substring(0, url.lastIndexOf("/"));
  if (!url){
    var route = defaultRoutes.find(r => r.name.includes("games"));
    route.path = "/";
  } else {
    var route = defaultRoutes.find(r => r.name.includes("games") && r.path.includes(url));
  }
  if(!route){
    var route = defaultRoutes.find(r => r.name === "index");
  }
  return [route];
}