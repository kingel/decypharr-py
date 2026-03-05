var Lt=Object.defineProperty;var It=(w,T,O)=>T in w?Lt(w,T,{enumerable:!0,configurable:!0,writable:!0,value:O}):w[T]=O;var Ot=(w,T,O)=>It(w,typeof T!="symbol"?T+"":T,O);var basePath="";function setBasePath(w){basePath=w}function getBasePath(w=""){if(!basePath){const T=[...document.getElementsByTagName("script")],O=T.find(F=>F.hasAttribute("data-shoelace"));if(O)setBasePath(O.getAttribute("data-shoelace"));else{const F=T.find(q=>/shoelace(\.min)?\.js($|\?)/.test(q.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(q.src));let U="";F&&(U=F.getAttribute("src")),setBasePath(U.split("/").slice(0,-1).join("/"))}}return basePath.replace(/\/$/,"")+(w?`/${w.replace(/^\//,"")}`:"")}var __defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__knownSymbol=(w,T)=>(T=Symbol[w])?T:Symbol.for("Symbol."+w),__typeError=w=>{throw TypeError(w)},__defNormalProp=(w,T,O)=>T in w?__defProp(w,T,{enumerable:!0,configurable:!0,writable:!0,value:O}):w[T]=O,__spreadValues=(w,T)=>{for(var O in T||(T={}))__hasOwnProp.call(T,O)&&__defNormalProp(w,O,T[O]);if(__getOwnPropSymbols)for(var O of __getOwnPropSymbols(T))__propIsEnum.call(T,O)&&__defNormalProp(w,O,T[O]);return w},__spreadProps=(w,T)=>__defProps(w,__getOwnPropDescs(T)),__decorateClass=(w,T,O,F)=>{for(var U=F>1?void 0:F?__getOwnPropDesc(T,O):T,q=w.length-1,W;q>=0;q--)(W=w[q])&&(U=(F?W(T,O,U):W(U))||U);return F&&U&&__defProp(T,O,U),U},__accessCheck=(w,T,O)=>T.has(w)||__typeError("Cannot "+O),__privateGet=(w,T,O)=>(__accessCheck(w,T,"read from private field"),T.get(w)),__privateAdd=(w,T,O)=>T.has(w)?__typeError("Cannot add the same private member more than once"):T instanceof WeakSet?T.add(w):T.set(w,O),__privateSet=(w,T,O,F)=>(__accessCheck(w,T,"write to private field"),T.set(w,O),O),__await=function(w,T){this[0]=w,this[1]=T},__yieldStar=w=>{var T=w[__knownSymbol("asyncIterator")],O=!1,F,U={};return T==null?(T=w[__knownSymbol("iterator")](),F=q=>U[q]=W=>T[q](W)):(T=T.call(w),F=q=>U[q]=W=>{if(O){if(O=!1,q==="throw")throw W;return W}return O=!0,{done:!1,value:new __await(new Promise(j=>{var X=T[q](W);X instanceof Object||__typeError("Object expected"),j(X)}),1)}}),U[__knownSymbol("iterator")]=()=>U,F("next"),"throw"in T?F("throw"):U.throw=q=>{throw q},"return"in T&&F("return"),U},blurActiveElement=w=>{var T;const{activeElement:O}=document;O&&w.contains(O)&&((T=document.activeElement)==null||T.blur())};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$2=globalThis,e$7=t$2.ShadowRoot&&(t$2.ShadyCSS===void 0||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4=class{constructor(T,O,F){if(this._$cssResult$=!0,F!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=T,this.t=O}get styleSheet(){let T=this.o;const O=this.t;if(e$7&&T===void 0){const F=O!==void 0&&O.length===1;F&&(T=o$6.get(O)),T===void 0&&((this.o=T=new CSSStyleSheet).replaceSync(this.cssText),F&&o$6.set(O,T))}return T}toString(){return this.cssText}};const r$6=w=>new n$4(typeof w=="string"?w:w+"",void 0,s$2),i$6=(w,...T)=>{const O=w.length===1?w[0]:T.reduce((F,U,q)=>F+(W=>{if(W._$cssResult$===!0)return W.cssText;if(typeof W=="number")return W;throw Error("Value passed to 'css' function must be a 'css' function result: "+W+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(U)+w[q+1],w[0]);return new n$4(O,w,s$2)},S$1=(w,T)=>{if(e$7)w.adoptedStyleSheets=T.map(O=>O instanceof CSSStyleSheet?O:O.styleSheet);else for(const O of T){const F=document.createElement("style"),U=t$2.litNonce;U!==void 0&&F.setAttribute("nonce",U),F.textContent=O.cssText,w.appendChild(F)}},c$2=e$7?w=>w:w=>w instanceof CSSStyleSheet?(T=>{let O="";for(const F of T.cssRules)O+=F.cssText;return r$6(O)})(w):w;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$5,defineProperty:e$6,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$5,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$2=globalThis,c$1=a$2.trustedTypes,l$4=c$1?c$1.emptyScript:"",p$2=a$2.reactiveElementPolyfillSupport,d$1=(w,T)=>w,u$2={toAttribute(w,T){switch(T){case Boolean:w=w?l$4:null;break;case Object:case Array:w=w==null?w:JSON.stringify(w)}return w},fromAttribute(w,T){let O=w;switch(T){case Boolean:O=w!==null;break;case Number:O=w===null?null:Number(w);break;case Object:case Array:try{O=JSON.parse(w)}catch{O=null}}return O}},f$1=(w,T)=>!i$5(w,T),b$1={attribute:!0,type:String,converter:u$2,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),a$2.litPropertyMetadata??(a$2.litPropertyMetadata=new WeakMap);let y$1=class extends HTMLElement{static addInitializer(T){this._$Ei(),(this.l??(this.l=[])).push(T)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(T,O=b$1){if(O.state&&(O.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(T)&&((O=Object.create(O)).wrapped=!0),this.elementProperties.set(T,O),!O.noAccessor){const F=Symbol(),U=this.getPropertyDescriptor(T,F,O);U!==void 0&&e$6(this.prototype,T,U)}}static getPropertyDescriptor(T,O,F){const{get:U,set:q}=h$1(this.prototype,T)??{get(){return this[O]},set(W){this[O]=W}};return{get:U,set(W){const j=U==null?void 0:U.call(this);q==null||q.call(this,W),this.requestUpdate(T,j,F)},configurable:!0,enumerable:!0}}static getPropertyOptions(T){return this.elementProperties.get(T)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const T=n$3(this);T.finalize(),T.l!==void 0&&(this.l=[...T.l]),this.elementProperties=new Map(T.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const O=this.properties,F=[...r$5(O),...o$5(O)];for(const U of F)this.createProperty(U,O[U])}const T=this[Symbol.metadata];if(T!==null){const O=litPropertyMetadata.get(T);if(O!==void 0)for(const[F,U]of O)this.elementProperties.set(F,U)}this._$Eh=new Map;for(const[O,F]of this.elementProperties){const U=this._$Eu(O,F);U!==void 0&&this._$Eh.set(U,O)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(T){const O=[];if(Array.isArray(T)){const F=new Set(T.flat(1/0).reverse());for(const U of F)O.unshift(c$2(U))}else T!==void 0&&O.push(c$2(T));return O}static _$Eu(T,O){const F=O.attribute;return F===!1?void 0:typeof F=="string"?F:typeof T=="string"?T.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var T;this._$ES=new Promise(O=>this.enableUpdating=O),this._$AL=new Map,this._$E_(),this.requestUpdate(),(T=this.constructor.l)==null||T.forEach(O=>O(this))}addController(T){var O;(this._$EO??(this._$EO=new Set)).add(T),this.renderRoot!==void 0&&this.isConnected&&((O=T.hostConnected)==null||O.call(T))}removeController(T){var O;(O=this._$EO)==null||O.delete(T)}_$E_(){const T=new Map,O=this.constructor.elementProperties;for(const F of O.keys())this.hasOwnProperty(F)&&(T.set(F,this[F]),delete this[F]);T.size>0&&(this._$Ep=T)}createRenderRoot(){const T=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(T,this.constructor.elementStyles),T}connectedCallback(){var T;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(T=this._$EO)==null||T.forEach(O=>{var F;return(F=O.hostConnected)==null?void 0:F.call(O)})}enableUpdating(T){}disconnectedCallback(){var T;(T=this._$EO)==null||T.forEach(O=>{var F;return(F=O.hostDisconnected)==null?void 0:F.call(O)})}attributeChangedCallback(T,O,F){this._$AK(T,F)}_$ET(T,O){var q;const F=this.constructor.elementProperties.get(T),U=this.constructor._$Eu(T,F);if(U!==void 0&&F.reflect===!0){const W=(((q=F.converter)==null?void 0:q.toAttribute)!==void 0?F.converter:u$2).toAttribute(O,F.type);this._$Em=T,W==null?this.removeAttribute(U):this.setAttribute(U,W),this._$Em=null}}_$AK(T,O){var q,W;const F=this.constructor,U=F._$Eh.get(T);if(U!==void 0&&this._$Em!==U){const j=F.getPropertyOptions(U),X=typeof j.converter=="function"?{fromAttribute:j.converter}:((q=j.converter)==null?void 0:q.fromAttribute)!==void 0?j.converter:u$2;this._$Em=U;const K=X.fromAttribute(O,j.type);this[U]=K??((W=this._$Ej)==null?void 0:W.get(U))??K,this._$Em=null}}requestUpdate(T,O,F,U=!1,q){var W;if(T!==void 0){const j=this.constructor;if(U===!1&&(q=this[T]),F??(F=j.getPropertyOptions(T)),!((F.hasChanged??f$1)(q,O)||F.useDefault&&F.reflect&&q===((W=this._$Ej)==null?void 0:W.get(T))&&!this.hasAttribute(j._$Eu(T,F))))return;this.C(T,O,F)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(T,O,{useDefault:F,reflect:U,wrapped:q},W){F&&!(this._$Ej??(this._$Ej=new Map)).has(T)&&(this._$Ej.set(T,W??O??this[T]),q!==!0||W!==void 0)||(this._$AL.has(T)||(this.hasUpdated||F||(O=void 0),this._$AL.set(T,O)),U===!0&&this._$Em!==T&&(this._$Eq??(this._$Eq=new Set)).add(T))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(O){Promise.reject(O)}const T=this.scheduleUpdate();return T!=null&&await T,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var F;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[q,W]of this._$Ep)this[q]=W;this._$Ep=void 0}const U=this.constructor.elementProperties;if(U.size>0)for(const[q,W]of U){const{wrapped:j}=W,X=this[q];j!==!0||this._$AL.has(q)||X===void 0||this.C(q,void 0,W,X)}}let T=!1;const O=this._$AL;try{T=this.shouldUpdate(O),T?(this.willUpdate(O),(F=this._$EO)==null||F.forEach(U=>{var q;return(q=U.hostUpdate)==null?void 0:q.call(U)}),this.update(O)):this._$EM()}catch(U){throw T=!1,this._$EM(),U}T&&this._$AE(O)}willUpdate(T){}_$AE(T){var O;(O=this._$EO)==null||O.forEach(F=>{var U;return(U=F.hostUpdated)==null?void 0:U.call(F)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(T)),this.updated(T)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(T){return!0}update(T){this._$Eq&&(this._$Eq=this._$Eq.forEach(O=>this._$ET(O,this[O]))),this._$EM()}updated(T){}firstUpdated(T){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$2==null||p$2({ReactiveElement:y$1}),(a$2.reactiveElementVersions??(a$2.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$1=globalThis,i$4=w=>w,s$1=t$1.trustedTypes,e$5=s$1?s$1.createPolicy("lit-html",{createHTML:w=>w}):void 0,h="$lit$",o$4=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$4,r$4=`<${n$2}>`,l$3=document,c=()=>l$3.createComment(""),a$1=w=>w===null||typeof w!="object"&&typeof w!="function",u$1=Array.isArray,d=w=>u$1(w)||typeof(w==null?void 0:w[Symbol.iterator])=="function",f=`[ 	
\f\r]`,v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=w=>(T,...O)=>({_$litType$:w,strings:T,values:O}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$3.createTreeWalker(l$3,129);function V(w,T){if(!u$1(w)||!w.hasOwnProperty("raw"))throw Error("invalid template strings array");return e$5!==void 0?e$5.createHTML(T):T}const N=(w,T)=>{const O=w.length-1,F=[];let U,q=T===2?"<svg>":T===3?"<math>":"",W=v;for(let j=0;j<O;j++){const X=w[j];let K,J,Y=-1,G=0;for(;G<X.length&&(W.lastIndex=G,J=W.exec(X),J!==null);)G=W.lastIndex,W===v?J[1]==="!--"?W=_:J[1]!==void 0?W=m$1:J[2]!==void 0?(y.test(J[2])&&(U=RegExp("</"+J[2],"g")),W=p$1):J[3]!==void 0&&(W=p$1):W===p$1?J[0]===">"?(W=U??v,Y=-1):J[1]===void 0?Y=-2:(Y=W.lastIndex-J[2].length,K=J[1],W=J[3]===void 0?p$1:J[3]==='"'?$:g):W===$||W===g?W=p$1:W===_||W===m$1?W=v:(W=p$1,U=void 0);const Q=W===p$1&&w[j+1].startsWith("/>")?" ":"";q+=W===v?X+r$4:Y>=0?(F.push(K),X.slice(0,Y)+h+X.slice(Y)+o$4+Q):X+o$4+(Y===-2?j:Q)}return[V(w,q+(w[O]||"<?>")+(T===2?"</svg>":T===3?"</math>":"")),F]};class S{constructor({strings:T,_$litType$:O},F){let U;this.parts=[];let q=0,W=0;const j=T.length-1,X=this.parts,[K,J]=N(T,O);if(this.el=S.createElement(K,F),P.currentNode=this.el.content,O===2||O===3){const Y=this.el.content.firstChild;Y.replaceWith(...Y.childNodes)}for(;(U=P.nextNode())!==null&&X.length<j;){if(U.nodeType===1){if(U.hasAttributes())for(const Y of U.getAttributeNames())if(Y.endsWith(h)){const G=J[W++],Q=U.getAttribute(Y).split(o$4),tt=/([.?@])?(.*)/.exec(G);X.push({type:1,index:q,name:tt[2],strings:Q,ctor:tt[1]==="."?I:tt[1]==="?"?L:tt[1]==="@"?z:H}),U.removeAttribute(Y)}else Y.startsWith(o$4)&&(X.push({type:6,index:q}),U.removeAttribute(Y));if(y.test(U.tagName)){const Y=U.textContent.split(o$4),G=Y.length-1;if(G>0){U.textContent=s$1?s$1.emptyScript:"";for(let Q=0;Q<G;Q++)U.append(Y[Q],c()),P.nextNode(),X.push({type:2,index:++q});U.append(Y[G],c())}}}else if(U.nodeType===8)if(U.data===n$2)X.push({type:2,index:q});else{let Y=-1;for(;(Y=U.data.indexOf(o$4,Y+1))!==-1;)X.push({type:7,index:q}),Y+=o$4.length-1}q++}}static createElement(T,O){const F=l$3.createElement("template");return F.innerHTML=T,F}}function M(w,T,O=w,F){var W,j;if(T===E)return T;let U=F!==void 0?(W=O._$Co)==null?void 0:W[F]:O._$Cl;const q=a$1(T)?void 0:T._$litDirective$;return(U==null?void 0:U.constructor)!==q&&((j=U==null?void 0:U._$AO)==null||j.call(U,!1),q===void 0?U=void 0:(U=new q(w),U._$AT(w,O,F)),F!==void 0?(O._$Co??(O._$Co=[]))[F]=U:O._$Cl=U),U!==void 0&&(T=M(w,U._$AS(w,T.values),U,F)),T}class R{constructor(T,O){this._$AV=[],this._$AN=void 0,this._$AD=T,this._$AM=O}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(T){const{el:{content:O},parts:F}=this._$AD,U=((T==null?void 0:T.creationScope)??l$3).importNode(O,!0);P.currentNode=U;let q=P.nextNode(),W=0,j=0,X=F[0];for(;X!==void 0;){if(W===X.index){let K;X.type===2?K=new k(q,q.nextSibling,this,T):X.type===1?K=new X.ctor(q,X.name,X.strings,this,T):X.type===6&&(K=new Z(q,this,T)),this._$AV.push(K),X=F[++j]}W!==(X==null?void 0:X.index)&&(q=P.nextNode(),W++)}return P.currentNode=l$3,U}p(T){let O=0;for(const F of this._$AV)F!==void 0&&(F.strings!==void 0?(F._$AI(T,F,O),O+=F.strings.length-2):F._$AI(T[O])),O++}}class k{get _$AU(){var T;return((T=this._$AM)==null?void 0:T._$AU)??this._$Cv}constructor(T,O,F,U){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=T,this._$AB=O,this._$AM=F,this.options=U,this._$Cv=(U==null?void 0:U.isConnected)??!0}get parentNode(){let T=this._$AA.parentNode;const O=this._$AM;return O!==void 0&&(T==null?void 0:T.nodeType)===11&&(T=O.parentNode),T}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(T,O=this){T=M(this,T,O),a$1(T)?T===A||T==null||T===""?(this._$AH!==A&&this._$AR(),this._$AH=A):T!==this._$AH&&T!==E&&this._(T):T._$litType$!==void 0?this.$(T):T.nodeType!==void 0?this.T(T):d(T)?this.k(T):this._(T)}O(T){return this._$AA.parentNode.insertBefore(T,this._$AB)}T(T){this._$AH!==T&&(this._$AR(),this._$AH=this.O(T))}_(T){this._$AH!==A&&a$1(this._$AH)?this._$AA.nextSibling.data=T:this.T(l$3.createTextNode(T)),this._$AH=T}$(T){var q;const{values:O,_$litType$:F}=T,U=typeof F=="number"?this._$AC(T):(F.el===void 0&&(F.el=S.createElement(V(F.h,F.h[0]),this.options)),F);if(((q=this._$AH)==null?void 0:q._$AD)===U)this._$AH.p(O);else{const W=new R(U,this),j=W.u(this.options);W.p(O),this.T(j),this._$AH=W}}_$AC(T){let O=C.get(T.strings);return O===void 0&&C.set(T.strings,O=new S(T)),O}k(T){u$1(this._$AH)||(this._$AH=[],this._$AR());const O=this._$AH;let F,U=0;for(const q of T)U===O.length?O.push(F=new k(this.O(c()),this.O(c()),this,this.options)):F=O[U],F._$AI(q),U++;U<O.length&&(this._$AR(F&&F._$AB.nextSibling,U),O.length=U)}_$AR(T=this._$AA.nextSibling,O){var F;for((F=this._$AP)==null?void 0:F.call(this,!1,!0,O);T!==this._$AB;){const U=i$4(T).nextSibling;i$4(T).remove(),T=U}}setConnected(T){var O;this._$AM===void 0&&(this._$Cv=T,(O=this._$AP)==null||O.call(this,T))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(T,O,F,U,q){this.type=1,this._$AH=A,this._$AN=void 0,this.element=T,this.name=O,this._$AM=U,this.options=q,F.length>2||F[0]!==""||F[1]!==""?(this._$AH=Array(F.length-1).fill(new String),this.strings=F):this._$AH=A}_$AI(T,O=this,F,U){const q=this.strings;let W=!1;if(q===void 0)T=M(this,T,O,0),W=!a$1(T)||T!==this._$AH&&T!==E,W&&(this._$AH=T);else{const j=T;let X,K;for(T=q[0],X=0;X<q.length-1;X++)K=M(this,j[F+X],O,X),K===E&&(K=this._$AH[X]),W||(W=!a$1(K)||K!==this._$AH[X]),K===A?T=A:T!==A&&(T+=(K??"")+q[X+1]),this._$AH[X]=K}W&&!U&&this.j(T)}j(T){T===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,T??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(T){this.element[this.name]=T===A?void 0:T}}class L extends H{constructor(){super(...arguments),this.type=4}j(T){this.element.toggleAttribute(this.name,!!T&&T!==A)}}class z extends H{constructor(T,O,F,U,q){super(T,O,F,U,q),this.type=5}_$AI(T,O=this){if((T=M(this,T,O,0)??A)===E)return;const F=this._$AH,U=T===A&&F!==A||T.capture!==F.capture||T.once!==F.once||T.passive!==F.passive,q=T!==A&&(F===A||U);U&&this.element.removeEventListener(this.name,this,F),q&&this.element.addEventListener(this.name,this,T),this._$AH=T}handleEvent(T){var O;typeof this._$AH=="function"?this._$AH.call(((O=this.options)==null?void 0:O.host)??this.element,T):this._$AH.handleEvent(T)}}class Z{constructor(T,O,F){this.element=T,this.type=6,this._$AN=void 0,this._$AM=O,this.options=F}get _$AU(){return this._$AM._$AU}_$AI(T){M(this,T)}}const B=t$1.litHtmlPolyfillSupport;B==null||B(S,k),(t$1.litHtmlVersions??(t$1.litHtmlVersions=[])).push("3.3.2");const D=(w,T,O)=>{const F=(O==null?void 0:O.renderBefore)??T;let U=F._$litPart$;if(U===void 0){const q=(O==null?void 0:O.renderBefore)??null;F._$litPart$=U=new k(T.insertBefore(c(),q),q,void 0,O??{})}return U._$AI(w),U};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$3=class extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var O;const T=super.createRenderRoot();return(O=this.renderOptions).renderBefore??(O.renderBefore=T.firstChild),T}update(T){const O=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(T),this._$Do=D(O,this.renderRoot,this.renderOptions)}connectedCallback(){var T;super.connectedCallback(),(T=this._$Do)==null||T.setConnected(!0)}disconnectedCallback(){var T;super.disconnectedCallback(),(T=this._$Do)==null||T.setConnected(!1)}render(){return E}};var Pt;i$3._$litElement$=!0,i$3.finalized=!0,(Pt=s.litElementHydrateSupport)==null||Pt.call(s,{LitElement:i$3});const o$3=s.litElementPolyfillSupport;o$3==null||o$3({LitElement:i$3});(s.litElementVersions??(s.litElementVersions=[])).push("4.2.2");var icon_button_styles_default=i$6`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,library={name:"default",resolver:w=>getBasePath(`assets/icons/${w}.svg`)},library_default_default=library,icons={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},systemLibrary={name:"system",resolver:w=>w in icons?`data:image/svg+xml,${encodeURIComponent(icons[w])}`:""},library_system_default=systemLibrary,registry=[library_default_default,library_system_default],watchedIcons=[];function watchIcon(w){watchedIcons.push(w)}function unwatchIcon(w){watchedIcons=watchedIcons.filter(T=>T!==w)}function getIconLibrary(w){return registry.find(T=>T.name===w)}var icon_styles_default=i$6`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function watch(w,T){const O=__spreadValues({waitUntilFirstUpdate:!1},T);return(F,U)=>{const{update:q}=F,W=Array.isArray(w)?w:[w];F.update=function(j){W.forEach(X=>{const K=X;if(j.has(K)){const J=j.get(K),Y=this[K];J!==Y&&(!O.waitUntilFirstUpdate||this.hasUpdated)&&this[U](J,Y)}}),q.call(this,j)}}}var component_styles_default=i$6`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2={attribute:!0,type:String,converter:u$2,reflect:!1,hasChanged:f$1},r$3=(w=o$2,T,O)=>{const{kind:F,metadata:U}=O;let q=globalThis.litPropertyMetadata.get(U);if(q===void 0&&globalThis.litPropertyMetadata.set(U,q=new Map),F==="setter"&&((w=Object.create(w)).wrapped=!0),q.set(O.name,w),F==="accessor"){const{name:W}=O;return{set(j){const X=T.get.call(this);T.set.call(this,j),this.requestUpdate(W,X,w,!0,j)},init(j){return j!==void 0&&this.C(W,void 0,w,j),j}}}if(F==="setter"){const{name:W}=O;return function(j){const X=this[W];T.call(this,j),this.requestUpdate(W,X,w,!0,j)}}throw Error("Unsupported decorator location: "+F)};function n$1(w){return(T,O)=>typeof O=="object"?r$3(w,T,O):((F,U,q)=>{const W=U.hasOwnProperty(q);return U.constructor.createProperty(q,F),W?Object.getOwnPropertyDescriptor(U,q):void 0})(w,T,O)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$2(w){return n$1({...w,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$4=(w,T,O)=>(O.configurable=!0,O.enumerable=!0,Reflect.decorate&&typeof T!="object"&&Object.defineProperty(w,T,O),O);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$3(w,T){return(O,F,U)=>{const q=W=>{var j;return((j=W.renderRoot)==null?void 0:j.querySelector(w))??null};return e$4(O,F,{get(){return q(this)}})}}var _hasRecordedInitialProperties,ShoelaceElement=class extends i$3{constructor(){super(),__privateAdd(this,_hasRecordedInitialProperties,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([w,T])=>{this.constructor.define(w,T)})}emit(w,T){const O=new CustomEvent(w,__spreadValues({bubbles:!0,cancelable:!1,composed:!0,detail:{}},T));return this.dispatchEvent(O),O}static define(w,T=this,O={}){const F=customElements.get(w);if(!F){try{customElements.define(w,T,O)}catch{customElements.define(w,class extends T{},O)}return}let U=" (unknown version)",q=U;"version"in T&&T.version&&(U=" v"+T.version),"version"in F&&F.version&&(q=" v"+F.version),!(U&&q&&U===q)&&console.warn(`Attempted to register <${w}>${U}, but <${w}>${q} has already been registered.`)}attributeChangedCallback(w,T,O){__privateGet(this,_hasRecordedInitialProperties)||(this.constructor.elementProperties.forEach((F,U)=>{F.reflect&&this[U]!=null&&this.initialReflectedProperties.set(U,this[U])}),__privateSet(this,_hasRecordedInitialProperties,!0)),super.attributeChangedCallback(w,T,O)}willUpdate(w){super.willUpdate(w),this.initialReflectedProperties.forEach((T,O)=>{w.has(O)&&this[O]==null&&(this[O]=T)})}};_hasRecordedInitialProperties=new WeakMap;ShoelaceElement.version="2.20.1";ShoelaceElement.dependencies={};__decorateClass([n$1()],ShoelaceElement.prototype,"dir",2);__decorateClass([n$1()],ShoelaceElement.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$2=(w,T)=>(w==null?void 0:w._$litType$)!==void 0,r$1=w=>w.strings===void 0,m={},p=(w,T=m)=>w._$AH=T;var CACHEABLE_ERROR=Symbol(),RETRYABLE_ERROR=Symbol(),parser,iconCache=new Map,SlIcon=class extends ShoelaceElement{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(w,T){var O;let F;if(T!=null&&T.spriteSheet)return this.svg=b`<svg part="svg">
        <use part="use" href="${w}"></use>
      </svg>`,this.svg;try{if(F=await fetch(w,{mode:"cors"}),!F.ok)return F.status===410?CACHEABLE_ERROR:RETRYABLE_ERROR}catch{return RETRYABLE_ERROR}try{const U=document.createElement("div");U.innerHTML=await F.text();const q=U.firstElementChild;if(((O=q==null?void 0:q.tagName)==null?void 0:O.toLowerCase())!=="svg")return CACHEABLE_ERROR;parser||(parser=new DOMParser);const j=parser.parseFromString(q.outerHTML,"text/html").body.querySelector("svg");return j?(j.part.add("svg"),document.adoptNode(j)):CACHEABLE_ERROR}catch{return CACHEABLE_ERROR}}connectedCallback(){super.connectedCallback(),watchIcon(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),unwatchIcon(this)}getIconSource(){const w=getIconLibrary(this.library);return this.name&&w?{url:w.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var w;const{url:T,fromLibrary:O}=this.getIconSource(),F=O?getIconLibrary(this.library):void 0;if(!T){this.svg=null;return}let U=iconCache.get(T);if(U||(U=this.resolveIcon(T,F),iconCache.set(T,U)),!this.initialRender)return;const q=await U;if(q===RETRYABLE_ERROR&&iconCache.delete(T),T===this.getIconSource().url){if(l$2(q)){if(this.svg=q,F){await this.updateComplete;const W=this.shadowRoot.querySelector("[part='svg']");typeof F.mutator=="function"&&W&&F.mutator(W)}return}switch(q){case RETRYABLE_ERROR:case CACHEABLE_ERROR:this.svg=null,this.emit("sl-error");break;default:this.svg=q.cloneNode(!0),(w=F==null?void 0:F.mutator)==null||w.call(F,this.svg),this.emit("sl-load")}}}render(){return this.svg}};SlIcon.styles=[component_styles_default,icon_styles_default];__decorateClass([r$2()],SlIcon.prototype,"svg",2);__decorateClass([n$1({reflect:!0})],SlIcon.prototype,"name",2);__decorateClass([n$1()],SlIcon.prototype,"src",2);__decorateClass([n$1()],SlIcon.prototype,"label",2);__decorateClass([n$1({reflect:!0})],SlIcon.prototype,"library",2);__decorateClass([watch("label")],SlIcon.prototype,"handleLabelChange",1);__decorateClass([watch(["name","src","library"])],SlIcon.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e$2=w=>(...T)=>({_$litDirective$:w,values:T});let i$2=class{constructor(T){}get _$AU(){return this._$AM._$AU}_$AT(T,O,F){this._$Ct=T,this._$AM=O,this._$Ci=F}_$AS(T,O){return this.update(T,O)}update(T,O){return this.render(...O)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=e$2(class extends i$2{constructor(w){var T;if(super(w),w.type!==t.ATTRIBUTE||w.name!=="class"||((T=w.strings)==null?void 0:T.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(w){return" "+Object.keys(w).filter(T=>w[T]).join(" ")+" "}update(w,[T]){var F,U;if(this.st===void 0){this.st=new Set,w.strings!==void 0&&(this.nt=new Set(w.strings.join(" ").split(/\s/).filter(q=>q!=="")));for(const q in T)T[q]&&!((F=this.nt)!=null&&F.has(q))&&this.st.add(q);return this.render(T)}const O=w.element.classList;for(const q of this.st)q in T||(O.remove(q),this.st.delete(q));for(const q in T){const W=!!T[q];W===this.st.has(q)||(U=this.nt)!=null&&U.has(q)||(W?(O.add(q),this.st.add(q)):(O.remove(q),this.st.delete(q)))}return E}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a=Symbol.for(""),o$1=w=>{if((w==null?void 0:w.r)===a)return w==null?void 0:w._$litStatic$},i$1=(w,...T)=>({_$litStatic$:T.reduce((O,F,U)=>O+(q=>{if(q._$litStatic$!==void 0)return q._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${q}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(F)+w[U+1],w[0]),r:a}),l$1=new Map,n=w=>(T,...O)=>{const F=O.length;let U,q;const W=[],j=[];let X,K=0,J=!1;for(;K<F;){for(X=T[K];K<F&&(q=O[K],(U=o$1(q))!==void 0);)X+=U+T[++K],J=!0;K!==F&&j.push(q),W.push(X),K++}if(K===F&&W.push(T[F]),J){const Y=W.join("$$lit$$");(T=l$1.get(Y))===void 0&&(W.raw=W,l$1.set(Y,T=W)),O=j}return w(T,...O)},u=n(b);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=w=>w??A;var SlIconButton=class extends ShoelaceElement{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(w){this.disabled&&(w.preventDefault(),w.stopPropagation())}click(){this.button.click()}focus(w){this.button.focus(w)}blur(){this.button.blur()}render(){const w=!!this.href,T=w?i$1`a`:i$1`button`;return u`
      <${T}
        part="base"
        class=${e$1({"icon-button":!0,"icon-button--disabled":!w&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${o(w?void 0:this.disabled)}
        type=${o(w?void 0:"button")}
        href=${o(w?this.href:void 0)}
        target=${o(w?this.target:void 0)}
        download=${o(w?this.download:void 0)}
        rel=${o(w&&this.target?"noreferrer noopener":void 0)}
        role=${o(w?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o(this.name)}
          library=${o(this.library)}
          src=${o(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${T}>
    `}};SlIconButton.styles=[component_styles_default,icon_button_styles_default];SlIconButton.dependencies={"sl-icon":SlIcon};__decorateClass([e$3(".icon-button")],SlIconButton.prototype,"button",2);__decorateClass([r$2()],SlIconButton.prototype,"hasFocus",2);__decorateClass([n$1()],SlIconButton.prototype,"name",2);__decorateClass([n$1()],SlIconButton.prototype,"library",2);__decorateClass([n$1()],SlIconButton.prototype,"src",2);__decorateClass([n$1()],SlIconButton.prototype,"href",2);__decorateClass([n$1()],SlIconButton.prototype,"target",2);__decorateClass([n$1()],SlIconButton.prototype,"download",2);__decorateClass([n$1()],SlIconButton.prototype,"label",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlIconButton.prototype,"disabled",2);var defaultAnimationRegistry=new Map,customAnimationRegistry=new WeakMap;function ensureAnimation(w){return w??{keyframes:[],options:{duration:0}}}function getLogicalAnimation(w,T){return T.toLowerCase()==="rtl"?{keyframes:w.rtlKeyframes||w.keyframes,options:w.options}:w}function setDefaultAnimation(w,T){defaultAnimationRegistry.set(w,ensureAnimation(T))}function getAnimation(w,T,O){const F=customAnimationRegistry.get(w);if(F!=null&&F[T])return getLogicalAnimation(F[T],O.dir);const U=defaultAnimationRegistry.get(T);return U?getLogicalAnimation(U,O.dir):{keyframes:[],options:{duration:0}}}function waitForEvent(w,T){return new Promise(O=>{function F(U){U.target===w&&(w.removeEventListener(T,F),O())}w.addEventListener(T,F)})}function animateTo(w,T,O){return new Promise(F=>{if((O==null?void 0:O.duration)===1/0)throw new Error("Promise-based animations must be finite.");const U=w.animate(T,__spreadProps(__spreadValues({},O),{duration:prefersReducedMotion()?0:O.duration}));U.addEventListener("cancel",F,{once:!0}),U.addEventListener("finish",F,{once:!0})})}function parseDuration(w){return w=w.toString().toLowerCase(),w.indexOf("ms")>-1?parseFloat(w):w.indexOf("s")>-1?parseFloat(w)*1e3:parseFloat(w)}function prefersReducedMotion(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function stopAnimations(w){return Promise.all(w.getAnimations().map(T=>new Promise(O=>{T.cancel(),requestAnimationFrame(O)})))}var HasSlotController=class{constructor(w,...T){this.slotNames=[],this.handleSlotChange=O=>{const F=O.target;(this.slotNames.includes("[default]")&&!F.name||F.name&&this.slotNames.includes(F.name))&&this.host.requestUpdate()},(this.host=w).addController(this),this.slotNames=T}hasDefaultSlot(){return[...this.host.childNodes].some(w=>{if(w.nodeType===w.TEXT_NODE&&w.textContent.trim()!=="")return!0;if(w.nodeType===w.ELEMENT_NODE){const T=w;if(T.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!T.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(w){return this.host.querySelector(`:scope > [slot="${w}"]`)!==null}test(w){return w==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(w)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};const connectedElements=new Set,translations=new Map;let fallback,documentDirection="ltr",documentLanguage="en";const isClient=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(isClient){const w=new MutationObserver(update);documentDirection=document.documentElement.dir||"ltr",documentLanguage=document.documentElement.lang||navigator.language,w.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function registerTranslation(...w){w.map(T=>{const O=T.$code.toLowerCase();translations.has(O)?translations.set(O,Object.assign(Object.assign({},translations.get(O)),T)):translations.set(O,T),fallback||(fallback=T)}),update()}function update(){isClient&&(documentDirection=document.documentElement.dir||"ltr",documentLanguage=document.documentElement.lang||navigator.language),[...connectedElements.keys()].map(w=>{typeof w.requestUpdate=="function"&&w.requestUpdate()})}let LocalizeController$1=class{constructor(T){this.host=T,this.host.addController(this)}hostConnected(){connectedElements.add(this.host)}hostDisconnected(){connectedElements.delete(this.host)}dir(){return`${this.host.dir||documentDirection}`.toLowerCase()}lang(){return`${this.host.lang||documentLanguage}`.toLowerCase()}getTranslationData(T){var O,F;const U=new Intl.Locale(T.replace(/_/g,"-")),q=U==null?void 0:U.language.toLowerCase(),W=(F=(O=U==null?void 0:U.region)===null||O===void 0?void 0:O.toLowerCase())!==null&&F!==void 0?F:"",j=translations.get(`${q}-${W}`),X=translations.get(q);return{locale:U,language:q,region:W,primary:j,secondary:X}}exists(T,O){var F;const{primary:U,secondary:q}=this.getTranslationData((F=O.lang)!==null&&F!==void 0?F:this.lang());return O=Object.assign({includeFallback:!1},O),!!(U&&U[T]||q&&q[T]||O.includeFallback&&fallback&&fallback[T])}term(T,...O){const{primary:F,secondary:U}=this.getTranslationData(this.lang());let q;if(F&&F[T])q=F[T];else if(U&&U[T])q=U[T];else if(fallback&&fallback[T])q=fallback[T];else return console.error(`No translation found for: ${String(T)}`),String(T);return typeof q=="function"?q(...O):q}date(T,O){return T=new Date(T),new Intl.DateTimeFormat(this.lang(),O).format(T)}number(T,O){return T=Number(T),isNaN(T)?"":new Intl.NumberFormat(this.lang(),O).format(T)}relativeTime(T,O,F){return new Intl.RelativeTimeFormat(this.lang(),F).format(T,O)}};var translation={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(w,T)=>`Go to slide ${w} of ${T}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:w=>w===0?"No options selected":w===1?"1 option selected":`${w} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:w=>`Slide ${w}`,toggleColorFormat:"Toggle color format"};registerTranslation(translation);var en_default=translation,LocalizeController=class extends LocalizeController$1{};registerTranslation(en_default);var alert_styles_default=i$6`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,_SlAlert=class At extends ShoelaceElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"icon","suffix"),this.localize=new LocalizeController(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var T;(T=this.countdownAnimation)==null||T.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var T;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),(T=this.countdownAnimation)==null||T.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:T}=this,O="100%",F="0";this.countdownAnimation=T.animate([{width:O},{width:F}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await stopAnimations(this.base),this.base.hidden=!1;const{keyframes:T,options:O}=getAnimation(this,"alert.show",{dir:this.localize.dir()});await animateTo(this.base,T,O),this.emit("sl-after-show")}else{blurActiveElement(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await stopAnimations(this.base);const{keyframes:T,options:O}=getAnimation(this,"alert.hide",{dir:this.localize.dir()});await animateTo(this.base,T,O),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,waitForEvent(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,waitForEvent(this,"sl-after-hide")}async toast(){return new Promise(T=>{this.handleCountdownChange(),At.toastStack.parentElement===null&&document.body.append(At.toastStack),At.toastStack.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{At.toastStack.removeChild(this),T(),At.toastStack.querySelector("sl-alert")===null&&At.toastStack.remove()},{once:!0})})}render(){return b`
      <div
        part="base"
        class=${e$1({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":this.variant==="primary","alert--success":this.variant==="success","alert--neutral":this.variant==="neutral","alert--warning":this.variant==="warning","alert--danger":this.variant==="danger"})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?b`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?b`
              <div
                class=${e$1({alert__countdown:!0,"alert__countdown--ltr":this.countdown==="ltr"})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};_SlAlert.styles=[component_styles_default,alert_styles_default];_SlAlert.dependencies={"sl-icon-button":SlIconButton};__decorateClass([e$3('[part~="base"]')],_SlAlert.prototype,"base",2);__decorateClass([e$3(".alert__countdown-elapsed")],_SlAlert.prototype,"countdownElement",2);__decorateClass([n$1({type:Boolean,reflect:!0})],_SlAlert.prototype,"open",2);__decorateClass([n$1({type:Boolean,reflect:!0})],_SlAlert.prototype,"closable",2);__decorateClass([n$1({reflect:!0})],_SlAlert.prototype,"variant",2);__decorateClass([n$1({type:Number})],_SlAlert.prototype,"duration",2);__decorateClass([n$1({type:String,reflect:!0})],_SlAlert.prototype,"countdown",2);__decorateClass([r$2()],_SlAlert.prototype,"remainingTime",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],_SlAlert.prototype,"handleOpenChange",1);__decorateClass([watch("duration")],_SlAlert.prototype,"handleDurationChange",1);var SlAlert=_SlAlert;setDefaultAnimation("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});setDefaultAnimation("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});SlAlert.define("sl-alert");var badge_styles_default=i$6`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,SlBadge=class extends ShoelaceElement{constructor(){super(...arguments),this.variant="primary",this.pill=!1,this.pulse=!1}render(){return b`
      <span
        part="base"
        class=${e$1({badge:!0,"badge--primary":this.variant==="primary","badge--success":this.variant==="success","badge--neutral":this.variant==="neutral","badge--warning":this.variant==="warning","badge--danger":this.variant==="danger","badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};SlBadge.styles=[component_styles_default,badge_styles_default];__decorateClass([n$1({reflect:!0})],SlBadge.prototype,"variant",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlBadge.prototype,"pill",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlBadge.prototype,"pulse",2);SlBadge.define("sl-badge");var spinner_styles_default=i$6`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,SlSpinner=class extends ShoelaceElement{constructor(){super(...arguments),this.localize=new LocalizeController(this)}render(){return b`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};SlSpinner.styles=[component_styles_default,spinner_styles_default];var formCollections=new WeakMap,reportValidityOverloads=new WeakMap,checkValidityOverloads=new WeakMap,userInteractedControls=new WeakSet,interactions=new WeakMap,FormControlController=class{constructor(w,T){this.handleFormData=O=>{const F=this.options.disabled(this.host),U=this.options.name(this.host),q=this.options.value(this.host),W=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!F&&!W&&typeof U=="string"&&U.length>0&&typeof q<"u"&&(Array.isArray(q)?q.forEach(j=>{O.formData.append(U,j.toString())}):O.formData.append(U,q.toString()))},this.handleFormSubmit=O=>{var F;const U=this.options.disabled(this.host),q=this.options.reportValidity;this.form&&!this.form.noValidate&&((F=formCollections.get(this.form))==null||F.forEach(W=>{this.setUserInteracted(W,!0)})),this.form&&!this.form.noValidate&&!U&&!q(this.host)&&(O.preventDefault(),O.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),interactions.set(this.host,[])},this.handleInteraction=O=>{const F=interactions.get(this.host);F.includes(O.type)||F.push(O.type),F.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const O=this.form.querySelectorAll("*");for(const F of O)if(typeof F.checkValidity=="function"&&!F.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const O=this.form.querySelectorAll("*");for(const F of O)if(typeof F.reportValidity=="function"&&!F.reportValidity())return!1}return!0},(this.host=w).addController(this),this.options=__spreadValues({form:O=>{const F=O.form;if(F){const q=O.getRootNode().querySelector(`#${F}`);if(q)return q}return O.closest("form")},name:O=>O.name,value:O=>O.value,defaultValue:O=>O.defaultValue,disabled:O=>{var F;return(F=O.disabled)!=null?F:!1},reportValidity:O=>typeof O.reportValidity=="function"?O.reportValidity():!0,checkValidity:O=>typeof O.checkValidity=="function"?O.checkValidity():!0,setValue:(O,F)=>O.value=F,assumeInteractionOn:["sl-input"]},T)}hostConnected(){const w=this.options.form(this.host);w&&this.attachForm(w),interactions.set(this.host,[]),this.options.assumeInteractionOn.forEach(T=>{this.host.addEventListener(T,this.handleInteraction)})}hostDisconnected(){this.detachForm(),interactions.delete(this.host),this.options.assumeInteractionOn.forEach(w=>{this.host.removeEventListener(w,this.handleInteraction)})}hostUpdated(){const w=this.options.form(this.host);w||this.detachForm(),w&&this.form!==w&&(this.detachForm(),this.attachForm(w)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(w){w?(this.form=w,formCollections.has(this.form)?formCollections.get(this.form).add(this.host):formCollections.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),reportValidityOverloads.has(this.form)||(reportValidityOverloads.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),checkValidityOverloads.has(this.form)||(checkValidityOverloads.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const w=formCollections.get(this.form);w&&(w.delete(this.host),w.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),reportValidityOverloads.has(this.form)&&(this.form.reportValidity=reportValidityOverloads.get(this.form),reportValidityOverloads.delete(this.form)),checkValidityOverloads.has(this.form)&&(this.form.checkValidity=checkValidityOverloads.get(this.form),checkValidityOverloads.delete(this.form)),this.form=void 0))}setUserInteracted(w,T){T?userInteractedControls.add(w):userInteractedControls.delete(w),w.requestUpdate()}doAction(w,T){if(this.form){const O=document.createElement("button");O.type=w,O.style.position="absolute",O.style.width="0",O.style.height="0",O.style.clipPath="inset(50%)",O.style.overflow="hidden",O.style.whiteSpace="nowrap",T&&(O.name=T.name,O.value=T.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(F=>{T.hasAttribute(F)&&O.setAttribute(F,T.getAttribute(F))})),this.form.append(O),O.click(),O.remove()}}getForm(){var w;return(w=this.form)!=null?w:null}reset(w){this.doAction("reset",w)}submit(w){this.doAction("submit",w)}setValidity(w){const T=this.host,O=!!userInteractedControls.has(T),F=!!T.required;T.toggleAttribute("data-required",F),T.toggleAttribute("data-optional",!F),T.toggleAttribute("data-invalid",!w),T.toggleAttribute("data-valid",w),T.toggleAttribute("data-user-invalid",!w&&O),T.toggleAttribute("data-user-valid",w&&O)}updateValidity(){const w=this.host;this.setValidity(w.validity.valid)}emitInvalidEvent(w){const T=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});w||T.preventDefault(),this.host.dispatchEvent(T)||w==null||w.preventDefault()}},validValidityState=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(__spreadProps(__spreadValues({},validValidityState),{valid:!1,valueMissing:!0}));Object.freeze(__spreadProps(__spreadValues({},validValidityState),{valid:!1,customError:!0}));var button_styles_default=i$6`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,SlButton=class extends ShoelaceElement{constructor(){super(...arguments),this.formControlController=new FormControlController(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new HasSlotController(this,"[default]","prefix","suffix"),this.localize=new LocalizeController(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:validValidityState}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(w){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(w)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(w){this.button.focus(w)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(w){this.isButton()&&(this.button.setCustomValidity(w),this.formControlController.updateValidity())}render(){const w=this.isLink(),T=w?i$1`a`:i$1`button`;return u`
      <${T}
        part="base"
        class=${e$1({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${o(w?void 0:this.disabled)}
        type=${o(w?void 0:this.type)}
        title=${this.title}
        name=${o(w?void 0:this.name)}
        value=${o(w?void 0:this.value)}
        href=${o(w&&!this.disabled?this.href:void 0)}
        target=${o(w?this.target:void 0)}
        download=${o(w?this.download:void 0)}
        rel=${o(w?this.rel:void 0)}
        role=${o(w?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?u` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?u`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${T}>
    `}};SlButton.styles=[component_styles_default,button_styles_default];SlButton.dependencies={"sl-icon":SlIcon,"sl-spinner":SlSpinner};__decorateClass([e$3(".button")],SlButton.prototype,"button",2);__decorateClass([r$2()],SlButton.prototype,"hasFocus",2);__decorateClass([r$2()],SlButton.prototype,"invalid",2);__decorateClass([n$1()],SlButton.prototype,"title",2);__decorateClass([n$1({reflect:!0})],SlButton.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],SlButton.prototype,"size",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlButton.prototype,"caret",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlButton.prototype,"disabled",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlButton.prototype,"loading",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlButton.prototype,"outline",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlButton.prototype,"pill",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlButton.prototype,"circle",2);__decorateClass([n$1()],SlButton.prototype,"type",2);__decorateClass([n$1()],SlButton.prototype,"name",2);__decorateClass([n$1()],SlButton.prototype,"value",2);__decorateClass([n$1()],SlButton.prototype,"href",2);__decorateClass([n$1()],SlButton.prototype,"target",2);__decorateClass([n$1()],SlButton.prototype,"rel",2);__decorateClass([n$1()],SlButton.prototype,"download",2);__decorateClass([n$1()],SlButton.prototype,"form",2);__decorateClass([n$1({attribute:"formaction"})],SlButton.prototype,"formAction",2);__decorateClass([n$1({attribute:"formenctype"})],SlButton.prototype,"formEnctype",2);__decorateClass([n$1({attribute:"formmethod"})],SlButton.prototype,"formMethod",2);__decorateClass([n$1({attribute:"formnovalidate",type:Boolean})],SlButton.prototype,"formNoValidate",2);__decorateClass([n$1({attribute:"formtarget"})],SlButton.prototype,"formTarget",2);__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],SlButton.prototype,"handleDisabledChange",1);SlButton.define("sl-button");var card_styles_default=i$6`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,SlCard=class extends ShoelaceElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"footer","header","image")}render(){return b`
      <div
        part="base"
        class=${e$1({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};SlCard.styles=[component_styles_default,card_styles_default];SlCard.define("sl-card");var divider_styles_default=i$6`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,SlDivider=class extends ShoelaceElement{constructor(){super(...arguments),this.vertical=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};SlDivider.styles=[component_styles_default,divider_styles_default];__decorateClass([n$1({type:Boolean,reflect:!0})],SlDivider.prototype,"vertical",2);__decorateClass([watch("vertical")],SlDivider.prototype,"handleVerticalChange",1);SlDivider.define("sl-divider");var drawer_styles_default=i$6`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*activeElements(w=document.activeElement){w!=null&&(yield w,"shadowRoot"in w&&w.shadowRoot&&w.shadowRoot.mode!=="closed"&&(yield*__yieldStar(activeElements(w.shadowRoot.activeElement))))}function getDeepestActiveElement(){return[...activeElements()].pop()}var computedStyleMap=new WeakMap;function getCachedComputedStyle(w){let T=computedStyleMap.get(w);return T||(T=window.getComputedStyle(w,null),computedStyleMap.set(w,T)),T}function isVisible(w){if(typeof w.checkVisibility=="function")return w.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const T=getCachedComputedStyle(w);return T.visibility!=="hidden"&&T.display!=="none"}function isOverflowingAndTabbable(w){const T=getCachedComputedStyle(w),{overflowY:O,overflowX:F}=T;return O==="scroll"||F==="scroll"?!0:O!=="auto"||F!=="auto"?!1:w.scrollHeight>w.clientHeight&&O==="auto"||w.scrollWidth>w.clientWidth&&F==="auto"}function isTabbable(w){const T=w.tagName.toLowerCase(),O=Number(w.getAttribute("tabindex"));if(w.hasAttribute("tabindex")&&(isNaN(O)||O<=-1)||w.hasAttribute("disabled")||w.closest("[inert]"))return!1;if(T==="input"&&w.getAttribute("type")==="radio"){const q=w.getRootNode(),W=`input[type='radio'][name="${w.getAttribute("name")}"]`,j=q.querySelector(`${W}:checked`);return j?j===w:q.querySelector(W)===w}return isVisible(w)?(T==="audio"||T==="video")&&w.hasAttribute("controls")||w.hasAttribute("tabindex")||w.hasAttribute("contenteditable")&&w.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(T)?!0:isOverflowingAndTabbable(w):!1}function getSlottedChildrenOutsideRootElement(w,T){var O;return((O=w.getRootNode({composed:!0}))==null?void 0:O.host)!==T}function getTabbableElements(w){const T=new WeakMap,O=[];function F(U){if(U instanceof Element){if(U.hasAttribute("inert")||U.closest("[inert]")||T.has(U))return;T.set(U,!0),!O.includes(U)&&isTabbable(U)&&O.push(U),U instanceof HTMLSlotElement&&getSlottedChildrenOutsideRootElement(U,w)&&U.assignedElements({flatten:!0}).forEach(q=>{F(q)}),U.shadowRoot!==null&&U.shadowRoot.mode==="open"&&F(U.shadowRoot)}for(const q of U.children)F(q)}return F(w),O.sort((U,q)=>{const W=Number(U.getAttribute("tabindex"))||0;return(Number(q.getAttribute("tabindex"))||0)-W})}var activeModals=[],Modal=class{constructor(w){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=T=>{var O;if(T.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const F=getDeepestActiveElement();if(this.previousFocus=F,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;T.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const U=getTabbableElements(this.element);let q=U.findIndex(j=>j===F);this.previousFocus=this.currentFocus;const W=this.tabDirection==="forward"?1:-1;for(;;){q+W>=U.length?q=0:q+W<0?q=U.length-1:q+=W,this.previousFocus=this.currentFocus;const j=U[q];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||j&&this.possiblyHasTabbableChildren(j))return;T.preventDefault(),this.currentFocus=j,(O=this.currentFocus)==null||O.focus({preventScroll:!1});const X=[...activeElements()];if(X.includes(this.currentFocus)||!X.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=w,this.elementsWithTabbableControls=["iframe"]}activate(){activeModals.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){activeModals=activeModals.filter(w=>w!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return activeModals[activeModals.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const w=getTabbableElements(this.element);if(!this.element.matches(":focus-within")){const T=w[0],O=w[w.length-1],F=this.tabDirection==="forward"?T:O;typeof(F==null?void 0:F.focus)=="function"&&(this.currentFocus=F,F.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(w){return this.elementsWithTabbableControls.includes(w.tagName.toLowerCase())||w.hasAttribute("controls")}},locks=new Set;function getScrollbarWidth(){const w=document.documentElement.clientWidth;return Math.abs(window.innerWidth-w)}function getExistingBodyPadding(){const w=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(w)||!w?0:w}function lockBodyScrolling(w){if(locks.add(w),!document.documentElement.classList.contains("sl-scroll-lock")){const T=getScrollbarWidth()+getExistingBodyPadding();let O=getComputedStyle(document.documentElement).scrollbarGutter;(!O||O==="auto")&&(O="stable"),T<2&&(O=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",O),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${T}px`)}}function unlockBodyScrolling(w){locks.delete(w),locks.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function uppercaseFirstLetter(w){return w.charAt(0).toUpperCase()+w.slice(1)}var SlDrawer=class extends ShoelaceElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"footer"),this.localize=new LocalizeController(this),this.modal=new Modal(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=w=>{this.contained||w.key==="Escape"&&this.modal.isActive()&&this.open&&(w.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),lockBodyScrolling(this)))}disconnectedCallback(){super.disconnectedCallback(),unlockBodyScrolling(this),this.removeOpenListeners()}requestClose(w){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:w}}).defaultPrevented){const O=getAnimation(this,"drawer.denyClose",{dir:this.localize.dir()});animateTo(this.panel,O.keyframes,O.options);return}this.hide()}addOpenListeners(){var w;"CloseWatcher"in window?((w=this.closeWatcher)==null||w.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var w;document.removeEventListener("keydown",this.handleDocumentKeyDown),(w=this.closeWatcher)==null||w.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),lockBodyScrolling(this));const w=this.querySelector("[autofocus]");w&&w.removeAttribute("autofocus"),await Promise.all([stopAnimations(this.drawer),stopAnimations(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(w?w.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),w&&w.setAttribute("autofocus","")});const T=getAnimation(this,`drawer.show${uppercaseFirstLetter(this.placement)}`,{dir:this.localize.dir()}),O=getAnimation(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([animateTo(this.panel,T.keyframes,T.options),animateTo(this.overlay,O.keyframes,O.options)]),this.emit("sl-after-show")}else{blurActiveElement(this),this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),unlockBodyScrolling(this)),await Promise.all([stopAnimations(this.drawer),stopAnimations(this.overlay)]);const w=getAnimation(this,`drawer.hide${uppercaseFirstLetter(this.placement)}`,{dir:this.localize.dir()}),T=getAnimation(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([animateTo(this.overlay,T.keyframes,T.options).then(()=>{this.overlay.hidden=!0}),animateTo(this.panel,w.keyframes,w.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const O=this.originalTrigger;typeof(O==null?void 0:O.focus)=="function"&&setTimeout(()=>O.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),lockBodyScrolling(this)),this.open&&this.contained&&(this.modal.deactivate(),unlockBodyScrolling(this))}async show(){if(!this.open)return this.open=!0,waitForEvent(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,waitForEvent(this,"sl-after-hide")}render(){return b`
      <div
        part="base"
        class=${e$1({drawer:!0,"drawer--open":this.open,"drawer--top":this.placement==="top","drawer--end":this.placement==="end","drawer--bottom":this.placement==="bottom","drawer--start":this.placement==="start","drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":this.localize.dir()==="rtl","drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${o(this.noHeader?this.label:void 0)}
          aria-labelledby=${o(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":b`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};SlDrawer.styles=[component_styles_default,drawer_styles_default];SlDrawer.dependencies={"sl-icon-button":SlIconButton};__decorateClass([e$3(".drawer")],SlDrawer.prototype,"drawer",2);__decorateClass([e$3(".drawer__panel")],SlDrawer.prototype,"panel",2);__decorateClass([e$3(".drawer__overlay")],SlDrawer.prototype,"overlay",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlDrawer.prototype,"open",2);__decorateClass([n$1({reflect:!0})],SlDrawer.prototype,"label",2);__decorateClass([n$1({reflect:!0})],SlDrawer.prototype,"placement",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlDrawer.prototype,"contained",2);__decorateClass([n$1({attribute:"no-header",type:Boolean,reflect:!0})],SlDrawer.prototype,"noHeader",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],SlDrawer.prototype,"handleOpenChange",1);__decorateClass([watch("contained",{waitUntilFirstUpdate:!0})],SlDrawer.prototype,"handleNoModalChange",1);setDefaultAnimation("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}});setDefaultAnimation("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}});setDefaultAnimation("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});setDefaultAnimation("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});SlDrawer.define("sl-drawer");SlIcon.define("sl-icon");SlIconButton.define("sl-icon-button");var input_styles_default=i$6`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,defaultValue=(w="value")=>(T,O)=>{const F=T.constructor,U=F.prototype.attributeChangedCallback;F.prototype.attributeChangedCallback=function(q,W,j){var X;const K=F.getPropertyOptions(w),J=typeof K.attribute=="string"?K.attribute:w;if(q===J){const Y=K.converter||u$2,Q=(typeof Y=="function"?Y:(X=Y==null?void 0:Y.fromAttribute)!=null?X:u$2.fromAttribute)(j,K.type);this[w]!==Q&&(this[O]=Q)}U.call(this,q,W,j)}},form_control_styles_default=i$6`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$2(class extends i$2{constructor(w){if(super(w),w.type!==t.PROPERTY&&w.type!==t.ATTRIBUTE&&w.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r$1(w))throw Error("`live` bindings can only contain a single expression")}render(w){return w}update(w,[T]){if(T===E||T===A)return T;const O=w.element,F=w.name;if(w.type===t.PROPERTY){if(T===O[F])return E}else if(w.type===t.BOOLEAN_ATTRIBUTE){if(!!T===O.hasAttribute(F))return E}else if(w.type===t.ATTRIBUTE&&O.getAttribute(F)===T+"")return E;return p(w),T}});var SlInput=class extends ShoelaceElement{constructor(){super(...arguments),this.formControlController=new FormControlController(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new HasSlotController(this,"help-text","label"),this.localize=new LocalizeController(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var w;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,((w=this.input)==null?void 0:w.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(w){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=w,this.value=this.__dateInput.value}get valueAsNumber(){var w;return this.__numberInput.value=this.value,((w=this.input)==null?void 0:w.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(w){this.__numberInput.valueAsNumber=w,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(w){w.preventDefault(),this.value!==""&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(w){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(w)}handleKeyDown(w){const T=w.metaKey||w.ctrlKey||w.shiftKey||w.altKey;w.key==="Enter"&&!T&&setTimeout(()=>{!w.defaultPrevented&&!w.isComposing&&this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(w){this.input.focus(w)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(w,T,O="none"){this.input.setSelectionRange(w,T,O)}setRangeText(w,T,O,F="preserve"){const U=T??this.input.selectionStart,q=O??this.input.selectionEnd;this.input.setRangeText(w,U,q,F),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(w){this.input.setCustomValidity(w),this.formControlController.updateValidity()}render(){const w=this.hasSlotController.test("label"),T=this.hasSlotController.test("help-text"),O=this.label?!0:!!w,F=this.helpText?!0:!!T,q=this.clearable&&!this.disabled&&!this.readonly&&(typeof this.value=="number"||this.value.length>0);return b`
      <div
        part="form-control"
        class=${e$1({"form-control":!0,"form-control--small":this.size==="small","form-control--medium":this.size==="medium","form-control--large":this.size==="large","form-control--has-label":O,"form-control--has-help-text":F})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${O?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e$1({input:!0,"input--small":this.size==="small","input--medium":this.size==="medium","input--large":this.size==="large","input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type==="password"&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${o(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o(this.placeholder)}
              minlength=${o(this.minlength)}
              maxlength=${o(this.maxlength)}
              min=${o(this.min)}
              max=${o(this.max)}
              step=${o(this.step)}
              .value=${l(this.value)}
              autocapitalize=${o(this.autocapitalize)}
              autocomplete=${o(this.autocomplete)}
              autocorrect=${o(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o(this.pattern)}
              enterkeyhint=${o(this.enterkeyhint)}
              inputmode=${o(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${q?b`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?b`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?b`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:b`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${F?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};SlInput.styles=[component_styles_default,form_control_styles_default,input_styles_default];SlInput.dependencies={"sl-icon":SlIcon};__decorateClass([e$3(".input__control")],SlInput.prototype,"input",2);__decorateClass([r$2()],SlInput.prototype,"hasFocus",2);__decorateClass([n$1()],SlInput.prototype,"title",2);__decorateClass([n$1({reflect:!0})],SlInput.prototype,"type",2);__decorateClass([n$1()],SlInput.prototype,"name",2);__decorateClass([n$1()],SlInput.prototype,"value",2);__decorateClass([defaultValue()],SlInput.prototype,"defaultValue",2);__decorateClass([n$1({reflect:!0})],SlInput.prototype,"size",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlInput.prototype,"filled",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlInput.prototype,"pill",2);__decorateClass([n$1()],SlInput.prototype,"label",2);__decorateClass([n$1({attribute:"help-text"})],SlInput.prototype,"helpText",2);__decorateClass([n$1({type:Boolean})],SlInput.prototype,"clearable",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlInput.prototype,"disabled",2);__decorateClass([n$1()],SlInput.prototype,"placeholder",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlInput.prototype,"readonly",2);__decorateClass([n$1({attribute:"password-toggle",type:Boolean})],SlInput.prototype,"passwordToggle",2);__decorateClass([n$1({attribute:"password-visible",type:Boolean})],SlInput.prototype,"passwordVisible",2);__decorateClass([n$1({attribute:"no-spin-buttons",type:Boolean})],SlInput.prototype,"noSpinButtons",2);__decorateClass([n$1({reflect:!0})],SlInput.prototype,"form",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlInput.prototype,"required",2);__decorateClass([n$1()],SlInput.prototype,"pattern",2);__decorateClass([n$1({type:Number})],SlInput.prototype,"minlength",2);__decorateClass([n$1({type:Number})],SlInput.prototype,"maxlength",2);__decorateClass([n$1()],SlInput.prototype,"min",2);__decorateClass([n$1()],SlInput.prototype,"max",2);__decorateClass([n$1()],SlInput.prototype,"step",2);__decorateClass([n$1()],SlInput.prototype,"autocapitalize",2);__decorateClass([n$1()],SlInput.prototype,"autocorrect",2);__decorateClass([n$1()],SlInput.prototype,"autocomplete",2);__decorateClass([n$1({type:Boolean})],SlInput.prototype,"autofocus",2);__decorateClass([n$1()],SlInput.prototype,"enterkeyhint",2);__decorateClass([n$1({type:Boolean,converter:{fromAttribute:w=>!(!w||w==="false"),toAttribute:w=>w?"true":"false"}})],SlInput.prototype,"spellcheck",2);__decorateClass([n$1()],SlInput.prototype,"inputmode",2);__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],SlInput.prototype,"handleDisabledChange",1);__decorateClass([watch("step",{waitUntilFirstUpdate:!0})],SlInput.prototype,"handleStepChange",1);__decorateClass([watch("value",{waitUntilFirstUpdate:!0})],SlInput.prototype,"handleValueChange",1);SlInput.define("sl-input");SlSpinner.define("sl-spinner");var tooltip_styles_default=i$6`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,popup_styles_default=i$6`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const min=Math.min,max=Math.max,round=Math.round,floor=Math.floor,createCoords=w=>({x:w,y:w}),oppositeSideMap={left:"right",right:"left",bottom:"top",top:"bottom"};function clamp(w,T,O){return max(w,min(T,O))}function evaluate(w,T){return typeof w=="function"?w(T):w}function getSide(w){return w.split("-")[0]}function getAlignment(w){return w.split("-")[1]}function getOppositeAxis(w){return w==="x"?"y":"x"}function getAxisLength(w){return w==="y"?"height":"width"}function getSideAxis(w){const T=w[0];return T==="t"||T==="b"?"y":"x"}function getAlignmentAxis(w){return getOppositeAxis(getSideAxis(w))}function getAlignmentSides(w,T,O){O===void 0&&(O=!1);const F=getAlignment(w),U=getAlignmentAxis(w),q=getAxisLength(U);let W=U==="x"?F===(O?"end":"start")?"right":"left":F==="start"?"bottom":"top";return T.reference[q]>T.floating[q]&&(W=getOppositePlacement(W)),[W,getOppositePlacement(W)]}function getExpandedPlacements(w){const T=getOppositePlacement(w);return[getOppositeAlignmentPlacement(w),T,getOppositeAlignmentPlacement(T)]}function getOppositeAlignmentPlacement(w){return w.includes("start")?w.replace("start","end"):w.replace("end","start")}const lrPlacement=["left","right"],rlPlacement=["right","left"],tbPlacement=["top","bottom"],btPlacement=["bottom","top"];function getSideList(w,T,O){switch(w){case"top":case"bottom":return O?T?rlPlacement:lrPlacement:T?lrPlacement:rlPlacement;case"left":case"right":return T?tbPlacement:btPlacement;default:return[]}}function getOppositeAxisPlacements(w,T,O,F){const U=getAlignment(w);let q=getSideList(getSide(w),O==="start",F);return U&&(q=q.map(W=>W+"-"+U),T&&(q=q.concat(q.map(getOppositeAlignmentPlacement)))),q}function getOppositePlacement(w){const T=getSide(w);return oppositeSideMap[T]+w.slice(T.length)}function expandPaddingObject(w){return{top:0,right:0,bottom:0,left:0,...w}}function getPaddingObject(w){return typeof w!="number"?expandPaddingObject(w):{top:w,right:w,bottom:w,left:w}}function rectToClientRect(w){const{x:T,y:O,width:F,height:U}=w;return{width:F,height:U,top:O,left:T,right:T+F,bottom:O+U,x:T,y:O}}function computeCoordsFromPlacement(w,T,O){let{reference:F,floating:U}=w;const q=getSideAxis(T),W=getAlignmentAxis(T),j=getAxisLength(W),X=getSide(T),K=q==="y",J=F.x+F.width/2-U.width/2,Y=F.y+F.height/2-U.height/2,G=F[j]/2-U[j]/2;let Q;switch(X){case"top":Q={x:J,y:F.y-U.height};break;case"bottom":Q={x:J,y:F.y+F.height};break;case"right":Q={x:F.x+F.width,y:Y};break;case"left":Q={x:F.x-U.width,y:Y};break;default:Q={x:F.x,y:F.y}}switch(getAlignment(T)){case"start":Q[W]-=G*(O&&K?-1:1);break;case"end":Q[W]+=G*(O&&K?-1:1);break}return Q}async function detectOverflow(w,T){var O;T===void 0&&(T={});const{x:F,y:U,platform:q,rects:W,elements:j,strategy:X}=w,{boundary:K="clippingAncestors",rootBoundary:J="viewport",elementContext:Y="floating",altBoundary:G=!1,padding:Q=0}=evaluate(T,w),tt=getPaddingObject(Q),ot=j[G?Y==="floating"?"reference":"floating":Y],rt=rectToClientRect(await q.getClippingRect({element:(O=await(q.isElement==null?void 0:q.isElement(ot)))==null||O?ot:ot.contextElement||await(q.getDocumentElement==null?void 0:q.getDocumentElement(j.floating)),boundary:K,rootBoundary:J,strategy:X})),st=Y==="floating"?{x:F,y:U,width:W.floating.width,height:W.floating.height}:W.reference,nt=await(q.getOffsetParent==null?void 0:q.getOffsetParent(j.floating)),it=await(q.isElement==null?void 0:q.isElement(nt))?await(q.getScale==null?void 0:q.getScale(nt))||{x:1,y:1}:{x:1,y:1},dt=rectToClientRect(q.convertOffsetParentRelativeRectToViewportRelativeRect?await q.convertOffsetParentRelativeRectToViewportRelativeRect({elements:j,rect:st,offsetParent:nt,strategy:X}):st);return{top:(rt.top-dt.top+tt.top)/it.y,bottom:(dt.bottom-rt.bottom+tt.bottom)/it.y,left:(rt.left-dt.left+tt.left)/it.x,right:(dt.right-rt.right+tt.right)/it.x}}const MAX_RESET_COUNT=50,computePosition$1=async(w,T,O)=>{const{placement:F="bottom",strategy:U="absolute",middleware:q=[],platform:W}=O,j=W.detectOverflow?W:{...W,detectOverflow},X=await(W.isRTL==null?void 0:W.isRTL(T));let K=await W.getElementRects({reference:w,floating:T,strategy:U}),{x:J,y:Y}=computeCoordsFromPlacement(K,F,X),G=F,Q=0;const tt={};for(let et=0;et<q.length;et++){const ot=q[et];if(!ot)continue;const{name:rt,fn:st}=ot,{x:nt,y:it,data:dt,reset:ut}=await st({x:J,y:Y,initialPlacement:F,placement:G,strategy:U,middlewareData:tt,rects:K,platform:j,elements:{reference:w,floating:T}});J=nt??J,Y=it??Y,tt[rt]={...tt[rt],...dt},ut&&Q<MAX_RESET_COUNT&&(Q++,typeof ut=="object"&&(ut.placement&&(G=ut.placement),ut.rects&&(K=ut.rects===!0?await W.getElementRects({reference:w,floating:T,strategy:U}):ut.rects),{x:J,y:Y}=computeCoordsFromPlacement(K,G,X)),et=-1)}return{x:J,y:Y,placement:G,strategy:U,middlewareData:tt}},arrow$1=w=>({name:"arrow",options:w,async fn(T){const{x:O,y:F,placement:U,rects:q,platform:W,elements:j,middlewareData:X}=T,{element:K,padding:J=0}=evaluate(w,T)||{};if(K==null)return{};const Y=getPaddingObject(J),G={x:O,y:F},Q=getAlignmentAxis(U),tt=getAxisLength(Q),et=await W.getDimensions(K),ot=Q==="y",rt=ot?"top":"left",st=ot?"bottom":"right",nt=ot?"clientHeight":"clientWidth",it=q.reference[tt]+q.reference[Q]-G[Q]-q.floating[tt],dt=G[Q]-q.reference[Q],ut=await(W.getOffsetParent==null?void 0:W.getOffsetParent(K));let lt=ut?ut[nt]:0;(!lt||!await(W.isElement==null?void 0:W.isElement(ut)))&&(lt=j.floating[nt]||q.floating[tt]);const _t=it/2-dt/2,gt=lt/2-et[tt]/2-1,bt=min(Y[rt],gt),xt=min(Y[st],gt),vt=bt,pt=lt-et[tt]-xt,ht=lt/2-et[tt]/2+_t,Et=clamp(vt,ht,pt),yt=!X.arrow&&getAlignment(U)!=null&&ht!==Et&&q.reference[tt]/2-(ht<vt?bt:xt)-et[tt]/2<0,ct=yt?ht<vt?ht-vt:ht-pt:0;return{[Q]:G[Q]+ct,data:{[Q]:Et,centerOffset:ht-Et-ct,...yt&&{alignmentOffset:ct}},reset:yt}}}),flip$1=function(w){return w===void 0&&(w={}),{name:"flip",options:w,async fn(T){var O,F;const{placement:U,middlewareData:q,rects:W,initialPlacement:j,platform:X,elements:K}=T,{mainAxis:J=!0,crossAxis:Y=!0,fallbackPlacements:G,fallbackStrategy:Q="bestFit",fallbackAxisSideDirection:tt="none",flipAlignment:et=!0,...ot}=evaluate(w,T);if((O=q.arrow)!=null&&O.alignmentOffset)return{};const rt=getSide(U),st=getSideAxis(j),nt=getSide(j)===j,it=await(X.isRTL==null?void 0:X.isRTL(K.floating)),dt=G||(nt||!et?[getOppositePlacement(j)]:getExpandedPlacements(j)),ut=tt!=="none";!G&&ut&&dt.push(...getOppositeAxisPlacements(j,et,tt,it));const lt=[j,...dt],_t=await X.detectOverflow(T,ot),gt=[];let bt=((F=q.flip)==null?void 0:F.overflows)||[];if(J&&gt.push(_t[rt]),Y){const ht=getAlignmentSides(U,W,it);gt.push(_t[ht[0]],_t[ht[1]])}if(bt=[...bt,{placement:U,overflows:gt}],!gt.every(ht=>ht<=0)){var xt,vt;const ht=(((xt=q.flip)==null?void 0:xt.index)||0)+1,Et=lt[ht];if(Et&&(!(Y==="alignment"?st!==getSideAxis(Et):!1)||bt.every(wt=>getSideAxis(wt.placement)===st?wt.overflows[0]>0:!0)))return{data:{index:ht,overflows:bt},reset:{placement:Et}};let yt=(vt=bt.filter(ct=>ct.overflows[0]<=0).sort((ct,wt)=>ct.overflows[1]-wt.overflows[1])[0])==null?void 0:vt.placement;if(!yt)switch(Q){case"bestFit":{var pt;const ct=(pt=bt.filter(wt=>{if(ut){const Ct=getSideAxis(wt.placement);return Ct===st||Ct==="y"}return!0}).map(wt=>[wt.placement,wt.overflows.filter(Ct=>Ct>0).reduce((Ct,Tt)=>Ct+Tt,0)]).sort((wt,Ct)=>wt[1]-Ct[1])[0])==null?void 0:pt[0];ct&&(yt=ct);break}case"initialPlacement":yt=j;break}if(U!==yt)return{reset:{placement:yt}}}return{}}}},originSides=new Set(["left","top"]);async function convertValueToCoords(w,T){const{placement:O,platform:F,elements:U}=w,q=await(F.isRTL==null?void 0:F.isRTL(U.floating)),W=getSide(O),j=getAlignment(O),X=getSideAxis(O)==="y",K=originSides.has(W)?-1:1,J=q&&X?-1:1,Y=evaluate(T,w);let{mainAxis:G,crossAxis:Q,alignmentAxis:tt}=typeof Y=="number"?{mainAxis:Y,crossAxis:0,alignmentAxis:null}:{mainAxis:Y.mainAxis||0,crossAxis:Y.crossAxis||0,alignmentAxis:Y.alignmentAxis};return j&&typeof tt=="number"&&(Q=j==="end"?tt*-1:tt),X?{x:Q*J,y:G*K}:{x:G*K,y:Q*J}}const offset$1=function(w){return w===void 0&&(w=0),{name:"offset",options:w,async fn(T){var O,F;const{x:U,y:q,placement:W,middlewareData:j}=T,X=await convertValueToCoords(T,w);return W===((O=j.offset)==null?void 0:O.placement)&&(F=j.arrow)!=null&&F.alignmentOffset?{}:{x:U+X.x,y:q+X.y,data:{...X,placement:W}}}}},shift$1=function(w){return w===void 0&&(w={}),{name:"shift",options:w,async fn(T){const{x:O,y:F,placement:U,platform:q}=T,{mainAxis:W=!0,crossAxis:j=!1,limiter:X={fn:rt=>{let{x:st,y:nt}=rt;return{x:st,y:nt}}},...K}=evaluate(w,T),J={x:O,y:F},Y=await q.detectOverflow(T,K),G=getSideAxis(getSide(U)),Q=getOppositeAxis(G);let tt=J[Q],et=J[G];if(W){const rt=Q==="y"?"top":"left",st=Q==="y"?"bottom":"right",nt=tt+Y[rt],it=tt-Y[st];tt=clamp(nt,tt,it)}if(j){const rt=G==="y"?"top":"left",st=G==="y"?"bottom":"right",nt=et+Y[rt],it=et-Y[st];et=clamp(nt,et,it)}const ot=X.fn({...T,[Q]:tt,[G]:et});return{...ot,data:{x:ot.x-O,y:ot.y-F,enabled:{[Q]:W,[G]:j}}}}}},size$1=function(w){return w===void 0&&(w={}),{name:"size",options:w,async fn(T){var O,F;const{placement:U,rects:q,platform:W,elements:j}=T,{apply:X=()=>{},...K}=evaluate(w,T),J=await W.detectOverflow(T,K),Y=getSide(U),G=getAlignment(U),Q=getSideAxis(U)==="y",{width:tt,height:et}=q.floating;let ot,rt;Y==="top"||Y==="bottom"?(ot=Y,rt=G===(await(W.isRTL==null?void 0:W.isRTL(j.floating))?"start":"end")?"left":"right"):(rt=Y,ot=G==="end"?"top":"bottom");const st=et-J.top-J.bottom,nt=tt-J.left-J.right,it=min(et-J[ot],st),dt=min(tt-J[rt],nt),ut=!T.middlewareData.shift;let lt=it,_t=dt;if((O=T.middlewareData.shift)!=null&&O.enabled.x&&(_t=nt),(F=T.middlewareData.shift)!=null&&F.enabled.y&&(lt=st),ut&&!G){const bt=max(J.left,0),xt=max(J.right,0),vt=max(J.top,0),pt=max(J.bottom,0);Q?_t=tt-2*(bt!==0||xt!==0?bt+xt:max(J.left,J.right)):lt=et-2*(vt!==0||pt!==0?vt+pt:max(J.top,J.bottom))}await X({...T,availableWidth:_t,availableHeight:lt});const gt=await W.getDimensions(j.floating);return tt!==gt.width||et!==gt.height?{reset:{rects:!0}}:{}}}};function hasWindow(){return typeof window<"u"}function getNodeName(w){return isNode(w)?(w.nodeName||"").toLowerCase():"#document"}function getWindow(w){var T;return(w==null||(T=w.ownerDocument)==null?void 0:T.defaultView)||window}function getDocumentElement(w){var T;return(T=(isNode(w)?w.ownerDocument:w.document)||window.document)==null?void 0:T.documentElement}function isNode(w){return hasWindow()?w instanceof Node||w instanceof getWindow(w).Node:!1}function isElement(w){return hasWindow()?w instanceof Element||w instanceof getWindow(w).Element:!1}function isHTMLElement(w){return hasWindow()?w instanceof HTMLElement||w instanceof getWindow(w).HTMLElement:!1}function isShadowRoot(w){return!hasWindow()||typeof ShadowRoot>"u"?!1:w instanceof ShadowRoot||w instanceof getWindow(w).ShadowRoot}function isOverflowElement(w){const{overflow:T,overflowX:O,overflowY:F,display:U}=getComputedStyle$1(w);return/auto|scroll|overlay|hidden|clip/.test(T+F+O)&&U!=="inline"&&U!=="contents"}function isTableElement(w){return/^(table|td|th)$/.test(getNodeName(w))}function isTopLayer(w){try{if(w.matches(":popover-open"))return!0}catch{}try{return w.matches(":modal")}catch{return!1}}const willChangeRe=/transform|translate|scale|rotate|perspective|filter/,containRe=/paint|layout|strict|content/,isNotNone=w=>!!w&&w!=="none";let isWebKitValue;function isContainingBlock(w){const T=isElement(w)?getComputedStyle$1(w):w;return isNotNone(T.transform)||isNotNone(T.translate)||isNotNone(T.scale)||isNotNone(T.rotate)||isNotNone(T.perspective)||!isWebKit()&&(isNotNone(T.backdropFilter)||isNotNone(T.filter))||willChangeRe.test(T.willChange||"")||containRe.test(T.contain||"")}function getContainingBlock(w){let T=getParentNode(w);for(;isHTMLElement(T)&&!isLastTraversableNode(T);){if(isContainingBlock(T))return T;if(isTopLayer(T))return null;T=getParentNode(T)}return null}function isWebKit(){return isWebKitValue==null&&(isWebKitValue=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),isWebKitValue}function isLastTraversableNode(w){return/^(html|body|#document)$/.test(getNodeName(w))}function getComputedStyle$1(w){return getWindow(w).getComputedStyle(w)}function getNodeScroll(w){return isElement(w)?{scrollLeft:w.scrollLeft,scrollTop:w.scrollTop}:{scrollLeft:w.scrollX,scrollTop:w.scrollY}}function getParentNode(w){if(getNodeName(w)==="html")return w;const T=w.assignedSlot||w.parentNode||isShadowRoot(w)&&w.host||getDocumentElement(w);return isShadowRoot(T)?T.host:T}function getNearestOverflowAncestor(w){const T=getParentNode(w);return isLastTraversableNode(T)?w.ownerDocument?w.ownerDocument.body:w.body:isHTMLElement(T)&&isOverflowElement(T)?T:getNearestOverflowAncestor(T)}function getOverflowAncestors(w,T,O){var F;T===void 0&&(T=[]),O===void 0&&(O=!0);const U=getNearestOverflowAncestor(w),q=U===((F=w.ownerDocument)==null?void 0:F.body),W=getWindow(U);if(q){const j=getFrameElement(W);return T.concat(W,W.visualViewport||[],isOverflowElement(U)?U:[],j&&O?getOverflowAncestors(j):[])}else return T.concat(U,getOverflowAncestors(U,[],O))}function getFrameElement(w){return w.parent&&Object.getPrototypeOf(w.parent)?w.frameElement:null}function getCssDimensions(w){const T=getComputedStyle$1(w);let O=parseFloat(T.width)||0,F=parseFloat(T.height)||0;const U=isHTMLElement(w),q=U?w.offsetWidth:O,W=U?w.offsetHeight:F,j=round(O)!==q||round(F)!==W;return j&&(O=q,F=W),{width:O,height:F,$:j}}function unwrapElement(w){return isElement(w)?w:w.contextElement}function getScale(w){const T=unwrapElement(w);if(!isHTMLElement(T))return createCoords(1);const O=T.getBoundingClientRect(),{width:F,height:U,$:q}=getCssDimensions(T);let W=(q?round(O.width):O.width)/F,j=(q?round(O.height):O.height)/U;return(!W||!Number.isFinite(W))&&(W=1),(!j||!Number.isFinite(j))&&(j=1),{x:W,y:j}}const noOffsets=createCoords(0);function getVisualOffsets(w){const T=getWindow(w);return!isWebKit()||!T.visualViewport?noOffsets:{x:T.visualViewport.offsetLeft,y:T.visualViewport.offsetTop}}function shouldAddVisualOffsets(w,T,O){return T===void 0&&(T=!1),!O||T&&O!==getWindow(w)?!1:T}function getBoundingClientRect(w,T,O,F){T===void 0&&(T=!1),O===void 0&&(O=!1);const U=w.getBoundingClientRect(),q=unwrapElement(w);let W=createCoords(1);T&&(F?isElement(F)&&(W=getScale(F)):W=getScale(w));const j=shouldAddVisualOffsets(q,O,F)?getVisualOffsets(q):createCoords(0);let X=(U.left+j.x)/W.x,K=(U.top+j.y)/W.y,J=U.width/W.x,Y=U.height/W.y;if(q){const G=getWindow(q),Q=F&&isElement(F)?getWindow(F):F;let tt=G,et=getFrameElement(tt);for(;et&&F&&Q!==tt;){const ot=getScale(et),rt=et.getBoundingClientRect(),st=getComputedStyle$1(et),nt=rt.left+(et.clientLeft+parseFloat(st.paddingLeft))*ot.x,it=rt.top+(et.clientTop+parseFloat(st.paddingTop))*ot.y;X*=ot.x,K*=ot.y,J*=ot.x,Y*=ot.y,X+=nt,K+=it,tt=getWindow(et),et=getFrameElement(tt)}}return rectToClientRect({width:J,height:Y,x:X,y:K})}function getWindowScrollBarX(w,T){const O=getNodeScroll(w).scrollLeft;return T?T.left+O:getBoundingClientRect(getDocumentElement(w)).left+O}function getHTMLOffset(w,T){const O=w.getBoundingClientRect(),F=O.left+T.scrollLeft-getWindowScrollBarX(w,O),U=O.top+T.scrollTop;return{x:F,y:U}}function convertOffsetParentRelativeRectToViewportRelativeRect(w){let{elements:T,rect:O,offsetParent:F,strategy:U}=w;const q=U==="fixed",W=getDocumentElement(F),j=T?isTopLayer(T.floating):!1;if(F===W||j&&q)return O;let X={scrollLeft:0,scrollTop:0},K=createCoords(1);const J=createCoords(0),Y=isHTMLElement(F);if((Y||!Y&&!q)&&((getNodeName(F)!=="body"||isOverflowElement(W))&&(X=getNodeScroll(F)),Y)){const Q=getBoundingClientRect(F);K=getScale(F),J.x=Q.x+F.clientLeft,J.y=Q.y+F.clientTop}const G=W&&!Y&&!q?getHTMLOffset(W,X):createCoords(0);return{width:O.width*K.x,height:O.height*K.y,x:O.x*K.x-X.scrollLeft*K.x+J.x+G.x,y:O.y*K.y-X.scrollTop*K.y+J.y+G.y}}function getClientRects(w){return Array.from(w.getClientRects())}function getDocumentRect(w){const T=getDocumentElement(w),O=getNodeScroll(w),F=w.ownerDocument.body,U=max(T.scrollWidth,T.clientWidth,F.scrollWidth,F.clientWidth),q=max(T.scrollHeight,T.clientHeight,F.scrollHeight,F.clientHeight);let W=-O.scrollLeft+getWindowScrollBarX(w);const j=-O.scrollTop;return getComputedStyle$1(F).direction==="rtl"&&(W+=max(T.clientWidth,F.clientWidth)-U),{width:U,height:q,x:W,y:j}}const SCROLLBAR_MAX=25;function getViewportRect(w,T){const O=getWindow(w),F=getDocumentElement(w),U=O.visualViewport;let q=F.clientWidth,W=F.clientHeight,j=0,X=0;if(U){q=U.width,W=U.height;const J=isWebKit();(!J||J&&T==="fixed")&&(j=U.offsetLeft,X=U.offsetTop)}const K=getWindowScrollBarX(F);if(K<=0){const J=F.ownerDocument,Y=J.body,G=getComputedStyle(Y),Q=J.compatMode==="CSS1Compat"&&parseFloat(G.marginLeft)+parseFloat(G.marginRight)||0,tt=Math.abs(F.clientWidth-Y.clientWidth-Q);tt<=SCROLLBAR_MAX&&(q-=tt)}else K<=SCROLLBAR_MAX&&(q+=K);return{width:q,height:W,x:j,y:X}}function getInnerBoundingClientRect(w,T){const O=getBoundingClientRect(w,!0,T==="fixed"),F=O.top+w.clientTop,U=O.left+w.clientLeft,q=isHTMLElement(w)?getScale(w):createCoords(1),W=w.clientWidth*q.x,j=w.clientHeight*q.y,X=U*q.x,K=F*q.y;return{width:W,height:j,x:X,y:K}}function getClientRectFromClippingAncestor(w,T,O){let F;if(T==="viewport")F=getViewportRect(w,O);else if(T==="document")F=getDocumentRect(getDocumentElement(w));else if(isElement(T))F=getInnerBoundingClientRect(T,O);else{const U=getVisualOffsets(w);F={x:T.x-U.x,y:T.y-U.y,width:T.width,height:T.height}}return rectToClientRect(F)}function hasFixedPositionAncestor(w,T){const O=getParentNode(w);return O===T||!isElement(O)||isLastTraversableNode(O)?!1:getComputedStyle$1(O).position==="fixed"||hasFixedPositionAncestor(O,T)}function getClippingElementAncestors(w,T){const O=T.get(w);if(O)return O;let F=getOverflowAncestors(w,[],!1).filter(j=>isElement(j)&&getNodeName(j)!=="body"),U=null;const q=getComputedStyle$1(w).position==="fixed";let W=q?getParentNode(w):w;for(;isElement(W)&&!isLastTraversableNode(W);){const j=getComputedStyle$1(W),X=isContainingBlock(W);!X&&j.position==="fixed"&&(U=null),(q?!X&&!U:!X&&j.position==="static"&&!!U&&(U.position==="absolute"||U.position==="fixed")||isOverflowElement(W)&&!X&&hasFixedPositionAncestor(w,W))?F=F.filter(J=>J!==W):U=j,W=getParentNode(W)}return T.set(w,F),F}function getClippingRect(w){let{element:T,boundary:O,rootBoundary:F,strategy:U}=w;const W=[...O==="clippingAncestors"?isTopLayer(T)?[]:getClippingElementAncestors(T,this._c):[].concat(O),F],j=getClientRectFromClippingAncestor(T,W[0],U);let X=j.top,K=j.right,J=j.bottom,Y=j.left;for(let G=1;G<W.length;G++){const Q=getClientRectFromClippingAncestor(T,W[G],U);X=max(Q.top,X),K=min(Q.right,K),J=min(Q.bottom,J),Y=max(Q.left,Y)}return{width:K-Y,height:J-X,x:Y,y:X}}function getDimensions(w){const{width:T,height:O}=getCssDimensions(w);return{width:T,height:O}}function getRectRelativeToOffsetParent(w,T,O){const F=isHTMLElement(T),U=getDocumentElement(T),q=O==="fixed",W=getBoundingClientRect(w,!0,q,T);let j={scrollLeft:0,scrollTop:0};const X=createCoords(0);function K(){X.x=getWindowScrollBarX(U)}if(F||!F&&!q)if((getNodeName(T)!=="body"||isOverflowElement(U))&&(j=getNodeScroll(T)),F){const Q=getBoundingClientRect(T,!0,q,T);X.x=Q.x+T.clientLeft,X.y=Q.y+T.clientTop}else U&&K();q&&!F&&U&&K();const J=U&&!F&&!q?getHTMLOffset(U,j):createCoords(0),Y=W.left+j.scrollLeft-X.x-J.x,G=W.top+j.scrollTop-X.y-J.y;return{x:Y,y:G,width:W.width,height:W.height}}function isStaticPositioned(w){return getComputedStyle$1(w).position==="static"}function getTrueOffsetParent(w,T){if(!isHTMLElement(w)||getComputedStyle$1(w).position==="fixed")return null;if(T)return T(w);let O=w.offsetParent;return getDocumentElement(w)===O&&(O=O.ownerDocument.body),O}function getOffsetParent(w,T){const O=getWindow(w);if(isTopLayer(w))return O;if(!isHTMLElement(w)){let U=getParentNode(w);for(;U&&!isLastTraversableNode(U);){if(isElement(U)&&!isStaticPositioned(U))return U;U=getParentNode(U)}return O}let F=getTrueOffsetParent(w,T);for(;F&&isTableElement(F)&&isStaticPositioned(F);)F=getTrueOffsetParent(F,T);return F&&isLastTraversableNode(F)&&isStaticPositioned(F)&&!isContainingBlock(F)?O:F||getContainingBlock(w)||O}const getElementRects=async function(w){const T=this.getOffsetParent||getOffsetParent,O=this.getDimensions,F=await O(w.floating);return{reference:getRectRelativeToOffsetParent(w.reference,await T(w.floating),w.strategy),floating:{x:0,y:0,width:F.width,height:F.height}}};function isRTL(w){return getComputedStyle$1(w).direction==="rtl"}const platform={convertOffsetParentRelativeRectToViewportRelativeRect,getDocumentElement,getClippingRect,getOffsetParent,getElementRects,getClientRects,getDimensions,getScale,isElement,isRTL};function rectsAreEqual(w,T){return w.x===T.x&&w.y===T.y&&w.width===T.width&&w.height===T.height}function observeMove(w,T){let O=null,F;const U=getDocumentElement(w);function q(){var j;clearTimeout(F),(j=O)==null||j.disconnect(),O=null}function W(j,X){j===void 0&&(j=!1),X===void 0&&(X=1),q();const K=w.getBoundingClientRect(),{left:J,top:Y,width:G,height:Q}=K;if(j||T(),!G||!Q)return;const tt=floor(Y),et=floor(U.clientWidth-(J+G)),ot=floor(U.clientHeight-(Y+Q)),rt=floor(J),nt={rootMargin:-tt+"px "+-et+"px "+-ot+"px "+-rt+"px",threshold:max(0,min(1,X))||1};let it=!0;function dt(ut){const lt=ut[0].intersectionRatio;if(lt!==X){if(!it)return W();lt?W(!1,lt):F=setTimeout(()=>{W(!1,1e-7)},1e3)}lt===1&&!rectsAreEqual(K,w.getBoundingClientRect())&&W(),it=!1}try{O=new IntersectionObserver(dt,{...nt,root:U.ownerDocument})}catch{O=new IntersectionObserver(dt,nt)}O.observe(w)}return W(!0),q}function autoUpdate(w,T,O,F){F===void 0&&(F={});const{ancestorScroll:U=!0,ancestorResize:q=!0,elementResize:W=typeof ResizeObserver=="function",layoutShift:j=typeof IntersectionObserver=="function",animationFrame:X=!1}=F,K=unwrapElement(w),J=U||q?[...K?getOverflowAncestors(K):[],...T?getOverflowAncestors(T):[]]:[];J.forEach(rt=>{U&&rt.addEventListener("scroll",O,{passive:!0}),q&&rt.addEventListener("resize",O)});const Y=K&&j?observeMove(K,O):null;let G=-1,Q=null;W&&(Q=new ResizeObserver(rt=>{let[st]=rt;st&&st.target===K&&Q&&T&&(Q.unobserve(T),cancelAnimationFrame(G),G=requestAnimationFrame(()=>{var nt;(nt=Q)==null||nt.observe(T)})),O()}),K&&!X&&Q.observe(K),T&&Q.observe(T));let tt,et=X?getBoundingClientRect(w):null;X&&ot();function ot(){const rt=getBoundingClientRect(w);et&&!rectsAreEqual(et,rt)&&O(),et=rt,tt=requestAnimationFrame(ot)}return O(),()=>{var rt;J.forEach(st=>{U&&st.removeEventListener("scroll",O),q&&st.removeEventListener("resize",O)}),Y==null||Y(),(rt=Q)==null||rt.disconnect(),Q=null,X&&cancelAnimationFrame(tt)}}const offset=offset$1,shift=shift$1,flip=flip$1,size=size$1,arrow=arrow$1,computePosition=(w,T,O)=>{const F=new Map,U={platform,...O},q={...U.platform,_c:F};return computePosition$1(w,T,{...U,platform:q})};function e(w){return i(w)}function r(w){return w.assignedSlot?w.assignedSlot:w.parentNode instanceof ShadowRoot?w.parentNode.host:w.parentNode}function i(w){for(let T=w;T;T=r(T))if(T instanceof Element&&getComputedStyle(T).display==="none")return null;for(let T=r(w);T;T=r(T)){if(!(T instanceof Element))continue;const O=getComputedStyle(T);if(O.display!=="contents"&&(O.position!=="static"||isContainingBlock(O)||T.tagName==="BODY"))return T}return null}function isVirtualElement(w){return w!==null&&typeof w=="object"&&"getBoundingClientRect"in w&&("contextElement"in w?w.contextElement instanceof Element:!0)}var SlPopup=class extends ShoelaceElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const w=this.anchorEl.getBoundingClientRect(),T=this.popup.getBoundingClientRect(),O=this.placement.includes("top")||this.placement.includes("bottom");let F=0,U=0,q=0,W=0,j=0,X=0,K=0,J=0;O?w.top<T.top?(F=w.left,U=w.bottom,q=w.right,W=w.bottom,j=T.left,X=T.top,K=T.right,J=T.top):(F=T.left,U=T.bottom,q=T.right,W=T.bottom,j=w.left,X=w.top,K=w.right,J=w.top):w.left<T.left?(F=w.right,U=w.top,q=T.left,W=T.top,j=w.right,X=w.bottom,K=T.left,J=T.bottom):(F=T.right,U=T.top,q=w.left,W=w.top,j=T.right,X=T.bottom,K=w.left,J=w.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${F}px`),this.style.setProperty("--hover-bridge-top-left-y",`${U}px`),this.style.setProperty("--hover-bridge-top-right-x",`${q}px`),this.style.setProperty("--hover-bridge-top-right-y",`${W}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${j}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${X}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${K}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${J}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(w){super.updated(w),w.has("active")&&(this.active?this.start():this.stop()),w.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const w=this.getRootNode();this.anchorEl=w.getElementById(this.anchor)}else this.anchor instanceof Element||isVirtualElement(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=autoUpdate(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(w=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>w())):w()})}reposition(){if(!this.active||!this.anchorEl)return;const w=[offset({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?w.push(size({apply:({rects:O})=>{const F=this.sync==="width"||this.sync==="both",U=this.sync==="height"||this.sync==="both";this.popup.style.width=F?`${O.reference.width}px`:"",this.popup.style.height=U?`${O.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&w.push(flip({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&w.push(shift({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?w.push(size({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:O,availableHeight:F})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${F}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${O}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&w.push(arrow({element:this.arrowEl,padding:this.arrowPadding}));const T=this.strategy==="absolute"?O=>platform.getOffsetParent(O,e):platform.getOffsetParent;computePosition(this.anchorEl,this.popup,{placement:this.placement,middleware:w,strategy:this.strategy,platform:__spreadProps(__spreadValues({},platform),{getOffsetParent:T})}).then(({x:O,y:F,middlewareData:U,placement:q})=>{const W=this.localize.dir()==="rtl",j={top:"bottom",right:"left",bottom:"top",left:"right"}[q.split("-")[0]];if(this.setAttribute("data-current-placement",q),Object.assign(this.popup.style,{left:`${O}px`,top:`${F}px`}),this.arrow){const X=U.arrow.x,K=U.arrow.y;let J="",Y="",G="",Q="";if(this.arrowPlacement==="start"){const tt=typeof X=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";J=typeof K=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",Y=W?tt:"",Q=W?"":tt}else if(this.arrowPlacement==="end"){const tt=typeof X=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";Y=W?"":tt,Q=W?tt:"",G=typeof K=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(Q=typeof X=="number"?"calc(50% - var(--arrow-size-diagonal))":"",J=typeof K=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(Q=typeof X=="number"?`${X}px`:"",J=typeof K=="number"?`${K}px`:"");Object.assign(this.arrowEl.style,{top:J,right:Y,bottom:G,left:Q,[j]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e$1({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${e$1({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?b`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};SlPopup.styles=[component_styles_default,popup_styles_default];__decorateClass([e$3(".popup")],SlPopup.prototype,"popup",2);__decorateClass([e$3(".popup__arrow")],SlPopup.prototype,"arrowEl",2);__decorateClass([n$1()],SlPopup.prototype,"anchor",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlPopup.prototype,"active",2);__decorateClass([n$1({reflect:!0})],SlPopup.prototype,"placement",2);__decorateClass([n$1({reflect:!0})],SlPopup.prototype,"strategy",2);__decorateClass([n$1({type:Number})],SlPopup.prototype,"distance",2);__decorateClass([n$1({type:Number})],SlPopup.prototype,"skidding",2);__decorateClass([n$1({type:Boolean})],SlPopup.prototype,"arrow",2);__decorateClass([n$1({attribute:"arrow-placement"})],SlPopup.prototype,"arrowPlacement",2);__decorateClass([n$1({attribute:"arrow-padding",type:Number})],SlPopup.prototype,"arrowPadding",2);__decorateClass([n$1({type:Boolean})],SlPopup.prototype,"flip",2);__decorateClass([n$1({attribute:"flip-fallback-placements",converter:{fromAttribute:w=>w.split(" ").map(T=>T.trim()).filter(T=>T!==""),toAttribute:w=>w.join(" ")}})],SlPopup.prototype,"flipFallbackPlacements",2);__decorateClass([n$1({attribute:"flip-fallback-strategy"})],SlPopup.prototype,"flipFallbackStrategy",2);__decorateClass([n$1({type:Object})],SlPopup.prototype,"flipBoundary",2);__decorateClass([n$1({attribute:"flip-padding",type:Number})],SlPopup.prototype,"flipPadding",2);__decorateClass([n$1({type:Boolean})],SlPopup.prototype,"shift",2);__decorateClass([n$1({type:Object})],SlPopup.prototype,"shiftBoundary",2);__decorateClass([n$1({attribute:"shift-padding",type:Number})],SlPopup.prototype,"shiftPadding",2);__decorateClass([n$1({attribute:"auto-size"})],SlPopup.prototype,"autoSize",2);__decorateClass([n$1()],SlPopup.prototype,"sync",2);__decorateClass([n$1({type:Object})],SlPopup.prototype,"autoSizeBoundary",2);__decorateClass([n$1({attribute:"auto-size-padding",type:Number})],SlPopup.prototype,"autoSizePadding",2);__decorateClass([n$1({attribute:"hover-bridge",type:Boolean})],SlPopup.prototype,"hoverBridge",2);var SlTooltip=class extends ShoelaceElement{constructor(){super(),this.localize=new LocalizeController(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=w=>{w.key==="Escape"&&(w.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const w=parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),w)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const w=parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),w)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var w;super.disconnectedCallback(),(w=this.closeWatcher)==null||w.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(w){return this.trigger.split(" ").includes(w)}async handleOpenChange(){var w,T;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?((w=this.closeWatcher)==null||w.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await stopAnimations(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:O,options:F}=getAnimation(this,"tooltip.show",{dir:this.localize.dir()});await animateTo(this.popup.popup,O,F),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),(T=this.closeWatcher)==null||T.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await stopAnimations(this.body);const{keyframes:O,options:F}=getAnimation(this,"tooltip.hide",{dir:this.localize.dir()});await animateTo(this.popup.popup,O,F),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,waitForEvent(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,waitForEvent(this,"sl-after-hide")}render(){return b`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${e$1({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};SlTooltip.styles=[component_styles_default,tooltip_styles_default];SlTooltip.dependencies={"sl-popup":SlPopup};__decorateClass([e$3("slot:not([name])")],SlTooltip.prototype,"defaultSlot",2);__decorateClass([e$3(".tooltip__body")],SlTooltip.prototype,"body",2);__decorateClass([e$3("sl-popup")],SlTooltip.prototype,"popup",2);__decorateClass([n$1()],SlTooltip.prototype,"content",2);__decorateClass([n$1()],SlTooltip.prototype,"placement",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlTooltip.prototype,"disabled",2);__decorateClass([n$1({type:Number})],SlTooltip.prototype,"distance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],SlTooltip.prototype,"open",2);__decorateClass([n$1({type:Number})],SlTooltip.prototype,"skidding",2);__decorateClass([n$1()],SlTooltip.prototype,"trigger",2);__decorateClass([n$1({type:Boolean})],SlTooltip.prototype,"hoist",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],SlTooltip.prototype,"handleOpenChange",1);__decorateClass([watch(["content","distance","hoist","placement","skidding"])],SlTooltip.prototype,"handleOptionsChange",1);__decorateClass([watch("disabled")],SlTooltip.prototype,"handleDisabledChange",1);setDefaultAnimation("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}});setDefaultAnimation("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});SlTooltip.define("sl-tooltip");(function(){const htmx={onLoad:null,process:null,on:null,off:null,trigger:null,ajax:null,find:null,findAll:null,closest:null,values:function(w,T){return getInputValues(w,T||"post").values},remove:null,addClass:null,removeClass:null,toggleClass:null,takeClass:null,swap:null,defineExtension:null,removeExtension:null,logAll:null,logNone:null,logger:null,config:{historyEnabled:!0,historyCacheSize:10,refreshOnHistoryMiss:!1,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:!0,indicatorClass:"htmx-indicator",requestClass:"htmx-request",addedClass:"htmx-added",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:!0,allowScriptTags:!0,inlineScriptNonce:"",inlineStyleNonce:"",attributesToSettle:["class","style","width","height"],withCredentials:!1,timeout:0,wsReconnectDelay:"full-jitter",wsBinaryType:"blob",disableSelector:"[hx-disable], [data-hx-disable]",scrollBehavior:"instant",defaultFocusScroll:!1,getCacheBusterParam:!1,globalViewTransitions:!1,methodsThatUseUrlParams:["get","delete"],selfRequestsOnly:!0,ignoreTitle:!1,scrollIntoViewOnBoost:!0,triggerSpecsCache:null,disableInheritance:!1,responseHandling:[{code:"204",swap:!1},{code:"[23]..",swap:!0},{code:"[45]..",swap:!1,error:!0}],allowNestedOobSwaps:!0,historyRestoreAsHxRequest:!0,reportValidityOfForms:!1},parseInterval:null,location,_:null,version:"2.0.8"};htmx.onLoad=onLoadHelper,htmx.process=processNode,htmx.on=addEventListenerImpl,htmx.off=removeEventListenerImpl,htmx.trigger=triggerEvent,htmx.ajax=ajaxHelper,htmx.find=find,htmx.findAll=findAll,htmx.closest=closest,htmx.remove=removeElement,htmx.addClass=addClassToElement,htmx.removeClass=removeClassFromElement,htmx.toggleClass=toggleClassOnElement,htmx.takeClass=takeClassForElement,htmx.swap=swap,htmx.defineExtension=defineExtension,htmx.removeExtension=removeExtension,htmx.logAll=logAll,htmx.logNone=logNone,htmx.parseInterval=parseInterval,htmx._=internalEval;const internalAPI={addTriggerHandler,bodyContains,canAccessLocalStorage,findThisElement,filterValues,swap,hasAttribute,getAttributeValue,getClosestAttributeValue,getClosestMatch,getExpressionVars,getHeaders,getInputValues,getInternalData,getSwapSpecification,getTriggerSpecs,getTarget,makeFragment,mergeObjects,makeSettleInfo,oobSwap,querySelectorExt,settleImmediately,shouldCancel,triggerEvent,triggerErrorEvent,withExtensions},VERBS=["get","post","put","delete","patch"],VERB_SELECTOR=VERBS.map(function(w){return"[hx-"+w+"], [data-hx-"+w+"]"}).join(", ");function parseInterval(w){if(w==null)return;let T=NaN;return w.slice(-2)=="ms"?T=parseFloat(w.slice(0,-2)):w.slice(-1)=="s"?T=parseFloat(w.slice(0,-1))*1e3:w.slice(-1)=="m"?T=parseFloat(w.slice(0,-1))*1e3*60:T=parseFloat(w),isNaN(T)?void 0:T}function getRawAttribute(w,T){return w instanceof Element&&w.getAttribute(T)}function hasAttribute(w,T){return!!w.hasAttribute&&(w.hasAttribute(T)||w.hasAttribute("data-"+T))}function getAttributeValue(w,T){return getRawAttribute(w,T)||getRawAttribute(w,"data-"+T)}function parentElt(w){const T=w.parentElement;return!T&&w.parentNode instanceof ShadowRoot?w.parentNode:T}function getDocument(){return document}function getRootNode(w,T){return w.getRootNode?w.getRootNode({composed:T}):getDocument()}function getClosestMatch(w,T){for(;w&&!T(w);)w=parentElt(w);return w||null}function getAttributeValueWithDisinheritance(w,T,O){const F=getAttributeValue(T,O),U=getAttributeValue(T,"hx-disinherit");var q=getAttributeValue(T,"hx-inherit");if(w!==T){if(htmx.config.disableInheritance)return q&&(q==="*"||q.split(" ").indexOf(O)>=0)?F:null;if(U&&(U==="*"||U.split(" ").indexOf(O)>=0))return"unset"}return F}function getClosestAttributeValue(w,T){let O=null;if(getClosestMatch(w,function(F){return!!(O=getAttributeValueWithDisinheritance(w,asElement(F),T))}),O!=="unset")return O}function matches(w,T){return w instanceof Element&&w.matches(T)}function getStartTag(w){const O=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i.exec(w);return O?O[1].toLowerCase():""}function parseHTML(w){return"parseHTMLUnsafe"in Document?Document.parseHTMLUnsafe(w):new DOMParser().parseFromString(w,"text/html")}function takeChildrenFor(w,T){for(;T.childNodes.length>0;)w.append(T.childNodes[0])}function duplicateScript(w){const T=getDocument().createElement("script");return forEach(w.attributes,function(O){T.setAttribute(O.name,O.value)}),T.textContent=w.textContent,T.async=!1,htmx.config.inlineScriptNonce&&(T.nonce=htmx.config.inlineScriptNonce),T}function isJavaScriptScriptNode(w){return w.matches("script")&&(w.type==="text/javascript"||w.type==="module"||w.type==="")}function normalizeScriptTags(w){Array.from(w.querySelectorAll("script")).forEach(T=>{if(isJavaScriptScriptNode(T)){const O=duplicateScript(T),F=T.parentNode;try{F.insertBefore(O,T)}catch(U){logError(U)}finally{T.remove()}}})}function makeFragment(w){const T=w.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i,""),O=getStartTag(T);let F;if(O==="html"){F=new DocumentFragment;const q=parseHTML(w);takeChildrenFor(F,q.body),F.title=q.title}else if(O==="body"){F=new DocumentFragment;const q=parseHTML(T);takeChildrenFor(F,q.body),F.title=q.title}else{const q=parseHTML('<body><template class="internal-htmx-wrapper">'+T+"</template></body>");F=q.querySelector("template").content,F.title=q.title;var U=F.querySelector("title");U&&U.parentNode===F&&(U.remove(),F.title=U.innerText)}return F&&(htmx.config.allowScriptTags?normalizeScriptTags(F):F.querySelectorAll("script").forEach(q=>q.remove())),F}function maybeCall(w){w&&w()}function isType(w,T){return Object.prototype.toString.call(w)==="[object "+T+"]"}function isFunction(w){return typeof w=="function"}function isRawObject(w){return isType(w,"Object")}function getInternalData(w){const T="htmx-internal-data";let O=w[T];return O||(O=w[T]={}),O}function toArray(w){const T=[];if(w)for(let O=0;O<w.length;O++)T.push(w[O]);return T}function forEach(w,T){if(w)for(let O=0;O<w.length;O++)T(w[O])}function isScrolledIntoView(w){const T=w.getBoundingClientRect(),O=T.top,F=T.bottom;return O<window.innerHeight&&F>=0}function bodyContains(w){return w.getRootNode({composed:!0})===document}function splitOnWhitespace(w){return w.trim().split(/\s+/)}function mergeObjects(w,T){for(const O in T)T.hasOwnProperty(O)&&(w[O]=T[O]);return w}function parseJSON(w){try{return JSON.parse(w)}catch(T){return logError(T),null}}function canAccessLocalStorage(){const w="htmx:sessionStorageTest";try{return sessionStorage.setItem(w,w),sessionStorage.removeItem(w),!0}catch{return!1}}function normalizePath(w){const T=new URL(w,"http://x");return T&&(w=T.pathname+T.search),w!="/"&&(w=w.replace(/\/+$/,"")),w}function internalEval(str){return maybeEval(getDocument().body,function(){return eval(str)})}function onLoadHelper(w){return htmx.on("htmx:load",function(O){w(O.detail.elt)})}function logAll(){htmx.logger=function(w,T,O){console&&console.log(T,w,O)}}function logNone(){htmx.logger=null}function find(w,T){return typeof w!="string"?w.querySelector(T):find(getDocument(),w)}function findAll(w,T){return typeof w!="string"?w.querySelectorAll(T):findAll(getDocument(),w)}function getWindow(){return window}function removeElement(w,T){w=resolveTarget(w),T?getWindow().setTimeout(function(){removeElement(w),w=null},T):parentElt(w).removeChild(w)}function asElement(w){return w instanceof Element?w:null}function asHtmlElement(w){return w instanceof HTMLElement?w:null}function asString(w){return typeof w=="string"?w:null}function asParentNode(w){return w instanceof Element||w instanceof Document||w instanceof DocumentFragment?w:null}function addClassToElement(w,T,O){w=asElement(resolveTarget(w)),w&&(O?getWindow().setTimeout(function(){addClassToElement(w,T),w=null},O):w.classList&&w.classList.add(T))}function removeClassFromElement(w,T,O){let F=asElement(resolveTarget(w));F&&(O?getWindow().setTimeout(function(){removeClassFromElement(F,T),F=null},O):F.classList&&(F.classList.remove(T),F.classList.length===0&&F.removeAttribute("class")))}function toggleClassOnElement(w,T){w=resolveTarget(w),w.classList.toggle(T)}function takeClassForElement(w,T){w=resolveTarget(w),forEach(w.parentElement.children,function(O){removeClassFromElement(O,T)}),addClassToElement(asElement(w),T)}function closest(w,T){return w=asElement(resolveTarget(w)),w?w.closest(T):null}function startsWith(w,T){return w.substring(0,T.length)===T}function endsWith(w,T){return w.substring(w.length-T.length)===T}function normalizeSelector(w){const T=w.trim();return startsWith(T,"<")&&endsWith(T,"/>")?T.substring(1,T.length-2):T}function querySelectorAllExt(w,T,O){if(T.indexOf("global ")===0)return querySelectorAllExt(w,T.slice(7),!0);w=resolveTarget(w);const F=[];{let W=0,j=0;for(let X=0;X<T.length;X++){const K=T[X];if(K===","&&W===0){F.push(T.substring(j,X)),j=X+1;continue}K==="<"?W++:K==="/"&&X<T.length-1&&T[X+1]===">"&&W--}j<T.length&&F.push(T.substring(j))}const U=[],q=[];for(;F.length>0;){const W=normalizeSelector(F.shift());let j;W.indexOf("closest ")===0?j=closest(asElement(w),normalizeSelector(W.slice(8))):W.indexOf("find ")===0?j=find(asParentNode(w),normalizeSelector(W.slice(5))):W==="next"||W==="nextElementSibling"?j=asElement(w).nextElementSibling:W.indexOf("next ")===0?j=scanForwardQuery(w,normalizeSelector(W.slice(5)),!!O):W==="previous"||W==="previousElementSibling"?j=asElement(w).previousElementSibling:W.indexOf("previous ")===0?j=scanBackwardsQuery(w,normalizeSelector(W.slice(9)),!!O):W==="document"?j=document:W==="window"?j=window:W==="body"?j=document.body:W==="root"?j=getRootNode(w,!!O):W==="host"?j=w.getRootNode().host:q.push(W),j&&U.push(j)}if(q.length>0){const W=q.join(","),j=asParentNode(getRootNode(w,!!O));U.push(...toArray(j.querySelectorAll(W)))}return U}var scanForwardQuery=function(w,T,O){const F=asParentNode(getRootNode(w,O)).querySelectorAll(T);for(let U=0;U<F.length;U++){const q=F[U];if(q.compareDocumentPosition(w)===Node.DOCUMENT_POSITION_PRECEDING)return q}},scanBackwardsQuery=function(w,T,O){const F=asParentNode(getRootNode(w,O)).querySelectorAll(T);for(let U=F.length-1;U>=0;U--){const q=F[U];if(q.compareDocumentPosition(w)===Node.DOCUMENT_POSITION_FOLLOWING)return q}};function querySelectorExt(w,T){return typeof w!="string"?querySelectorAllExt(w,T)[0]:querySelectorAllExt(getDocument().body,w)[0]}function resolveTarget(w,T){return typeof w=="string"?find(asParentNode(T)||document,w):w}function processEventArgs(w,T,O,F){return isFunction(T)?{target:getDocument().body,event:asString(w),listener:T,options:O}:{target:resolveTarget(w),event:asString(T),listener:O,options:F}}function addEventListenerImpl(w,T,O,F){return ready(function(){const q=processEventArgs(w,T,O,F);q.target.addEventListener(q.event,q.listener,q.options)}),isFunction(T)?T:O}function removeEventListenerImpl(w,T,O){return ready(function(){const F=processEventArgs(w,T,O);F.target.removeEventListener(F.event,F.listener)}),isFunction(T)?T:O}const DUMMY_ELT=getDocument().createElement("output");function findAttributeTargets(w,T){const O=getClosestAttributeValue(w,T);if(O){if(O==="this")return[findThisElement(w,T)];{const F=querySelectorAllExt(w,O);if(/(^|,)(\s*)inherit(\s*)($|,)/.test(O)){const q=asElement(getClosestMatch(w,function(W){return W!==w&&hasAttribute(asElement(W),T)}));q&&F.push(...findAttributeTargets(q,T))}return F.length===0?(logError('The selector "'+O+'" on '+T+" returned no matches!"),[DUMMY_ELT]):F}}}function findThisElement(w,T){return asElement(getClosestMatch(w,function(O){return getAttributeValue(asElement(O),T)!=null}))}function getTarget(w){const T=getClosestAttributeValue(w,"hx-target");return T?T==="this"?findThisElement(w,"hx-target"):querySelectorExt(w,T):getInternalData(w).boosted?getDocument().body:w}function shouldSettleAttribute(w){return htmx.config.attributesToSettle.includes(w)}function cloneAttributes(w,T){forEach(Array.from(w.attributes),function(O){!T.hasAttribute(O.name)&&shouldSettleAttribute(O.name)&&w.removeAttribute(O.name)}),forEach(T.attributes,function(O){shouldSettleAttribute(O.name)&&w.setAttribute(O.name,O.value)})}function isInlineSwap(w,T){const O=getExtensions(T);for(let F=0;F<O.length;F++){const U=O[F];try{if(U.isInlineSwap(w))return!0}catch(q){logError(q)}}return w==="outerHTML"}function oobSwap(w,T,O,F){F=F||getDocument();let U="#"+CSS.escape(getRawAttribute(T,"id")),q="outerHTML";w==="true"||(w.indexOf(":")>0?(q=w.substring(0,w.indexOf(":")),U=w.substring(w.indexOf(":")+1)):q=w),T.removeAttribute("hx-swap-oob"),T.removeAttribute("data-hx-swap-oob");const W=querySelectorAllExt(F,U,!1);return W.length?(forEach(W,function(j){let X;const K=T.cloneNode(!0);X=getDocument().createDocumentFragment(),X.appendChild(K),isInlineSwap(q,j)||(X=asParentNode(K));const J={shouldSwap:!0,target:j,fragment:X};triggerEvent(j,"htmx:oobBeforeSwap",J)&&(j=J.target,J.shouldSwap&&(handlePreservedElements(X),swapWithStyle(q,j,j,X,O),restorePreservedElements()),forEach(O.elts,function(Y){triggerEvent(Y,"htmx:oobAfterSwap",J)}))}),T.parentNode.removeChild(T)):(T.parentNode.removeChild(T),triggerErrorEvent(getDocument().body,"htmx:oobErrorNoTarget",{content:T})),w}function restorePreservedElements(){const w=find("#--htmx-preserve-pantry--");if(w){for(const T of[...w.children]){const O=find("#"+T.id);O.parentNode.moveBefore(T,O),O.remove()}w.remove()}}function handlePreservedElements(w){forEach(findAll(w,"[hx-preserve], [data-hx-preserve]"),function(T){const O=getAttributeValue(T,"id"),F=getDocument().getElementById(O);if(F!=null)if(T.moveBefore){let U=find("#--htmx-preserve-pantry--");U==null&&(getDocument().body.insertAdjacentHTML("afterend","<div id='--htmx-preserve-pantry--'></div>"),U=find("#--htmx-preserve-pantry--")),U.moveBefore(F,null)}else T.parentNode.replaceChild(F,T)})}function handleAttributes(w,T,O){forEach(T.querySelectorAll("[id]"),function(F){const U=getRawAttribute(F,"id");if(U&&U.length>0){const q=U.replace("'","\\'"),W=F.tagName.replace(":","\\:"),j=asParentNode(w),X=j&&j.querySelector(W+"[id='"+q+"']");if(X&&X!==j){const K=F.cloneNode();cloneAttributes(F,X),O.tasks.push(function(){cloneAttributes(F,K)})}}})}function makeAjaxLoadTask(w){return function(){removeClassFromElement(w,htmx.config.addedClass),processNode(asElement(w)),processFocus(asParentNode(w)),triggerEvent(w,"htmx:load")}}function processFocus(w){const T="[autofocus]",O=asHtmlElement(matches(w,T)?w:w.querySelector(T));O!=null&&O.focus()}function insertNodesBefore(w,T,O,F){for(handleAttributes(w,O,F);O.childNodes.length>0;){const U=O.firstChild;addClassToElement(asElement(U),htmx.config.addedClass),w.insertBefore(U,T),U.nodeType!==Node.TEXT_NODE&&U.nodeType!==Node.COMMENT_NODE&&F.tasks.push(makeAjaxLoadTask(U))}}function stringHash(w,T){let O=0;for(;O<w.length;)T=(T<<5)-T+w.charCodeAt(O++)|0;return T}function attributeHash(w){let T=0;for(let O=0;O<w.attributes.length;O++){const F=w.attributes[O];F.value&&(T=stringHash(F.name,T),T=stringHash(F.value,T))}return T}function deInitOnHandlers(w){const T=getInternalData(w);if(T.onHandlers){for(let O=0;O<T.onHandlers.length;O++){const F=T.onHandlers[O];removeEventListenerImpl(w,F.event,F.listener)}delete T.onHandlers}}function deInitNode(w){const T=getInternalData(w);T.timeout&&clearTimeout(T.timeout),T.listenerInfos&&forEach(T.listenerInfos,function(O){O.on&&removeEventListenerImpl(O.on,O.trigger,O.listener)}),deInitOnHandlers(w),forEach(Object.keys(T),function(O){O!=="firstInitCompleted"&&delete T[O]})}function cleanUpElement(w){triggerEvent(w,"htmx:beforeCleanupElement"),deInitNode(w),forEach(w.children,function(T){cleanUpElement(T)})}function swapOuterHTML(w,T,O){if(w.tagName==="BODY")return swapInnerHTML(w,T,O);let F;const U=w.previousSibling,q=parentElt(w);if(q){for(insertNodesBefore(q,w,T,O),U==null?F=q.firstChild:F=U.nextSibling,O.elts=O.elts.filter(function(W){return W!==w});F&&F!==w;)F instanceof Element&&O.elts.push(F),F=F.nextSibling;cleanUpElement(w),w.remove()}}function swapAfterBegin(w,T,O){return insertNodesBefore(w,w.firstChild,T,O)}function swapBeforeBegin(w,T,O){return insertNodesBefore(parentElt(w),w,T,O)}function swapBeforeEnd(w,T,O){return insertNodesBefore(w,null,T,O)}function swapAfterEnd(w,T,O){return insertNodesBefore(parentElt(w),w.nextSibling,T,O)}function swapDelete(w){cleanUpElement(w);const T=parentElt(w);if(T)return T.removeChild(w)}function swapInnerHTML(w,T,O){const F=w.firstChild;if(insertNodesBefore(w,F,T,O),F){for(;F.nextSibling;)cleanUpElement(F.nextSibling),w.removeChild(F.nextSibling);cleanUpElement(F),w.removeChild(F)}}function swapWithStyle(w,T,O,F,U){switch(w){case"none":return;case"outerHTML":swapOuterHTML(O,F,U);return;case"afterbegin":swapAfterBegin(O,F,U);return;case"beforebegin":swapBeforeBegin(O,F,U);return;case"beforeend":swapBeforeEnd(O,F,U);return;case"afterend":swapAfterEnd(O,F,U);return;case"delete":swapDelete(O);return;default:var q=getExtensions(T);for(let W=0;W<q.length;W++){const j=q[W];try{const X=j.handleSwap(w,O,F,U);if(X){if(Array.isArray(X))for(let K=0;K<X.length;K++){const J=X[K];J.nodeType!==Node.TEXT_NODE&&J.nodeType!==Node.COMMENT_NODE&&U.tasks.push(makeAjaxLoadTask(J))}return}}catch(X){logError(X)}}w==="innerHTML"?swapInnerHTML(O,F,U):swapWithStyle(htmx.config.defaultSwapStyle,T,O,F,U)}}function findAndSwapOobElements(w,T,O){var F=findAll(w,"[hx-swap-oob], [data-hx-swap-oob]");return forEach(F,function(U){if(htmx.config.allowNestedOobSwaps||U.parentElement===null){const q=getAttributeValue(U,"hx-swap-oob");q!=null&&oobSwap(q,U,T,O)}else U.removeAttribute("hx-swap-oob"),U.removeAttribute("data-hx-swap-oob")}),F.length>0}function swap(w,T,O,F){F||(F={});let U=null,q=null,W=function(){maybeCall(F.beforeSwapCallback),w=resolveTarget(w);const K=F.contextElement?getRootNode(F.contextElement,!1):getDocument(),J=document.activeElement;let Y={};Y={elt:J,start:J?J.selectionStart:null,end:J?J.selectionEnd:null};const G=makeSettleInfo(w);if(O.swapStyle==="textContent")w.textContent=T;else{let tt=makeFragment(T);if(G.title=F.title||tt.title,F.historyRequest&&(tt=tt.querySelector("[hx-history-elt],[data-hx-history-elt]")||tt),F.selectOOB){const et=F.selectOOB.split(",");for(let ot=0;ot<et.length;ot++){const rt=et[ot].split(":",2);let st=rt[0].trim();st.indexOf("#")===0&&(st=st.substring(1));const nt=rt[1]||"true",it=tt.querySelector("#"+st);it&&oobSwap(nt,it,G,K)}}if(findAndSwapOobElements(tt,G,K),forEach(findAll(tt,"template"),function(et){et.content&&findAndSwapOobElements(et.content,G,K)&&et.remove()}),F.select){const et=getDocument().createDocumentFragment();forEach(tt.querySelectorAll(F.select),function(ot){et.appendChild(ot)}),tt=et}handlePreservedElements(tt),swapWithStyle(O.swapStyle,F.contextElement,w,tt,G),restorePreservedElements()}if(Y.elt&&!bodyContains(Y.elt)&&getRawAttribute(Y.elt,"id")){const tt=document.getElementById(getRawAttribute(Y.elt,"id")),et={preventScroll:O.focusScroll!==void 0?!O.focusScroll:!htmx.config.defaultFocusScroll};if(tt){if(Y.start&&tt.setSelectionRange)try{tt.setSelectionRange(Y.start,Y.end)}catch{}tt.focus(et)}}w.classList.remove(htmx.config.swappingClass),forEach(G.elts,function(tt){tt.classList&&tt.classList.add(htmx.config.settlingClass),triggerEvent(tt,"htmx:afterSwap",F.eventInfo)}),maybeCall(F.afterSwapCallback),O.ignoreTitle||handleTitle(G.title);const Q=function(){if(forEach(G.tasks,function(tt){tt.call()}),forEach(G.elts,function(tt){tt.classList&&tt.classList.remove(htmx.config.settlingClass),triggerEvent(tt,"htmx:afterSettle",F.eventInfo)}),F.anchor){const tt=asElement(resolveTarget("#"+F.anchor));tt&&tt.scrollIntoView({block:"start",behavior:"auto"})}updateScrollState(G.elts,O),maybeCall(F.afterSettleCallback),maybeCall(U)};O.settleDelay>0?getWindow().setTimeout(Q,O.settleDelay):Q()},j=htmx.config.globalViewTransitions;O.hasOwnProperty("transition")&&(j=O.transition);const X=F.contextElement||getDocument();if(j&&triggerEvent(X,"htmx:beforeTransition",F.eventInfo)&&typeof Promise<"u"&&document.startViewTransition){const K=new Promise(function(Y,G){U=Y,q=G}),J=W;W=function(){document.startViewTransition(function(){return J(),K})}}try{O!=null&&O.swapDelay&&O.swapDelay>0?getWindow().setTimeout(W,O.swapDelay):W()}catch(K){throw triggerErrorEvent(X,"htmx:swapError",F.eventInfo),maybeCall(q),K}}function handleTriggerHeader(w,T,O){const F=w.getResponseHeader(T);if(F.indexOf("{")===0){const U=parseJSON(F);for(const q in U)if(U.hasOwnProperty(q)){let W=U[q];isRawObject(W)?O=W.target!==void 0?W.target:O:W={value:W},triggerEvent(O,q,W)}}else{const U=F.split(",");for(let q=0;q<U.length;q++)triggerEvent(O,U[q].trim(),[])}}const WHITESPACE_OR_COMMA=/[\s,]/,SYMBOL_START=/[_$a-zA-Z]/,SYMBOL_CONT=/[_$a-zA-Z0-9]/,STRINGISH_START=['"',"'","/"],NOT_WHITESPACE=/[^\s]/,COMBINED_SELECTOR_START=/[{(]/,COMBINED_SELECTOR_END=/[})]/;function tokenizeString(w){const T=[];let O=0;for(;O<w.length;){if(SYMBOL_START.exec(w.charAt(O))){for(var F=O;SYMBOL_CONT.exec(w.charAt(O+1));)O++;T.push(w.substring(F,O+1))}else if(STRINGISH_START.indexOf(w.charAt(O))!==-1){const U=w.charAt(O);var F=O;for(O++;O<w.length&&w.charAt(O)!==U;)w.charAt(O)==="\\"&&O++,O++;T.push(w.substring(F,O+1))}else{const U=w.charAt(O);T.push(U)}O++}return T}function isPossibleRelativeReference(w,T,O){return SYMBOL_START.exec(w.charAt(0))&&w!=="true"&&w!=="false"&&w!=="this"&&w!==O&&T!=="."}function maybeGenerateConditional(w,T,O){if(T[0]==="["){T.shift();let F=1,U=" return (function("+O+"){ return (",q=null;for(;T.length>0;){const W=T[0];if(W==="]"){if(F--,F===0){q===null&&(U=U+"true"),T.shift(),U+=")})";try{const j=maybeEval(w,function(){return Function(U)()},function(){return!0});return j.source=U,j}catch(j){return triggerErrorEvent(getDocument().body,"htmx:syntax:error",{error:j,source:U}),null}}}else W==="["&&F++;isPossibleRelativeReference(W,q,O)?U+="(("+O+"."+W+") ? ("+O+"."+W+") : (window."+W+"))":U=U+W,q=T.shift()}}}function consumeUntil(w,T){let O="";for(;w.length>0&&!T.test(w[0]);)O+=w.shift();return O}function consumeCSSSelector(w){let T;return w.length>0&&COMBINED_SELECTOR_START.test(w[0])?(w.shift(),T=consumeUntil(w,COMBINED_SELECTOR_END).trim(),w.shift()):T=consumeUntil(w,WHITESPACE_OR_COMMA),T}const INPUT_SELECTOR="input, textarea, select";function parseAndCacheTrigger(w,T,O){const F=[],U=tokenizeString(T);do{consumeUntil(U,NOT_WHITESPACE);const j=U.length,X=consumeUntil(U,/[,\[\s]/);if(X!=="")if(X==="every"){const K={trigger:"every"};consumeUntil(U,NOT_WHITESPACE),K.pollInterval=parseInterval(consumeUntil(U,/[,\[\s]/)),consumeUntil(U,NOT_WHITESPACE);var q=maybeGenerateConditional(w,U,"event");q&&(K.eventFilter=q),F.push(K)}else{const K={trigger:X};var q=maybeGenerateConditional(w,U,"event");for(q&&(K.eventFilter=q),consumeUntil(U,NOT_WHITESPACE);U.length>0&&U[0]!==",";){const Y=U.shift();if(Y==="changed")K.changed=!0;else if(Y==="once")K.once=!0;else if(Y==="consume")K.consume=!0;else if(Y==="delay"&&U[0]===":")U.shift(),K.delay=parseInterval(consumeUntil(U,WHITESPACE_OR_COMMA));else if(Y==="from"&&U[0]===":"){if(U.shift(),COMBINED_SELECTOR_START.test(U[0]))var W=consumeCSSSelector(U);else{var W=consumeUntil(U,WHITESPACE_OR_COMMA);if(W==="closest"||W==="find"||W==="next"||W==="previous"){U.shift();const Q=consumeCSSSelector(U);Q.length>0&&(W+=" "+Q)}}K.from=W}else Y==="target"&&U[0]===":"?(U.shift(),K.target=consumeCSSSelector(U)):Y==="throttle"&&U[0]===":"?(U.shift(),K.throttle=parseInterval(consumeUntil(U,WHITESPACE_OR_COMMA))):Y==="queue"&&U[0]===":"?(U.shift(),K.queue=consumeUntil(U,WHITESPACE_OR_COMMA)):Y==="root"&&U[0]===":"?(U.shift(),K[Y]=consumeCSSSelector(U)):Y==="threshold"&&U[0]===":"?(U.shift(),K[Y]=consumeUntil(U,WHITESPACE_OR_COMMA)):triggerErrorEvent(w,"htmx:syntax:error",{token:U.shift()});consumeUntil(U,NOT_WHITESPACE)}F.push(K)}U.length===j&&triggerErrorEvent(w,"htmx:syntax:error",{token:U.shift()}),consumeUntil(U,NOT_WHITESPACE)}while(U[0]===","&&U.shift());return O&&(O[T]=F),F}function getTriggerSpecs(w){const T=getAttributeValue(w,"hx-trigger");let O=[];if(T){const F=htmx.config.triggerSpecsCache;O=F&&F[T]||parseAndCacheTrigger(w,T,F)}return O.length>0?O:matches(w,"form")?[{trigger:"submit"}]:matches(w,'input[type="button"], input[type="submit"]')?[{trigger:"click"}]:matches(w,INPUT_SELECTOR)?[{trigger:"change"}]:[{trigger:"click"}]}function cancelPolling(w){getInternalData(w).cancelled=!0}function processPolling(w,T,O){const F=getInternalData(w);F.timeout=getWindow().setTimeout(function(){bodyContains(w)&&F.cancelled!==!0&&(maybeFilterEvent(O,w,makeEvent("hx:poll:trigger",{triggerSpec:O,target:w}))||T(w),processPolling(w,T,O))},O.pollInterval)}function isLocalLink(w){return location.hostname===w.hostname&&getRawAttribute(w,"href")&&getRawAttribute(w,"href").indexOf("#")!==0}function eltIsDisabled(w){return closest(w,htmx.config.disableSelector)}function boostElement(w,T,O){if(w instanceof HTMLAnchorElement&&isLocalLink(w)&&(w.target===""||w.target==="_self")||w.tagName==="FORM"&&String(getRawAttribute(w,"method")).toLowerCase()!=="dialog"){T.boosted=!0;let F,U;if(w.tagName==="A")F="get",U=getRawAttribute(w,"href");else{const q=getRawAttribute(w,"method");F=q?q.toLowerCase():"get",U=getRawAttribute(w,"action"),(U==null||U==="")&&(U=location.href),F==="get"&&U.includes("?")&&(U=U.replace(/\?[^#]+/,""))}O.forEach(function(q){addEventListener(w,function(W,j){const X=asElement(W);if(eltIsDisabled(X)){cleanUpElement(X);return}issueAjaxRequest(F,U,X,j)},T,q,!0)})}}function shouldCancel(w,T){if(w.type==="submit"&&T.tagName==="FORM")return!0;if(w.type==="click"){const O=T.closest('input[type="submit"], button');if(O&&O.form&&O.type==="submit")return!0;const F=T.closest("a"),U=/^#.+/;if(F&&F.href&&!U.test(F.getAttribute("href")))return!0}return!1}function ignoreBoostedAnchorCtrlClick(w,T){return getInternalData(w).boosted&&w instanceof HTMLAnchorElement&&T.type==="click"&&(T.ctrlKey||T.metaKey)}function maybeFilterEvent(w,T,O){const F=w.eventFilter;if(F)try{return F.call(T,O)!==!0}catch(U){const q=F.source;return triggerErrorEvent(getDocument().body,"htmx:eventFilter:error",{error:U,source:q}),!0}return!1}function addEventListener(w,T,O,F,U){const q=getInternalData(w);let W;F.from?W=querySelectorAllExt(w,F.from):W=[w],F.changed&&("lastValue"in q||(q.lastValue=new WeakMap),W.forEach(function(j){q.lastValue.has(F)||q.lastValue.set(F,new WeakMap),q.lastValue.get(F).set(j,j.value)})),forEach(W,function(j){const X=function(K){if(!bodyContains(w)){j.removeEventListener(F.trigger,X);return}if(ignoreBoostedAnchorCtrlClick(w,K)||((U||shouldCancel(K,j))&&K.preventDefault(),maybeFilterEvent(F,w,K)))return;const J=getInternalData(K);if(J.triggerSpec=F,J.handledFor==null&&(J.handledFor=[]),J.handledFor.indexOf(w)<0){if(J.handledFor.push(w),F.consume&&K.stopPropagation(),F.target&&K.target&&!matches(asElement(K.target),F.target))return;if(F.once){if(q.triggeredOnce)return;q.triggeredOnce=!0}if(F.changed){const Y=K.target,G=Y.value,Q=q.lastValue.get(F);if(Q.has(Y)&&Q.get(Y)===G)return;Q.set(Y,G)}if(q.delayed&&clearTimeout(q.delayed),q.throttle)return;F.throttle>0?q.throttle||(triggerEvent(w,"htmx:trigger"),T(w,K),q.throttle=getWindow().setTimeout(function(){q.throttle=null},F.throttle)):F.delay>0?q.delayed=getWindow().setTimeout(function(){triggerEvent(w,"htmx:trigger"),T(w,K)},F.delay):(triggerEvent(w,"htmx:trigger"),T(w,K))}};O.listenerInfos==null&&(O.listenerInfos=[]),O.listenerInfos.push({trigger:F.trigger,listener:X,on:j}),j.addEventListener(F.trigger,X)})}let windowIsScrolling=!1,scrollHandler=null;function initScrollHandler(){scrollHandler||(scrollHandler=function(){windowIsScrolling=!0},window.addEventListener("scroll",scrollHandler),window.addEventListener("resize",scrollHandler),setInterval(function(){windowIsScrolling&&(windowIsScrolling=!1,forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"),function(w){maybeReveal(w)}))},200))}function maybeReveal(w){!hasAttribute(w,"data-hx-revealed")&&isScrolledIntoView(w)&&(w.setAttribute("data-hx-revealed","true"),getInternalData(w).initHash?triggerEvent(w,"revealed"):w.addEventListener("htmx:afterProcessNode",function(){triggerEvent(w,"revealed")},{once:!0}))}function loadImmediately(w,T,O,F){const U=function(){O.loaded||(O.loaded=!0,triggerEvent(w,"htmx:trigger"),T(w))};F>0?getWindow().setTimeout(U,F):U()}function processVerbs(w,T,O){let F=!1;return forEach(VERBS,function(U){if(hasAttribute(w,"hx-"+U)){const q=getAttributeValue(w,"hx-"+U);F=!0,T.path=q,T.verb=U,O.forEach(function(W){addTriggerHandler(w,W,T,function(j,X){const K=asElement(j);if(eltIsDisabled(K)){cleanUpElement(K);return}issueAjaxRequest(U,q,K,X)})})}}),F}function addTriggerHandler(w,T,O,F){if(T.trigger==="revealed")initScrollHandler(),addEventListener(w,F,O,T),maybeReveal(asElement(w));else if(T.trigger==="intersect"){const U={};T.root&&(U.root=querySelectorExt(w,T.root)),T.threshold&&(U.threshold=parseFloat(T.threshold)),new IntersectionObserver(function(W){for(let j=0;j<W.length;j++)if(W[j].isIntersecting){triggerEvent(w,"intersect");break}},U).observe(asElement(w)),addEventListener(asElement(w),F,O,T)}else!O.firstInitCompleted&&T.trigger==="load"?maybeFilterEvent(T,w,makeEvent("load",{elt:w}))||loadImmediately(asElement(w),F,O,T.delay):T.pollInterval>0?(O.polling=!0,processPolling(asElement(w),F,T)):addEventListener(w,F,O,T)}function shouldProcessHxOn(w){const T=asElement(w);if(!T)return!1;const O=T.attributes;for(let F=0;F<O.length;F++){const U=O[F].name;if(startsWith(U,"hx-on:")||startsWith(U,"data-hx-on:")||startsWith(U,"hx-on-")||startsWith(U,"data-hx-on-"))return!0}return!1}const HX_ON_QUERY=new XPathEvaluator().createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');function processHXOnRoot(w,T){shouldProcessHxOn(w)&&T.push(asElement(w));const O=HX_ON_QUERY.evaluate(w);let F=null;for(;F=O.iterateNext();)T.push(asElement(F))}function findHxOnWildcardElements(w){const T=[];if(w instanceof DocumentFragment)for(const O of w.childNodes)processHXOnRoot(O,T);else processHXOnRoot(w,T);return T}function findElementsToProcess(w){if(w.querySelectorAll){const O=", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]",F=[];for(const q in extensions){const W=extensions[q];if(W.getSelectors){var T=W.getSelectors();T&&F.push(T)}}return w.querySelectorAll(VERB_SELECTOR+O+", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]"+F.flat().map(q=>", "+q).join(""))}else return[]}function maybeSetLastButtonClicked(w){const T=getTargetButton(w.target),O=getRelatedFormData(w);O&&(O.lastButtonClicked=T)}function maybeUnsetLastButtonClicked(w){const T=getRelatedFormData(w);T&&(T.lastButtonClicked=null)}function getTargetButton(w){return closest(asElement(w),"button, input[type='submit']")}function getRelatedForm(w){return w.form||closest(w,"form")}function getRelatedFormData(w){const T=getTargetButton(w.target);if(!T)return;const O=getRelatedForm(T);if(O)return getInternalData(O)}function initButtonTracking(w){w.addEventListener("click",maybeSetLastButtonClicked),w.addEventListener("focusin",maybeSetLastButtonClicked),w.addEventListener("focusout",maybeUnsetLastButtonClicked)}function addHxOnEventHandler(w,T,O){const F=getInternalData(w);Array.isArray(F.onHandlers)||(F.onHandlers=[]);let U;const q=function(W){maybeEval(w,function(){eltIsDisabled(w)||(U||(U=new Function("event",O)),U.call(w,W))})};w.addEventListener(T,q),F.onHandlers.push({event:T,listener:q})}function processHxOnWildcard(w){deInitOnHandlers(w);for(let T=0;T<w.attributes.length;T++){const O=w.attributes[T].name,F=w.attributes[T].value;if(startsWith(O,"hx-on")||startsWith(O,"data-hx-on")){const U=O.indexOf("-on")+3,q=O.slice(U,U+1);if(q==="-"||q===":"){let W=O.slice(U+1);startsWith(W,":")?W="htmx"+W:startsWith(W,"-")?W="htmx:"+W.slice(1):startsWith(W,"htmx-")&&(W="htmx:"+W.slice(5)),addHxOnEventHandler(w,W,F)}}}}function initNode(w){triggerEvent(w,"htmx:beforeProcessNode");const T=getInternalData(w),O=getTriggerSpecs(w);processVerbs(w,T,O)||(getClosestAttributeValue(w,"hx-boost")==="true"?boostElement(w,T,O):hasAttribute(w,"hx-trigger")&&O.forEach(function(U){addTriggerHandler(w,U,T,function(){})})),(w.tagName==="FORM"||getRawAttribute(w,"type")==="submit"&&hasAttribute(w,"form"))&&initButtonTracking(w),T.firstInitCompleted=!0,triggerEvent(w,"htmx:afterProcessNode")}function maybeDeInitAndHash(w){if(!(w instanceof Element))return!1;const T=getInternalData(w),O=attributeHash(w);return T.initHash!==O?(deInitNode(w),T.initHash=O,!0):!1}function processNode(w){if(w=resolveTarget(w),eltIsDisabled(w)){cleanUpElement(w);return}const T=[];maybeDeInitAndHash(w)&&T.push(w),forEach(findElementsToProcess(w),function(O){if(eltIsDisabled(O)){cleanUpElement(O);return}maybeDeInitAndHash(O)&&T.push(O)}),forEach(findHxOnWildcardElements(w),processHxOnWildcard),forEach(T,initNode)}function kebabEventName(w){return w.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function makeEvent(w,T){return new CustomEvent(w,{bubbles:!0,cancelable:!0,composed:!0,detail:T})}function triggerErrorEvent(w,T,O){triggerEvent(w,T,mergeObjects({error:T},O))}function ignoreEventForLogging(w){return w==="htmx:afterProcessNode"}function withExtensions(w,T,O){forEach(getExtensions(w,[],O),function(F){try{T(F)}catch(U){logError(U)}})}function logError(w){console.error(w)}function triggerEvent(w,T,O){w=resolveTarget(w),O==null&&(O={}),O.elt=w;const F=makeEvent(T,O);htmx.logger&&!ignoreEventForLogging(T)&&htmx.logger(w,T,O),O.error&&(logError(O.error),triggerEvent(w,"htmx:error",{errorInfo:O}));let U=w.dispatchEvent(F);const q=kebabEventName(T);if(U&&q!==T){const W=makeEvent(q,F.detail);U=U&&w.dispatchEvent(W)}return withExtensions(asElement(w),function(W){U=U&&W.onEvent(T,F)!==!1&&!F.defaultPrevented}),U}let currentPathForHistory;function setCurrentPathForHistory(w){currentPathForHistory=w,canAccessLocalStorage()&&sessionStorage.setItem("htmx-current-path-for-history",w)}setCurrentPathForHistory(location.pathname+location.search);function getHistoryElement(){return getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]")||getDocument().body}function saveToHistoryCache(w,T){if(!canAccessLocalStorage())return;const O=cleanInnerHtmlForHistory(T),F=getDocument().title,U=window.scrollY;if(htmx.config.historyCacheSize<=0){sessionStorage.removeItem("htmx-history-cache");return}w=normalizePath(w);const q=parseJSON(sessionStorage.getItem("htmx-history-cache"))||[];for(let j=0;j<q.length;j++)if(q[j].url===w){q.splice(j,1);break}const W={url:w,content:O,title:F,scroll:U};for(triggerEvent(getDocument().body,"htmx:historyItemCreated",{item:W,cache:q}),q.push(W);q.length>htmx.config.historyCacheSize;)q.shift();for(;q.length>0;)try{sessionStorage.setItem("htmx-history-cache",JSON.stringify(q));break}catch(j){triggerErrorEvent(getDocument().body,"htmx:historyCacheError",{cause:j,cache:q}),q.shift()}}function getCachedHistory(w){if(!canAccessLocalStorage())return null;w=normalizePath(w);const T=parseJSON(sessionStorage.getItem("htmx-history-cache"))||[];for(let O=0;O<T.length;O++)if(T[O].url===w)return T[O];return null}function cleanInnerHtmlForHistory(w){const T=htmx.config.requestClass,O=w.cloneNode(!0);return forEach(findAll(O,"."+T),function(F){removeClassFromElement(F,T)}),forEach(findAll(O,"[data-disabled-by-htmx]"),function(F){F.removeAttribute("disabled")}),O.innerHTML}function saveCurrentPageToHistory(){const w=getHistoryElement();let T=currentPathForHistory;canAccessLocalStorage()&&(T=sessionStorage.getItem("htmx-current-path-for-history")),T=T||location.pathname+location.search,getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]')||(triggerEvent(getDocument().body,"htmx:beforeHistorySave",{path:T,historyElt:w}),saveToHistoryCache(T,w)),htmx.config.historyEnabled&&history.replaceState({htmx:!0},getDocument().title,location.href)}function pushUrlIntoHistory(w){htmx.config.getCacheBusterParam&&(w=w.replace(/org\.htmx\.cache-buster=[^&]*&?/,""),(endsWith(w,"&")||endsWith(w,"?"))&&(w=w.slice(0,-1))),htmx.config.historyEnabled&&history.pushState({htmx:!0},"",w),setCurrentPathForHistory(w)}function replaceUrlInHistory(w){htmx.config.historyEnabled&&history.replaceState({htmx:!0},"",w),setCurrentPathForHistory(w)}function settleImmediately(w){forEach(w,function(T){T.call(void 0)})}function loadHistoryFromServer(w){const T=new XMLHttpRequest,O={swapStyle:"innerHTML",swapDelay:0,settleDelay:0},F={path:w,xhr:T,historyElt:getHistoryElement(),swapSpec:O};T.open("GET",w,!0),htmx.config.historyRestoreAsHxRequest&&T.setRequestHeader("HX-Request","true"),T.setRequestHeader("HX-History-Restore-Request","true"),T.setRequestHeader("HX-Current-URL",location.href),T.onload=function(){this.status>=200&&this.status<400?(F.response=this.response,triggerEvent(getDocument().body,"htmx:historyCacheMissLoad",F),swap(F.historyElt,F.response,O,{contextElement:F.historyElt,historyRequest:!0}),setCurrentPathForHistory(F.path),triggerEvent(getDocument().body,"htmx:historyRestore",{path:w,cacheMiss:!0,serverResponse:F.response})):triggerErrorEvent(getDocument().body,"htmx:historyCacheMissLoadError",F)},triggerEvent(getDocument().body,"htmx:historyCacheMiss",F)&&T.send()}function restoreHistory(w){saveCurrentPageToHistory(),w=w||location.pathname+location.search;const T=getCachedHistory(w);if(T){const O={swapStyle:"innerHTML",swapDelay:0,settleDelay:0,scroll:T.scroll},F={path:w,item:T,historyElt:getHistoryElement(),swapSpec:O};triggerEvent(getDocument().body,"htmx:historyCacheHit",F)&&(swap(F.historyElt,T.content,O,{contextElement:F.historyElt,title:T.title}),setCurrentPathForHistory(F.path),triggerEvent(getDocument().body,"htmx:historyRestore",F))}else htmx.config.refreshOnHistoryMiss?htmx.location.reload(!0):loadHistoryFromServer(w)}function addRequestIndicatorClasses(w){let T=findAttributeTargets(w,"hx-indicator");return T==null&&(T=[w]),forEach(T,function(O){const F=getInternalData(O);F.requestCount=(F.requestCount||0)+1,O.classList.add.call(O.classList,htmx.config.requestClass)}),T}function disableElements(w){let T=findAttributeTargets(w,"hx-disabled-elt");return T==null&&(T=[]),forEach(T,function(O){const F=getInternalData(O);F.requestCount=(F.requestCount||0)+1,O.setAttribute("disabled",""),O.setAttribute("data-disabled-by-htmx","")}),T}function removeRequestIndicators(w,T){forEach(w.concat(T),function(O){const F=getInternalData(O);F.requestCount=(F.requestCount||1)-1}),forEach(w,function(O){getInternalData(O).requestCount===0&&O.classList.remove.call(O.classList,htmx.config.requestClass)}),forEach(T,function(O){getInternalData(O).requestCount===0&&(O.removeAttribute("disabled"),O.removeAttribute("data-disabled-by-htmx"))})}function haveSeenNode(w,T){for(let O=0;O<w.length;O++)if(w[O].isSameNode(T))return!0;return!1}function shouldInclude(w){const T=w;return T.name===""||T.name==null||T.disabled||closest(T,"fieldset[disabled]")||T.type==="button"||T.type==="submit"||T.tagName==="image"||T.tagName==="reset"||T.tagName==="file"?!1:T.type==="checkbox"||T.type==="radio"?T.checked:!0}function addValueToFormData(w,T,O){w!=null&&T!=null&&(Array.isArray(T)?T.forEach(function(F){O.append(w,F)}):O.append(w,T))}function removeValueFromFormData(w,T,O){if(w!=null&&T!=null){let F=O.getAll(w);Array.isArray(T)?F=F.filter(U=>T.indexOf(U)<0):F=F.filter(U=>U!==T),O.delete(w),forEach(F,U=>O.append(w,U))}}function getValueFromInput(w){return w instanceof HTMLSelectElement&&w.multiple?toArray(w.querySelectorAll("option:checked")).map(function(T){return T.value}):w instanceof HTMLInputElement&&w.files?toArray(w.files):w.value}function processInputValue(w,T,O,F,U){if(!(F==null||haveSeenNode(w,F))){if(w.push(F),shouldInclude(F)){const q=getRawAttribute(F,"name");addValueToFormData(q,getValueFromInput(F),T),U&&validateElement(F,O)}F instanceof HTMLFormElement&&(forEach(F.elements,function(q){w.indexOf(q)>=0?removeValueFromFormData(q.name,getValueFromInput(q),T):w.push(q),U&&validateElement(q,O)}),new FormData(F).forEach(function(q,W){q instanceof File&&q.name===""||addValueToFormData(W,q,T)}))}}function validateElement(w,T){const O=w;O.willValidate&&(triggerEvent(O,"htmx:validation:validate"),O.checkValidity()||(triggerEvent(O,"htmx:validation:failed",{message:O.validationMessage,validity:O.validity})&&!T.length&&htmx.config.reportValidityOfForms&&O.reportValidity(),T.push({elt:O,message:O.validationMessage,validity:O.validity})))}function overrideFormData(w,T){for(const O of T.keys())w.delete(O);return T.forEach(function(O,F){w.append(F,O)}),w}function getInputValues(w,T){const O=[],F=new FormData,U=new FormData,q=[],W=getInternalData(w);W.lastButtonClicked&&!bodyContains(W.lastButtonClicked)&&(W.lastButtonClicked=null);let j=w instanceof HTMLFormElement&&w.noValidate!==!0||getAttributeValue(w,"hx-validate")==="true";if(W.lastButtonClicked&&(j=j&&W.lastButtonClicked.formNoValidate!==!0),T!=="get"&&processInputValue(O,U,q,getRelatedForm(w),j),processInputValue(O,F,q,w,j),W.lastButtonClicked||w.tagName==="BUTTON"||w.tagName==="INPUT"&&getRawAttribute(w,"type")==="submit"){const K=W.lastButtonClicked||w,J=getRawAttribute(K,"name");addValueToFormData(J,K.value,U)}const X=findAttributeTargets(w,"hx-include");return forEach(X,function(K){processInputValue(O,F,q,asElement(K),j),matches(K,"form")||forEach(asParentNode(K).querySelectorAll(INPUT_SELECTOR),function(J){processInputValue(O,F,q,J,j)})}),overrideFormData(F,U),{errors:q,formData:F,values:formDataProxy(F)}}function appendParam(w,T,O){w!==""&&(w+="&"),String(O)==="[object Object]"&&(O=JSON.stringify(O));const F=encodeURIComponent(O);return w+=encodeURIComponent(T)+"="+F,w}function urlEncode(w){w=formDataFromObject(w);let T="";return w.forEach(function(O,F){T=appendParam(T,F,O)}),T}function getHeaders(w,T,O){const F={"HX-Request":"true","HX-Trigger":getRawAttribute(w,"id"),"HX-Trigger-Name":getRawAttribute(w,"name"),"HX-Target":getAttributeValue(T,"id"),"HX-Current-URL":location.href};return getValuesForElement(w,"hx-headers",!1,F),O!==void 0&&(F["HX-Prompt"]=O),getInternalData(w).boosted&&(F["HX-Boosted"]="true"),F}function filterValues(w,T){const O=getClosestAttributeValue(T,"hx-params");if(O){if(O==="none")return new FormData;if(O==="*")return w;if(O.indexOf("not ")===0)return forEach(O.slice(4).split(","),function(F){F=F.trim(),w.delete(F)}),w;{const F=new FormData;return forEach(O.split(","),function(U){U=U.trim(),w.has(U)&&w.getAll(U).forEach(function(q){F.append(U,q)})}),F}}else return w}function isAnchorLink(w){return!!getRawAttribute(w,"href")&&getRawAttribute(w,"href").indexOf("#")>=0}function getSwapSpecification(w,T){const O=T||getClosestAttributeValue(w,"hx-swap"),F={swapStyle:getInternalData(w).boosted?"innerHTML":htmx.config.defaultSwapStyle,swapDelay:htmx.config.defaultSwapDelay,settleDelay:htmx.config.defaultSettleDelay};if(htmx.config.scrollIntoViewOnBoost&&getInternalData(w).boosted&&!isAnchorLink(w)&&(F.show="top"),O){const W=splitOnWhitespace(O);if(W.length>0)for(let j=0;j<W.length;j++){const X=W[j];if(X.indexOf("swap:")===0)F.swapDelay=parseInterval(X.slice(5));else if(X.indexOf("settle:")===0)F.settleDelay=parseInterval(X.slice(7));else if(X.indexOf("transition:")===0)F.transition=X.slice(11)==="true";else if(X.indexOf("ignoreTitle:")===0)F.ignoreTitle=X.slice(12)==="true";else if(X.indexOf("scroll:")===0){var U=X.slice(7).split(":");const J=U.pop();var q=U.length>0?U.join(":"):null;F.scroll=J,F.scrollTarget=q}else if(X.indexOf("show:")===0){var U=X.slice(5).split(":");const Y=U.pop();var q=U.length>0?U.join(":"):null;F.show=Y,F.showTarget=q}else if(X.indexOf("focus-scroll:")===0){const K=X.slice(13);F.focusScroll=K=="true"}else j==0?F.swapStyle=X:logError("Unknown modifier in hx-swap: "+X)}}return F}function usesFormData(w){return getClosestAttributeValue(w,"hx-encoding")==="multipart/form-data"||matches(w,"form")&&getRawAttribute(w,"enctype")==="multipart/form-data"}function encodeParamsForBody(w,T,O){let F=null;return withExtensions(T,function(U){F==null&&(F=U.encodeParameters(w,O,T))}),F??(usesFormData(T)?overrideFormData(new FormData,formDataFromObject(O)):urlEncode(O))}function makeSettleInfo(w){return{tasks:[],elts:[w]}}function updateScrollState(w,T){const O=w[0],F=w[w.length-1];if(T.scroll){var U=null;T.scrollTarget&&(U=asElement(querySelectorExt(O,T.scrollTarget))),T.scroll==="top"&&(O||U)&&(U=U||O,U.scrollTop=0),T.scroll==="bottom"&&(F||U)&&(U=U||F,U.scrollTop=U.scrollHeight),typeof T.scroll=="number"&&getWindow().setTimeout(function(){window.scrollTo(0,T.scroll)},0)}if(T.show){var U=null;if(T.showTarget){let W=T.showTarget;T.showTarget==="window"&&(W="body"),U=asElement(querySelectorExt(O,W))}T.show==="top"&&(O||U)&&(U=U||O,U.scrollIntoView({block:"start",behavior:htmx.config.scrollBehavior})),T.show==="bottom"&&(F||U)&&(U=U||F,U.scrollIntoView({block:"end",behavior:htmx.config.scrollBehavior}))}}function getValuesForElement(w,T,O,F,U){if(F==null&&(F={}),w==null)return F;const q=getAttributeValue(w,T);if(q){let W=q.trim(),j=O;if(W==="unset")return null;W.indexOf("javascript:")===0?(W=W.slice(11),j=!0):W.indexOf("js:")===0&&(W=W.slice(3),j=!0),W.indexOf("{")!==0&&(W="{"+W+"}");let X;j?X=maybeEval(w,function(){return U?Function("event","return ("+W+")").call(w,U):Function("return ("+W+")").call(w)},{}):X=parseJSON(W);for(const K in X)X.hasOwnProperty(K)&&F[K]==null&&(F[K]=X[K])}return getValuesForElement(asElement(parentElt(w)),T,O,F,U)}function maybeEval(w,T,O){return htmx.config.allowEval?T():(triggerErrorEvent(w,"htmx:evalDisallowedError"),O)}function getHXVarsForElement(w,T,O){return getValuesForElement(w,"hx-vars",!0,O,T)}function getHXValsForElement(w,T,O){return getValuesForElement(w,"hx-vals",!1,O,T)}function getExpressionVars(w,T){return mergeObjects(getHXVarsForElement(w,T),getHXValsForElement(w,T))}function safelySetHeaderValue(w,T,O){if(O!==null)try{w.setRequestHeader(T,O)}catch{w.setRequestHeader(T,encodeURIComponent(O)),w.setRequestHeader(T+"-URI-AutoEncoded","true")}}function getPathFromResponse(w){if(w.responseURL)try{const T=new URL(w.responseURL);return T.pathname+T.search}catch{triggerErrorEvent(getDocument().body,"htmx:badResponseUrl",{url:w.responseURL})}}function hasHeader(w,T){return T.test(w.getAllResponseHeaders())}function ajaxHelper(w,T,O){if(w=w.toLowerCase(),O){if(O instanceof Element||typeof O=="string")return issueAjaxRequest(w,T,null,null,{targetOverride:resolveTarget(O)||DUMMY_ELT,returnPromise:!0});{let F=resolveTarget(O.target);return(O.target&&!F||O.source&&!F&&!resolveTarget(O.source))&&(F=DUMMY_ELT),issueAjaxRequest(w,T,resolveTarget(O.source),O.event,{handler:O.handler,headers:O.headers,values:O.values,targetOverride:F,swapOverride:O.swap,select:O.select,returnPromise:!0,push:O.push,replace:O.replace,selectOOB:O.selectOOB})}}else return issueAjaxRequest(w,T,null,null,{returnPromise:!0})}function hierarchyForElt(w){const T=[];for(;w;)T.push(w),w=w.parentElement;return T}function verifyPath(w,T,O){const F=new URL(T,location.protocol!=="about:"?location.href:window.origin),q=(location.protocol!=="about:"?location.origin:window.origin)===F.origin;return htmx.config.selfRequestsOnly&&!q?!1:triggerEvent(w,"htmx:validateUrl",mergeObjects({url:F,sameHost:q},O))}function formDataFromObject(w){if(w instanceof FormData)return w;const T=new FormData;for(const O in w)w.hasOwnProperty(O)&&(w[O]&&typeof w[O].forEach=="function"?w[O].forEach(function(F){T.append(O,F)}):typeof w[O]=="object"&&!(w[O]instanceof Blob)?T.append(O,JSON.stringify(w[O])):T.append(O,w[O]));return T}function formDataArrayProxy(w,T,O){return new Proxy(O,{get:function(F,U){return typeof U=="number"?F[U]:U==="length"?F.length:U==="push"?function(q){F.push(q),w.append(T,q)}:typeof F[U]=="function"?function(){F[U].apply(F,arguments),w.delete(T),F.forEach(function(q){w.append(T,q)})}:F[U]&&F[U].length===1?F[U][0]:F[U]},set:function(F,U,q){return F[U]=q,w.delete(T),F.forEach(function(W){w.append(T,W)}),!0}})}function formDataProxy(w){return new Proxy(w,{get:function(T,O){if(typeof O=="symbol"){const U=Reflect.get(T,O);return typeof U=="function"?function(){return U.apply(w,arguments)}:U}if(O==="toJSON")return()=>Object.fromEntries(w);if(O in T&&typeof T[O]=="function")return function(){return w[O].apply(w,arguments)};const F=w.getAll(O);if(F.length!==0)return F.length===1?F[0]:formDataArrayProxy(T,O,F)},set:function(T,O,F){return typeof O!="string"?!1:(T.delete(O),F&&typeof F.forEach=="function"?F.forEach(function(U){T.append(O,U)}):typeof F=="object"&&!(F instanceof Blob)?T.append(O,JSON.stringify(F)):T.append(O,F),!0)},deleteProperty:function(T,O){return typeof O=="string"&&T.delete(O),!0},ownKeys:function(T){return Reflect.ownKeys(Object.fromEntries(T))},getOwnPropertyDescriptor:function(T,O){return Reflect.getOwnPropertyDescriptor(Object.fromEntries(T),O)}})}function issueAjaxRequest(w,T,O,F,U,q){let W=null,j=null;if(U=U??{},U.returnPromise&&typeof Promise<"u")var X=new Promise(function(at,ft){W=at,j=ft});O==null&&(O=getDocument().body);const K=U.handler||handleAjaxResponse,J=U.select||null;if(!bodyContains(O))return maybeCall(W),X;const Y=U.targetOverride||asElement(getTarget(O));if(Y==null||Y==DUMMY_ELT)return triggerErrorEvent(O,"htmx:targetError",{target:getClosestAttributeValue(O,"hx-target")}),maybeCall(j),X;let G=getInternalData(O);const Q=G.lastButtonClicked;if(Q){const at=getRawAttribute(Q,"formaction");at!=null&&(T=at);const ft=getRawAttribute(Q,"formmethod");if(ft!=null)if(VERBS.includes(ft.toLowerCase()))w=ft;else return maybeCall(W),X}const tt=getClosestAttributeValue(O,"hx-confirm");if(q===void 0&&triggerEvent(O,"htmx:confirm",{target:Y,elt:O,path:T,verb:w,triggeringEvent:F,etc:U,issueRequest:function($t){return issueAjaxRequest(w,T,O,F,U,!!$t)},question:tt})===!1)return maybeCall(W),X;let et=O,ot=getClosestAttributeValue(O,"hx-sync"),rt=null,st=!1;if(ot){const at=ot.split(":"),ft=at[0].trim();if(ft==="this"?et=findThisElement(O,"hx-sync"):et=asElement(querySelectorExt(O,ft)),ot=(at[1]||"drop").trim(),G=getInternalData(et),ot==="drop"&&G.xhr&&G.abortable!==!0)return maybeCall(W),X;if(ot==="abort"){if(G.xhr)return maybeCall(W),X;st=!0}else ot==="replace"?triggerEvent(et,"htmx:abort"):ot.indexOf("queue")===0&&(rt=(ot.split(" ")[1]||"last").trim())}if(G.xhr)if(G.abortable)triggerEvent(et,"htmx:abort");else{if(rt==null){if(F){const at=getInternalData(F);at&&at.triggerSpec&&at.triggerSpec.queue&&(rt=at.triggerSpec.queue)}rt==null&&(rt="last")}return G.queuedRequests==null&&(G.queuedRequests=[]),rt==="first"&&G.queuedRequests.length===0?G.queuedRequests.push(function(){issueAjaxRequest(w,T,O,F,U)}):rt==="all"?G.queuedRequests.push(function(){issueAjaxRequest(w,T,O,F,U)}):rt==="last"&&(G.queuedRequests=[],G.queuedRequests.push(function(){issueAjaxRequest(w,T,O,F,U)})),maybeCall(W),X}const nt=new XMLHttpRequest;G.xhr=nt,G.abortable=st;const it=function(){G.xhr=null,G.abortable=!1,G.queuedRequests!=null&&G.queuedRequests.length>0&&G.queuedRequests.shift()()},dt=getClosestAttributeValue(O,"hx-prompt");if(dt){var ut=prompt(dt);if(ut===null||!triggerEvent(O,"htmx:prompt",{prompt:ut,target:Y}))return maybeCall(W),it(),X}if(tt&&!q&&!confirm(tt))return maybeCall(W),it(),X;let lt=getHeaders(O,Y,ut);w!=="get"&&!usesFormData(O)&&(lt["Content-Type"]="application/x-www-form-urlencoded"),U.headers&&(lt=mergeObjects(lt,U.headers));const _t=getInputValues(O,w);let gt=_t.errors;const bt=_t.formData;U.values&&overrideFormData(bt,formDataFromObject(U.values));const xt=formDataFromObject(getExpressionVars(O,F)),vt=overrideFormData(bt,xt);let pt=filterValues(vt,O);htmx.config.getCacheBusterParam&&w==="get"&&pt.set("org.htmx.cache-buster",getRawAttribute(Y,"id")||"true"),(T==null||T==="")&&(T=location.href);const ht=getValuesForElement(O,"hx-request"),Et=getInternalData(O).boosted;let yt=htmx.config.methodsThatUseUrlParams.indexOf(w)>=0;const ct={boosted:Et,useUrlParams:yt,formData:pt,parameters:formDataProxy(pt),unfilteredFormData:vt,unfilteredParameters:formDataProxy(vt),headers:lt,elt:O,target:Y,verb:w,errors:gt,withCredentials:U.credentials||ht.credentials||htmx.config.withCredentials,timeout:U.timeout||ht.timeout||htmx.config.timeout,path:T,triggeringEvent:F};if(!triggerEvent(O,"htmx:configRequest",ct))return maybeCall(W),it(),X;if(T=ct.path,w=ct.verb,lt=ct.headers,pt=formDataFromObject(ct.parameters),gt=ct.errors,yt=ct.useUrlParams,gt&&gt.length>0)return triggerEvent(O,"htmx:validation:halted",ct),maybeCall(W),it(),X;const wt=T.split("#"),Ct=wt[0],Tt=wt[1];let St=T;if(yt&&(St=Ct,!pt.keys().next().done&&(St.indexOf("?")<0?St+="?":St+="&",St+=urlEncode(pt),Tt&&(St+="#"+Tt))),!verifyPath(O,St,ct))return triggerErrorEvent(O,"htmx:invalidPath",ct),maybeCall(j),it(),X;if(nt.open(w.toUpperCase(),St,!0),nt.overrideMimeType("text/html"),nt.withCredentials=ct.withCredentials,nt.timeout=ct.timeout,!ht.noHeaders){for(const at in lt)if(lt.hasOwnProperty(at)){const ft=lt[at];safelySetHeaderValue(nt,at,ft)}}const mt={xhr:nt,target:Y,requestConfig:ct,etc:U,boosted:Et,select:J,pathInfo:{requestPath:T,finalRequestPath:St,responsePath:null,anchor:Tt}};if(nt.onload=function(){try{const at=hierarchyForElt(O);if(mt.pathInfo.responsePath=getPathFromResponse(nt),K(O,mt),mt.keepIndicators!==!0&&removeRequestIndicators(kt,Rt),triggerEvent(O,"htmx:afterRequest",mt),triggerEvent(O,"htmx:afterOnLoad",mt),!bodyContains(O)){let ft=null;for(;at.length>0&&ft==null;){const $t=at.shift();bodyContains($t)&&(ft=$t)}ft&&(triggerEvent(ft,"htmx:afterRequest",mt),triggerEvent(ft,"htmx:afterOnLoad",mt))}maybeCall(W)}catch(at){throw triggerErrorEvent(O,"htmx:onLoadError",mergeObjects({error:at},mt)),at}finally{it()}},nt.onerror=function(){removeRequestIndicators(kt,Rt),triggerErrorEvent(O,"htmx:afterRequest",mt),triggerErrorEvent(O,"htmx:sendError",mt),maybeCall(j),it()},nt.onabort=function(){removeRequestIndicators(kt,Rt),triggerErrorEvent(O,"htmx:afterRequest",mt),triggerErrorEvent(O,"htmx:sendAbort",mt),maybeCall(j),it()},nt.ontimeout=function(){removeRequestIndicators(kt,Rt),triggerErrorEvent(O,"htmx:afterRequest",mt),triggerErrorEvent(O,"htmx:timeout",mt),maybeCall(j),it()},!triggerEvent(O,"htmx:beforeRequest",mt))return maybeCall(W),it(),X;var kt=addRequestIndicatorClasses(O),Rt=disableElements(O);forEach(["loadstart","loadend","progress","abort"],function(at){forEach([nt,nt.upload],function(ft){ft.addEventListener(at,function($t){triggerEvent(O,"htmx:xhr:"+at,{lengthComputable:$t.lengthComputable,loaded:$t.loaded,total:$t.total})})})}),triggerEvent(O,"htmx:beforeSend",mt);const Dt=yt?null:encodeParamsForBody(nt,O,pt);return nt.send(Dt),X}function determineHistoryUpdates(w,T){const O=T.xhr;let F=null,U=null;if(hasHeader(O,/HX-Push:/i)?(F=O.getResponseHeader("HX-Push"),U="push"):hasHeader(O,/HX-Push-Url:/i)?(F=O.getResponseHeader("HX-Push-Url"),U="push"):hasHeader(O,/HX-Replace-Url:/i)&&(F=O.getResponseHeader("HX-Replace-Url"),U="replace"),F)return F==="false"?{}:{type:U,path:F};const q=T.pathInfo.finalRequestPath,W=T.pathInfo.responsePath,j=T.etc.push||getClosestAttributeValue(w,"hx-push-url"),X=T.etc.replace||getClosestAttributeValue(w,"hx-replace-url"),K=getInternalData(w).boosted;let J=null,Y=null;return j?(J="push",Y=j):X?(J="replace",Y=X):K&&(J="push",Y=W||q),Y?Y==="false"?{}:(Y==="true"&&(Y=W||q),T.pathInfo.anchor&&Y.indexOf("#")===-1&&(Y=Y+"#"+T.pathInfo.anchor),{type:J,path:Y}):{}}function codeMatches(w,T){var O=new RegExp(w.code);return O.test(T.toString(10))}function resolveResponseHandling(w){for(var T=0;T<htmx.config.responseHandling.length;T++){var O=htmx.config.responseHandling[T];if(codeMatches(O,w.status))return O}return{swap:!1}}function handleTitle(w){if(w){const T=find("title");T?T.textContent=w:window.document.title=w}}function resolveRetarget(w,T){if(T==="this")return w;const O=asElement(querySelectorExt(w,T));if(O==null)throw triggerErrorEvent(w,"htmx:targetError",{target:T}),new Error(`Invalid re-target ${T}`);return O}function handleAjaxResponse(w,T){const O=T.xhr;let F=T.target;const U=T.etc,q=T.select;if(!triggerEvent(w,"htmx:beforeOnLoad",T))return;if(hasHeader(O,/HX-Trigger:/i)&&handleTriggerHeader(O,"HX-Trigger",w),hasHeader(O,/HX-Location:/i)){let st=O.getResponseHeader("HX-Location");var W={};st.indexOf("{")===0&&(W=parseJSON(st),st=W.path,delete W.path),W.push=W.push||"true",ajaxHelper("get",st,W);return}const j=hasHeader(O,/HX-Refresh:/i)&&O.getResponseHeader("HX-Refresh")==="true";if(hasHeader(O,/HX-Redirect:/i)){T.keepIndicators=!0,htmx.location.href=O.getResponseHeader("HX-Redirect"),j&&htmx.location.reload();return}if(j){T.keepIndicators=!0,htmx.location.reload();return}const X=determineHistoryUpdates(w,T),K=resolveResponseHandling(O),J=K.swap;let Y=!!K.error,G=htmx.config.ignoreTitle||K.ignoreTitle,Q=K.select;K.target&&(T.target=resolveRetarget(w,K.target));var tt=U.swapOverride;tt==null&&K.swapOverride&&(tt=K.swapOverride),hasHeader(O,/HX-Retarget:/i)&&(T.target=resolveRetarget(w,O.getResponseHeader("HX-Retarget"))),hasHeader(O,/HX-Reswap:/i)&&(tt=O.getResponseHeader("HX-Reswap"));var et=O.response,ot=mergeObjects({shouldSwap:J,serverResponse:et,isError:Y,ignoreTitle:G,selectOverride:Q,swapOverride:tt},T);if(!(K.event&&!triggerEvent(F,K.event,ot))&&triggerEvent(F,"htmx:beforeSwap",ot)){if(F=ot.target,et=ot.serverResponse,Y=ot.isError,G=ot.ignoreTitle,Q=ot.selectOverride,tt=ot.swapOverride,T.target=F,T.failed=Y,T.successful=!Y,ot.shouldSwap){O.status===286&&cancelPolling(w),withExtensions(w,function(it){et=it.transformResponse(et,O,w)}),X.type&&saveCurrentPageToHistory();var rt=getSwapSpecification(w,tt);rt.hasOwnProperty("ignoreTitle")||(rt.ignoreTitle=G),F.classList.add(htmx.config.swappingClass),q&&(Q=q),hasHeader(O,/HX-Reselect:/i)&&(Q=O.getResponseHeader("HX-Reselect"));const st=U.selectOOB||getClosestAttributeValue(w,"hx-select-oob"),nt=getClosestAttributeValue(w,"hx-select");swap(F,et,rt,{select:Q==="unset"?null:Q||nt,selectOOB:st,eventInfo:T,anchor:T.pathInfo.anchor,contextElement:w,afterSwapCallback:function(){if(hasHeader(O,/HX-Trigger-After-Swap:/i)){let it=w;bodyContains(w)||(it=getDocument().body),handleTriggerHeader(O,"HX-Trigger-After-Swap",it)}},afterSettleCallback:function(){if(hasHeader(O,/HX-Trigger-After-Settle:/i)){let it=w;bodyContains(w)||(it=getDocument().body),handleTriggerHeader(O,"HX-Trigger-After-Settle",it)}},beforeSwapCallback:function(){X.type&&(triggerEvent(getDocument().body,"htmx:beforeHistoryUpdate",mergeObjects({history:X},T)),X.type==="push"?(pushUrlIntoHistory(X.path),triggerEvent(getDocument().body,"htmx:pushedIntoHistory",{path:X.path})):(replaceUrlInHistory(X.path),triggerEvent(getDocument().body,"htmx:replacedInHistory",{path:X.path})))}})}Y&&triggerErrorEvent(w,"htmx:responseError",mergeObjects({error:"Response Status Error Code "+O.status+" from "+T.pathInfo.requestPath},T))}}const extensions={};function extensionBase(){return{init:function(w){return null},getSelectors:function(){return null},onEvent:function(w,T){return!0},transformResponse:function(w,T,O){return w},isInlineSwap:function(w){return!1},handleSwap:function(w,T,O,F){return!1},encodeParameters:function(w,T,O){return null}}}function defineExtension(w,T){T.init&&T.init(internalAPI),extensions[w]=mergeObjects(extensionBase(),T)}function removeExtension(w){delete extensions[w]}function getExtensions(w,T,O){if(T==null&&(T=[]),w==null)return T;O==null&&(O=[]);const F=getAttributeValue(w,"hx-ext");return F&&forEach(F.split(","),function(U){if(U=U.replace(/ /g,""),U.slice(0,7)=="ignore:"){O.push(U.slice(7));return}if(O.indexOf(U)<0){const q=extensions[U];q&&T.indexOf(q)<0&&T.push(q)}}),getExtensions(asElement(parentElt(w)),T,O)}var isReady=!1;getDocument().addEventListener("DOMContentLoaded",function(){isReady=!0});function ready(w){isReady||getDocument().readyState==="complete"?w():getDocument().addEventListener("DOMContentLoaded",w)}function insertIndicatorStyles(){if(htmx.config.includeIndicatorStyles!==!1){const w=htmx.config.inlineStyleNonce?` nonce="${htmx.config.inlineStyleNonce}"`:"",T=htmx.config.indicatorClass,O=htmx.config.requestClass;getDocument().head.insertAdjacentHTML("beforeend",`<style${w}>.${T}{opacity:0;visibility: hidden} .${O} .${T}, .${O}.${T}{opacity:1;visibility: visible;transition: opacity 200ms ease-in}</style>`)}}function getMetaConfig(){const w=getDocument().querySelector('meta[name="htmx-config"]');return w?parseJSON(w.content):null}function mergeMetaConfig(){const w=getMetaConfig();w&&(htmx.config=mergeObjects(htmx.config,w))}return ready(function(){mergeMetaConfig(),insertIndicatorStyles();let w=getDocument().body;processNode(w);const T=getDocument().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");w.addEventListener("htmx:abort",function(F){const U=F.detail.elt||F.target,q=getInternalData(U);q&&q.xhr&&q.xhr.abort()});const O=window.onpopstate?window.onpopstate.bind(window):null;window.onpopstate=function(F){F.state&&F.state.htmx?(restoreHistory(),forEach(T,function(U){triggerEvent(U,"htmx:restored",{document:getDocument(),triggerEvent})})):O&&O(F)},getWindow().setTimeout(function(){triggerEvent(w,"htmx:load",{}),w=null},0)}),htmx})();class ThemeToggle extends i$3{connectedCallback(){var F;super.connectedCallback();const O=localStorage.getItem("theme")||((F=window.matchMedia)!=null&&F.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light");this._applyTheme(O)}get _isDark(){return document.documentElement.classList.contains("sl-theme-dark")}_applyTheme(T){document.documentElement.classList.toggle("sl-theme-dark",T==="dark"),document.documentElement.setAttribute("data-theme",T),localStorage.setItem("theme",T),this.requestUpdate()}_toggle(){this._applyTheme(this._isDark?"light":"dark")}render(){return b`
      <sl-icon-button
        name=${this._isDark?"moon-stars-fill":"sun-fill"}
        label="Toggle theme"
        @click=${this._toggle}
      ></sl-icon-button>
    `}}Ot(ThemeToggle,"styles",i$6`
    :host { display: inline-flex; align-items: center; }
  `);customElements.define("theme-toggle",ThemeToggle);let _urlBase="";function setUrlBase(w){_urlBase=w}function getUrlBase(){return _urlBase||window.urlBase||""}function joinURL(w,T){return w.endsWith("/")||(w+="/"),T.startsWith("/")&&(T=T.substring(1)),w+T}async function fetcher(w,T={}){const O=joinURL(getUrlBase(),w),F={headers:{},...T};return T.body instanceof FormData||(F.headers["Content-Type"]="application/json"),F.headers={...F.headers,...T.headers},fetch(O,F)}function escapeHtml(w){if(!w)return"";const T={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return w.replace(/[&<>"']/g,O=>T[O])}function formatBytes(w){if(!w||w===0)return"0 B";const T=1024,O=["B","KB","MB","GB","TB","PB"],F=Math.floor(Math.log(w)/Math.log(T));return`${parseFloat((w/Math.pow(T,F)).toFixed(2))} ${O[F]}`}function formatSpeed(w){return`${formatBytes(w)}/s`}function formatDuration(w){if(!w||w===0)return"0s";const T=[{label:"d",seconds:86400},{label:"h",seconds:3600},{label:"m",seconds:60},{label:"s",seconds:1}],O=[];let F=w;for(const U of T){const q=Math.floor(F/U.seconds);q>0&&(O.push(`${q}${U.label}`),F%=U.seconds)}return O.slice(0,2).join(" ")||"0s"}async function copyToClipboard(w){try{return await navigator.clipboard.writeText(w),createToast("Copied to clipboard","success"),!0}catch{return createToast("Failed to copy to clipboard","error"),!1}}function isValidUrl(w){try{return new URL(w),!0}catch{return!1}}function setButtonLoading(w,T=!0,O=null){typeof w=="string"&&(w=document.getElementById(w)||document.querySelector(w)),w&&(T?(w.disabled=!0,w.dataset.originalText||(w.dataset.originalText=O||w.innerHTML),w.innerHTML="<sl-spinner></sl-spinner> Processing..."):(w.disabled=!1,w.innerHTML=w.dataset.originalText||"Submit",delete w.dataset.originalText))}function getCurrentTheme(){return document.documentElement.getAttribute("data-theme")||"light"}function createToast(w,T="success",O){const F={success:"success",error:"danger",warning:"warning",info:"primary"},U={success:"check2-circle",error:"exclamation-octagon",warning:"exclamation-triangle",info:"info-circle"},q={success:5e3,warning:1e4,error:15e3,info:7e3},W=Object.assign(document.createElement("sl-alert"),{variant:F[T]||"primary",closable:!0,duration:O||q[T]||5e3});W.innerHTML=`<sl-icon slot="icon" name="${U[T]||"info-circle"}"></sl-icon>${escapeHtml(w)}`,document.body.appendChild(W),W.toast()}setBasePath("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.19.1/cdn/");window.urlBase!==void 0&&setUrlBase(window.urlBase);window.decypharrUtils={fetcher,createToast,formatBytes,formatDuration,formatSpeed,joinURL,escapeHtml,copyToClipboard,setButtonLoading,isValidUrl,getCurrentTheme};window.fetcher=fetcher;window.createToast=createToast;async function loadVersion(){try{const w=await fetcher("/version");if(!w.ok)throw new Error("Failed");const T=await w.json(),O=document.getElementById("version-badge");if(O){O.innerHTML=`<a href="https://github.com/sirrobot01/decypharr/releases/tag/v${T.version}" target="_blank">${T.channel}-${T.version}</a>`;const F={beta:"warning",nightly:"danger"};F[T.channel]&&(O.variant=F[T.channel])}}catch{const w=document.getElementById("version-badge");w&&(w.textContent="Unknown")}}document.addEventListener("DOMContentLoaded",loadVersion);
