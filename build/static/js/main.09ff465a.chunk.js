(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{105:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(17),i=n.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=n(33),u=(n(76),n(28)),s=n(29),l=n(31),d=n(30),E=n(32),b=n(19),S=n(13),p=n.n(S),f=n(18),O=n(23),m=n.n(O),g=n(65),T=n(47),_=n(35),h=n(6),R=n(3);function I(e){return{type:R.f,currencies:e}}function N(e){return{type:R.g,settings:e}}var A=n(14),P=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(4),n.e(7)]).then(n.bind(null,845))}),y=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(11)]).then(n.bind(null,847))}),L=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(14)]).then(n.bind(null,851))}),v=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(15)]).then(n.bind(null,848))}),D=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(13)]).then(n.bind(null,849))}),j=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(18),n.e(16)]).then(n.bind(null,850))}),C=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(9)]).then(n.bind(null,852))}),M=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(10)]).then(n.bind(null,853))}),w=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(3),n.e(12)]).then(n.bind(null,846))}),G=Object(a.lazy)(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(17)]).then(n.bind(null,854))}),U=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={isLoading:!1},n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this._isMounted=!0,this.setState({isLoading:!0}),this._isMounted&&this.bootstrap()}},{key:"bootstrap",value:function(){var e=this;this.props.makeRequest(A.a.Settings.all,"",{message:h.a.LOGGING}).then(function(t){t.data&&e.props.setSettings(t.data),e.setState({isLoading:!1})},function(t){e.setState({isLoading:!1})}),this.props.makeRequest(A.a.Currencies.all,{query:""},{message:h.a.LOGGING}).then(function(t){t.data&&e.props.setCurrencies(t.data),e.setState({isLoading:!1})},function(t){e.setState({isLoading:!1})}),this.props.makeRequest(A.a.Lottery.slots.last,{},{message:h.a.LOGGING}).then(function(t){t.data&&e.props.setLastSlot(t.data),e.setState({isLoading:!1})},function(t){e.setState({isLoading:!1})}),this.props.makeRequest(A.a.Lottery.slots.winners,{query:""},{message:h.a.LOGGING}).then(function(t){t.data&&e.props.setLotteryWinners(t)},function(t){e.setState({isLoading:!1})}),this.props.makeRequest(A.a.Lottery.slots.getActive,{},{message:h.a.LOGGING}).then(function(t){t.data&&(e.props.setLotterySlot(t.data),e.props.setLotteryPlayers(t.data.participants))},function(t){e.setState({isLoading:!1})})}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var e=this.props.auth.isAuthenticated;return r.a.createElement(a.Fragment,null,r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",{className:"loader-container"},r.a.createElement("div",{className:"loader-container-inner"},r.a.createElement("div",{className:"text-center"},r.a.createElement(m.a,{type:"line-scale-party"})),r.a.createElement("h6",{className:"mt-3"},"Please wait while we load all the components ...")))},r.a.createElement(f.b,{path:"/auth",component:G})),r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",{className:"loader-container"},r.a.createElement("div",{className:"loader-container-inner"},r.a.createElement("div",{className:"text-center"},r.a.createElement(m.a,{type:"ball-grid-beat"})),r.a.createElement("h6",{className:"mt-3"},"Please wait while we load all the Components ...")))},r.a.createElement(f.b,{path:"/dashboards",component:P}),r.a.createElement(f.b,{path:"/users",component:y}),r.a.createElement(f.b,{path:"/roles",component:v}),r.a.createElement(f.b,{path:"/currencies",component:D}),r.a.createElement(f.b,{path:"/permissions",component:L}),r.a.createElement(f.b,{path:"/lottery",component:j}),r.a.createElement(f.b,{path:"/wallets",component:C}),r.a.createElement(f.b,{path:"/pages",component:w}),r.a.createElement(f.b,{path:"/settings",component:M})),r.a.createElement(f.b,{exact:!0,path:"/",render:function(){return e?r.a.createElement(f.a,{to:"/dashboards"}):r.a.createElement(f.a,{to:"/auth/login"})}}),r.a.createElement(T.b,null))}}]),t}(a.Component);var F=Object(f.e)(Object(b.b)(function(e){return{auth:e.authReducer,appStatus:e.appStatusReducer}},{makeRequest:_.a,setCurrencies:I,setSettings:N})(U)),k=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={closedSmallerSidebar:!1},n}return Object(E.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.colorScheme,n=e.enableFixedHeader,o=e.enableFixedSidebar,i=e.enableFixedFooter,c=e.enableClosedSidebar,u=e.closedSmallerSidebar,s=e.enableMobileMenu,l=e.enablePageTabsAlt;return r.a.createElement(g.a,{handleWidth:!0,render:function(e){var d=e.width;return r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:p()("app-container app-theme-"+t,{"fixed-header":n},{"fixed-sidebar":o||d<1250},{"fixed-footer":i},{"closed-sidebar":c||d<1250},{"closed-sidebar-mobile":u||d<1250},{"sidebar-mobile-open":s},{"body-tabs-shadow-btn":l})},r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",{className:"loader-container"},r.a.createElement("div",{className:"loader-container-inner"},r.a.createElement("div",{className:"text-center"},r.a.createElement(m.a,{type:"line-scale-party"})),r.a.createElement("h6",{className:"mt-3"},"Please wait while we load all the components ...")))},r.a.createElement(F,null))))}})}}]),t}(r.a.Component),H=Object(f.e)(Object(b.b)(function(e){return{colorScheme:e.ThemeOptions.colorScheme,enableFixedHeader:e.ThemeOptions.enableFixedHeader,enableMobileMenu:e.ThemeOptions.enableMobileMenu,enableFixedFooter:e.ThemeOptions.enableFixedFooter,enableFixedSidebar:e.ThemeOptions.enableFixedSidebar,enableClosedSidebar:e.ThemeOptions.enableClosedSidebar,enablePageTabsAlt:e.ThemeOptions.enablePageTabsAlt}})(k)),B=n(15),x=n(64),q=n(2),V=n(5),K={isAuthenticated:!1,user:{}},W={settings:[{}],currencies:[{}]},z=n(46),J=Object(B.c)({authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case R.e:var n=t.payload&&t.payload.user?t.payload.user:{},a=t.payload&&t.payload.scope?t.payload.scope:{},r=n.verified?n.verified:0;return{isAuthenticated:!Object(V.isEmpty)(n),isVerified:!!r,scope:a};case R.h:return localStorage.setItem("user",JSON.stringify(t.user)),Object(q.a)({},e,{user:t.user});default:return e}},appStatusReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"".concat(R.f):return localStorage.setItem("currencies",JSON.stringify(t.currencies)),Object(q.a)({},e,{currencies:t.currencies});case"".concat(R.g):return localStorage.setItem("settings",JSON.stringify(t.settings)),Object(q.a)({},e,{settings:t.settings});default:return e}},ThemeOptions:z.a});var Q=n(37),X=n.n(Q),Y=n(16),$=n(12),Z=(n(104),Object(B.e)(J,Object(B.d)(Object(B.a)(x.a),window.devToolsExtension?window.devToolsExtension():function(e){return e}))),ee=document.getElementById("root");if(localStorage.getItem("jwtToken"))try{var te=X()(localStorage.getItem("jwtToken"));te.exp>(new Date).getTime()/1e3?(Object(Y.a)(localStorage.getItem("jwtToken")),Z.dispatch(Object($.b)(te))):(localStorage.removeItem("jwtToken"),Object(Y.a)(!1),Z.dispatch(Object($.b)({})))}catch(ie){localStorage.removeItem("jwtToken"),Object(Y.a)(!1),Z.dispatch(Object($.b)({}))}if(localStorage.getItem("user"))try{var ne=JSON.parse(localStorage.getItem("user"));Z.dispatch(Object($.c)(ne))}catch(ie){}if(localStorage.getItem("currencies"))try{var ae=JSON.parse(localStorage.getItem("currencies"));Z.dispatch(I(ae))}catch(ie){}if(localStorage.getItem("settings"))try{var re=JSON.parse(localStorage.getItem("settings"));Z.dispatch(N(re))}catch(ie){}var oe;oe=H,i.a.render(r.a.createElement(b.a,{store:Z},r.a.createElement(c.a,null,r.a.createElement(oe,null))),ee),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},12:function(e,t,n){"use strict";n.d(t,"b",function(){return l}),n.d(t,"c",function(){return d}),n.d(t,"a",function(){return E});var a=n(16),r=n(3),o=n(35),i=n(14),c=n(27),u=n(9),s=n(6);function l(e){return{type:r.e,payload:e}}function d(e){return{type:r.h,user:e}}function E(){return function(e){e(Object(o.a)(i.a.Auth.logout,{},{isSilent:!0})),localStorage.removeItem("jwtToken"),Object(a.a)(!1),e(l({})),e(Object(c.a)({type:"success",text:Object(u.a)(s.a.LOGOUT_SUCCESS)}))}}},14:function(e,t,n){"use strict";var a=n(26),r=n(9),o=Object(r.b)("API_BASE_URL"),i=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("mock-api"!==Object(r.b)("ENV"))return a({method:e,url:t,data:n,crossDomain:!0,headers:{"Content-Type":"application/json",Accept:"application/json"}})},c={login:function(e){return i("POST",o+"/login",e)},logout:function(){return i("PUT",o+"/logout")},register:function(e){return i("POST",o+"/register",e)},forgotPassword:function(e){return i("POST",o+"/forgot-password",e)},resetPassword:function(e){return i("PUT",o+"/reset-password",e)}},u={all:function(e){return i("GET",o+"/users?"+e)},get:function(e){return i("GET",o+"/users/".concat(e))},export:function(){return i("GET",o+"/users/export")},create:function(e){return i("POST",o+"/users",e)},update:function(e){return i("PUT",o+"/users/"+e.id,e)},updateMultiple:function(e){return i("PUT",o+"/users",e)},deleteMultiple:function(e){return i("DELETE",o+"/users",e)}},s={all:function(e){return i("GET",o+"/permissions?"+e)},get:function(e){return i("GET",o+"/permissions/".concat(e))},create:function(e){return i("POST",o+"/permissions",e)},update:function(e){return i("PUT",o+"/permissions/"+e.id,e)},deleteMultiple:function(e){return i("DELETE",o+"/permissions",e)}},l={all:function(e){return i("GET",o+"/roles?"+e)},get:function(e){return i("GET",o+"/roles/".concat(e))},create:function(e){return i("POST",o+"/roles",e)},update:function(e){return i("PUT",o+"/roles/"+e.id,e)},deleteMultiple:function(e){return i("DELETE",o+"/roles",e)}},d={slots:{all:function(e){return i("GET",o+"/lottery/slots?"+e)},get:function(e){return i("GET",o+"/lottery/slots/".concat(e.id,"?")+e.query)},getWinners:function(e){return i("GET",o+"/lottery/slots/winners?"+e.query)},create:function(e){return i("POST",o+"/lottery/slots",e)},update:function(e){return i("PUT",o+"/lottery/slots/"+e.id,e)},deleteMultiple:function(e){return i("DELETE",o+"/lottery/slots",e)}}},E={all:function(e){return i("GET",o+"/wallets?"+e)},withdrawRequests:function(e){return i("GET",o+"/wallets/withdraw-requests?"+e)},updateMultipleWithdrawRequest:function(e){return i("PUT",o+"/wallets/withdraw-requests",e)}},b={all:function(e){return i("GET",o+"/settings?"+e)},update:function(e){return i("PUT",o+"/settings/"+e.id,e)}},S={all:function(e){return i("GET",o+"/currencies?"+e.query)},create:function(e){return i("POST",o+"/currencies",e)},update:function(e){return i("PUT",o+"/currencies/"+e.id,e)},deleteMultiple:function(e){return i("DELETE",o+"/currencies",e)}},p={getStats:function(e){return i("GET",o+"/dashboard/get-stats?"+e)}},f={all:function(e){return i("GET",o+"/pages?"+e)},get:function(e){return i("GET",o+"/pages/".concat(e))},create:function(e){return i("POST",o+"/pages",e)},update:function(e){return i("PUT",o+"/pages/"+e.id,e)},delete:function(e){return i("DELETE",o+"/pages/"+e.id,e)}},O={get:function(e){return i("GET",o+"/seo/"+e)},save:function(e){return i("POST",o+"/seo",e)}};t.a={Auth:c,Users:u,Permissions:s,Roles:l,Lottery:d,Wallet:E,Settings:b,Currencies:S,Dashboard:p,Pages:f,Seo:O}},16:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=n(26),r=n.n(a);function o(e){e?r.a.defaults.headers.common.Authorization="Bearer ".concat(e):delete r.a.defaults.headers.common.Authorization}},27:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n(3);function r(e){return{type:a.a,message:e}}},3:function(e,t,n){"use strict";n.d(t,"a",function(){return a}),n.d(t,"c",function(){return r}),n.d(t,"b",function(){return o}),n.d(t,"d",function(){return i}),n.d(t,"e",function(){return c}),n.d(t,"g",function(){return u}),n.d(t,"f",function(){return s}),n.d(t,"h",function(){return l});var a="ADD_FLASH_MESSAGE",r="DELETE_FLASH_MESSAGE",o="ADD_LOADING_MESSAGE",i="DELETE_LOADING_MESSAGE",c="SET_AUTH",u="SET_SETTINGS",s="SET_CURRENCIES",l="SET_USER"},35:function(e,t,n){"use strict";var a=n(16),r=n(37),o=n.n(r),i=n(27),c=n(12),u=n(9),s=n(6),l=n(3);function d(){return{type:l.d}}function E(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{isSilent:!1,message:"Loading..."};return function(r){return n.isSilent||r(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return{type:l.b,loadingMessage:e}}(n.message)),new Promise(function(l,E){e(t).then(function(e){n.isSilent||r(d()),e&&e.data&&(!function(e,t,n){var r=t.token;r&&(localStorage.setItem("jwtToken",r),Object(a.a)(r),e(Object(c.b)(o()(r))));var s=t.user;s&&(localStorage.setItem("user",s),e(Object(c.c)(s)));t.successCode&&"FETCHED"!==t.successCode&&"TRACKED"!==t.successCode&&!n&&e(Object(i.a)({type:"success",text:Object(u.a)(t.successCode)}))}(r,e.data,n.isSilent),l(e.data)),e&&l(e.data)},function(e){n.isSilent||r(d()),e&&e.response&&e.response.data&&(!function(e,t,n){t.errorCode&&(Object(u.a)(t.errorCode)!==s.a.ERR_TOKEN_EXPIRED&&Object(u.a)(t.errorCode)!==s.a.ERR_TOKEN_INVALID&&Object(u.a)(t.errorCode)!==s.a.ERR_TOKEN_USER_NOT_FOUND||e(Object(c.a)()),n||e(Object(i.a)({type:"error",text:Object(u.a)(t.errorCode)})))}(r,e.response.data,n.isSilent),E(e.response.data))})})}}n.d(t,"a",function(){return E})},46:function(e,t,n){"use strict";n.d(t,"f",function(){return R}),n.d(t,"i",function(){return I}),n.d(t,"k",function(){return N}),n.d(t,"q",function(){return A}),n.d(t,"o",function(){return P}),n.d(t,"p",function(){return y}),n.d(t,"n",function(){return L}),n.d(t,"j",function(){return v}),n.d(t,"g",function(){return D}),n.d(t,"l",function(){return j}),n.d(t,"m",function(){return C}),n.d(t,"h",function(){return M}),n.d(t,"b",function(){return w}),n.d(t,"r",function(){return G}),n.d(t,"e",function(){return U}),n.d(t,"d",function(){return F}),n.d(t,"c",function(){return k}),n.d(t,"a",function(){return H});var a=n(2),r=n(49),o=n.n(r),i="THEME_OPTIONS/SET_ENABLE_BACKGROUND_IMAGE",c="THEME_OPTIONS/SET_ENABLE_MOBILE_MENU",u="THEME_OPTIONS/SET_ENABLE_MOBILE_MENU_SMALL",s="THEME_OPTIONS/SET_ENABLE_FIXED_HEADER",l="THEME_OPTIONS/SET_ENABLE_HEADER_SHADOW",d="THEME_OPTIONS/SET_ENABLE_SIDEBAR_SHADOW",E="THEME_OPTIONS/SET_ENABLE_FIXED_SIDEBAR",b="THEME_OPTIONS/SET_ENABLE_CLOSED_SIDEBAR",S="THEME_OPTIONS/SET_ENABLE_FIXED_FOOTER",p="THEME_OPTIONS/SET_ENABLE_PAGETITLE_ICON",f="THEME_OPTIONS/SET_ENABLE_PAGETITLE_SUBHEADING",O="THEME_OPTIONS/SET_ENABLE_PAGE_TABS_ALT",m="THEME_OPTIONS/SET_BACKGROUND_IMAGE",g="THEME_OPTIONS/SET_BACKGROUND_COLOR",T="THEME_OPTIONS/SET_COLOR_SCHEME",_="THEME_OPTIONS/SET_BACKGROUND_IMAGE_OPACITY",h="THEME_OPTIONS/SET_HEADER_BACKGROUND_COLOR",R=function(e){return{type:i,enableBackgroundImage:e}},I=function(e){return{type:s,enableFixedHeader:e}},N=function(e){return{type:l,enableHeaderShadow:e}},A=function(e){return{type:d,enableSidebarShadow:e}},P=function(e){return{type:p,enablePageTitleIcon:e}},y=function(e){return{type:f,enablePageTitleSubheading:e}},L=function(e){return{type:O,enablePageTabsAlt:e}},v=function(e){return{type:E,enableFixedSidebar:e}},D=function(e){return{type:b,enableClosedSidebar:e}},j=function(e){return{type:c,enableMobileMenu:e}},C=function(e){return{type:u,enableMobileMenuSmall:e}},M=function(e){return{type:S,enableFixedFooter:e}},w=function(e){return{type:g,backgroundColor:e}},G=function(e){return{type:h,headerBackgroundColor:e}},U=function(e){return{type:T,colorScheme:e}},F=function(e){return{type:_,backgroundImageOpacity:e}},k=function(e){return{type:m,backgroundImage:e}};function H(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{backgroundColor:"",headerBackgroundColor:"",enableMobileMenuSmall:"",enableBackgroundImage:!1,enableClosedSidebar:!1,enableFixedHeader:!0,enableHeaderShadow:!0,enableSidebarShadow:!0,enableFixedFooter:!0,enableFixedSidebar:!0,colorScheme:"white",backgroundImage:o.a,backgroundImageOpacity:"opacity-06",enablePageTitleIcon:!0,enablePageTitleSubheading:!0,enablePageTabsAlt:!0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case i:return Object(a.a)({},e,{enableBackgroundImage:t.enableBackgroundImage});case s:return Object(a.a)({},e,{enableFixedHeader:t.enableFixedHeader});case l:return Object(a.a)({},e,{enableHeaderShadow:t.enableHeaderShadow});case d:return Object(a.a)({},e,{enableSidebarShadow:t.enableSidebarShadow});case p:return Object(a.a)({},e,{enablePageTitleIcon:t.enablePageTitleIcon});case f:return Object(a.a)({},e,{enablePageTitleSubheading:t.enablePageTitleSubheading});case O:return Object(a.a)({},e,{enablePageTabsAlt:t.enablePageTabsAlt});case E:return Object(a.a)({},e,{enableFixedSidebar:t.enableFixedSidebar});case c:return Object(a.a)({},e,{enableMobileMenu:t.enableMobileMenu});case u:return Object(a.a)({},e,{enableMobileMenuSmall:t.enableMobileMenuSmall});case b:return Object(a.a)({},e,{enableClosedSidebar:t.enableClosedSidebar});case S:return Object(a.a)({},e,{enableFixedFooter:t.enableFixedFooter});case g:return Object(a.a)({},e,{backgroundColor:t.backgroundColor});case h:return Object(a.a)({},e,{headerBackgroundColor:t.headerBackgroundColor});case T:return Object(a.a)({},e,{colorScheme:t.colorScheme});case m:return Object(a.a)({},e,{backgroundImage:t.backgroundImage});case _:return Object(a.a)({},e,{backgroundImageOpacity:t.backgroundImageOpacity})}return e}},49:function(e,t,n){e.exports=n.p+"static/media/city1.ebc5562d.jpg"},6:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={LOADING_USER_CHECK:"Checking if user already exist...",UPDATING:"Updating...",SAVING:"Saving...",REFRESHING:"Refreshing...",REGISTERING:"Creating your account...",LOGGING:"Logging...",VERIFYING:"Verifying...",SENDING_EMAIL:"Sending email...",LOGIN_SUCCESS:"Logged in successfully",LOGOUT_SUCCESS:"Logged out successfully",SAVED:"Saved",UPDATED:"Updated",VERIFIED:"User verified successfully",FORGOT_EMAIL_SENT:"Forgot password email sent",PASSWORD_UPDATED:"Password updated successfully",USER_REGISTERED:"Registered successfully",VERIFICATION_EMAIL_SENT:"Verification email sent",ERR_VALIDATION_FAILED:"Validation Failed",ERR_EMAIL_ALREADY_EXIST:"User with given email is already registered",ERR_EMAIL_INVALID:"Invalid Email",ERR_EMAIL_REQUIRED:"Email is required",ERR_FIRST_NAME_REQUIRED:"First Name is required",ERR_LAST_NAME_REQUIRED:"Last Name is required",ERR_PASSWORD_CONFIRM_NOT_MATCHING:"Password and Confirm Password must match",ERR_PASSWORD_INVALID:"Password is invalid",ERR_PASSWORD_REQUIRED:"Password is required",ERR_PHONE_NUMBER_REQUIRED:"Phone Number is required",ERR_PHONE_NUMBER_INVALID:"Phone Number is invalid",ERR_URL_INVALID:"Url is invalid",ERR_URL_REQUIRED:"Url is required",ERR_INVALID_CREDENTIALS:"Invalid Credentials",ERR_TOKEN_EXPIRED:"User has been logged out due to inactivity",ERR_TOKEN_INVALID:"Token invalid",ERR_TOKEN_NOT_PROVIDED:"Token not provided",ERR_TOKEN_USER_NOT_FOUND:"User not found",ERR_INVALID_REQUEST:"Invalid Request",ERR_DATABASE:"Database error",ERR_MODEL_NOT_FOUND:"Couldn't find the user",ERR_METHOD_NOT_ALLOWED:"Request method not allowed",ERR_NOT_FOUND:"Couldn't find the page",ERR_RESTRICTED:"You don't have enough permission to view this page",ERR_MULTIPLE_BUSINESS:"You can't have multiple business",ERR_UNKNOWN:"Something went wrong",ERR_LOGOUT:"Failed to logout",ERR_LOCKED:"Locked"}},71:function(e,t,n){e.exports=n(105)},76:function(e,t,n){},9:function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return c}),n.d(t,"d",function(){return u});n(34);var a=n(5),r=n(6);n(44);function o(e){return Object({NODE_ENV:"production",PUBLIC_URL:"",REACT_APP_ENV:"production",REACT_APP_APP_URL:"https://lotterycamp.com",REACT_APP_APP_SOCKET_URL:"https://api.lotterycamp.com",REACT_APP_API_BASE_URL:"https://api.lotterycamp.com/api/v1",REACT_APP_RECAPTCHA_SITE_KEY:""})["REACT_APP_"+e]}function i(e){return r.a[e]?r.a[e]:r.a.ERR_UNKNOWN}function c(e){!(arguments.length>1&&void 0!==arguments[1])||arguments[1];var t=parseFloat(e)+" coins";return e?t:""}function u(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e+" coins";if(!e)return"";try{var r=JSON.parse(localStorage.getItem("currencies")),o=JSON.parse(localStorage.getItem("settings")),i=a.find(o,function(e){return"app_currency"===e.key}),c=a.find(r,{currency:i.value});n=parseFloat((e/c.value_in_bits).toFixed(6)),t&&(n+=" "+i.value)}catch(u){}return n}}},[[71,6,8]]]);
//# sourceMappingURL=main.09ff465a.chunk.js.map