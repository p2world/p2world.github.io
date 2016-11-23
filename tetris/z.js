var Zepto=function(){function t(t){return null==t?String(t):J[W.call(t)]||"object"}function n(n){return"function"==t(n)}function e(t){return null!=t&&t==t.window}function i(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function r(n){return"object"==t(n)}function o(t){return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){return t instanceof Array}function u(t){return"number"==typeof t.length}function c(t){return P.call(t,function(t){return null!=t})}function a(t){return t.length>0?C.fn.concat.apply([],t):t}function l(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function f(t){return t in j?j[t]:j[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function h(t,n){return"number"!=typeof n||M[l(t)]?n:n+"px"}function p(t){var n,e;return Z[t]||(n=L.createElement(t),L.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),n.parentNode.removeChild(n),"none"==e&&(e="block"),Z[t]=e),Z[t]}function d(t){return"children"in t?$.call(t.children):C.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function g(t,n,e){for(E in n)e&&(o(n[E])||s(n[E]))?(o(n[E])&&!o(t[E])&&(t[E]={}),s(n[E])&&!s(t[E])&&(t[E]=[]),g(t[E],n[E],e)):n[E]!==x&&(t[E]=n[E])}function m(t,n){return null==n?C(t):C(t).filter(n)}function v(t,e,i,r){return n(e)?e.call(t,i,r):e}function y(t,n,e){null==e?t.removeAttribute(n):t.setAttribute(n,e)}function b(t,n){var e=t.className,i=e&&e.baseVal!==x;return n===x?i?e.baseVal:e:void(i?e.baseVal=n:t.className=n)}function w(t){var n;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?C.parseJSON(t):t:n):t}catch(e){return t}}function N(t,n){n(t);for(var e in t.childNodes)N(t.childNodes[e],n)}var x,E,C,O,T,S,A=[],$=A.slice,P=A.filter,L=window.document,Z={},j={},M={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},q=/^\s*<(\w+|!)[^>]*>/,z=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,B=/^(?:body|html)$/i,R=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],_=["after","prepend","before","append"],F=L.createElement("table"),H=L.createElement("tr"),I={tr:L.createElement("tbody"),tbody:F,thead:F,tfoot:F,td:H,th:H,"*":L.createElement("div")},U=/complete|loaded|interactive/,D=/^[\w-]*$/,J={},W=J.toString,X={},Y=L.createElement("div"),G={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"};return X.matches=function(t,n){if(!n||!t||1!==t.nodeType)return!1;var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(e)return e.call(t,n);var i,r=t.parentNode,o=!r;return o&&(r=Y).appendChild(t),i=~X.qsa(r,n).indexOf(t),o&&Y.removeChild(t),i},T=function(t){return t.replace(/-+(.)?/g,function(t,n){return n?n.toUpperCase():""})},S=function(t){return P.call(t,function(n,e){return t.indexOf(n)==e})},X.fragment=function(t,n,e){var i,r,s;return z.test(t)&&(i=C(L.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(k,"<$1></$2>")),n===x&&(n=q.test(t)&&RegExp.$1),n in I||(n="*"),s=I[n],s.innerHTML=""+t,i=C.each($.call(s.childNodes),function(){s.removeChild(this)})),o(e)&&(r=C(i),C.each(e,function(t,n){V.indexOf(t)>-1?r[t](n):r.attr(t,n)})),i},X.Z=function(t,n){return t=t||[],t.__proto__=C.fn,t.selector=n||"",t},X.isZ=function(t){return t instanceof X.Z},X.init=function(t,e){var i;if(!t)return X.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&q.test(t))i=X.fragment(t,RegExp.$1,e),t=null;else{if(e!==x)return C(e).find(t);i=X.qsa(L,t)}else{if(n(t))return C(L).ready(t);if(X.isZ(t))return t;if(s(t))i=c(t);else if(r(t))i=[t],t=null;else if(q.test(t))i=X.fragment(t.trim(),RegExp.$1,e),t=null;else{if(e!==x)return C(e).find(t);i=X.qsa(L,t)}}return X.Z(i,t)},C=function(t,n){return X.init(t,n)},C.extend=function(t){var n,e=$.call(arguments,1);return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){g(t,e,n)}),t},X.qsa=function(t,n){var e,r="#"==n[0],o=!r&&"."==n[0],s=r||o?n.slice(1):n,u=D.test(s);return i(t)&&u&&r?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:$.call(u&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n))},C.contains=function(t,n){return t!==n&&t.contains(n)},C.type=t,C.isFunction=n,C.isWindow=e,C.isArray=s,C.isPlainObject=o,C.isEmptyObject=function(t){var n;for(n in t)return!1;return!0},C.inArray=function(t,n,e){return A.indexOf.call(n,t,e)},C.camelCase=T,C.trim=function(t){return null==t?"":String.prototype.trim.call(t)},C.uuid=0,C.support={},C.expr={},C.map=function(t,n){var e,i,r,o=[];if(u(t))for(i=0;i<t.length;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),null!=e&&o.push(e);return a(o)},C.each=function(t,n){var e,i;if(u(t)){for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;return t},C.grep=function(t,n){return P.call(t,n)},window.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){J["[object "+n+"]"]=n.toLowerCase()}),C.fn={forEach:A.forEach,reduce:A.reduce,push:A.push,sort:A.sort,indexOf:A.indexOf,concat:A.concat,map:function(t){return C(C.map(this,function(n,e){return t.call(n,e,n)}))},slice:function(){return C($.apply(this,arguments))},ready:function(t){return U.test(L.readyState)&&L.body?t(C):L.addEventListener("DOMContentLoaded",function(){t(C)},!1),this},get:function(t){return t===x?$.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return A.every.call(this,function(n,e){return t.call(n,e,n)!==!1}),this},filter:function(t){return n(t)?this.not(this.not(t)):C(P.call(this,function(n){return X.matches(n,t)}))},add:function(t,n){return C(S(this.concat(C(t,n))))},is:function(t){return this.length>0&&X.matches(this[0],t)},not:function(t){var e=[];if(n(t)&&t.call!==x)this.each(function(n){t.call(this,n)||e.push(this)});else{var i="string"==typeof t?this.filter(t):u(t)&&n(t.item)?$.call(t):C(t);this.forEach(function(t){i.indexOf(t)<0&&e.push(t)})}return C(e)},has:function(t){return this.filter(function(){return r(t)?C.contains(this,t):C(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!r(t)?t:C(t)},last:function(){var t=this[this.length-1];return t&&!r(t)?t:C(t)},find:function(t){var n,e=this;return n="object"==typeof t?C(t).filter(function(){var t=this;return A.some.call(e,function(n){return C.contains(n,t)})}):1==this.length?C(X.qsa(this[0],t)):this.map(function(){return X.qsa(this,t)})},closest:function(t,n){var e=this[0],r=!1;for("object"==typeof t&&(r=C(t));e&&!(r?r.indexOf(e)>=0:X.matches(e,t));)e=e!==n&&!i(e)&&e.parentNode;return C(e)},parents:function(t){for(var n=[],e=this;e.length>0;)e=C.map(e,function(t){return(t=t.parentNode)&&!i(t)&&n.indexOf(t)<0?(n.push(t),t):void 0});return m(n,t)},parent:function(t){return m(S(this.pluck("parentNode")),t)},children:function(t){return m(this.map(function(){return d(this)}),t)},contents:function(){return this.map(function(){return $.call(this.childNodes)})},siblings:function(t){return m(this.map(function(t,n){return P.call(d(n.parentNode),function(t){return t!==n})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return C.map(this,function(n){return n[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=n(t);if(this[0]&&!e)var i=C(t).get(0),r=i.parentNode||this.length>1;return this.each(function(n){C(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){C(this[0]).before(t=C(t));for(var n;(n=t.children()).length;)t=n.first();C(t).append(this)}return this},wrapInner:function(t){var e=n(t);return this.each(function(n){var i=C(this),r=i.contents(),o=e?t.call(this,n):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){C(this).replaceWith(C(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=C(this);(t===x?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return C(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return C(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(n){var e=this.innerHTML;C(this).empty().append(v(this,t,n,e))})},text:function(t){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=t===x?"":""+t})},attr:function(t,n){var e;return"string"==typeof t&&n===x?0==this.length||1!==this[0].nodeType?x:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:this.each(function(e){if(1===this.nodeType)if(r(t))for(E in t)y(this,E,t[E]);else y(this,t,v(this,n,e,this.getAttribute(t)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&y(this,t)})},prop:function(t,n){return t=G[t]||t,n===x?this[0]&&this[0][t]:this.each(function(e){this[t]=v(this,n,e,this[t])})},data:function(t,n){var e=this.attr("data-"+t.replace(R,"-$1").toLowerCase(),n);return null!==e?w(e):x},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(n){this.value=v(this,t,n,this.value)})},offset:function(t){if(t)return this.each(function(n){var e=C(this),i=v(this,t,n,e.offset()),r=e.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==e.css("position")&&(o.position="relative"),e.css(o)});if(0==this.length)return null;var n=this[0].getBoundingClientRect();return{left:n.left+window.pageXOffset,top:n.top+window.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(n,e){if(arguments.length<2){var i=this[0],r=getComputedStyle(i,"");if(!i)return;if("string"==typeof n)return i.style[T(n)]||r.getPropertyValue(n);if(s(n)){var o={};return C.each(s(n)?n:[n],function(t,n){o[n]=i.style[T(n)]||r.getPropertyValue(n)}),o}}var u="";if("string"==t(n))e||0===e?u=l(n)+":"+h(n,e):this.each(function(){this.style.removeProperty(l(n))});else for(E in n)n[E]||0===n[E]?u+=l(E)+":"+h(E,n[E])+";":this.each(function(){this.style.removeProperty(l(E))});return this.each(function(){this.style.cssText+=";"+u})},index:function(t){return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?A.some.call(this,function(t){return this.test(b(t))},f(t)):!1},addClass:function(t){return t?this.each(function(n){O=[];var e=b(this),i=v(this,t,n,e);i.split(/\s+/g).forEach(function(t){C(this).hasClass(t)||O.push(t)},this),O.length&&b(this,e+(e?" ":"")+O.join(" "))}):this},removeClass:function(t){return this.each(function(n){return t===x?b(this,""):(O=b(this),v(this,t,n,O).split(/\s+/g).forEach(function(t){O=O.replace(f(t)," ")}),void b(this,O.trim()))})},toggleClass:function(t,n){return t?this.each(function(e){var i=C(this),r=v(this,t,e,b(this));r.split(/\s+/g).forEach(function(t){(n===x?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===x?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===x?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],n=this.offsetParent(),e=this.offset(),i=B.test(n[0].nodeName)?{top:0,left:0}:n.offset();return e.top-=parseFloat(C(t).css("margin-top"))||0,e.left-=parseFloat(C(t).css("margin-left"))||0,i.top+=parseFloat(C(n[0]).css("border-top-width"))||0,i.left+=parseFloat(C(n[0]).css("border-left-width"))||0,{top:e.top-i.top,left:e.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||L.body;t&&!B.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;return t})}},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});C.fn[t]=function(r){var o,s=this[0];return r===x?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){s=C(this),s.css(t,v(this,r,n,s[t]()))})}}),_.forEach(function(n,e){var i=e%2;C.fn[n]=function(){var n,r,o=C.map(arguments,function(e){return n=t(e),"object"==n||"array"==n||null==e?e:X.fragment(e)}),s=this.length>1;return o.length<1?this:this.each(function(t,n){r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null,o.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!r)return C(t).remove();N(r.insertBefore(t,n),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},C.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){return C(t)[n](this),this}}),X.Z.prototype=C.fn,X.uniq=S,X.deserializeValue=w,C.zepto=X,C}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto);
!function(n){function e(n){return n._zid||(n._zid=l++)}function t(n,t,o,u){if(t=r(t),t.ns)var a=i(t.ns);return(g[e(n)]||[]).filter(function(n){return!(!n||t.e&&n.e!=t.e||t.ns&&!a.test(n.ns)||o&&e(n.fn)!==e(o)||u&&n.sel!=u)})}function r(n){var e=(""+n).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function i(n){return new RegExp("(?:^| )"+n.replace(" "," .* ?")+"(?: |$)")}function o(n,e){return n.del&&!y&&n.e in E||!!e}function u(n){return P[n]||y&&E[n]||n}function a(t,i,a,s,f,l,p){var v=e(t),h=g[v]||(g[v]=[]);i.split(/\s/).forEach(function(e){if("ready"==e)return n(document).ready(a);var i=r(e);i.fn=a,i.sel=f,i.e in P&&(a=function(e){var t=e.relatedTarget;return!t||t!==this&&!n.contains(this,t)?i.fn.apply(this,arguments):void 0}),i.del=l;var v=l||a;i.proxy=function(n){if(n=c(n),!n.isImmediatePropagationStopped()){n.data=s;var e=v.apply(t,n._args==d?[n]:[n].concat(n._args));return e===!1&&(n.preventDefault(),n.stopPropagation()),e}},i.i=h.length,h.push(i),"addEventListener"in t&&t.addEventListener(u(i.e),i.proxy,o(i,p))})}function s(n,r,i,a,s){var c=e(n);(r||"").split(/\s/).forEach(function(e){t(n,e,i,a).forEach(function(e){delete g[c][e.i],"removeEventListener"in n&&n.removeEventListener(u(e.e),e.proxy,o(e,s))})})}function c(e,t){return(t||!e.isDefaultPrevented)&&(t||(t=e),n.each(D,function(n,r){var i=t[n];e[n]=function(){return this[r]=b,i&&i.apply(t,arguments)},e[r]=x}),(t.defaultPrevented!==d?t.defaultPrevented:"returnValue"in t?t.returnValue===!1:t.getPreventDefault&&t.getPreventDefault())&&(e.isDefaultPrevented=b)),e}function f(n){var e,t={originalEvent:n};for(e in n)w.test(e)||n[e]===d||(t[e]=n[e]);return c(t,n)}var d,l=(n.zepto.qsa,1),p=Array.prototype.slice,v=n.isFunction,h=function(n){return"string"==typeof n},g={},m={},y="onfocusin"in window,E={focus:"focusin",blur:"focusout"},P={mouseenter:"mouseover",mouseleave:"mouseout"};m.click=m.mousedown=m.mouseup=m.mousemove="MouseEvents",n.event={add:a,remove:s},n.proxy=function(t,r){if(v(t)){var i=function(){return t.apply(r,arguments)};return i._zid=e(t),i}if(h(r))return n.proxy(t[r],t);throw new TypeError("expected function")},n.fn.bind=function(n,e,t){return this.on(n,e,t)},n.fn.unbind=function(n,e){return this.off(n,e)},n.fn.one=function(n,e,t,r){return this.on(n,e,t,r,1)};var b=function(){return!0},x=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,D={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};n.fn.delegate=function(n,e,t){return this.on(e,n,t)},n.fn.undelegate=function(n,e,t){return this.off(e,n,t)},n.fn.live=function(e,t){return n(document.body).delegate(this.selector,e,t),this},n.fn.die=function(e,t){return n(document.body).undelegate(this.selector,e,t),this},n.fn.on=function(e,t,r,i,o){var u,c,l=this;return e&&!h(e)?(n.each(e,function(n,e){l.on(n,t,r,e,o)}),l):(h(t)||v(i)||i===!1||(i=r,r=t,t=d),(v(r)||r===!1)&&(i=r,r=d),i===!1&&(i=x),l.each(function(d,l){o&&(u=function(n){return s(l,n.type,i),i.apply(this,arguments)}),t&&(c=function(e){var r,o=n(e.target).closest(t,l).get(0);return o&&o!==l?(r=n.extend(f(e),{currentTarget:o,liveFired:l}),(u||i).apply(o,[r].concat(p.call(arguments,1)))):void 0}),a(l,e,i,r,t,c||u)}))},n.fn.off=function(e,t,r){var i=this;return e&&!h(e)?(n.each(e,function(n,e){i.off(n,t,e)}),i):(h(t)||v(r)||r===!1||(r=t,t=d),r===!1&&(r=x),i.each(function(){s(this,e,r,t)}))},n.fn.trigger=function(e,t){return e=h(e)||n.isPlainObject(e)?n.Event(e):c(e),e._args=t,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):n(this).triggerHandler(e,t)})},n.fn.triggerHandler=function(e,r){var i,o;return this.each(function(u,a){i=f(h(e)?n.Event(e):e),i._args=r,i.target=a,n.each(t(a,e.type||e),function(n,e){return o=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),o},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){n.fn[e]=function(n){return n?this.bind(e,n):this.trigger(e)}}),["focus","blur"].forEach(function(e){n.fn[e]=function(n){return n?this.bind(e,n):this.each(function(){try{this[e]()}catch(n){}}),this}}),n.Event=function(n,e){h(n)||(e=n,n=e.type);var t=document.createEvent(m[n]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:t[i]=e[i];return t.initEvent(n,r,!0),c(t)}}(Zepto);
!function(e){function t(e,t,n,o){return Math.abs(e-t)>=Math.abs(n-o)?e-t>0?"Left":"Right":n-o>0?"Up":"Down"}function n(){p=null,g.last&&(g.el.trigger("longTap"),g={})}function o(){p&&clearTimeout(p),p=null}function i(){u&&clearTimeout(u),l&&clearTimeout(l),c&&clearTimeout(c),p&&clearTimeout(p),u=l=c=p=null,g={}}function r(e){return("touch"==e.pointerType||e.pointerType==e.MSPOINTER_TYPE_TOUCH)&&e.isPrimary}function a(e,t){return e.type=="pointer"+t||e.type.toLowerCase()=="mspointer"+t}var u,l,c,p,s,g={},T=750;e(document).ready(function(){var f,h,w,y,d=0,m=0;"MSGesture"in window&&(s=new MSGesture,s.target=document.body),e(document).bind("MSGestureEnd",function(e){var t=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;t&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t))}).on("touchstart MSPointerDown pointerdown",function(t){(!(y=a(t,"down"))||r(t))&&(w=y?t:t.touches[0],t.touches&&1===t.touches.length&&g.x2&&(g.x2=void 0,g.y2=void 0),f=Date.now(),h=f-(g.last||f),g.el=e("tagName"in w.target?w.target:w.target.parentNode),u&&clearTimeout(u),g.x1=w.pageX,g.y1=w.pageY,h>0&&250>=h&&(g.isDoubleTap=!0),g.last=f,p=setTimeout(n,T),s&&y&&s.addPointer(t.pointerId))}).on("touchmove MSPointerMove pointermove",function(e){(!(y=a(e,"move"))||r(e))&&(w=y?e:e.touches[0],o(),g.x2=w.pageX,g.y2=w.pageY,d+=Math.abs(g.x1-g.x2),m+=Math.abs(g.y1-g.y2))}).on("touchend MSPointerUp pointerup",function(n){(!(y=a(n,"up"))||r(n))&&(o(),g.x2&&Math.abs(g.x1-g.x2)>30||g.y2&&Math.abs(g.y1-g.y2)>30?c=setTimeout(function(){g.el.trigger("swipe"),g.el.trigger("swipe"+t(g.x1,g.x2,g.y1,g.y2)),g={}},0):"last"in g&&(30>d&&30>m?l=setTimeout(function(){var t=e.Event("tap");t.cancelTouch=i,g.el.trigger(t),g.isDoubleTap?(g.el&&g.el.trigger("doubleTap"),g={}):u=setTimeout(function(){u=null,g.el&&g.el.trigger("singleTap"),g={}},250)},0):g={}),d=m=0)}).on("touchcancel MSPointerCancel pointercancel",i),e(window).on("scroll",i)}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){e.fn[t]=function(e){return this.on(t,e)}})}(Zepto);