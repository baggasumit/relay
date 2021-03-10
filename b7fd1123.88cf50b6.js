(window.webpackJsonp=window.webpackJsonp||[]).push([[168],{244:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return c}));var r=n(3),a=n(7),o=(n(0),n(319)),i={id:"routing",title:"Routing",original_id:"routing"},l={unversionedId:"routing",id:"version-v10.1.3/routing",isDocsHomePage:!1,title:"Routing",description:"Historically, Relay started out internally at Facebook as a routing framework. However, Relay no longer makes any assumptions about routing, and works with a variety of routing options.",source:"@site/versioned_docs/version-v10.1.3/Modern-Routing.md",slug:"/routing",permalink:"/docs/v10.1.3/routing",editUrl:"https://github.com/facebook/relay/edit/master/website-v2/versioned_docs/version-v10.1.3/Modern-Routing.md",version:"v10.1.3",lastUpdatedBy:"Jianfeng Chen",lastUpdatedAt:1615407470,sidebar:"version-v10.1.3/docs",previous:{title:"fetchQuery",permalink:"/docs/v10.1.3/fetch-query"},next:{title:"Debugging",permalink:"/docs/v10.1.3/relay-debugging"}},u=[{value:"No Routing",id:"no-routing",children:[]},{value:"Flat Routes",id:"flat-routes",children:[]},{value:"Nested Routes",id:"nested-routes",children:[{value:"React Router",id:"react-router",children:[]},{value:"Found",id:"found",children:[]}]},{value:"Custom Routing and More",id:"custom-routing-and-more",children:[]}],s={toc:u};function c(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Historically, Relay started out internally at Facebook as a routing framework. However, Relay no longer makes any assumptions about routing, and works with a variety of routing options."),Object(o.b)("h2",{id:"no-routing"},"No Routing"),Object(o.b)("p",null,"If the Relay part of an application is some widget or single view as part of a larger application, you don't need any routing. You can just render a ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," somewhere on the page to fetch and render the data you need there. This option is simple and should be used when sufficient."),Object(o.b)("h2",{id:"flat-routes"},"Flat Routes"),Object(o.b)("p",null,"When not nesting routes with Relay data dependencies, such as when using flat routes, it is sufficient to just render a ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," for the parts of your application that require Relay data. You can also use the options below that integrate your routes with their data dependencies."),Object(o.b)("h2",{id:"nested-routes"},"Nested Routes"),Object(o.b)("p",null,"Nested routes with Relay data dependencies introduce an additional complication. While it's possible to render a ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," per route, doing so will lead to request waterfalls in the general case where parent routes do not render their child routes until the data for those parent routes are available. This generally leads to an unnecessary additional delay in loading the data for the page, but may be acceptable for small applications or for applications with shallow route trees."),Object(o.b)("p",null,"Integration options are available for open-source routing libraries that can instead fetch data for nested routes in parallel. In many of these cases, using a batching network layer can bring additional benefits in avoiding sending multiple HTTP requests."),Object(o.b)("h3",{id:"react-router"},Object(o.b)("a",Object(r.a)({parentName:"h3"},{href:"https://reacttraining.com/react-router/"}),"React Router")),Object(o.b)("p",null,"Integration with Relay Classic for React Router v2 or v3 is available via ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/relay-tools/react-router-relay"}),Object(o.b)("inlineCode",{parentName:"a"},"react-router-relay")),", which will aggregate the queries for matched routes, and request data for all routes in parallel."),Object(o.b)("p",null,"The component-based approach of React Router v4 does not readily allow for aggregating the data requirements for nested routes, and as such does not readily permit an approach that will avoid request waterfalls from nesting ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," components."),Object(o.b)("h3",{id:"found"},Object(o.b)("a",Object(r.a)({parentName:"h3"},{href:"https://github.com/4Catalyzer/found"}),"Found")),Object(o.b)("p",null,"Found offers integration with Relay Modern and Relay Classic via ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/4Catalyzer/found-relay"}),"Found Relay"),". Found Relay runs queries for matched routes in parallel, and supports fetching Relay data in parallel with downloading async bundles from code splitting when using Relay Modern."),Object(o.b)("h2",{id:"custom-routing-and-more"},"Custom Routing and More"),Object(o.b)("p",null,"The options listed above are not exhaustive. If you are aware of other routing solutions that work well with Relay Modern, ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/facebook/relay/issues/new"}),"please let us know"),"."))}c.isMDXComponent=!0},319:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),c=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),d=c(n),b=r,f=d["".concat(i,".").concat(b)]||d[b]||p[b]||o;return n?a.a.createElement(f,l(l({ref:t},s),{},{components:n})):a.a.createElement(f,l({ref:t},s))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=b;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=n[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);