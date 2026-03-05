var Dt=Object.defineProperty;var It=(w,T,O)=>T in w?Dt(w,T,{enumerable:!0,configurable:!0,writable:!0,value:O}):w[T]=O;var Rt=(w,T,O)=>It(w,typeof T!="symbol"?T+"":T,O);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var basePath="",kitCode="";function setBasePath(w){basePath=w}function getBasePath(w=""){if(!basePath){const T=document.querySelector("[data-webawesome]");if(T!=null&&T.hasAttribute("data-webawesome")){const O=new URL(T.getAttribute("data-webawesome")??"",window.location.href).pathname;setBasePath(O)}else{const W=[...document.getElementsByTagName("script")].find(F=>F.src.endsWith("webawesome.js")||F.src.endsWith("webawesome.loader.js")||F.src.endsWith("webawesome.ssr-loader.js"));if(W){const F=String(W.getAttribute("src"));setBasePath(F.split("/").slice(0,-1).join("/"))}}}return basePath.replace(/\/$/,"")+(w?`/${w.replace(/^\//,"")}`:"")}function setKitCode(w){kitCode=w}function getKitCode(){if(!kitCode){const w=document.querySelector("[data-fa-kit-code]");w&&setKitCode(w.getAttribute("data-fa-kit-code")||"")}return kitCode}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */new MutationObserver(w=>{for(const{addedNodes:T}of w)for(const O of T)O.nodeType===Node.ELEMENT_NODE&&discover(O)});async function discover(w){const T=w instanceof Element?w.tagName.toLowerCase():"",O=T==null?void 0:T.startsWith("wa-"),W=[...w.querySelectorAll(":not(:defined)")].map(U=>U.tagName.toLowerCase()).filter(U=>U.startsWith("wa-"));O&&!customElements.get(T)&&W.push(T);const F=[...new Set(W)],q=await Promise.allSettled(F.map(U=>register(U)));for(const U of q)U.status==="rejected"&&console.warn(U.reason);await new Promise(requestAnimationFrame),w.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function register(w){if(customElements.get(w))return Promise.resolve();const T=w.replace(/^wa-/i,""),O=getBasePath(`components/${T}/${T}.js`);return new Promise((W,F)=>{import(O).then(()=>W()).catch(()=>F(new Error(`Unable to autoload <${w}> from ${O}`)))})}const connectedElements=new Set,translations=new Map;let fallback,documentDirection="ltr",documentLanguage="en";const isClient=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(isClient){const w=new MutationObserver(update);documentDirection=document.documentElement.dir||"ltr",documentLanguage=document.documentElement.lang||navigator.language,w.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function registerTranslation(...w){w.map(T=>{const O=T.$code.toLowerCase();translations.has(O)?translations.set(O,Object.assign(Object.assign({},translations.get(O)),T)):translations.set(O,T),fallback||(fallback=T)}),update()}function update(){isClient&&(documentDirection=document.documentElement.dir||"ltr",documentLanguage=document.documentElement.lang||navigator.language),[...connectedElements.keys()].map(w=>{typeof w.requestUpdate=="function"&&w.requestUpdate()})}let LocalizeController$1=class{constructor(T){this.host=T,this.host.addController(this)}hostConnected(){connectedElements.add(this.host)}hostDisconnected(){connectedElements.delete(this.host)}dir(){return`${this.host.dir||documentDirection}`.toLowerCase()}lang(){return`${this.host.lang||documentLanguage}`.toLowerCase()}getTranslationData(T){var O,W;const F=new Intl.Locale(T.replace(/_/g,"-")),q=F==null?void 0:F.language.toLowerCase(),U=(W=(O=F==null?void 0:F.region)===null||O===void 0?void 0:O.toLowerCase())!==null&&W!==void 0?W:"",j=translations.get(`${q}-${U}`),X=translations.get(q);return{locale:F,language:q,region:U,primary:j,secondary:X}}exists(T,O){var W;const{primary:F,secondary:q}=this.getTranslationData((W=O.lang)!==null&&W!==void 0?W:this.lang());return O=Object.assign({includeFallback:!1},O),!!(F&&F[T]||q&&q[T]||O.includeFallback&&fallback&&fallback[T])}term(T,...O){const{primary:W,secondary:F}=this.getTranslationData(this.lang());let q;if(W&&W[T])q=W[T];else if(F&&F[T])q=F[T];else if(fallback&&fallback[T])q=fallback[T];else return console.error(`No translation found for: ${String(T)}`),String(T);return typeof q=="function"?q(...O):q}date(T,O){return T=new Date(T),new Intl.DateTimeFormat(this.lang(),O).format(T)}number(T,O){return T=Number(T),isNaN(T)?"":new Intl.NumberFormat(this.lang(),O).format(T)}relativeTime(T,O,W){return new Intl.RelativeTimeFormat(this.lang(),W).format(T,O)}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var translation={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(w,T)=>`Go to slide ${w} of ${T}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:w=>w===0?"No options selected":w===1?"1 option selected":`${w} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:w=>`Slide ${w}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};registerTranslation(translation);var en_default=translation;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var LocalizeController=class extends LocalizeController$1{};registerTranslation(en_default);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var FA_VERSION="7.2.0";function getIconUrl(w,T,O){const W=getKitCode(),F=W.length>0;let q="solid";return T==="chisel"&&(q="chisel-regular"),T==="etch"&&(q="etch-solid"),T==="graphite"&&(q="graphite-thin"),T==="jelly"&&(q="jelly-regular",O==="duo-regular"&&(q="jelly-duo-regular"),O==="fill-regular"&&(q="jelly-fill-regular")),T==="jelly-duo"&&(q="jelly-duo-regular"),T==="jelly-fill"&&(q="jelly-fill-regular"),T==="notdog"&&(O==="solid"&&(q="notdog-solid"),O==="duo-solid"&&(q="notdog-duo-solid")),T==="notdog-duo"&&(q="notdog-duo-solid"),T==="slab"&&((O==="solid"||O==="regular")&&(q="slab-regular"),O==="press-regular"&&(q="slab-press-regular")),T==="slab-press"&&(q="slab-press-regular"),T==="thumbprint"&&(q="thumbprint-light"),T==="utility"&&(q="utility-semibold"),T==="utility-duo"&&(q="utility-duo-semibold"),T==="utility-fill"&&(q="utility-fill-semibold"),T==="whiteboard"&&(q="whiteboard-semibold"),T==="classic"&&(O==="thin"&&(q="thin"),O==="light"&&(q="light"),O==="regular"&&(q="regular"),O==="solid"&&(q="solid")),T==="duotone"&&(O==="thin"&&(q="duotone-thin"),O==="light"&&(q="duotone-light"),O==="regular"&&(q="duotone-regular"),O==="solid"&&(q="duotone")),T==="sharp"&&(O==="thin"&&(q="sharp-thin"),O==="light"&&(q="sharp-light"),O==="regular"&&(q="sharp-regular"),O==="solid"&&(q="sharp-solid")),T==="sharp-duotone"&&(O==="thin"&&(q="sharp-duotone-thin"),O==="light"&&(q="sharp-duotone-light"),O==="regular"&&(q="sharp-duotone-regular"),O==="solid"&&(q="sharp-duotone-solid")),T==="brands"&&(q="brands"),F?`https://ka-p.fontawesome.com/releases/v${FA_VERSION}/svgs/${q}/${w}.svg?token=${encodeURIComponent(W)}`:`https://ka-f.fontawesome.com/releases/v${FA_VERSION}/svgs/${q}/${w}.svg`}var library={name:"default",resolver:(w,T="classic",O="solid")=>getIconUrl(w,T,O),mutator:(w,T)=>{if(T!=null&&T.family&&!w.hasAttribute("data-duotone-initialized")){const{family:O,variant:W}=T;if(O==="duotone"||O==="sharp-duotone"||O==="notdog-duo"||O==="notdog"&&W==="duo-solid"||O==="jelly-duo"||O==="jelly"&&W==="duo-regular"||O==="utility-duo"||O==="thumbprint"){const F=[...w.querySelectorAll("path")],q=F.find(j=>!j.hasAttribute("opacity")),U=F.find(j=>j.hasAttribute("opacity"));if(!q||!U)return;if(q.setAttribute("data-duotone-primary",""),U.setAttribute("data-duotone-secondary",""),T.swapOpacity&&q&&U){const j=U.getAttribute("opacity")||"0.4";q.style.setProperty("--path-opacity",j),U.style.setProperty("--path-opacity","1")}w.setAttribute("data-duotone-initialized","")}}}},library_default_default=library;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function dataUri(w){return`data:image/svg+xml,${encodeURIComponent(w)}`}var icons={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},systemLibrary={name:"system",resolver:(w,T="classic",O="solid")=>{let F=icons[O][w]??icons.regular[w]??icons.regular["circle-question"];return F?dataUri(F):""}},library_system_default=systemLibrary;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var defaultIconFamily="classic",registry=[library_default_default,library_system_default],watchedIcons=[];function watchIcon(w){watchedIcons.push(w)}function unwatchIcon(w){watchedIcons=watchedIcons.filter(T=>T!==w)}function getIconLibrary(w){return registry.find(T=>T.name===w)}function getDefaultIconFamily(){return defaultIconFamily}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__typeError=w=>{throw TypeError(w)},__decorateClass=(w,T,O,W)=>{for(var F=W>1?void 0:W?__getOwnPropDesc(T,O):T,q=w.length-1,U;q>=0;q--)(U=w[q])&&(F=(W?U(T,O,F):U(F))||F);return W&&F&&__defProp(T,O,F),F},__accessCheck=(w,T,O)=>T.has(w)||__typeError("Cannot "+O),__privateGet=(w,T,O)=>(__accessCheck(w,T,"read from private field"),T.get(w)),__privateAdd=(w,T,O)=>T.has(w)?__typeError("Cannot add the same private member more than once"):T instanceof WeakSet?T.add(w):T.set(w,O),__privateSet=(w,T,O,W)=>(__accessCheck(w,T,"write to private field"),T.set(w,O),O);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$3=globalThis,e$7=t$3.ShadowRoot&&(t$3.ShadyCSS===void 0||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$6=new WeakMap;let n$4=class{constructor(T,O,W){if(this._$cssResult$=!0,W!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=T,this.t=O}get styleSheet(){let T=this.o;const O=this.t;if(e$7&&T===void 0){const W=O!==void 0&&O.length===1;W&&(T=o$6.get(O)),T===void 0&&((this.o=T=new CSSStyleSheet).replaceSync(this.cssText),W&&o$6.set(O,T))}return T}toString(){return this.cssText}};const r$6=w=>new n$4(typeof w=="string"?w:w+"",void 0,s$2),i$6=(w,...T)=>{const O=w.length===1?w[0]:T.reduce((W,F,q)=>W+(U=>{if(U._$cssResult$===!0)return U.cssText;if(typeof U=="number")return U;throw Error("Value passed to 'css' function must be a 'css' function result: "+U+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(F)+w[q+1],w[0]);return new n$4(O,w,s$2)},S$1=(w,T)=>{if(e$7)w.adoptedStyleSheets=T.map(O=>O instanceof CSSStyleSheet?O:O.styleSheet);else for(const O of T){const W=document.createElement("style"),F=t$3.litNonce;F!==void 0&&W.setAttribute("nonce",F),W.textContent=O.cssText,w.appendChild(W)}},c$2=e$7?w=>w:w=>w instanceof CSSStyleSheet?(T=>{let O="";for(const W of T.cssRules)O+=W.cssText;return r$6(O)})(w):w;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$5,defineProperty:e$6,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$5,getOwnPropertySymbols:o$5,getPrototypeOf:n$3}=Object,a$2=globalThis,c$1=a$2.trustedTypes,l$4=c$1?c$1.emptyScript:"",p$2=a$2.reactiveElementPolyfillSupport,d$1=(w,T)=>w,u$2={toAttribute(w,T){switch(T){case Boolean:w=w?l$4:null;break;case Object:case Array:w=w==null?w:JSON.stringify(w)}return w},fromAttribute(w,T){let O=w;switch(T){case Boolean:O=w!==null;break;case Number:O=w===null?null:Number(w);break;case Object:case Array:try{O=JSON.parse(w)}catch{O=null}}return O}},f$1=(w,T)=>!i$5(w,T),b$1={attribute:!0,type:String,converter:u$2,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),a$2.litPropertyMetadata??(a$2.litPropertyMetadata=new WeakMap);let y$1=class extends HTMLElement{static addInitializer(T){this._$Ei(),(this.l??(this.l=[])).push(T)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(T,O=b$1){if(O.state&&(O.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(T)&&((O=Object.create(O)).wrapped=!0),this.elementProperties.set(T,O),!O.noAccessor){const W=Symbol(),F=this.getPropertyDescriptor(T,W,O);F!==void 0&&e$6(this.prototype,T,F)}}static getPropertyDescriptor(T,O,W){const{get:F,set:q}=h$1(this.prototype,T)??{get(){return this[O]},set(U){this[O]=U}};return{get:F,set(U){const j=F==null?void 0:F.call(this);q==null||q.call(this,U),this.requestUpdate(T,j,W)},configurable:!0,enumerable:!0}}static getPropertyOptions(T){return this.elementProperties.get(T)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const T=n$3(this);T.finalize(),T.l!==void 0&&(this.l=[...T.l]),this.elementProperties=new Map(T.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const O=this.properties,W=[...r$5(O),...o$5(O)];for(const F of W)this.createProperty(F,O[F])}const T=this[Symbol.metadata];if(T!==null){const O=litPropertyMetadata.get(T);if(O!==void 0)for(const[W,F]of O)this.elementProperties.set(W,F)}this._$Eh=new Map;for(const[O,W]of this.elementProperties){const F=this._$Eu(O,W);F!==void 0&&this._$Eh.set(F,O)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(T){const O=[];if(Array.isArray(T)){const W=new Set(T.flat(1/0).reverse());for(const F of W)O.unshift(c$2(F))}else T!==void 0&&O.push(c$2(T));return O}static _$Eu(T,O){const W=O.attribute;return W===!1?void 0:typeof W=="string"?W:typeof T=="string"?T.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var T;this._$ES=new Promise(O=>this.enableUpdating=O),this._$AL=new Map,this._$E_(),this.requestUpdate(),(T=this.constructor.l)==null||T.forEach(O=>O(this))}addController(T){var O;(this._$EO??(this._$EO=new Set)).add(T),this.renderRoot!==void 0&&this.isConnected&&((O=T.hostConnected)==null||O.call(T))}removeController(T){var O;(O=this._$EO)==null||O.delete(T)}_$E_(){const T=new Map,O=this.constructor.elementProperties;for(const W of O.keys())this.hasOwnProperty(W)&&(T.set(W,this[W]),delete this[W]);T.size>0&&(this._$Ep=T)}createRenderRoot(){const T=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(T,this.constructor.elementStyles),T}connectedCallback(){var T;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(T=this._$EO)==null||T.forEach(O=>{var W;return(W=O.hostConnected)==null?void 0:W.call(O)})}enableUpdating(T){}disconnectedCallback(){var T;(T=this._$EO)==null||T.forEach(O=>{var W;return(W=O.hostDisconnected)==null?void 0:W.call(O)})}attributeChangedCallback(T,O,W){this._$AK(T,W)}_$ET(T,O){var q;const W=this.constructor.elementProperties.get(T),F=this.constructor._$Eu(T,W);if(F!==void 0&&W.reflect===!0){const U=(((q=W.converter)==null?void 0:q.toAttribute)!==void 0?W.converter:u$2).toAttribute(O,W.type);this._$Em=T,U==null?this.removeAttribute(F):this.setAttribute(F,U),this._$Em=null}}_$AK(T,O){var q,U;const W=this.constructor,F=W._$Eh.get(T);if(F!==void 0&&this._$Em!==F){const j=W.getPropertyOptions(F),X=typeof j.converter=="function"?{fromAttribute:j.converter}:((q=j.converter)==null?void 0:q.fromAttribute)!==void 0?j.converter:u$2;this._$Em=F;const Y=X.fromAttribute(O,j.type);this[F]=Y??((U=this._$Ej)==null?void 0:U.get(F))??Y,this._$Em=null}}requestUpdate(T,O,W,F=!1,q){var U;if(T!==void 0){const j=this.constructor;if(F===!1&&(q=this[T]),W??(W=j.getPropertyOptions(T)),!((W.hasChanged??f$1)(q,O)||W.useDefault&&W.reflect&&q===((U=this._$Ej)==null?void 0:U.get(T))&&!this.hasAttribute(j._$Eu(T,W))))return;this.C(T,O,W)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(T,O,{useDefault:W,reflect:F,wrapped:q},U){W&&!(this._$Ej??(this._$Ej=new Map)).has(T)&&(this._$Ej.set(T,U??O??this[T]),q!==!0||U!==void 0)||(this._$AL.has(T)||(this.hasUpdated||W||(O=void 0),this._$AL.set(T,O)),F===!0&&this._$Em!==T&&(this._$Eq??(this._$Eq=new Set)).add(T))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(O){Promise.reject(O)}const T=this.scheduleUpdate();return T!=null&&await T,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var W;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[q,U]of this._$Ep)this[q]=U;this._$Ep=void 0}const F=this.constructor.elementProperties;if(F.size>0)for(const[q,U]of F){const{wrapped:j}=U,X=this[q];j!==!0||this._$AL.has(q)||X===void 0||this.C(q,void 0,U,X)}}let T=!1;const O=this._$AL;try{T=this.shouldUpdate(O),T?(this.willUpdate(O),(W=this._$EO)==null||W.forEach(F=>{var q;return(q=F.hostUpdate)==null?void 0:q.call(F)}),this.update(O)):this._$EM()}catch(F){throw T=!1,this._$EM(),F}T&&this._$AE(O)}willUpdate(T){}_$AE(T){var O;(O=this._$EO)==null||O.forEach(W=>{var F;return(F=W.hostUpdated)==null?void 0:F.call(W)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(T)),this.updated(T)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(T){return!0}update(T){this._$Eq&&(this._$Eq=this._$Eq.forEach(O=>this._$ET(O,this[O]))),this._$EM()}updated(T){}firstUpdated(T){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$2==null||p$2({ReactiveElement:y$1}),(a$2.reactiveElementVersions??(a$2.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$2=globalThis,i$4=w=>w,s$1=t$2.trustedTypes,e$5=s$1?s$1.createPolicy("lit-html",{createHTML:w=>w}):void 0,h="$lit$",o$4=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$4,r$4=`<${n$2}>`,l$3=document,c=()=>l$3.createComment(""),a$1=w=>w===null||typeof w!="object"&&typeof w!="function",u$1=Array.isArray,d=w=>u$1(w)||typeof(w==null?void 0:w[Symbol.iterator])=="function",f=`[ 	
\f\r]`,v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=w=>(T,...O)=>({_$litType$:w,strings:T,values:O}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$3.createTreeWalker(l$3,129);function V(w,T){if(!u$1(w)||!w.hasOwnProperty("raw"))throw Error("invalid template strings array");return e$5!==void 0?e$5.createHTML(T):T}const N=(w,T)=>{const O=w.length-1,W=[];let F,q=T===2?"<svg>":T===3?"<math>":"",U=v;for(let j=0;j<O;j++){const X=w[j];let Y,J,K=-1,G=0;for(;G<X.length&&(U.lastIndex=G,J=U.exec(X),J!==null);)G=U.lastIndex,U===v?J[1]==="!--"?U=_:J[1]!==void 0?U=m$1:J[2]!==void 0?(y.test(J[2])&&(F=RegExp("</"+J[2],"g")),U=p$1):J[3]!==void 0&&(U=p$1):U===p$1?J[0]===">"?(U=F??v,K=-1):J[1]===void 0?K=-2:(K=U.lastIndex-J[2].length,Y=J[1],U=J[3]===void 0?p$1:J[3]==='"'?$:g):U===$||U===g?U=p$1:U===_||U===m$1?U=v:(U=p$1,F=void 0);const tt=U===p$1&&w[j+1].startsWith("/>")?" ":"";q+=U===v?X+r$4:K>=0?(W.push(Y),X.slice(0,K)+h+X.slice(K)+o$4+tt):X+o$4+(K===-2?j:tt)}return[V(w,q+(w[O]||"<?>")+(T===2?"</svg>":T===3?"</math>":"")),W]};class S{constructor({strings:T,_$litType$:O},W){let F;this.parts=[];let q=0,U=0;const j=T.length-1,X=this.parts,[Y,J]=N(T,O);if(this.el=S.createElement(Y,W),P.currentNode=this.el.content,O===2||O===3){const K=this.el.content.firstChild;K.replaceWith(...K.childNodes)}for(;(F=P.nextNode())!==null&&X.length<j;){if(F.nodeType===1){if(F.hasAttributes())for(const K of F.getAttributeNames())if(K.endsWith(h)){const G=J[U++],tt=F.getAttribute(K).split(o$4),Q=/([.?@])?(.*)/.exec(G);X.push({type:1,index:q,name:Q[2],strings:tt,ctor:Q[1]==="."?I:Q[1]==="?"?L:Q[1]==="@"?z:H}),F.removeAttribute(K)}else K.startsWith(o$4)&&(X.push({type:6,index:q}),F.removeAttribute(K));if(y.test(F.tagName)){const K=F.textContent.split(o$4),G=K.length-1;if(G>0){F.textContent=s$1?s$1.emptyScript:"";for(let tt=0;tt<G;tt++)F.append(K[tt],c()),P.nextNode(),X.push({type:2,index:++q});F.append(K[G],c())}}}else if(F.nodeType===8)if(F.data===n$2)X.push({type:2,index:q});else{let K=-1;for(;(K=F.data.indexOf(o$4,K+1))!==-1;)X.push({type:7,index:q}),K+=o$4.length-1}q++}}static createElement(T,O){const W=l$3.createElement("template");return W.innerHTML=T,W}}function M(w,T,O=w,W){var U,j;if(T===E)return T;let F=W!==void 0?(U=O._$Co)==null?void 0:U[W]:O._$Cl;const q=a$1(T)?void 0:T._$litDirective$;return(F==null?void 0:F.constructor)!==q&&((j=F==null?void 0:F._$AO)==null||j.call(F,!1),q===void 0?F=void 0:(F=new q(w),F._$AT(w,O,W)),W!==void 0?(O._$Co??(O._$Co=[]))[W]=F:O._$Cl=F),F!==void 0&&(T=M(w,F._$AS(w,T.values),F,W)),T}class R{constructor(T,O){this._$AV=[],this._$AN=void 0,this._$AD=T,this._$AM=O}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(T){const{el:{content:O},parts:W}=this._$AD,F=((T==null?void 0:T.creationScope)??l$3).importNode(O,!0);P.currentNode=F;let q=P.nextNode(),U=0,j=0,X=W[0];for(;X!==void 0;){if(U===X.index){let Y;X.type===2?Y=new k(q,q.nextSibling,this,T):X.type===1?Y=new X.ctor(q,X.name,X.strings,this,T):X.type===6&&(Y=new Z(q,this,T)),this._$AV.push(Y),X=W[++j]}U!==(X==null?void 0:X.index)&&(q=P.nextNode(),U++)}return P.currentNode=l$3,F}p(T){let O=0;for(const W of this._$AV)W!==void 0&&(W.strings!==void 0?(W._$AI(T,W,O),O+=W.strings.length-2):W._$AI(T[O])),O++}}class k{get _$AU(){var T;return((T=this._$AM)==null?void 0:T._$AU)??this._$Cv}constructor(T,O,W,F){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=T,this._$AB=O,this._$AM=W,this.options=F,this._$Cv=(F==null?void 0:F.isConnected)??!0}get parentNode(){let T=this._$AA.parentNode;const O=this._$AM;return O!==void 0&&(T==null?void 0:T.nodeType)===11&&(T=O.parentNode),T}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(T,O=this){T=M(this,T,O),a$1(T)?T===A||T==null||T===""?(this._$AH!==A&&this._$AR(),this._$AH=A):T!==this._$AH&&T!==E&&this._(T):T._$litType$!==void 0?this.$(T):T.nodeType!==void 0?this.T(T):d(T)?this.k(T):this._(T)}O(T){return this._$AA.parentNode.insertBefore(T,this._$AB)}T(T){this._$AH!==T&&(this._$AR(),this._$AH=this.O(T))}_(T){this._$AH!==A&&a$1(this._$AH)?this._$AA.nextSibling.data=T:this.T(l$3.createTextNode(T)),this._$AH=T}$(T){var q;const{values:O,_$litType$:W}=T,F=typeof W=="number"?this._$AC(T):(W.el===void 0&&(W.el=S.createElement(V(W.h,W.h[0]),this.options)),W);if(((q=this._$AH)==null?void 0:q._$AD)===F)this._$AH.p(O);else{const U=new R(F,this),j=U.u(this.options);U.p(O),this.T(j),this._$AH=U}}_$AC(T){let O=C.get(T.strings);return O===void 0&&C.set(T.strings,O=new S(T)),O}k(T){u$1(this._$AH)||(this._$AH=[],this._$AR());const O=this._$AH;let W,F=0;for(const q of T)F===O.length?O.push(W=new k(this.O(c()),this.O(c()),this,this.options)):W=O[F],W._$AI(q),F++;F<O.length&&(this._$AR(W&&W._$AB.nextSibling,F),O.length=F)}_$AR(T=this._$AA.nextSibling,O){var W;for((W=this._$AP)==null?void 0:W.call(this,!1,!0,O);T!==this._$AB;){const F=i$4(T).nextSibling;i$4(T).remove(),T=F}}setConnected(T){var O;this._$AM===void 0&&(this._$Cv=T,(O=this._$AP)==null||O.call(this,T))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(T,O,W,F,q){this.type=1,this._$AH=A,this._$AN=void 0,this.element=T,this.name=O,this._$AM=F,this.options=q,W.length>2||W[0]!==""||W[1]!==""?(this._$AH=Array(W.length-1).fill(new String),this.strings=W):this._$AH=A}_$AI(T,O=this,W,F){const q=this.strings;let U=!1;if(q===void 0)T=M(this,T,O,0),U=!a$1(T)||T!==this._$AH&&T!==E,U&&(this._$AH=T);else{const j=T;let X,Y;for(T=q[0],X=0;X<q.length-1;X++)Y=M(this,j[W+X],O,X),Y===E&&(Y=this._$AH[X]),U||(U=!a$1(Y)||Y!==this._$AH[X]),Y===A?T=A:T!==A&&(T+=(Y??"")+q[X+1]),this._$AH[X]=Y}U&&!F&&this.j(T)}j(T){T===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,T??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(T){this.element[this.name]=T===A?void 0:T}}class L extends H{constructor(){super(...arguments),this.type=4}j(T){this.element.toggleAttribute(this.name,!!T&&T!==A)}}class z extends H{constructor(T,O,W,F,q){super(T,O,W,F,q),this.type=5}_$AI(T,O=this){if((T=M(this,T,O,0)??A)===E)return;const W=this._$AH,F=T===A&&W!==A||T.capture!==W.capture||T.once!==W.once||T.passive!==W.passive,q=T!==A&&(W===A||F);F&&this.element.removeEventListener(this.name,this,W),q&&this.element.addEventListener(this.name,this,T),this._$AH=T}handleEvent(T){var O;typeof this._$AH=="function"?this._$AH.call(((O=this.options)==null?void 0:O.host)??this.element,T):this._$AH.handleEvent(T)}}class Z{constructor(T,O,W){this.element=T,this.type=6,this._$AN=void 0,this._$AM=O,this.options=W}get _$AU(){return this._$AM._$AU}_$AI(T){M(this,T)}}const B=t$2.litHtmlPolyfillSupport;B==null||B(S,k),(t$2.litHtmlVersions??(t$2.litHtmlVersions=[])).push("3.3.2");const D=(w,T,O)=>{const W=(O==null?void 0:O.renderBefore)??T;let F=W._$litPart$;if(F===void 0){const q=(O==null?void 0:O.renderBefore)??null;W._$litPart$=F=new k(T.insertBefore(c(),q),q,void 0,O??{})}return F._$AI(w),F};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$3=class extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var O;const T=super.createRenderRoot();return(O=this.renderOptions).renderBefore??(O.renderBefore=T.firstChild),T}update(T){const O=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(T),this._$Do=D(O,this.renderRoot,this.renderOptions)}connectedCallback(){var T;super.connectedCallback(),(T=this._$Do)==null||T.setConnected(!0)}disconnectedCallback(){var T;super.disconnectedCallback(),(T=this._$Do)==null||T.setConnected(!1)}render(){return E}};var kt;i$3._$litElement$=!0,i$3.finalized=!0,(kt=s.litElementHydrateSupport)==null||kt.call(s,{LitElement:i$3});const o$3=s.litElementPolyfillSupport;o$3==null||o$3({LitElement:i$3});(s.litElementVersions??(s.litElementVersions=[])).push("4.2.2");/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var variants_styles_default=i$6`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$1=w=>(T,O)=>{O!==void 0?O.addInitializer(()=>{customElements.define(w,T)}):customElements.define(w,T)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2={attribute:!0,type:String,converter:u$2,reflect:!1,hasChanged:f$1},r$3=(w=o$2,T,O)=>{const{kind:W,metadata:F}=O;let q=globalThis.litPropertyMetadata.get(F);if(q===void 0&&globalThis.litPropertyMetadata.set(F,q=new Map),W==="setter"&&((w=Object.create(w)).wrapped=!0),q.set(O.name,w),W==="accessor"){const{name:U}=O;return{set(j){const X=T.get.call(this);T.set.call(this,j),this.requestUpdate(U,X,w,!0,j)},init(j){return j!==void 0&&this.C(U,void 0,w,j),j}}}if(W==="setter"){const{name:U}=O;return function(j){const X=this[U];T.call(this,j),this.requestUpdate(U,X,w,!0,j)}}throw Error("Unsupported decorator location: "+W)};function n$1(w){return(T,O)=>typeof O=="object"?r$3(w,T,O):((W,F,q)=>{const U=F.hasOwnProperty(q);return F.constructor.createProperty(q,W),U?Object.getOwnPropertyDescriptor(F,q):void 0})(w,T,O)}/**
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
 */function e$3(w,T){return(O,W,F)=>{const q=U=>{var j;return((j=U.renderRoot)==null?void 0:j.querySelector(w))??null};return e$4(O,W,{get(){return q(this)}})}}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var host_styles_default=i$6`
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
`,_hasRecordedInitialProperties,WebAwesomeElement=class extends i$3{constructor(){super(),__privateAdd(this,_hasRecordedInitialProperties,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(T,O)=>{var W;if((W=this.internals)!=null&&W.states)try{O?this.internals.states.add(T):this.internals.states.delete(T)}catch(F){if(String(F).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw F}},has:T=>{var O;if(!((O=this.internals)!=null&&O.states))return!1;try{return this.internals.states.has(T)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let w=this.constructor;for(let[T,O]of w.elementProperties)O.default==="inherit"&&O.initial!==void 0&&typeof T=="string"&&this.customStates.set(`initial-${T}-${O.initial}`,!0)}static get styles(){const w=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[host_styles_default,...w]}attributeChangedCallback(w,T,O){__privateGet(this,_hasRecordedInitialProperties)||(this.constructor.elementProperties.forEach((W,F)=>{W.reflect&&this[F]!=null&&this.initialReflectedProperties.set(F,this[F])}),__privateSet(this,_hasRecordedInitialProperties,!0)),super.attributeChangedCallback(w,T,O)}willUpdate(w){super.willUpdate(w),this.initialReflectedProperties.forEach((T,O)=>{w.has(O)&&this[O]==null&&(this[O]=T)})}firstUpdated(w){var T;super.firstUpdated(w),this.didSSR&&((T=this.shadowRoot)==null||T.querySelectorAll("slot").forEach(O=>{O.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}))}update(w){try{super.update(w)}catch(T){if(this.didSSR&&!this.hasUpdated){const O=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});O.error=T,this.dispatchEvent(O)}throw T}}relayNativeEvent(w,T){w.stopImmediatePropagation(),this.dispatchEvent(new w.constructor(w.type,{...w,...T}))}};_hasRecordedInitialProperties=new WeakMap;__decorateClass([n$1()],WebAwesomeElement.prototype,"dir",2);__decorateClass([n$1()],WebAwesomeElement.prototype,"lang",2);__decorateClass([n$1({type:Boolean,reflect:!0,attribute:"did-ssr"})],WebAwesomeElement.prototype,"didSSR",2);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var badge_styles_default=i$6`
  :host {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375em 0.625em;
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    font-size: max(var(--wa-font-size-2xs), 0.75em);
    font-weight: var(--wa-font-weight-semibold);
    line-height: 1;
    vertical-align: middle;
    white-space: nowrap;
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
    border-radius: var(--wa-border-radius-s);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    --pulse-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));

    color: var(--wa-color-on-quiet, var(--wa-color-brand-on-quiet));
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance='filled']) {
    --pulse-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    --pulse-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));

    color: var(--wa-color-on-normal, var(--wa-color-brand-on-normal));
    background-color: var(--wa-color-fill-normal, var(--wa-color-brand-fill-normal));
    border-color: var(--wa-color-border-normal, var(--wa-color-brand-border-normal));
  }

  :host([appearance='accent']) {
    --pulse-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));

    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;
  }

  /* Pill modifier */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }

  /* Pulse attention */
  :host([attention='pulse']) {
    animation: pulse 1.5s infinite;
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

  /* Bounce attention */
  :host([attention='bounce']) {
    animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-2px);
    }
  }

  /* Slots */
  slot[name='start']::slotted(*) {
    margin-inline-end: 0.375em;
  }

  slot[name='end']::slotted(*) {
    margin-inline-start: 0.375em;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaBadge=class extends WebAwesomeElement{constructor(){super(...arguments),this.variant="brand",this.appearance="accent",this.pill=!1,this.attention="none"}render(){return b`
      <slot name="start" part="start"></slot>

      <slot part="base" role="status"></slot>

      <slot name="end" part="end"></slot>
    `}};WaBadge.css=[variants_styles_default,badge_styles_default];__decorateClass([n$1({reflect:!0})],WaBadge.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],WaBadge.prototype,"appearance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaBadge.prototype,"pill",2);__decorateClass([n$1({reflect:!0})],WaBadge.prototype,"attention",2);WaBadge=__decorateClass([t$1("wa-badge")],WaBadge);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var MirrorValidator=()=>({checkValidity(w){const T=w.input,O={message:"",isValid:!0,invalidKeys:[]};if(!T)return O;let W=!0;if("checkValidity"in T&&(W=T.checkValidity()),W)return O;if(O.isValid=!1,"validationMessage"in T&&(O.message=T.validationMessage),!("validity"in T))return O.invalidKeys.push("customError"),O;for(const F in T.validity){if(F==="valid")continue;const q=F;T.validity[q]&&O.invalidKeys.push(q)}return O}});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaInvalidEvent=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var CustomErrorValidator=()=>({observedAttributes:["custom-error"],checkValidity(w){const T={message:"",isValid:!0,invalidKeys:[]};return w.customError&&(T.message=w.customError,T.isValid=!1,T.invalidKeys=["customError"]),T}}),WebAwesomeFormAssociatedElement=class extends WebAwesomeElement{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=w=>{w.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new WaInvalidEvent))},this.handleInteraction=w=>{var O;const T=this.emittedEvents;T.includes(w.type)||T.push(w.type),T.length===((O=this.assumeInteractionOn)==null?void 0:O.length)&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[CustomErrorValidator()]}static get observedAttributes(){const w=new Set(super.observedAttributes||[]);for(const T of this.validators)if(T.observedAttributes)for(const O of T.observedAttributes)w.add(O);return[...w]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(w=>{this.addEventListener(w,this.handleInteraction)})}firstUpdated(...w){super.firstUpdated(...w),this.updateValidity()}willUpdate(w){if(w.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),w.has("value")||w.has("disabled")||w.has("defaultValue")){const T=this.value;if(Array.isArray(T)){if(this.name){const O=new FormData;for(const W of T)O.append(this.name,W);this.setValue(O,O)}}else this.setValue(T,T)}w.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(w),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(w){w?this.setAttribute("form",w):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...w){const T=w[0],O=w[1];let W=w[2];W||(W=this.validationTarget),this.internals.setValidity(T,O,W||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const w=!!this.required,T=this.internals.validity.valid,O=this.hasInteracted;this.customStates.set("required",w),this.customStates.set("optional",!w),this.customStates.set("invalid",!T),this.customStates.set("valid",T),this.customStates.set("user-invalid",!T&&O),this.customStates.set("user-valid",T&&O)}setCustomValidity(w){if(!w){this.customError=null,this.setValidity({});return}this.customError=w,this.setValidity({customError:!0},w,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(w){this.disabled=w,this.updateValidity()}formStateRestoreCallback(w,T){this.value=w,T==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...w){const[T,O]=w;this.internals.setFormValue(T,O)}get allValidators(){const w=this.constructor.validators||[],T=this.validators||[];return[...w,...T]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const w=this.allValidators;if(!(w!=null&&w.length))return;const T={customError:!!this.customError},O=this.validationTarget||this.input||void 0;let W="";for(const F of w){const{isValid:q,message:U,invalidKeys:j}=F.checkValidity(this);q||(W||(W=U),(j==null?void 0:j.length)>=0&&j.forEach(X=>T[X]=!0))}W||(W=this.validationMessage),this.setValidity(T,W,O)}};WebAwesomeFormAssociatedElement.formAssociated=!0;__decorateClass([n$1({reflect:!0})],WebAwesomeFormAssociatedElement.prototype,"name",2);__decorateClass([n$1({type:Boolean})],WebAwesomeFormAssociatedElement.prototype,"disabled",2);__decorateClass([n$1({state:!0,attribute:!1})],WebAwesomeFormAssociatedElement.prototype,"valueHasChanged",2);__decorateClass([n$1({state:!0,attribute:!1})],WebAwesomeFormAssociatedElement.prototype,"hasInteracted",2);__decorateClass([n$1({attribute:"custom-error",reflect:!0})],WebAwesomeFormAssociatedElement.prototype,"customError",2);__decorateClass([n$1({attribute:!1,state:!0,type:Object})],WebAwesomeFormAssociatedElement.prototype,"validity",1);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var HasSlotController=class{constructor(w,...T){this.slotNames=[],this.handleSlotChange=O=>{const W=O.target;(this.slotNames.includes("[default]")&&!W.name||W.name&&this.slotNames.includes(W.name))&&this.host.requestUpdate()},(this.host=w).addController(this),this.slotNames=T}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(w=>{if(w.nodeType===Node.TEXT_NODE&&w.textContent.trim()!=="")return!0;if(w.nodeType===Node.ELEMENT_NODE){const T=w;if(T.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!T.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(w){var T,O;return((O=(T=this.host).querySelector)==null?void 0:O.call(T,`:scope > [slot="${w}"]`))!==null}test(w){return w==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(w)}hostConnected(){var w,T;(T=(w=this.host.shadowRoot)==null?void 0:w.addEventListener)==null||T.call(w,"slotchange",this.handleSlotChange)}hostDisconnected(){var w,T;(T=(w=this.host.shadowRoot)==null?void 0:w.removeEventListener)==null||T.call(w,"slotchange",this.handleSlotChange)}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var size_styles_default=i$6`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var button_styles_default=i$6`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    line-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  .button.is-icon-button:has(wa-icon) {
    width: auto;
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-radius: var(--wa-border-radius-pill);
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      visibility: hidden;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }

  /*
   * Button group border radius modifications
   */

  /* Remove border radius from all grouped buttons by default */
  :host(.wa-button-group__button) .button {
    border-radius: 0;
  }

  /* Horizontal orientation */
  :host(.wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-end-start-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Vertical orientation */
  :host(.wa-button-group__vertical) {
    flex: 1 1 auto;
  }

  :host(.wa-button-group__vertical) .button {
    width: 100%;
    justify-content: start;
  }

  :host(.wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-form-control-border-radius);
    border-start-end-radius: var(--wa-form-control-border-radius);
  }

  :host(.wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-form-control-border-radius);
    border-end-end-radius: var(--wa-form-control-border-radius);
  }

  /* Handle pill modifier for button groups */
  :host([pill].wa-button-group__horizontal.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-end-start-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__horizontal.wa-button-group__button-last) .button {
    border-start-end-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-first) .button {
    border-start-start-radius: var(--wa-border-radius-pill);
    border-start-end-radius: var(--wa-border-radius-pill);
  }

  :host([pill].wa-button-group__vertical.wa-button-group__button-last) .button {
    border-end-start-radius: var(--wa-border-radius-pill);
    border-end-end-radius: var(--wa-border-radius-pill);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function watch(w,T){const O={waitUntilFirstUpdate:!1,...T};return(W,F)=>{const{update:q}=W,U=Array.isArray(w)?w:[w];W.update=function(j){U.forEach(X=>{const Y=X;if(j.has(Y)){const J=j.get(Y),K=this[Y];J!==K&&(!O.waitUntilFirstUpdate||this.hasUpdated)&&this[F](J,K)}}),q.call(this,j)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e$2=w=>(...T)=>({_$litDirective$:w,values:T});let i$2=class{constructor(T){}get _$AU(){return this._$AM._$AU}_$AT(T,O,W){this._$Ct=T,this._$AM=O,this._$Ci=W}_$AS(T,O){return this.update(T,O)}update(T,O){return this.render(...O)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=e$2(class extends i$2{constructor(w){var T;if(super(w),w.type!==t.ATTRIBUTE||w.name!=="class"||((T=w.strings)==null?void 0:T.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(w){return" "+Object.keys(w).filter(T=>w[T]).join(" ")+" "}update(w,[T]){var W,F;if(this.st===void 0){this.st=new Set,w.strings!==void 0&&(this.nt=new Set(w.strings.join(" ").split(/\s/).filter(q=>q!=="")));for(const q in T)T[q]&&!((W=this.nt)!=null&&W.has(q))&&this.st.add(q);return this.render(T)}const O=w.element.classList;for(const q of this.st)q in T||(O.remove(q),this.st.delete(q));for(const q in T){const U=!!T[q];U===this.st.has(q)||(F=this.nt)!=null&&F.has(q)||(U?(O.add(q),this.st.add(q)):(O.remove(q),this.st.delete(q)))}return E}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1=w=>w??A;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a=Symbol.for(""),o=w=>{if((w==null?void 0:w.r)===a)return w==null?void 0:w._$litStatic$},i$1=(w,...T)=>({_$litStatic$:T.reduce((O,W,F)=>O+(q=>{if(q._$litStatic$!==void 0)return q._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${q}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(W)+w[F+1],w[0]),r:a}),l$2=new Map,n=w=>(T,...O)=>{const W=O.length;let F,q;const U=[],j=[];let X,Y=0,J=!1;for(;Y<W;){for(X=T[Y];Y<W&&(q=O[Y],(F=o(q))!==void 0);)X+=F+T[++Y],J=!0;Y!==W&&j.push(q),U.push(X),Y++}if(Y===W&&U.push(T[W]),J){const K=U.join("$$lit$$");(T=l$2.get(K))===void 0&&(U.raw=U,l$2.set(K,T=U)),O=j}return w(T,...O)},u=n(b);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaButton=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new HasSlotController(this,"[default]","start","end"),this.localize=new LocalizeController(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,MirrorValidator()]}constructLightDOMButton(){const w=document.createElement("button");for(const T of this.attributes)T.name!=="style"&&w.setAttribute(T.name,T.value);return w.type=this.type,w.style.position="absolute !important",w.style.width="0 !important",w.style.height="0 !important",w.style.clipPath="inset(50%) !important",w.style.overflow="hidden !important",w.style.whiteSpace="nowrap !important",this.name&&(w.name=this.name),w.value=this.value||"",w}handleClick(w){var W;if(this.disabled||this.loading){w.preventDefault(),w.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;const O=this.constructLightDOMButton();(W=this.parentElement)==null||W.append(O),O.click(),O.remove()}handleInvalid(){this.dispatchEvent(new WaInvalidEvent)}handleLabelSlotChange(){const w=this.labelSlot.assignedNodes({flatten:!0});let T=!1,O=!1,W=!1,F=!1;[...w].forEach(q=>{var U;if(q.nodeType===Node.ELEMENT_NODE){const j=q;j.localName==="wa-icon"?(O=!0,T||(T=j.label!==void 0)):F=!0}else q.nodeType===Node.TEXT_NODE&&(((U=q.textContent)==null?void 0:U.trim())||"").length>0&&(W=!0)}),this.isIconButton=O&&!W&&!F,this.isIconButton&&!T&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...w){}click(){this.button.click()}focus(w){this.button.focus(w)}blur(){this.button.blur()}render(){const w=this.isLink(),T=w?i$1`a`:i$1`button`;return u`
      <${T}
        part="base"
        class=${e$1({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${o$1(w?void 0:this.disabled)}
        type=${o$1(w?void 0:this.type)}
        title=${this.title}
        name=${o$1(w?void 0:this.name)}
        value=${o$1(w?void 0:this.value)}
        href=${o$1(w?this.href:void 0)}
        target=${o$1(w?this.target:void 0)}
        download=${o$1(w?this.download:void 0)}
        rel=${o$1(w&&this.rel?this.rel:void 0)}
        role=${o$1(w?void 0:"button")}
        aria-disabled=${o$1(w&&this.disabled?"true":void 0)}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?u`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?u`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${T}>
    `}};WaButton.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0};WaButton.css=[button_styles_default,variants_styles_default,size_styles_default];__decorateClass([e$3(".button")],WaButton.prototype,"button",2);__decorateClass([e$3("slot:not([name])")],WaButton.prototype,"labelSlot",2);__decorateClass([r$2()],WaButton.prototype,"invalid",2);__decorateClass([r$2()],WaButton.prototype,"isIconButton",2);__decorateClass([n$1()],WaButton.prototype,"title",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"appearance",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"size",2);__decorateClass([n$1({attribute:"with-caret",type:Boolean,reflect:!0})],WaButton.prototype,"withCaret",2);__decorateClass([n$1({type:Boolean})],WaButton.prototype,"disabled",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaButton.prototype,"loading",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaButton.prototype,"pill",2);__decorateClass([n$1()],WaButton.prototype,"type",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"name",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"value",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"href",2);__decorateClass([n$1()],WaButton.prototype,"target",2);__decorateClass([n$1()],WaButton.prototype,"rel",2);__decorateClass([n$1()],WaButton.prototype,"download",2);__decorateClass([n$1({attribute:"formaction"})],WaButton.prototype,"formAction",2);__decorateClass([n$1({attribute:"formenctype"})],WaButton.prototype,"formEnctype",2);__decorateClass([n$1({attribute:"formmethod"})],WaButton.prototype,"formMethod",2);__decorateClass([n$1({attribute:"formnovalidate",type:Boolean})],WaButton.prototype,"formNoValidate",2);__decorateClass([n$1({attribute:"formtarget"})],WaButton.prototype,"formTarget",2);__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],WaButton.prototype,"handleDisabledChange",1);WaButton=__decorateClass([t$1("wa-button")],WaButton);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var spinner_styles_default=i$6`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 75, 100;
    stroke-dashoffset: -5;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaSpinner=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this)}render(){return b`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};WaSpinner.css=spinner_styles_default;WaSpinner=__decorateClass([t$1("wa-spinner")],WaSpinner);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaErrorEvent=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaLoadEvent=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var icon_styles_default=i$6`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$1=(w,T)=>(w==null?void 0:w._$litType$)!==void 0,r$1=w=>w.strings===void 0,m={},p=(w,T=m)=>w._$AH=T;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var CACHEABLE_ERROR=Symbol(),RETRYABLE_ERROR=Symbol(),parser,iconCache=new Map,WaIcon=class extends WebAwesomeElement{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(w,T)=>{var W;let O;if(T!=null&&T.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=b`<svg part="svg">
        <use part="use" href="${w}"></use>
      </svg>`,await this.updateComplete;const F=this.shadowRoot.querySelector("[part='svg']");return typeof T.mutator=="function"&&T.mutator(F,this),this.svg}try{if(O=await fetch(w,{mode:"cors"}),!O.ok)return O.status===410?CACHEABLE_ERROR:RETRYABLE_ERROR}catch{return RETRYABLE_ERROR}try{const F=document.createElement("div");F.innerHTML=await O.text();const q=F.firstElementChild;if(((W=q==null?void 0:q.tagName)==null?void 0:W.toLowerCase())!=="svg")return CACHEABLE_ERROR;parser||(parser=new DOMParser);const j=parser.parseFromString(q.outerHTML,"text/html").body.querySelector("svg");return j?(j.part.add("svg"),document.adoptNode(j)):CACHEABLE_ERROR}catch{return CACHEABLE_ERROR}}}connectedCallback(){super.connectedCallback(),watchIcon(this)}firstUpdated(w){super.firstUpdated(w),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),unwatchIcon(this)}getIconSource(){const w=getIconLibrary(this.library),T=this.family||getDefaultIconFamily();return this.name&&w?{url:w.resolver(this.name,T,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var q;const{url:w,fromLibrary:T}=this.getIconSource(),O=T?getIconLibrary(this.library):void 0;if(!w){this.svg=null;return}let W=iconCache.get(w);W||(W=this.resolveIcon(w,O),iconCache.set(w,W));const F=await W;if(F===RETRYABLE_ERROR&&iconCache.delete(w),w===this.getIconSource().url){if(l$1(F)){this.svg=F;return}switch(F){case RETRYABLE_ERROR:case CACHEABLE_ERROR:this.svg=null,this.dispatchEvent(new WaErrorEvent);break;default:this.svg=F.cloneNode(!0),(q=O==null?void 0:O.mutator)==null||q.call(O,this.svg,this),this.dispatchEvent(new WaLoadEvent)}}}updated(w){var W,F;super.updated(w);const T=getIconLibrary(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);const O=(W=this.shadowRoot)==null?void 0:W.querySelector("svg");O&&((F=T==null?void 0:T.mutator)==null||F.call(T,O,this))}render(){return this.hasUpdated?this.svg:b`<svg part="svg" width="16" height="16"></svg>`}};WaIcon.css=icon_styles_default;__decorateClass([r$2()],WaIcon.prototype,"svg",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"name",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"family",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"variant",2);__decorateClass([n$1({attribute:"auto-width",type:Boolean,reflect:!0})],WaIcon.prototype,"autoWidth",2);__decorateClass([n$1({attribute:"swap-opacity",type:Boolean,reflect:!0})],WaIcon.prototype,"swapOpacity",2);__decorateClass([n$1()],WaIcon.prototype,"src",2);__decorateClass([n$1()],WaIcon.prototype,"label",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"library",2);__decorateClass([n$1({type:Number,reflect:!0})],WaIcon.prototype,"rotate",2);__decorateClass([n$1({type:String,reflect:!0})],WaIcon.prototype,"flip",2);__decorateClass([n$1({type:String,reflect:!0})],WaIcon.prototype,"animation",2);__decorateClass([watch("label")],WaIcon.prototype,"handleLabelChange",1);__decorateClass([watch(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],WaIcon.prototype,"setIcon",1);WaIcon=__decorateClass([t$1("wa-icon")],WaIcon);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var card_styles_default=i$6`
  :host {
    --spacing: var(--wa-space-l);

    /* Internal calculated properties */
    --inner-border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));

    display: flex;
    flex-direction: column;
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-s);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='outlined']) {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='accent']) {
    color: var(--wa-color-neutral-on-loud);
    background-color: var(--wa-color-neutral-fill-loud);
    border-color: transparent;
  }

  /* Take care of top and bottom radii */
  .media,
  :host(:not([with-media])) .header,
  :host(:not([with-media], [with-header])) .body {
    border-start-start-radius: var(--inner-border-radius);
    border-start-end-radius: var(--inner-border-radius);
  }

  :host(:not([with-footer])) .body,
  .footer {
    border-end-start-radius: var(--inner-border-radius);
    border-end-end-radius: var(--inner-border-radius);
  }

  .media {
    display: flex;
    overflow: hidden;

    &::slotted(*) {
      display: block;
      width: 100%;
      border-radius: 0 !important;
    }
  }

  /* Round all corners for plain appearance */
  :host([appearance='plain']) .media {
    border-radius: var(--inner-border-radius);

    &::slotted(*) {
      border-radius: inherit !important;
    }
  }

  .header {
    display: block;
    border-block-end-style: inherit;
    border-block-end-color: var(--wa-color-surface-border);
    border-block-end-width: var(--wa-panel-border-width);
    padding: calc(var(--spacing) / 2) var(--spacing);
  }

  .body {
    display: block;
    padding: var(--spacing);
  }

  .footer {
    display: block;
    border-block-start-style: inherit;
    border-block-start-color: var(--wa-color-surface-border);
    border-block-start-width: var(--wa-panel-border-width);
    padding: var(--spacing);
  }

  /* Push slots to sides when the action slots renders */
  .has-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :host(:not([with-header])) .header,
  :host(:not([with-footer])) .footer,
  :host(:not([with-media])) .media {
    display: none;
  }

  /* Orientation Styles */
  :host([orientation='horizontal']) {
    flex-direction: row;

    .media {
      border-start-start-radius: var(--inner-border-radius);
      border-end-start-radius: var(--inner-border-radius);
      border-start-end-radius: 0;

      &::slotted(*) {
        block-size: 100%;
        inline-size: 100%;
        object-fit: cover;
      }
    }
  }

  :host([orientation='horizontal']) ::slotted([slot='body']) {
    display: block;
    height: 100%;
    margin: 0;
  }

  :host([orientation='horizontal']) ::slotted([slot='actions']) {
    display: flex;
    align-items: center;
    padding: var(--spacing);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaCard=class extends WebAwesomeElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"footer","header","media","header-actions","footer-actions","actions"),this.appearance="outlined",this.withHeader=!1,this.withMedia=!1,this.withFooter=!1,this.orientation="vertical"}updated(){!this.withHeader&&this.hasSlotController.test("header")&&(this.withHeader=!0),!this.withMedia&&this.hasSlotController.test("media")&&(this.withMedia=!0),!this.withFooter&&this.hasSlotController.test("footer")&&(this.withFooter=!0)}render(){return this.orientation==="horizontal"?b`
        <slot name="media" part="media" class="media"></slot>
        <slot part="body" class="body"></slot>
        <slot name="actions" part="actions" class="actions"></slot>
      `:b`
      <slot name="media" part="media" class="media"></slot>

      ${this.hasSlotController.test("header-actions")?b` <header part="header" class="header has-actions">
            <slot name="header"></slot>
            <slot name="header-actions"></slot>
          </header>`:b` <header part="header" class="header">
            <slot name="header"></slot>
          </header>`}

      <slot part="body" class="body"></slot>
      ${this.hasSlotController.test("footer-actions")?b` <footer part="footer" class="footer has-actions">
            <slot name="footer"></slot>
            <slot name="footer-actions"></slot>
          </footer>`:b` <footer part="footer" class="footer">
            <slot name="footer"></slot>
          </footer>`}
    `}};WaCard.css=[size_styles_default,card_styles_default];__decorateClass([n$1({reflect:!0})],WaCard.prototype,"appearance",2);__decorateClass([n$1({attribute:"with-header",type:Boolean,reflect:!0})],WaCard.prototype,"withHeader",2);__decorateClass([n$1({attribute:"with-media",type:Boolean,reflect:!0})],WaCard.prototype,"withMedia",2);__decorateClass([n$1({attribute:"with-footer",type:Boolean,reflect:!0})],WaCard.prototype,"withFooter",2);__decorateClass([n$1({reflect:!0})],WaCard.prototype,"orientation",2);WaCard=__decorateClass([t$1("wa-card")],WaCard);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var callout_styles_default=i$6`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaCallout=class extends WebAwesomeElement{constructor(){super(...arguments),this.variant="brand",this.size="medium"}render(){return b`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};WaCallout.css=[callout_styles_default,variants_styles_default,size_styles_default];__decorateClass([n$1({reflect:!0})],WaCallout.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],WaCallout.prototype,"appearance",2);__decorateClass([n$1({reflect:!0})],WaCallout.prototype,"size",2);WaCallout=__decorateClass([t$1("wa-callout")],WaCallout);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var divider_styles_default=i$6`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaDivider=class extends WebAwesomeElement{constructor(){super(...arguments),this.orientation="horizontal"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}};WaDivider.css=divider_styles_default;__decorateClass([n$1({reflect:!0})],WaDivider.prototype,"orientation",2);__decorateClass([watch("orientation")],WaDivider.prototype,"handleVerticalChange",1);WaDivider=__decorateClass([t$1("wa-divider")],WaDivider);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var drawer_styles_default=i$6`
  :host {
    --size: 25rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .drawer {
    display: flex;
    flex-direction: column;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border: none;
    box-shadow: var(--wa-shadow-l);
    overflow: auto;
    padding: 0;
    margin: 0;
    animation-duration: var(--show-duration);
    animation-timing-function: ease;

    &.show::backdrop {
      animation: show-backdrop var(--show-duration, 200ms) ease;
    }

    &.hide::backdrop {
      animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
    }

    &.show.top {
      animation: show-drawer-from-top var(--show-duration) ease;
    }

    &.hide.top {
      animation: show-drawer-from-top var(--hide-duration) ease reverse;
    }

    &.show.end {
      animation: show-drawer-from-end var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.hide.end {
      animation: show-drawer-from-end var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-start;
      }
    }

    &.show.bottom {
      animation: show-drawer-from-bottom var(--show-duration) ease;
    }

    &.hide.bottom {
      animation: show-drawer-from-bottom var(--hide-duration) ease reverse;
    }

    &.show.start {
      animation: show-drawer-from-start var(--show-duration) ease;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.hide.start {
      animation: show-drawer-from-start var(--hide-duration) ease reverse;

      &:dir(rtl) {
        animation-name: show-drawer-from-end;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .drawer:focus {
    outline: none;
  }

  .top {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .end {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .bottom {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .start {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .header {
    display: flex;
    flex-wrap: nowrap;
    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:last-of-type)) {
    margin-inline-end: var(--wa-spacing-xs);
  }

  .drawer::backdrop {
    /*
        NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
        remove the fallback values here.
      */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.01;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-drawer {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-drawer-from-top {
    from {
      opacity: 0;
      translate: 0 -100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-end {
    from {
      opacity: 0;
      translate: 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-bottom {
    from {
      opacity: 0;
      translate: 0 100%;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-drawer-from-start {
    from {
      opacity: 0;
      translate: -100% 0;
    }
    to {
      opacity: 1;
      translate: 0 0;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .drawer {
      border: solid 1px white;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var locks=new Set;function getScrollbarWidth(){const w=document.documentElement.clientWidth;return Math.abs(window.innerWidth-w)}function getExistingBodyPadding(){const w=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(w)||!w?0:w}function lockBodyScrolling(w){if(locks.add(w),!document.documentElement.classList.contains("wa-scroll-lock")){const T=getScrollbarWidth()+getExistingBodyPadding();let O=getComputedStyle(document.documentElement).scrollbarGutter;(!O||O==="auto")&&(O="stable"),T<2&&(O=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",O),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${T}px`)}}function unlockBodyScrolling(w){locks.delete(w),locks.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function parseSpaceDelimitedTokens(w){return w.split(" ").map(T=>T.trim()).filter(T=>T!=="")}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var dismissibleStack=[];function registerDismissible(w){dismissibleStack.push(w)}function unregisterDismissible(w){for(let T=dismissibleStack.length-1;T>=0;T--)if(dismissibleStack[T]===w){dismissibleStack.splice(T,1);break}}function isTopDismissible(w){return dismissibleStack.length>0&&dismissibleStack[dismissibleStack.length-1]===w}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaShowEvent=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaHideEvent=class extends Event{constructor(w){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=w}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaAfterHideEvent=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaAfterShowEvent=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function animateWithClass(w,T){return new Promise(O=>{const W=new AbortController,{signal:F}=W;if(w.classList.contains(T))return;w.classList.add(T);let q=!1,U=()=>{q||(q=!0,w.classList.remove(T),O(),W.abort())};w.addEventListener("animationend",U,{once:!0,signal:F}),w.addEventListener("animationcancel",U,{once:!0,signal:F}),requestAnimationFrame(()=>{!q&&w.getAnimations().length===0&&U()})})}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaDrawer=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.hasSlotController=new HasSlotController(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=w=>{w.key==="Escape"&&this.open&&isTopDismissible(this)&&(w.preventDefault(),w.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),lockBodyScrolling(this))}disconnectedCallback(){super.disconnectedCallback(),unlockBodyScrolling(this),this.removeOpenListeners()}async requestClose(w){const T=new WaHideEvent({source:w});if(this.dispatchEvent(T),T.defaultPrevented){this.open=!0,animateWithClass(this.drawer,"pulse");return}this.removeOpenListeners(),await animateWithClass(this.drawer,"hide"),this.open=!1,this.drawer.close(),unlockBodyScrolling(this);const O=this.originalTrigger;typeof(O==null?void 0:O.focus)=="function"&&setTimeout(()=>O.focus()),this.dispatchEvent(new WaAfterHideEvent)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),registerDismissible(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this)}handleDialogCancel(w){w.preventDefault(),!this.drawer.classList.contains("hide")&&w.target===this.drawer&&isTopDismissible(this)&&this.requestClose(this.drawer)}handleDialogClick(w){const O=w.target.closest('[data-drawer="close"]');O&&(w.stopPropagation(),this.requestClose(O))}async handleDialogPointerDown(w){w.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await animateWithClass(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const w=new WaShowEvent;if(this.dispatchEvent(w),w.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),lockBodyScrolling(this),requestAnimationFrame(()=>{const T=this.querySelector("[autofocus]");T&&typeof T.focus=="function"?T.focus():this.drawer.focus()}),await animateWithClass(this.drawer,"show"),this.dispatchEvent(new WaAfterShowEvent)}render(){const w=!this.withoutHeader,T=this.hasSlotController.test("footer");return b`
      <dialog
        part="dialog"
        class=${e$1({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${w?b`
              <header part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"​"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${O=>this.requestClose(O.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </header>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        ${T?b`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};WaDrawer.css=drawer_styles_default;__decorateClass([e$3(".drawer")],WaDrawer.prototype,"drawer",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaDrawer.prototype,"open",2);__decorateClass([n$1({reflect:!0})],WaDrawer.prototype,"label",2);__decorateClass([n$1({reflect:!0})],WaDrawer.prototype,"placement",2);__decorateClass([n$1({attribute:"without-header",type:Boolean,reflect:!0})],WaDrawer.prototype,"withoutHeader",2);__decorateClass([n$1({attribute:"light-dismiss",type:Boolean})],WaDrawer.prototype,"lightDismiss",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaDrawer.prototype,"handleOpenChange",1);WaDrawer=__decorateClass([t$1("wa-drawer")],WaDrawer);document.addEventListener("click",w=>{const T=w.target.closest("[data-drawer]");if(T instanceof Element){const[O,W]=parseSpaceDelimitedTokens(T.getAttribute("data-drawer")||"");if(O==="open"&&(W!=null&&W.length)){const q=T.getRootNode().getElementById(W);(q==null?void 0:q.localName)==="wa-drawer"?q.open=!0:console.warn(`A drawer with an ID of "${W}" could not be found in this document.`)}}}),document.body.addEventListener("pointerdown",()=>{});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaClearEvent=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function submitOnEnter(w,T){const O=w.metaKey||w.ctrlKey||w.shiftKey||w.altKey;w.key==="Enter"&&!O&&setTimeout(()=>{!w.defaultPrevented&&!w.isComposing&&submitForm(T)})}function submitForm(w){let T=null;if("form"in w&&(T=w.form),!T&&"getForm"in w&&(T=w.getForm()),!T)return;const O=[...T.elements];if(O.length===1){T.requestSubmit(null);return}const W=O.find(F=>F.type==="submit"&&!F.matches(":disabled"));W&&(["input","button"].includes(W.localName)?T.requestSubmit(W):W.click())}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var input_styles_default=i$6`
  :host {
    border-width: 0;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var form_control_styles_default=i$6`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$2(class extends i$2{constructor(w){if(super(w),w.type!==t.PROPERTY&&w.type!==t.ATTRIBUTE&&w.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r$1(w))throw Error("`live` bindings can only contain a single expression")}render(w){return w}update(w,[T]){if(T===E||T===A)return T;const O=w.element,W=w.name;if(w.type===t.PROPERTY){if(T===O[W])return E}else if(w.type===t.BOOLEAN_ATTRIBUTE){if(!!T===O.hasAttribute(W))return E}else if(w.type===t.ATTRIBUTE&&O.getAttribute(W)===T+"")return E;return p(w),T}});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaInput=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(w){this._value!==w&&(this.valueHasChanged=!0,this._value=w)}handleChange(w){this.value=this.input.value,this.relayNativeEvent(w,{bubbles:!0,composed:!0})}handleClearClick(w){w.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new WaClearEvent),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(w){submitOnEnter(w,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(w){super.updated(w),(w.has("value")||w.has("defaultValue"))&&(this.customStates.set("blank",!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(w){this.input.focus(w)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(w,T,O="none"){this.input.setSelectionRange(w,T,O)}setRangeText(w,T,O,W="preserve"){const F=T??this.input.selectionStart,q=O??this.input.selectionEnd;this.input.setRangeText(w,F,q,W),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){const w=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,T=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,O=this.label?!0:!!w,W=this.hint?!0:!!T,F=this.withClear&&!this.disabled&&!this.readonly,q=this.hasUpdated&&F&&(typeof this.value=="number"||this.value&&this.value.length>0);return b`
      <label
        part="form-control-label label"
        class=${e$1({label:!0,"has-label":O})}
        for="input"
        aria-hidden=${O?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${o$1(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o$1(this.placeholder)}
          minlength=${o$1(this.minlength)}
          maxlength=${o$1(this.maxlength)}
          min=${o$1(this.min)}
          max=${o$1(this.max)}
          step=${o$1(this.step)}
          .value=${l(this.value??"")}
          autocapitalize=${o$1(this.autocapitalize)}
          autocomplete=${o$1(this.autocomplete)}
          autocorrect=${o$1(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${o$1(this.pattern)}
          enterkeyhint=${o$1(this.enterkeyhint)}
          inputmode=${o$1(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${q?b`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?b`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
                tabindex="-1"
              >
                ${this.passwordVisible?b`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:b`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${e$1({"has-slotted":W})}
        aria-hidden=${W?"false":"true"}
        >${this.hint}</slot
      >
    `}};WaInput.css=[size_styles_default,form_control_styles_default,input_styles_default];WaInput.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0};__decorateClass([e$3("input")],WaInput.prototype,"input",2);__decorateClass([n$1()],WaInput.prototype,"title",2);__decorateClass([n$1({reflect:!0})],WaInput.prototype,"type",2);__decorateClass([r$2()],WaInput.prototype,"value",1);__decorateClass([n$1({attribute:"value",reflect:!0})],WaInput.prototype,"defaultValue",2);__decorateClass([n$1({reflect:!0})],WaInput.prototype,"size",2);__decorateClass([n$1({reflect:!0})],WaInput.prototype,"appearance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaInput.prototype,"pill",2);__decorateClass([n$1()],WaInput.prototype,"label",2);__decorateClass([n$1({attribute:"hint"})],WaInput.prototype,"hint",2);__decorateClass([n$1({attribute:"with-clear",type:Boolean})],WaInput.prototype,"withClear",2);__decorateClass([n$1()],WaInput.prototype,"placeholder",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaInput.prototype,"readonly",2);__decorateClass([n$1({attribute:"password-toggle",type:Boolean})],WaInput.prototype,"passwordToggle",2);__decorateClass([n$1({attribute:"password-visible",type:Boolean})],WaInput.prototype,"passwordVisible",2);__decorateClass([n$1({attribute:"without-spin-buttons",type:Boolean})],WaInput.prototype,"withoutSpinButtons",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaInput.prototype,"required",2);__decorateClass([n$1()],WaInput.prototype,"pattern",2);__decorateClass([n$1({type:Number})],WaInput.prototype,"minlength",2);__decorateClass([n$1({type:Number})],WaInput.prototype,"maxlength",2);__decorateClass([n$1()],WaInput.prototype,"min",2);__decorateClass([n$1()],WaInput.prototype,"max",2);__decorateClass([n$1()],WaInput.prototype,"step",2);__decorateClass([n$1()],WaInput.prototype,"autocapitalize",2);__decorateClass([n$1()],WaInput.prototype,"autocorrect",2);__decorateClass([n$1()],WaInput.prototype,"autocomplete",2);__decorateClass([n$1({type:Boolean})],WaInput.prototype,"autofocus",2);__decorateClass([n$1()],WaInput.prototype,"enterkeyhint",2);__decorateClass([n$1({type:Boolean,converter:{fromAttribute:w=>!(!w||w==="false"),toAttribute:w=>w?"true":"false"}})],WaInput.prototype,"spellcheck",2);__decorateClass([n$1()],WaInput.prototype,"inputmode",2);__decorateClass([n$1({attribute:"with-label",type:Boolean})],WaInput.prototype,"withLabel",2);__decorateClass([n$1({attribute:"with-hint",type:Boolean})],WaInput.prototype,"withHint",2);__decorateClass([watch("step",{waitUntilFirstUpdate:!0})],WaInput.prototype,"handleStepChange",1);WaInput=__decorateClass([t$1("wa-input")],WaInput);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var tooltip_styles_default=i$6`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
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

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaRepositionEvent=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var popup_styles_default=i$6`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
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

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;const min=Math.min,max=Math.max,round=Math.round,floor=Math.floor,createCoords=w=>({x:w,y:w}),oppositeSideMap={left:"right",right:"left",bottom:"top",top:"bottom"};function clamp(w,T,O){return max(w,min(T,O))}function evaluate(w,T){return typeof w=="function"?w(T):w}function getSide(w){return w.split("-")[0]}function getAlignment(w){return w.split("-")[1]}function getOppositeAxis(w){return w==="x"?"y":"x"}function getAxisLength(w){return w==="y"?"height":"width"}function getSideAxis(w){const T=w[0];return T==="t"||T==="b"?"y":"x"}function getAlignmentAxis(w){return getOppositeAxis(getSideAxis(w))}function getAlignmentSides(w,T,O){O===void 0&&(O=!1);const W=getAlignment(w),F=getAlignmentAxis(w),q=getAxisLength(F);let U=F==="x"?W===(O?"end":"start")?"right":"left":W==="start"?"bottom":"top";return T.reference[q]>T.floating[q]&&(U=getOppositePlacement(U)),[U,getOppositePlacement(U)]}function getExpandedPlacements(w){const T=getOppositePlacement(w);return[getOppositeAlignmentPlacement(w),T,getOppositeAlignmentPlacement(T)]}function getOppositeAlignmentPlacement(w){return w.includes("start")?w.replace("start","end"):w.replace("end","start")}const lrPlacement=["left","right"],rlPlacement=["right","left"],tbPlacement=["top","bottom"],btPlacement=["bottom","top"];function getSideList(w,T,O){switch(w){case"top":case"bottom":return O?T?rlPlacement:lrPlacement:T?lrPlacement:rlPlacement;case"left":case"right":return T?tbPlacement:btPlacement;default:return[]}}function getOppositeAxisPlacements(w,T,O,W){const F=getAlignment(w);let q=getSideList(getSide(w),O==="start",W);return F&&(q=q.map(U=>U+"-"+F),T&&(q=q.concat(q.map(getOppositeAlignmentPlacement)))),q}function getOppositePlacement(w){const T=getSide(w);return oppositeSideMap[T]+w.slice(T.length)}function expandPaddingObject(w){return{top:0,right:0,bottom:0,left:0,...w}}function getPaddingObject(w){return typeof w!="number"?expandPaddingObject(w):{top:w,right:w,bottom:w,left:w}}function rectToClientRect(w){const{x:T,y:O,width:W,height:F}=w;return{width:W,height:F,top:O,left:T,right:T+W,bottom:O+F,x:T,y:O}}function computeCoordsFromPlacement(w,T,O){let{reference:W,floating:F}=w;const q=getSideAxis(T),U=getAlignmentAxis(T),j=getAxisLength(U),X=getSide(T),Y=q==="y",J=W.x+W.width/2-F.width/2,K=W.y+W.height/2-F.height/2,G=W[j]/2-F[j]/2;let tt;switch(X){case"top":tt={x:J,y:W.y-F.height};break;case"bottom":tt={x:J,y:W.y+W.height};break;case"right":tt={x:W.x+W.width,y:K};break;case"left":tt={x:W.x-F.width,y:K};break;default:tt={x:W.x,y:W.y}}switch(getAlignment(T)){case"start":tt[U]-=G*(O&&Y?-1:1);break;case"end":tt[U]+=G*(O&&Y?-1:1);break}return tt}async function detectOverflow(w,T){var O;T===void 0&&(T={});const{x:W,y:F,platform:q,rects:U,elements:j,strategy:X}=w,{boundary:Y="clippingAncestors",rootBoundary:J="viewport",elementContext:K="floating",altBoundary:G=!1,padding:tt=0}=evaluate(T,w),Q=getPaddingObject(tt),ot=j[G?K==="floating"?"reference":"floating":K],rt=rectToClientRect(await q.getClippingRect({element:(O=await(q.isElement==null?void 0:q.isElement(ot)))==null||O?ot:ot.contextElement||await(q.getDocumentElement==null?void 0:q.getDocumentElement(j.floating)),boundary:Y,rootBoundary:J,strategy:X})),at=K==="floating"?{x:W,y:F,width:U.floating.width,height:U.floating.height}:U.reference,nt=await(q.getOffsetParent==null?void 0:q.getOffsetParent(j.floating)),it=await(q.isElement==null?void 0:q.isElement(nt))?await(q.getScale==null?void 0:q.getScale(nt))||{x:1,y:1}:{x:1,y:1},dt=rectToClientRect(q.convertOffsetParentRelativeRectToViewportRelativeRect?await q.convertOffsetParentRelativeRectToViewportRelativeRect({elements:j,rect:at,offsetParent:nt,strategy:X}):at);return{top:(rt.top-dt.top+Q.top)/it.y,bottom:(dt.bottom-rt.bottom+Q.bottom)/it.y,left:(rt.left-dt.left+Q.left)/it.x,right:(dt.right-rt.right+Q.right)/it.x}}const MAX_RESET_COUNT=50,computePosition$1=async(w,T,O)=>{const{placement:W="bottom",strategy:F="absolute",middleware:q=[],platform:U}=O,j=U.detectOverflow?U:{...U,detectOverflow},X=await(U.isRTL==null?void 0:U.isRTL(T));let Y=await U.getElementRects({reference:w,floating:T,strategy:F}),{x:J,y:K}=computeCoordsFromPlacement(Y,W,X),G=W,tt=0;const Q={};for(let et=0;et<q.length;et++){const ot=q[et];if(!ot)continue;const{name:rt,fn:at}=ot,{x:nt,y:it,data:dt,reset:ut}=await at({x:J,y:K,initialPlacement:W,placement:G,strategy:F,middlewareData:Q,rects:Y,platform:j,elements:{reference:w,floating:T}});J=nt??J,K=it??K,Q[rt]={...Q[rt],...dt},ut&&tt<MAX_RESET_COUNT&&(tt++,typeof ut=="object"&&(ut.placement&&(G=ut.placement),ut.rects&&(Y=ut.rects===!0?await U.getElementRects({reference:w,floating:T,strategy:F}):ut.rects),{x:J,y:K}=computeCoordsFromPlacement(Y,G,X)),et=-1)}return{x:J,y:K,placement:G,strategy:F,middlewareData:Q}},arrow$1=w=>({name:"arrow",options:w,async fn(T){const{x:O,y:W,placement:F,rects:q,platform:U,elements:j,middlewareData:X}=T,{element:Y,padding:J=0}=evaluate(w,T)||{};if(Y==null)return{};const K=getPaddingObject(J),G={x:O,y:W},tt=getAlignmentAxis(F),Q=getAxisLength(tt),et=await U.getDimensions(Y),ot=tt==="y",rt=ot?"top":"left",at=ot?"bottom":"right",nt=ot?"clientHeight":"clientWidth",it=q.reference[Q]+q.reference[tt]-G[tt]-q.floating[Q],dt=G[tt]-q.reference[tt],ut=await(U.getOffsetParent==null?void 0:U.getOffsetParent(Y));let lt=ut?ut[nt]:0;(!lt||!await(U.isElement==null?void 0:U.isElement(ut)))&&(lt=j.floating[nt]||q.floating[Q]);const Ct=it/2-dt/2,gt=lt/2-et[Q]/2-1,wt=min(K[rt],gt),Et=min(K[at],gt),bt=wt,pt=lt-et[Q]-Et,ht=lt/2-et[Q]/2+Ct,xt=clamp(bt,ht,pt),vt=!X.arrow&&getAlignment(F)!=null&&ht!==xt&&q.reference[Q]/2-(ht<bt?wt:Et)-et[Q]/2<0,ct=vt?ht<bt?ht-bt:ht-pt:0;return{[tt]:G[tt]+ct,data:{[tt]:xt,centerOffset:ht-xt-ct,...vt&&{alignmentOffset:ct}},reset:vt}}}),flip$1=function(w){return w===void 0&&(w={}),{name:"flip",options:w,async fn(T){var O,W;const{placement:F,middlewareData:q,rects:U,initialPlacement:j,platform:X,elements:Y}=T,{mainAxis:J=!0,crossAxis:K=!0,fallbackPlacements:G,fallbackStrategy:tt="bestFit",fallbackAxisSideDirection:Q="none",flipAlignment:et=!0,...ot}=evaluate(w,T);if((O=q.arrow)!=null&&O.alignmentOffset)return{};const rt=getSide(F),at=getSideAxis(j),nt=getSide(j)===j,it=await(X.isRTL==null?void 0:X.isRTL(Y.floating)),dt=G||(nt||!et?[getOppositePlacement(j)]:getExpandedPlacements(j)),ut=Q!=="none";!G&&ut&&dt.push(...getOppositeAxisPlacements(j,et,Q,it));const lt=[j,...dt],Ct=await X.detectOverflow(T,ot),gt=[];let wt=((W=q.flip)==null?void 0:W.overflows)||[];if(J&&gt.push(Ct[rt]),K){const ht=getAlignmentSides(F,U,it);gt.push(Ct[ht[0]],Ct[ht[1]])}if(wt=[...wt,{placement:F,overflows:gt}],!gt.every(ht=>ht<=0)){var Et,bt;const ht=(((Et=q.flip)==null?void 0:Et.index)||0)+1,xt=lt[ht];if(xt&&(!(K==="alignment"?at!==getSideAxis(xt):!1)||wt.every(yt=>getSideAxis(yt.placement)===at?yt.overflows[0]>0:!0)))return{data:{index:ht,overflows:wt},reset:{placement:xt}};let vt=(bt=wt.filter(ct=>ct.overflows[0]<=0).sort((ct,yt)=>ct.overflows[1]-yt.overflows[1])[0])==null?void 0:bt.placement;if(!vt)switch(tt){case"bestFit":{var pt;const ct=(pt=wt.filter(yt=>{if(ut){const _t=getSideAxis(yt.placement);return _t===at||_t==="y"}return!0}).map(yt=>[yt.placement,yt.overflows.filter(_t=>_t>0).reduce((_t,St)=>_t+St,0)]).sort((yt,_t)=>yt[1]-_t[1])[0])==null?void 0:pt[0];ct&&(vt=ct);break}case"initialPlacement":vt=j;break}if(F!==vt)return{reset:{placement:vt}}}return{}}}},originSides=new Set(["left","top"]);async function convertValueToCoords(w,T){const{placement:O,platform:W,elements:F}=w,q=await(W.isRTL==null?void 0:W.isRTL(F.floating)),U=getSide(O),j=getAlignment(O),X=getSideAxis(O)==="y",Y=originSides.has(U)?-1:1,J=q&&X?-1:1,K=evaluate(T,w);let{mainAxis:G,crossAxis:tt,alignmentAxis:Q}=typeof K=="number"?{mainAxis:K,crossAxis:0,alignmentAxis:null}:{mainAxis:K.mainAxis||0,crossAxis:K.crossAxis||0,alignmentAxis:K.alignmentAxis};return j&&typeof Q=="number"&&(tt=j==="end"?Q*-1:Q),X?{x:tt*J,y:G*Y}:{x:G*Y,y:tt*J}}const offset$1=function(w){return w===void 0&&(w=0),{name:"offset",options:w,async fn(T){var O,W;const{x:F,y:q,placement:U,middlewareData:j}=T,X=await convertValueToCoords(T,w);return U===((O=j.offset)==null?void 0:O.placement)&&(W=j.arrow)!=null&&W.alignmentOffset?{}:{x:F+X.x,y:q+X.y,data:{...X,placement:U}}}}},shift$1=function(w){return w===void 0&&(w={}),{name:"shift",options:w,async fn(T){const{x:O,y:W,placement:F,platform:q}=T,{mainAxis:U=!0,crossAxis:j=!1,limiter:X={fn:rt=>{let{x:at,y:nt}=rt;return{x:at,y:nt}}},...Y}=evaluate(w,T),J={x:O,y:W},K=await q.detectOverflow(T,Y),G=getSideAxis(getSide(F)),tt=getOppositeAxis(G);let Q=J[tt],et=J[G];if(U){const rt=tt==="y"?"top":"left",at=tt==="y"?"bottom":"right",nt=Q+K[rt],it=Q-K[at];Q=clamp(nt,Q,it)}if(j){const rt=G==="y"?"top":"left",at=G==="y"?"bottom":"right",nt=et+K[rt],it=et-K[at];et=clamp(nt,et,it)}const ot=X.fn({...T,[tt]:Q,[G]:et});return{...ot,data:{x:ot.x-O,y:ot.y-W,enabled:{[tt]:U,[G]:j}}}}}},size$1=function(w){return w===void 0&&(w={}),{name:"size",options:w,async fn(T){var O,W;const{placement:F,rects:q,platform:U,elements:j}=T,{apply:X=()=>{},...Y}=evaluate(w,T),J=await U.detectOverflow(T,Y),K=getSide(F),G=getAlignment(F),tt=getSideAxis(F)==="y",{width:Q,height:et}=q.floating;let ot,rt;K==="top"||K==="bottom"?(ot=K,rt=G===(await(U.isRTL==null?void 0:U.isRTL(j.floating))?"start":"end")?"left":"right"):(rt=K,ot=G==="end"?"top":"bottom");const at=et-J.top-J.bottom,nt=Q-J.left-J.right,it=min(et-J[ot],at),dt=min(Q-J[rt],nt),ut=!T.middlewareData.shift;let lt=it,Ct=dt;if((O=T.middlewareData.shift)!=null&&O.enabled.x&&(Ct=nt),(W=T.middlewareData.shift)!=null&&W.enabled.y&&(lt=at),ut&&!G){const wt=max(J.left,0),Et=max(J.right,0),bt=max(J.top,0),pt=max(J.bottom,0);tt?Ct=Q-2*(wt!==0||Et!==0?wt+Et:max(J.left,J.right)):lt=et-2*(bt!==0||pt!==0?bt+pt:max(J.top,J.bottom))}await X({...T,availableWidth:Ct,availableHeight:lt});const gt=await U.getDimensions(j.floating);return Q!==gt.width||et!==gt.height?{reset:{rects:!0}}:{}}}};function hasWindow(){return typeof window<"u"}function getNodeName(w){return isNode(w)?(w.nodeName||"").toLowerCase():"#document"}function getWindow(w){var T;return(w==null||(T=w.ownerDocument)==null?void 0:T.defaultView)||window}function getDocumentElement(w){var T;return(T=(isNode(w)?w.ownerDocument:w.document)||window.document)==null?void 0:T.documentElement}function isNode(w){return hasWindow()?w instanceof Node||w instanceof getWindow(w).Node:!1}function isElement(w){return hasWindow()?w instanceof Element||w instanceof getWindow(w).Element:!1}function isHTMLElement(w){return hasWindow()?w instanceof HTMLElement||w instanceof getWindow(w).HTMLElement:!1}function isShadowRoot(w){return!hasWindow()||typeof ShadowRoot>"u"?!1:w instanceof ShadowRoot||w instanceof getWindow(w).ShadowRoot}function isOverflowElement(w){const{overflow:T,overflowX:O,overflowY:W,display:F}=getComputedStyle$1(w);return/auto|scroll|overlay|hidden|clip/.test(T+W+O)&&F!=="inline"&&F!=="contents"}function isTableElement(w){return/^(table|td|th)$/.test(getNodeName(w))}function isTopLayer(w){try{if(w.matches(":popover-open"))return!0}catch{}try{return w.matches(":modal")}catch{return!1}}const willChangeRe=/transform|translate|scale|rotate|perspective|filter/,containRe=/paint|layout|strict|content/,isNotNone=w=>!!w&&w!=="none";let isWebKitValue;function isContainingBlock(w){const T=isElement(w)?getComputedStyle$1(w):w;return isNotNone(T.transform)||isNotNone(T.translate)||isNotNone(T.scale)||isNotNone(T.rotate)||isNotNone(T.perspective)||!isWebKit()&&(isNotNone(T.backdropFilter)||isNotNone(T.filter))||willChangeRe.test(T.willChange||"")||containRe.test(T.contain||"")}function getContainingBlock(w){let T=getParentNode(w);for(;isHTMLElement(T)&&!isLastTraversableNode(T);){if(isContainingBlock(T))return T;if(isTopLayer(T))return null;T=getParentNode(T)}return null}function isWebKit(){return isWebKitValue==null&&(isWebKitValue=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),isWebKitValue}function isLastTraversableNode(w){return/^(html|body|#document)$/.test(getNodeName(w))}function getComputedStyle$1(w){return getWindow(w).getComputedStyle(w)}function getNodeScroll(w){return isElement(w)?{scrollLeft:w.scrollLeft,scrollTop:w.scrollTop}:{scrollLeft:w.scrollX,scrollTop:w.scrollY}}function getParentNode(w){if(getNodeName(w)==="html")return w;const T=w.assignedSlot||w.parentNode||isShadowRoot(w)&&w.host||getDocumentElement(w);return isShadowRoot(T)?T.host:T}function getNearestOverflowAncestor(w){const T=getParentNode(w);return isLastTraversableNode(T)?w.ownerDocument?w.ownerDocument.body:w.body:isHTMLElement(T)&&isOverflowElement(T)?T:getNearestOverflowAncestor(T)}function getOverflowAncestors(w,T,O){var W;T===void 0&&(T=[]),O===void 0&&(O=!0);const F=getNearestOverflowAncestor(w),q=F===((W=w.ownerDocument)==null?void 0:W.body),U=getWindow(F);if(q){const j=getFrameElement(U);return T.concat(U,U.visualViewport||[],isOverflowElement(F)?F:[],j&&O?getOverflowAncestors(j):[])}else return T.concat(F,getOverflowAncestors(F,[],O))}function getFrameElement(w){return w.parent&&Object.getPrototypeOf(w.parent)?w.frameElement:null}function getCssDimensions(w){const T=getComputedStyle$1(w);let O=parseFloat(T.width)||0,W=parseFloat(T.height)||0;const F=isHTMLElement(w),q=F?w.offsetWidth:O,U=F?w.offsetHeight:W,j=round(O)!==q||round(W)!==U;return j&&(O=q,W=U),{width:O,height:W,$:j}}function unwrapElement(w){return isElement(w)?w:w.contextElement}function getScale(w){const T=unwrapElement(w);if(!isHTMLElement(T))return createCoords(1);const O=T.getBoundingClientRect(),{width:W,height:F,$:q}=getCssDimensions(T);let U=(q?round(O.width):O.width)/W,j=(q?round(O.height):O.height)/F;return(!U||!Number.isFinite(U))&&(U=1),(!j||!Number.isFinite(j))&&(j=1),{x:U,y:j}}const noOffsets=createCoords(0);function getVisualOffsets(w){const T=getWindow(w);return!isWebKit()||!T.visualViewport?noOffsets:{x:T.visualViewport.offsetLeft,y:T.visualViewport.offsetTop}}function shouldAddVisualOffsets(w,T,O){return T===void 0&&(T=!1),!O||T&&O!==getWindow(w)?!1:T}function getBoundingClientRect(w,T,O,W){T===void 0&&(T=!1),O===void 0&&(O=!1);const F=w.getBoundingClientRect(),q=unwrapElement(w);let U=createCoords(1);T&&(W?isElement(W)&&(U=getScale(W)):U=getScale(w));const j=shouldAddVisualOffsets(q,O,W)?getVisualOffsets(q):createCoords(0);let X=(F.left+j.x)/U.x,Y=(F.top+j.y)/U.y,J=F.width/U.x,K=F.height/U.y;if(q){const G=getWindow(q),tt=W&&isElement(W)?getWindow(W):W;let Q=G,et=getFrameElement(Q);for(;et&&W&&tt!==Q;){const ot=getScale(et),rt=et.getBoundingClientRect(),at=getComputedStyle$1(et),nt=rt.left+(et.clientLeft+parseFloat(at.paddingLeft))*ot.x,it=rt.top+(et.clientTop+parseFloat(at.paddingTop))*ot.y;X*=ot.x,Y*=ot.y,J*=ot.x,K*=ot.y,X+=nt,Y+=it,Q=getWindow(et),et=getFrameElement(Q)}}return rectToClientRect({width:J,height:K,x:X,y:Y})}function getWindowScrollBarX(w,T){const O=getNodeScroll(w).scrollLeft;return T?T.left+O:getBoundingClientRect(getDocumentElement(w)).left+O}function getHTMLOffset(w,T){const O=w.getBoundingClientRect(),W=O.left+T.scrollLeft-getWindowScrollBarX(w,O),F=O.top+T.scrollTop;return{x:W,y:F}}function convertOffsetParentRelativeRectToViewportRelativeRect(w){let{elements:T,rect:O,offsetParent:W,strategy:F}=w;const q=F==="fixed",U=getDocumentElement(W),j=T?isTopLayer(T.floating):!1;if(W===U||j&&q)return O;let X={scrollLeft:0,scrollTop:0},Y=createCoords(1);const J=createCoords(0),K=isHTMLElement(W);if((K||!K&&!q)&&((getNodeName(W)!=="body"||isOverflowElement(U))&&(X=getNodeScroll(W)),K)){const tt=getBoundingClientRect(W);Y=getScale(W),J.x=tt.x+W.clientLeft,J.y=tt.y+W.clientTop}const G=U&&!K&&!q?getHTMLOffset(U,X):createCoords(0);return{width:O.width*Y.x,height:O.height*Y.y,x:O.x*Y.x-X.scrollLeft*Y.x+J.x+G.x,y:O.y*Y.y-X.scrollTop*Y.y+J.y+G.y}}function getClientRects(w){return Array.from(w.getClientRects())}function getDocumentRect(w){const T=getDocumentElement(w),O=getNodeScroll(w),W=w.ownerDocument.body,F=max(T.scrollWidth,T.clientWidth,W.scrollWidth,W.clientWidth),q=max(T.scrollHeight,T.clientHeight,W.scrollHeight,W.clientHeight);let U=-O.scrollLeft+getWindowScrollBarX(w);const j=-O.scrollTop;return getComputedStyle$1(W).direction==="rtl"&&(U+=max(T.clientWidth,W.clientWidth)-F),{width:F,height:q,x:U,y:j}}const SCROLLBAR_MAX=25;function getViewportRect(w,T){const O=getWindow(w),W=getDocumentElement(w),F=O.visualViewport;let q=W.clientWidth,U=W.clientHeight,j=0,X=0;if(F){q=F.width,U=F.height;const J=isWebKit();(!J||J&&T==="fixed")&&(j=F.offsetLeft,X=F.offsetTop)}const Y=getWindowScrollBarX(W);if(Y<=0){const J=W.ownerDocument,K=J.body,G=getComputedStyle(K),tt=J.compatMode==="CSS1Compat"&&parseFloat(G.marginLeft)+parseFloat(G.marginRight)||0,Q=Math.abs(W.clientWidth-K.clientWidth-tt);Q<=SCROLLBAR_MAX&&(q-=Q)}else Y<=SCROLLBAR_MAX&&(q+=Y);return{width:q,height:U,x:j,y:X}}function getInnerBoundingClientRect(w,T){const O=getBoundingClientRect(w,!0,T==="fixed"),W=O.top+w.clientTop,F=O.left+w.clientLeft,q=isHTMLElement(w)?getScale(w):createCoords(1),U=w.clientWidth*q.x,j=w.clientHeight*q.y,X=F*q.x,Y=W*q.y;return{width:U,height:j,x:X,y:Y}}function getClientRectFromClippingAncestor(w,T,O){let W;if(T==="viewport")W=getViewportRect(w,O);else if(T==="document")W=getDocumentRect(getDocumentElement(w));else if(isElement(T))W=getInnerBoundingClientRect(T,O);else{const F=getVisualOffsets(w);W={x:T.x-F.x,y:T.y-F.y,width:T.width,height:T.height}}return rectToClientRect(W)}function hasFixedPositionAncestor(w,T){const O=getParentNode(w);return O===T||!isElement(O)||isLastTraversableNode(O)?!1:getComputedStyle$1(O).position==="fixed"||hasFixedPositionAncestor(O,T)}function getClippingElementAncestors(w,T){const O=T.get(w);if(O)return O;let W=getOverflowAncestors(w,[],!1).filter(j=>isElement(j)&&getNodeName(j)!=="body"),F=null;const q=getComputedStyle$1(w).position==="fixed";let U=q?getParentNode(w):w;for(;isElement(U)&&!isLastTraversableNode(U);){const j=getComputedStyle$1(U),X=isContainingBlock(U);!X&&j.position==="fixed"&&(F=null),(q?!X&&!F:!X&&j.position==="static"&&!!F&&(F.position==="absolute"||F.position==="fixed")||isOverflowElement(U)&&!X&&hasFixedPositionAncestor(w,U))?W=W.filter(J=>J!==U):F=j,U=getParentNode(U)}return T.set(w,W),W}function getClippingRect(w){let{element:T,boundary:O,rootBoundary:W,strategy:F}=w;const U=[...O==="clippingAncestors"?isTopLayer(T)?[]:getClippingElementAncestors(T,this._c):[].concat(O),W],j=getClientRectFromClippingAncestor(T,U[0],F);let X=j.top,Y=j.right,J=j.bottom,K=j.left;for(let G=1;G<U.length;G++){const tt=getClientRectFromClippingAncestor(T,U[G],F);X=max(tt.top,X),Y=min(tt.right,Y),J=min(tt.bottom,J),K=max(tt.left,K)}return{width:Y-K,height:J-X,x:K,y:X}}function getDimensions(w){const{width:T,height:O}=getCssDimensions(w);return{width:T,height:O}}function getRectRelativeToOffsetParent(w,T,O){const W=isHTMLElement(T),F=getDocumentElement(T),q=O==="fixed",U=getBoundingClientRect(w,!0,q,T);let j={scrollLeft:0,scrollTop:0};const X=createCoords(0);function Y(){X.x=getWindowScrollBarX(F)}if(W||!W&&!q)if((getNodeName(T)!=="body"||isOverflowElement(F))&&(j=getNodeScroll(T)),W){const tt=getBoundingClientRect(T,!0,q,T);X.x=tt.x+T.clientLeft,X.y=tt.y+T.clientTop}else F&&Y();q&&!W&&F&&Y();const J=F&&!W&&!q?getHTMLOffset(F,j):createCoords(0),K=U.left+j.scrollLeft-X.x-J.x,G=U.top+j.scrollTop-X.y-J.y;return{x:K,y:G,width:U.width,height:U.height}}function isStaticPositioned(w){return getComputedStyle$1(w).position==="static"}function getTrueOffsetParent(w,T){if(!isHTMLElement(w)||getComputedStyle$1(w).position==="fixed")return null;if(T)return T(w);let O=w.offsetParent;return getDocumentElement(w)===O&&(O=O.ownerDocument.body),O}function getOffsetParent(w,T){const O=getWindow(w);if(isTopLayer(w))return O;if(!isHTMLElement(w)){let F=getParentNode(w);for(;F&&!isLastTraversableNode(F);){if(isElement(F)&&!isStaticPositioned(F))return F;F=getParentNode(F)}return O}let W=getTrueOffsetParent(w,T);for(;W&&isTableElement(W)&&isStaticPositioned(W);)W=getTrueOffsetParent(W,T);return W&&isLastTraversableNode(W)&&isStaticPositioned(W)&&!isContainingBlock(W)?O:W||getContainingBlock(w)||O}const getElementRects=async function(w){const T=this.getOffsetParent||getOffsetParent,O=this.getDimensions,W=await O(w.floating);return{reference:getRectRelativeToOffsetParent(w.reference,await T(w.floating),w.strategy),floating:{x:0,y:0,width:W.width,height:W.height}}};function isRTL(w){return getComputedStyle$1(w).direction==="rtl"}const platform={convertOffsetParentRelativeRectToViewportRelativeRect,getDocumentElement,getClippingRect,getOffsetParent,getElementRects,getClientRects,getDimensions,getScale,isElement,isRTL};function rectsAreEqual(w,T){return w.x===T.x&&w.y===T.y&&w.width===T.width&&w.height===T.height}function observeMove(w,T){let O=null,W;const F=getDocumentElement(w);function q(){var j;clearTimeout(W),(j=O)==null||j.disconnect(),O=null}function U(j,X){j===void 0&&(j=!1),X===void 0&&(X=1),q();const Y=w.getBoundingClientRect(),{left:J,top:K,width:G,height:tt}=Y;if(j||T(),!G||!tt)return;const Q=floor(K),et=floor(F.clientWidth-(J+G)),ot=floor(F.clientHeight-(K+tt)),rt=floor(J),nt={rootMargin:-Q+"px "+-et+"px "+-ot+"px "+-rt+"px",threshold:max(0,min(1,X))||1};let it=!0;function dt(ut){const lt=ut[0].intersectionRatio;if(lt!==X){if(!it)return U();lt?U(!1,lt):W=setTimeout(()=>{U(!1,1e-7)},1e3)}lt===1&&!rectsAreEqual(Y,w.getBoundingClientRect())&&U(),it=!1}try{O=new IntersectionObserver(dt,{...nt,root:F.ownerDocument})}catch{O=new IntersectionObserver(dt,nt)}O.observe(w)}return U(!0),q}function autoUpdate(w,T,O,W){W===void 0&&(W={});const{ancestorScroll:F=!0,ancestorResize:q=!0,elementResize:U=typeof ResizeObserver=="function",layoutShift:j=typeof IntersectionObserver=="function",animationFrame:X=!1}=W,Y=unwrapElement(w),J=F||q?[...Y?getOverflowAncestors(Y):[],...T?getOverflowAncestors(T):[]]:[];J.forEach(rt=>{F&&rt.addEventListener("scroll",O,{passive:!0}),q&&rt.addEventListener("resize",O)});const K=Y&&j?observeMove(Y,O):null;let G=-1,tt=null;U&&(tt=new ResizeObserver(rt=>{let[at]=rt;at&&at.target===Y&&tt&&T&&(tt.unobserve(T),cancelAnimationFrame(G),G=requestAnimationFrame(()=>{var nt;(nt=tt)==null||nt.observe(T)})),O()}),Y&&!X&&tt.observe(Y),T&&tt.observe(T));let Q,et=X?getBoundingClientRect(w):null;X&&ot();function ot(){const rt=getBoundingClientRect(w);et&&!rectsAreEqual(et,rt)&&O(),et=rt,Q=requestAnimationFrame(ot)}return O(),()=>{var rt;J.forEach(at=>{F&&at.removeEventListener("scroll",O),q&&at.removeEventListener("resize",O)}),K==null||K(),(rt=tt)==null||rt.disconnect(),tt=null,X&&cancelAnimationFrame(Q)}}const offset=offset$1,shift=shift$1,flip=flip$1,size=size$1,arrow=arrow$1,computePosition=(w,T,O)=>{const W=new Map,F={platform,...O},q={...F.platform,_c:W};return computePosition$1(w,T,{...F,platform:q})};function e(w){return i(w)}function r(w){return w.assignedSlot?w.assignedSlot:w.parentNode instanceof ShadowRoot?w.parentNode.host:w.parentNode}function i(w){for(let T=w;T;T=r(T))if(T instanceof Element&&getComputedStyle(T).display==="none")return null;for(let T=r(w);T;T=r(T)){if(!(T instanceof Element))continue;const O=getComputedStyle(T);if(O.display!=="contents"&&(O.position!=="static"||isContainingBlock(O)||T.tagName==="BODY"))return T}return null}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function isVirtualElement(w){return w!==null&&typeof w=="object"&&"getBoundingClientRect"in w&&("contextElement"in w?w instanceof Element:!0)}var Pt,SUPPORTS_POPOVER=(Pt=globalThis==null?void 0:globalThis.HTMLElement)==null?void 0:Pt.prototype.hasOwnProperty("popover"),WaPopup=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){const w=this.anchorEl.getBoundingClientRect(),T=this.popup.getBoundingClientRect(),O=this.placement.includes("top")||this.placement.includes("bottom");let W=0,F=0,q=0,U=0,j=0,X=0,Y=0,J=0;O?w.top<T.top?(W=w.left,F=w.bottom,q=w.right,U=w.bottom,j=T.left,X=T.top,Y=T.right,J=T.top):(W=T.left,F=T.bottom,q=T.right,U=T.bottom,j=w.left,X=w.top,Y=w.right,J=w.top):w.left<T.left?(W=w.right,F=w.top,q=T.left,U=T.top,j=w.right,X=w.bottom,Y=T.left,J=T.bottom):(W=T.right,F=T.top,q=w.left,U=w.top,j=T.right,X=T.bottom,Y=w.left,J=w.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${W}px`),this.style.setProperty("--hover-bridge-top-left-y",`${F}px`),this.style.setProperty("--hover-bridge-top-right-x",`${q}px`),this.style.setProperty("--hover-bridge-top-right-y",`${U}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${j}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${X}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${Y}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${J}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(w){super.updated(w),w.has("active")&&(this.active?this.start():this.stop()),w.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const w=this.getRootNode();this.anchorEl=w.getElementById(this.anchor)}else this.anchor instanceof Element||isVirtualElement(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){var w,T;!this.anchorEl||!this.active||!this.isConnected||((T=(w=this.popup)==null?void 0:w.showPopover)==null||T.call(w),this.cleanup=autoUpdate(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(w=>{var T,O;(O=(T=this.popup)==null?void 0:T.hidePopover)==null||O.call(T),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>w())):w()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;const w=[offset({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?w.push(size({apply:({rects:W})=>{const F=this.sync==="width"||this.sync==="both",q=this.sync==="height"||this.sync==="both";this.popup.style.width=F?`${W.reference.width}px`:"",this.popup.style.height=q?`${W.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let T;SUPPORTS_POPOVER&&!isVirtualElement(this.anchor)&&this.boundary==="scroll"&&(T=getOverflowAncestors(this.anchorEl).filter(W=>W instanceof Element)),this.flip&&w.push(flip({boundary:this.flipBoundary||T,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&w.push(shift({boundary:this.shiftBoundary||T,padding:this.shiftPadding})),this.autoSize?w.push(size({boundary:this.autoSizeBoundary||T,padding:this.autoSizePadding,apply:({availableWidth:W,availableHeight:F})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${F}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${W}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&w.push(arrow({element:this.arrowEl,padding:this.arrowPadding}));const O=SUPPORTS_POPOVER?W=>platform.getOffsetParent(W,e):platform.getOffsetParent;computePosition(this.anchorEl,this.popup,{placement:this.placement,middleware:w,strategy:SUPPORTS_POPOVER?"absolute":"fixed",platform:{...platform,getOffsetParent:O}}).then(({x:W,y:F,middlewareData:q,placement:U})=>{const j=this.localize.dir()==="rtl",X={top:"bottom",right:"left",bottom:"top",left:"right"}[U.split("-")[0]];if(this.setAttribute("data-current-placement",U),Object.assign(this.popup.style,{left:`${W}px`,top:`${F}px`}),this.arrow){const Y=q.arrow.x,J=q.arrow.y;let K="",G="",tt="",Q="";if(this.arrowPlacement==="start"){const et=typeof Y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";K=typeof J=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",G=j?et:"",Q=j?"":et}else if(this.arrowPlacement==="end"){const et=typeof Y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";G=j?"":et,Q=j?et:"",tt=typeof J=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(Q=typeof Y=="number"?"calc(50% - var(--arrow-size-diagonal))":"",K=typeof J=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(Q=typeof Y=="number"?`${Y}px`:"",K=typeof J=="number"?`${J}px`:"");Object.assign(this.arrowEl.style,{top:K,right:G,bottom:tt,left:Q,[X]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new WaRepositionEvent)}render(){return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e$1({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${e$1({popup:!0,"popup-active":this.active,"popup-fixed":!SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?b`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};WaPopup.css=popup_styles_default;__decorateClass([e$3(".popup")],WaPopup.prototype,"popup",2);__decorateClass([e$3(".arrow")],WaPopup.prototype,"arrowEl",2);__decorateClass([n$1()],WaPopup.prototype,"anchor",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaPopup.prototype,"active",2);__decorateClass([n$1({reflect:!0})],WaPopup.prototype,"placement",2);__decorateClass([n$1()],WaPopup.prototype,"boundary",2);__decorateClass([n$1({type:Number})],WaPopup.prototype,"distance",2);__decorateClass([n$1({type:Number})],WaPopup.prototype,"skidding",2);__decorateClass([n$1({type:Boolean})],WaPopup.prototype,"arrow",2);__decorateClass([n$1({attribute:"arrow-placement"})],WaPopup.prototype,"arrowPlacement",2);__decorateClass([n$1({attribute:"arrow-padding",type:Number})],WaPopup.prototype,"arrowPadding",2);__decorateClass([n$1({type:Boolean})],WaPopup.prototype,"flip",2);__decorateClass([n$1({attribute:"flip-fallback-placements",converter:{fromAttribute:w=>w.split(" ").map(T=>T.trim()).filter(T=>T!==""),toAttribute:w=>w.join(" ")}})],WaPopup.prototype,"flipFallbackPlacements",2);__decorateClass([n$1({attribute:"flip-fallback-strategy"})],WaPopup.prototype,"flipFallbackStrategy",2);__decorateClass([n$1({type:Object})],WaPopup.prototype,"flipBoundary",2);__decorateClass([n$1({attribute:"flip-padding",type:Number})],WaPopup.prototype,"flipPadding",2);__decorateClass([n$1({type:Boolean})],WaPopup.prototype,"shift",2);__decorateClass([n$1({type:Object})],WaPopup.prototype,"shiftBoundary",2);__decorateClass([n$1({attribute:"shift-padding",type:Number})],WaPopup.prototype,"shiftPadding",2);__decorateClass([n$1({attribute:"auto-size"})],WaPopup.prototype,"autoSize",2);__decorateClass([n$1()],WaPopup.prototype,"sync",2);__decorateClass([n$1({type:Object})],WaPopup.prototype,"autoSizeBoundary",2);__decorateClass([n$1({attribute:"auto-size-padding",type:Number})],WaPopup.prototype,"autoSizePadding",2);__decorateClass([n$1({attribute:"hover-bridge",type:Boolean})],WaPopup.prototype,"hoverBridge",2);WaPopup=__decorateClass([t$1("wa-popup")],WaPopup);const urlAlphabet="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let nanoid=(w=21)=>{let T="",O=crypto.getRandomValues(new Uint8Array(w|=0));for(;w--;)T+=urlAlphabet[O[w]&63];return T};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function uniqueId(w=""){return`${w}${nanoid()}`}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function waitForEvent(w,T){return new Promise(O=>{function W(F){F.target===w&&(w.removeEventListener(T,W),O())}w.addEventListener(T,W)})}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaTooltip=class extends WebAwesomeElement{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=w=>{w.key==="Escape"&&this.open&&isTopDismissible(this)&&(w.preventDefault(),w.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{var w;if(this.hasTrigger("hover")){const T=!!((w=this.anchor)!=null&&w.matches(":hover")),O=this.matches(":hover");if(T||O)return;clearTimeout(this.hoverTimeout),T||O||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=uniqueId("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(w){return this.trigger.split(" ").includes(w)}addToAriaLabelledBy(w,T){const W=(w.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);W.includes(T)||(W.push(T),w.setAttribute("aria-labelledby",W.join(" ")))}removeFromAriaLabelledBy(w,T){const F=(w.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(q=>q!==T);F.length>0?w.setAttribute("aria-labelledby",F.join(" ")):w.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;const w=new WaShowEvent;if(this.dispatchEvent(w),w.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),registerDismissible(this),this.body.hidden=!1,this.popup.active=!0,await animateWithClass(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new WaAfterShowEvent)}else{const w=new WaHideEvent;if(this.dispatchEvent(w),w.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this),await animateWithClass(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new WaAfterHideEvent)}}handleForChange(){const w=this.getRootNode();if(!w)return;const T=this.for?w.getElementById(this.for):null,O=this.anchor;if(T===O)return;const{signal:W}=this.eventController;T&&(this.addToAriaLabelledBy(T,this.id),T.addEventListener("blur",this.handleBlur,{capture:!0,signal:W}),T.addEventListener("focus",this.handleFocus,{capture:!0,signal:W}),T.addEventListener("click",this.handleClick,{signal:W}),T.addEventListener("mouseover",this.handleMouseOver,{signal:W}),T.addEventListener("mouseout",this.handleMouseOut,{signal:W})),O&&(this.removeFromAriaLabelledBy(O,this.id),O.removeEventListener("blur",this.handleBlur,{capture:!0}),O.removeEventListener("focus",this.handleFocus,{capture:!0}),O.removeEventListener("click",this.handleClick),O.removeEventListener("mouseover",this.handleMouseOver),O.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=T}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,waitForEvent(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,waitForEvent(this,"wa-after-hide")}render(){return b`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${e$1({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};WaTooltip.css=tooltip_styles_default;WaTooltip.dependencies={"wa-popup":WaPopup};__decorateClass([e$3("slot:not([name])")],WaTooltip.prototype,"defaultSlot",2);__decorateClass([e$3(".body")],WaTooltip.prototype,"body",2);__decorateClass([e$3("wa-popup")],WaTooltip.prototype,"popup",2);__decorateClass([n$1()],WaTooltip.prototype,"placement",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTooltip.prototype,"disabled",2);__decorateClass([n$1({type:Number})],WaTooltip.prototype,"distance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTooltip.prototype,"open",2);__decorateClass([n$1({type:Number})],WaTooltip.prototype,"skidding",2);__decorateClass([n$1({attribute:"show-delay",type:Number})],WaTooltip.prototype,"showDelay",2);__decorateClass([n$1({attribute:"hide-delay",type:Number})],WaTooltip.prototype,"hideDelay",2);__decorateClass([n$1()],WaTooltip.prototype,"trigger",2);__decorateClass([n$1({attribute:"without-arrow",type:Boolean,reflect:!0})],WaTooltip.prototype,"withoutArrow",2);__decorateClass([n$1()],WaTooltip.prototype,"for",2);__decorateClass([r$2()],WaTooltip.prototype,"anchor",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaTooltip.prototype,"handleOpenChange",1);__decorateClass([watch("for")],WaTooltip.prototype,"handleForChange",1);__decorateClass([watch(["distance","placement","skidding"])],WaTooltip.prototype,"handleOptionsChange",1);__decorateClass([watch("disabled")],WaTooltip.prototype,"handleDisabledChange",1);WaTooltip=__decorateClass([t$1("wa-tooltip")],WaTooltip);(function(){const htmx={onLoad:null,process:null,on:null,off:null,trigger:null,ajax:null,find:null,findAll:null,closest:null,values:function(w,T){return getInputValues(w,T||"post").values},remove:null,addClass:null,removeClass:null,toggleClass:null,takeClass:null,swap:null,defineExtension:null,removeExtension:null,logAll:null,logNone:null,logger:null,config:{historyEnabled:!0,historyCacheSize:10,refreshOnHistoryMiss:!1,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:!0,indicatorClass:"htmx-indicator",requestClass:"htmx-request",addedClass:"htmx-added",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:!0,allowScriptTags:!0,inlineScriptNonce:"",inlineStyleNonce:"",attributesToSettle:["class","style","width","height"],withCredentials:!1,timeout:0,wsReconnectDelay:"full-jitter",wsBinaryType:"blob",disableSelector:"[hx-disable], [data-hx-disable]",scrollBehavior:"instant",defaultFocusScroll:!1,getCacheBusterParam:!1,globalViewTransitions:!1,methodsThatUseUrlParams:["get","delete"],selfRequestsOnly:!0,ignoreTitle:!1,scrollIntoViewOnBoost:!0,triggerSpecsCache:null,disableInheritance:!1,responseHandling:[{code:"204",swap:!1},{code:"[23]..",swap:!0},{code:"[45]..",swap:!1,error:!0}],allowNestedOobSwaps:!0,historyRestoreAsHxRequest:!0,reportValidityOfForms:!1},parseInterval:null,location,_:null,version:"2.0.8"};htmx.onLoad=onLoadHelper,htmx.process=processNode,htmx.on=addEventListenerImpl,htmx.off=removeEventListenerImpl,htmx.trigger=triggerEvent,htmx.ajax=ajaxHelper,htmx.find=find,htmx.findAll=findAll,htmx.closest=closest,htmx.remove=removeElement,htmx.addClass=addClassToElement,htmx.removeClass=removeClassFromElement,htmx.toggleClass=toggleClassOnElement,htmx.takeClass=takeClassForElement,htmx.swap=swap,htmx.defineExtension=defineExtension,htmx.removeExtension=removeExtension,htmx.logAll=logAll,htmx.logNone=logNone,htmx.parseInterval=parseInterval,htmx._=internalEval;const internalAPI={addTriggerHandler,bodyContains,canAccessLocalStorage,findThisElement,filterValues,swap,hasAttribute,getAttributeValue,getClosestAttributeValue,getClosestMatch,getExpressionVars,getHeaders,getInputValues,getInternalData,getSwapSpecification,getTriggerSpecs,getTarget,makeFragment,mergeObjects,makeSettleInfo,oobSwap,querySelectorExt,settleImmediately,shouldCancel,triggerEvent,triggerErrorEvent,withExtensions},VERBS=["get","post","put","delete","patch"],VERB_SELECTOR=VERBS.map(function(w){return"[hx-"+w+"], [data-hx-"+w+"]"}).join(", ");function parseInterval(w){if(w==null)return;let T=NaN;return w.slice(-2)=="ms"?T=parseFloat(w.slice(0,-2)):w.slice(-1)=="s"?T=parseFloat(w.slice(0,-1))*1e3:w.slice(-1)=="m"?T=parseFloat(w.slice(0,-1))*1e3*60:T=parseFloat(w),isNaN(T)?void 0:T}function getRawAttribute(w,T){return w instanceof Element&&w.getAttribute(T)}function hasAttribute(w,T){return!!w.hasAttribute&&(w.hasAttribute(T)||w.hasAttribute("data-"+T))}function getAttributeValue(w,T){return getRawAttribute(w,T)||getRawAttribute(w,"data-"+T)}function parentElt(w){const T=w.parentElement;return!T&&w.parentNode instanceof ShadowRoot?w.parentNode:T}function getDocument(){return document}function getRootNode(w,T){return w.getRootNode?w.getRootNode({composed:T}):getDocument()}function getClosestMatch(w,T){for(;w&&!T(w);)w=parentElt(w);return w||null}function getAttributeValueWithDisinheritance(w,T,O){const W=getAttributeValue(T,O),F=getAttributeValue(T,"hx-disinherit");var q=getAttributeValue(T,"hx-inherit");if(w!==T){if(htmx.config.disableInheritance)return q&&(q==="*"||q.split(" ").indexOf(O)>=0)?W:null;if(F&&(F==="*"||F.split(" ").indexOf(O)>=0))return"unset"}return W}function getClosestAttributeValue(w,T){let O=null;if(getClosestMatch(w,function(W){return!!(O=getAttributeValueWithDisinheritance(w,asElement(W),T))}),O!=="unset")return O}function matches(w,T){return w instanceof Element&&w.matches(T)}function getStartTag(w){const O=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i.exec(w);return O?O[1].toLowerCase():""}function parseHTML(w){return"parseHTMLUnsafe"in Document?Document.parseHTMLUnsafe(w):new DOMParser().parseFromString(w,"text/html")}function takeChildrenFor(w,T){for(;T.childNodes.length>0;)w.append(T.childNodes[0])}function duplicateScript(w){const T=getDocument().createElement("script");return forEach(w.attributes,function(O){T.setAttribute(O.name,O.value)}),T.textContent=w.textContent,T.async=!1,htmx.config.inlineScriptNonce&&(T.nonce=htmx.config.inlineScriptNonce),T}function isJavaScriptScriptNode(w){return w.matches("script")&&(w.type==="text/javascript"||w.type==="module"||w.type==="")}function normalizeScriptTags(w){Array.from(w.querySelectorAll("script")).forEach(T=>{if(isJavaScriptScriptNode(T)){const O=duplicateScript(T),W=T.parentNode;try{W.insertBefore(O,T)}catch(F){logError(F)}finally{T.remove()}}})}function makeFragment(w){const T=w.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i,""),O=getStartTag(T);let W;if(O==="html"){W=new DocumentFragment;const q=parseHTML(w);takeChildrenFor(W,q.body),W.title=q.title}else if(O==="body"){W=new DocumentFragment;const q=parseHTML(T);takeChildrenFor(W,q.body),W.title=q.title}else{const q=parseHTML('<body><template class="internal-htmx-wrapper">'+T+"</template></body>");W=q.querySelector("template").content,W.title=q.title;var F=W.querySelector("title");F&&F.parentNode===W&&(F.remove(),W.title=F.innerText)}return W&&(htmx.config.allowScriptTags?normalizeScriptTags(W):W.querySelectorAll("script").forEach(q=>q.remove())),W}function maybeCall(w){w&&w()}function isType(w,T){return Object.prototype.toString.call(w)==="[object "+T+"]"}function isFunction(w){return typeof w=="function"}function isRawObject(w){return isType(w,"Object")}function getInternalData(w){const T="htmx-internal-data";let O=w[T];return O||(O=w[T]={}),O}function toArray(w){const T=[];if(w)for(let O=0;O<w.length;O++)T.push(w[O]);return T}function forEach(w,T){if(w)for(let O=0;O<w.length;O++)T(w[O])}function isScrolledIntoView(w){const T=w.getBoundingClientRect(),O=T.top,W=T.bottom;return O<window.innerHeight&&W>=0}function bodyContains(w){return w.getRootNode({composed:!0})===document}function splitOnWhitespace(w){return w.trim().split(/\s+/)}function mergeObjects(w,T){for(const O in T)T.hasOwnProperty(O)&&(w[O]=T[O]);return w}function parseJSON(w){try{return JSON.parse(w)}catch(T){return logError(T),null}}function canAccessLocalStorage(){const w="htmx:sessionStorageTest";try{return sessionStorage.setItem(w,w),sessionStorage.removeItem(w),!0}catch{return!1}}function normalizePath(w){const T=new URL(w,"http://x");return T&&(w=T.pathname+T.search),w!="/"&&(w=w.replace(/\/+$/,"")),w}function internalEval(str){return maybeEval(getDocument().body,function(){return eval(str)})}function onLoadHelper(w){return htmx.on("htmx:load",function(O){w(O.detail.elt)})}function logAll(){htmx.logger=function(w,T,O){console&&console.log(T,w,O)}}function logNone(){htmx.logger=null}function find(w,T){return typeof w!="string"?w.querySelector(T):find(getDocument(),w)}function findAll(w,T){return typeof w!="string"?w.querySelectorAll(T):findAll(getDocument(),w)}function getWindow(){return window}function removeElement(w,T){w=resolveTarget(w),T?getWindow().setTimeout(function(){removeElement(w),w=null},T):parentElt(w).removeChild(w)}function asElement(w){return w instanceof Element?w:null}function asHtmlElement(w){return w instanceof HTMLElement?w:null}function asString(w){return typeof w=="string"?w:null}function asParentNode(w){return w instanceof Element||w instanceof Document||w instanceof DocumentFragment?w:null}function addClassToElement(w,T,O){w=asElement(resolveTarget(w)),w&&(O?getWindow().setTimeout(function(){addClassToElement(w,T),w=null},O):w.classList&&w.classList.add(T))}function removeClassFromElement(w,T,O){let W=asElement(resolveTarget(w));W&&(O?getWindow().setTimeout(function(){removeClassFromElement(W,T),W=null},O):W.classList&&(W.classList.remove(T),W.classList.length===0&&W.removeAttribute("class")))}function toggleClassOnElement(w,T){w=resolveTarget(w),w.classList.toggle(T)}function takeClassForElement(w,T){w=resolveTarget(w),forEach(w.parentElement.children,function(O){removeClassFromElement(O,T)}),addClassToElement(asElement(w),T)}function closest(w,T){return w=asElement(resolveTarget(w)),w?w.closest(T):null}function startsWith(w,T){return w.substring(0,T.length)===T}function endsWith(w,T){return w.substring(w.length-T.length)===T}function normalizeSelector(w){const T=w.trim();return startsWith(T,"<")&&endsWith(T,"/>")?T.substring(1,T.length-2):T}function querySelectorAllExt(w,T,O){if(T.indexOf("global ")===0)return querySelectorAllExt(w,T.slice(7),!0);w=resolveTarget(w);const W=[];{let U=0,j=0;for(let X=0;X<T.length;X++){const Y=T[X];if(Y===","&&U===0){W.push(T.substring(j,X)),j=X+1;continue}Y==="<"?U++:Y==="/"&&X<T.length-1&&T[X+1]===">"&&U--}j<T.length&&W.push(T.substring(j))}const F=[],q=[];for(;W.length>0;){const U=normalizeSelector(W.shift());let j;U.indexOf("closest ")===0?j=closest(asElement(w),normalizeSelector(U.slice(8))):U.indexOf("find ")===0?j=find(asParentNode(w),normalizeSelector(U.slice(5))):U==="next"||U==="nextElementSibling"?j=asElement(w).nextElementSibling:U.indexOf("next ")===0?j=scanForwardQuery(w,normalizeSelector(U.slice(5)),!!O):U==="previous"||U==="previousElementSibling"?j=asElement(w).previousElementSibling:U.indexOf("previous ")===0?j=scanBackwardsQuery(w,normalizeSelector(U.slice(9)),!!O):U==="document"?j=document:U==="window"?j=window:U==="body"?j=document.body:U==="root"?j=getRootNode(w,!!O):U==="host"?j=w.getRootNode().host:q.push(U),j&&F.push(j)}if(q.length>0){const U=q.join(","),j=asParentNode(getRootNode(w,!!O));F.push(...toArray(j.querySelectorAll(U)))}return F}var scanForwardQuery=function(w,T,O){const W=asParentNode(getRootNode(w,O)).querySelectorAll(T);for(let F=0;F<W.length;F++){const q=W[F];if(q.compareDocumentPosition(w)===Node.DOCUMENT_POSITION_PRECEDING)return q}},scanBackwardsQuery=function(w,T,O){const W=asParentNode(getRootNode(w,O)).querySelectorAll(T);for(let F=W.length-1;F>=0;F--){const q=W[F];if(q.compareDocumentPosition(w)===Node.DOCUMENT_POSITION_FOLLOWING)return q}};function querySelectorExt(w,T){return typeof w!="string"?querySelectorAllExt(w,T)[0]:querySelectorAllExt(getDocument().body,w)[0]}function resolveTarget(w,T){return typeof w=="string"?find(asParentNode(T)||document,w):w}function processEventArgs(w,T,O,W){return isFunction(T)?{target:getDocument().body,event:asString(w),listener:T,options:O}:{target:resolveTarget(w),event:asString(T),listener:O,options:W}}function addEventListenerImpl(w,T,O,W){return ready(function(){const q=processEventArgs(w,T,O,W);q.target.addEventListener(q.event,q.listener,q.options)}),isFunction(T)?T:O}function removeEventListenerImpl(w,T,O){return ready(function(){const W=processEventArgs(w,T,O);W.target.removeEventListener(W.event,W.listener)}),isFunction(T)?T:O}const DUMMY_ELT=getDocument().createElement("output");function findAttributeTargets(w,T){const O=getClosestAttributeValue(w,T);if(O){if(O==="this")return[findThisElement(w,T)];{const W=querySelectorAllExt(w,O);if(/(^|,)(\s*)inherit(\s*)($|,)/.test(O)){const q=asElement(getClosestMatch(w,function(U){return U!==w&&hasAttribute(asElement(U),T)}));q&&W.push(...findAttributeTargets(q,T))}return W.length===0?(logError('The selector "'+O+'" on '+T+" returned no matches!"),[DUMMY_ELT]):W}}}function findThisElement(w,T){return asElement(getClosestMatch(w,function(O){return getAttributeValue(asElement(O),T)!=null}))}function getTarget(w){const T=getClosestAttributeValue(w,"hx-target");return T?T==="this"?findThisElement(w,"hx-target"):querySelectorExt(w,T):getInternalData(w).boosted?getDocument().body:w}function shouldSettleAttribute(w){return htmx.config.attributesToSettle.includes(w)}function cloneAttributes(w,T){forEach(Array.from(w.attributes),function(O){!T.hasAttribute(O.name)&&shouldSettleAttribute(O.name)&&w.removeAttribute(O.name)}),forEach(T.attributes,function(O){shouldSettleAttribute(O.name)&&w.setAttribute(O.name,O.value)})}function isInlineSwap(w,T){const O=getExtensions(T);for(let W=0;W<O.length;W++){const F=O[W];try{if(F.isInlineSwap(w))return!0}catch(q){logError(q)}}return w==="outerHTML"}function oobSwap(w,T,O,W){W=W||getDocument();let F="#"+CSS.escape(getRawAttribute(T,"id")),q="outerHTML";w==="true"||(w.indexOf(":")>0?(q=w.substring(0,w.indexOf(":")),F=w.substring(w.indexOf(":")+1)):q=w),T.removeAttribute("hx-swap-oob"),T.removeAttribute("data-hx-swap-oob");const U=querySelectorAllExt(W,F,!1);return U.length?(forEach(U,function(j){let X;const Y=T.cloneNode(!0);X=getDocument().createDocumentFragment(),X.appendChild(Y),isInlineSwap(q,j)||(X=asParentNode(Y));const J={shouldSwap:!0,target:j,fragment:X};triggerEvent(j,"htmx:oobBeforeSwap",J)&&(j=J.target,J.shouldSwap&&(handlePreservedElements(X),swapWithStyle(q,j,j,X,O),restorePreservedElements()),forEach(O.elts,function(K){triggerEvent(K,"htmx:oobAfterSwap",J)}))}),T.parentNode.removeChild(T)):(T.parentNode.removeChild(T),triggerErrorEvent(getDocument().body,"htmx:oobErrorNoTarget",{content:T})),w}function restorePreservedElements(){const w=find("#--htmx-preserve-pantry--");if(w){for(const T of[...w.children]){const O=find("#"+T.id);O.parentNode.moveBefore(T,O),O.remove()}w.remove()}}function handlePreservedElements(w){forEach(findAll(w,"[hx-preserve], [data-hx-preserve]"),function(T){const O=getAttributeValue(T,"id"),W=getDocument().getElementById(O);if(W!=null)if(T.moveBefore){let F=find("#--htmx-preserve-pantry--");F==null&&(getDocument().body.insertAdjacentHTML("afterend","<div id='--htmx-preserve-pantry--'></div>"),F=find("#--htmx-preserve-pantry--")),F.moveBefore(W,null)}else T.parentNode.replaceChild(W,T)})}function handleAttributes(w,T,O){forEach(T.querySelectorAll("[id]"),function(W){const F=getRawAttribute(W,"id");if(F&&F.length>0){const q=F.replace("'","\\'"),U=W.tagName.replace(":","\\:"),j=asParentNode(w),X=j&&j.querySelector(U+"[id='"+q+"']");if(X&&X!==j){const Y=W.cloneNode();cloneAttributes(W,X),O.tasks.push(function(){cloneAttributes(W,Y)})}}})}function makeAjaxLoadTask(w){return function(){removeClassFromElement(w,htmx.config.addedClass),processNode(asElement(w)),processFocus(asParentNode(w)),triggerEvent(w,"htmx:load")}}function processFocus(w){const T="[autofocus]",O=asHtmlElement(matches(w,T)?w:w.querySelector(T));O!=null&&O.focus()}function insertNodesBefore(w,T,O,W){for(handleAttributes(w,O,W);O.childNodes.length>0;){const F=O.firstChild;addClassToElement(asElement(F),htmx.config.addedClass),w.insertBefore(F,T),F.nodeType!==Node.TEXT_NODE&&F.nodeType!==Node.COMMENT_NODE&&W.tasks.push(makeAjaxLoadTask(F))}}function stringHash(w,T){let O=0;for(;O<w.length;)T=(T<<5)-T+w.charCodeAt(O++)|0;return T}function attributeHash(w){let T=0;for(let O=0;O<w.attributes.length;O++){const W=w.attributes[O];W.value&&(T=stringHash(W.name,T),T=stringHash(W.value,T))}return T}function deInitOnHandlers(w){const T=getInternalData(w);if(T.onHandlers){for(let O=0;O<T.onHandlers.length;O++){const W=T.onHandlers[O];removeEventListenerImpl(w,W.event,W.listener)}delete T.onHandlers}}function deInitNode(w){const T=getInternalData(w);T.timeout&&clearTimeout(T.timeout),T.listenerInfos&&forEach(T.listenerInfos,function(O){O.on&&removeEventListenerImpl(O.on,O.trigger,O.listener)}),deInitOnHandlers(w),forEach(Object.keys(T),function(O){O!=="firstInitCompleted"&&delete T[O]})}function cleanUpElement(w){triggerEvent(w,"htmx:beforeCleanupElement"),deInitNode(w),forEach(w.children,function(T){cleanUpElement(T)})}function swapOuterHTML(w,T,O){if(w.tagName==="BODY")return swapInnerHTML(w,T,O);let W;const F=w.previousSibling,q=parentElt(w);if(q){for(insertNodesBefore(q,w,T,O),F==null?W=q.firstChild:W=F.nextSibling,O.elts=O.elts.filter(function(U){return U!==w});W&&W!==w;)W instanceof Element&&O.elts.push(W),W=W.nextSibling;cleanUpElement(w),w.remove()}}function swapAfterBegin(w,T,O){return insertNodesBefore(w,w.firstChild,T,O)}function swapBeforeBegin(w,T,O){return insertNodesBefore(parentElt(w),w,T,O)}function swapBeforeEnd(w,T,O){return insertNodesBefore(w,null,T,O)}function swapAfterEnd(w,T,O){return insertNodesBefore(parentElt(w),w.nextSibling,T,O)}function swapDelete(w){cleanUpElement(w);const T=parentElt(w);if(T)return T.removeChild(w)}function swapInnerHTML(w,T,O){const W=w.firstChild;if(insertNodesBefore(w,W,T,O),W){for(;W.nextSibling;)cleanUpElement(W.nextSibling),w.removeChild(W.nextSibling);cleanUpElement(W),w.removeChild(W)}}function swapWithStyle(w,T,O,W,F){switch(w){case"none":return;case"outerHTML":swapOuterHTML(O,W,F);return;case"afterbegin":swapAfterBegin(O,W,F);return;case"beforebegin":swapBeforeBegin(O,W,F);return;case"beforeend":swapBeforeEnd(O,W,F);return;case"afterend":swapAfterEnd(O,W,F);return;case"delete":swapDelete(O);return;default:var q=getExtensions(T);for(let U=0;U<q.length;U++){const j=q[U];try{const X=j.handleSwap(w,O,W,F);if(X){if(Array.isArray(X))for(let Y=0;Y<X.length;Y++){const J=X[Y];J.nodeType!==Node.TEXT_NODE&&J.nodeType!==Node.COMMENT_NODE&&F.tasks.push(makeAjaxLoadTask(J))}return}}catch(X){logError(X)}}w==="innerHTML"?swapInnerHTML(O,W,F):swapWithStyle(htmx.config.defaultSwapStyle,T,O,W,F)}}function findAndSwapOobElements(w,T,O){var W=findAll(w,"[hx-swap-oob], [data-hx-swap-oob]");return forEach(W,function(F){if(htmx.config.allowNestedOobSwaps||F.parentElement===null){const q=getAttributeValue(F,"hx-swap-oob");q!=null&&oobSwap(q,F,T,O)}else F.removeAttribute("hx-swap-oob"),F.removeAttribute("data-hx-swap-oob")}),W.length>0}function swap(w,T,O,W){W||(W={});let F=null,q=null,U=function(){maybeCall(W.beforeSwapCallback),w=resolveTarget(w);const Y=W.contextElement?getRootNode(W.contextElement,!1):getDocument(),J=document.activeElement;let K={};K={elt:J,start:J?J.selectionStart:null,end:J?J.selectionEnd:null};const G=makeSettleInfo(w);if(O.swapStyle==="textContent")w.textContent=T;else{let Q=makeFragment(T);if(G.title=W.title||Q.title,W.historyRequest&&(Q=Q.querySelector("[hx-history-elt],[data-hx-history-elt]")||Q),W.selectOOB){const et=W.selectOOB.split(",");for(let ot=0;ot<et.length;ot++){const rt=et[ot].split(":",2);let at=rt[0].trim();at.indexOf("#")===0&&(at=at.substring(1));const nt=rt[1]||"true",it=Q.querySelector("#"+at);it&&oobSwap(nt,it,G,Y)}}if(findAndSwapOobElements(Q,G,Y),forEach(findAll(Q,"template"),function(et){et.content&&findAndSwapOobElements(et.content,G,Y)&&et.remove()}),W.select){const et=getDocument().createDocumentFragment();forEach(Q.querySelectorAll(W.select),function(ot){et.appendChild(ot)}),Q=et}handlePreservedElements(Q),swapWithStyle(O.swapStyle,W.contextElement,w,Q,G),restorePreservedElements()}if(K.elt&&!bodyContains(K.elt)&&getRawAttribute(K.elt,"id")){const Q=document.getElementById(getRawAttribute(K.elt,"id")),et={preventScroll:O.focusScroll!==void 0?!O.focusScroll:!htmx.config.defaultFocusScroll};if(Q){if(K.start&&Q.setSelectionRange)try{Q.setSelectionRange(K.start,K.end)}catch{}Q.focus(et)}}w.classList.remove(htmx.config.swappingClass),forEach(G.elts,function(Q){Q.classList&&Q.classList.add(htmx.config.settlingClass),triggerEvent(Q,"htmx:afterSwap",W.eventInfo)}),maybeCall(W.afterSwapCallback),O.ignoreTitle||handleTitle(G.title);const tt=function(){if(forEach(G.tasks,function(Q){Q.call()}),forEach(G.elts,function(Q){Q.classList&&Q.classList.remove(htmx.config.settlingClass),triggerEvent(Q,"htmx:afterSettle",W.eventInfo)}),W.anchor){const Q=asElement(resolveTarget("#"+W.anchor));Q&&Q.scrollIntoView({block:"start",behavior:"auto"})}updateScrollState(G.elts,O),maybeCall(W.afterSettleCallback),maybeCall(F)};O.settleDelay>0?getWindow().setTimeout(tt,O.settleDelay):tt()},j=htmx.config.globalViewTransitions;O.hasOwnProperty("transition")&&(j=O.transition);const X=W.contextElement||getDocument();if(j&&triggerEvent(X,"htmx:beforeTransition",W.eventInfo)&&typeof Promise<"u"&&document.startViewTransition){const Y=new Promise(function(K,G){F=K,q=G}),J=U;U=function(){document.startViewTransition(function(){return J(),Y})}}try{O!=null&&O.swapDelay&&O.swapDelay>0?getWindow().setTimeout(U,O.swapDelay):U()}catch(Y){throw triggerErrorEvent(X,"htmx:swapError",W.eventInfo),maybeCall(q),Y}}function handleTriggerHeader(w,T,O){const W=w.getResponseHeader(T);if(W.indexOf("{")===0){const F=parseJSON(W);for(const q in F)if(F.hasOwnProperty(q)){let U=F[q];isRawObject(U)?O=U.target!==void 0?U.target:O:U={value:U},triggerEvent(O,q,U)}}else{const F=W.split(",");for(let q=0;q<F.length;q++)triggerEvent(O,F[q].trim(),[])}}const WHITESPACE_OR_COMMA=/[\s,]/,SYMBOL_START=/[_$a-zA-Z]/,SYMBOL_CONT=/[_$a-zA-Z0-9]/,STRINGISH_START=['"',"'","/"],NOT_WHITESPACE=/[^\s]/,COMBINED_SELECTOR_START=/[{(]/,COMBINED_SELECTOR_END=/[})]/;function tokenizeString(w){const T=[];let O=0;for(;O<w.length;){if(SYMBOL_START.exec(w.charAt(O))){for(var W=O;SYMBOL_CONT.exec(w.charAt(O+1));)O++;T.push(w.substring(W,O+1))}else if(STRINGISH_START.indexOf(w.charAt(O))!==-1){const F=w.charAt(O);var W=O;for(O++;O<w.length&&w.charAt(O)!==F;)w.charAt(O)==="\\"&&O++,O++;T.push(w.substring(W,O+1))}else{const F=w.charAt(O);T.push(F)}O++}return T}function isPossibleRelativeReference(w,T,O){return SYMBOL_START.exec(w.charAt(0))&&w!=="true"&&w!=="false"&&w!=="this"&&w!==O&&T!=="."}function maybeGenerateConditional(w,T,O){if(T[0]==="["){T.shift();let W=1,F=" return (function("+O+"){ return (",q=null;for(;T.length>0;){const U=T[0];if(U==="]"){if(W--,W===0){q===null&&(F=F+"true"),T.shift(),F+=")})";try{const j=maybeEval(w,function(){return Function(F)()},function(){return!0});return j.source=F,j}catch(j){return triggerErrorEvent(getDocument().body,"htmx:syntax:error",{error:j,source:F}),null}}}else U==="["&&W++;isPossibleRelativeReference(U,q,O)?F+="(("+O+"."+U+") ? ("+O+"."+U+") : (window."+U+"))":F=F+U,q=T.shift()}}}function consumeUntil(w,T){let O="";for(;w.length>0&&!T.test(w[0]);)O+=w.shift();return O}function consumeCSSSelector(w){let T;return w.length>0&&COMBINED_SELECTOR_START.test(w[0])?(w.shift(),T=consumeUntil(w,COMBINED_SELECTOR_END).trim(),w.shift()):T=consumeUntil(w,WHITESPACE_OR_COMMA),T}const INPUT_SELECTOR="input, textarea, select";function parseAndCacheTrigger(w,T,O){const W=[],F=tokenizeString(T);do{consumeUntil(F,NOT_WHITESPACE);const j=F.length,X=consumeUntil(F,/[,\[\s]/);if(X!=="")if(X==="every"){const Y={trigger:"every"};consumeUntil(F,NOT_WHITESPACE),Y.pollInterval=parseInterval(consumeUntil(F,/[,\[\s]/)),consumeUntil(F,NOT_WHITESPACE);var q=maybeGenerateConditional(w,F,"event");q&&(Y.eventFilter=q),W.push(Y)}else{const Y={trigger:X};var q=maybeGenerateConditional(w,F,"event");for(q&&(Y.eventFilter=q),consumeUntil(F,NOT_WHITESPACE);F.length>0&&F[0]!==",";){const K=F.shift();if(K==="changed")Y.changed=!0;else if(K==="once")Y.once=!0;else if(K==="consume")Y.consume=!0;else if(K==="delay"&&F[0]===":")F.shift(),Y.delay=parseInterval(consumeUntil(F,WHITESPACE_OR_COMMA));else if(K==="from"&&F[0]===":"){if(F.shift(),COMBINED_SELECTOR_START.test(F[0]))var U=consumeCSSSelector(F);else{var U=consumeUntil(F,WHITESPACE_OR_COMMA);if(U==="closest"||U==="find"||U==="next"||U==="previous"){F.shift();const tt=consumeCSSSelector(F);tt.length>0&&(U+=" "+tt)}}Y.from=U}else K==="target"&&F[0]===":"?(F.shift(),Y.target=consumeCSSSelector(F)):K==="throttle"&&F[0]===":"?(F.shift(),Y.throttle=parseInterval(consumeUntil(F,WHITESPACE_OR_COMMA))):K==="queue"&&F[0]===":"?(F.shift(),Y.queue=consumeUntil(F,WHITESPACE_OR_COMMA)):K==="root"&&F[0]===":"?(F.shift(),Y[K]=consumeCSSSelector(F)):K==="threshold"&&F[0]===":"?(F.shift(),Y[K]=consumeUntil(F,WHITESPACE_OR_COMMA)):triggerErrorEvent(w,"htmx:syntax:error",{token:F.shift()});consumeUntil(F,NOT_WHITESPACE)}W.push(Y)}F.length===j&&triggerErrorEvent(w,"htmx:syntax:error",{token:F.shift()}),consumeUntil(F,NOT_WHITESPACE)}while(F[0]===","&&F.shift());return O&&(O[T]=W),W}function getTriggerSpecs(w){const T=getAttributeValue(w,"hx-trigger");let O=[];if(T){const W=htmx.config.triggerSpecsCache;O=W&&W[T]||parseAndCacheTrigger(w,T,W)}return O.length>0?O:matches(w,"form")?[{trigger:"submit"}]:matches(w,'input[type="button"], input[type="submit"]')?[{trigger:"click"}]:matches(w,INPUT_SELECTOR)?[{trigger:"change"}]:[{trigger:"click"}]}function cancelPolling(w){getInternalData(w).cancelled=!0}function processPolling(w,T,O){const W=getInternalData(w);W.timeout=getWindow().setTimeout(function(){bodyContains(w)&&W.cancelled!==!0&&(maybeFilterEvent(O,w,makeEvent("hx:poll:trigger",{triggerSpec:O,target:w}))||T(w),processPolling(w,T,O))},O.pollInterval)}function isLocalLink(w){return location.hostname===w.hostname&&getRawAttribute(w,"href")&&getRawAttribute(w,"href").indexOf("#")!==0}function eltIsDisabled(w){return closest(w,htmx.config.disableSelector)}function boostElement(w,T,O){if(w instanceof HTMLAnchorElement&&isLocalLink(w)&&(w.target===""||w.target==="_self")||w.tagName==="FORM"&&String(getRawAttribute(w,"method")).toLowerCase()!=="dialog"){T.boosted=!0;let W,F;if(w.tagName==="A")W="get",F=getRawAttribute(w,"href");else{const q=getRawAttribute(w,"method");W=q?q.toLowerCase():"get",F=getRawAttribute(w,"action"),(F==null||F==="")&&(F=location.href),W==="get"&&F.includes("?")&&(F=F.replace(/\?[^#]+/,""))}O.forEach(function(q){addEventListener(w,function(U,j){const X=asElement(U);if(eltIsDisabled(X)){cleanUpElement(X);return}issueAjaxRequest(W,F,X,j)},T,q,!0)})}}function shouldCancel(w,T){if(w.type==="submit"&&T.tagName==="FORM")return!0;if(w.type==="click"){const O=T.closest('input[type="submit"], button');if(O&&O.form&&O.type==="submit")return!0;const W=T.closest("a"),F=/^#.+/;if(W&&W.href&&!F.test(W.getAttribute("href")))return!0}return!1}function ignoreBoostedAnchorCtrlClick(w,T){return getInternalData(w).boosted&&w instanceof HTMLAnchorElement&&T.type==="click"&&(T.ctrlKey||T.metaKey)}function maybeFilterEvent(w,T,O){const W=w.eventFilter;if(W)try{return W.call(T,O)!==!0}catch(F){const q=W.source;return triggerErrorEvent(getDocument().body,"htmx:eventFilter:error",{error:F,source:q}),!0}return!1}function addEventListener(w,T,O,W,F){const q=getInternalData(w);let U;W.from?U=querySelectorAllExt(w,W.from):U=[w],W.changed&&("lastValue"in q||(q.lastValue=new WeakMap),U.forEach(function(j){q.lastValue.has(W)||q.lastValue.set(W,new WeakMap),q.lastValue.get(W).set(j,j.value)})),forEach(U,function(j){const X=function(Y){if(!bodyContains(w)){j.removeEventListener(W.trigger,X);return}if(ignoreBoostedAnchorCtrlClick(w,Y)||((F||shouldCancel(Y,j))&&Y.preventDefault(),maybeFilterEvent(W,w,Y)))return;const J=getInternalData(Y);if(J.triggerSpec=W,J.handledFor==null&&(J.handledFor=[]),J.handledFor.indexOf(w)<0){if(J.handledFor.push(w),W.consume&&Y.stopPropagation(),W.target&&Y.target&&!matches(asElement(Y.target),W.target))return;if(W.once){if(q.triggeredOnce)return;q.triggeredOnce=!0}if(W.changed){const K=Y.target,G=K.value,tt=q.lastValue.get(W);if(tt.has(K)&&tt.get(K)===G)return;tt.set(K,G)}if(q.delayed&&clearTimeout(q.delayed),q.throttle)return;W.throttle>0?q.throttle||(triggerEvent(w,"htmx:trigger"),T(w,Y),q.throttle=getWindow().setTimeout(function(){q.throttle=null},W.throttle)):W.delay>0?q.delayed=getWindow().setTimeout(function(){triggerEvent(w,"htmx:trigger"),T(w,Y)},W.delay):(triggerEvent(w,"htmx:trigger"),T(w,Y))}};O.listenerInfos==null&&(O.listenerInfos=[]),O.listenerInfos.push({trigger:W.trigger,listener:X,on:j}),j.addEventListener(W.trigger,X)})}let windowIsScrolling=!1,scrollHandler=null;function initScrollHandler(){scrollHandler||(scrollHandler=function(){windowIsScrolling=!0},window.addEventListener("scroll",scrollHandler),window.addEventListener("resize",scrollHandler),setInterval(function(){windowIsScrolling&&(windowIsScrolling=!1,forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"),function(w){maybeReveal(w)}))},200))}function maybeReveal(w){!hasAttribute(w,"data-hx-revealed")&&isScrolledIntoView(w)&&(w.setAttribute("data-hx-revealed","true"),getInternalData(w).initHash?triggerEvent(w,"revealed"):w.addEventListener("htmx:afterProcessNode",function(){triggerEvent(w,"revealed")},{once:!0}))}function loadImmediately(w,T,O,W){const F=function(){O.loaded||(O.loaded=!0,triggerEvent(w,"htmx:trigger"),T(w))};W>0?getWindow().setTimeout(F,W):F()}function processVerbs(w,T,O){let W=!1;return forEach(VERBS,function(F){if(hasAttribute(w,"hx-"+F)){const q=getAttributeValue(w,"hx-"+F);W=!0,T.path=q,T.verb=F,O.forEach(function(U){addTriggerHandler(w,U,T,function(j,X){const Y=asElement(j);if(eltIsDisabled(Y)){cleanUpElement(Y);return}issueAjaxRequest(F,q,Y,X)})})}}),W}function addTriggerHandler(w,T,O,W){if(T.trigger==="revealed")initScrollHandler(),addEventListener(w,W,O,T),maybeReveal(asElement(w));else if(T.trigger==="intersect"){const F={};T.root&&(F.root=querySelectorExt(w,T.root)),T.threshold&&(F.threshold=parseFloat(T.threshold)),new IntersectionObserver(function(U){for(let j=0;j<U.length;j++)if(U[j].isIntersecting){triggerEvent(w,"intersect");break}},F).observe(asElement(w)),addEventListener(asElement(w),W,O,T)}else!O.firstInitCompleted&&T.trigger==="load"?maybeFilterEvent(T,w,makeEvent("load",{elt:w}))||loadImmediately(asElement(w),W,O,T.delay):T.pollInterval>0?(O.polling=!0,processPolling(asElement(w),W,T)):addEventListener(w,W,O,T)}function shouldProcessHxOn(w){const T=asElement(w);if(!T)return!1;const O=T.attributes;for(let W=0;W<O.length;W++){const F=O[W].name;if(startsWith(F,"hx-on:")||startsWith(F,"data-hx-on:")||startsWith(F,"hx-on-")||startsWith(F,"data-hx-on-"))return!0}return!1}const HX_ON_QUERY=new XPathEvaluator().createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');function processHXOnRoot(w,T){shouldProcessHxOn(w)&&T.push(asElement(w));const O=HX_ON_QUERY.evaluate(w);let W=null;for(;W=O.iterateNext();)T.push(asElement(W))}function findHxOnWildcardElements(w){const T=[];if(w instanceof DocumentFragment)for(const O of w.childNodes)processHXOnRoot(O,T);else processHXOnRoot(w,T);return T}function findElementsToProcess(w){if(w.querySelectorAll){const O=", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]",W=[];for(const q in extensions){const U=extensions[q];if(U.getSelectors){var T=U.getSelectors();T&&W.push(T)}}return w.querySelectorAll(VERB_SELECTOR+O+", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]"+W.flat().map(q=>", "+q).join(""))}else return[]}function maybeSetLastButtonClicked(w){const T=getTargetButton(w.target),O=getRelatedFormData(w);O&&(O.lastButtonClicked=T)}function maybeUnsetLastButtonClicked(w){const T=getRelatedFormData(w);T&&(T.lastButtonClicked=null)}function getTargetButton(w){return closest(asElement(w),"button, input[type='submit']")}function getRelatedForm(w){return w.form||closest(w,"form")}function getRelatedFormData(w){const T=getTargetButton(w.target);if(!T)return;const O=getRelatedForm(T);if(O)return getInternalData(O)}function initButtonTracking(w){w.addEventListener("click",maybeSetLastButtonClicked),w.addEventListener("focusin",maybeSetLastButtonClicked),w.addEventListener("focusout",maybeUnsetLastButtonClicked)}function addHxOnEventHandler(w,T,O){const W=getInternalData(w);Array.isArray(W.onHandlers)||(W.onHandlers=[]);let F;const q=function(U){maybeEval(w,function(){eltIsDisabled(w)||(F||(F=new Function("event",O)),F.call(w,U))})};w.addEventListener(T,q),W.onHandlers.push({event:T,listener:q})}function processHxOnWildcard(w){deInitOnHandlers(w);for(let T=0;T<w.attributes.length;T++){const O=w.attributes[T].name,W=w.attributes[T].value;if(startsWith(O,"hx-on")||startsWith(O,"data-hx-on")){const F=O.indexOf("-on")+3,q=O.slice(F,F+1);if(q==="-"||q===":"){let U=O.slice(F+1);startsWith(U,":")?U="htmx"+U:startsWith(U,"-")?U="htmx:"+U.slice(1):startsWith(U,"htmx-")&&(U="htmx:"+U.slice(5)),addHxOnEventHandler(w,U,W)}}}}function initNode(w){triggerEvent(w,"htmx:beforeProcessNode");const T=getInternalData(w),O=getTriggerSpecs(w);processVerbs(w,T,O)||(getClosestAttributeValue(w,"hx-boost")==="true"?boostElement(w,T,O):hasAttribute(w,"hx-trigger")&&O.forEach(function(F){addTriggerHandler(w,F,T,function(){})})),(w.tagName==="FORM"||getRawAttribute(w,"type")==="submit"&&hasAttribute(w,"form"))&&initButtonTracking(w),T.firstInitCompleted=!0,triggerEvent(w,"htmx:afterProcessNode")}function maybeDeInitAndHash(w){if(!(w instanceof Element))return!1;const T=getInternalData(w),O=attributeHash(w);return T.initHash!==O?(deInitNode(w),T.initHash=O,!0):!1}function processNode(w){if(w=resolveTarget(w),eltIsDisabled(w)){cleanUpElement(w);return}const T=[];maybeDeInitAndHash(w)&&T.push(w),forEach(findElementsToProcess(w),function(O){if(eltIsDisabled(O)){cleanUpElement(O);return}maybeDeInitAndHash(O)&&T.push(O)}),forEach(findHxOnWildcardElements(w),processHxOnWildcard),forEach(T,initNode)}function kebabEventName(w){return w.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function makeEvent(w,T){return new CustomEvent(w,{bubbles:!0,cancelable:!0,composed:!0,detail:T})}function triggerErrorEvent(w,T,O){triggerEvent(w,T,mergeObjects({error:T},O))}function ignoreEventForLogging(w){return w==="htmx:afterProcessNode"}function withExtensions(w,T,O){forEach(getExtensions(w,[],O),function(W){try{T(W)}catch(F){logError(F)}})}function logError(w){console.error(w)}function triggerEvent(w,T,O){w=resolveTarget(w),O==null&&(O={}),O.elt=w;const W=makeEvent(T,O);htmx.logger&&!ignoreEventForLogging(T)&&htmx.logger(w,T,O),O.error&&(logError(O.error),triggerEvent(w,"htmx:error",{errorInfo:O}));let F=w.dispatchEvent(W);const q=kebabEventName(T);if(F&&q!==T){const U=makeEvent(q,W.detail);F=F&&w.dispatchEvent(U)}return withExtensions(asElement(w),function(U){F=F&&U.onEvent(T,W)!==!1&&!W.defaultPrevented}),F}let currentPathForHistory;function setCurrentPathForHistory(w){currentPathForHistory=w,canAccessLocalStorage()&&sessionStorage.setItem("htmx-current-path-for-history",w)}setCurrentPathForHistory(location.pathname+location.search);function getHistoryElement(){return getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]")||getDocument().body}function saveToHistoryCache(w,T){if(!canAccessLocalStorage())return;const O=cleanInnerHtmlForHistory(T),W=getDocument().title,F=window.scrollY;if(htmx.config.historyCacheSize<=0){sessionStorage.removeItem("htmx-history-cache");return}w=normalizePath(w);const q=parseJSON(sessionStorage.getItem("htmx-history-cache"))||[];for(let j=0;j<q.length;j++)if(q[j].url===w){q.splice(j,1);break}const U={url:w,content:O,title:W,scroll:F};for(triggerEvent(getDocument().body,"htmx:historyItemCreated",{item:U,cache:q}),q.push(U);q.length>htmx.config.historyCacheSize;)q.shift();for(;q.length>0;)try{sessionStorage.setItem("htmx-history-cache",JSON.stringify(q));break}catch(j){triggerErrorEvent(getDocument().body,"htmx:historyCacheError",{cause:j,cache:q}),q.shift()}}function getCachedHistory(w){if(!canAccessLocalStorage())return null;w=normalizePath(w);const T=parseJSON(sessionStorage.getItem("htmx-history-cache"))||[];for(let O=0;O<T.length;O++)if(T[O].url===w)return T[O];return null}function cleanInnerHtmlForHistory(w){const T=htmx.config.requestClass,O=w.cloneNode(!0);return forEach(findAll(O,"."+T),function(W){removeClassFromElement(W,T)}),forEach(findAll(O,"[data-disabled-by-htmx]"),function(W){W.removeAttribute("disabled")}),O.innerHTML}function saveCurrentPageToHistory(){const w=getHistoryElement();let T=currentPathForHistory;canAccessLocalStorage()&&(T=sessionStorage.getItem("htmx-current-path-for-history")),T=T||location.pathname+location.search,getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]')||(triggerEvent(getDocument().body,"htmx:beforeHistorySave",{path:T,historyElt:w}),saveToHistoryCache(T,w)),htmx.config.historyEnabled&&history.replaceState({htmx:!0},getDocument().title,location.href)}function pushUrlIntoHistory(w){htmx.config.getCacheBusterParam&&(w=w.replace(/org\.htmx\.cache-buster=[^&]*&?/,""),(endsWith(w,"&")||endsWith(w,"?"))&&(w=w.slice(0,-1))),htmx.config.historyEnabled&&history.pushState({htmx:!0},"",w),setCurrentPathForHistory(w)}function replaceUrlInHistory(w){htmx.config.historyEnabled&&history.replaceState({htmx:!0},"",w),setCurrentPathForHistory(w)}function settleImmediately(w){forEach(w,function(T){T.call(void 0)})}function loadHistoryFromServer(w){const T=new XMLHttpRequest,O={swapStyle:"innerHTML",swapDelay:0,settleDelay:0},W={path:w,xhr:T,historyElt:getHistoryElement(),swapSpec:O};T.open("GET",w,!0),htmx.config.historyRestoreAsHxRequest&&T.setRequestHeader("HX-Request","true"),T.setRequestHeader("HX-History-Restore-Request","true"),T.setRequestHeader("HX-Current-URL",location.href),T.onload=function(){this.status>=200&&this.status<400?(W.response=this.response,triggerEvent(getDocument().body,"htmx:historyCacheMissLoad",W),swap(W.historyElt,W.response,O,{contextElement:W.historyElt,historyRequest:!0}),setCurrentPathForHistory(W.path),triggerEvent(getDocument().body,"htmx:historyRestore",{path:w,cacheMiss:!0,serverResponse:W.response})):triggerErrorEvent(getDocument().body,"htmx:historyCacheMissLoadError",W)},triggerEvent(getDocument().body,"htmx:historyCacheMiss",W)&&T.send()}function restoreHistory(w){saveCurrentPageToHistory(),w=w||location.pathname+location.search;const T=getCachedHistory(w);if(T){const O={swapStyle:"innerHTML",swapDelay:0,settleDelay:0,scroll:T.scroll},W={path:w,item:T,historyElt:getHistoryElement(),swapSpec:O};triggerEvent(getDocument().body,"htmx:historyCacheHit",W)&&(swap(W.historyElt,T.content,O,{contextElement:W.historyElt,title:T.title}),setCurrentPathForHistory(W.path),triggerEvent(getDocument().body,"htmx:historyRestore",W))}else htmx.config.refreshOnHistoryMiss?htmx.location.reload(!0):loadHistoryFromServer(w)}function addRequestIndicatorClasses(w){let T=findAttributeTargets(w,"hx-indicator");return T==null&&(T=[w]),forEach(T,function(O){const W=getInternalData(O);W.requestCount=(W.requestCount||0)+1,O.classList.add.call(O.classList,htmx.config.requestClass)}),T}function disableElements(w){let T=findAttributeTargets(w,"hx-disabled-elt");return T==null&&(T=[]),forEach(T,function(O){const W=getInternalData(O);W.requestCount=(W.requestCount||0)+1,O.setAttribute("disabled",""),O.setAttribute("data-disabled-by-htmx","")}),T}function removeRequestIndicators(w,T){forEach(w.concat(T),function(O){const W=getInternalData(O);W.requestCount=(W.requestCount||1)-1}),forEach(w,function(O){getInternalData(O).requestCount===0&&O.classList.remove.call(O.classList,htmx.config.requestClass)}),forEach(T,function(O){getInternalData(O).requestCount===0&&(O.removeAttribute("disabled"),O.removeAttribute("data-disabled-by-htmx"))})}function haveSeenNode(w,T){for(let O=0;O<w.length;O++)if(w[O].isSameNode(T))return!0;return!1}function shouldInclude(w){const T=w;return T.name===""||T.name==null||T.disabled||closest(T,"fieldset[disabled]")||T.type==="button"||T.type==="submit"||T.tagName==="image"||T.tagName==="reset"||T.tagName==="file"?!1:T.type==="checkbox"||T.type==="radio"?T.checked:!0}function addValueToFormData(w,T,O){w!=null&&T!=null&&(Array.isArray(T)?T.forEach(function(W){O.append(w,W)}):O.append(w,T))}function removeValueFromFormData(w,T,O){if(w!=null&&T!=null){let W=O.getAll(w);Array.isArray(T)?W=W.filter(F=>T.indexOf(F)<0):W=W.filter(F=>F!==T),O.delete(w),forEach(W,F=>O.append(w,F))}}function getValueFromInput(w){return w instanceof HTMLSelectElement&&w.multiple?toArray(w.querySelectorAll("option:checked")).map(function(T){return T.value}):w instanceof HTMLInputElement&&w.files?toArray(w.files):w.value}function processInputValue(w,T,O,W,F){if(!(W==null||haveSeenNode(w,W))){if(w.push(W),shouldInclude(W)){const q=getRawAttribute(W,"name");addValueToFormData(q,getValueFromInput(W),T),F&&validateElement(W,O)}W instanceof HTMLFormElement&&(forEach(W.elements,function(q){w.indexOf(q)>=0?removeValueFromFormData(q.name,getValueFromInput(q),T):w.push(q),F&&validateElement(q,O)}),new FormData(W).forEach(function(q,U){q instanceof File&&q.name===""||addValueToFormData(U,q,T)}))}}function validateElement(w,T){const O=w;O.willValidate&&(triggerEvent(O,"htmx:validation:validate"),O.checkValidity()||(triggerEvent(O,"htmx:validation:failed",{message:O.validationMessage,validity:O.validity})&&!T.length&&htmx.config.reportValidityOfForms&&O.reportValidity(),T.push({elt:O,message:O.validationMessage,validity:O.validity})))}function overrideFormData(w,T){for(const O of T.keys())w.delete(O);return T.forEach(function(O,W){w.append(W,O)}),w}function getInputValues(w,T){const O=[],W=new FormData,F=new FormData,q=[],U=getInternalData(w);U.lastButtonClicked&&!bodyContains(U.lastButtonClicked)&&(U.lastButtonClicked=null);let j=w instanceof HTMLFormElement&&w.noValidate!==!0||getAttributeValue(w,"hx-validate")==="true";if(U.lastButtonClicked&&(j=j&&U.lastButtonClicked.formNoValidate!==!0),T!=="get"&&processInputValue(O,F,q,getRelatedForm(w),j),processInputValue(O,W,q,w,j),U.lastButtonClicked||w.tagName==="BUTTON"||w.tagName==="INPUT"&&getRawAttribute(w,"type")==="submit"){const Y=U.lastButtonClicked||w,J=getRawAttribute(Y,"name");addValueToFormData(J,Y.value,F)}const X=findAttributeTargets(w,"hx-include");return forEach(X,function(Y){processInputValue(O,W,q,asElement(Y),j),matches(Y,"form")||forEach(asParentNode(Y).querySelectorAll(INPUT_SELECTOR),function(J){processInputValue(O,W,q,J,j)})}),overrideFormData(W,F),{errors:q,formData:W,values:formDataProxy(W)}}function appendParam(w,T,O){w!==""&&(w+="&"),String(O)==="[object Object]"&&(O=JSON.stringify(O));const W=encodeURIComponent(O);return w+=encodeURIComponent(T)+"="+W,w}function urlEncode(w){w=formDataFromObject(w);let T="";return w.forEach(function(O,W){T=appendParam(T,W,O)}),T}function getHeaders(w,T,O){const W={"HX-Request":"true","HX-Trigger":getRawAttribute(w,"id"),"HX-Trigger-Name":getRawAttribute(w,"name"),"HX-Target":getAttributeValue(T,"id"),"HX-Current-URL":location.href};return getValuesForElement(w,"hx-headers",!1,W),O!==void 0&&(W["HX-Prompt"]=O),getInternalData(w).boosted&&(W["HX-Boosted"]="true"),W}function filterValues(w,T){const O=getClosestAttributeValue(T,"hx-params");if(O){if(O==="none")return new FormData;if(O==="*")return w;if(O.indexOf("not ")===0)return forEach(O.slice(4).split(","),function(W){W=W.trim(),w.delete(W)}),w;{const W=new FormData;return forEach(O.split(","),function(F){F=F.trim(),w.has(F)&&w.getAll(F).forEach(function(q){W.append(F,q)})}),W}}else return w}function isAnchorLink(w){return!!getRawAttribute(w,"href")&&getRawAttribute(w,"href").indexOf("#")>=0}function getSwapSpecification(w,T){const O=T||getClosestAttributeValue(w,"hx-swap"),W={swapStyle:getInternalData(w).boosted?"innerHTML":htmx.config.defaultSwapStyle,swapDelay:htmx.config.defaultSwapDelay,settleDelay:htmx.config.defaultSettleDelay};if(htmx.config.scrollIntoViewOnBoost&&getInternalData(w).boosted&&!isAnchorLink(w)&&(W.show="top"),O){const U=splitOnWhitespace(O);if(U.length>0)for(let j=0;j<U.length;j++){const X=U[j];if(X.indexOf("swap:")===0)W.swapDelay=parseInterval(X.slice(5));else if(X.indexOf("settle:")===0)W.settleDelay=parseInterval(X.slice(7));else if(X.indexOf("transition:")===0)W.transition=X.slice(11)==="true";else if(X.indexOf("ignoreTitle:")===0)W.ignoreTitle=X.slice(12)==="true";else if(X.indexOf("scroll:")===0){var F=X.slice(7).split(":");const J=F.pop();var q=F.length>0?F.join(":"):null;W.scroll=J,W.scrollTarget=q}else if(X.indexOf("show:")===0){var F=X.slice(5).split(":");const K=F.pop();var q=F.length>0?F.join(":"):null;W.show=K,W.showTarget=q}else if(X.indexOf("focus-scroll:")===0){const Y=X.slice(13);W.focusScroll=Y=="true"}else j==0?W.swapStyle=X:logError("Unknown modifier in hx-swap: "+X)}}return W}function usesFormData(w){return getClosestAttributeValue(w,"hx-encoding")==="multipart/form-data"||matches(w,"form")&&getRawAttribute(w,"enctype")==="multipart/form-data"}function encodeParamsForBody(w,T,O){let W=null;return withExtensions(T,function(F){W==null&&(W=F.encodeParameters(w,O,T))}),W??(usesFormData(T)?overrideFormData(new FormData,formDataFromObject(O)):urlEncode(O))}function makeSettleInfo(w){return{tasks:[],elts:[w]}}function updateScrollState(w,T){const O=w[0],W=w[w.length-1];if(T.scroll){var F=null;T.scrollTarget&&(F=asElement(querySelectorExt(O,T.scrollTarget))),T.scroll==="top"&&(O||F)&&(F=F||O,F.scrollTop=0),T.scroll==="bottom"&&(W||F)&&(F=F||W,F.scrollTop=F.scrollHeight),typeof T.scroll=="number"&&getWindow().setTimeout(function(){window.scrollTo(0,T.scroll)},0)}if(T.show){var F=null;if(T.showTarget){let U=T.showTarget;T.showTarget==="window"&&(U="body"),F=asElement(querySelectorExt(O,U))}T.show==="top"&&(O||F)&&(F=F||O,F.scrollIntoView({block:"start",behavior:htmx.config.scrollBehavior})),T.show==="bottom"&&(W||F)&&(F=F||W,F.scrollIntoView({block:"end",behavior:htmx.config.scrollBehavior}))}}function getValuesForElement(w,T,O,W,F){if(W==null&&(W={}),w==null)return W;const q=getAttributeValue(w,T);if(q){let U=q.trim(),j=O;if(U==="unset")return null;U.indexOf("javascript:")===0?(U=U.slice(11),j=!0):U.indexOf("js:")===0&&(U=U.slice(3),j=!0),U.indexOf("{")!==0&&(U="{"+U+"}");let X;j?X=maybeEval(w,function(){return F?Function("event","return ("+U+")").call(w,F):Function("return ("+U+")").call(w)},{}):X=parseJSON(U);for(const Y in X)X.hasOwnProperty(Y)&&W[Y]==null&&(W[Y]=X[Y])}return getValuesForElement(asElement(parentElt(w)),T,O,W,F)}function maybeEval(w,T,O){return htmx.config.allowEval?T():(triggerErrorEvent(w,"htmx:evalDisallowedError"),O)}function getHXVarsForElement(w,T,O){return getValuesForElement(w,"hx-vars",!0,O,T)}function getHXValsForElement(w,T,O){return getValuesForElement(w,"hx-vals",!1,O,T)}function getExpressionVars(w,T){return mergeObjects(getHXVarsForElement(w,T),getHXValsForElement(w,T))}function safelySetHeaderValue(w,T,O){if(O!==null)try{w.setRequestHeader(T,O)}catch{w.setRequestHeader(T,encodeURIComponent(O)),w.setRequestHeader(T+"-URI-AutoEncoded","true")}}function getPathFromResponse(w){if(w.responseURL)try{const T=new URL(w.responseURL);return T.pathname+T.search}catch{triggerErrorEvent(getDocument().body,"htmx:badResponseUrl",{url:w.responseURL})}}function hasHeader(w,T){return T.test(w.getAllResponseHeaders())}function ajaxHelper(w,T,O){if(w=w.toLowerCase(),O){if(O instanceof Element||typeof O=="string")return issueAjaxRequest(w,T,null,null,{targetOverride:resolveTarget(O)||DUMMY_ELT,returnPromise:!0});{let W=resolveTarget(O.target);return(O.target&&!W||O.source&&!W&&!resolveTarget(O.source))&&(W=DUMMY_ELT),issueAjaxRequest(w,T,resolveTarget(O.source),O.event,{handler:O.handler,headers:O.headers,values:O.values,targetOverride:W,swapOverride:O.swap,select:O.select,returnPromise:!0,push:O.push,replace:O.replace,selectOOB:O.selectOOB})}}else return issueAjaxRequest(w,T,null,null,{returnPromise:!0})}function hierarchyForElt(w){const T=[];for(;w;)T.push(w),w=w.parentElement;return T}function verifyPath(w,T,O){const W=new URL(T,location.protocol!=="about:"?location.href:window.origin),q=(location.protocol!=="about:"?location.origin:window.origin)===W.origin;return htmx.config.selfRequestsOnly&&!q?!1:triggerEvent(w,"htmx:validateUrl",mergeObjects({url:W,sameHost:q},O))}function formDataFromObject(w){if(w instanceof FormData)return w;const T=new FormData;for(const O in w)w.hasOwnProperty(O)&&(w[O]&&typeof w[O].forEach=="function"?w[O].forEach(function(W){T.append(O,W)}):typeof w[O]=="object"&&!(w[O]instanceof Blob)?T.append(O,JSON.stringify(w[O])):T.append(O,w[O]));return T}function formDataArrayProxy(w,T,O){return new Proxy(O,{get:function(W,F){return typeof F=="number"?W[F]:F==="length"?W.length:F==="push"?function(q){W.push(q),w.append(T,q)}:typeof W[F]=="function"?function(){W[F].apply(W,arguments),w.delete(T),W.forEach(function(q){w.append(T,q)})}:W[F]&&W[F].length===1?W[F][0]:W[F]},set:function(W,F,q){return W[F]=q,w.delete(T),W.forEach(function(U){w.append(T,U)}),!0}})}function formDataProxy(w){return new Proxy(w,{get:function(T,O){if(typeof O=="symbol"){const F=Reflect.get(T,O);return typeof F=="function"?function(){return F.apply(w,arguments)}:F}if(O==="toJSON")return()=>Object.fromEntries(w);if(O in T&&typeof T[O]=="function")return function(){return w[O].apply(w,arguments)};const W=w.getAll(O);if(W.length!==0)return W.length===1?W[0]:formDataArrayProxy(T,O,W)},set:function(T,O,W){return typeof O!="string"?!1:(T.delete(O),W&&typeof W.forEach=="function"?W.forEach(function(F){T.append(O,F)}):typeof W=="object"&&!(W instanceof Blob)?T.append(O,JSON.stringify(W)):T.append(O,W),!0)},deleteProperty:function(T,O){return typeof O=="string"&&T.delete(O),!0},ownKeys:function(T){return Reflect.ownKeys(Object.fromEntries(T))},getOwnPropertyDescriptor:function(T,O){return Reflect.getOwnPropertyDescriptor(Object.fromEntries(T),O)}})}function issueAjaxRequest(w,T,O,W,F,q){let U=null,j=null;if(F=F??{},F.returnPromise&&typeof Promise<"u")var X=new Promise(function(st,ft){U=st,j=ft});O==null&&(O=getDocument().body);const Y=F.handler||handleAjaxResponse,J=F.select||null;if(!bodyContains(O))return maybeCall(U),X;const K=F.targetOverride||asElement(getTarget(O));if(K==null||K==DUMMY_ELT)return triggerErrorEvent(O,"htmx:targetError",{target:getClosestAttributeValue(O,"hx-target")}),maybeCall(j),X;let G=getInternalData(O);const tt=G.lastButtonClicked;if(tt){const st=getRawAttribute(tt,"formaction");st!=null&&(T=st);const ft=getRawAttribute(tt,"formmethod");if(ft!=null)if(VERBS.includes(ft.toLowerCase()))w=ft;else return maybeCall(U),X}const Q=getClosestAttributeValue(O,"hx-confirm");if(q===void 0&&triggerEvent(O,"htmx:confirm",{target:K,elt:O,path:T,verb:w,triggeringEvent:W,etc:F,issueRequest:function(At){return issueAjaxRequest(w,T,O,W,F,!!At)},question:Q})===!1)return maybeCall(U),X;let et=O,ot=getClosestAttributeValue(O,"hx-sync"),rt=null,at=!1;if(ot){const st=ot.split(":"),ft=st[0].trim();if(ft==="this"?et=findThisElement(O,"hx-sync"):et=asElement(querySelectorExt(O,ft)),ot=(st[1]||"drop").trim(),G=getInternalData(et),ot==="drop"&&G.xhr&&G.abortable!==!0)return maybeCall(U),X;if(ot==="abort"){if(G.xhr)return maybeCall(U),X;at=!0}else ot==="replace"?triggerEvent(et,"htmx:abort"):ot.indexOf("queue")===0&&(rt=(ot.split(" ")[1]||"last").trim())}if(G.xhr)if(G.abortable)triggerEvent(et,"htmx:abort");else{if(rt==null){if(W){const st=getInternalData(W);st&&st.triggerSpec&&st.triggerSpec.queue&&(rt=st.triggerSpec.queue)}rt==null&&(rt="last")}return G.queuedRequests==null&&(G.queuedRequests=[]),rt==="first"&&G.queuedRequests.length===0?G.queuedRequests.push(function(){issueAjaxRequest(w,T,O,W,F)}):rt==="all"?G.queuedRequests.push(function(){issueAjaxRequest(w,T,O,W,F)}):rt==="last"&&(G.queuedRequests=[],G.queuedRequests.push(function(){issueAjaxRequest(w,T,O,W,F)})),maybeCall(U),X}const nt=new XMLHttpRequest;G.xhr=nt,G.abortable=at;const it=function(){G.xhr=null,G.abortable=!1,G.queuedRequests!=null&&G.queuedRequests.length>0&&G.queuedRequests.shift()()},dt=getClosestAttributeValue(O,"hx-prompt");if(dt){var ut=prompt(dt);if(ut===null||!triggerEvent(O,"htmx:prompt",{prompt:ut,target:K}))return maybeCall(U),it(),X}if(Q&&!q&&!confirm(Q))return maybeCall(U),it(),X;let lt=getHeaders(O,K,ut);w!=="get"&&!usesFormData(O)&&(lt["Content-Type"]="application/x-www-form-urlencoded"),F.headers&&(lt=mergeObjects(lt,F.headers));const Ct=getInputValues(O,w);let gt=Ct.errors;const wt=Ct.formData;F.values&&overrideFormData(wt,formDataFromObject(F.values));const Et=formDataFromObject(getExpressionVars(O,W)),bt=overrideFormData(wt,Et);let pt=filterValues(bt,O);htmx.config.getCacheBusterParam&&w==="get"&&pt.set("org.htmx.cache-buster",getRawAttribute(K,"id")||"true"),(T==null||T==="")&&(T=location.href);const ht=getValuesForElement(O,"hx-request"),xt=getInternalData(O).boosted;let vt=htmx.config.methodsThatUseUrlParams.indexOf(w)>=0;const ct={boosted:xt,useUrlParams:vt,formData:pt,parameters:formDataProxy(pt),unfilteredFormData:bt,unfilteredParameters:formDataProxy(bt),headers:lt,elt:O,target:K,verb:w,errors:gt,withCredentials:F.credentials||ht.credentials||htmx.config.withCredentials,timeout:F.timeout||ht.timeout||htmx.config.timeout,path:T,triggeringEvent:W};if(!triggerEvent(O,"htmx:configRequest",ct))return maybeCall(U),it(),X;if(T=ct.path,w=ct.verb,lt=ct.headers,pt=formDataFromObject(ct.parameters),gt=ct.errors,vt=ct.useUrlParams,gt&&gt.length>0)return triggerEvent(O,"htmx:validation:halted",ct),maybeCall(U),it(),X;const yt=T.split("#"),_t=yt[0],St=yt[1];let $t=T;if(vt&&($t=_t,!pt.keys().next().done&&($t.indexOf("?")<0?$t+="?":$t+="&",$t+=urlEncode(pt),St&&($t+="#"+St))),!verifyPath(O,$t,ct))return triggerErrorEvent(O,"htmx:invalidPath",ct),maybeCall(j),it(),X;if(nt.open(w.toUpperCase(),$t,!0),nt.overrideMimeType("text/html"),nt.withCredentials=ct.withCredentials,nt.timeout=ct.timeout,!ht.noHeaders){for(const st in lt)if(lt.hasOwnProperty(st)){const ft=lt[st];safelySetHeaderValue(nt,st,ft)}}const mt={xhr:nt,target:K,requestConfig:ct,etc:F,boosted:xt,select:J,pathInfo:{requestPath:T,finalRequestPath:$t,responsePath:null,anchor:St}};if(nt.onload=function(){try{const st=hierarchyForElt(O);if(mt.pathInfo.responsePath=getPathFromResponse(nt),Y(O,mt),mt.keepIndicators!==!0&&removeRequestIndicators(Lt,Tt),triggerEvent(O,"htmx:afterRequest",mt),triggerEvent(O,"htmx:afterOnLoad",mt),!bodyContains(O)){let ft=null;for(;st.length>0&&ft==null;){const At=st.shift();bodyContains(At)&&(ft=At)}ft&&(triggerEvent(ft,"htmx:afterRequest",mt),triggerEvent(ft,"htmx:afterOnLoad",mt))}maybeCall(U)}catch(st){throw triggerErrorEvent(O,"htmx:onLoadError",mergeObjects({error:st},mt)),st}finally{it()}},nt.onerror=function(){removeRequestIndicators(Lt,Tt),triggerErrorEvent(O,"htmx:afterRequest",mt),triggerErrorEvent(O,"htmx:sendError",mt),maybeCall(j),it()},nt.onabort=function(){removeRequestIndicators(Lt,Tt),triggerErrorEvent(O,"htmx:afterRequest",mt),triggerErrorEvent(O,"htmx:sendAbort",mt),maybeCall(j),it()},nt.ontimeout=function(){removeRequestIndicators(Lt,Tt),triggerErrorEvent(O,"htmx:afterRequest",mt),triggerErrorEvent(O,"htmx:timeout",mt),maybeCall(j),it()},!triggerEvent(O,"htmx:beforeRequest",mt))return maybeCall(U),it(),X;var Lt=addRequestIndicatorClasses(O),Tt=disableElements(O);forEach(["loadstart","loadend","progress","abort"],function(st){forEach([nt,nt.upload],function(ft){ft.addEventListener(st,function(At){triggerEvent(O,"htmx:xhr:"+st,{lengthComputable:At.lengthComputable,loaded:At.loaded,total:At.total})})})}),triggerEvent(O,"htmx:beforeSend",mt);const Ot=vt?null:encodeParamsForBody(nt,O,pt);return nt.send(Ot),X}function determineHistoryUpdates(w,T){const O=T.xhr;let W=null,F=null;if(hasHeader(O,/HX-Push:/i)?(W=O.getResponseHeader("HX-Push"),F="push"):hasHeader(O,/HX-Push-Url:/i)?(W=O.getResponseHeader("HX-Push-Url"),F="push"):hasHeader(O,/HX-Replace-Url:/i)&&(W=O.getResponseHeader("HX-Replace-Url"),F="replace"),W)return W==="false"?{}:{type:F,path:W};const q=T.pathInfo.finalRequestPath,U=T.pathInfo.responsePath,j=T.etc.push||getClosestAttributeValue(w,"hx-push-url"),X=T.etc.replace||getClosestAttributeValue(w,"hx-replace-url"),Y=getInternalData(w).boosted;let J=null,K=null;return j?(J="push",K=j):X?(J="replace",K=X):Y&&(J="push",K=U||q),K?K==="false"?{}:(K==="true"&&(K=U||q),T.pathInfo.anchor&&K.indexOf("#")===-1&&(K=K+"#"+T.pathInfo.anchor),{type:J,path:K}):{}}function codeMatches(w,T){var O=new RegExp(w.code);return O.test(T.toString(10))}function resolveResponseHandling(w){for(var T=0;T<htmx.config.responseHandling.length;T++){var O=htmx.config.responseHandling[T];if(codeMatches(O,w.status))return O}return{swap:!1}}function handleTitle(w){if(w){const T=find("title");T?T.textContent=w:window.document.title=w}}function resolveRetarget(w,T){if(T==="this")return w;const O=asElement(querySelectorExt(w,T));if(O==null)throw triggerErrorEvent(w,"htmx:targetError",{target:T}),new Error(`Invalid re-target ${T}`);return O}function handleAjaxResponse(w,T){const O=T.xhr;let W=T.target;const F=T.etc,q=T.select;if(!triggerEvent(w,"htmx:beforeOnLoad",T))return;if(hasHeader(O,/HX-Trigger:/i)&&handleTriggerHeader(O,"HX-Trigger",w),hasHeader(O,/HX-Location:/i)){let at=O.getResponseHeader("HX-Location");var U={};at.indexOf("{")===0&&(U=parseJSON(at),at=U.path,delete U.path),U.push=U.push||"true",ajaxHelper("get",at,U);return}const j=hasHeader(O,/HX-Refresh:/i)&&O.getResponseHeader("HX-Refresh")==="true";if(hasHeader(O,/HX-Redirect:/i)){T.keepIndicators=!0,htmx.location.href=O.getResponseHeader("HX-Redirect"),j&&htmx.location.reload();return}if(j){T.keepIndicators=!0,htmx.location.reload();return}const X=determineHistoryUpdates(w,T),Y=resolveResponseHandling(O),J=Y.swap;let K=!!Y.error,G=htmx.config.ignoreTitle||Y.ignoreTitle,tt=Y.select;Y.target&&(T.target=resolveRetarget(w,Y.target));var Q=F.swapOverride;Q==null&&Y.swapOverride&&(Q=Y.swapOverride),hasHeader(O,/HX-Retarget:/i)&&(T.target=resolveRetarget(w,O.getResponseHeader("HX-Retarget"))),hasHeader(O,/HX-Reswap:/i)&&(Q=O.getResponseHeader("HX-Reswap"));var et=O.response,ot=mergeObjects({shouldSwap:J,serverResponse:et,isError:K,ignoreTitle:G,selectOverride:tt,swapOverride:Q},T);if(!(Y.event&&!triggerEvent(W,Y.event,ot))&&triggerEvent(W,"htmx:beforeSwap",ot)){if(W=ot.target,et=ot.serverResponse,K=ot.isError,G=ot.ignoreTitle,tt=ot.selectOverride,Q=ot.swapOverride,T.target=W,T.failed=K,T.successful=!K,ot.shouldSwap){O.status===286&&cancelPolling(w),withExtensions(w,function(it){et=it.transformResponse(et,O,w)}),X.type&&saveCurrentPageToHistory();var rt=getSwapSpecification(w,Q);rt.hasOwnProperty("ignoreTitle")||(rt.ignoreTitle=G),W.classList.add(htmx.config.swappingClass),q&&(tt=q),hasHeader(O,/HX-Reselect:/i)&&(tt=O.getResponseHeader("HX-Reselect"));const at=F.selectOOB||getClosestAttributeValue(w,"hx-select-oob"),nt=getClosestAttributeValue(w,"hx-select");swap(W,et,rt,{select:tt==="unset"?null:tt||nt,selectOOB:at,eventInfo:T,anchor:T.pathInfo.anchor,contextElement:w,afterSwapCallback:function(){if(hasHeader(O,/HX-Trigger-After-Swap:/i)){let it=w;bodyContains(w)||(it=getDocument().body),handleTriggerHeader(O,"HX-Trigger-After-Swap",it)}},afterSettleCallback:function(){if(hasHeader(O,/HX-Trigger-After-Settle:/i)){let it=w;bodyContains(w)||(it=getDocument().body),handleTriggerHeader(O,"HX-Trigger-After-Settle",it)}},beforeSwapCallback:function(){X.type&&(triggerEvent(getDocument().body,"htmx:beforeHistoryUpdate",mergeObjects({history:X},T)),X.type==="push"?(pushUrlIntoHistory(X.path),triggerEvent(getDocument().body,"htmx:pushedIntoHistory",{path:X.path})):(replaceUrlInHistory(X.path),triggerEvent(getDocument().body,"htmx:replacedInHistory",{path:X.path})))}})}K&&triggerErrorEvent(w,"htmx:responseError",mergeObjects({error:"Response Status Error Code "+O.status+" from "+T.pathInfo.requestPath},T))}}const extensions={};function extensionBase(){return{init:function(w){return null},getSelectors:function(){return null},onEvent:function(w,T){return!0},transformResponse:function(w,T,O){return w},isInlineSwap:function(w){return!1},handleSwap:function(w,T,O,W){return!1},encodeParameters:function(w,T,O){return null}}}function defineExtension(w,T){T.init&&T.init(internalAPI),extensions[w]=mergeObjects(extensionBase(),T)}function removeExtension(w){delete extensions[w]}function getExtensions(w,T,O){if(T==null&&(T=[]),w==null)return T;O==null&&(O=[]);const W=getAttributeValue(w,"hx-ext");return W&&forEach(W.split(","),function(F){if(F=F.replace(/ /g,""),F.slice(0,7)=="ignore:"){O.push(F.slice(7));return}if(O.indexOf(F)<0){const q=extensions[F];q&&T.indexOf(q)<0&&T.push(q)}}),getExtensions(asElement(parentElt(w)),T,O)}var isReady=!1;getDocument().addEventListener("DOMContentLoaded",function(){isReady=!0});function ready(w){isReady||getDocument().readyState==="complete"?w():getDocument().addEventListener("DOMContentLoaded",w)}function insertIndicatorStyles(){if(htmx.config.includeIndicatorStyles!==!1){const w=htmx.config.inlineStyleNonce?` nonce="${htmx.config.inlineStyleNonce}"`:"",T=htmx.config.indicatorClass,O=htmx.config.requestClass;getDocument().head.insertAdjacentHTML("beforeend",`<style${w}>.${T}{opacity:0;visibility: hidden} .${O} .${T}, .${O}.${T}{opacity:1;visibility: visible;transition: opacity 200ms ease-in}</style>`)}}function getMetaConfig(){const w=getDocument().querySelector('meta[name="htmx-config"]');return w?parseJSON(w.content):null}function mergeMetaConfig(){const w=getMetaConfig();w&&(htmx.config=mergeObjects(htmx.config,w))}return ready(function(){mergeMetaConfig(),insertIndicatorStyles();let w=getDocument().body;processNode(w);const T=getDocument().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");w.addEventListener("htmx:abort",function(W){const F=W.detail.elt||W.target,q=getInternalData(F);q&&q.xhr&&q.xhr.abort()});const O=window.onpopstate?window.onpopstate.bind(window):null;window.onpopstate=function(W){W.state&&W.state.htmx?(restoreHistory(),forEach(T,function(F){triggerEvent(F,"htmx:restored",{document:getDocument(),triggerEvent})})):O&&O(W)},getWindow().setTimeout(function(){triggerEvent(w,"htmx:load",{}),w=null},0)}),htmx})();class ThemeToggle extends i$3{connectedCallback(){var W;super.connectedCallback();const O=localStorage.getItem("theme")||((W=window.matchMedia)!=null&&W.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light");this._applyTheme(O)}get _isDark(){return document.documentElement.classList.contains("wa-dark")}_applyTheme(T){document.documentElement.classList.toggle("wa-dark",T==="dark"),document.documentElement.setAttribute("data-theme",T),localStorage.setItem("theme",T),this.requestUpdate()}_toggle(){this._applyTheme(this._isDark?"light":"dark")}render(){return b`
      <wa-button
        appearance="plain"
        size="small"
        aria-label="Toggle theme"
        title="Toggle theme"
        @click=${this._toggle}
      >
        <wa-icon slot="start" name=${this._isDark?"moon":"sun"}></wa-icon>
      </wa-button>
    `}}Rt(ThemeToggle,"styles",i$6`
    :host { display: inline-flex; align-items: center; }
  `);customElements.define("theme-toggle",ThemeToggle);let _urlBase="";function setUrlBase(w){_urlBase=w}function getUrlBase(){return _urlBase||window.urlBase||""}function joinURL(w,T){return w.endsWith("/")||(w+="/"),T.startsWith("/")&&(T=T.substring(1)),w+T}async function fetcher(w,T={}){const O=joinURL(getUrlBase(),w),W={headers:{},...T};return T.body instanceof FormData||(W.headers["Content-Type"]="application/json"),W.headers={...W.headers,...T.headers},fetch(O,W)}function escapeHtml(w){if(!w)return"";const T={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return w.replace(/[&<>"']/g,O=>T[O])}function formatBytes(w){if(!w||w===0)return"0 B";const T=1024,O=["B","KB","MB","GB","TB","PB"],W=Math.floor(Math.log(w)/Math.log(T));return`${parseFloat((w/Math.pow(T,W)).toFixed(2))} ${O[W]}`}function formatSpeed(w){return`${formatBytes(w)}/s`}function formatDuration(w){if(!w||w===0)return"0s";const T=[{label:"d",seconds:86400},{label:"h",seconds:3600},{label:"m",seconds:60},{label:"s",seconds:1}],O=[];let W=w;for(const F of T){const q=Math.floor(W/F.seconds);q>0&&(O.push(`${q}${F.label}`),W%=F.seconds)}return O.slice(0,2).join(" ")||"0s"}async function copyToClipboard(w){try{return await navigator.clipboard.writeText(w),createToast("Copied to clipboard","success"),!0}catch{return createToast("Failed to copy to clipboard","error"),!1}}function isValidUrl(w){try{return new URL(w),!0}catch{return!1}}function setButtonLoading(w,T=!0,O=null){typeof w=="string"&&(w=document.getElementById(w)||document.querySelector(w)),w&&(T?(w.disabled=!0,w.dataset.originalText||(w.dataset.originalText=O||w.innerHTML),w.innerHTML="<wa-spinner></wa-spinner> Processing..."):(w.disabled=!1,w.innerHTML=w.dataset.originalText||"Submit",delete w.dataset.originalText))}function getCurrentTheme(){return document.documentElement.getAttribute("data-theme")||"light"}function getToastContainer(){let w=document.getElementById("app-toast-container");return w||(w=document.createElement("div"),w.id="app-toast-container",w.className="app-toast-container",document.body.appendChild(w)),w}function createToast(w,T="success",O){const W={success:"success",error:"danger",warning:"warning",info:"brand"},F={success:"circle-check",error:"circle-xmark",warning:"triangle-exclamation",info:"circle-info"},U=O||{success:5e3,warning:1e4,error:15e3,info:7e3}[T]||5e3,j=getToastContainer(),X=document.createElement("div");X.className=`app-toast app-toast--${T}`,X.innerHTML=`
    <wa-callout variant="${W[T]||"brand"}" appearance="accent" size="small">
      <wa-icon slot="icon" name="${F[T]||"circle-info"}"></wa-icon>
      ${escapeHtml(w)}
    </wa-callout>
  `,j.appendChild(X),window.setTimeout(()=>{X.classList.add("app-toast--hide"),window.setTimeout(()=>X.remove(),250)},U)}setBasePath("https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.3.1/dist-cdn/");window.urlBase!==void 0&&setUrlBase(window.urlBase);window.decypharrUtils={fetcher,createToast,formatBytes,formatDuration,formatSpeed,joinURL,escapeHtml,copyToClipboard,setButtonLoading,isValidUrl,getCurrentTheme};window.fetcher=fetcher;window.createToast=createToast;async function loadVersion(){try{const w=await fetcher("/version");if(!w.ok)throw new Error("Failed");const T=await w.json(),O=document.getElementById("version-badge");if(O){O.innerHTML=`<a href="https://github.com/sirrobot01/decypharr/releases/tag/v${T.version}" target="_blank">${T.channel}-${T.version}</a>`;const W={beta:"warning",nightly:"danger"};W[T.channel]&&(O.variant=W[T.channel])}}catch{const w=document.getElementById("version-badge");w&&(w.textContent="Unknown")}}document.addEventListener("DOMContentLoaded",loadVersion);
