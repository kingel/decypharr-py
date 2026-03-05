var Pe=Object.defineProperty;var Re=(T,w,O)=>w in T?Pe(T,w,{enumerable:!0,configurable:!0,writable:!0,value:O}):T[w]=O;var Se=(T,w,O)=>Re(T,typeof w!="symbol"?w+"":w,O);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var basePath="",kitCode="";function setBasePath(T){basePath=T}function getBasePath(T=""){if(!basePath){const w=document.querySelector("[data-webawesome]");if(w!=null&&w.hasAttribute("data-webawesome")){const O=new URL(w.getAttribute("data-webawesome")??"",window.location.href).pathname;setBasePath(O)}else{const F=[...document.getElementsByTagName("script")].find(W=>W.src.endsWith("webawesome.js")||W.src.endsWith("webawesome.loader.js")||W.src.endsWith("webawesome.ssr-loader.js"));if(F){const W=String(F.getAttribute("src"));setBasePath(W.split("/").slice(0,-1).join("/"))}}}return basePath.replace(/\/$/,"")+(T?`/${T.replace(/^\//,"")}`:"")}function setKitCode(T){kitCode=T}function getKitCode(){if(!kitCode){const T=document.querySelector("[data-fa-kit-code]");T&&setKitCode(T.getAttribute("data-fa-kit-code")||"")}return kitCode}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */new MutationObserver(T=>{for(const{addedNodes:w}of T)for(const O of w)O.nodeType===Node.ELEMENT_NODE&&discover(O)});async function discover(T){const w=T instanceof Element?T.tagName.toLowerCase():"",O=w==null?void 0:w.startsWith("wa-"),F=[...T.querySelectorAll(":not(:defined)")].map(q=>q.tagName.toLowerCase()).filter(q=>q.startsWith("wa-"));O&&!customElements.get(w)&&F.push(w);const W=[...new Set(F)],U=await Promise.allSettled(W.map(q=>register(q)));for(const q of U)q.status==="rejected"&&console.warn(q.reason);await new Promise(requestAnimationFrame),T.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function register(T){if(customElements.get(T))return Promise.resolve();const w=T.replace(/^wa-/i,""),O=getBasePath(`components/${w}/${w}.js`);return new Promise((F,W)=>{import(O).then(()=>F()).catch(()=>W(new Error(`Unable to autoload <${T}> from ${O}`)))})}const connectedElements=new Set,translations=new Map;let fallback,documentDirection="ltr",documentLanguage="en";const isClient=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(isClient){const T=new MutationObserver(update);documentDirection=document.documentElement.dir||"ltr",documentLanguage=document.documentElement.lang||navigator.language,T.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function registerTranslation(...T){T.map(w=>{const O=w.$code.toLowerCase();translations.has(O)?translations.set(O,Object.assign(Object.assign({},translations.get(O)),w)):translations.set(O,w),fallback||(fallback=w)}),update()}function update(){isClient&&(documentDirection=document.documentElement.dir||"ltr",documentLanguage=document.documentElement.lang||navigator.language),[...connectedElements.keys()].map(T=>{typeof T.requestUpdate=="function"&&T.requestUpdate()})}let LocalizeController$1=class{constructor(w){this.host=w,this.host.addController(this)}hostConnected(){connectedElements.add(this.host)}hostDisconnected(){connectedElements.delete(this.host)}dir(){return`${this.host.dir||documentDirection}`.toLowerCase()}lang(){return`${this.host.lang||documentLanguage}`.toLowerCase()}getTranslationData(w){var O,F;const W=new Intl.Locale(w.replace(/_/g,"-")),U=W==null?void 0:W.language.toLowerCase(),q=(F=(O=W==null?void 0:W.region)===null||O===void 0?void 0:O.toLowerCase())!==null&&F!==void 0?F:"",j=translations.get(`${U}-${q}`),J=translations.get(U);return{locale:W,language:U,region:q,primary:j,secondary:J}}exists(w,O){var F;const{primary:W,secondary:U}=this.getTranslationData((F=O.lang)!==null&&F!==void 0?F:this.lang());return O=Object.assign({includeFallback:!1},O),!!(W&&W[w]||U&&U[w]||O.includeFallback&&fallback&&fallback[w])}term(w,...O){const{primary:F,secondary:W}=this.getTranslationData(this.lang());let U;if(F&&F[w])U=F[w];else if(W&&W[w])U=W[w];else if(fallback&&fallback[w])U=fallback[w];else return console.error(`No translation found for: ${String(w)}`),String(w);return typeof U=="function"?U(...O):U}date(w,O){return w=new Date(w),new Intl.DateTimeFormat(this.lang(),O).format(w)}number(w,O){return w=Number(w),isNaN(w)?"":new Intl.NumberFormat(this.lang(),O).format(w)}relativeTime(w,O,F){return new Intl.RelativeTimeFormat(this.lang(),F).format(w,O)}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var translation={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(T,w)=>`Go to slide ${T} of ${w}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:T=>T===0?"No options selected":T===1?"1 option selected":`${T} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:T=>`Slide ${T}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};registerTranslation(translation);var en_default=translation;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var LocalizeController=class extends LocalizeController$1{};registerTranslation(en_default);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var FA_VERSION="7.2.0";function getIconUrl(T,w,O){const F=getKitCode(),W=F.length>0;let U="solid";return w==="chisel"&&(U="chisel-regular"),w==="etch"&&(U="etch-solid"),w==="graphite"&&(U="graphite-thin"),w==="jelly"&&(U="jelly-regular",O==="duo-regular"&&(U="jelly-duo-regular"),O==="fill-regular"&&(U="jelly-fill-regular")),w==="jelly-duo"&&(U="jelly-duo-regular"),w==="jelly-fill"&&(U="jelly-fill-regular"),w==="notdog"&&(O==="solid"&&(U="notdog-solid"),O==="duo-solid"&&(U="notdog-duo-solid")),w==="notdog-duo"&&(U="notdog-duo-solid"),w==="slab"&&((O==="solid"||O==="regular")&&(U="slab-regular"),O==="press-regular"&&(U="slab-press-regular")),w==="slab-press"&&(U="slab-press-regular"),w==="thumbprint"&&(U="thumbprint-light"),w==="utility"&&(U="utility-semibold"),w==="utility-duo"&&(U="utility-duo-semibold"),w==="utility-fill"&&(U="utility-fill-semibold"),w==="whiteboard"&&(U="whiteboard-semibold"),w==="classic"&&(O==="thin"&&(U="thin"),O==="light"&&(U="light"),O==="regular"&&(U="regular"),O==="solid"&&(U="solid")),w==="duotone"&&(O==="thin"&&(U="duotone-thin"),O==="light"&&(U="duotone-light"),O==="regular"&&(U="duotone-regular"),O==="solid"&&(U="duotone")),w==="sharp"&&(O==="thin"&&(U="sharp-thin"),O==="light"&&(U="sharp-light"),O==="regular"&&(U="sharp-regular"),O==="solid"&&(U="sharp-solid")),w==="sharp-duotone"&&(O==="thin"&&(U="sharp-duotone-thin"),O==="light"&&(U="sharp-duotone-light"),O==="regular"&&(U="sharp-duotone-regular"),O==="solid"&&(U="sharp-duotone-solid")),w==="brands"&&(U="brands"),W?`https://ka-p.fontawesome.com/releases/v${FA_VERSION}/svgs/${U}/${T}.svg?token=${encodeURIComponent(F)}`:`https://ka-f.fontawesome.com/releases/v${FA_VERSION}/svgs/${U}/${T}.svg`}var library={name:"default",resolver:(T,w="classic",O="solid")=>getIconUrl(T,w,O),mutator:(T,w)=>{if(w!=null&&w.family&&!T.hasAttribute("data-duotone-initialized")){const{family:O,variant:F}=w;if(O==="duotone"||O==="sharp-duotone"||O==="notdog-duo"||O==="notdog"&&F==="duo-solid"||O==="jelly-duo"||O==="jelly"&&F==="duo-regular"||O==="utility-duo"||O==="thumbprint"){const W=[...T.querySelectorAll("path")],U=W.find(j=>!j.hasAttribute("opacity")),q=W.find(j=>j.hasAttribute("opacity"));if(!U||!q)return;if(U.setAttribute("data-duotone-primary",""),q.setAttribute("data-duotone-secondary",""),w.swapOpacity&&U&&q){const j=q.getAttribute("opacity")||"0.4";U.style.setProperty("--path-opacity",j),q.style.setProperty("--path-opacity","1")}T.setAttribute("data-duotone-initialized","")}}}},library_default_default=library;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function dataUri(T){return`data:image/svg+xml,${encodeURIComponent(T)}`}var icons={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},systemLibrary={name:"system",resolver:(T,w="classic",O="solid")=>{let W=icons[O][T]??icons.regular[T]??icons.regular["circle-question"];return W?dataUri(W):""}},library_system_default=systemLibrary;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var defaultIconFamily="classic",registry=[library_default_default,library_system_default],watchedIcons=[];function watchIcon(T){watchedIcons.push(T)}function unwatchIcon(T){watchedIcons=watchedIcons.filter(w=>w!==T)}function getIconLibrary(T){return registry.find(w=>w.name===T)}function getDefaultIconFamily(){return defaultIconFamily}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__typeError=T=>{throw TypeError(T)},__decorateClass=(T,w,O,F)=>{for(var W=F>1?void 0:F?__getOwnPropDesc(w,O):w,U=T.length-1,q;U>=0;U--)(q=T[U])&&(W=(F?q(w,O,W):q(W))||W);return F&&W&&__defProp(w,O,W),W},__accessCheck=(T,w,O)=>w.has(T)||__typeError("Cannot "+O),__privateGet=(T,w,O)=>(__accessCheck(T,w,"read from private field"),w.get(T)),__privateAdd=(T,w,O)=>w.has(T)?__typeError("Cannot add the same private member more than once"):w instanceof WeakSet?w.add(T):w.set(T,O),__privateSet=(T,w,O,F)=>(__accessCheck(T,w,"write to private field"),w.set(T,O),O);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$3=globalThis,e$8=t$3.ShadowRoot&&(t$3.ShadyCSS===void 0||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$8=new WeakMap;let n$4=class{constructor(w,O,F){if(this._$cssResult$=!0,F!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=w,this.t=O}get styleSheet(){let w=this.o;const O=this.t;if(e$8&&w===void 0){const F=O!==void 0&&O.length===1;F&&(w=o$8.get(O)),w===void 0&&((this.o=w=new CSSStyleSheet).replaceSync(this.cssText),F&&o$8.set(O,w))}return w}toString(){return this.cssText}};const r$6=T=>new n$4(typeof T=="string"?T:T+"",void 0,s$2),i$6=(T,...w)=>{const O=T.length===1?T[0]:w.reduce((F,W,U)=>F+(q=>{if(q._$cssResult$===!0)return q.cssText;if(typeof q=="number")return q;throw Error("Value passed to 'css' function must be a 'css' function result: "+q+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(W)+T[U+1],T[0]);return new n$4(O,T,s$2)},S$1=(T,w)=>{if(e$8)T.adoptedStyleSheets=w.map(O=>O instanceof CSSStyleSheet?O:O.styleSheet);else for(const O of w){const F=document.createElement("style"),W=t$3.litNonce;W!==void 0&&F.setAttribute("nonce",W),F.textContent=O.cssText,T.appendChild(F)}},c$2=e$8?T=>T:T=>T instanceof CSSStyleSheet?(w=>{let O="";for(const F of w.cssRules)O+=F.cssText;return r$6(O)})(T):T;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$5,defineProperty:e$7,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$5,getOwnPropertySymbols:o$7,getPrototypeOf:n$3}=Object,a$2=globalThis,c$1=a$2.trustedTypes,l$4=c$1?c$1.emptyScript:"",p$2=a$2.reactiveElementPolyfillSupport,d$1=(T,w)=>T,u$2={toAttribute(T,w){switch(w){case Boolean:T=T?l$4:null;break;case Object:case Array:T=T==null?T:JSON.stringify(T)}return T},fromAttribute(T,w){let O=T;switch(w){case Boolean:O=T!==null;break;case Number:O=T===null?null:Number(T);break;case Object:case Array:try{O=JSON.parse(T)}catch{O=null}}return O}},f$1=(T,w)=>!i$5(T,w),b$1={attribute:!0,type:String,converter:u$2,reflect:!1,useDefault:!1,hasChanged:f$1};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),a$2.litPropertyMetadata??(a$2.litPropertyMetadata=new WeakMap);let y$1=class extends HTMLElement{static addInitializer(w){this._$Ei(),(this.l??(this.l=[])).push(w)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(w,O=b$1){if(O.state&&(O.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(w)&&((O=Object.create(O)).wrapped=!0),this.elementProperties.set(w,O),!O.noAccessor){const F=Symbol(),W=this.getPropertyDescriptor(w,F,O);W!==void 0&&e$7(this.prototype,w,W)}}static getPropertyDescriptor(w,O,F){const{get:W,set:U}=h$1(this.prototype,w)??{get(){return this[O]},set(q){this[O]=q}};return{get:W,set(q){const j=W==null?void 0:W.call(this);U==null||U.call(this,q),this.requestUpdate(w,j,F)},configurable:!0,enumerable:!0}}static getPropertyOptions(w){return this.elementProperties.get(w)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const w=n$3(this);w.finalize(),w.l!==void 0&&(this.l=[...w.l]),this.elementProperties=new Map(w.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const O=this.properties,F=[...r$5(O),...o$7(O)];for(const W of F)this.createProperty(W,O[W])}const w=this[Symbol.metadata];if(w!==null){const O=litPropertyMetadata.get(w);if(O!==void 0)for(const[F,W]of O)this.elementProperties.set(F,W)}this._$Eh=new Map;for(const[O,F]of this.elementProperties){const W=this._$Eu(O,F);W!==void 0&&this._$Eh.set(W,O)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(w){const O=[];if(Array.isArray(w)){const F=new Set(w.flat(1/0).reverse());for(const W of F)O.unshift(c$2(W))}else w!==void 0&&O.push(c$2(w));return O}static _$Eu(w,O){const F=O.attribute;return F===!1?void 0:typeof F=="string"?F:typeof w=="string"?w.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var w;this._$ES=new Promise(O=>this.enableUpdating=O),this._$AL=new Map,this._$E_(),this.requestUpdate(),(w=this.constructor.l)==null||w.forEach(O=>O(this))}addController(w){var O;(this._$EO??(this._$EO=new Set)).add(w),this.renderRoot!==void 0&&this.isConnected&&((O=w.hostConnected)==null||O.call(w))}removeController(w){var O;(O=this._$EO)==null||O.delete(w)}_$E_(){const w=new Map,O=this.constructor.elementProperties;for(const F of O.keys())this.hasOwnProperty(F)&&(w.set(F,this[F]),delete this[F]);w.size>0&&(this._$Ep=w)}createRenderRoot(){const w=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(w,this.constructor.elementStyles),w}connectedCallback(){var w;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(w=this._$EO)==null||w.forEach(O=>{var F;return(F=O.hostConnected)==null?void 0:F.call(O)})}enableUpdating(w){}disconnectedCallback(){var w;(w=this._$EO)==null||w.forEach(O=>{var F;return(F=O.hostDisconnected)==null?void 0:F.call(O)})}attributeChangedCallback(w,O,F){this._$AK(w,F)}_$ET(w,O){var U;const F=this.constructor.elementProperties.get(w),W=this.constructor._$Eu(w,F);if(W!==void 0&&F.reflect===!0){const q=(((U=F.converter)==null?void 0:U.toAttribute)!==void 0?F.converter:u$2).toAttribute(O,F.type);this._$Em=w,q==null?this.removeAttribute(W):this.setAttribute(W,q),this._$Em=null}}_$AK(w,O){var U,q;const F=this.constructor,W=F._$Eh.get(w);if(W!==void 0&&this._$Em!==W){const j=F.getPropertyOptions(W),J=typeof j.converter=="function"?{fromAttribute:j.converter}:((U=j.converter)==null?void 0:U.fromAttribute)!==void 0?j.converter:u$2;this._$Em=W;const X=J.fromAttribute(O,j.type);this[W]=X??((q=this._$Ej)==null?void 0:q.get(W))??X,this._$Em=null}}requestUpdate(w,O,F,W=!1,U){var q;if(w!==void 0){const j=this.constructor;if(W===!1&&(U=this[w]),F??(F=j.getPropertyOptions(w)),!((F.hasChanged??f$1)(U,O)||F.useDefault&&F.reflect&&U===((q=this._$Ej)==null?void 0:q.get(w))&&!this.hasAttribute(j._$Eu(w,F))))return;this.C(w,O,F)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(w,O,{useDefault:F,reflect:W,wrapped:U},q){F&&!(this._$Ej??(this._$Ej=new Map)).has(w)&&(this._$Ej.set(w,q??O??this[w]),U!==!0||q!==void 0)||(this._$AL.has(w)||(this.hasUpdated||F||(O=void 0),this._$AL.set(w,O)),W===!0&&this._$Em!==w&&(this._$Eq??(this._$Eq=new Set)).add(w))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(O){Promise.reject(O)}const w=this.scheduleUpdate();return w!=null&&await w,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var F;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[U,q]of this._$Ep)this[U]=q;this._$Ep=void 0}const W=this.constructor.elementProperties;if(W.size>0)for(const[U,q]of W){const{wrapped:j}=q,J=this[U];j!==!0||this._$AL.has(U)||J===void 0||this.C(U,void 0,q,J)}}let w=!1;const O=this._$AL;try{w=this.shouldUpdate(O),w?(this.willUpdate(O),(F=this._$EO)==null||F.forEach(W=>{var U;return(U=W.hostUpdate)==null?void 0:U.call(W)}),this.update(O)):this._$EM()}catch(W){throw w=!1,this._$EM(),W}w&&this._$AE(O)}willUpdate(w){}_$AE(w){var O;(O=this._$EO)==null||O.forEach(F=>{var W;return(W=F.hostUpdated)==null?void 0:W.call(F)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(w)),this.updated(w)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(w){return!0}update(w){this._$Eq&&(this._$Eq=this._$Eq.forEach(O=>this._$ET(O,this[O]))),this._$EM()}updated(w){}firstUpdated(w){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$2==null||p$2({ReactiveElement:y$1}),(a$2.reactiveElementVersions??(a$2.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$2=globalThis,i$4=T=>T,s$1=t$2.trustedTypes,e$6=s$1?s$1.createPolicy("lit-html",{createHTML:T=>T}):void 0,h="$lit$",o$6=`lit$${Math.random().toFixed(9).slice(2)}$`,n$2="?"+o$6,r$4=`<${n$2}>`,l$3=document,c=()=>l$3.createComment(""),a$1=T=>T===null||typeof T!="object"&&typeof T!="function",u$1=Array.isArray,d=T=>u$1(T)||typeof(T==null?void 0:T[Symbol.iterator])=="function",f=`[ 	
\f\r]`,v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p$1=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=T=>(w,...O)=>({_$litType$:T,strings:w,values:O}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l$3.createTreeWalker(l$3,129);function V(T,w){if(!u$1(T)||!T.hasOwnProperty("raw"))throw Error("invalid template strings array");return e$6!==void 0?e$6.createHTML(w):w}const N=(T,w)=>{const O=T.length-1,F=[];let W,U=w===2?"<svg>":w===3?"<math>":"",q=v;for(let j=0;j<O;j++){const J=T[j];let X,Y,K=-1,G=0;for(;G<J.length&&(q.lastIndex=G,Y=q.exec(J),Y!==null);)G=q.lastIndex,q===v?Y[1]==="!--"?q=_:Y[1]!==void 0?q=m$1:Y[2]!==void 0?(y.test(Y[2])&&(W=RegExp("</"+Y[2],"g")),q=p$1):Y[3]!==void 0&&(q=p$1):q===p$1?Y[0]===">"?(q=W??v,K=-1):Y[1]===void 0?K=-2:(K=q.lastIndex-Y[2].length,X=Y[1],q=Y[3]===void 0?p$1:Y[3]==='"'?$:g):q===$||q===g?q=p$1:q===_||q===m$1?q=v:(q=p$1,W=void 0);const ee=q===p$1&&T[j+1].startsWith("/>")?" ":"";U+=q===v?J+r$4:K>=0?(F.push(X),J.slice(0,K)+h+J.slice(K)+o$6+ee):J+o$6+(K===-2?j:ee)}return[V(T,U+(T[O]||"<?>")+(w===2?"</svg>":w===3?"</math>":"")),F]};class S{constructor({strings:w,_$litType$:O},F){let W;this.parts=[];let U=0,q=0;const j=w.length-1,J=this.parts,[X,Y]=N(w,O);if(this.el=S.createElement(X,F),P.currentNode=this.el.content,O===2||O===3){const K=this.el.content.firstChild;K.replaceWith(...K.childNodes)}for(;(W=P.nextNode())!==null&&J.length<j;){if(W.nodeType===1){if(W.hasAttributes())for(const K of W.getAttributeNames())if(K.endsWith(h)){const G=Y[q++],ee=W.getAttribute(K).split(o$6),Q=/([.?@])?(.*)/.exec(G);J.push({type:1,index:U,name:Q[2],strings:ee,ctor:Q[1]==="."?I:Q[1]==="?"?L:Q[1]==="@"?z:H}),W.removeAttribute(K)}else K.startsWith(o$6)&&(J.push({type:6,index:U}),W.removeAttribute(K));if(y.test(W.tagName)){const K=W.textContent.split(o$6),G=K.length-1;if(G>0){W.textContent=s$1?s$1.emptyScript:"";for(let ee=0;ee<G;ee++)W.append(K[ee],c()),P.nextNode(),J.push({type:2,index:++U});W.append(K[G],c())}}}else if(W.nodeType===8)if(W.data===n$2)J.push({type:2,index:U});else{let K=-1;for(;(K=W.data.indexOf(o$6,K+1))!==-1;)J.push({type:7,index:U}),K+=o$6.length-1}U++}}static createElement(w,O){const F=l$3.createElement("template");return F.innerHTML=w,F}}function M(T,w,O=T,F){var q,j;if(w===E)return w;let W=F!==void 0?(q=O._$Co)==null?void 0:q[F]:O._$Cl;const U=a$1(w)?void 0:w._$litDirective$;return(W==null?void 0:W.constructor)!==U&&((j=W==null?void 0:W._$AO)==null||j.call(W,!1),U===void 0?W=void 0:(W=new U(T),W._$AT(T,O,F)),F!==void 0?(O._$Co??(O._$Co=[]))[F]=W:O._$Cl=W),W!==void 0&&(w=M(T,W._$AS(T,w.values),W,F)),w}class R{constructor(w,O){this._$AV=[],this._$AN=void 0,this._$AD=w,this._$AM=O}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(w){const{el:{content:O},parts:F}=this._$AD,W=((w==null?void 0:w.creationScope)??l$3).importNode(O,!0);P.currentNode=W;let U=P.nextNode(),q=0,j=0,J=F[0];for(;J!==void 0;){if(q===J.index){let X;J.type===2?X=new k(U,U.nextSibling,this,w):J.type===1?X=new J.ctor(U,J.name,J.strings,this,w):J.type===6&&(X=new Z(U,this,w)),this._$AV.push(X),J=F[++j]}q!==(J==null?void 0:J.index)&&(U=P.nextNode(),q++)}return P.currentNode=l$3,W}p(w){let O=0;for(const F of this._$AV)F!==void 0&&(F.strings!==void 0?(F._$AI(w,F,O),O+=F.strings.length-2):F._$AI(w[O])),O++}}class k{get _$AU(){var w;return((w=this._$AM)==null?void 0:w._$AU)??this._$Cv}constructor(w,O,F,W){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=w,this._$AB=O,this._$AM=F,this.options=W,this._$Cv=(W==null?void 0:W.isConnected)??!0}get parentNode(){let w=this._$AA.parentNode;const O=this._$AM;return O!==void 0&&(w==null?void 0:w.nodeType)===11&&(w=O.parentNode),w}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(w,O=this){w=M(this,w,O),a$1(w)?w===A||w==null||w===""?(this._$AH!==A&&this._$AR(),this._$AH=A):w!==this._$AH&&w!==E&&this._(w):w._$litType$!==void 0?this.$(w):w.nodeType!==void 0?this.T(w):d(w)?this.k(w):this._(w)}O(w){return this._$AA.parentNode.insertBefore(w,this._$AB)}T(w){this._$AH!==w&&(this._$AR(),this._$AH=this.O(w))}_(w){this._$AH!==A&&a$1(this._$AH)?this._$AA.nextSibling.data=w:this.T(l$3.createTextNode(w)),this._$AH=w}$(w){var U;const{values:O,_$litType$:F}=w,W=typeof F=="number"?this._$AC(w):(F.el===void 0&&(F.el=S.createElement(V(F.h,F.h[0]),this.options)),F);if(((U=this._$AH)==null?void 0:U._$AD)===W)this._$AH.p(O);else{const q=new R(W,this),j=q.u(this.options);q.p(O),this.T(j),this._$AH=q}}_$AC(w){let O=C.get(w.strings);return O===void 0&&C.set(w.strings,O=new S(w)),O}k(w){u$1(this._$AH)||(this._$AH=[],this._$AR());const O=this._$AH;let F,W=0;for(const U of w)W===O.length?O.push(F=new k(this.O(c()),this.O(c()),this,this.options)):F=O[W],F._$AI(U),W++;W<O.length&&(this._$AR(F&&F._$AB.nextSibling,W),O.length=W)}_$AR(w=this._$AA.nextSibling,O){var F;for((F=this._$AP)==null?void 0:F.call(this,!1,!0,O);w!==this._$AB;){const W=i$4(w).nextSibling;i$4(w).remove(),w=W}}setConnected(w){var O;this._$AM===void 0&&(this._$Cv=w,(O=this._$AP)==null||O.call(this,w))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(w,O,F,W,U){this.type=1,this._$AH=A,this._$AN=void 0,this.element=w,this.name=O,this._$AM=W,this.options=U,F.length>2||F[0]!==""||F[1]!==""?(this._$AH=Array(F.length-1).fill(new String),this.strings=F):this._$AH=A}_$AI(w,O=this,F,W){const U=this.strings;let q=!1;if(U===void 0)w=M(this,w,O,0),q=!a$1(w)||w!==this._$AH&&w!==E,q&&(this._$AH=w);else{const j=w;let J,X;for(w=U[0],J=0;J<U.length-1;J++)X=M(this,j[F+J],O,J),X===E&&(X=this._$AH[J]),q||(q=!a$1(X)||X!==this._$AH[J]),X===A?w=A:w!==A&&(w+=(X??"")+U[J+1]),this._$AH[J]=X}q&&!W&&this.j(w)}j(w){w===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,w??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(w){this.element[this.name]=w===A?void 0:w}}class L extends H{constructor(){super(...arguments),this.type=4}j(w){this.element.toggleAttribute(this.name,!!w&&w!==A)}}class z extends H{constructor(w,O,F,W,U){super(w,O,F,W,U),this.type=5}_$AI(w,O=this){if((w=M(this,w,O,0)??A)===E)return;const F=this._$AH,W=w===A&&F!==A||w.capture!==F.capture||w.once!==F.once||w.passive!==F.passive,U=w!==A&&(F===A||W);W&&this.element.removeEventListener(this.name,this,F),U&&this.element.addEventListener(this.name,this,w),this._$AH=w}handleEvent(w){var O;typeof this._$AH=="function"?this._$AH.call(((O=this.options)==null?void 0:O.host)??this.element,w):this._$AH.handleEvent(w)}}class Z{constructor(w,O,F){this.element=w,this.type=6,this._$AN=void 0,this._$AM=O,this.options=F}get _$AU(){return this._$AM._$AU}_$AI(w){M(this,w)}}const B=t$2.litHtmlPolyfillSupport;B==null||B(S,k),(t$2.litHtmlVersions??(t$2.litHtmlVersions=[])).push("3.3.2");const D=(T,w,O)=>{const F=(O==null?void 0:O.renderBefore)??w;let W=F._$litPart$;if(W===void 0){const U=(O==null?void 0:O.renderBefore)??null;F._$litPart$=W=new k(w.insertBefore(c(),U),U,void 0,O??{})}return W._$AI(T),W};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;let i$3=class extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var O;const w=super.createRenderRoot();return(O=this.renderOptions).renderBefore??(O.renderBefore=w.firstChild),w}update(w){const O=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(w),this._$Do=D(O,this.renderRoot,this.renderOptions)}connectedCallback(){var w;super.connectedCallback(),(w=this._$Do)==null||w.setConnected(!0)}disconnectedCallback(){var w;super.disconnectedCallback(),(w=this._$Do)==null||w.setConnected(!1)}render(){return E}};var De;i$3._$litElement$=!0,i$3.finalized=!0,(De=s.litElementHydrateSupport)==null||De.call(s,{LitElement:i$3});const o$5=s.litElementPolyfillSupport;o$5==null||o$5({LitElement:i$3});(s.litElementVersions??(s.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$4=!1;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var variants_styles_default=i$6`
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
 */const t$1=T=>(w,O)=>{O!==void 0?O.addInitializer(()=>{customElements.define(T,w)}):customElements.define(T,w)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$3={attribute:!0,type:String,converter:u$2,reflect:!1,hasChanged:f$1},r$3=(T=o$3,w,O)=>{const{kind:F,metadata:W}=O;let U=globalThis.litPropertyMetadata.get(W);if(U===void 0&&globalThis.litPropertyMetadata.set(W,U=new Map),F==="setter"&&((T=Object.create(T)).wrapped=!0),U.set(O.name,T),F==="accessor"){const{name:q}=O;return{set(j){const J=w.get.call(this);w.set.call(this,j),this.requestUpdate(q,J,T,!0,j)},init(j){return j!==void 0&&this.C(q,void 0,T,j),j}}}if(F==="setter"){const{name:q}=O;return function(j){const J=this[q];w.call(this,j),this.requestUpdate(q,J,T,!0,j)}}throw Error("Unsupported decorator location: "+F)};function n$1(T){return(w,O)=>typeof O=="object"?r$3(T,w,O):((F,W,U)=>{const q=W.hasOwnProperty(U);return W.constructor.createProperty(U,F),q?Object.getOwnPropertyDescriptor(W,U):void 0})(T,w,O)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r$2(T){return n$1({...T,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$5=(T,w,O)=>(O.configurable=!0,O.enumerable=!0,Reflect.decorate&&typeof w!="object"&&Object.defineProperty(T,w,O),O);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$4(T,w){return(O,F,W)=>{const U=q=>{var j;return((j=q.renderRoot)==null?void 0:j.querySelector(T))??null};return e$5(O,F,{get(){return U(this)}})}}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var host_styles_default=i$6`
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
`,_hasRecordedInitialProperties,WebAwesomeElement=class extends i$3{constructor(){super(),__privateAdd(this,_hasRecordedInitialProperties,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(w,O)=>{var F;if((F=this.internals)!=null&&F.states)try{O?this.internals.states.add(w):this.internals.states.delete(w)}catch(W){if(String(W).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw W}},has:w=>{var O;if(!((O=this.internals)!=null&&O.states))return!1;try{return this.internals.states.has(w)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let T=this.constructor;for(let[w,O]of T.elementProperties)O.default==="inherit"&&O.initial!==void 0&&typeof w=="string"&&this.customStates.set(`initial-${w}-${O.initial}`,!0)}static get styles(){const T=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[host_styles_default,...T]}attributeChangedCallback(T,w,O){__privateGet(this,_hasRecordedInitialProperties)||(this.constructor.elementProperties.forEach((F,W)=>{F.reflect&&this[W]!=null&&this.initialReflectedProperties.set(W,this[W])}),__privateSet(this,_hasRecordedInitialProperties,!0)),super.attributeChangedCallback(T,w,O)}willUpdate(T){super.willUpdate(T),this.initialReflectedProperties.forEach((w,O)=>{T.has(O)&&this[O]==null&&(this[O]=w)})}firstUpdated(T){var w;super.firstUpdated(T),this.didSSR&&((w=this.shadowRoot)==null||w.querySelectorAll("slot").forEach(O=>{O.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}))}update(T){try{super.update(T)}catch(w){if(this.didSSR&&!this.hasUpdated){const O=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});O.error=w,this.dispatchEvent(O)}throw w}}relayNativeEvent(T,w){T.stopImmediatePropagation(),this.dispatchEvent(new T.constructor(T.type,{...T,...w}))}};_hasRecordedInitialProperties=new WeakMap;__decorateClass([n$1()],WebAwesomeElement.prototype,"dir",2);__decorateClass([n$1()],WebAwesomeElement.prototype,"lang",2);__decorateClass([n$1({type:Boolean,reflect:!0,attribute:"did-ssr"})],WebAwesomeElement.prototype,"didSSR",2);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var badge_styles_default=i$6`
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
    `}};WaBadge.css=[variants_styles_default,badge_styles_default];__decorateClass([n$1({reflect:!0})],WaBadge.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],WaBadge.prototype,"appearance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaBadge.prototype,"pill",2);__decorateClass([n$1({reflect:!0})],WaBadge.prototype,"attention",2);WaBadge=__decorateClass([t$1("wa-badge")],WaBadge);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var MirrorValidator=()=>({checkValidity(T){const w=T.input,O={message:"",isValid:!0,invalidKeys:[]};if(!w)return O;let F=!0;if("checkValidity"in w&&(F=w.checkValidity()),F)return O;if(O.isValid=!1,"validationMessage"in w&&(O.message=w.validationMessage),!("validity"in w))return O.invalidKeys.push("customError"),O;for(const W in w.validity){if(W==="valid")continue;const U=W;w.validity[U]&&O.invalidKeys.push(U)}return O}});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaInvalidEvent=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var CustomErrorValidator=()=>({observedAttributes:["custom-error"],checkValidity(T){const w={message:"",isValid:!0,invalidKeys:[]};return T.customError&&(w.message=T.customError,w.isValid=!1,w.invalidKeys=["customError"]),w}}),WebAwesomeFormAssociatedElement=class extends WebAwesomeElement{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=T=>{T.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new WaInvalidEvent))},this.handleInteraction=T=>{var O;const w=this.emittedEvents;w.includes(T.type)||w.push(T.type),w.length===((O=this.assumeInteractionOn)==null?void 0:O.length)&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[CustomErrorValidator()]}static get observedAttributes(){const T=new Set(super.observedAttributes||[]);for(const w of this.validators)if(w.observedAttributes)for(const O of w.observedAttributes)T.add(O);return[...T]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(T=>{this.addEventListener(T,this.handleInteraction)})}firstUpdated(...T){super.firstUpdated(...T),this.updateValidity()}willUpdate(T){if(T.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),T.has("value")||T.has("disabled")||T.has("defaultValue")){const w=this.value;if(Array.isArray(w)){if(this.name){const O=new FormData;for(const F of w)O.append(this.name,F);this.setValue(O,O)}}else this.setValue(w,w)}T.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(T),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(T){T?this.setAttribute("form",T):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...T){const w=T[0],O=T[1];let F=T[2];F||(F=this.validationTarget),this.internals.setValidity(w,O,F||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){const T=!!this.required,w=this.internals.validity.valid,O=this.hasInteracted;this.customStates.set("required",T),this.customStates.set("optional",!T),this.customStates.set("invalid",!w),this.customStates.set("valid",w),this.customStates.set("user-invalid",!w&&O),this.customStates.set("user-valid",w&&O)}setCustomValidity(T){if(!T){this.customError=null,this.setValidity({});return}this.customError=T,this.setValidity({customError:!0},T,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(T){this.disabled=T,this.updateValidity()}formStateRestoreCallback(T,w){this.value=T,w==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...T){const[w,O]=T;this.internals.setFormValue(w,O)}get allValidators(){const T=this.constructor.validators||[],w=this.validators||[];return[...T,...w]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}const T=this.allValidators;if(!(T!=null&&T.length))return;const w={customError:!!this.customError},O=this.validationTarget||this.input||void 0;let F="";for(const W of T){const{isValid:U,message:q,invalidKeys:j}=W.checkValidity(this);U||(F||(F=q),(j==null?void 0:j.length)>=0&&j.forEach(J=>w[J]=!0))}F||(F=this.validationMessage),this.setValidity(w,F,O)}};WebAwesomeFormAssociatedElement.formAssociated=!0;__decorateClass([n$1({reflect:!0})],WebAwesomeFormAssociatedElement.prototype,"name",2);__decorateClass([n$1({type:Boolean})],WebAwesomeFormAssociatedElement.prototype,"disabled",2);__decorateClass([n$1({state:!0,attribute:!1})],WebAwesomeFormAssociatedElement.prototype,"valueHasChanged",2);__decorateClass([n$1({state:!0,attribute:!1})],WebAwesomeFormAssociatedElement.prototype,"hasInteracted",2);__decorateClass([n$1({attribute:"custom-error",reflect:!0})],WebAwesomeFormAssociatedElement.prototype,"customError",2);__decorateClass([n$1({attribute:!1,state:!0,type:Object})],WebAwesomeFormAssociatedElement.prototype,"validity",1);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var HasSlotController=class{constructor(T,...w){this.slotNames=[],this.handleSlotChange=O=>{const F=O.target;(this.slotNames.includes("[default]")&&!F.name||F.name&&this.slotNames.includes(F.name))&&this.host.requestUpdate()},(this.host=T).addController(this),this.slotNames=w}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(T=>{if(T.nodeType===Node.TEXT_NODE&&T.textContent.trim()!=="")return!0;if(T.nodeType===Node.ELEMENT_NODE){const w=T;if(w.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!w.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(T){var w,O;return((O=(w=this.host).querySelector)==null?void 0:O.call(w,`:scope > [slot="${T}"]`))!==null}test(T){return T==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(T)}hostConnected(){var T,w;(w=(T=this.host.shadowRoot)==null?void 0:T.addEventListener)==null||w.call(T,"slotchange",this.handleSlotChange)}hostDisconnected(){var T,w;(w=(T=this.host.shadowRoot)==null?void 0:T.removeEventListener)==null||w.call(T,"slotchange",this.handleSlotChange)}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var size_styles_default=i$6`
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
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function watch(T,w){const O={waitUntilFirstUpdate:!1,...w};return(F,W)=>{const{update:U}=F,q=Array.isArray(T)?T:[T];F.update=function(j){q.forEach(J=>{const X=J;if(j.has(X)){const Y=j.get(X),K=this[X];Y!==K&&(!O.waitUntilFirstUpdate||this.hasUpdated)&&this[W](Y,K)}}),U.call(this,j)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},e$3=T=>(...w)=>({_$litDirective$:T,values:w});let i$2=class{constructor(w){}get _$AU(){return this._$AM._$AU}_$AT(w,O,F){this._$Ct=w,this._$AM=O,this._$Ci=F}_$AS(w,O){return this.update(w,O)}update(w,O){return this.render(...O)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$2=e$3(class extends i$2{constructor(T){var w;if(super(T),T.type!==t.ATTRIBUTE||T.name!=="class"||((w=T.strings)==null?void 0:w.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(T){return" "+Object.keys(T).filter(w=>T[w]).join(" ")+" "}update(T,[w]){var F,W;if(this.st===void 0){this.st=new Set,T.strings!==void 0&&(this.nt=new Set(T.strings.join(" ").split(/\s/).filter(U=>U!=="")));for(const U in w)w[U]&&!((F=this.nt)!=null&&F.has(U))&&this.st.add(U);return this.render(w)}const O=T.element.classList;for(const U of this.st)U in w||(O.remove(U),this.st.delete(U));for(const U in w){const q=!!w[U];q===this.st.has(U)||(W=this.nt)!=null&&W.has(U)||(q?(O.add(U),this.st.add(U)):(O.remove(U),this.st.delete(U)))}return E}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$2=T=>T??A;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const a=Symbol.for(""),o$1=T=>{if((T==null?void 0:T.r)===a)return T==null?void 0:T._$litStatic$},i$1=(T,...w)=>({_$litStatic$:w.reduce((O,F,W)=>O+(U=>{if(U._$litStatic$!==void 0)return U._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${U}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(F)+T[W+1],T[0]),r:a}),l$2=new Map,n=T=>(w,...O)=>{const F=O.length;let W,U;const q=[],j=[];let J,X=0,Y=!1;for(;X<F;){for(J=w[X];X<F&&(U=O[X],(W=o$1(U))!==void 0);)J+=W+w[++X],Y=!0;X!==F&&j.push(U),q.push(J),X++}if(X===F&&q.push(w[F]),Y){const K=q.join("$$lit$$");(w=l$2.get(K))===void 0&&(q.raw=q,l$2.set(K,w=q)),O=j}return T(w,...O)},u=n(b);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaButton=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new HasSlotController(this,"[default]","start","end"),this.localize=new LocalizeController(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="medium",this.withCaret=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,MirrorValidator()]}constructLightDOMButton(){const T=document.createElement("button");for(const w of this.attributes)w.name!=="style"&&T.setAttribute(w.name,w.value);return T.type=this.type,T.style.position="absolute !important",T.style.width="0 !important",T.style.height="0 !important",T.style.clipPath="inset(50%) !important",T.style.overflow="hidden !important",T.style.whiteSpace="nowrap !important",this.name&&(T.name=this.name),T.value=this.value||"",T}handleClick(T){var F;if(this.disabled||this.loading){T.preventDefault(),T.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;const O=this.constructLightDOMButton();(F=this.parentElement)==null||F.append(O),O.click(),O.remove()}handleInvalid(){this.dispatchEvent(new WaInvalidEvent)}handleLabelSlotChange(){const T=this.labelSlot.assignedNodes({flatten:!0});let w=!1,O=!1,F=!1,W=!1;[...T].forEach(U=>{var q;if(U.nodeType===Node.ELEMENT_NODE){const j=U;j.localName==="wa-icon"?(O=!0,w||(w=j.label!==void 0)):W=!0}else U.nodeType===Node.TEXT_NODE&&(((q=U.textContent)==null?void 0:q.trim())||"").length>0&&(F=!0)}),this.isIconButton=O&&!F&&!W,this.isIconButton&&!w&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.updateValidity()}setValue(...T){}click(){this.button.click()}focus(T){this.button.focus(T)}blur(){this.button.blur()}render(){const T=this.isLink(),w=T?i$1`a`:i$1`button`;return u`
      <${w}
        part="base"
        class=${e$2({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start"),"has-end":this.hasSlotController.test("end"),"is-icon-button":this.isIconButton})}
        ?disabled=${o$2(T?void 0:this.disabled)}
        type=${o$2(T?void 0:this.type)}
        title=${this.title}
        name=${o$2(T?void 0:this.name)}
        value=${o$2(T?void 0:this.value)}
        href=${o$2(T?this.href:void 0)}
        target=${o$2(T?this.target:void 0)}
        download=${o$2(T?this.download:void 0)}
        rel=${o$2(T&&this.rel?this.rel:void 0)}
        role=${o$2(T?void 0:"button")}
        aria-disabled=${o$2(T&&this.disabled?"true":void 0)}
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
      </${w}>
    `}};WaButton.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0};WaButton.css=[button_styles_default,variants_styles_default,size_styles_default];__decorateClass([e$4(".button")],WaButton.prototype,"button",2);__decorateClass([e$4("slot:not([name])")],WaButton.prototype,"labelSlot",2);__decorateClass([r$2()],WaButton.prototype,"invalid",2);__decorateClass([r$2()],WaButton.prototype,"isIconButton",2);__decorateClass([n$1()],WaButton.prototype,"title",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"appearance",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"size",2);__decorateClass([n$1({attribute:"with-caret",type:Boolean,reflect:!0})],WaButton.prototype,"withCaret",2);__decorateClass([n$1({type:Boolean})],WaButton.prototype,"disabled",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaButton.prototype,"loading",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaButton.prototype,"pill",2);__decorateClass([n$1()],WaButton.prototype,"type",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"name",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"value",2);__decorateClass([n$1({reflect:!0})],WaButton.prototype,"href",2);__decorateClass([n$1()],WaButton.prototype,"target",2);__decorateClass([n$1()],WaButton.prototype,"rel",2);__decorateClass([n$1()],WaButton.prototype,"download",2);__decorateClass([n$1({attribute:"formaction"})],WaButton.prototype,"formAction",2);__decorateClass([n$1({attribute:"formenctype"})],WaButton.prototype,"formEnctype",2);__decorateClass([n$1({attribute:"formmethod"})],WaButton.prototype,"formMethod",2);__decorateClass([n$1({attribute:"formnovalidate",type:Boolean})],WaButton.prototype,"formNoValidate",2);__decorateClass([n$1({attribute:"formtarget"})],WaButton.prototype,"formTarget",2);__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],WaButton.prototype,"handleDisabledChange",1);WaButton=__decorateClass([t$1("wa-button")],WaButton);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var spinner_styles_default=i$6`
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
 */const l$1=(T,w)=>(T==null?void 0:T._$litType$)!==void 0,r$1=T=>T.strings===void 0,m={},p=(T,w=m)=>T._$AH=w;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var CACHEABLE_ERROR=Symbol(),RETRYABLE_ERROR=Symbol(),parser,iconCache=new Map,WaIcon=class extends WebAwesomeElement{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(T,w)=>{var F;let O;if(w!=null&&w.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=b`<svg part="svg">
        <use part="use" href="${T}"></use>
      </svg>`,await this.updateComplete;const W=this.shadowRoot.querySelector("[part='svg']");return typeof w.mutator=="function"&&w.mutator(W,this),this.svg}try{if(O=await fetch(T,{mode:"cors"}),!O.ok)return O.status===410?CACHEABLE_ERROR:RETRYABLE_ERROR}catch{return RETRYABLE_ERROR}try{const W=document.createElement("div");W.innerHTML=await O.text();const U=W.firstElementChild;if(((F=U==null?void 0:U.tagName)==null?void 0:F.toLowerCase())!=="svg")return CACHEABLE_ERROR;parser||(parser=new DOMParser);const j=parser.parseFromString(U.outerHTML,"text/html").body.querySelector("svg");return j?(j.part.add("svg"),document.adoptNode(j)):CACHEABLE_ERROR}catch{return CACHEABLE_ERROR}}}connectedCallback(){super.connectedCallback(),watchIcon(this)}firstUpdated(T){super.firstUpdated(T),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),unwatchIcon(this)}getIconSource(){const T=getIconLibrary(this.library),w=this.family||getDefaultIconFamily();return this.name&&T?{url:T.resolver(this.name,w,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var U;const{url:T,fromLibrary:w}=this.getIconSource(),O=w?getIconLibrary(this.library):void 0;if(!T){this.svg=null;return}let F=iconCache.get(T);F||(F=this.resolveIcon(T,O),iconCache.set(T,F));const W=await F;if(W===RETRYABLE_ERROR&&iconCache.delete(T),T===this.getIconSource().url){if(l$1(W)){this.svg=W;return}switch(W){case RETRYABLE_ERROR:case CACHEABLE_ERROR:this.svg=null,this.dispatchEvent(new WaErrorEvent);break;default:this.svg=W.cloneNode(!0),(U=O==null?void 0:O.mutator)==null||U.call(O,this.svg,this),this.dispatchEvent(new WaLoadEvent)}}}updated(T){var F,W;super.updated(T);const w=getIconLibrary(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);const O=(F=this.shadowRoot)==null?void 0:F.querySelector("svg");O&&((W=w==null?void 0:w.mutator)==null||W.call(w,O,this))}render(){return this.hasUpdated?this.svg:b`<svg part="svg" width="16" height="16"></svg>`}};WaIcon.css=icon_styles_default;__decorateClass([r$2()],WaIcon.prototype,"svg",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"name",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"family",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"variant",2);__decorateClass([n$1({attribute:"auto-width",type:Boolean,reflect:!0})],WaIcon.prototype,"autoWidth",2);__decorateClass([n$1({attribute:"swap-opacity",type:Boolean,reflect:!0})],WaIcon.prototype,"swapOpacity",2);__decorateClass([n$1()],WaIcon.prototype,"src",2);__decorateClass([n$1()],WaIcon.prototype,"label",2);__decorateClass([n$1({reflect:!0})],WaIcon.prototype,"library",2);__decorateClass([n$1({type:Number,reflect:!0})],WaIcon.prototype,"rotate",2);__decorateClass([n$1({type:String,reflect:!0})],WaIcon.prototype,"flip",2);__decorateClass([n$1({type:String,reflect:!0})],WaIcon.prototype,"animation",2);__decorateClass([watch("label")],WaIcon.prototype,"handleLabelChange",1);__decorateClass([watch(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],WaIcon.prototype,"setIcon",1);WaIcon=__decorateClass([t$1("wa-icon")],WaIcon);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var card_styles_default=i$6`
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
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function getOffset(T,w){return{top:Math.round(T.getBoundingClientRect().top-w.getBoundingClientRect().top),left:Math.round(T.getBoundingClientRect().left-w.getBoundingClientRect().left)}}var locks=new Set;function getScrollbarWidth(){const T=document.documentElement.clientWidth;return Math.abs(window.innerWidth-T)}function getExistingBodyPadding(){const T=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(T)||!T?0:T}function lockBodyScrolling(T){if(locks.add(T),!document.documentElement.classList.contains("wa-scroll-lock")){const w=getScrollbarWidth()+getExistingBodyPadding();let O=getComputedStyle(document.documentElement).scrollbarGutter;(!O||O==="auto")&&(O="stable"),w<2&&(O=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",O),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${w}px`)}}function unlockBodyScrolling(T){locks.delete(T),locks.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}function scrollIntoView(T,w,O="vertical",F="smooth"){const W=getOffset(T,w),U=W.top+w.scrollTop,q=W.left+w.scrollLeft,j=w.scrollLeft,J=w.scrollLeft+w.offsetWidth,X=w.scrollTop,Y=w.scrollTop+w.offsetHeight;(O==="horizontal"||O==="both")&&(q<j?w.scrollTo({left:q,behavior:F}):q+T.clientWidth>J&&w.scrollTo({left:q-w.offsetWidth+T.clientWidth,behavior:F})),(O==="vertical"||O==="both")&&(U<X?w.scrollTo({top:U,behavior:F}):U+T.clientHeight>Y&&w.scrollTo({top:U-w.offsetHeight+T.clientHeight,behavior:F}))}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function parseSpaceDelimitedTokens(T){return T.split(" ").map(w=>w.trim()).filter(w=>w!=="")}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var dismissibleStack=[];function registerDismissible(T){dismissibleStack.push(T)}function unregisterDismissible(T){for(let w=dismissibleStack.length-1;w>=0;w--)if(dismissibleStack[w]===T){dismissibleStack.splice(w,1);break}}function isTopDismissible(T){return dismissibleStack.length>0&&dismissibleStack[dismissibleStack.length-1]===T}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaShowEvent=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaHideEvent=class extends Event{constructor(T){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=T}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaAfterHideEvent=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaAfterShowEvent=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function animateWithClass(T,w){return new Promise(O=>{const F=new AbortController,{signal:W}=F;if(T.classList.contains(w))return;T.classList.add(w);let U=!1,q=()=>{U||(U=!0,T.classList.remove(w),O(),F.abort())};T.addEventListener("animationend",q,{once:!0,signal:W}),T.addEventListener("animationcancel",q,{once:!0,signal:W}),requestAnimationFrame(()=>{!U&&T.getAnimations().length===0&&q()})})}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaDrawer=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.hasSlotController=new HasSlotController(this,"footer","header-actions","label"),this.open=!1,this.label="",this.placement="end",this.withoutHeader=!1,this.lightDismiss=!0,this.handleDocumentKeyDown=T=>{T.key==="Escape"&&this.open&&isTopDismissible(this)&&(T.preventDefault(),T.stopPropagation(),this.requestClose(this.drawer))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.drawer.showModal(),lockBodyScrolling(this))}disconnectedCallback(){super.disconnectedCallback(),unlockBodyScrolling(this),this.removeOpenListeners()}async requestClose(T){const w=new WaHideEvent({source:T});if(this.dispatchEvent(w),w.defaultPrevented){this.open=!0,animateWithClass(this.drawer,"pulse");return}this.removeOpenListeners(),await animateWithClass(this.drawer,"hide"),this.open=!1,this.drawer.close(),unlockBodyScrolling(this);const O=this.originalTrigger;typeof(O==null?void 0:O.focus)=="function"&&setTimeout(()=>O.focus()),this.dispatchEvent(new WaAfterHideEvent)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),registerDismissible(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this)}handleDialogCancel(T){T.preventDefault(),!this.drawer.classList.contains("hide")&&T.target===this.drawer&&isTopDismissible(this)&&this.requestClose(this.drawer)}handleDialogClick(T){const O=T.target.closest('[data-drawer="close"]');O&&(T.stopPropagation(),this.requestClose(O))}async handleDialogPointerDown(T){T.target===this.drawer&&(this.lightDismiss?this.requestClose(this.drawer):await animateWithClass(this.drawer,"pulse"))}handleOpenChange(){this.open&&!this.drawer.open?this.show():this.drawer.open&&(this.open=!0,this.requestClose(this.drawer))}async show(){const T=new WaShowEvent;if(this.dispatchEvent(T),T.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.drawer.showModal(),lockBodyScrolling(this),requestAnimationFrame(()=>{const w=this.querySelector("[autofocus]");w&&typeof w.focus=="function"?w.focus():this.drawer.focus()}),await animateWithClass(this.drawer,"show"),this.dispatchEvent(new WaAfterShowEvent)}render(){const T=!this.withoutHeader,w=this.hasSlotController.test("footer");return b`
      <dialog
        part="dialog"
        class=${e$2({drawer:!0,open:this.open,top:this.placement==="top",end:this.placement==="end",bottom:this.placement==="bottom",start:this.placement==="start"})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${T?b`
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

        ${w?b`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};WaDrawer.css=drawer_styles_default;__decorateClass([e$4(".drawer")],WaDrawer.prototype,"drawer",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaDrawer.prototype,"open",2);__decorateClass([n$1({reflect:!0})],WaDrawer.prototype,"label",2);__decorateClass([n$1({reflect:!0})],WaDrawer.prototype,"placement",2);__decorateClass([n$1({attribute:"without-header",type:Boolean,reflect:!0})],WaDrawer.prototype,"withoutHeader",2);__decorateClass([n$1({attribute:"light-dismiss",type:Boolean})],WaDrawer.prototype,"lightDismiss",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaDrawer.prototype,"handleOpenChange",1);WaDrawer=__decorateClass([t$1("wa-drawer")],WaDrawer);document.addEventListener("click",T=>{const w=T.target.closest("[data-drawer]");if(w instanceof Element){const[O,F]=parseSpaceDelimitedTokens(w.getAttribute("data-drawer")||"");if(O==="open"&&(F!=null&&F.length)){const U=w.getRootNode().getElementById(F);(U==null?void 0:U.localName)==="wa-drawer"?U.open=!0:console.warn(`A drawer with an ID of "${F}" could not be found in this document.`)}}}),document.body.addEventListener("pointerdown",()=>{});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var dialog_styles_default=i$6`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
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
    font-family: inherit;
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
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
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
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
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
    .dialog {
      border: solid 1px white;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaDialog=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.hasSlotController=new HasSlotController(this,"footer","header-actions","label"),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.handleDocumentKeyDown=T=>{T.key==="Escape"&&this.open&&isTopDismissible(this)&&(T.preventDefault(),T.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(){this.open&&(this.addOpenListeners(),this.dialog.showModal(),lockBodyScrolling(this))}disconnectedCallback(){super.disconnectedCallback(),unlockBodyScrolling(this),this.removeOpenListeners()}async requestClose(T){const w=new WaHideEvent({source:T});if(this.dispatchEvent(w),w.defaultPrevented){this.open=!0,animateWithClass(this.dialog,"pulse");return}this.removeOpenListeners(),await animateWithClass(this.dialog,"hide"),this.open=!1,this.dialog.close(),unlockBodyScrolling(this);const O=this.originalTrigger;typeof(O==null?void 0:O.focus)=="function"&&setTimeout(()=>O.focus()),this.dispatchEvent(new WaAfterHideEvent)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),registerDismissible(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this)}handleDialogCancel(T){T.preventDefault(),!this.dialog.classList.contains("hide")&&T.target===this.dialog&&isTopDismissible(this)&&this.requestClose(this.dialog)}handleDialogClick(T){const O=T.target.closest('[data-dialog="close"]');O&&(T.stopPropagation(),this.requestClose(O))}async handleDialogPointerDown(T){T.target===this.dialog&&(this.lightDismiss?this.requestClose(this.dialog):await animateWithClass(this.dialog,"pulse"))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open&&(this.open=!0,this.requestClose(this.dialog))}async show(){const T=new WaShowEvent;if(this.dispatchEvent(T),T.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),lockBodyScrolling(this),requestAnimationFrame(()=>{const w=this.querySelector("[autofocus]");w&&typeof w.focus=="function"?w.focus():this.dialog.focus()}),await animateWithClass(this.dialog,"show"),this.dispatchEvent(new WaAfterShowEvent)}render(){const T=!this.withoutHeader,w=this.hasSlotController.test("footer");return b`
      <dialog
        part="dialog"
        class=${e$2({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${T?b`
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

        ${w?b`
              <footer part="footer" class="footer">
                <slot name="footer"></slot>
              </footer>
            `:""}
      </dialog>
    `}};WaDialog.css=dialog_styles_default;__decorateClass([e$4(".dialog")],WaDialog.prototype,"dialog",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaDialog.prototype,"open",2);__decorateClass([n$1({reflect:!0})],WaDialog.prototype,"label",2);__decorateClass([n$1({attribute:"without-header",type:Boolean,reflect:!0})],WaDialog.prototype,"withoutHeader",2);__decorateClass([n$1({attribute:"light-dismiss",type:Boolean})],WaDialog.prototype,"lightDismiss",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaDialog.prototype,"handleOpenChange",1);WaDialog=__decorateClass([t$1("wa-dialog")],WaDialog);document.addEventListener("click",T=>{const w=T.target.closest("[data-dialog]");if(w instanceof Element){const[O,F]=parseSpaceDelimitedTokens(w.getAttribute("data-dialog")||"");if(O==="open"&&(F!=null&&F.length)){const U=w.getRootNode().getElementById(F);(U==null?void 0:U.localName)==="wa-dialog"?U.open=!0:console.warn(`A dialog with an ID of "${F}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaClearEvent=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function submitOnEnter(T,w){const O=T.metaKey||T.ctrlKey||T.shiftKey||T.altKey;T.key==="Enter"&&!O&&setTimeout(()=>{!T.defaultPrevented&&!T.isComposing&&submitForm(w)})}function submitForm(T){let w=null;if("form"in T&&(w=T.form),!w&&"getForm"in T&&(w=T.getForm()),!w)return;const O=[...w.elements];if(O.length===1){w.requestSubmit(null);return}const F=O.find(W=>W.type==="submit"&&!W.matches(":disabled"));F&&(["input","button"].includes(F.localName)?w.requestSubmit(F):F.click())}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var input_styles_default=i$6`
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
 */const l=e$3(class extends i$2{constructor(T){if(super(T),T.type!==t.PROPERTY&&T.type!==t.ATTRIBUTE&&T.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!r$1(T))throw Error("`live` bindings can only contain a single expression")}render(T){return T}update(T,[w]){if(w===E||w===A)return w;const O=T.element,F=T.name;if(T.type===t.PROPERTY){if(w===O[F])return E}else if(T.type===t.BOOLEAN_ATTRIBUTE){if(!!w===O.hasAttribute(F))return E}else if(T.type===t.ATTRIBUTE&&O.getAttribute(F)===w+"")return E;return p(T),w}});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaInput=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="medium",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(T){this._value!==T&&(this.valueHasChanged=!0,this._value=T)}handleChange(T){this.value=this.input.value,this.relayNativeEvent(T,{bubbles:!0,composed:!0})}handleClearClick(T){T.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new WaClearEvent),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(T){submitOnEnter(T,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(T){super.updated(T),(T.has("value")||T.has("defaultValue"))&&(this.customStates.set("blank",!this.value),this.updateValidity())}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(T){this.input.focus(T)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(T,w,O="none"){this.input.setSelectionRange(T,w,O)}setRangeText(T,w,O,F="preserve"){const W=w??this.input.selectionStart,U=O??this.input.selectionEnd;this.input.setRangeText(T,W,U,F),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){const T=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,w=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,O=this.label?!0:!!T,F=this.hint?!0:!!w,W=this.withClear&&!this.disabled&&!this.readonly,U=this.hasUpdated&&W&&(typeof this.value=="number"||this.value&&this.value.length>0);return b`
      <label
        part="form-control-label label"
        class=${e$2({label:!0,"has-label":O})}
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
          name=${o$2(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o$2(this.placeholder)}
          minlength=${o$2(this.minlength)}
          maxlength=${o$2(this.maxlength)}
          min=${o$2(this.min)}
          max=${o$2(this.max)}
          step=${o$2(this.step)}
          .value=${l(this.value??"")}
          autocapitalize=${o$2(this.autocapitalize)}
          autocomplete=${o$2(this.autocomplete)}
          autocorrect=${o$2(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${o$2(this.pattern)}
          enterkeyhint=${o$2(this.enterkeyhint)}
          inputmode=${o$2(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${U?b`
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
        class=${e$2({"has-slotted":F})}
        aria-hidden=${F?"false":"true"}
        >${this.hint}</slot
      >
    `}};WaInput.css=[size_styles_default,form_control_styles_default,input_styles_default];WaInput.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0};__decorateClass([e$4("input")],WaInput.prototype,"input",2);__decorateClass([n$1()],WaInput.prototype,"title",2);__decorateClass([n$1({reflect:!0})],WaInput.prototype,"type",2);__decorateClass([r$2()],WaInput.prototype,"value",1);__decorateClass([n$1({attribute:"value",reflect:!0})],WaInput.prototype,"defaultValue",2);__decorateClass([n$1({reflect:!0})],WaInput.prototype,"size",2);__decorateClass([n$1({reflect:!0})],WaInput.prototype,"appearance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaInput.prototype,"pill",2);__decorateClass([n$1()],WaInput.prototype,"label",2);__decorateClass([n$1({attribute:"hint"})],WaInput.prototype,"hint",2);__decorateClass([n$1({attribute:"with-clear",type:Boolean})],WaInput.prototype,"withClear",2);__decorateClass([n$1()],WaInput.prototype,"placeholder",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaInput.prototype,"readonly",2);__decorateClass([n$1({attribute:"password-toggle",type:Boolean})],WaInput.prototype,"passwordToggle",2);__decorateClass([n$1({attribute:"password-visible",type:Boolean})],WaInput.prototype,"passwordVisible",2);__decorateClass([n$1({attribute:"without-spin-buttons",type:Boolean})],WaInput.prototype,"withoutSpinButtons",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaInput.prototype,"required",2);__decorateClass([n$1()],WaInput.prototype,"pattern",2);__decorateClass([n$1({type:Number})],WaInput.prototype,"minlength",2);__decorateClass([n$1({type:Number})],WaInput.prototype,"maxlength",2);__decorateClass([n$1()],WaInput.prototype,"min",2);__decorateClass([n$1()],WaInput.prototype,"max",2);__decorateClass([n$1()],WaInput.prototype,"step",2);__decorateClass([n$1()],WaInput.prototype,"autocapitalize",2);__decorateClass([n$1()],WaInput.prototype,"autocorrect",2);__decorateClass([n$1()],WaInput.prototype,"autocomplete",2);__decorateClass([n$1({type:Boolean})],WaInput.prototype,"autofocus",2);__decorateClass([n$1()],WaInput.prototype,"enterkeyhint",2);__decorateClass([n$1({type:Boolean,converter:{fromAttribute:T=>!(!T||T==="false"),toAttribute:T=>T?"true":"false"}})],WaInput.prototype,"spellcheck",2);__decorateClass([n$1()],WaInput.prototype,"inputmode",2);__decorateClass([n$1({attribute:"with-label",type:Boolean})],WaInput.prototype,"withLabel",2);__decorateClass([n$1({attribute:"with-hint",type:Boolean})],WaInput.prototype,"withHint",2);__decorateClass([watch("step",{waitUntilFirstUpdate:!0})],WaInput.prototype,"handleStepChange",1);WaInput=__decorateClass([t$1("wa-input")],WaInput);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var option_styles_default=i$6`
  :host {
    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    line-height: var(--wa-line-height-condensed);
    transition: fill var(--wa-transition-normal) var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not([disabled], :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host([disabled]:state(current)) {
    background-color: var(--wa-color-brand-fill-loud);
    color: var(--wa-color-brand-on-loud);
    opacity: 1;
  }

  :host([disabled]) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function getText(T,w=0){if(!T||!globalThis.Node)return"";if(typeof T[Symbol.iterator]=="function")return(Array.isArray(T)?T:[...T]).map(W=>getText(W,--w)).join("");let O=T;if(O.nodeType===Node.TEXT_NODE)return O.textContent??"";if(O.nodeType===Node.ELEMENT_NODE){let F=O;if(F.hasAttribute("slot")||F.matches("style, script"))return"";if(F instanceof HTMLSlotElement){let W=F.assignedNodes({flatten:!0});if(W.length>0)return getText(W,--w)}return w>-1?getText(F,--w):F.textContent??""}return O.hasChildNodes()?getText(O.childNodes,--w):""}var WaOption=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.isInitialized=!1,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.defaultLabel="",this.handleHover=T=>{T.type==="mouseenter"?this.customStates.set("hover",!0):T.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(T){const w=this._label;this._label=T||"",this._label!==w&&this.requestUpdate("label",w)}get label(){return this._label?this._label:(this.defaultLabel||this.updateDefaultLabel(),this.defaultLabel)}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover),this.updateDefaultLabel()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.updateDefaultLabel(),this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{var w;const T=this.closest("wa-select");T&&(T.handleDefaultSlotChange(),(w=T.selectionChanged)==null||w.call(T))}),customElements.whenDefined("wa-combobox").then(()=>{var w;const T=this.closest("wa-combobox");T&&(T.handleDefaultSlotChange(),(w=T.selectionChanged)==null||w.call(T))})):this.isInitialized=!0}willUpdate(T){var w;if(T.has("defaultSelected")&&!((w=this.closest("wa-combobox, wa-select"))!=null&&w.hasInteracted)&&this.defaultSelected){const O=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",O)}super.willUpdate(T)}updated(T){super.updated(T),T.has("disabled")&&this.setAttribute("aria-disabled",this.disabled?"true":"false"),T.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected),this.handleDefaultSlotChange()),T.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),T.has("current")&&this.customStates.set("current",this.current)}firstUpdated(T){var w;if(super.firstUpdated(T),this.selected&&!this.defaultSelected){const O=this.closest("wa-select, wa-combobox");O&&!O.hasInteracted&&((w=O.selectionChanged)==null||w.call(O))}}updateDefaultLabel(){let T=this.defaultLabel;this.defaultLabel=getText(this).trim();let w=this.defaultLabel!==T;return!this._label&&w&&this.requestUpdate("label",T),w}render(){return b`
      <wa-icon
        part="checked-icon"
        class="check"
        name="check"
        library="system"
        variant="solid"
        aria-hidden="true"
      ></wa-icon>
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};WaOption.css=option_styles_default;__decorateClass([e$4(".label")],WaOption.prototype,"defaultSlot",2);__decorateClass([r$2()],WaOption.prototype,"current",2);__decorateClass([n$1({reflect:!0})],WaOption.prototype,"value",2);__decorateClass([n$1({type:Boolean})],WaOption.prototype,"disabled",2);__decorateClass([n$1({type:Boolean,attribute:!1})],WaOption.prototype,"selected",2);__decorateClass([n$1({type:Boolean,attribute:"selected"})],WaOption.prototype,"defaultSelected",2);__decorateClass([n$1()],WaOption.prototype,"label",1);__decorateClass([r$2()],WaOption.prototype,"defaultLabel",2);WaOption=__decorateClass([t$1("wa-option")],WaOption);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var select_styles_default=i$6`
  :host {
    --tag-max-size: 10ch;
    --show-duration: 100ms;
    --hide-duration: 100ms;
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border var(--wa-transition-normal),
      outline var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    :host([multiple]) .select:not(.placeholder-visible) & {
      padding-inline-start: 0;
      padding-block: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));
    }

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .select:not(.placeholder-visible) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: 0.25em;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .start::slotted(*) {
    margin-inline: var(--wa-form-control-padding-inline);
  }

  /* Clear button */
  [part~='clear-button'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    margin-inline-start: var(--wa-form-control-padding-inline);

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) ease;
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding-block: 0.5em;
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var RequiredValidator=(T={})=>{let{validationElement:w,validationProperty:O}=T;w||(w=Object.assign(document.createElement("input"),{required:!0})),O||(O="value");const F={observedAttributes:["required"],message:w.validationMessage,checkValidity(W){const U={message:"",isValid:!0,invalidKeys:[]};return(W.required??W.hasAttribute("required"))&&!W[O]&&(U.message=typeof F.message=="function"?F.message(W):F.message||"",U.isValid=!1,U.invalidKeys.push("valueMissing")),U}};return F};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function waitForEvent(T,w){return new Promise(O=>{function F(W){W.target===T&&(T.removeEventListener(w,F),O())}T.addEventListener(w,F)})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let e$1=class extends i$2{constructor(w){if(super(w),this.it=A,w.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(w){if(w===A||w==null)return this._t=void 0,this.it=w;if(w===E)return w;if(typeof w!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(w===this.it)return this._t;this.it=w;const O=[w];return O.raw=O,this._t={_$litType$:this.constructor.resultType,strings:O,values:[]}}};e$1.directiveName="unsafeHTML",e$1.resultType=1;const o=e$3(e$1);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaSelect=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.localize=new LocalizeController(this),this.selectionOrder=new Map,this.typeToSelectString="",this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=T=>b`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${T.value}
          @wa-remove=${w=>this.handleTagRemove(w,T)}
        >
          ${T.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=T=>{const w=T.composedPath();this&&!w.includes(this)&&this.hide()},this.handleDocumentKeyDown=T=>{var W;const w=T.target,O=w.closest('[part~="clear-button"]')!==null,F=w.closest("wa-button")!==null;if(!(O||F)){if(T.key==="Escape"&&this.open&&isTopDismissible(this)&&(T.preventDefault(),T.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),T.key==="Enter"||T.key===" "&&this.typeToSelectString===""){if(T.preventDefault(),T.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(T.key)){const U=this.getAllOptions(),q=U.indexOf(this.currentOption);let j=Math.max(0,q);if(T.preventDefault(),!this.open&&(this.show(),this.currentOption))return;T.key==="ArrowDown"?(j=q+1,j>U.length-1&&(j=0)):T.key==="ArrowUp"?(j=q-1,j<0&&(j=U.length-1)):T.key==="Home"?j=0:T.key==="End"&&(j=U.length-1),this.setCurrentOption(U[j])}if(((W=T.key)==null?void 0:W.length)===1||T.key==="Backspace"){const U=this.getAllOptions();if(T.metaKey||T.ctrlKey||T.altKey)return;if(!this.open){if(T.key==="Backspace")return;this.show()}T.stopPropagation(),T.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),T.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=T.key.toLowerCase();for(const q of U)if(q.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(q);break}}}},this.handleDocumentMouseDown=T=>{const w=T.composedPath();this&&!w.includes(this)&&this.hide()}}static get validators(){const T=[RequiredValidator({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...T]}get validationTarget(){return this.valueInput}set defaultValue(T){this._defaultValue=this.convertDefaultValue(T)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}convertDefaultValue(T){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(T)&&(T=T[0]),T}set value(T){let w=this.value;T instanceof FormData&&(T=T.getAll(this.name)),T!=null&&!Array.isArray(T)&&(T=[T]),this._value=T??null,this.value!==w&&(this.valueHasChanged=!0,this.requestUpdate("value",w))}get value(){let T=this._value??this.defaultValue??null;T!=null&&(T=Array.isArray(T)?T:[T]),T==null?this.optionValues=new Set(null):this.optionValues=new Set(this.getAllOptions().filter(O=>!O.disabled).map(O=>O.value));let w=T;return T!=null&&(w=T.filter(O=>this.optionValues.has(O)),w=this.multiple?w:w[0],w=w??null),w}connectedCallback(){super.connectedCallback(),this.handleDefaultSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners()}updateDefaultValue(){const w=this.getAllOptions().filter(O=>O.hasAttribute("selected")||O.defaultSelected);if(w.length>0){const O=w.map(F=>F.value);this._defaultValue=this.multiple?O:O[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),registerDismissible(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),unregisterDismissible(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(T){T.preventDefault()}handleComboboxMouseDown(T){const O=T.composedPath().some(F=>F instanceof Element&&F.tagName.toLowerCase()==="wa-button");this.disabled||O||(T.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(T){T.stopPropagation(),this.handleDocumentKeyDown(T)}handleClearClick(T){T.stopPropagation(),this.value!==null&&(this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new WaClearEvent),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(T){T.stopPropagation(),T.preventDefault()}handleOptionClick(T){const O=T.target.closest("wa-option");O&&!O.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(O):this.setSelectedOptions(O),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange());const T=this.getAllOptions();this.optionValues=void 0,this.updateDefaultValue();let w=this.value;if(w==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(w)||(w=[w]);const O=T.filter(F=>w.includes(F.value));this.setSelectedOptions(O)}handleTagRemove(T,w){if(T.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let O=w;if(!O){const F=T.target.closest("wa-tag[data-value]");if(F){const W=F.dataset.value;O=this.selectedOptions.find(U=>U.value===W)}}O&&(this.toggleOptionSelection(O,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this!=null&&this.querySelectorAll?[...this.querySelectorAll("wa-option")]:[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(T){this.getAllOptions().forEach(O=>{O.current=!1,O.tabIndex=-1}),T&&(this.currentOption=T,T.current=!0,T.tabIndex=0,T.focus({preventScroll:!0}))}setSelectedOptions(T){const w=this.getAllOptions(),O=Array.isArray(T)?T:[T];w.forEach(F=>{O.includes(F)||(F.selected=!1)}),O.length&&O.forEach(F=>F.selected=!0),this.selectionChanged()}toggleOptionSelection(T,w){w===!0||w===!1?T.selected=w:T.selected=!T.selected,this.selectionChanged()}selectionChanged(){var q,j,J;const w=this.getAllOptions().filter(X=>{if(!this.hasInteracted&&!this.valueHasChanged){const Y=this.defaultValue,K=Array.isArray(Y)?Y:[Y];return X.hasAttribute("selected")||X.defaultSelected||X.selected||(K==null?void 0:K.includes(X.value))}return X.selected}),O=new Set(w.map(X=>X.value));for(const X of this.selectionOrder.keys())O.has(X)||this.selectionOrder.delete(X);let W=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(const X of w)this.selectionOrder.has(X.value)||this.selectionOrder.set(X.value,W++);this.selectedOptions=w.sort((X,Y)=>{const K=this.selectionOrder.get(X.value)??0,G=this.selectionOrder.get(Y.value)??0;return K-G});let U=new Set(this.selectedOptions.map(X=>X.value));if(U.size>0||this._value){const X=this._value;if(this._value==null){let Y=this.defaultValue??[];this._value=Array.isArray(Y)?Y:[Y]}this._value=((q=this._value)==null?void 0:q.filter(Y=>{var K;return!((K=this.optionValues)!=null&&K.has(Y))}))??null,(j=this._value)==null||j.unshift(...U),this.requestUpdate("value",X)}if(this.multiple)this.placeholder&&!((J=this.value)!=null&&J.length)?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const X=this.selectedOptions[0];this.displayLabel=(X==null?void 0:X.label)??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((T,w)=>{if(w<this.maxOptionsVisible||this.maxOptionsVisible<=0){const O=this.getTag(T,w);return O?typeof O=="string"?o(O):O:null}else if(w===this.maxOptionsVisible)return b`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-w}</wa-tag
          >
        `;return null})}updated(T){super.updated(T),T.has("value")&&this.customStates.set("blank",!this.value)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){const T=this.getAllOptions(),w=Array.isArray(this.value)?this.value:[this.value],O=T.filter(F=>w.includes(F.value));this.setSelectedOptions(O),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());const T=new WaShowEvent;if(this.dispatchEvent(T),T.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await animateWithClass(this.popup.popup,"show"),this.currentOption&&scrollIntoView(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new WaAfterShowEvent)}else{const T=new WaHideEvent;if(this.dispatchEvent(T),T.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await animateWithClass(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new WaAfterHideEvent)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,waitForEvent(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,waitForEvent(this,"wa-after-hide")}focus(T){this.displayInput.focus(T)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){const T=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,w=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,O=this.label?!0:!!T,F=this.hint?!0:!!w,W=(this.hasUpdated||o$4)&&this.withClear&&!this.disabled&&this.value&&this.value.length>0,U=!!(this.placeholder&&(!this.value||this.value.length===0));return b`
      <div
        part="form-control"
        class=${e$2({"form-control":!0,"form-control-has-label":O})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${e$2({label:!0,"has-label":O})}
          aria-hidden=${O?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${e$2({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple,"placeholder-visible":U})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?b`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${W?b`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${e$2({"has-slotted":F})}
          aria-hidden=${F?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};WaSelect.css=[select_styles_default,form_control_styles_default,size_styles_default];__decorateClass([e$4(".select")],WaSelect.prototype,"popup",2);__decorateClass([e$4(".combobox")],WaSelect.prototype,"combobox",2);__decorateClass([e$4(".display-input")],WaSelect.prototype,"displayInput",2);__decorateClass([e$4(".value-input")],WaSelect.prototype,"valueInput",2);__decorateClass([e$4(".listbox")],WaSelect.prototype,"listbox",2);__decorateClass([r$2()],WaSelect.prototype,"displayLabel",2);__decorateClass([r$2()],WaSelect.prototype,"currentOption",2);__decorateClass([r$2()],WaSelect.prototype,"selectedOptions",2);__decorateClass([r$2()],WaSelect.prototype,"optionValues",2);__decorateClass([n$1({reflect:!0})],WaSelect.prototype,"name",2);__decorateClass([n$1({attribute:!1})],WaSelect.prototype,"defaultValue",1);__decorateClass([n$1({attribute:"value",reflect:!1})],WaSelect.prototype,"value",1);__decorateClass([n$1({reflect:!0})],WaSelect.prototype,"size",2);__decorateClass([n$1()],WaSelect.prototype,"placeholder",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaSelect.prototype,"multiple",2);__decorateClass([n$1({attribute:"max-options-visible",type:Number})],WaSelect.prototype,"maxOptionsVisible",2);__decorateClass([n$1({type:Boolean})],WaSelect.prototype,"disabled",2);__decorateClass([n$1({attribute:"with-clear",type:Boolean})],WaSelect.prototype,"withClear",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaSelect.prototype,"open",2);__decorateClass([n$1({reflect:!0})],WaSelect.prototype,"appearance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaSelect.prototype,"pill",2);__decorateClass([n$1()],WaSelect.prototype,"label",2);__decorateClass([n$1({reflect:!0})],WaSelect.prototype,"placement",2);__decorateClass([n$1({attribute:"hint"})],WaSelect.prototype,"hint",2);__decorateClass([n$1({attribute:"with-label",type:Boolean})],WaSelect.prototype,"withLabel",2);__decorateClass([n$1({attribute:"with-hint",type:Boolean})],WaSelect.prototype,"withHint",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaSelect.prototype,"required",2);__decorateClass([n$1({attribute:!1})],WaSelect.prototype,"getTag",2);__decorateClass([watch("disabled",{waitUntilFirstUpdate:!0})],WaSelect.prototype,"handleDisabledChange",1);__decorateClass([watch("value",{waitUntilFirstUpdate:!0})],WaSelect.prototype,"handleValueChange",1);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaSelect.prototype,"handleOpenChange",1);WaSelect=__decorateClass([t$1("wa-select")],WaSelect);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaRemoveEvent=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var tag_styles_default=i$6`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaTag=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.variant="neutral",this.appearance="filled-outlined",this.size="medium",this.pill=!1,this.withRemove=!1}handleRemoveClick(){this.dispatchEvent(new WaRemoveEvent)}render(){return b`
      <slot part="content" class="content"></slot>

      ${this.withRemove?b`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};WaTag.css=[tag_styles_default,variants_styles_default,size_styles_default];__decorateClass([n$1({reflect:!0})],WaTag.prototype,"variant",2);__decorateClass([n$1({reflect:!0})],WaTag.prototype,"appearance",2);__decorateClass([n$1({reflect:!0})],WaTag.prototype,"size",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTag.prototype,"pill",2);__decorateClass([n$1({attribute:"with-remove",type:Boolean})],WaTag.prototype,"withRemove",2);WaTag=__decorateClass([t$1("wa-tag")],WaTag);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaRepositionEvent=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var popup_styles_default=i$6`
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
`;const min=Math.min,max=Math.max,round=Math.round,floor=Math.floor,createCoords=T=>({x:T,y:T}),oppositeSideMap={left:"right",right:"left",bottom:"top",top:"bottom"};function clamp$1(T,w,O){return max(T,min(w,O))}function evaluate(T,w){return typeof T=="function"?T(w):T}function getSide(T){return T.split("-")[0]}function getAlignment(T){return T.split("-")[1]}function getOppositeAxis(T){return T==="x"?"y":"x"}function getAxisLength(T){return T==="y"?"height":"width"}function getSideAxis(T){const w=T[0];return w==="t"||w==="b"?"y":"x"}function getAlignmentAxis(T){return getOppositeAxis(getSideAxis(T))}function getAlignmentSides(T,w,O){O===void 0&&(O=!1);const F=getAlignment(T),W=getAlignmentAxis(T),U=getAxisLength(W);let q=W==="x"?F===(O?"end":"start")?"right":"left":F==="start"?"bottom":"top";return w.reference[U]>w.floating[U]&&(q=getOppositePlacement(q)),[q,getOppositePlacement(q)]}function getExpandedPlacements(T){const w=getOppositePlacement(T);return[getOppositeAlignmentPlacement(T),w,getOppositeAlignmentPlacement(w)]}function getOppositeAlignmentPlacement(T){return T.includes("start")?T.replace("start","end"):T.replace("end","start")}const lrPlacement=["left","right"],rlPlacement=["right","left"],tbPlacement=["top","bottom"],btPlacement=["bottom","top"];function getSideList(T,w,O){switch(T){case"top":case"bottom":return O?w?rlPlacement:lrPlacement:w?lrPlacement:rlPlacement;case"left":case"right":return w?tbPlacement:btPlacement;default:return[]}}function getOppositeAxisPlacements(T,w,O,F){const W=getAlignment(T);let U=getSideList(getSide(T),O==="start",F);return W&&(U=U.map(q=>q+"-"+W),w&&(U=U.concat(U.map(getOppositeAlignmentPlacement)))),U}function getOppositePlacement(T){const w=getSide(T);return oppositeSideMap[w]+T.slice(w.length)}function expandPaddingObject(T){return{top:0,right:0,bottom:0,left:0,...T}}function getPaddingObject(T){return typeof T!="number"?expandPaddingObject(T):{top:T,right:T,bottom:T,left:T}}function rectToClientRect(T){const{x:w,y:O,width:F,height:W}=T;return{width:F,height:W,top:O,left:w,right:w+F,bottom:O+W,x:w,y:O}}function computeCoordsFromPlacement(T,w,O){let{reference:F,floating:W}=T;const U=getSideAxis(w),q=getAlignmentAxis(w),j=getAxisLength(q),J=getSide(w),X=U==="y",Y=F.x+F.width/2-W.width/2,K=F.y+F.height/2-W.height/2,G=F[j]/2-W[j]/2;let ee;switch(J){case"top":ee={x:Y,y:F.y-W.height};break;case"bottom":ee={x:Y,y:F.y+F.height};break;case"right":ee={x:F.x+F.width,y:K};break;case"left":ee={x:F.x-W.width,y:K};break;default:ee={x:F.x,y:F.y}}switch(getAlignment(w)){case"start":ee[q]-=G*(O&&X?-1:1);break;case"end":ee[q]+=G*(O&&X?-1:1);break}return ee}async function detectOverflow(T,w){var O;w===void 0&&(w={});const{x:F,y:W,platform:U,rects:q,elements:j,strategy:J}=T,{boundary:X="clippingAncestors",rootBoundary:Y="viewport",elementContext:K="floating",altBoundary:G=!1,padding:ee=0}=evaluate(w,T),Q=getPaddingObject(ee),ae=j[G?K==="floating"?"reference":"floating":K],oe=rectToClientRect(await U.getClippingRect({element:(O=await(U.isElement==null?void 0:U.isElement(ae)))==null||O?ae:ae.contextElement||await(U.getDocumentElement==null?void 0:U.getDocumentElement(j.floating)),boundary:X,rootBoundary:Y,strategy:J})),ne=K==="floating"?{x:F,y:W,width:q.floating.width,height:q.floating.height}:q.reference,re=await(U.getOffsetParent==null?void 0:U.getOffsetParent(j.floating)),se=await(U.isElement==null?void 0:U.isElement(re))?await(U.getScale==null?void 0:U.getScale(re))||{x:1,y:1}:{x:1,y:1},ue=rectToClientRect(U.convertOffsetParentRelativeRectToViewportRelativeRect?await U.convertOffsetParentRelativeRectToViewportRelativeRect({elements:j,rect:ne,offsetParent:re,strategy:J}):ne);return{top:(oe.top-ue.top+Q.top)/se.y,bottom:(ue.bottom-oe.bottom+Q.bottom)/se.y,left:(oe.left-ue.left+Q.left)/se.x,right:(ue.right-oe.right+Q.right)/se.x}}const MAX_RESET_COUNT=50,computePosition$1=async(T,w,O)=>{const{placement:F="bottom",strategy:W="absolute",middleware:U=[],platform:q}=O,j=q.detectOverflow?q:{...q,detectOverflow},J=await(q.isRTL==null?void 0:q.isRTL(w));let X=await q.getElementRects({reference:T,floating:w,strategy:W}),{x:Y,y:K}=computeCoordsFromPlacement(X,F,J),G=F,ee=0;const Q={};for(let te=0;te<U.length;te++){const ae=U[te];if(!ae)continue;const{name:oe,fn:ne}=ae,{x:re,y:se,data:ue,reset:de}=await ne({x:Y,y:K,initialPlacement:F,placement:G,strategy:W,middlewareData:Q,rects:X,platform:j,elements:{reference:T,floating:w}});Y=re??Y,K=se??K,Q[oe]={...Q[oe],...ue},de&&ee<MAX_RESET_COUNT&&(ee++,typeof de=="object"&&(de.placement&&(G=de.placement),de.rects&&(X=de.rects===!0?await q.getElementRects({reference:T,floating:w,strategy:W}):de.rects),{x:Y,y:K}=computeCoordsFromPlacement(X,G,J)),te=-1)}return{x:Y,y:K,placement:G,strategy:W,middlewareData:Q}},arrow$1=T=>({name:"arrow",options:T,async fn(w){const{x:O,y:F,placement:W,rects:U,platform:q,elements:j,middlewareData:J}=w,{element:X,padding:Y=0}=evaluate(T,w)||{};if(X==null)return{};const K=getPaddingObject(Y),G={x:O,y:F},ee=getAlignmentAxis(W),Q=getAxisLength(ee),te=await q.getDimensions(X),ae=ee==="y",oe=ae?"top":"left",ne=ae?"bottom":"right",re=ae?"clientHeight":"clientWidth",se=U.reference[Q]+U.reference[ee]-G[ee]-U.floating[Q],ue=G[ee]-U.reference[ee],de=await(q.getOffsetParent==null?void 0:q.getOffsetParent(X));let le=de?de[re]:0;(!le||!await(q.isElement==null?void 0:q.isElement(de)))&&(le=j.floating[re]||U.floating[Q]);const _e=se/2-ue/2,ge=le/2-te[Q]/2-1,be=min(K[oe],ge),Ce=min(K[ne],ge),ve=be,fe=le-te[Q]-Ce,he=le/2-te[Q]/2+_e,xe=clamp$1(ve,he,fe),we=!J.arrow&&getAlignment(W)!=null&&he!==xe&&U.reference[Q]/2-(he<ve?be:Ce)-te[Q]/2<0,ce=we?he<ve?he-ve:he-fe:0;return{[ee]:G[ee]+ce,data:{[ee]:xe,centerOffset:he-xe-ce,...we&&{alignmentOffset:ce}},reset:we}}}),flip$1=function(T){return T===void 0&&(T={}),{name:"flip",options:T,async fn(w){var O,F;const{placement:W,middlewareData:U,rects:q,initialPlacement:j,platform:J,elements:X}=w,{mainAxis:Y=!0,crossAxis:K=!0,fallbackPlacements:G,fallbackStrategy:ee="bestFit",fallbackAxisSideDirection:Q="none",flipAlignment:te=!0,...ae}=evaluate(T,w);if((O=U.arrow)!=null&&O.alignmentOffset)return{};const oe=getSide(W),ne=getSideAxis(j),re=getSide(j)===j,se=await(J.isRTL==null?void 0:J.isRTL(X.floating)),ue=G||(re||!te?[getOppositePlacement(j)]:getExpandedPlacements(j)),de=Q!=="none";!G&&de&&ue.push(...getOppositeAxisPlacements(j,te,Q,se));const le=[j,...ue],_e=await J.detectOverflow(w,ae),ge=[];let be=((F=U.flip)==null?void 0:F.overflows)||[];if(Y&&ge.push(_e[oe]),K){const he=getAlignmentSides(W,q,se);ge.push(_e[he[0]],_e[he[1]])}if(be=[...be,{placement:W,overflows:ge}],!ge.every(he=>he<=0)){var Ce,ve;const he=(((Ce=U.flip)==null?void 0:Ce.index)||0)+1,xe=le[he];if(xe&&(!(K==="alignment"?ne!==getSideAxis(xe):!1)||be.every(ye=>getSideAxis(ye.placement)===ne?ye.overflows[0]>0:!0)))return{data:{index:he,overflows:be},reset:{placement:xe}};let we=(ve=be.filter(ce=>ce.overflows[0]<=0).sort((ce,ye)=>ce.overflows[1]-ye.overflows[1])[0])==null?void 0:ve.placement;if(!we)switch(ee){case"bestFit":{var fe;const ce=(fe=be.filter(ye=>{if(de){const Ee=getSideAxis(ye.placement);return Ee===ne||Ee==="y"}return!0}).map(ye=>[ye.placement,ye.overflows.filter(Ee=>Ee>0).reduce((Ee,Ae)=>Ee+Ae,0)]).sort((ye,Ee)=>ye[1]-Ee[1])[0])==null?void 0:fe[0];ce&&(we=ce);break}case"initialPlacement":we=j;break}if(W!==we)return{reset:{placement:we}}}return{}}}},originSides=new Set(["left","top"]);async function convertValueToCoords(T,w){const{placement:O,platform:F,elements:W}=T,U=await(F.isRTL==null?void 0:F.isRTL(W.floating)),q=getSide(O),j=getAlignment(O),J=getSideAxis(O)==="y",X=originSides.has(q)?-1:1,Y=U&&J?-1:1,K=evaluate(w,T);let{mainAxis:G,crossAxis:ee,alignmentAxis:Q}=typeof K=="number"?{mainAxis:K,crossAxis:0,alignmentAxis:null}:{mainAxis:K.mainAxis||0,crossAxis:K.crossAxis||0,alignmentAxis:K.alignmentAxis};return j&&typeof Q=="number"&&(ee=j==="end"?Q*-1:Q),J?{x:ee*Y,y:G*X}:{x:G*X,y:ee*Y}}const offset$1=function(T){return T===void 0&&(T=0),{name:"offset",options:T,async fn(w){var O,F;const{x:W,y:U,placement:q,middlewareData:j}=w,J=await convertValueToCoords(w,T);return q===((O=j.offset)==null?void 0:O.placement)&&(F=j.arrow)!=null&&F.alignmentOffset?{}:{x:W+J.x,y:U+J.y,data:{...J,placement:q}}}}},shift$1=function(T){return T===void 0&&(T={}),{name:"shift",options:T,async fn(w){const{x:O,y:F,placement:W,platform:U}=w,{mainAxis:q=!0,crossAxis:j=!1,limiter:J={fn:oe=>{let{x:ne,y:re}=oe;return{x:ne,y:re}}},...X}=evaluate(T,w),Y={x:O,y:F},K=await U.detectOverflow(w,X),G=getSideAxis(getSide(W)),ee=getOppositeAxis(G);let Q=Y[ee],te=Y[G];if(q){const oe=ee==="y"?"top":"left",ne=ee==="y"?"bottom":"right",re=Q+K[oe],se=Q-K[ne];Q=clamp$1(re,Q,se)}if(j){const oe=G==="y"?"top":"left",ne=G==="y"?"bottom":"right",re=te+K[oe],se=te-K[ne];te=clamp$1(re,te,se)}const ae=J.fn({...w,[ee]:Q,[G]:te});return{...ae,data:{x:ae.x-O,y:ae.y-F,enabled:{[ee]:q,[G]:j}}}}}},size$1=function(T){return T===void 0&&(T={}),{name:"size",options:T,async fn(w){var O,F;const{placement:W,rects:U,platform:q,elements:j}=w,{apply:J=()=>{},...X}=evaluate(T,w),Y=await q.detectOverflow(w,X),K=getSide(W),G=getAlignment(W),ee=getSideAxis(W)==="y",{width:Q,height:te}=U.floating;let ae,oe;K==="top"||K==="bottom"?(ae=K,oe=G===(await(q.isRTL==null?void 0:q.isRTL(j.floating))?"start":"end")?"left":"right"):(oe=K,ae=G==="end"?"top":"bottom");const ne=te-Y.top-Y.bottom,re=Q-Y.left-Y.right,se=min(te-Y[ae],ne),ue=min(Q-Y[oe],re),de=!w.middlewareData.shift;let le=se,_e=ue;if((O=w.middlewareData.shift)!=null&&O.enabled.x&&(_e=re),(F=w.middlewareData.shift)!=null&&F.enabled.y&&(le=ne),de&&!G){const be=max(Y.left,0),Ce=max(Y.right,0),ve=max(Y.top,0),fe=max(Y.bottom,0);ee?_e=Q-2*(be!==0||Ce!==0?be+Ce:max(Y.left,Y.right)):le=te-2*(ve!==0||fe!==0?ve+fe:max(Y.top,Y.bottom))}await J({...w,availableWidth:_e,availableHeight:le});const ge=await q.getDimensions(j.floating);return Q!==ge.width||te!==ge.height?{reset:{rects:!0}}:{}}}};function hasWindow(){return typeof window<"u"}function getNodeName(T){return isNode(T)?(T.nodeName||"").toLowerCase():"#document"}function getWindow(T){var w;return(T==null||(w=T.ownerDocument)==null?void 0:w.defaultView)||window}function getDocumentElement(T){var w;return(w=(isNode(T)?T.ownerDocument:T.document)||window.document)==null?void 0:w.documentElement}function isNode(T){return hasWindow()?T instanceof Node||T instanceof getWindow(T).Node:!1}function isElement(T){return hasWindow()?T instanceof Element||T instanceof getWindow(T).Element:!1}function isHTMLElement(T){return hasWindow()?T instanceof HTMLElement||T instanceof getWindow(T).HTMLElement:!1}function isShadowRoot(T){return!hasWindow()||typeof ShadowRoot>"u"?!1:T instanceof ShadowRoot||T instanceof getWindow(T).ShadowRoot}function isOverflowElement(T){const{overflow:w,overflowX:O,overflowY:F,display:W}=getComputedStyle$1(T);return/auto|scroll|overlay|hidden|clip/.test(w+F+O)&&W!=="inline"&&W!=="contents"}function isTableElement(T){return/^(table|td|th)$/.test(getNodeName(T))}function isTopLayer(T){try{if(T.matches(":popover-open"))return!0}catch{}try{return T.matches(":modal")}catch{return!1}}const willChangeRe=/transform|translate|scale|rotate|perspective|filter/,containRe=/paint|layout|strict|content/,isNotNone=T=>!!T&&T!=="none";let isWebKitValue;function isContainingBlock(T){const w=isElement(T)?getComputedStyle$1(T):T;return isNotNone(w.transform)||isNotNone(w.translate)||isNotNone(w.scale)||isNotNone(w.rotate)||isNotNone(w.perspective)||!isWebKit()&&(isNotNone(w.backdropFilter)||isNotNone(w.filter))||willChangeRe.test(w.willChange||"")||containRe.test(w.contain||"")}function getContainingBlock(T){let w=getParentNode(T);for(;isHTMLElement(w)&&!isLastTraversableNode(w);){if(isContainingBlock(w))return w;if(isTopLayer(w))return null;w=getParentNode(w)}return null}function isWebKit(){return isWebKitValue==null&&(isWebKitValue=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),isWebKitValue}function isLastTraversableNode(T){return/^(html|body|#document)$/.test(getNodeName(T))}function getComputedStyle$1(T){return getWindow(T).getComputedStyle(T)}function getNodeScroll(T){return isElement(T)?{scrollLeft:T.scrollLeft,scrollTop:T.scrollTop}:{scrollLeft:T.scrollX,scrollTop:T.scrollY}}function getParentNode(T){if(getNodeName(T)==="html")return T;const w=T.assignedSlot||T.parentNode||isShadowRoot(T)&&T.host||getDocumentElement(T);return isShadowRoot(w)?w.host:w}function getNearestOverflowAncestor(T){const w=getParentNode(T);return isLastTraversableNode(w)?T.ownerDocument?T.ownerDocument.body:T.body:isHTMLElement(w)&&isOverflowElement(w)?w:getNearestOverflowAncestor(w)}function getOverflowAncestors(T,w,O){var F;w===void 0&&(w=[]),O===void 0&&(O=!0);const W=getNearestOverflowAncestor(T),U=W===((F=T.ownerDocument)==null?void 0:F.body),q=getWindow(W);if(U){const j=getFrameElement(q);return w.concat(q,q.visualViewport||[],isOverflowElement(W)?W:[],j&&O?getOverflowAncestors(j):[])}else return w.concat(W,getOverflowAncestors(W,[],O))}function getFrameElement(T){return T.parent&&Object.getPrototypeOf(T.parent)?T.frameElement:null}function getCssDimensions(T){const w=getComputedStyle$1(T);let O=parseFloat(w.width)||0,F=parseFloat(w.height)||0;const W=isHTMLElement(T),U=W?T.offsetWidth:O,q=W?T.offsetHeight:F,j=round(O)!==U||round(F)!==q;return j&&(O=U,F=q),{width:O,height:F,$:j}}function unwrapElement(T){return isElement(T)?T:T.contextElement}function getScale(T){const w=unwrapElement(T);if(!isHTMLElement(w))return createCoords(1);const O=w.getBoundingClientRect(),{width:F,height:W,$:U}=getCssDimensions(w);let q=(U?round(O.width):O.width)/F,j=(U?round(O.height):O.height)/W;return(!q||!Number.isFinite(q))&&(q=1),(!j||!Number.isFinite(j))&&(j=1),{x:q,y:j}}const noOffsets=createCoords(0);function getVisualOffsets(T){const w=getWindow(T);return!isWebKit()||!w.visualViewport?noOffsets:{x:w.visualViewport.offsetLeft,y:w.visualViewport.offsetTop}}function shouldAddVisualOffsets(T,w,O){return w===void 0&&(w=!1),!O||w&&O!==getWindow(T)?!1:w}function getBoundingClientRect(T,w,O,F){w===void 0&&(w=!1),O===void 0&&(O=!1);const W=T.getBoundingClientRect(),U=unwrapElement(T);let q=createCoords(1);w&&(F?isElement(F)&&(q=getScale(F)):q=getScale(T));const j=shouldAddVisualOffsets(U,O,F)?getVisualOffsets(U):createCoords(0);let J=(W.left+j.x)/q.x,X=(W.top+j.y)/q.y,Y=W.width/q.x,K=W.height/q.y;if(U){const G=getWindow(U),ee=F&&isElement(F)?getWindow(F):F;let Q=G,te=getFrameElement(Q);for(;te&&F&&ee!==Q;){const ae=getScale(te),oe=te.getBoundingClientRect(),ne=getComputedStyle$1(te),re=oe.left+(te.clientLeft+parseFloat(ne.paddingLeft))*ae.x,se=oe.top+(te.clientTop+parseFloat(ne.paddingTop))*ae.y;J*=ae.x,X*=ae.y,Y*=ae.x,K*=ae.y,J+=re,X+=se,Q=getWindow(te),te=getFrameElement(Q)}}return rectToClientRect({width:Y,height:K,x:J,y:X})}function getWindowScrollBarX(T,w){const O=getNodeScroll(T).scrollLeft;return w?w.left+O:getBoundingClientRect(getDocumentElement(T)).left+O}function getHTMLOffset(T,w){const O=T.getBoundingClientRect(),F=O.left+w.scrollLeft-getWindowScrollBarX(T,O),W=O.top+w.scrollTop;return{x:F,y:W}}function convertOffsetParentRelativeRectToViewportRelativeRect(T){let{elements:w,rect:O,offsetParent:F,strategy:W}=T;const U=W==="fixed",q=getDocumentElement(F),j=w?isTopLayer(w.floating):!1;if(F===q||j&&U)return O;let J={scrollLeft:0,scrollTop:0},X=createCoords(1);const Y=createCoords(0),K=isHTMLElement(F);if((K||!K&&!U)&&((getNodeName(F)!=="body"||isOverflowElement(q))&&(J=getNodeScroll(F)),K)){const ee=getBoundingClientRect(F);X=getScale(F),Y.x=ee.x+F.clientLeft,Y.y=ee.y+F.clientTop}const G=q&&!K&&!U?getHTMLOffset(q,J):createCoords(0);return{width:O.width*X.x,height:O.height*X.y,x:O.x*X.x-J.scrollLeft*X.x+Y.x+G.x,y:O.y*X.y-J.scrollTop*X.y+Y.y+G.y}}function getClientRects(T){return Array.from(T.getClientRects())}function getDocumentRect(T){const w=getDocumentElement(T),O=getNodeScroll(T),F=T.ownerDocument.body,W=max(w.scrollWidth,w.clientWidth,F.scrollWidth,F.clientWidth),U=max(w.scrollHeight,w.clientHeight,F.scrollHeight,F.clientHeight);let q=-O.scrollLeft+getWindowScrollBarX(T);const j=-O.scrollTop;return getComputedStyle$1(F).direction==="rtl"&&(q+=max(w.clientWidth,F.clientWidth)-W),{width:W,height:U,x:q,y:j}}const SCROLLBAR_MAX=25;function getViewportRect(T,w){const O=getWindow(T),F=getDocumentElement(T),W=O.visualViewport;let U=F.clientWidth,q=F.clientHeight,j=0,J=0;if(W){U=W.width,q=W.height;const Y=isWebKit();(!Y||Y&&w==="fixed")&&(j=W.offsetLeft,J=W.offsetTop)}const X=getWindowScrollBarX(F);if(X<=0){const Y=F.ownerDocument,K=Y.body,G=getComputedStyle(K),ee=Y.compatMode==="CSS1Compat"&&parseFloat(G.marginLeft)+parseFloat(G.marginRight)||0,Q=Math.abs(F.clientWidth-K.clientWidth-ee);Q<=SCROLLBAR_MAX&&(U-=Q)}else X<=SCROLLBAR_MAX&&(U+=X);return{width:U,height:q,x:j,y:J}}function getInnerBoundingClientRect(T,w){const O=getBoundingClientRect(T,!0,w==="fixed"),F=O.top+T.clientTop,W=O.left+T.clientLeft,U=isHTMLElement(T)?getScale(T):createCoords(1),q=T.clientWidth*U.x,j=T.clientHeight*U.y,J=W*U.x,X=F*U.y;return{width:q,height:j,x:J,y:X}}function getClientRectFromClippingAncestor(T,w,O){let F;if(w==="viewport")F=getViewportRect(T,O);else if(w==="document")F=getDocumentRect(getDocumentElement(T));else if(isElement(w))F=getInnerBoundingClientRect(w,O);else{const W=getVisualOffsets(T);F={x:w.x-W.x,y:w.y-W.y,width:w.width,height:w.height}}return rectToClientRect(F)}function hasFixedPositionAncestor(T,w){const O=getParentNode(T);return O===w||!isElement(O)||isLastTraversableNode(O)?!1:getComputedStyle$1(O).position==="fixed"||hasFixedPositionAncestor(O,w)}function getClippingElementAncestors(T,w){const O=w.get(T);if(O)return O;let F=getOverflowAncestors(T,[],!1).filter(j=>isElement(j)&&getNodeName(j)!=="body"),W=null;const U=getComputedStyle$1(T).position==="fixed";let q=U?getParentNode(T):T;for(;isElement(q)&&!isLastTraversableNode(q);){const j=getComputedStyle$1(q),J=isContainingBlock(q);!J&&j.position==="fixed"&&(W=null),(U?!J&&!W:!J&&j.position==="static"&&!!W&&(W.position==="absolute"||W.position==="fixed")||isOverflowElement(q)&&!J&&hasFixedPositionAncestor(T,q))?F=F.filter(Y=>Y!==q):W=j,q=getParentNode(q)}return w.set(T,F),F}function getClippingRect(T){let{element:w,boundary:O,rootBoundary:F,strategy:W}=T;const q=[...O==="clippingAncestors"?isTopLayer(w)?[]:getClippingElementAncestors(w,this._c):[].concat(O),F],j=getClientRectFromClippingAncestor(w,q[0],W);let J=j.top,X=j.right,Y=j.bottom,K=j.left;for(let G=1;G<q.length;G++){const ee=getClientRectFromClippingAncestor(w,q[G],W);J=max(ee.top,J),X=min(ee.right,X),Y=min(ee.bottom,Y),K=max(ee.left,K)}return{width:X-K,height:Y-J,x:K,y:J}}function getDimensions(T){const{width:w,height:O}=getCssDimensions(T);return{width:w,height:O}}function getRectRelativeToOffsetParent(T,w,O){const F=isHTMLElement(w),W=getDocumentElement(w),U=O==="fixed",q=getBoundingClientRect(T,!0,U,w);let j={scrollLeft:0,scrollTop:0};const J=createCoords(0);function X(){J.x=getWindowScrollBarX(W)}if(F||!F&&!U)if((getNodeName(w)!=="body"||isOverflowElement(W))&&(j=getNodeScroll(w)),F){const ee=getBoundingClientRect(w,!0,U,w);J.x=ee.x+w.clientLeft,J.y=ee.y+w.clientTop}else W&&X();U&&!F&&W&&X();const Y=W&&!F&&!U?getHTMLOffset(W,j):createCoords(0),K=q.left+j.scrollLeft-J.x-Y.x,G=q.top+j.scrollTop-J.y-Y.y;return{x:K,y:G,width:q.width,height:q.height}}function isStaticPositioned(T){return getComputedStyle$1(T).position==="static"}function getTrueOffsetParent(T,w){if(!isHTMLElement(T)||getComputedStyle$1(T).position==="fixed")return null;if(w)return w(T);let O=T.offsetParent;return getDocumentElement(T)===O&&(O=O.ownerDocument.body),O}function getOffsetParent(T,w){const O=getWindow(T);if(isTopLayer(T))return O;if(!isHTMLElement(T)){let W=getParentNode(T);for(;W&&!isLastTraversableNode(W);){if(isElement(W)&&!isStaticPositioned(W))return W;W=getParentNode(W)}return O}let F=getTrueOffsetParent(T,w);for(;F&&isTableElement(F)&&isStaticPositioned(F);)F=getTrueOffsetParent(F,w);return F&&isLastTraversableNode(F)&&isStaticPositioned(F)&&!isContainingBlock(F)?O:F||getContainingBlock(T)||O}const getElementRects=async function(T){const w=this.getOffsetParent||getOffsetParent,O=this.getDimensions,F=await O(T.floating);return{reference:getRectRelativeToOffsetParent(T.reference,await w(T.floating),T.strategy),floating:{x:0,y:0,width:F.width,height:F.height}}};function isRTL(T){return getComputedStyle$1(T).direction==="rtl"}const platform={convertOffsetParentRelativeRectToViewportRelativeRect,getDocumentElement,getClippingRect,getOffsetParent,getElementRects,getClientRects,getDimensions,getScale,isElement,isRTL};function rectsAreEqual(T,w){return T.x===w.x&&T.y===w.y&&T.width===w.width&&T.height===w.height}function observeMove(T,w){let O=null,F;const W=getDocumentElement(T);function U(){var j;clearTimeout(F),(j=O)==null||j.disconnect(),O=null}function q(j,J){j===void 0&&(j=!1),J===void 0&&(J=1),U();const X=T.getBoundingClientRect(),{left:Y,top:K,width:G,height:ee}=X;if(j||w(),!G||!ee)return;const Q=floor(K),te=floor(W.clientWidth-(Y+G)),ae=floor(W.clientHeight-(K+ee)),oe=floor(Y),re={rootMargin:-Q+"px "+-te+"px "+-ae+"px "+-oe+"px",threshold:max(0,min(1,J))||1};let se=!0;function ue(de){const le=de[0].intersectionRatio;if(le!==J){if(!se)return q();le?q(!1,le):F=setTimeout(()=>{q(!1,1e-7)},1e3)}le===1&&!rectsAreEqual(X,T.getBoundingClientRect())&&q(),se=!1}try{O=new IntersectionObserver(ue,{...re,root:W.ownerDocument})}catch{O=new IntersectionObserver(ue,re)}O.observe(T)}return q(!0),U}function autoUpdate(T,w,O,F){F===void 0&&(F={});const{ancestorScroll:W=!0,ancestorResize:U=!0,elementResize:q=typeof ResizeObserver=="function",layoutShift:j=typeof IntersectionObserver=="function",animationFrame:J=!1}=F,X=unwrapElement(T),Y=W||U?[...X?getOverflowAncestors(X):[],...w?getOverflowAncestors(w):[]]:[];Y.forEach(oe=>{W&&oe.addEventListener("scroll",O,{passive:!0}),U&&oe.addEventListener("resize",O)});const K=X&&j?observeMove(X,O):null;let G=-1,ee=null;q&&(ee=new ResizeObserver(oe=>{let[ne]=oe;ne&&ne.target===X&&ee&&w&&(ee.unobserve(w),cancelAnimationFrame(G),G=requestAnimationFrame(()=>{var re;(re=ee)==null||re.observe(w)})),O()}),X&&!J&&ee.observe(X),w&&ee.observe(w));let Q,te=J?getBoundingClientRect(T):null;J&&ae();function ae(){const oe=getBoundingClientRect(T);te&&!rectsAreEqual(te,oe)&&O(),te=oe,Q=requestAnimationFrame(ae)}return O(),()=>{var oe;Y.forEach(ne=>{W&&ne.removeEventListener("scroll",O),U&&ne.removeEventListener("resize",O)}),K==null||K(),(oe=ee)==null||oe.disconnect(),ee=null,J&&cancelAnimationFrame(Q)}}const offset=offset$1,shift=shift$1,flip=flip$1,size=size$1,arrow=arrow$1,computePosition=(T,w,O)=>{const F=new Map,W={platform,...O},U={...W.platform,_c:F};return computePosition$1(T,w,{...W,platform:U})};function e(T){return i(T)}function r(T){return T.assignedSlot?T.assignedSlot:T.parentNode instanceof ShadowRoot?T.parentNode.host:T.parentNode}function i(T){for(let w=T;w;w=r(w))if(w instanceof Element&&getComputedStyle(w).display==="none")return null;for(let w=r(T);w;w=r(w)){if(!(w instanceof Element))continue;const O=getComputedStyle(w);if(O.display!=="contents"&&(O.position!=="static"||isContainingBlock(O)||w.tagName==="BODY"))return w}return null}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function isVirtualElement(T){return T!==null&&typeof T=="object"&&"getBoundingClientRect"in T&&("contextElement"in T?T instanceof Element:!0)}var Ie,SUPPORTS_POPOVER=(Ie=globalThis==null?void 0:globalThis.HTMLElement)==null?void 0:Ie.prototype.hasOwnProperty("popover"),WaPopup=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){const T=this.anchorEl.getBoundingClientRect(),w=this.popup.getBoundingClientRect(),O=this.placement.includes("top")||this.placement.includes("bottom");let F=0,W=0,U=0,q=0,j=0,J=0,X=0,Y=0;O?T.top<w.top?(F=T.left,W=T.bottom,U=T.right,q=T.bottom,j=w.left,J=w.top,X=w.right,Y=w.top):(F=w.left,W=w.bottom,U=w.right,q=w.bottom,j=T.left,J=T.top,X=T.right,Y=T.top):T.left<w.left?(F=T.right,W=T.top,U=w.left,q=w.top,j=T.right,J=T.bottom,X=w.left,Y=w.bottom):(F=w.right,W=w.top,U=T.left,q=T.top,j=w.right,J=w.bottom,X=T.left,Y=T.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${F}px`),this.style.setProperty("--hover-bridge-top-left-y",`${W}px`),this.style.setProperty("--hover-bridge-top-right-x",`${U}px`),this.style.setProperty("--hover-bridge-top-right-y",`${q}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${j}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${J}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${X}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${Y}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(T){super.updated(T),T.has("active")&&(this.active?this.start():this.stop()),T.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const T=this.getRootNode();this.anchorEl=T.getElementById(this.anchor)}else this.anchor instanceof Element||isVirtualElement(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){var T,w;!this.anchorEl||!this.active||!this.isConnected||((w=(T=this.popup)==null?void 0:T.showPopover)==null||w.call(T),this.cleanup=autoUpdate(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(T=>{var w,O;(O=(w=this.popup)==null?void 0:w.hidePopover)==null||O.call(w),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>T())):T()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;const T=[offset({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?T.push(size({apply:({rects:F})=>{const W=this.sync==="width"||this.sync==="both",U=this.sync==="height"||this.sync==="both";this.popup.style.width=W?`${F.reference.width}px`:"",this.popup.style.height=U?`${F.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let w;SUPPORTS_POPOVER&&!isVirtualElement(this.anchor)&&this.boundary==="scroll"&&(w=getOverflowAncestors(this.anchorEl).filter(F=>F instanceof Element)),this.flip&&T.push(flip({boundary:this.flipBoundary||w,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&T.push(shift({boundary:this.shiftBoundary||w,padding:this.shiftPadding})),this.autoSize?T.push(size({boundary:this.autoSizeBoundary||w,padding:this.autoSizePadding,apply:({availableWidth:F,availableHeight:W})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${W}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${F}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&T.push(arrow({element:this.arrowEl,padding:this.arrowPadding}));const O=SUPPORTS_POPOVER?F=>platform.getOffsetParent(F,e):platform.getOffsetParent;computePosition(this.anchorEl,this.popup,{placement:this.placement,middleware:T,strategy:SUPPORTS_POPOVER?"absolute":"fixed",platform:{...platform,getOffsetParent:O}}).then(({x:F,y:W,middlewareData:U,placement:q})=>{const j=this.localize.dir()==="rtl",J={top:"bottom",right:"left",bottom:"top",left:"right"}[q.split("-")[0]];if(this.setAttribute("data-current-placement",q),Object.assign(this.popup.style,{left:`${F}px`,top:`${W}px`}),this.arrow){const X=U.arrow.x,Y=U.arrow.y;let K="",G="",ee="",Q="";if(this.arrowPlacement==="start"){const te=typeof X=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";K=typeof Y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",G=j?te:"",Q=j?"":te}else if(this.arrowPlacement==="end"){const te=typeof X=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";G=j?"":te,Q=j?te:"",ee=typeof Y=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(Q=typeof X=="number"?"calc(50% - var(--arrow-size-diagonal))":"",K=typeof Y=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(Q=typeof X=="number"?`${X}px`:"",K=typeof Y=="number"?`${Y}px`:"");Object.assign(this.arrowEl.style,{top:K,right:G,bottom:ee,left:Q,[J]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new WaRepositionEvent)}render(){return b`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e$2({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${e$2({popup:!0,"popup-active":this.active,"popup-fixed":!SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?b`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};WaPopup.css=popup_styles_default;__decorateClass([e$4(".popup")],WaPopup.prototype,"popup",2);__decorateClass([e$4(".arrow")],WaPopup.prototype,"arrowEl",2);__decorateClass([n$1()],WaPopup.prototype,"anchor",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaPopup.prototype,"active",2);__decorateClass([n$1({reflect:!0})],WaPopup.prototype,"placement",2);__decorateClass([n$1()],WaPopup.prototype,"boundary",2);__decorateClass([n$1({type:Number})],WaPopup.prototype,"distance",2);__decorateClass([n$1({type:Number})],WaPopup.prototype,"skidding",2);__decorateClass([n$1({type:Boolean})],WaPopup.prototype,"arrow",2);__decorateClass([n$1({attribute:"arrow-placement"})],WaPopup.prototype,"arrowPlacement",2);__decorateClass([n$1({attribute:"arrow-padding",type:Number})],WaPopup.prototype,"arrowPadding",2);__decorateClass([n$1({type:Boolean})],WaPopup.prototype,"flip",2);__decorateClass([n$1({attribute:"flip-fallback-placements",converter:{fromAttribute:T=>T.split(" ").map(w=>w.trim()).filter(w=>w!==""),toAttribute:T=>T.join(" ")}})],WaPopup.prototype,"flipFallbackPlacements",2);__decorateClass([n$1({attribute:"flip-fallback-strategy"})],WaPopup.prototype,"flipFallbackStrategy",2);__decorateClass([n$1({type:Object})],WaPopup.prototype,"flipBoundary",2);__decorateClass([n$1({attribute:"flip-padding",type:Number})],WaPopup.prototype,"flipPadding",2);__decorateClass([n$1({type:Boolean})],WaPopup.prototype,"shift",2);__decorateClass([n$1({type:Object})],WaPopup.prototype,"shiftBoundary",2);__decorateClass([n$1({attribute:"shift-padding",type:Number})],WaPopup.prototype,"shiftPadding",2);__decorateClass([n$1({attribute:"auto-size"})],WaPopup.prototype,"autoSize",2);__decorateClass([n$1()],WaPopup.prototype,"sync",2);__decorateClass([n$1({type:Object})],WaPopup.prototype,"autoSizeBoundary",2);__decorateClass([n$1({attribute:"auto-size-padding",type:Number})],WaPopup.prototype,"autoSizePadding",2);__decorateClass([n$1({attribute:"hover-bridge",type:Boolean})],WaPopup.prototype,"hoverBridge",2);WaPopup=__decorateClass([t$1("wa-popup")],WaPopup);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var checkbox_styles_default=i$6`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaCheckbox=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.hasSlotController=new HasSlotController(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){const T=[RequiredValidator({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...T]}get value(){const T=this._value||"on";return this.checked?T:null}set value(T){this._value=T}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(T){this._checked=!!T,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(T){super.willUpdate(T),(T.has("value")||T.has("checked")||T.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(T){this.input.focus(T)}blur(){this.input.blur()}render(){const T=this.hasSlotController.test("hint"),w=this.hint?!0:!!T,O=!this.checked&&this.indeterminate,F=O?"indeterminate":"check",W=O?"indeterminate":"check";return b`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${o$2(this.name)}
            value=${o$2(this._value)}
            .indeterminate=${l(this.indeterminate)}
            .checked=${l(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${W}-icon icon" library="system" name=${F}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${w?"false":"true"}
        class="${e$2({"has-slotted":w})}"
      >
        ${this.hint}
      </slot>
    `}};WaCheckbox.css=[form_control_styles_default,size_styles_default,checkbox_styles_default];WaCheckbox.shadowRootOptions={...WebAwesomeFormAssociatedElement.shadowRootOptions,delegatesFocus:!0};__decorateClass([e$4('input[type="checkbox"]')],WaCheckbox.prototype,"input",2);__decorateClass([n$1()],WaCheckbox.prototype,"title",2);__decorateClass([n$1({reflect:!0})],WaCheckbox.prototype,"name",2);__decorateClass([n$1({reflect:!0})],WaCheckbox.prototype,"value",1);__decorateClass([n$1({reflect:!0})],WaCheckbox.prototype,"size",2);__decorateClass([n$1({type:Boolean})],WaCheckbox.prototype,"disabled",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaCheckbox.prototype,"indeterminate",2);__decorateClass([n$1({type:Boolean,attribute:!1})],WaCheckbox.prototype,"checked",1);__decorateClass([n$1({type:Boolean,reflect:!0,attribute:"checked"})],WaCheckbox.prototype,"defaultChecked",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaCheckbox.prototype,"required",2);__decorateClass([n$1()],WaCheckbox.prototype,"hint",2);__decorateClass([watch(["checked","defaultChecked"])],WaCheckbox.prototype,"handleDefaultCheckedChange",1);__decorateClass([watch(["checked","indeterminate"])],WaCheckbox.prototype,"handleStateChange",1);__decorateClass([watch("disabled")],WaCheckbox.prototype,"handleDisabledChange",1);WaCheckbox=__decorateClass([t$1("wa-checkbox")],WaCheckbox);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var textarea_styles_default=i$6`
  :host {
    border-width: 0;
  }

  .textarea {
    display: grid;
    align-items: center;
    margin: 0;
    border: none;
    outline: none;
    cursor: inherit;
    font: inherit;
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    -webkit-appearance: none;

    &:focus-within {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .textarea {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .textarea {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  textarea {
    display: block;
    width: 100%;
    border: none;
    background: transparent;
    font: inherit;
    color: inherit;
    padding: calc(var(--wa-form-control-padding-block) - ((1lh - 1em) / 2)) var(--wa-form-control-padding-inline); /* accounts for the larger line height of textarea content */
    min-height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    box-shadow: none;
    margin: 0;

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &:focus {
      outline: none;
    }
  }

  /* Shared textarea and size-adjuster positioning */
  .control,
  .size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    padding: 0;
  }

  textarea::-webkit-search-decoration,
  textarea::-webkit-search-cancel-button,
  textarea::-webkit-search-results-button,
  textarea::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /*
   * Resize types
   */

  :host([resize='none']) textarea {
    resize: none;
  }

  textarea,
  :host([resize='vertical']) textarea {
    resize: vertical;
  }

  :host([resize='horizontal']) textarea {
    resize: horizontal;
  }

  :host([resize='both']) textarea {
    resize: both;
  }

  :host([resize='auto']) textarea {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaTextarea=class extends WebAwesomeFormAssociatedElement{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new HasSlotController(this,"hint","label"),this.title="",this.name=null,this._value=null,this.defaultValue=this.getAttribute("value")??"",this.size="medium",this.appearance="outlined",this.label="",this.hint="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=!1,this.readonly=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,MirrorValidator()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(T){this._value!==T&&(this.valueHasChanged=!0,this._value=T)}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaDimensions()),this.updateComplete.then(()=>{if(this.setTextareaDimensions(),this.resizeObserver.observe(this.input),this.didSSR&&this.input&&this.value!==this.input.value){const T=this.input.value;this.value=T}})}disconnectedCallback(){var T;super.disconnectedCallback(),this.input&&((T=this.resizeObserver)==null||T.unobserve(this.input))}handleBlur(){this.checkValidity()}handleChange(T){this.valueHasChanged=!0,this.value=this.input.value,this.setTextareaDimensions(),this.checkValidity(),this.relayNativeEvent(T,{bubbles:!0,composed:!0})}handleInput(T){this.valueHasChanged=!0,this.value=this.input.value,this.relayNativeEvent(T,{bubbles:!0,composed:!0})}setTextareaDimensions(){if(this.resize==="none"){this.base.style.width="",this.base.style.height="";return}if(this.resize==="auto"){this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`,this.base.style.width="",this.base.style.height="";return}if(this.input.style.width){const T=Number(this.input.style.width.split(/px/)[0])+2;this.base.style.width=`${T}px`}if(this.input.style.height){const T=Number(this.input.style.height.split(/px/)[0])+2;this.base.style.height=`${T}px`}}handleRowsChange(){this.setTextareaDimensions()}async handleValueChange(){await this.updateComplete,this.checkValidity(),this.setTextareaDimensions()}updated(T){T.has("resize")&&this.setTextareaDimensions(),super.updated(T),T.has("value")&&this.customStates.set("blank",!this.value)}focus(T){this.input.focus(T)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(T){if(T){typeof T.top=="number"&&(this.input.scrollTop=T.top),typeof T.left=="number"&&(this.input.scrollLeft=T.left);return}return{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(T,w,O="none"){this.input.setSelectionRange(T,w,O)}setRangeText(T,w,O,F="preserve"){const W=w??this.input.selectionStart,U=O??this.input.selectionEnd;this.input.setRangeText(T,W,U,F),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaDimensions())}formResetCallback(){this._value=null,this.input&&(this.input.value=this.value||""),super.formResetCallback()}render(){const T=this.hasUpdated?this.hasSlotController.test("label"):this.withLabel,w=this.hasUpdated?this.hasSlotController.test("hint"):this.withHint,O=this.label?!0:!!T,F=this.hint?!0:!!w;return b`
      <label
        part="form-control-label label"
        class=${e$2({label:!0,"has-label":O})}
        for="input"
        aria-hidden=${O?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base" class="textarea">
        <textarea
          part="textarea"
          id="input"
          class="control"
          title=${this.title}
          name=${o$2(this.name)}
          .value=${l(this.value)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${o$2(this.placeholder)}
          rows=${o$2(this.rows)}
          minlength=${o$2(this.minlength)}
          maxlength=${o$2(this.maxlength)}
          autocapitalize=${o$2(this.autocapitalize)}
          autocorrect=${o$2(this.autocorrect)}
          ?autofocus=${this.autofocus}
          spellcheck=${o$2(this.spellcheck)}
          enterkeyhint=${o$2(this.enterkeyhint)}
          inputmode=${o$2(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>

        <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
        <div part="textarea-adjuster" class="size-adjuster" ?hidden=${this.resize!=="auto"}></div>
      </div>

      <slot
        id="hint"
        name="hint"
        part="hint"
        aria-hidden=${F?"false":"true"}
        class=${e$2({"has-slotted":F})}
        >${this.hint}</slot
      >
    `}};WaTextarea.css=[textarea_styles_default,form_control_styles_default,size_styles_default];__decorateClass([e$4(".control")],WaTextarea.prototype,"input",2);__decorateClass([e$4('[part~="base"]')],WaTextarea.prototype,"base",2);__decorateClass([e$4(".size-adjuster")],WaTextarea.prototype,"sizeAdjuster",2);__decorateClass([n$1()],WaTextarea.prototype,"title",2);__decorateClass([n$1({reflect:!0})],WaTextarea.prototype,"name",2);__decorateClass([r$2()],WaTextarea.prototype,"value",1);__decorateClass([n$1({attribute:"value",reflect:!0})],WaTextarea.prototype,"defaultValue",2);__decorateClass([n$1({reflect:!0})],WaTextarea.prototype,"size",2);__decorateClass([n$1({reflect:!0})],WaTextarea.prototype,"appearance",2);__decorateClass([n$1()],WaTextarea.prototype,"label",2);__decorateClass([n$1({attribute:"hint"})],WaTextarea.prototype,"hint",2);__decorateClass([n$1()],WaTextarea.prototype,"placeholder",2);__decorateClass([n$1({type:Number})],WaTextarea.prototype,"rows",2);__decorateClass([n$1({reflect:!0})],WaTextarea.prototype,"resize",2);__decorateClass([n$1({type:Boolean})],WaTextarea.prototype,"disabled",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTextarea.prototype,"readonly",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTextarea.prototype,"required",2);__decorateClass([n$1({type:Number})],WaTextarea.prototype,"minlength",2);__decorateClass([n$1({type:Number})],WaTextarea.prototype,"maxlength",2);__decorateClass([n$1()],WaTextarea.prototype,"autocapitalize",2);__decorateClass([n$1()],WaTextarea.prototype,"autocorrect",2);__decorateClass([n$1()],WaTextarea.prototype,"autocomplete",2);__decorateClass([n$1({type:Boolean})],WaTextarea.prototype,"autofocus",2);__decorateClass([n$1()],WaTextarea.prototype,"enterkeyhint",2);__decorateClass([n$1({type:Boolean,converter:{fromAttribute:T=>!(!T||T==="false"),toAttribute:T=>T?"true":"false"}})],WaTextarea.prototype,"spellcheck",2);__decorateClass([n$1()],WaTextarea.prototype,"inputmode",2);__decorateClass([n$1({attribute:"with-label",type:Boolean})],WaTextarea.prototype,"withLabel",2);__decorateClass([n$1({attribute:"with-hint",type:Boolean})],WaTextarea.prototype,"withHint",2);__decorateClass([watch("rows",{waitUntilFirstUpdate:!0})],WaTextarea.prototype,"handleRowsChange",1);__decorateClass([watch("value",{waitUntilFirstUpdate:!0})],WaTextarea.prototype,"handleValueChange",1);WaTextarea=__decorateClass([t$1("wa-textarea")],WaTextarea);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var progress_bar_styles_default=i$6`
  :host {
    --track-height: 1rem;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);

    display: flex;
  }

  .progress-bar {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    overflow: hidden;
    height: var(--track-height);
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--track-color);
    color: var(--wa-color-brand-on-loud);
    font-size: var(--wa-font-size-s);
  }

  .indicator {
    width: var(--percentage);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--indicator-color);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1;
    font-weight: var(--wa-font-weight-semibold);
    transition: all var(--wa-transition-slow, 200ms) var(--wa-transition-easing, ease);
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  :host([indeterminate]) .indicator {
    position: absolute;
    inset-block: 0;
    inline-size: 50%;
    animation: wa-progress-indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--wa-color-surface-default);
    }

    .indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes wa-progress-indeterminate {
    0% {
      inset-inline-start: -50%;
    }

    75%,
    100% {
      inset-inline-start: 100%;
    }
  }
`;const urlAlphabet="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let nanoid=(T=21)=>{let w="",O=crypto.getRandomValues(new Uint8Array(T|=0));for(;T--;)w+=urlAlphabet[O[T]&63];return w};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function clamp(T,w,O){const F=W=>Object.is(W,-0)?0:W;return T<w?F(w):T>O?F(O):F(T)}function uniqueId(T=""){return`${T}${nanoid()}`}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaProgressBar=class extends WebAwesomeElement{constructor(){super(...arguments),this.localize=new LocalizeController(this),this.value=0,this.indeterminate=!1,this.label=""}updated(T){T.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${clamp(this.value,0,100)}%`)})}render(){return b`
      <div
        part="base"
        class="progress-bar"
        role="progressbar"
        title=${o$2(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?"0":this.value}
      >
        <div part="indicator" class="indicator">
          ${this.indeterminate?"":b` <slot part="label" class="label"></slot> `}
        </div>
      </div>
    `}};WaProgressBar.css=progress_bar_styles_default;__decorateClass([n$1({type:Number,reflect:!0})],WaProgressBar.prototype,"value",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaProgressBar.prototype,"indeterminate",2);__decorateClass([n$1()],WaProgressBar.prototype,"label",2);WaProgressBar=__decorateClass([t$1("wa-progress-bar")],WaProgressBar);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var tooltip_styles_default=i$6`
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
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var WaTooltip=class extends WebAwesomeElement{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=T=>{T.key==="Escape"&&this.open&&isTopDismissible(this)&&(T.preventDefault(),T.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{var T;if(this.hasTrigger("hover")){const w=!!((T=this.anchor)!=null&&T.matches(":hover")),O=this.matches(":hover");if(w||O)return;clearTimeout(this.hoverTimeout),w||O||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=uniqueId("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(T){return this.trigger.split(" ").includes(T)}addToAriaLabelledBy(T,w){const F=(T.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);F.includes(w)||(F.push(w),T.setAttribute("aria-labelledby",F.join(" ")))}removeFromAriaLabelledBy(T,w){const W=(T.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(U=>U!==w);W.length>0?T.setAttribute("aria-labelledby",W.join(" ")):T.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;const T=new WaShowEvent;if(this.dispatchEvent(T),T.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),registerDismissible(this),this.body.hidden=!1,this.popup.active=!0,await animateWithClass(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new WaAfterShowEvent)}else{const T=new WaHideEvent;if(this.dispatchEvent(T),T.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),unregisterDismissible(this),await animateWithClass(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new WaAfterHideEvent)}}handleForChange(){const T=this.getRootNode();if(!T)return;const w=this.for?T.getElementById(this.for):null,O=this.anchor;if(w===O)return;const{signal:F}=this.eventController;w&&(this.addToAriaLabelledBy(w,this.id),w.addEventListener("blur",this.handleBlur,{capture:!0,signal:F}),w.addEventListener("focus",this.handleFocus,{capture:!0,signal:F}),w.addEventListener("click",this.handleClick,{signal:F}),w.addEventListener("mouseover",this.handleMouseOver,{signal:F}),w.addEventListener("mouseout",this.handleMouseOut,{signal:F})),O&&(this.removeFromAriaLabelledBy(O,this.id),O.removeEventListener("blur",this.handleBlur,{capture:!0}),O.removeEventListener("focus",this.handleFocus,{capture:!0}),O.removeEventListener("click",this.handleClick),O.removeEventListener("mouseover",this.handleMouseOver),O.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=w}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,waitForEvent(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,waitForEvent(this,"wa-after-hide")}render(){return b`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${e$2({tooltip:!0,"tooltip-open":this.open})}
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
    `}};WaTooltip.css=tooltip_styles_default;WaTooltip.dependencies={"wa-popup":WaPopup};__decorateClass([e$4("slot:not([name])")],WaTooltip.prototype,"defaultSlot",2);__decorateClass([e$4(".body")],WaTooltip.prototype,"body",2);__decorateClass([e$4("wa-popup")],WaTooltip.prototype,"popup",2);__decorateClass([n$1()],WaTooltip.prototype,"placement",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTooltip.prototype,"disabled",2);__decorateClass([n$1({type:Number})],WaTooltip.prototype,"distance",2);__decorateClass([n$1({type:Boolean,reflect:!0})],WaTooltip.prototype,"open",2);__decorateClass([n$1({type:Number})],WaTooltip.prototype,"skidding",2);__decorateClass([n$1({attribute:"show-delay",type:Number})],WaTooltip.prototype,"showDelay",2);__decorateClass([n$1({attribute:"hide-delay",type:Number})],WaTooltip.prototype,"hideDelay",2);__decorateClass([n$1()],WaTooltip.prototype,"trigger",2);__decorateClass([n$1({attribute:"without-arrow",type:Boolean,reflect:!0})],WaTooltip.prototype,"withoutArrow",2);__decorateClass([n$1()],WaTooltip.prototype,"for",2);__decorateClass([r$2()],WaTooltip.prototype,"anchor",2);__decorateClass([watch("open",{waitUntilFirstUpdate:!0})],WaTooltip.prototype,"handleOpenChange",1);__decorateClass([watch("for")],WaTooltip.prototype,"handleForChange",1);__decorateClass([watch(["distance","placement","skidding"])],WaTooltip.prototype,"handleOptionsChange",1);__decorateClass([watch("disabled")],WaTooltip.prototype,"handleDisabledChange",1);WaTooltip=__decorateClass([t$1("wa-tooltip")],WaTooltip);(function(){const htmx={onLoad:null,process:null,on:null,off:null,trigger:null,ajax:null,find:null,findAll:null,closest:null,values:function(T,w){return getInputValues(T,w||"post").values},remove:null,addClass:null,removeClass:null,toggleClass:null,takeClass:null,swap:null,defineExtension:null,removeExtension:null,logAll:null,logNone:null,logger:null,config:{historyEnabled:!0,historyCacheSize:10,refreshOnHistoryMiss:!1,defaultSwapStyle:"innerHTML",defaultSwapDelay:0,defaultSettleDelay:20,includeIndicatorStyles:!0,indicatorClass:"htmx-indicator",requestClass:"htmx-request",addedClass:"htmx-added",settlingClass:"htmx-settling",swappingClass:"htmx-swapping",allowEval:!0,allowScriptTags:!0,inlineScriptNonce:"",inlineStyleNonce:"",attributesToSettle:["class","style","width","height"],withCredentials:!1,timeout:0,wsReconnectDelay:"full-jitter",wsBinaryType:"blob",disableSelector:"[hx-disable], [data-hx-disable]",scrollBehavior:"instant",defaultFocusScroll:!1,getCacheBusterParam:!1,globalViewTransitions:!1,methodsThatUseUrlParams:["get","delete"],selfRequestsOnly:!0,ignoreTitle:!1,scrollIntoViewOnBoost:!0,triggerSpecsCache:null,disableInheritance:!1,responseHandling:[{code:"204",swap:!1},{code:"[23]..",swap:!0},{code:"[45]..",swap:!1,error:!0}],allowNestedOobSwaps:!0,historyRestoreAsHxRequest:!0,reportValidityOfForms:!1},parseInterval:null,location,_:null,version:"2.0.8"};htmx.onLoad=onLoadHelper,htmx.process=processNode,htmx.on=addEventListenerImpl,htmx.off=removeEventListenerImpl,htmx.trigger=triggerEvent,htmx.ajax=ajaxHelper,htmx.find=find,htmx.findAll=findAll,htmx.closest=closest,htmx.remove=removeElement,htmx.addClass=addClassToElement,htmx.removeClass=removeClassFromElement,htmx.toggleClass=toggleClassOnElement,htmx.takeClass=takeClassForElement,htmx.swap=swap,htmx.defineExtension=defineExtension,htmx.removeExtension=removeExtension,htmx.logAll=logAll,htmx.logNone=logNone,htmx.parseInterval=parseInterval,htmx._=internalEval;const internalAPI={addTriggerHandler,bodyContains,canAccessLocalStorage,findThisElement,filterValues,swap,hasAttribute,getAttributeValue,getClosestAttributeValue,getClosestMatch,getExpressionVars,getHeaders,getInputValues,getInternalData,getSwapSpecification,getTriggerSpecs,getTarget,makeFragment,mergeObjects,makeSettleInfo,oobSwap,querySelectorExt,settleImmediately,shouldCancel,triggerEvent,triggerErrorEvent,withExtensions},VERBS=["get","post","put","delete","patch"],VERB_SELECTOR=VERBS.map(function(T){return"[hx-"+T+"], [data-hx-"+T+"]"}).join(", ");function parseInterval(T){if(T==null)return;let w=NaN;return T.slice(-2)=="ms"?w=parseFloat(T.slice(0,-2)):T.slice(-1)=="s"?w=parseFloat(T.slice(0,-1))*1e3:T.slice(-1)=="m"?w=parseFloat(T.slice(0,-1))*1e3*60:w=parseFloat(T),isNaN(w)?void 0:w}function getRawAttribute(T,w){return T instanceof Element&&T.getAttribute(w)}function hasAttribute(T,w){return!!T.hasAttribute&&(T.hasAttribute(w)||T.hasAttribute("data-"+w))}function getAttributeValue(T,w){return getRawAttribute(T,w)||getRawAttribute(T,"data-"+w)}function parentElt(T){const w=T.parentElement;return!w&&T.parentNode instanceof ShadowRoot?T.parentNode:w}function getDocument(){return document}function getRootNode(T,w){return T.getRootNode?T.getRootNode({composed:w}):getDocument()}function getClosestMatch(T,w){for(;T&&!w(T);)T=parentElt(T);return T||null}function getAttributeValueWithDisinheritance(T,w,O){const F=getAttributeValue(w,O),W=getAttributeValue(w,"hx-disinherit");var U=getAttributeValue(w,"hx-inherit");if(T!==w){if(htmx.config.disableInheritance)return U&&(U==="*"||U.split(" ").indexOf(O)>=0)?F:null;if(W&&(W==="*"||W.split(" ").indexOf(O)>=0))return"unset"}return F}function getClosestAttributeValue(T,w){let O=null;if(getClosestMatch(T,function(F){return!!(O=getAttributeValueWithDisinheritance(T,asElement(F),w))}),O!=="unset")return O}function matches(T,w){return T instanceof Element&&T.matches(w)}function getStartTag(T){const O=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i.exec(T);return O?O[1].toLowerCase():""}function parseHTML(T){return"parseHTMLUnsafe"in Document?Document.parseHTMLUnsafe(T):new DOMParser().parseFromString(T,"text/html")}function takeChildrenFor(T,w){for(;w.childNodes.length>0;)T.append(w.childNodes[0])}function duplicateScript(T){const w=getDocument().createElement("script");return forEach(T.attributes,function(O){w.setAttribute(O.name,O.value)}),w.textContent=T.textContent,w.async=!1,htmx.config.inlineScriptNonce&&(w.nonce=htmx.config.inlineScriptNonce),w}function isJavaScriptScriptNode(T){return T.matches("script")&&(T.type==="text/javascript"||T.type==="module"||T.type==="")}function normalizeScriptTags(T){Array.from(T.querySelectorAll("script")).forEach(w=>{if(isJavaScriptScriptNode(w)){const O=duplicateScript(w),F=w.parentNode;try{F.insertBefore(O,w)}catch(W){logError(W)}finally{w.remove()}}})}function makeFragment(T){const w=T.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i,""),O=getStartTag(w);let F;if(O==="html"){F=new DocumentFragment;const U=parseHTML(T);takeChildrenFor(F,U.body),F.title=U.title}else if(O==="body"){F=new DocumentFragment;const U=parseHTML(w);takeChildrenFor(F,U.body),F.title=U.title}else{const U=parseHTML('<body><template class="internal-htmx-wrapper">'+w+"</template></body>");F=U.querySelector("template").content,F.title=U.title;var W=F.querySelector("title");W&&W.parentNode===F&&(W.remove(),F.title=W.innerText)}return F&&(htmx.config.allowScriptTags?normalizeScriptTags(F):F.querySelectorAll("script").forEach(U=>U.remove())),F}function maybeCall(T){T&&T()}function isType(T,w){return Object.prototype.toString.call(T)==="[object "+w+"]"}function isFunction(T){return typeof T=="function"}function isRawObject(T){return isType(T,"Object")}function getInternalData(T){const w="htmx-internal-data";let O=T[w];return O||(O=T[w]={}),O}function toArray(T){const w=[];if(T)for(let O=0;O<T.length;O++)w.push(T[O]);return w}function forEach(T,w){if(T)for(let O=0;O<T.length;O++)w(T[O])}function isScrolledIntoView(T){const w=T.getBoundingClientRect(),O=w.top,F=w.bottom;return O<window.innerHeight&&F>=0}function bodyContains(T){return T.getRootNode({composed:!0})===document}function splitOnWhitespace(T){return T.trim().split(/\s+/)}function mergeObjects(T,w){for(const O in w)w.hasOwnProperty(O)&&(T[O]=w[O]);return T}function parseJSON(T){try{return JSON.parse(T)}catch(w){return logError(w),null}}function canAccessLocalStorage(){const T="htmx:sessionStorageTest";try{return sessionStorage.setItem(T,T),sessionStorage.removeItem(T),!0}catch{return!1}}function normalizePath(T){const w=new URL(T,"http://x");return w&&(T=w.pathname+w.search),T!="/"&&(T=T.replace(/\/+$/,"")),T}function internalEval(str){return maybeEval(getDocument().body,function(){return eval(str)})}function onLoadHelper(T){return htmx.on("htmx:load",function(O){T(O.detail.elt)})}function logAll(){htmx.logger=function(T,w,O){console&&console.log(w,T,O)}}function logNone(){htmx.logger=null}function find(T,w){return typeof T!="string"?T.querySelector(w):find(getDocument(),T)}function findAll(T,w){return typeof T!="string"?T.querySelectorAll(w):findAll(getDocument(),T)}function getWindow(){return window}function removeElement(T,w){T=resolveTarget(T),w?getWindow().setTimeout(function(){removeElement(T),T=null},w):parentElt(T).removeChild(T)}function asElement(T){return T instanceof Element?T:null}function asHtmlElement(T){return T instanceof HTMLElement?T:null}function asString(T){return typeof T=="string"?T:null}function asParentNode(T){return T instanceof Element||T instanceof Document||T instanceof DocumentFragment?T:null}function addClassToElement(T,w,O){T=asElement(resolveTarget(T)),T&&(O?getWindow().setTimeout(function(){addClassToElement(T,w),T=null},O):T.classList&&T.classList.add(w))}function removeClassFromElement(T,w,O){let F=asElement(resolveTarget(T));F&&(O?getWindow().setTimeout(function(){removeClassFromElement(F,w),F=null},O):F.classList&&(F.classList.remove(w),F.classList.length===0&&F.removeAttribute("class")))}function toggleClassOnElement(T,w){T=resolveTarget(T),T.classList.toggle(w)}function takeClassForElement(T,w){T=resolveTarget(T),forEach(T.parentElement.children,function(O){removeClassFromElement(O,w)}),addClassToElement(asElement(T),w)}function closest(T,w){return T=asElement(resolveTarget(T)),T?T.closest(w):null}function startsWith(T,w){return T.substring(0,w.length)===w}function endsWith(T,w){return T.substring(T.length-w.length)===w}function normalizeSelector(T){const w=T.trim();return startsWith(w,"<")&&endsWith(w,"/>")?w.substring(1,w.length-2):w}function querySelectorAllExt(T,w,O){if(w.indexOf("global ")===0)return querySelectorAllExt(T,w.slice(7),!0);T=resolveTarget(T);const F=[];{let q=0,j=0;for(let J=0;J<w.length;J++){const X=w[J];if(X===","&&q===0){F.push(w.substring(j,J)),j=J+1;continue}X==="<"?q++:X==="/"&&J<w.length-1&&w[J+1]===">"&&q--}j<w.length&&F.push(w.substring(j))}const W=[],U=[];for(;F.length>0;){const q=normalizeSelector(F.shift());let j;q.indexOf("closest ")===0?j=closest(asElement(T),normalizeSelector(q.slice(8))):q.indexOf("find ")===0?j=find(asParentNode(T),normalizeSelector(q.slice(5))):q==="next"||q==="nextElementSibling"?j=asElement(T).nextElementSibling:q.indexOf("next ")===0?j=scanForwardQuery(T,normalizeSelector(q.slice(5)),!!O):q==="previous"||q==="previousElementSibling"?j=asElement(T).previousElementSibling:q.indexOf("previous ")===0?j=scanBackwardsQuery(T,normalizeSelector(q.slice(9)),!!O):q==="document"?j=document:q==="window"?j=window:q==="body"?j=document.body:q==="root"?j=getRootNode(T,!!O):q==="host"?j=T.getRootNode().host:U.push(q),j&&W.push(j)}if(U.length>0){const q=U.join(","),j=asParentNode(getRootNode(T,!!O));W.push(...toArray(j.querySelectorAll(q)))}return W}var scanForwardQuery=function(T,w,O){const F=asParentNode(getRootNode(T,O)).querySelectorAll(w);for(let W=0;W<F.length;W++){const U=F[W];if(U.compareDocumentPosition(T)===Node.DOCUMENT_POSITION_PRECEDING)return U}},scanBackwardsQuery=function(T,w,O){const F=asParentNode(getRootNode(T,O)).querySelectorAll(w);for(let W=F.length-1;W>=0;W--){const U=F[W];if(U.compareDocumentPosition(T)===Node.DOCUMENT_POSITION_FOLLOWING)return U}};function querySelectorExt(T,w){return typeof T!="string"?querySelectorAllExt(T,w)[0]:querySelectorAllExt(getDocument().body,T)[0]}function resolveTarget(T,w){return typeof T=="string"?find(asParentNode(w)||document,T):T}function processEventArgs(T,w,O,F){return isFunction(w)?{target:getDocument().body,event:asString(T),listener:w,options:O}:{target:resolveTarget(T),event:asString(w),listener:O,options:F}}function addEventListenerImpl(T,w,O,F){return ready(function(){const U=processEventArgs(T,w,O,F);U.target.addEventListener(U.event,U.listener,U.options)}),isFunction(w)?w:O}function removeEventListenerImpl(T,w,O){return ready(function(){const F=processEventArgs(T,w,O);F.target.removeEventListener(F.event,F.listener)}),isFunction(w)?w:O}const DUMMY_ELT=getDocument().createElement("output");function findAttributeTargets(T,w){const O=getClosestAttributeValue(T,w);if(O){if(O==="this")return[findThisElement(T,w)];{const F=querySelectorAllExt(T,O);if(/(^|,)(\s*)inherit(\s*)($|,)/.test(O)){const U=asElement(getClosestMatch(T,function(q){return q!==T&&hasAttribute(asElement(q),w)}));U&&F.push(...findAttributeTargets(U,w))}return F.length===0?(logError('The selector "'+O+'" on '+w+" returned no matches!"),[DUMMY_ELT]):F}}}function findThisElement(T,w){return asElement(getClosestMatch(T,function(O){return getAttributeValue(asElement(O),w)!=null}))}function getTarget(T){const w=getClosestAttributeValue(T,"hx-target");return w?w==="this"?findThisElement(T,"hx-target"):querySelectorExt(T,w):getInternalData(T).boosted?getDocument().body:T}function shouldSettleAttribute(T){return htmx.config.attributesToSettle.includes(T)}function cloneAttributes(T,w){forEach(Array.from(T.attributes),function(O){!w.hasAttribute(O.name)&&shouldSettleAttribute(O.name)&&T.removeAttribute(O.name)}),forEach(w.attributes,function(O){shouldSettleAttribute(O.name)&&T.setAttribute(O.name,O.value)})}function isInlineSwap(T,w){const O=getExtensions(w);for(let F=0;F<O.length;F++){const W=O[F];try{if(W.isInlineSwap(T))return!0}catch(U){logError(U)}}return T==="outerHTML"}function oobSwap(T,w,O,F){F=F||getDocument();let W="#"+CSS.escape(getRawAttribute(w,"id")),U="outerHTML";T==="true"||(T.indexOf(":")>0?(U=T.substring(0,T.indexOf(":")),W=T.substring(T.indexOf(":")+1)):U=T),w.removeAttribute("hx-swap-oob"),w.removeAttribute("data-hx-swap-oob");const q=querySelectorAllExt(F,W,!1);return q.length?(forEach(q,function(j){let J;const X=w.cloneNode(!0);J=getDocument().createDocumentFragment(),J.appendChild(X),isInlineSwap(U,j)||(J=asParentNode(X));const Y={shouldSwap:!0,target:j,fragment:J};triggerEvent(j,"htmx:oobBeforeSwap",Y)&&(j=Y.target,Y.shouldSwap&&(handlePreservedElements(J),swapWithStyle(U,j,j,J,O),restorePreservedElements()),forEach(O.elts,function(K){triggerEvent(K,"htmx:oobAfterSwap",Y)}))}),w.parentNode.removeChild(w)):(w.parentNode.removeChild(w),triggerErrorEvent(getDocument().body,"htmx:oobErrorNoTarget",{content:w})),T}function restorePreservedElements(){const T=find("#--htmx-preserve-pantry--");if(T){for(const w of[...T.children]){const O=find("#"+w.id);O.parentNode.moveBefore(w,O),O.remove()}T.remove()}}function handlePreservedElements(T){forEach(findAll(T,"[hx-preserve], [data-hx-preserve]"),function(w){const O=getAttributeValue(w,"id"),F=getDocument().getElementById(O);if(F!=null)if(w.moveBefore){let W=find("#--htmx-preserve-pantry--");W==null&&(getDocument().body.insertAdjacentHTML("afterend","<div id='--htmx-preserve-pantry--'></div>"),W=find("#--htmx-preserve-pantry--")),W.moveBefore(F,null)}else w.parentNode.replaceChild(F,w)})}function handleAttributes(T,w,O){forEach(w.querySelectorAll("[id]"),function(F){const W=getRawAttribute(F,"id");if(W&&W.length>0){const U=W.replace("'","\\'"),q=F.tagName.replace(":","\\:"),j=asParentNode(T),J=j&&j.querySelector(q+"[id='"+U+"']");if(J&&J!==j){const X=F.cloneNode();cloneAttributes(F,J),O.tasks.push(function(){cloneAttributes(F,X)})}}})}function makeAjaxLoadTask(T){return function(){removeClassFromElement(T,htmx.config.addedClass),processNode(asElement(T)),processFocus(asParentNode(T)),triggerEvent(T,"htmx:load")}}function processFocus(T){const w="[autofocus]",O=asHtmlElement(matches(T,w)?T:T.querySelector(w));O!=null&&O.focus()}function insertNodesBefore(T,w,O,F){for(handleAttributes(T,O,F);O.childNodes.length>0;){const W=O.firstChild;addClassToElement(asElement(W),htmx.config.addedClass),T.insertBefore(W,w),W.nodeType!==Node.TEXT_NODE&&W.nodeType!==Node.COMMENT_NODE&&F.tasks.push(makeAjaxLoadTask(W))}}function stringHash(T,w){let O=0;for(;O<T.length;)w=(w<<5)-w+T.charCodeAt(O++)|0;return w}function attributeHash(T){let w=0;for(let O=0;O<T.attributes.length;O++){const F=T.attributes[O];F.value&&(w=stringHash(F.name,w),w=stringHash(F.value,w))}return w}function deInitOnHandlers(T){const w=getInternalData(T);if(w.onHandlers){for(let O=0;O<w.onHandlers.length;O++){const F=w.onHandlers[O];removeEventListenerImpl(T,F.event,F.listener)}delete w.onHandlers}}function deInitNode(T){const w=getInternalData(T);w.timeout&&clearTimeout(w.timeout),w.listenerInfos&&forEach(w.listenerInfos,function(O){O.on&&removeEventListenerImpl(O.on,O.trigger,O.listener)}),deInitOnHandlers(T),forEach(Object.keys(w),function(O){O!=="firstInitCompleted"&&delete w[O]})}function cleanUpElement(T){triggerEvent(T,"htmx:beforeCleanupElement"),deInitNode(T),forEach(T.children,function(w){cleanUpElement(w)})}function swapOuterHTML(T,w,O){if(T.tagName==="BODY")return swapInnerHTML(T,w,O);let F;const W=T.previousSibling,U=parentElt(T);if(U){for(insertNodesBefore(U,T,w,O),W==null?F=U.firstChild:F=W.nextSibling,O.elts=O.elts.filter(function(q){return q!==T});F&&F!==T;)F instanceof Element&&O.elts.push(F),F=F.nextSibling;cleanUpElement(T),T.remove()}}function swapAfterBegin(T,w,O){return insertNodesBefore(T,T.firstChild,w,O)}function swapBeforeBegin(T,w,O){return insertNodesBefore(parentElt(T),T,w,O)}function swapBeforeEnd(T,w,O){return insertNodesBefore(T,null,w,O)}function swapAfterEnd(T,w,O){return insertNodesBefore(parentElt(T),T.nextSibling,w,O)}function swapDelete(T){cleanUpElement(T);const w=parentElt(T);if(w)return w.removeChild(T)}function swapInnerHTML(T,w,O){const F=T.firstChild;if(insertNodesBefore(T,F,w,O),F){for(;F.nextSibling;)cleanUpElement(F.nextSibling),T.removeChild(F.nextSibling);cleanUpElement(F),T.removeChild(F)}}function swapWithStyle(T,w,O,F,W){switch(T){case"none":return;case"outerHTML":swapOuterHTML(O,F,W);return;case"afterbegin":swapAfterBegin(O,F,W);return;case"beforebegin":swapBeforeBegin(O,F,W);return;case"beforeend":swapBeforeEnd(O,F,W);return;case"afterend":swapAfterEnd(O,F,W);return;case"delete":swapDelete(O);return;default:var U=getExtensions(w);for(let q=0;q<U.length;q++){const j=U[q];try{const J=j.handleSwap(T,O,F,W);if(J){if(Array.isArray(J))for(let X=0;X<J.length;X++){const Y=J[X];Y.nodeType!==Node.TEXT_NODE&&Y.nodeType!==Node.COMMENT_NODE&&W.tasks.push(makeAjaxLoadTask(Y))}return}}catch(J){logError(J)}}T==="innerHTML"?swapInnerHTML(O,F,W):swapWithStyle(htmx.config.defaultSwapStyle,w,O,F,W)}}function findAndSwapOobElements(T,w,O){var F=findAll(T,"[hx-swap-oob], [data-hx-swap-oob]");return forEach(F,function(W){if(htmx.config.allowNestedOobSwaps||W.parentElement===null){const U=getAttributeValue(W,"hx-swap-oob");U!=null&&oobSwap(U,W,w,O)}else W.removeAttribute("hx-swap-oob"),W.removeAttribute("data-hx-swap-oob")}),F.length>0}function swap(T,w,O,F){F||(F={});let W=null,U=null,q=function(){maybeCall(F.beforeSwapCallback),T=resolveTarget(T);const X=F.contextElement?getRootNode(F.contextElement,!1):getDocument(),Y=document.activeElement;let K={};K={elt:Y,start:Y?Y.selectionStart:null,end:Y?Y.selectionEnd:null};const G=makeSettleInfo(T);if(O.swapStyle==="textContent")T.textContent=w;else{let Q=makeFragment(w);if(G.title=F.title||Q.title,F.historyRequest&&(Q=Q.querySelector("[hx-history-elt],[data-hx-history-elt]")||Q),F.selectOOB){const te=F.selectOOB.split(",");for(let ae=0;ae<te.length;ae++){const oe=te[ae].split(":",2);let ne=oe[0].trim();ne.indexOf("#")===0&&(ne=ne.substring(1));const re=oe[1]||"true",se=Q.querySelector("#"+ne);se&&oobSwap(re,se,G,X)}}if(findAndSwapOobElements(Q,G,X),forEach(findAll(Q,"template"),function(te){te.content&&findAndSwapOobElements(te.content,G,X)&&te.remove()}),F.select){const te=getDocument().createDocumentFragment();forEach(Q.querySelectorAll(F.select),function(ae){te.appendChild(ae)}),Q=te}handlePreservedElements(Q),swapWithStyle(O.swapStyle,F.contextElement,T,Q,G),restorePreservedElements()}if(K.elt&&!bodyContains(K.elt)&&getRawAttribute(K.elt,"id")){const Q=document.getElementById(getRawAttribute(K.elt,"id")),te={preventScroll:O.focusScroll!==void 0?!O.focusScroll:!htmx.config.defaultFocusScroll};if(Q){if(K.start&&Q.setSelectionRange)try{Q.setSelectionRange(K.start,K.end)}catch{}Q.focus(te)}}T.classList.remove(htmx.config.swappingClass),forEach(G.elts,function(Q){Q.classList&&Q.classList.add(htmx.config.settlingClass),triggerEvent(Q,"htmx:afterSwap",F.eventInfo)}),maybeCall(F.afterSwapCallback),O.ignoreTitle||handleTitle(G.title);const ee=function(){if(forEach(G.tasks,function(Q){Q.call()}),forEach(G.elts,function(Q){Q.classList&&Q.classList.remove(htmx.config.settlingClass),triggerEvent(Q,"htmx:afterSettle",F.eventInfo)}),F.anchor){const Q=asElement(resolveTarget("#"+F.anchor));Q&&Q.scrollIntoView({block:"start",behavior:"auto"})}updateScrollState(G.elts,O),maybeCall(F.afterSettleCallback),maybeCall(W)};O.settleDelay>0?getWindow().setTimeout(ee,O.settleDelay):ee()},j=htmx.config.globalViewTransitions;O.hasOwnProperty("transition")&&(j=O.transition);const J=F.contextElement||getDocument();if(j&&triggerEvent(J,"htmx:beforeTransition",F.eventInfo)&&typeof Promise<"u"&&document.startViewTransition){const X=new Promise(function(K,G){W=K,U=G}),Y=q;q=function(){document.startViewTransition(function(){return Y(),X})}}try{O!=null&&O.swapDelay&&O.swapDelay>0?getWindow().setTimeout(q,O.swapDelay):q()}catch(X){throw triggerErrorEvent(J,"htmx:swapError",F.eventInfo),maybeCall(U),X}}function handleTriggerHeader(T,w,O){const F=T.getResponseHeader(w);if(F.indexOf("{")===0){const W=parseJSON(F);for(const U in W)if(W.hasOwnProperty(U)){let q=W[U];isRawObject(q)?O=q.target!==void 0?q.target:O:q={value:q},triggerEvent(O,U,q)}}else{const W=F.split(",");for(let U=0;U<W.length;U++)triggerEvent(O,W[U].trim(),[])}}const WHITESPACE_OR_COMMA=/[\s,]/,SYMBOL_START=/[_$a-zA-Z]/,SYMBOL_CONT=/[_$a-zA-Z0-9]/,STRINGISH_START=['"',"'","/"],NOT_WHITESPACE=/[^\s]/,COMBINED_SELECTOR_START=/[{(]/,COMBINED_SELECTOR_END=/[})]/;function tokenizeString(T){const w=[];let O=0;for(;O<T.length;){if(SYMBOL_START.exec(T.charAt(O))){for(var F=O;SYMBOL_CONT.exec(T.charAt(O+1));)O++;w.push(T.substring(F,O+1))}else if(STRINGISH_START.indexOf(T.charAt(O))!==-1){const W=T.charAt(O);var F=O;for(O++;O<T.length&&T.charAt(O)!==W;)T.charAt(O)==="\\"&&O++,O++;w.push(T.substring(F,O+1))}else{const W=T.charAt(O);w.push(W)}O++}return w}function isPossibleRelativeReference(T,w,O){return SYMBOL_START.exec(T.charAt(0))&&T!=="true"&&T!=="false"&&T!=="this"&&T!==O&&w!=="."}function maybeGenerateConditional(T,w,O){if(w[0]==="["){w.shift();let F=1,W=" return (function("+O+"){ return (",U=null;for(;w.length>0;){const q=w[0];if(q==="]"){if(F--,F===0){U===null&&(W=W+"true"),w.shift(),W+=")})";try{const j=maybeEval(T,function(){return Function(W)()},function(){return!0});return j.source=W,j}catch(j){return triggerErrorEvent(getDocument().body,"htmx:syntax:error",{error:j,source:W}),null}}}else q==="["&&F++;isPossibleRelativeReference(q,U,O)?W+="(("+O+"."+q+") ? ("+O+"."+q+") : (window."+q+"))":W=W+q,U=w.shift()}}}function consumeUntil(T,w){let O="";for(;T.length>0&&!w.test(T[0]);)O+=T.shift();return O}function consumeCSSSelector(T){let w;return T.length>0&&COMBINED_SELECTOR_START.test(T[0])?(T.shift(),w=consumeUntil(T,COMBINED_SELECTOR_END).trim(),T.shift()):w=consumeUntil(T,WHITESPACE_OR_COMMA),w}const INPUT_SELECTOR="input, textarea, select";function parseAndCacheTrigger(T,w,O){const F=[],W=tokenizeString(w);do{consumeUntil(W,NOT_WHITESPACE);const j=W.length,J=consumeUntil(W,/[,\[\s]/);if(J!=="")if(J==="every"){const X={trigger:"every"};consumeUntil(W,NOT_WHITESPACE),X.pollInterval=parseInterval(consumeUntil(W,/[,\[\s]/)),consumeUntil(W,NOT_WHITESPACE);var U=maybeGenerateConditional(T,W,"event");U&&(X.eventFilter=U),F.push(X)}else{const X={trigger:J};var U=maybeGenerateConditional(T,W,"event");for(U&&(X.eventFilter=U),consumeUntil(W,NOT_WHITESPACE);W.length>0&&W[0]!==",";){const K=W.shift();if(K==="changed")X.changed=!0;else if(K==="once")X.once=!0;else if(K==="consume")X.consume=!0;else if(K==="delay"&&W[0]===":")W.shift(),X.delay=parseInterval(consumeUntil(W,WHITESPACE_OR_COMMA));else if(K==="from"&&W[0]===":"){if(W.shift(),COMBINED_SELECTOR_START.test(W[0]))var q=consumeCSSSelector(W);else{var q=consumeUntil(W,WHITESPACE_OR_COMMA);if(q==="closest"||q==="find"||q==="next"||q==="previous"){W.shift();const ee=consumeCSSSelector(W);ee.length>0&&(q+=" "+ee)}}X.from=q}else K==="target"&&W[0]===":"?(W.shift(),X.target=consumeCSSSelector(W)):K==="throttle"&&W[0]===":"?(W.shift(),X.throttle=parseInterval(consumeUntil(W,WHITESPACE_OR_COMMA))):K==="queue"&&W[0]===":"?(W.shift(),X.queue=consumeUntil(W,WHITESPACE_OR_COMMA)):K==="root"&&W[0]===":"?(W.shift(),X[K]=consumeCSSSelector(W)):K==="threshold"&&W[0]===":"?(W.shift(),X[K]=consumeUntil(W,WHITESPACE_OR_COMMA)):triggerErrorEvent(T,"htmx:syntax:error",{token:W.shift()});consumeUntil(W,NOT_WHITESPACE)}F.push(X)}W.length===j&&triggerErrorEvent(T,"htmx:syntax:error",{token:W.shift()}),consumeUntil(W,NOT_WHITESPACE)}while(W[0]===","&&W.shift());return O&&(O[w]=F),F}function getTriggerSpecs(T){const w=getAttributeValue(T,"hx-trigger");let O=[];if(w){const F=htmx.config.triggerSpecsCache;O=F&&F[w]||parseAndCacheTrigger(T,w,F)}return O.length>0?O:matches(T,"form")?[{trigger:"submit"}]:matches(T,'input[type="button"], input[type="submit"]')?[{trigger:"click"}]:matches(T,INPUT_SELECTOR)?[{trigger:"change"}]:[{trigger:"click"}]}function cancelPolling(T){getInternalData(T).cancelled=!0}function processPolling(T,w,O){const F=getInternalData(T);F.timeout=getWindow().setTimeout(function(){bodyContains(T)&&F.cancelled!==!0&&(maybeFilterEvent(O,T,makeEvent("hx:poll:trigger",{triggerSpec:O,target:T}))||w(T),processPolling(T,w,O))},O.pollInterval)}function isLocalLink(T){return location.hostname===T.hostname&&getRawAttribute(T,"href")&&getRawAttribute(T,"href").indexOf("#")!==0}function eltIsDisabled(T){return closest(T,htmx.config.disableSelector)}function boostElement(T,w,O){if(T instanceof HTMLAnchorElement&&isLocalLink(T)&&(T.target===""||T.target==="_self")||T.tagName==="FORM"&&String(getRawAttribute(T,"method")).toLowerCase()!=="dialog"){w.boosted=!0;let F,W;if(T.tagName==="A")F="get",W=getRawAttribute(T,"href");else{const U=getRawAttribute(T,"method");F=U?U.toLowerCase():"get",W=getRawAttribute(T,"action"),(W==null||W==="")&&(W=location.href),F==="get"&&W.includes("?")&&(W=W.replace(/\?[^#]+/,""))}O.forEach(function(U){addEventListener(T,function(q,j){const J=asElement(q);if(eltIsDisabled(J)){cleanUpElement(J);return}issueAjaxRequest(F,W,J,j)},w,U,!0)})}}function shouldCancel(T,w){if(T.type==="submit"&&w.tagName==="FORM")return!0;if(T.type==="click"){const O=w.closest('input[type="submit"], button');if(O&&O.form&&O.type==="submit")return!0;const F=w.closest("a"),W=/^#.+/;if(F&&F.href&&!W.test(F.getAttribute("href")))return!0}return!1}function ignoreBoostedAnchorCtrlClick(T,w){return getInternalData(T).boosted&&T instanceof HTMLAnchorElement&&w.type==="click"&&(w.ctrlKey||w.metaKey)}function maybeFilterEvent(T,w,O){const F=T.eventFilter;if(F)try{return F.call(w,O)!==!0}catch(W){const U=F.source;return triggerErrorEvent(getDocument().body,"htmx:eventFilter:error",{error:W,source:U}),!0}return!1}function addEventListener(T,w,O,F,W){const U=getInternalData(T);let q;F.from?q=querySelectorAllExt(T,F.from):q=[T],F.changed&&("lastValue"in U||(U.lastValue=new WeakMap),q.forEach(function(j){U.lastValue.has(F)||U.lastValue.set(F,new WeakMap),U.lastValue.get(F).set(j,j.value)})),forEach(q,function(j){const J=function(X){if(!bodyContains(T)){j.removeEventListener(F.trigger,J);return}if(ignoreBoostedAnchorCtrlClick(T,X)||((W||shouldCancel(X,j))&&X.preventDefault(),maybeFilterEvent(F,T,X)))return;const Y=getInternalData(X);if(Y.triggerSpec=F,Y.handledFor==null&&(Y.handledFor=[]),Y.handledFor.indexOf(T)<0){if(Y.handledFor.push(T),F.consume&&X.stopPropagation(),F.target&&X.target&&!matches(asElement(X.target),F.target))return;if(F.once){if(U.triggeredOnce)return;U.triggeredOnce=!0}if(F.changed){const K=X.target,G=K.value,ee=U.lastValue.get(F);if(ee.has(K)&&ee.get(K)===G)return;ee.set(K,G)}if(U.delayed&&clearTimeout(U.delayed),U.throttle)return;F.throttle>0?U.throttle||(triggerEvent(T,"htmx:trigger"),w(T,X),U.throttle=getWindow().setTimeout(function(){U.throttle=null},F.throttle)):F.delay>0?U.delayed=getWindow().setTimeout(function(){triggerEvent(T,"htmx:trigger"),w(T,X)},F.delay):(triggerEvent(T,"htmx:trigger"),w(T,X))}};O.listenerInfos==null&&(O.listenerInfos=[]),O.listenerInfos.push({trigger:F.trigger,listener:J,on:j}),j.addEventListener(F.trigger,J)})}let windowIsScrolling=!1,scrollHandler=null;function initScrollHandler(){scrollHandler||(scrollHandler=function(){windowIsScrolling=!0},window.addEventListener("scroll",scrollHandler),window.addEventListener("resize",scrollHandler),setInterval(function(){windowIsScrolling&&(windowIsScrolling=!1,forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"),function(T){maybeReveal(T)}))},200))}function maybeReveal(T){!hasAttribute(T,"data-hx-revealed")&&isScrolledIntoView(T)&&(T.setAttribute("data-hx-revealed","true"),getInternalData(T).initHash?triggerEvent(T,"revealed"):T.addEventListener("htmx:afterProcessNode",function(){triggerEvent(T,"revealed")},{once:!0}))}function loadImmediately(T,w,O,F){const W=function(){O.loaded||(O.loaded=!0,triggerEvent(T,"htmx:trigger"),w(T))};F>0?getWindow().setTimeout(W,F):W()}function processVerbs(T,w,O){let F=!1;return forEach(VERBS,function(W){if(hasAttribute(T,"hx-"+W)){const U=getAttributeValue(T,"hx-"+W);F=!0,w.path=U,w.verb=W,O.forEach(function(q){addTriggerHandler(T,q,w,function(j,J){const X=asElement(j);if(eltIsDisabled(X)){cleanUpElement(X);return}issueAjaxRequest(W,U,X,J)})})}}),F}function addTriggerHandler(T,w,O,F){if(w.trigger==="revealed")initScrollHandler(),addEventListener(T,F,O,w),maybeReveal(asElement(T));else if(w.trigger==="intersect"){const W={};w.root&&(W.root=querySelectorExt(T,w.root)),w.threshold&&(W.threshold=parseFloat(w.threshold)),new IntersectionObserver(function(q){for(let j=0;j<q.length;j++)if(q[j].isIntersecting){triggerEvent(T,"intersect");break}},W).observe(asElement(T)),addEventListener(asElement(T),F,O,w)}else!O.firstInitCompleted&&w.trigger==="load"?maybeFilterEvent(w,T,makeEvent("load",{elt:T}))||loadImmediately(asElement(T),F,O,w.delay):w.pollInterval>0?(O.polling=!0,processPolling(asElement(T),F,w)):addEventListener(T,F,O,w)}function shouldProcessHxOn(T){const w=asElement(T);if(!w)return!1;const O=w.attributes;for(let F=0;F<O.length;F++){const W=O[F].name;if(startsWith(W,"hx-on:")||startsWith(W,"data-hx-on:")||startsWith(W,"hx-on-")||startsWith(W,"data-hx-on-"))return!0}return!1}const HX_ON_QUERY=new XPathEvaluator().createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');function processHXOnRoot(T,w){shouldProcessHxOn(T)&&w.push(asElement(T));const O=HX_ON_QUERY.evaluate(T);let F=null;for(;F=O.iterateNext();)w.push(asElement(F))}function findHxOnWildcardElements(T){const w=[];if(T instanceof DocumentFragment)for(const O of T.childNodes)processHXOnRoot(O,w);else processHXOnRoot(T,w);return w}function findElementsToProcess(T){if(T.querySelectorAll){const O=", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]",F=[];for(const U in extensions){const q=extensions[U];if(q.getSelectors){var w=q.getSelectors();w&&F.push(w)}}return T.querySelectorAll(VERB_SELECTOR+O+", form, [type='submit'], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]"+F.flat().map(U=>", "+U).join(""))}else return[]}function maybeSetLastButtonClicked(T){const w=getTargetButton(T.target),O=getRelatedFormData(T);O&&(O.lastButtonClicked=w)}function maybeUnsetLastButtonClicked(T){const w=getRelatedFormData(T);w&&(w.lastButtonClicked=null)}function getTargetButton(T){return closest(asElement(T),"button, input[type='submit']")}function getRelatedForm(T){return T.form||closest(T,"form")}function getRelatedFormData(T){const w=getTargetButton(T.target);if(!w)return;const O=getRelatedForm(w);if(O)return getInternalData(O)}function initButtonTracking(T){T.addEventListener("click",maybeSetLastButtonClicked),T.addEventListener("focusin",maybeSetLastButtonClicked),T.addEventListener("focusout",maybeUnsetLastButtonClicked)}function addHxOnEventHandler(T,w,O){const F=getInternalData(T);Array.isArray(F.onHandlers)||(F.onHandlers=[]);let W;const U=function(q){maybeEval(T,function(){eltIsDisabled(T)||(W||(W=new Function("event",O)),W.call(T,q))})};T.addEventListener(w,U),F.onHandlers.push({event:w,listener:U})}function processHxOnWildcard(T){deInitOnHandlers(T);for(let w=0;w<T.attributes.length;w++){const O=T.attributes[w].name,F=T.attributes[w].value;if(startsWith(O,"hx-on")||startsWith(O,"data-hx-on")){const W=O.indexOf("-on")+3,U=O.slice(W,W+1);if(U==="-"||U===":"){let q=O.slice(W+1);startsWith(q,":")?q="htmx"+q:startsWith(q,"-")?q="htmx:"+q.slice(1):startsWith(q,"htmx-")&&(q="htmx:"+q.slice(5)),addHxOnEventHandler(T,q,F)}}}}function initNode(T){triggerEvent(T,"htmx:beforeProcessNode");const w=getInternalData(T),O=getTriggerSpecs(T);processVerbs(T,w,O)||(getClosestAttributeValue(T,"hx-boost")==="true"?boostElement(T,w,O):hasAttribute(T,"hx-trigger")&&O.forEach(function(W){addTriggerHandler(T,W,w,function(){})})),(T.tagName==="FORM"||getRawAttribute(T,"type")==="submit"&&hasAttribute(T,"form"))&&initButtonTracking(T),w.firstInitCompleted=!0,triggerEvent(T,"htmx:afterProcessNode")}function maybeDeInitAndHash(T){if(!(T instanceof Element))return!1;const w=getInternalData(T),O=attributeHash(T);return w.initHash!==O?(deInitNode(T),w.initHash=O,!0):!1}function processNode(T){if(T=resolveTarget(T),eltIsDisabled(T)){cleanUpElement(T);return}const w=[];maybeDeInitAndHash(T)&&w.push(T),forEach(findElementsToProcess(T),function(O){if(eltIsDisabled(O)){cleanUpElement(O);return}maybeDeInitAndHash(O)&&w.push(O)}),forEach(findHxOnWildcardElements(T),processHxOnWildcard),forEach(w,initNode)}function kebabEventName(T){return T.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}function makeEvent(T,w){return new CustomEvent(T,{bubbles:!0,cancelable:!0,composed:!0,detail:w})}function triggerErrorEvent(T,w,O){triggerEvent(T,w,mergeObjects({error:w},O))}function ignoreEventForLogging(T){return T==="htmx:afterProcessNode"}function withExtensions(T,w,O){forEach(getExtensions(T,[],O),function(F){try{w(F)}catch(W){logError(W)}})}function logError(T){console.error(T)}function triggerEvent(T,w,O){T=resolveTarget(T),O==null&&(O={}),O.elt=T;const F=makeEvent(w,O);htmx.logger&&!ignoreEventForLogging(w)&&htmx.logger(T,w,O),O.error&&(logError(O.error),triggerEvent(T,"htmx:error",{errorInfo:O}));let W=T.dispatchEvent(F);const U=kebabEventName(w);if(W&&U!==w){const q=makeEvent(U,F.detail);W=W&&T.dispatchEvent(q)}return withExtensions(asElement(T),function(q){W=W&&q.onEvent(w,F)!==!1&&!F.defaultPrevented}),W}let currentPathForHistory;function setCurrentPathForHistory(T){currentPathForHistory=T,canAccessLocalStorage()&&sessionStorage.setItem("htmx-current-path-for-history",T)}setCurrentPathForHistory(location.pathname+location.search);function getHistoryElement(){return getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]")||getDocument().body}function saveToHistoryCache(T,w){if(!canAccessLocalStorage())return;const O=cleanInnerHtmlForHistory(w),F=getDocument().title,W=window.scrollY;if(htmx.config.historyCacheSize<=0){sessionStorage.removeItem("htmx-history-cache");return}T=normalizePath(T);const U=parseJSON(sessionStorage.getItem("htmx-history-cache"))||[];for(let j=0;j<U.length;j++)if(U[j].url===T){U.splice(j,1);break}const q={url:T,content:O,title:F,scroll:W};for(triggerEvent(getDocument().body,"htmx:historyItemCreated",{item:q,cache:U}),U.push(q);U.length>htmx.config.historyCacheSize;)U.shift();for(;U.length>0;)try{sessionStorage.setItem("htmx-history-cache",JSON.stringify(U));break}catch(j){triggerErrorEvent(getDocument().body,"htmx:historyCacheError",{cause:j,cache:U}),U.shift()}}function getCachedHistory(T){if(!canAccessLocalStorage())return null;T=normalizePath(T);const w=parseJSON(sessionStorage.getItem("htmx-history-cache"))||[];for(let O=0;O<w.length;O++)if(w[O].url===T)return w[O];return null}function cleanInnerHtmlForHistory(T){const w=htmx.config.requestClass,O=T.cloneNode(!0);return forEach(findAll(O,"."+w),function(F){removeClassFromElement(F,w)}),forEach(findAll(O,"[data-disabled-by-htmx]"),function(F){F.removeAttribute("disabled")}),O.innerHTML}function saveCurrentPageToHistory(){const T=getHistoryElement();let w=currentPathForHistory;canAccessLocalStorage()&&(w=sessionStorage.getItem("htmx-current-path-for-history")),w=w||location.pathname+location.search,getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]')||(triggerEvent(getDocument().body,"htmx:beforeHistorySave",{path:w,historyElt:T}),saveToHistoryCache(w,T)),htmx.config.historyEnabled&&history.replaceState({htmx:!0},getDocument().title,location.href)}function pushUrlIntoHistory(T){htmx.config.getCacheBusterParam&&(T=T.replace(/org\.htmx\.cache-buster=[^&]*&?/,""),(endsWith(T,"&")||endsWith(T,"?"))&&(T=T.slice(0,-1))),htmx.config.historyEnabled&&history.pushState({htmx:!0},"",T),setCurrentPathForHistory(T)}function replaceUrlInHistory(T){htmx.config.historyEnabled&&history.replaceState({htmx:!0},"",T),setCurrentPathForHistory(T)}function settleImmediately(T){forEach(T,function(w){w.call(void 0)})}function loadHistoryFromServer(T){const w=new XMLHttpRequest,O={swapStyle:"innerHTML",swapDelay:0,settleDelay:0},F={path:T,xhr:w,historyElt:getHistoryElement(),swapSpec:O};w.open("GET",T,!0),htmx.config.historyRestoreAsHxRequest&&w.setRequestHeader("HX-Request","true"),w.setRequestHeader("HX-History-Restore-Request","true"),w.setRequestHeader("HX-Current-URL",location.href),w.onload=function(){this.status>=200&&this.status<400?(F.response=this.response,triggerEvent(getDocument().body,"htmx:historyCacheMissLoad",F),swap(F.historyElt,F.response,O,{contextElement:F.historyElt,historyRequest:!0}),setCurrentPathForHistory(F.path),triggerEvent(getDocument().body,"htmx:historyRestore",{path:T,cacheMiss:!0,serverResponse:F.response})):triggerErrorEvent(getDocument().body,"htmx:historyCacheMissLoadError",F)},triggerEvent(getDocument().body,"htmx:historyCacheMiss",F)&&w.send()}function restoreHistory(T){saveCurrentPageToHistory(),T=T||location.pathname+location.search;const w=getCachedHistory(T);if(w){const O={swapStyle:"innerHTML",swapDelay:0,settleDelay:0,scroll:w.scroll},F={path:T,item:w,historyElt:getHistoryElement(),swapSpec:O};triggerEvent(getDocument().body,"htmx:historyCacheHit",F)&&(swap(F.historyElt,w.content,O,{contextElement:F.historyElt,title:w.title}),setCurrentPathForHistory(F.path),triggerEvent(getDocument().body,"htmx:historyRestore",F))}else htmx.config.refreshOnHistoryMiss?htmx.location.reload(!0):loadHistoryFromServer(T)}function addRequestIndicatorClasses(T){let w=findAttributeTargets(T,"hx-indicator");return w==null&&(w=[T]),forEach(w,function(O){const F=getInternalData(O);F.requestCount=(F.requestCount||0)+1,O.classList.add.call(O.classList,htmx.config.requestClass)}),w}function disableElements(T){let w=findAttributeTargets(T,"hx-disabled-elt");return w==null&&(w=[]),forEach(w,function(O){const F=getInternalData(O);F.requestCount=(F.requestCount||0)+1,O.setAttribute("disabled",""),O.setAttribute("data-disabled-by-htmx","")}),w}function removeRequestIndicators(T,w){forEach(T.concat(w),function(O){const F=getInternalData(O);F.requestCount=(F.requestCount||1)-1}),forEach(T,function(O){getInternalData(O).requestCount===0&&O.classList.remove.call(O.classList,htmx.config.requestClass)}),forEach(w,function(O){getInternalData(O).requestCount===0&&(O.removeAttribute("disabled"),O.removeAttribute("data-disabled-by-htmx"))})}function haveSeenNode(T,w){for(let O=0;O<T.length;O++)if(T[O].isSameNode(w))return!0;return!1}function shouldInclude(T){const w=T;return w.name===""||w.name==null||w.disabled||closest(w,"fieldset[disabled]")||w.type==="button"||w.type==="submit"||w.tagName==="image"||w.tagName==="reset"||w.tagName==="file"?!1:w.type==="checkbox"||w.type==="radio"?w.checked:!0}function addValueToFormData(T,w,O){T!=null&&w!=null&&(Array.isArray(w)?w.forEach(function(F){O.append(T,F)}):O.append(T,w))}function removeValueFromFormData(T,w,O){if(T!=null&&w!=null){let F=O.getAll(T);Array.isArray(w)?F=F.filter(W=>w.indexOf(W)<0):F=F.filter(W=>W!==w),O.delete(T),forEach(F,W=>O.append(T,W))}}function getValueFromInput(T){return T instanceof HTMLSelectElement&&T.multiple?toArray(T.querySelectorAll("option:checked")).map(function(w){return w.value}):T instanceof HTMLInputElement&&T.files?toArray(T.files):T.value}function processInputValue(T,w,O,F,W){if(!(F==null||haveSeenNode(T,F))){if(T.push(F),shouldInclude(F)){const U=getRawAttribute(F,"name");addValueToFormData(U,getValueFromInput(F),w),W&&validateElement(F,O)}F instanceof HTMLFormElement&&(forEach(F.elements,function(U){T.indexOf(U)>=0?removeValueFromFormData(U.name,getValueFromInput(U),w):T.push(U),W&&validateElement(U,O)}),new FormData(F).forEach(function(U,q){U instanceof File&&U.name===""||addValueToFormData(q,U,w)}))}}function validateElement(T,w){const O=T;O.willValidate&&(triggerEvent(O,"htmx:validation:validate"),O.checkValidity()||(triggerEvent(O,"htmx:validation:failed",{message:O.validationMessage,validity:O.validity})&&!w.length&&htmx.config.reportValidityOfForms&&O.reportValidity(),w.push({elt:O,message:O.validationMessage,validity:O.validity})))}function overrideFormData(T,w){for(const O of w.keys())T.delete(O);return w.forEach(function(O,F){T.append(F,O)}),T}function getInputValues(T,w){const O=[],F=new FormData,W=new FormData,U=[],q=getInternalData(T);q.lastButtonClicked&&!bodyContains(q.lastButtonClicked)&&(q.lastButtonClicked=null);let j=T instanceof HTMLFormElement&&T.noValidate!==!0||getAttributeValue(T,"hx-validate")==="true";if(q.lastButtonClicked&&(j=j&&q.lastButtonClicked.formNoValidate!==!0),w!=="get"&&processInputValue(O,W,U,getRelatedForm(T),j),processInputValue(O,F,U,T,j),q.lastButtonClicked||T.tagName==="BUTTON"||T.tagName==="INPUT"&&getRawAttribute(T,"type")==="submit"){const X=q.lastButtonClicked||T,Y=getRawAttribute(X,"name");addValueToFormData(Y,X.value,W)}const J=findAttributeTargets(T,"hx-include");return forEach(J,function(X){processInputValue(O,F,U,asElement(X),j),matches(X,"form")||forEach(asParentNode(X).querySelectorAll(INPUT_SELECTOR),function(Y){processInputValue(O,F,U,Y,j)})}),overrideFormData(F,W),{errors:U,formData:F,values:formDataProxy(F)}}function appendParam(T,w,O){T!==""&&(T+="&"),String(O)==="[object Object]"&&(O=JSON.stringify(O));const F=encodeURIComponent(O);return T+=encodeURIComponent(w)+"="+F,T}function urlEncode(T){T=formDataFromObject(T);let w="";return T.forEach(function(O,F){w=appendParam(w,F,O)}),w}function getHeaders(T,w,O){const F={"HX-Request":"true","HX-Trigger":getRawAttribute(T,"id"),"HX-Trigger-Name":getRawAttribute(T,"name"),"HX-Target":getAttributeValue(w,"id"),"HX-Current-URL":location.href};return getValuesForElement(T,"hx-headers",!1,F),O!==void 0&&(F["HX-Prompt"]=O),getInternalData(T).boosted&&(F["HX-Boosted"]="true"),F}function filterValues(T,w){const O=getClosestAttributeValue(w,"hx-params");if(O){if(O==="none")return new FormData;if(O==="*")return T;if(O.indexOf("not ")===0)return forEach(O.slice(4).split(","),function(F){F=F.trim(),T.delete(F)}),T;{const F=new FormData;return forEach(O.split(","),function(W){W=W.trim(),T.has(W)&&T.getAll(W).forEach(function(U){F.append(W,U)})}),F}}else return T}function isAnchorLink(T){return!!getRawAttribute(T,"href")&&getRawAttribute(T,"href").indexOf("#")>=0}function getSwapSpecification(T,w){const O=w||getClosestAttributeValue(T,"hx-swap"),F={swapStyle:getInternalData(T).boosted?"innerHTML":htmx.config.defaultSwapStyle,swapDelay:htmx.config.defaultSwapDelay,settleDelay:htmx.config.defaultSettleDelay};if(htmx.config.scrollIntoViewOnBoost&&getInternalData(T).boosted&&!isAnchorLink(T)&&(F.show="top"),O){const q=splitOnWhitespace(O);if(q.length>0)for(let j=0;j<q.length;j++){const J=q[j];if(J.indexOf("swap:")===0)F.swapDelay=parseInterval(J.slice(5));else if(J.indexOf("settle:")===0)F.settleDelay=parseInterval(J.slice(7));else if(J.indexOf("transition:")===0)F.transition=J.slice(11)==="true";else if(J.indexOf("ignoreTitle:")===0)F.ignoreTitle=J.slice(12)==="true";else if(J.indexOf("scroll:")===0){var W=J.slice(7).split(":");const Y=W.pop();var U=W.length>0?W.join(":"):null;F.scroll=Y,F.scrollTarget=U}else if(J.indexOf("show:")===0){var W=J.slice(5).split(":");const K=W.pop();var U=W.length>0?W.join(":"):null;F.show=K,F.showTarget=U}else if(J.indexOf("focus-scroll:")===0){const X=J.slice(13);F.focusScroll=X=="true"}else j==0?F.swapStyle=J:logError("Unknown modifier in hx-swap: "+J)}}return F}function usesFormData(T){return getClosestAttributeValue(T,"hx-encoding")==="multipart/form-data"||matches(T,"form")&&getRawAttribute(T,"enctype")==="multipart/form-data"}function encodeParamsForBody(T,w,O){let F=null;return withExtensions(w,function(W){F==null&&(F=W.encodeParameters(T,O,w))}),F??(usesFormData(w)?overrideFormData(new FormData,formDataFromObject(O)):urlEncode(O))}function makeSettleInfo(T){return{tasks:[],elts:[T]}}function updateScrollState(T,w){const O=T[0],F=T[T.length-1];if(w.scroll){var W=null;w.scrollTarget&&(W=asElement(querySelectorExt(O,w.scrollTarget))),w.scroll==="top"&&(O||W)&&(W=W||O,W.scrollTop=0),w.scroll==="bottom"&&(F||W)&&(W=W||F,W.scrollTop=W.scrollHeight),typeof w.scroll=="number"&&getWindow().setTimeout(function(){window.scrollTo(0,w.scroll)},0)}if(w.show){var W=null;if(w.showTarget){let q=w.showTarget;w.showTarget==="window"&&(q="body"),W=asElement(querySelectorExt(O,q))}w.show==="top"&&(O||W)&&(W=W||O,W.scrollIntoView({block:"start",behavior:htmx.config.scrollBehavior})),w.show==="bottom"&&(F||W)&&(W=W||F,W.scrollIntoView({block:"end",behavior:htmx.config.scrollBehavior}))}}function getValuesForElement(T,w,O,F,W){if(F==null&&(F={}),T==null)return F;const U=getAttributeValue(T,w);if(U){let q=U.trim(),j=O;if(q==="unset")return null;q.indexOf("javascript:")===0?(q=q.slice(11),j=!0):q.indexOf("js:")===0&&(q=q.slice(3),j=!0),q.indexOf("{")!==0&&(q="{"+q+"}");let J;j?J=maybeEval(T,function(){return W?Function("event","return ("+q+")").call(T,W):Function("return ("+q+")").call(T)},{}):J=parseJSON(q);for(const X in J)J.hasOwnProperty(X)&&F[X]==null&&(F[X]=J[X])}return getValuesForElement(asElement(parentElt(T)),w,O,F,W)}function maybeEval(T,w,O){return htmx.config.allowEval?w():(triggerErrorEvent(T,"htmx:evalDisallowedError"),O)}function getHXVarsForElement(T,w,O){return getValuesForElement(T,"hx-vars",!0,O,w)}function getHXValsForElement(T,w,O){return getValuesForElement(T,"hx-vals",!1,O,w)}function getExpressionVars(T,w){return mergeObjects(getHXVarsForElement(T,w),getHXValsForElement(T,w))}function safelySetHeaderValue(T,w,O){if(O!==null)try{T.setRequestHeader(w,O)}catch{T.setRequestHeader(w,encodeURIComponent(O)),T.setRequestHeader(w+"-URI-AutoEncoded","true")}}function getPathFromResponse(T){if(T.responseURL)try{const w=new URL(T.responseURL);return w.pathname+w.search}catch{triggerErrorEvent(getDocument().body,"htmx:badResponseUrl",{url:T.responseURL})}}function hasHeader(T,w){return w.test(T.getAllResponseHeaders())}function ajaxHelper(T,w,O){if(T=T.toLowerCase(),O){if(O instanceof Element||typeof O=="string")return issueAjaxRequest(T,w,null,null,{targetOverride:resolveTarget(O)||DUMMY_ELT,returnPromise:!0});{let F=resolveTarget(O.target);return(O.target&&!F||O.source&&!F&&!resolveTarget(O.source))&&(F=DUMMY_ELT),issueAjaxRequest(T,w,resolveTarget(O.source),O.event,{handler:O.handler,headers:O.headers,values:O.values,targetOverride:F,swapOverride:O.swap,select:O.select,returnPromise:!0,push:O.push,replace:O.replace,selectOOB:O.selectOOB})}}else return issueAjaxRequest(T,w,null,null,{returnPromise:!0})}function hierarchyForElt(T){const w=[];for(;T;)w.push(T),T=T.parentElement;return w}function verifyPath(T,w,O){const F=new URL(w,location.protocol!=="about:"?location.href:window.origin),U=(location.protocol!=="about:"?location.origin:window.origin)===F.origin;return htmx.config.selfRequestsOnly&&!U?!1:triggerEvent(T,"htmx:validateUrl",mergeObjects({url:F,sameHost:U},O))}function formDataFromObject(T){if(T instanceof FormData)return T;const w=new FormData;for(const O in T)T.hasOwnProperty(O)&&(T[O]&&typeof T[O].forEach=="function"?T[O].forEach(function(F){w.append(O,F)}):typeof T[O]=="object"&&!(T[O]instanceof Blob)?w.append(O,JSON.stringify(T[O])):w.append(O,T[O]));return w}function formDataArrayProxy(T,w,O){return new Proxy(O,{get:function(F,W){return typeof W=="number"?F[W]:W==="length"?F.length:W==="push"?function(U){F.push(U),T.append(w,U)}:typeof F[W]=="function"?function(){F[W].apply(F,arguments),T.delete(w),F.forEach(function(U){T.append(w,U)})}:F[W]&&F[W].length===1?F[W][0]:F[W]},set:function(F,W,U){return F[W]=U,T.delete(w),F.forEach(function(q){T.append(w,q)}),!0}})}function formDataProxy(T){return new Proxy(T,{get:function(w,O){if(typeof O=="symbol"){const W=Reflect.get(w,O);return typeof W=="function"?function(){return W.apply(T,arguments)}:W}if(O==="toJSON")return()=>Object.fromEntries(T);if(O in w&&typeof w[O]=="function")return function(){return T[O].apply(T,arguments)};const F=T.getAll(O);if(F.length!==0)return F.length===1?F[0]:formDataArrayProxy(w,O,F)},set:function(w,O,F){return typeof O!="string"?!1:(w.delete(O),F&&typeof F.forEach=="function"?F.forEach(function(W){w.append(O,W)}):typeof F=="object"&&!(F instanceof Blob)?w.append(O,JSON.stringify(F)):w.append(O,F),!0)},deleteProperty:function(w,O){return typeof O=="string"&&w.delete(O),!0},ownKeys:function(w){return Reflect.ownKeys(Object.fromEntries(w))},getOwnPropertyDescriptor:function(w,O){return Reflect.getOwnPropertyDescriptor(Object.fromEntries(w),O)}})}function issueAjaxRequest(T,w,O,F,W,U){let q=null,j=null;if(W=W??{},W.returnPromise&&typeof Promise<"u")var J=new Promise(function(ie,pe){q=ie,j=pe});O==null&&(O=getDocument().body);const X=W.handler||handleAjaxResponse,Y=W.select||null;if(!bodyContains(O))return maybeCall(q),J;const K=W.targetOverride||asElement(getTarget(O));if(K==null||K==DUMMY_ELT)return triggerErrorEvent(O,"htmx:targetError",{target:getClosestAttributeValue(O,"hx-target")}),maybeCall(j),J;let G=getInternalData(O);const ee=G.lastButtonClicked;if(ee){const ie=getRawAttribute(ee,"formaction");ie!=null&&(w=ie);const pe=getRawAttribute(ee,"formmethod");if(pe!=null)if(VERBS.includes(pe.toLowerCase()))T=pe;else return maybeCall(q),J}const Q=getClosestAttributeValue(O,"hx-confirm");if(U===void 0&&triggerEvent(O,"htmx:confirm",{target:K,elt:O,path:w,verb:T,triggeringEvent:F,etc:W,issueRequest:function(ke){return issueAjaxRequest(T,w,O,F,W,!!ke)},question:Q})===!1)return maybeCall(q),J;let te=O,ae=getClosestAttributeValue(O,"hx-sync"),oe=null,ne=!1;if(ae){const ie=ae.split(":"),pe=ie[0].trim();if(pe==="this"?te=findThisElement(O,"hx-sync"):te=asElement(querySelectorExt(O,pe)),ae=(ie[1]||"drop").trim(),G=getInternalData(te),ae==="drop"&&G.xhr&&G.abortable!==!0)return maybeCall(q),J;if(ae==="abort"){if(G.xhr)return maybeCall(q),J;ne=!0}else ae==="replace"?triggerEvent(te,"htmx:abort"):ae.indexOf("queue")===0&&(oe=(ae.split(" ")[1]||"last").trim())}if(G.xhr)if(G.abortable)triggerEvent(te,"htmx:abort");else{if(oe==null){if(F){const ie=getInternalData(F);ie&&ie.triggerSpec&&ie.triggerSpec.queue&&(oe=ie.triggerSpec.queue)}oe==null&&(oe="last")}return G.queuedRequests==null&&(G.queuedRequests=[]),oe==="first"&&G.queuedRequests.length===0?G.queuedRequests.push(function(){issueAjaxRequest(T,w,O,F,W)}):oe==="all"?G.queuedRequests.push(function(){issueAjaxRequest(T,w,O,F,W)}):oe==="last"&&(G.queuedRequests=[],G.queuedRequests.push(function(){issueAjaxRequest(T,w,O,F,W)})),maybeCall(q),J}const re=new XMLHttpRequest;G.xhr=re,G.abortable=ne;const se=function(){G.xhr=null,G.abortable=!1,G.queuedRequests!=null&&G.queuedRequests.length>0&&G.queuedRequests.shift()()},ue=getClosestAttributeValue(O,"hx-prompt");if(ue){var de=prompt(ue);if(de===null||!triggerEvent(O,"htmx:prompt",{prompt:de,target:K}))return maybeCall(q),se(),J}if(Q&&!U&&!confirm(Q))return maybeCall(q),se(),J;let le=getHeaders(O,K,de);T!=="get"&&!usesFormData(O)&&(le["Content-Type"]="application/x-www-form-urlencoded"),W.headers&&(le=mergeObjects(le,W.headers));const _e=getInputValues(O,T);let ge=_e.errors;const be=_e.formData;W.values&&overrideFormData(be,formDataFromObject(W.values));const Ce=formDataFromObject(getExpressionVars(O,F)),ve=overrideFormData(be,Ce);let fe=filterValues(ve,O);htmx.config.getCacheBusterParam&&T==="get"&&fe.set("org.htmx.cache-buster",getRawAttribute(K,"id")||"true"),(w==null||w==="")&&(w=location.href);const he=getValuesForElement(O,"hx-request"),xe=getInternalData(O).boosted;let we=htmx.config.methodsThatUseUrlParams.indexOf(T)>=0;const ce={boosted:xe,useUrlParams:we,formData:fe,parameters:formDataProxy(fe),unfilteredFormData:ve,unfilteredParameters:formDataProxy(ve),headers:le,elt:O,target:K,verb:T,errors:ge,withCredentials:W.credentials||he.credentials||htmx.config.withCredentials,timeout:W.timeout||he.timeout||htmx.config.timeout,path:w,triggeringEvent:F};if(!triggerEvent(O,"htmx:configRequest",ce))return maybeCall(q),se(),J;if(w=ce.path,T=ce.verb,le=ce.headers,fe=formDataFromObject(ce.parameters),ge=ce.errors,we=ce.useUrlParams,ge&&ge.length>0)return triggerEvent(O,"htmx:validation:halted",ce),maybeCall(q),se(),J;const ye=w.split("#"),Ee=ye[0],Ae=ye[1];let $e=w;if(we&&($e=Ee,!fe.keys().next().done&&($e.indexOf("?")<0?$e+="?":$e+="&",$e+=urlEncode(fe),Ae&&($e+="#"+Ae))),!verifyPath(O,$e,ce))return triggerErrorEvent(O,"htmx:invalidPath",ce),maybeCall(j),se(),J;if(re.open(T.toUpperCase(),$e,!0),re.overrideMimeType("text/html"),re.withCredentials=ce.withCredentials,re.timeout=ce.timeout,!he.noHeaders){for(const ie in le)if(le.hasOwnProperty(ie)){const pe=le[ie];safelySetHeaderValue(re,ie,pe)}}const me={xhr:re,target:K,requestConfig:ce,etc:W,boosted:xe,select:Y,pathInfo:{requestPath:w,finalRequestPath:$e,responsePath:null,anchor:Ae}};if(re.onload=function(){try{const ie=hierarchyForElt(O);if(me.pathInfo.responsePath=getPathFromResponse(re),X(O,me),me.keepIndicators!==!0&&removeRequestIndicators(Te,Le),triggerEvent(O,"htmx:afterRequest",me),triggerEvent(O,"htmx:afterOnLoad",me),!bodyContains(O)){let pe=null;for(;ie.length>0&&pe==null;){const ke=ie.shift();bodyContains(ke)&&(pe=ke)}pe&&(triggerEvent(pe,"htmx:afterRequest",me),triggerEvent(pe,"htmx:afterOnLoad",me))}maybeCall(q)}catch(ie){throw triggerErrorEvent(O,"htmx:onLoadError",mergeObjects({error:ie},me)),ie}finally{se()}},re.onerror=function(){removeRequestIndicators(Te,Le),triggerErrorEvent(O,"htmx:afterRequest",me),triggerErrorEvent(O,"htmx:sendError",me),maybeCall(j),se()},re.onabort=function(){removeRequestIndicators(Te,Le),triggerErrorEvent(O,"htmx:afterRequest",me),triggerErrorEvent(O,"htmx:sendAbort",me),maybeCall(j),se()},re.ontimeout=function(){removeRequestIndicators(Te,Le),triggerErrorEvent(O,"htmx:afterRequest",me),triggerErrorEvent(O,"htmx:timeout",me),maybeCall(j),se()},!triggerEvent(O,"htmx:beforeRequest",me))return maybeCall(q),se(),J;var Te=addRequestIndicatorClasses(O),Le=disableElements(O);forEach(["loadstart","loadend","progress","abort"],function(ie){forEach([re,re.upload],function(pe){pe.addEventListener(ie,function(ke){triggerEvent(O,"htmx:xhr:"+ie,{lengthComputable:ke.lengthComputable,loaded:ke.loaded,total:ke.total})})})}),triggerEvent(O,"htmx:beforeSend",me);const Be=we?null:encodeParamsForBody(re,O,fe);return re.send(Be),J}function determineHistoryUpdates(T,w){const O=w.xhr;let F=null,W=null;if(hasHeader(O,/HX-Push:/i)?(F=O.getResponseHeader("HX-Push"),W="push"):hasHeader(O,/HX-Push-Url:/i)?(F=O.getResponseHeader("HX-Push-Url"),W="push"):hasHeader(O,/HX-Replace-Url:/i)&&(F=O.getResponseHeader("HX-Replace-Url"),W="replace"),F)return F==="false"?{}:{type:W,path:F};const U=w.pathInfo.finalRequestPath,q=w.pathInfo.responsePath,j=w.etc.push||getClosestAttributeValue(T,"hx-push-url"),J=w.etc.replace||getClosestAttributeValue(T,"hx-replace-url"),X=getInternalData(T).boosted;let Y=null,K=null;return j?(Y="push",K=j):J?(Y="replace",K=J):X&&(Y="push",K=q||U),K?K==="false"?{}:(K==="true"&&(K=q||U),w.pathInfo.anchor&&K.indexOf("#")===-1&&(K=K+"#"+w.pathInfo.anchor),{type:Y,path:K}):{}}function codeMatches(T,w){var O=new RegExp(T.code);return O.test(w.toString(10))}function resolveResponseHandling(T){for(var w=0;w<htmx.config.responseHandling.length;w++){var O=htmx.config.responseHandling[w];if(codeMatches(O,T.status))return O}return{swap:!1}}function handleTitle(T){if(T){const w=find("title");w?w.textContent=T:window.document.title=T}}function resolveRetarget(T,w){if(w==="this")return T;const O=asElement(querySelectorExt(T,w));if(O==null)throw triggerErrorEvent(T,"htmx:targetError",{target:w}),new Error(`Invalid re-target ${w}`);return O}function handleAjaxResponse(T,w){const O=w.xhr;let F=w.target;const W=w.etc,U=w.select;if(!triggerEvent(T,"htmx:beforeOnLoad",w))return;if(hasHeader(O,/HX-Trigger:/i)&&handleTriggerHeader(O,"HX-Trigger",T),hasHeader(O,/HX-Location:/i)){let ne=O.getResponseHeader("HX-Location");var q={};ne.indexOf("{")===0&&(q=parseJSON(ne),ne=q.path,delete q.path),q.push=q.push||"true",ajaxHelper("get",ne,q);return}const j=hasHeader(O,/HX-Refresh:/i)&&O.getResponseHeader("HX-Refresh")==="true";if(hasHeader(O,/HX-Redirect:/i)){w.keepIndicators=!0,htmx.location.href=O.getResponseHeader("HX-Redirect"),j&&htmx.location.reload();return}if(j){w.keepIndicators=!0,htmx.location.reload();return}const J=determineHistoryUpdates(T,w),X=resolveResponseHandling(O),Y=X.swap;let K=!!X.error,G=htmx.config.ignoreTitle||X.ignoreTitle,ee=X.select;X.target&&(w.target=resolveRetarget(T,X.target));var Q=W.swapOverride;Q==null&&X.swapOverride&&(Q=X.swapOverride),hasHeader(O,/HX-Retarget:/i)&&(w.target=resolveRetarget(T,O.getResponseHeader("HX-Retarget"))),hasHeader(O,/HX-Reswap:/i)&&(Q=O.getResponseHeader("HX-Reswap"));var te=O.response,ae=mergeObjects({shouldSwap:Y,serverResponse:te,isError:K,ignoreTitle:G,selectOverride:ee,swapOverride:Q},w);if(!(X.event&&!triggerEvent(F,X.event,ae))&&triggerEvent(F,"htmx:beforeSwap",ae)){if(F=ae.target,te=ae.serverResponse,K=ae.isError,G=ae.ignoreTitle,ee=ae.selectOverride,Q=ae.swapOverride,w.target=F,w.failed=K,w.successful=!K,ae.shouldSwap){O.status===286&&cancelPolling(T),withExtensions(T,function(se){te=se.transformResponse(te,O,T)}),J.type&&saveCurrentPageToHistory();var oe=getSwapSpecification(T,Q);oe.hasOwnProperty("ignoreTitle")||(oe.ignoreTitle=G),F.classList.add(htmx.config.swappingClass),U&&(ee=U),hasHeader(O,/HX-Reselect:/i)&&(ee=O.getResponseHeader("HX-Reselect"));const ne=W.selectOOB||getClosestAttributeValue(T,"hx-select-oob"),re=getClosestAttributeValue(T,"hx-select");swap(F,te,oe,{select:ee==="unset"?null:ee||re,selectOOB:ne,eventInfo:w,anchor:w.pathInfo.anchor,contextElement:T,afterSwapCallback:function(){if(hasHeader(O,/HX-Trigger-After-Swap:/i)){let se=T;bodyContains(T)||(se=getDocument().body),handleTriggerHeader(O,"HX-Trigger-After-Swap",se)}},afterSettleCallback:function(){if(hasHeader(O,/HX-Trigger-After-Settle:/i)){let se=T;bodyContains(T)||(se=getDocument().body),handleTriggerHeader(O,"HX-Trigger-After-Settle",se)}},beforeSwapCallback:function(){J.type&&(triggerEvent(getDocument().body,"htmx:beforeHistoryUpdate",mergeObjects({history:J},w)),J.type==="push"?(pushUrlIntoHistory(J.path),triggerEvent(getDocument().body,"htmx:pushedIntoHistory",{path:J.path})):(replaceUrlInHistory(J.path),triggerEvent(getDocument().body,"htmx:replacedInHistory",{path:J.path})))}})}K&&triggerErrorEvent(T,"htmx:responseError",mergeObjects({error:"Response Status Error Code "+O.status+" from "+w.pathInfo.requestPath},w))}}const extensions={};function extensionBase(){return{init:function(T){return null},getSelectors:function(){return null},onEvent:function(T,w){return!0},transformResponse:function(T,w,O){return T},isInlineSwap:function(T){return!1},handleSwap:function(T,w,O,F){return!1},encodeParameters:function(T,w,O){return null}}}function defineExtension(T,w){w.init&&w.init(internalAPI),extensions[T]=mergeObjects(extensionBase(),w)}function removeExtension(T){delete extensions[T]}function getExtensions(T,w,O){if(w==null&&(w=[]),T==null)return w;O==null&&(O=[]);const F=getAttributeValue(T,"hx-ext");return F&&forEach(F.split(","),function(W){if(W=W.replace(/ /g,""),W.slice(0,7)=="ignore:"){O.push(W.slice(7));return}if(O.indexOf(W)<0){const U=extensions[W];U&&w.indexOf(U)<0&&w.push(U)}}),getExtensions(asElement(parentElt(T)),w,O)}var isReady=!1;getDocument().addEventListener("DOMContentLoaded",function(){isReady=!0});function ready(T){isReady||getDocument().readyState==="complete"?T():getDocument().addEventListener("DOMContentLoaded",T)}function insertIndicatorStyles(){if(htmx.config.includeIndicatorStyles!==!1){const T=htmx.config.inlineStyleNonce?` nonce="${htmx.config.inlineStyleNonce}"`:"",w=htmx.config.indicatorClass,O=htmx.config.requestClass;getDocument().head.insertAdjacentHTML("beforeend",`<style${T}>.${w}{opacity:0;visibility: hidden} .${O} .${w}, .${O}.${w}{opacity:1;visibility: visible;transition: opacity 200ms ease-in}</style>`)}}function getMetaConfig(){const T=getDocument().querySelector('meta[name="htmx-config"]');return T?parseJSON(T.content):null}function mergeMetaConfig(){const T=getMetaConfig();T&&(htmx.config=mergeObjects(htmx.config,T))}return ready(function(){mergeMetaConfig(),insertIndicatorStyles();let T=getDocument().body;processNode(T);const w=getDocument().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");T.addEventListener("htmx:abort",function(F){const W=F.detail.elt||F.target,U=getInternalData(W);U&&U.xhr&&U.xhr.abort()});const O=window.onpopstate?window.onpopstate.bind(window):null;window.onpopstate=function(F){F.state&&F.state.htmx?(restoreHistory(),forEach(w,function(W){triggerEvent(W,"htmx:restored",{document:getDocument(),triggerEvent})})):O&&O(F)},getWindow().setTimeout(function(){triggerEvent(T,"htmx:load",{}),T=null},0)}),htmx})();class ThemeToggle extends i$3{connectedCallback(){var F;super.connectedCallback();const O=localStorage.getItem("theme")||((F=window.matchMedia)!=null&&F.call(window,"(prefers-color-scheme: dark)").matches?"dark":"light");this._applyTheme(O)}get _isDark(){return document.documentElement.classList.contains("wa-dark")}_applyTheme(w){document.documentElement.classList.toggle("wa-dark",w==="dark"),document.documentElement.setAttribute("data-theme",w),localStorage.setItem("theme",w),this.requestUpdate()}_toggle(){this._applyTheme(this._isDark?"light":"dark")}render(){return b`
      <wa-button
        appearance="plain"
        size="small"
        aria-label="Toggle theme"
        title="Toggle theme"
        @click=${this._toggle}
      >
        <wa-icon slot="start" name=${this._isDark?"moon":"sun"}></wa-icon>
      </wa-button>
    `}}Se(ThemeToggle,"styles",i$6`
    :host { display: inline-flex; align-items: center; }
  `);customElements.define("theme-toggle",ThemeToggle);let _urlBase="";function setUrlBase(T){_urlBase=T}function getUrlBase(){return _urlBase||window.urlBase||""}function joinURL(T,w){return T.endsWith("/")||(T+="/"),w.startsWith("/")&&(w=w.substring(1)),T+w}async function fetcher(T,w={}){const O=joinURL(getUrlBase(),T),F={headers:{},...w};return w.body instanceof FormData||(F.headers["Content-Type"]="application/json"),F.headers={...F.headers,...w.headers},fetch(O,F)}function escapeHtml(T){if(!T)return"";const w={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return T.replace(/[&<>"']/g,O=>w[O])}function formatBytes(T){if(!T||T===0)return"0 B";const w=1024,O=["B","KB","MB","GB","TB","PB"],F=Math.floor(Math.log(T)/Math.log(w));return`${parseFloat((T/Math.pow(w,F)).toFixed(2))} ${O[F]}`}function formatSpeed(T){return`${formatBytes(T)}/s`}function formatDuration(T){if(!T||T===0)return"0s";const w=[{label:"d",seconds:86400},{label:"h",seconds:3600},{label:"m",seconds:60},{label:"s",seconds:1}],O=[];let F=T;for(const W of w){const U=Math.floor(F/W.seconds);U>0&&(O.push(`${U}${W.label}`),F%=W.seconds)}return O.slice(0,2).join(" ")||"0s"}function formatNumber(T){try{return Number(T).toLocaleString()}catch{return T??"-"}}function debounce(T,w,O=!1){let F;return function(...U){const q=()=>{F=null,O||T(...U)},j=O&&!F;clearTimeout(F),F=setTimeout(q,w),j&&T(...U)}}async function copyToClipboard(T){try{return await navigator.clipboard.writeText(T),createToast("Copied to clipboard","success"),!0}catch{return createToast("Failed to copy to clipboard","error"),!1}}function isValidUrl(T){try{return new URL(T),!0}catch{return!1}}function setButtonLoading(T,w=!0,O=null){if(typeof T=="string"&&(T=document.getElementById(T)||document.querySelector(T)),!!T){if(T.tagName&&T.tagName.toLowerCase()==="wa-button"){w?(T.disabled=!0,T.loading=!0,O&&!T.dataset.originalText&&(T.dataset.originalText=T.textContent),O&&(T.textContent=O)):(T.disabled=!1,T.loading=!1,T.dataset.originalText&&(T.textContent=T.dataset.originalText,delete T.dataset.originalText));return}w?(T.disabled=!0,T.dataset.originalText||(T.dataset.originalText=O||T.innerHTML),T.innerHTML="<wa-spinner></wa-spinner> Processing..."):(T.disabled=!1,T.innerHTML=T.dataset.originalText||"Submit",delete T.dataset.originalText)}}function getCurrentTheme(){return document.documentElement.getAttribute("data-theme")||"light"}function getToastContainer(){let T=document.getElementById("app-toast-container");return T||(T=document.createElement("div"),T.id="app-toast-container",T.className="app-toast-container",document.body.appendChild(T)),T}function createToast(T,w="success",O){const F={success:"success",error:"danger",warning:"warning",info:"brand"},W={success:"circle-check",error:"circle-xmark",warning:"triangle-exclamation",info:"circle-info"},q=O||{success:5e3,warning:1e4,error:15e3,info:7e3}[w]||5e3,j=getToastContainer(),J=document.createElement("div");J.className=`app-toast app-toast--${w}`,J.innerHTML=`
    <wa-callout variant="${F[w]||"brand"}" appearance="accent" size="small">
      <wa-icon slot="icon" name="${W[w]||"circle-info"}"></wa-icon>
      ${escapeHtml(T)}
    </wa-callout>
  `,j.appendChild(J),window.setTimeout(()=>{J.classList.add("app-toast--hide"),window.setTimeout(()=>J.remove(),250)},q)}class DownloadPage extends i$3{constructor(){super(),this.downloadFolder="",this.needSetup=!1,this.hasMultiDebrid=!1,this.alwaysRmTrackerUrls=!1,this.debrids=[],this._loading=!1,this._fileLabel=""}connectedCallback(){super.connectedCallback(),this._loadSavedOptions(),this._handleMagnetFromURL()}updated(w){w.has("downloadFolder")&&this._syncFolderDefault()}_parseDebrids(){if(this.debrids.length)return;const w=this.getAttribute("debrids");if(w)try{this.debrids=JSON.parse(w)}catch{this.debrids=[]}}_syncFolderDefault(){var O;const w=(O=this.renderRoot)==null?void 0:O.querySelector("#downloadFolder");w&&!w.value&&(w.value=this.downloadFolder||"")}_loadSavedOptions(){const w={category:localStorage.getItem("downloadCategory")||"",action:localStorage.getItem("downloadAction")||"symlink",uncached:localStorage.getItem("downloadUncached")==="true",rmTrackerUrls:localStorage.getItem("rmTrackerUrls")==="true",folder:localStorage.getItem("downloadFolder")||this.downloadFolder};this.updateComplete.then(()=>{const O=this.renderRoot;O.getElementById("arr").value=w.category,O.getElementById("downloadAction").value=w.action,O.getElementById("downloadUncached").checked=w.uncached,O.getElementById("rmTrackerUrls").checked=w.rmTrackerUrls,O.getElementById("downloadFolder").value=w.folder,this._parseDebrids()})}_saveOptions(){const w=this.renderRoot;localStorage.setItem("downloadCategory",w.getElementById("arr").value),localStorage.setItem("downloadAction",w.getElementById("downloadAction").value),localStorage.setItem("downloadUncached",w.getElementById("downloadUncached").checked.toString());const O=w.getElementById("rmTrackerUrls");O.disabled||localStorage.setItem("rmTrackerUrls",O.checked.toString()),localStorage.setItem("downloadFolder",w.getElementById("downloadFolder").value)}_handleMagnetFromURL(){const w=new URLSearchParams(window.location.search).get("magnet");w&&this.updateComplete.then(()=>{var O;this.renderRoot.getElementById("magnetURI").value=w,history.replaceState({},document.title,window.location.pathname),(O=window.decypharrUtils)==null||O.createToast("Magnet link loaded from URL","info")})}_onFileChange(w){var W;const O=Array.from(w.target.files||[]);if(!O.length){this._fileLabel="";return}const F=O.map(U=>U.name).join(", ");this._fileLabel=`Selected ${O.length} file${O.length>1?"s":""}: ${F}`,(W=window.decypharrUtils)==null||W.createToast(this._fileLabel,"info")}_setDropActive(w){var F;const O=(F=this.renderRoot)==null?void 0:F.querySelector(".file-drop");O&&O.classList.toggle("active",w)}_handleDrop(w){var U;w.preventDefault();const O=Array.from(w.dataTransfer.files||[]).filter(q=>q.name.toLowerCase().endsWith(".torrent"));if(!O.length){(U=window.decypharrUtils)==null||U.createToast("Please drop .torrent files only","warning");return}const F=this.renderRoot.getElementById("torrentFiles"),W=new DataTransfer;O.forEach(q=>W.items.add(q)),F.files=W.files,this._onFileChange({target:{files:O}})}async _submit(w){var j,J,X,Y,K,G;w.preventDefault();const O=this.renderRoot,F=O.getElementById("magnetURI").value.split(`
`).map(ee=>ee.trim()).filter(Boolean),W=O.getElementById("torrentFiles").files,U=F.length+W.length;if(U===0){(j=window.decypharrUtils)==null||j.createToast("Please provide at least one torrent","warning");return}if(U>100){(J=window.decypharrUtils)==null||J.createToast("Please submit up to 100 torrents at a time","warning");return}const q=new FormData;F.length&&q.append("urls",F.join(`
`));for(const ee of W)q.append("files",ee);q.append("arr",O.getElementById("arr").value),q.append("downloadFolder",O.getElementById("downloadFolder").value),q.append("action",O.getElementById("downloadAction").value),q.append("downloadUncached",O.getElementById("downloadUncached").checked),q.append("rmTrackerUrls",O.getElementById("rmTrackerUrls").checked),this.hasMultiDebrid&&q.append("debrid",O.getElementById("debrid").value),this._loading=!0;try{const ee=await fetcher("/api/add",{method:"POST",body:q,headers:{}}),Q=await ee.json();if(!ee.ok)throw new Error(Q.error||"Unknown error");Q.errors&&Q.errors.length>0?Q.results.length>0?((X=window.decypharrUtils)==null||X.createToast(`Added ${Q.results.length} torrents with ${Q.errors.length} errors`,"warning"),this._showErrors(Q.errors)):((Y=window.decypharrUtils)==null||Y.createToast("Failed to add torrents","error"),this._showErrors(Q.errors)):((K=window.decypharrUtils)==null||K.createToast(`Successfully added ${Q.results.length} torrent${Q.results.length>1?"s":""}!`),this._clearForm())}catch(ee){(G=window.decypharrUtils)==null||G.createToast(`Error adding downloads: ${ee.message}`,"error")}finally{this._loading=!1}}_showErrors(w){var F;const O=w.map(W=>`• ${W}`).join(`
`);console.error("Download errors:",O),(F=window.decypharrUtils)==null||F.createToast(`Errors occurred while adding torrents:
${O}`,"error")}_clearForm(){const w=this.renderRoot;w.getElementById("magnetURI").value="",w.getElementById("torrentFiles").value="",this._fileLabel=""}render(){return this._parseDebrids(),b`
      <div class="page">
        ${this.needSetup?b`
          <wa-callout variant="warning" appearance="accent">
            <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
            <strong>Configuration Required</strong>
            <div class="hint">
              Your configuration is incomplete. Complete setup in the
              <a href="${joinURL(window.urlBase||"","settings")}">Settings page</a>.
            </div>
          </wa-callout>
        `:null}

        <wa-card>
          <div class="section-title">
            <wa-icon name="magnet"></wa-icon>
            Add Torrents
          </div>
          <form @submit=${this._submit} @change=${this._saveOptions}>
            <div class="grid grid-2">
              <div class="field-group">
                <wa-textarea
                  id="magnetURI"
                  name="urls"
                  label="Torrent Links"
                  hint="Paste magnet links or URLs, one per line."
                  rows="6"
                ></wa-textarea>
              </div>
              <div class="field-group file-drop"
                   @dragenter=${w=>{w.preventDefault(),this._setDropActive(!0)}}
                   @dragover=${w=>{w.preventDefault(),this._setDropActive(!0)}}
                   @dragleave=${w=>{w.preventDefault(),this._setDropActive(!1)}}
                   @drop=${w=>{this._setDropActive(!1),this._handleDrop(w)}}>
                <label class="file-label" for="torrentFiles">Upload Torrent Files</label>
                <input
                  id="torrentFiles"
                  class="file-input"
                  type="file"
                  name="torrents"
                  accept=".torrent"
                  multiple
                  @change=${this._onFileChange}
                />
                <div class="hint">Select one or more .torrent files.</div>
                ${this._fileLabel?b`<div class="hint">${escapeHtml(this._fileLabel)}</div>`:null}
              </div>
            </div>

            <wa-divider></wa-divider>

            <div class="grid grid-3">
              <div class="field-group">
                <wa-select id="downloadAction" name="downloadAction" label="Post Download Action" hint="How to handle files after download completion">
                  <wa-option value="symlink">Create Symlink</wa-option>
                  <wa-option value="download">Download Files</wa-option>
                  <wa-option value="none">No Action</wa-option>
                </wa-select>
              </div>
              <div class="field-group">
                <wa-input id="downloadFolder" name="downloadFolder" label="Download Folder" placeholder="/downloads/torrents" hint="Leave empty to use default qBittorrent folder"></wa-input>
              </div>
              <div class="field-group">
                <wa-input id="arr" name="arr" label="Arr Category" placeholder="sonarr, radarr, etc." hint="Optional: specify which Arr service should handle this"></wa-input>
              </div>
              ${this.hasMultiDebrid?b`
                <div class="field-group">
                  <wa-select id="debrid" name="debrid" label="Debrid Service" hint="Choose which debrid service to use">
                    ${this.debrids.map((w,O)=>b`
                      <wa-option value="${w}" ?selected=${O===0}>${w}</wa-option>
                    `)}
                  </wa-select>
                </div>
              `:null}
              <div class="field-group">
                <wa-checkbox id="downloadUncached" name="downloadUncached" hint="Allow downloading content not cached by debrid service">Download Uncached Content</wa-checkbox>
              </div>
              <div class="field-group">
                <wa-checkbox id="skipMultiSeason" name="skipMultiSeason" hint="Skip the multi-season episode checker for TV shows">Skip Multi-Season Checker</wa-checkbox>
              </div>
              <div class="field-group">
                <wa-checkbox
                  id="rmTrackerUrls"
                  name="rmTrackerUrls"
                  ?checked=${this.alwaysRmTrackerUrls}
                  ?disabled=${this.alwaysRmTrackerUrls}
                >
                  Remove Tracker
                  <span slot="hint">
                    Allows you to
                    <a href="https://sirrobot01.github.io/decypharr/features/repair-worker/private-tracker-downloads" target="_blank">download private tracker torrents</a>
                    with lower risk.
                  </span>
                </wa-checkbox>
              </div>
            </div>

            <div class="field-group">
              <wa-button type="submit" variant="brand" ?loading=${this._loading}>
                <wa-icon slot="start" name="cloud-arrow-up"></wa-icon>
                Add to Download Queue
              </wa-button>
            </div>
          </form>
        </wa-card>
      </div>
    `}}Se(DownloadPage,"properties",{downloadFolder:{type:String,attribute:"download-folder"},needSetup:{type:Boolean,attribute:"need-setup"},hasMultiDebrid:{type:Boolean,attribute:"has-multi-debrid"},alwaysRmTrackerUrls:{type:Boolean,attribute:"always-rm-tracker-urls"},debrids:{type:Array}}),Se(DownloadPage,"styles",i$6`
    :host { display: block; }
    .page { display: flex; flex-direction: column; gap: 1.5rem; }
    .grid { display: grid; gap: 1rem; }
    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .section-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; }
    .field-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .hint { font-size: 0.85rem; color: var(--app-text-muted); }
    .file-drop {
      border: 1px dashed var(--app-border);
      border-radius: var(--app-radius);
      padding: 0.75rem;
      transition: background 0.2s, border-color 0.2s;
    }
    .file-drop.active {
      border-color: var(--app-brand-strong);
      background: var(--app-brand-bg);
    }
    .file-label { font-weight: 600; }
    .file-input {
      padding: 0.4rem;
      border: 1px solid var(--app-border);
      border-radius: var(--app-radius);
      background: var(--app-surface);
      color: var(--app-text);
    }
    wa-divider::part(base) { margin: 0.5rem 0; }
  `);customElements.define("download-page",DownloadPage);class SystemStats extends i$3{constructor(){super(),this.stats=null,this.loading=!1,this.error="",this._timer=null}connectedCallback(){super.connectedCallback(),this._loadStats(),this._timer=window.setInterval(()=>this._loadStats(),3e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}async _loadStats(){this.loading=!0,this.error="";try{const w=await fetcher("/debug/stats");if(!w.ok)throw new Error(`HTTP ${w.status}`);this.stats=await w.json()}catch(w){this.error=w.message||"Failed to load statistics"}finally{this.loading=!1}}_renderOverview(w){const O=w.heap_alloc_mb||"-",F=w.total_alloc_mb||null,W=F?`Heap: ${O} | Total: ${F}`:`Heap: ${O}`,U=Array.isArray(w.load_avg)?w.load_avg.map(q=>q.toFixed(2)).join(", "):"-";return b`
      <wa-card>
        <div class="section">
          <div class="pill">
            <wa-icon name="gauge"></wa-icon>
            <strong>System Overview</strong>
          </div>
          <div class="grid grid-6">
            <div class="stat-card">
              <div class="stat-title">System</div>
              <div class="stat-value">${w.os||"-"}</div>
              <div class="stat-desc">${w.runtime_version||w.go_version||"-"}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">CPU Cores</div>
              <div class="stat-value">${w.num_cpu||"-"}</div>
              <div class="stat-desc">${w.arch||"-"}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">CPU %</div>
              <div class="stat-value">${w.cpu_percent?`${w.cpu_percent.toFixed(1)}%`:"0%"}</div>
              <div class="stat-desc">Load: ${U}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Memory Used</div>
              <div class="stat-value">${w.memory_used||"-"}</div>
              <div class="stat-desc">${W}</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Threads</div>
              <div class="stat-value">${formatNumber(w.goroutines||0)}</div>
              <div class="stat-desc">GC: ${formatNumber(w.gc_cycles||0)} cycles</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Async Tasks</div>
              <div class="stat-value">${formatNumber(w.async_tasks||0)}</div>
              <div class="stat-desc">Event Loop</div>
            </div>
          </div>
        </div>
      </wa-card>
    `}_renderDebrid(w){const O=w.debrids||[];return O.length?b`
      <wa-card>
        <div class="section">
          <div class="pill"><wa-icon name="cloud"></wa-icon><strong>Debrid Services</strong></div>
          <div class="grid grid-2">
            ${O.map(F=>{const W=F.profile||{},U=F.library||{},q=F.accounts||[],j=F.status||"unknown",J=F.checked_at?new Date(F.checked_at).toLocaleString():null,X=F.error?escapeHtml(F.error):null,Y=j==="ok"?b`<wa-badge variant="success" pill>Key OK</wa-badge>`:j==="error"?b`<wa-badge variant="danger" pill>Key Error</wa-badge>`:b`<wa-badge variant="neutral" pill>Unknown</wa-badge>`;return b`
                <div class="subtle">
                  <div style="display:flex; justify-content: space-between; gap: 1rem;">
                    <div>
                      <strong>${W.name||"Unknown Service"}</strong>
                      <div class="muted">${W.username||"No username"}</div>
                    </div>
                    <div style="text-align:right;">
                      ${Y}
                      ${J?b`<div class="muted">Checked: ${J}</div>`:null}
                      <div class="muted">${formatNumber(W.points||0)} points</div>
                      <div class="muted">Type: ${W.type||"Unknown"}</div>
                      <div class="muted">Expires: ${W.expiration?new Date(W.expiration).toLocaleDateString():"Unknown"}</div>
                    </div>
                  </div>
                  ${X?b`<wa-callout variant="danger" appearance="outlined">${X}</wa-callout>`:null}
                  <div class="grid grid-3" style="margin-top: 0.75rem;">
                    <div class="stat-card">
                      <div class="stat-title">Library Size</div>
                      <div class="stat-value">${formatNumber(U.total||0)}</div>
                      ${U.total_bytes?b`<div class="stat-desc">${formatBytes(U.total_bytes)}</div>`:null}
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Bad Torrents</div>
                      <div class="stat-value">${formatNumber(U.bad||0)}</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Active Links</div>
                      <div class="stat-value">${formatNumber(U.active_links||0)}</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Files</div>
                      <div class="stat-value">${formatNumber(U.files||0)}</div>
                    </div>
                    <div class="stat-card">
                      <div class="stat-title">Total Accounts</div>
                      <div class="stat-value">${formatNumber(q.length)}</div>
                    </div>
                  </div>
                </div>
              `})}
          </div>
        </div>
      </wa-card>
    `:b`
        <wa-card>
          <div class="pill"><wa-icon name="cloud"></wa-icon><strong>Debrid Services</strong></div>
          <p class="muted">No debrid services configured.</p>
        </wa-card>
      `}_renderDisk(w){const O=w.disk;if(!O)return b`<wa-card><p class="muted">No disk data available.</p></wa-card>`;const F=[{label:"Root",data:O.root},{label:"Data",data:O.data}];return b`
      <wa-card>
        <div class="pill"><wa-icon name="hard-drive"></wa-icon><strong>Disk Usage</strong></div>
        <div class="section">
          ${F.map(W=>{const U=W.data||{},q=U.total||0,j=U.used||0,J=U.free||0,X=q>0?Math.round(j/q*100):0;return b`
              <div class="subtle">
                <div style="display:flex; justify-content: space-between; gap: 1rem;">
                  <strong>${W.label}</strong>
                  <div class="muted">${U.path||""}</div>
                </div>
                <wa-progress-bar value="${X}"></wa-progress-bar>
                <div class="grid grid-3" style="margin-top: 0.5rem;">
                  <div class="stat-desc">Used: ${formatBytes(j)}</div>
                  <div class="stat-desc">Total: ${formatBytes(q)}</div>
                  <div class="stat-desc">Free: ${formatBytes(J)}</div>
                </div>
              </div>
            `})}
        </div>
      </wa-card>
    `}_renderLimits(w){const O=w.limits;if(!O)return b`<wa-card><p class="muted">No limit data available.</p></wa-card>`;const F=O.memory_limit?formatBytes(O.memory_limit):"Unlimited",W=O.cpu_limit?`${O.cpu_limit.toFixed(2)} cores`:"Unlimited";return b`
      <wa-card>
        <div class="pill"><wa-icon name="sliders"></wa-icon><strong>Container Limits</strong></div>
        <div class="grid grid-2">
          <div class="stat-card">
            <div class="stat-title">Memory Limit</div>
            <div class="stat-value">${F}</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">CPU Limit</div>
            <div class="stat-value">${W}</div>
          </div>
        </div>
      </wa-card>
    `}_renderRclone(w){const O=w.rclone,F=!O||!O.enabled?"Disabled":O.server_ready?"Active":"Not Ready",W=F==="Active"?"success":F==="Not Ready"?"warning":"danger";return b`
      <wa-card>
        <div class="header">
          <div class="pill"><wa-icon name="cloud-arrow-up"></wa-icon><strong>Rclone Statistics</strong></div>
          <wa-button href="${joinURL(window.urlBase||"","debug/logs/rclone")}" appearance="outlined" size="small" target="_blank">
            View Rclone Logs
          </wa-button>
        </div>
        <wa-badge variant="${W}" pill>${F}</wa-badge>
        ${!O||!O.enabled?b`<p class="muted">Rclone is not enabled or configured.</p>`:null}
        ${O&&!O.server_ready?b`<p class="muted">Rclone server is not ready.</p>`:null}
        ${O&&O.server_ready?b`
          <div class="grid grid-3">
            ${O.version?b`
              <div class="stat-card">
                <div class="stat-title">Rclone Version</div>
                <div class="stat-value">${O.version.version||"Unknown"}</div>
                <div class="stat-desc">${O.version.arch||""} ${O.version.os||""}</div>
              </div>
            `:null}
            ${O.core?b`
              <div class="stat-card">
                <div class="stat-title">Transferred</div>
                <div class="stat-value">${formatBytes(O.core.bytes||0)}</div>
                <div class="stat-desc">Speed: ${formatBytes(O.core.speed||0)}/s</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">Transfers</div>
              <div class="stat-value">${formatNumber(O.core.transfers||0)}</div>
                <div class="stat-desc">Errors: ${formatNumber(O.core.errors||0)}</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">Checks</div>
              <div class="stat-value">${formatNumber(O.core.checks||0)}</div>
                <div class="stat-desc">Total: ${formatNumber(O.core.totalChecks||0)}</div>
              </div>
              <div class="stat-card">
                <div class="stat-title">Uptime</div>
                <div class="stat-value">${formatDuration(O.core.elapsedTime)}</div>
                <div class="stat-desc">Transfer: ${formatDuration(O.core.transferTime)}</div>
              </div>
            `:null}
            ${O.memory?b`
              <div class="stat-card">
                <div class="stat-title">Rclone Memory</div>
                <div class="stat-value">${formatBytes(O.memory.Sys||0)}</div>
                <div class="stat-desc">Heap: ${formatBytes(O.memory.TotalAlloc||0)}</div>
              </div>
            `:null}
          </div>
          ${O.core&&O.core.transferring&&O.core.transferring.length?b`
            <div class="section">
              <div class="pill"><wa-icon name="arrows-rotate"></wa-icon><strong>Active Transfers (${O.core.transferring.length})</strong></div>
              <div class="scroll">
                ${O.core.transferring.map(U=>{const q=(U.bytes||0)/(U.size||1)*100;return b`
                    <div class="subtle">
                      <div style="display:flex; justify-content: space-between; gap: 1rem;">
                        <strong>${U.name||"Unknown"}</strong>
                        <span class="muted">${formatBytes(U.speed||0)}/s</span>
                      </div>
                      <wa-progress-bar value="${q}"></wa-progress-bar>
                      <div class="muted">
                        ${formatBytes(U.bytes||0)} / ${formatBytes(U.size||0)} · ETA: ${U.eta?formatDuration(U.eta):"Unknown"}
                      </div>
                    </div>
                  `})}
              </div>
            </div>
          `:null}
          ${O.mounts&&Object.keys(O.mounts).length?b`
            <div class="section">
              <div class="pill"><wa-icon name="hard-drive"></wa-icon><strong>Mounted Services</strong></div>
              <div class="grid grid-2">
                ${Object.entries(O.mounts).map(([U,q])=>{const j=q.mounted;return b`
                    <div class="subtle">
                      <div style="display:flex; justify-content: space-between; gap: 1rem;">
                        <div>
                          <strong>${q.config_name||U}</strong>
                          <div class="muted">${q.provider||"Unknown Provider"}</div>
                          ${q.local_path?b`<div class="muted">${q.local_path}</div>`:null}
                        </div>
                        <wa-badge variant="${j?"success":"danger"}" pill>${j?"Mounted":"Not Mounted"}</wa-badge>
                      </div>
                      ${q.error?b`<wa-callout variant="danger" appearance="outlined">${q.error}</wa-callout>`:null}
                    </div>
                  `})}
              </div>
            </div>
          `:null}
          ${O.bandwidth&&O.bandwidth.rate!=="off"?b`
            <div class="section">
              <div class="pill"><wa-icon name="gauge"></wa-icon><strong>Bandwidth Limits</strong></div>
              <div class="grid grid-2">
                <div class="stat-card">
                  <div class="stat-title">Bytes Per Seconds</div>
                  <div class="stat-value">${formatBytes(O.bandwidth.bytesPerSecond)}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-title">Rate</div>
                  <div class="stat-value">${formatBytes(O.bandwidth.rate)}</div>
                </div>
              </div>
            </div>
          `:null}
        `:null}
      </wa-card>
    `}render(){return b`
      <div class="header">
        <div class="title">System Statistics</div>
        <wa-button appearance="outlined" size="small" @click=${this._loadStats}>
          <wa-icon slot="start" name="arrows-rotate"></wa-icon>
          Refresh
        </wa-button>
      </div>

      ${this.loading?b`
        <wa-card class="subtle">
          <wa-spinner></wa-spinner>
          <span class="muted">Loading system statistics...</span>
        </wa-card>
      `:null}

      ${this.error?b`
        <wa-callout variant="danger" appearance="outlined">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <div class="callout-row">
            <span>${this.error}</span>
            <wa-button appearance="outlined" size="small" @click=${this._loadStats}>
              Retry
            </wa-button>
          </div>
        </wa-callout>
      `:null}

      ${!this.loading&&!this.error&&this.stats?b`
        <div class="section">
          ${this._renderOverview(this.stats)}
          ${this._renderDebrid(this.stats)}
          <div class="grid grid-2">
            ${this._renderDisk(this.stats)}
            ${this._renderLimits(this.stats)}
          </div>
          ${this._renderRclone(this.stats)}
        </div>
      `:null}
    `}}Se(SystemStats,"properties",{stats:{type:Object},loading:{type:Boolean},error:{type:String}}),Se(SystemStats,"styles",i$6`
    :host { display: block; }
    .header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
    .title { font-size: 1.5rem; font-weight: 700; }
    .section { display: flex; flex-direction: column; gap: 1.5rem; }
    .grid { display: grid; gap: 1rem; }
    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
    .grid-6 { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); }
    .stat-card { display: flex; flex-direction: column; gap: 0.25rem; }
    .stat-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--app-text-muted); }
    .stat-value { font-size: 1.1rem; font-weight: 600; }
    .stat-desc { font-size: 0.85rem; color: var(--app-text-muted); }
    .muted { color: var(--app-text-muted); }
    .pill { display: inline-flex; align-items: center; gap: 0.35rem; }
    .subtle { background: var(--app-surface-muted); padding: 0.5rem; border-radius: var(--app-radius); }
    .scroll { max-height: 280px; overflow-y: auto; }
    .callout-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
  `);customElements.define("system-stats",SystemStats);const template$2=`<div class="page-stack">
    __NEED_SETUP__

    <wa-card class="panel">
        <div class="panel-body">
            <div class="toolbar">
                <div class="toolbar-actions">
                    <wa-button variant="danger" appearance="outline" size="small" id="batchDeleteBtn" class="hidden">
                        <wa-icon slot="start" name="trash"></wa-icon>
                        Delete Selected
                    </wa-button>
                    <wa-button variant="warning" appearance="outline" size="small" id="batchDeleteDebridBtn" class="hidden">
                        <wa-icon slot="start" name="cloud-slash"></wa-icon>
                        Remove From Debrid
                    </wa-button>
                    <wa-button variant="neutral" appearance="outline" size="small" id="refreshBtn">
                        <wa-icon slot="start" name="arrows-rotate"></wa-icon>
                        Refresh
                    </wa-button>
                </div>

                <div class="filter-row">
                    <div class="filter-field">
                        <wa-select id="stateFilter" label="State">
                            <wa-option value="">All States</wa-option>
                            <wa-option value="pausedUP">Completed</wa-option>
                            <wa-option value="downloading">Downloading</wa-option>
                            <wa-option value="error">Error</wa-option>
                        </wa-select>
                    </div>
                    <div class="filter-field">
                        <wa-select id="categoryFilter" label="Category">
                            <wa-option value="">All Categories</wa-option>
                        </wa-select>
                    </div>
                    <div class="filter-field">
                        <wa-select id="sortSelector" label="Sort By">
                            <wa-option value="added_on" selected>Date Added (Newest First)</wa-option>
                            <wa-option value="added_on_asc">Date Added (Oldest First)</wa-option>
                            <wa-option value="name_asc">Name (A-Z)</wa-option>
                            <wa-option value="name_desc">Name (Z-A)</wa-option>
                            <wa-option value="size_desc">Size (Largest First)</wa-option>
                            <wa-option value="size_asc">Size (Smallest First)</wa-option>
                            <wa-option value="progress_desc">Progress (Most First)</wa-option>
                            <wa-option value="progress_asc">Progress (Least First)</wa-option>
                        </wa-select>
                    </div>
                </div>
            </div>
        </div>
    </wa-card>

    <wa-card class="panel">
        <div class="panel-body table-wrap">
            <table class="data-table">
                <thead>
                <tr>
                    <th class="table-select">
                        <wa-checkbox id="selectAll"></wa-checkbox>
                    </th>
                    <th>
                        <wa-icon name="file-lines"></wa-icon> Name
                    </th>
                    <th>
                        <wa-icon name="hard-drive"></wa-icon> Size
                    </th>
                    <th>
                        <wa-icon name="gauge-high"></wa-icon> Progress
                    </th>
                    <th>
                        <wa-icon name="download"></wa-icon> Speed
                    </th>
                    <th>
                        <wa-icon name="tag"></wa-icon> Category
                    </th>
                    <th>
                        <wa-icon name="cloud"></wa-icon> Debrid
                    </th>
                    <th>
                        <wa-icon name="users"></wa-icon> Seeders
                    </th>
                    <th>
                        <wa-icon name="wave-square"></wa-icon> State
                    </th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody id="torrentsList"></tbody>
            </table>
        </div>

        <div class="panel-footer">
            <div class="hint">
                <span id="paginationInfo">Loading torrents...</span>
            </div>
            <div class="pagination" id="paginationControls"></div>
        </div>
    </wa-card>

    <wa-card class="panel hidden" id="emptyState">
        <div class="panel-body empty-state">
            <wa-icon name="inbox" style="font-size: 3rem; color: var(--app-text-muted);"></wa-icon>
            <h3>No Torrents Found</h3>
            <p class="hint">You haven't added any torrents yet. Start by adding your first download.</p>
            <wa-button variant="brand" href="__URL_BASE__download">
                <wa-icon slot="start" name="plus"></wa-icon>
                Add New Download
            </wa-button>
        </div>
    </wa-card>
</div>

<div class="context-menu hidden" id="torrentContextMenu">
    <div class="context-title torrent-name"></div>
    <hr/>
    <button class="context-item" data-action="copy-magnet">
        <wa-icon name="magnet"></wa-icon>
        Copy Magnet Link
    </button>
    <button class="context-item" data-action="copy-name">
        <wa-icon name="clipboard"></wa-icon>
        Copy Name
    </button>
    <hr/>
    <button class="context-item" data-action="delete">
        <wa-icon name="trash"></wa-icon>
        Delete Torrent
    </button>
</div>
`;class TorrentDashboardPage extends i$3{createRenderRoot(){return this}firstUpdated(){this._controller||(this._controller=new TorrentDashboard,window.dashboard=this._controller)}render(){const w=window.urlBase||"",O=this.needSetup?`
        <wa-callout variant="warning" appearance="accent">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <strong>Configuration Required</strong>
          <div>Your configuration is incomplete. Please complete the setup in the <a href="${w}settings">Settings page</a>.</div>
        </wa-callout>
      `:"",F=template$2.replace("__NEED_SETUP__",O).replace(/__URL_BASE__/g,w);return b`${o(F)}`}}Se(TorrentDashboardPage,"properties",{needSetup:{type:Boolean,attribute:"need-setup"}});customElements.define("torrent-dashboard",TorrentDashboardPage);class TorrentDashboard{constructor(){var w;this.state={torrents:[],selectedTorrents:new Set,categories:new Set,filteredTorrents:[],selectedCategory:"",selectedState:"",sortBy:"added_on",itemsPerPage:20,currentPage:1,selectedTorrentContextMenu:null},this.refs={torrentsList:document.getElementById("torrentsList"),categoryFilter:document.getElementById("categoryFilter"),stateFilter:document.getElementById("stateFilter"),sortSelector:document.getElementById("sortSelector"),selectAll:document.getElementById("selectAll"),batchDeleteBtn:document.getElementById("batchDeleteBtn"),batchDeleteDebridBtn:document.getElementById("batchDeleteDebridBtn"),refreshBtn:document.getElementById("refreshBtn"),torrentContextMenu:document.getElementById("torrentContextMenu"),paginationControls:document.getElementById("paginationControls"),paginationInfo:document.getElementById("paginationInfo"),emptyState:document.getElementById("emptyState")},this.refs.tableCard=(w=this.refs.torrentsList)==null?void 0:w.closest("wa-card"),this.init()}init(){this.bindEvents(),this.loadTorrents(),this.startAutoRefresh()}bindEvents(){this.refs.refreshBtn.addEventListener("click",()=>this.loadTorrents()),this.refs.batchDeleteBtn.addEventListener("click",()=>this.deleteSelectedTorrents()),this.refs.batchDeleteDebridBtn.addEventListener("click",()=>this.deleteSelectedTorrents(!0)),this.refs.selectAll.addEventListener("change",w=>this.toggleSelectAll(w.target.checked)),this.refs.categoryFilter.addEventListener("change",w=>this.setFilter("category",w.target.value)),this.refs.stateFilter.addEventListener("change",w=>this.setFilter("state",w.target.value)),this.refs.sortSelector.addEventListener("change",w=>this.setSort(w.target.value)),this.bindContextMenu(),this.refs.torrentsList.addEventListener("change",w=>{const O=w.target.closest(".torrent-select");O&&this.toggleTorrentSelection(O.dataset.hash,O.checked)})}bindContextMenu(){this.refs.torrentsList.addEventListener("contextmenu",w=>{const O=w.target.closest("tr[data-hash]");O&&(w.preventDefault(),this.showContextMenu(w,O))}),document.addEventListener("click",w=>{this.refs.torrentContextMenu.contains(w.target)||this.hideContextMenu()}),this.refs.torrentContextMenu.addEventListener("click",w=>{var F;const O=(F=w.target.closest("[data-action]"))==null?void 0:F.dataset.action;O&&(this.handleContextAction(O),this.hideContextMenu())})}showContextMenu(w,O){this.state.selectedTorrentContextMenu={hash:O.dataset.hash,name:O.dataset.name,category:O.dataset.category||""},this.refs.torrentContextMenu.querySelector(".torrent-name").textContent=this.state.selectedTorrentContextMenu.name;const{pageX:F,pageY:W}=w,{clientWidth:U,clientHeight:q}=document.documentElement,j=this.refs.torrentContextMenu;j.classList.remove("hidden");const J=j.offsetWidth,X=j.offsetHeight,Y=F+J>U?F-J:F,K=W+X>q?W-X:W;j.style.left=`${Y}px`,j.style.top=`${K}px`}hideContextMenu(){this.refs.torrentContextMenu.classList.add("hidden")}async handleContextAction(w){const{hash:O}=this.state.selectedTorrentContextMenu||{};if(!O)return;const F=this.state.torrents.find(U=>U.hash===O);if(!F)return;const W={"copy-magnet":async()=>{try{await navigator.clipboard.writeText(`magnet:?xt=urn:btih:${F.hash}`),window.decypharrUtils.createToast("Magnet link copied to clipboard")}catch{window.decypharrUtils.createToast("Failed to copy magnet link","error")}},"copy-name":async()=>{try{await navigator.clipboard.writeText(F.name),window.decypharrUtils.createToast("Torrent name copied to clipboard")}catch{window.decypharrUtils.createToast("Failed to copy torrent name","error")}},delete:async()=>{await this.deleteTorrent(F.hash,F.category,!1)}};W[w]&&await W[w]()}async loadTorrents(){try{this.refs.refreshBtn.disabled=!0,this.refs.paginationInfo.textContent="Loading torrents...";const w=await window.decypharrUtils.fetcher("/api/torrents");if(!w.ok)throw new Error("Failed to fetch torrents");const O=await w.json();this.state.torrents=O,this.state.categories=new Set(O.map(F=>F.category).filter(Boolean)),this.updateUI()}catch(w){console.error("Error loading torrents:",w),window.decypharrUtils.createToast(`Error loading torrents: ${w.message}`,"error")}finally{this.refs.refreshBtn.disabled=!1}}updateUI(){this.filterTorrents(),this.updateCategoryFilter(),this.renderTorrents(),this.updatePagination(),this.updateSelectionUI(),this.toggleEmptyState()}filterTorrents(){let w=[...this.state.torrents];this.state.selectedCategory&&(w=w.filter(O=>O.category===this.state.selectedCategory)),this.state.selectedState&&(w=w.filter(O=>{var F;return((F=O.state)==null?void 0:F.toLowerCase())===this.state.selectedState.toLowerCase()})),w=this.sortTorrents(w),this.state.filteredTorrents=w}sortTorrents(w){const[O,F]=this.state.sortBy.includes("_asc")||this.state.sortBy.includes("_desc")?[this.state.sortBy.split("_").slice(0,-1).join("_"),this.state.sortBy.endsWith("_asc")?"asc":"desc"]:[this.state.sortBy,"desc"];return w.sort((W,U)=>{var J,X;let q,j;switch(O){case"name":q=((J=W.name)==null?void 0:J.toLowerCase())||"",j=((X=U.name)==null?void 0:X.toLowerCase())||"";break;case"size":q=W.size||0,j=U.size||0;break;case"progress":q=W.progress||0,j=U.progress||0;break;case"added_on":q=W.added_on||0,j=U.added_on||0;break;default:q=W[O]||0,j=U[O]||0}return typeof q=="string"?F==="asc"?q.localeCompare(j):j.localeCompare(q):F==="asc"?q-j:j-q})}renderTorrents(){const w=(this.state.currentPage-1)*this.state.itemsPerPage,O=Math.min(w+this.state.itemsPerPage,this.state.filteredTorrents.length),F=this.state.filteredTorrents.slice(w,O);this.refs.torrentsList.innerHTML=F.map(W=>this.torrentRowTemplate(W)).join("")}torrentRowTemplate(w){const O=(w.progress*100).toFixed(1),F=this.state.selectedTorrents.has(w.hash),W=this.getStateVariant(w.state);return`
      <tr data-hash="${w.hash}"
          data-name="${this.escapeHtml(w.name)}"
          data-category="${w.category||""}">
        <td>
          <wa-checkbox
            class="torrent-select"
            data-hash="${w.hash}"
            ${F?"checked":""}>
          </wa-checkbox>
        </td>
        <td class="max-w-sm">
          <div class="text-truncate text-strong" title="${this.escapeHtml(w.name)}">
            ${this.escapeHtml(w.name)}
          </div>
        </td>
        <td class="text-nowrap text-mono text-small">
          ${window.decypharrUtils.formatBytes(w.size)}
        </td>
        <td>
          <div class="progress-cell">
            <wa-progress-bar class="progress-bar" value="${O}"></wa-progress-bar>
            <span class="text-small text-strong">${O}%</span>
          </div>
        </td>
        <td class="text-nowrap text-mono text-small">
          ${window.decypharrUtils.formatSpeed(w.dlspeed)}
        </td>
        <td>
          ${w.category?`<wa-badge variant="neutral" size="small">${this.escapeHtml(w.category)}</wa-badge>`:'<span class="hint">None</span>'}
        </td>
        <td>
          ${w.debrid?`<wa-badge variant="brand" size="small">${this.escapeHtml(w.debrid)}</wa-badge>`:'<span class="hint">None</span>'}
        </td>
        <td class="text-nowrap text-mono text-small">
          ${w.num_seeds||0}
        </td>
        <td>
          <wa-badge variant="${W}" size="small">
            ${this.escapeHtml(w.state)}
          </wa-badge>
        </td>
        <td>
          <div class="table-actions">
            <wa-button
              appearance="plain"
              size="small"
              variant="danger"
              title="Delete from local"
              aria-label="Delete torrent"
              onclick="dashboard.deleteTorrent('${w.hash}', '${w.category||""}', false);"
            >
              <wa-icon name="trash"></wa-icon>
            </wa-button>
            ${w.debrid&&w.id?`
              <wa-button
                appearance="plain"
                size="small"
                variant="warning"
                title="Remove from debrid"
                aria-label="Remove from debrid"
                onclick="dashboard.deleteTorrent('${w.hash}', '${w.category||""}', true);"
              >
                <wa-icon name="cloud-slash"></wa-icon>
              </wa-button>
            `:""}
          </div>
        </td>
      </tr>
    `}updateCategoryFilter(){const w=[...this.state.categories],O=this.refs.categoryFilter.value;this.refs.categoryFilter.innerHTML='<wa-option value="">All Categories</wa-option>',w.forEach(F=>{const W=document.createElement("wa-option");W.value=F,W.textContent=F,this.refs.categoryFilter.appendChild(W)}),this.refs.categoryFilter.value=O}updatePagination(){const w=Math.ceil(this.state.filteredTorrents.length/this.state.itemsPerPage);if(this.refs.paginationControls.innerHTML="",w<=1){this.refs.paginationInfo.textContent=`${this.state.filteredTorrents.length} torrent${this.state.filteredTorrents.length!==1?"s":""}`;return}const O=(this.state.currentPage-1)*this.state.itemsPerPage+1,F=Math.min(O+this.state.itemsPerPage-1,this.state.filteredTorrents.length);this.refs.paginationInfo.textContent=`Showing ${O}-${F} of ${this.state.filteredTorrents.length}`;const W=(U,q,j=!1,J=!1)=>{const X=document.createElement("wa-button");return X.size="small",X.variant=J?"brand":"neutral",X.appearance=J?"solid":"outline",X.textContent=U,X.disabled=j,X.addEventListener("click",()=>this.goToPage(q)),X};this.refs.paginationControls.appendChild(W("«",this.state.currentPage-1,this.state.currentPage===1));for(let U=1;U<=w;U++)if(U===1||U===w||Math.abs(U-this.state.currentPage)<=1)this.refs.paginationControls.appendChild(W(U.toString(),U,!1,U===this.state.currentPage));else if(Math.abs(U-this.state.currentPage)===2){const q=document.createElement("span");q.className="pagination-ellipsis",q.textContent="...",this.refs.paginationControls.appendChild(q)}this.refs.paginationControls.appendChild(W("»",this.state.currentPage+1,this.state.currentPage===w))}updateSelectionUI(){const w=new Set(this.state.filteredTorrents.map(F=>F.hash));this.state.selectedTorrents.forEach(F=>{w.has(F)||this.state.selectedTorrents.delete(F)}),this.refs.batchDeleteBtn.classList.toggle("hidden",this.state.selectedTorrents.size===0),this.refs.batchDeleteDebridBtn.classList.toggle("hidden",this.state.selectedTorrents.size===0);const O=this.state.filteredTorrents.slice((this.state.currentPage-1)*this.state.itemsPerPage,this.state.currentPage*this.state.itemsPerPage);this.refs.selectAll.checked=O.length>0&&O.every(F=>this.state.selectedTorrents.has(F.hash)),this.refs.selectAll.indeterminate=O.some(F=>this.state.selectedTorrents.has(F.hash))&&!O.every(F=>this.state.selectedTorrents.has(F.hash))}toggleEmptyState(){const w=this.state.torrents.length===0;this.refs.emptyState.classList.toggle("hidden",!w),this.refs.tableCard&&this.refs.tableCard.classList.toggle("hidden",w)}setFilter(w,O){w==="category"?this.state.selectedCategory=O:w==="state"&&(this.state.selectedState=O),this.state.currentPage=1,this.updateUI()}setSort(w){this.state.sortBy=w,this.state.currentPage=1,this.updateUI()}goToPage(w){this.state.currentPage=w,this.updateUI()}toggleSelectAll(w){this.state.filteredTorrents.slice((this.state.currentPage-1)*this.state.itemsPerPage,this.state.currentPage*this.state.itemsPerPage).forEach(F=>{w?this.state.selectedTorrents.add(F.hash):this.state.selectedTorrents.delete(F.hash)}),this.updateUI()}toggleTorrentSelection(w,O){O?this.state.selectedTorrents.add(w):this.state.selectedTorrents.delete(w),this.updateSelectionUI()}async deleteTorrent(w,O,F=!1){if(confirm(`Are you sure you want to delete this torrent${F?" from "+O:""}?`))try{const W=`/api/torrents/${encodeURIComponent(O)}/${w}?removeFromDebrid=${F}`,U=await window.decypharrUtils.fetcher(W,{method:"DELETE"});if(!U.ok)throw new Error(await U.text());window.decypharrUtils.createToast("Torrent deleted successfully"),await this.loadTorrents()}catch(W){console.error("Error deleting torrent:",W),window.decypharrUtils.createToast(`Failed to delete torrent: ${W.message}`,"error")}}async deleteSelectedTorrents(w=!1){const O=this.state.selectedTorrents.size;if(O===0){window.decypharrUtils.createToast("No torrents selected for deletion","warning");return}if(confirm(`Are you sure you want to delete ${O} torrent${O>1?"s":""}${w?" from debrid":""}?`))try{const F=Array.from(this.state.selectedTorrents).join(","),W=await window.decypharrUtils.fetcher(`/api/torrents/?hashes=${encodeURIComponent(F)}&removeFromDebrid=${w}`,{method:"DELETE"});if(!W.ok)throw new Error(await W.text());window.decypharrUtils.createToast(`${O} torrent${O>1?"s":""} deleted successfully`),this.state.selectedTorrents.clear(),await this.loadTorrents()}catch(F){console.error("Error deleting torrents:",F),window.decypharrUtils.createToast(`Failed to delete some torrents: ${F.message}`,"error")}}startAutoRefresh(){this.refreshInterval=setInterval(()=>{this.loadTorrents()},5e3),window.addEventListener("beforeunload",()=>{this.refreshInterval&&clearInterval(this.refreshInterval)})}getStateVariant(w){switch((w||"").toLowerCase()){case"pausedup":case"completed":return"success";case"downloading":return"brand";case"error":return"danger";default:return"neutral"}}escapeHtml(w){const O={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return w?w.replace(/[&<>"']/g,F=>O[F]):""}}const template$1=`<div class="page-stack">
    __NEED_SETUP__

    <form id="configForm" class="page-stack" novalidate>
        <wa-card class="panel">
            <div class="panel-body">
                <nav class="tab-nav" aria-label="Configuration Tabs">
                    <wa-button type="button" appearance="plain" class="tab-button active" data-tab="general">
                        General
                    </wa-button>
                    <wa-button type="button" appearance="plain" class="tab-button" data-tab="debrid">
                        Debrid
                    </wa-button>
                    <wa-button type="button" appearance="plain" class="tab-button" data-tab="qbittorrent">
                        QBittorrent
                    </wa-button>
                    <wa-button type="button" appearance="plain" class="tab-button" data-tab="arrs">
                        *Arrs
                    </wa-button>
                    <wa-button type="button" appearance="plain" class="tab-button" data-tab="repair">
                        Repair
                    </wa-button>
                    <wa-button type="button" appearance="plain" class="tab-button" data-tab="rclone">
                        Rclone
                    </wa-button>
                </nav>

                <div class="config-actions">
                    <wa-button type="submit" variant="success">
                        Save Configuration
                    </wa-button>
                </div>

                <div class="tab-content-container">

                    <div class="tab-content" data-tab-content="general">
                        <div class="page-stack">
                            <h2 class="section-heading">
                                General Settings
                            </h2>

                            <div class="grid grid-2">
                                <div class="field-group">
                                    <label class="label" for="log-level">
                                        <span class="label-text">Log Level</span>
                                    </label>
                                    <select class="app-select" name="log_level" id="log-level">
                                        <option value="info">Info</option>
                                        <option value="debug">Debug</option>
                                        <option value="warn">Warning</option>
                                        <option value="error">Error</option>
                                        <option value="trace">Trace</option>
                                    </select>
                                </div>
                                <div class="field-group">
                                    <label class="label">
                                        <span class="label-text">Magnet Link Handler</span>
                                    </label>
                                    <wa-button type="button" variant="brand" appearance="outline" onclick="registerMagnetLinkHandler();" id="registerMagnetLink">
                                        <wa-icon slot="start" name="magnet"></wa-icon>
                                        Register Magnet Handler
                                    </wa-button>
                                </div>
                            </div>

                            <div class="grid grid-3">
                                <div class="field-group">
                                    <label class="label" for="urlBase">
                                        <span class="label-text">URL Base</span>
                                    </label>
                                    <input type="text" class="app-input" id="urlBase" name="url_base" placeholder="/">
                                    <div class="label">
                                        <span class="label-text-alt">URL base for the application</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="bindAddress">
                                        <span class="label-text">Bind Address</span>
                                    </label>
                                    <input type="text" class="app-input" id="bindAddress" name="bind_address" placeholder="0.0.0.0">
                                    <div class="label">
                                        <span class="label-text-alt">Bind address (default: all interfaces)</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="port">
                                        <span class="label-text">Port</span>
                                    </label>
                                    <input type="number" class="app-input" id="port" name="port" placeholder="8282">
                                    <div class="label">
                                        <span class="label-text-alt">Application port</span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-3">
                                <div class="field-group">
                                    <label class="label" for="debridPollInterval">
                                        <span class="label-text">Debrid Poll Interval (seconds)</span>
                                    </label>
                                    <input type="number" class="app-input" id="debridPollInterval" name="debrid_poll_interval" min="5" placeholder="30">
                                    <div class="label">
                                        <span class="label-text-alt">How often to refresh debrid status</span>
                                    </div>
                                </div>
                                <div class="field-group">
                                    <label class="label" for="badTorrentThresholdHours">
                                        <span class="label-text">Bad Torrent Threshold (hours)</span>
                                    </label>
                                    <input type="number" class="app-input" id="badTorrentThresholdHours" name="bad_torrent_threshold_hours" min="1" placeholder="12">
                                    <div class="label">
                                        <span class="label-text-alt">Mark waiting torrents as bad after this duration</span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-2">
                                <div class="field-group">
                                    <label class="label" for="discordWebhookUrl">
                                        <span class="label-text">Discord Webhook URL</span>
                                    </label>
                                    <textarea class="app-textarea" id="discordWebhookUrl" name="discord_webhook_url" placeholder="https://discord.com/api/webhooks/..."></textarea>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="allowedExtensions">
                                        <span class="label-text">Allowed File Extensions</span>
                                    </label>
                                    <textarea class="app-textarea" id="allowedExtensions" name="allowed_file_types" placeholder="mkv, mp4, avi, mov"></textarea>
                                    <div class="label">
                                        <span class="label-text-alt">Comma-separated list of allowed file extensions</span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-2">
                                <div class="field-group">
                                    <label class="label" for="minFileSize">
                                        <span class="label-text">Minimum File Size</span>
                                    </label>
                                    <input type="text" class="app-input" id="minFileSize" name="min_file_size" placeholder="10MB">
                                    <div class="label">
                                        <span class="label-text-alt">Minimum file size to download</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="maxFileSize">
                                        <span class="label-text">Maximum File Size</span>
                                    </label>
                                    <input type="text" class="app-input" id="maxFileSize" name="max_file_size" placeholder="50GB">
                                    <div class="label">
                                        <span class="label-text-alt">Maximum file size to download</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="removeStalledAfter">
                                        <span class="label-text">Remove Stalled After</span>
                                    </label>
                                    <input type="text" class="app-input" id="removeStalledAfter" name="remove_stalled_after" placeholder="1h">
                                    <div class="label">
                                        <span class="label-text-alt">Duration before removing stalled torrents</span>
                                    </div>
                                </div>
                                <div class="field-group">
                                    <label class="label" for="callbackUrl">
                                        <span class="label-text">Callback URL</span>
                                    </label>
                                    <input type="text" class="app-input" id="callbackUrl" name="callback_url" placeholder="http://example.com/callback">
                                    <div class="label">
                                        <span class="label-text-alt">Optional callback URL for download status updates</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Authentication Settings Section -->
                            <div class="section-divider">
                                <span class="section-divider__text">Authentication Settings</span>
                            </div>

                            <wa-card class="panel panel-muted">
                                <div class="panel-body">
                                    <div class="page-stack">
                                        <div class="row-between-start">
                                            <div class="stack-sm grow">
                                                <h3 class="section-subheading">Authentication Settings</h3>
                                                <p class="hint">Configure username/password authentication and API token for programmatic access.</p>
                                            </div>
                                        </div>

                                        <!-- Username/Password Section -->
                                        <div class="stack-md">
                                            <h4 class="section-subheading">Web Authentication</h4>
                                            <div class="grid grid-2">
                                                <div class="field-group">
                                                    <label class="label">
                                                        <span class="label-text">Username</span>
                                                    </label>
                                                    <input type="text" 
                                                           id="auth-username" 
                                                           name="auth_username"
                                                           class="app-input" 
                                                           placeholder="Enter username (leave empty to disable auth)">
                                                    <div class="label">
                                                        <span class="label-text-alt">Leave empty to disable authentication</span>
                                                    </div>
                                                </div>
                                                <div class="field-group">
                                                    <label class="label">
                                                        <span class="label-text">Password</span>
                                                    </label>
                                                    <div class="password-toggle-container">
                                                        <input type="password" 
                                                               id="auth-password" 
                                                               name="auth_password"
                                                               class="app-input input-has-toggle" 
                                                               placeholder="Enter password">
                                                        <wa-button type="button" appearance="plain" class="password-toggle-btn">
                                                            <wa-icon name="eye"></wa-icon>
                                                        </wa-button>
                                                    </div>
                                                    <div class="label">
                                                        <span class="label-text-alt">Leave empty to disable authentication</span>
                                                    </div>
                                                </div>
                                                <div class="field-group">
                                                    <label class="label">
                                                        <span class="label-text">Confirm Password</span>
                                                    </label>
                                                    <div class="password-toggle-container">
                                                        <input type="password"
                                                               id="auth-password-confirm"
                                                               name="auth_password_confirm"
                                                               class="app-input input-has-toggle"
                                                               placeholder="Confirm password">
                                                        <wa-button type="button" appearance="plain" class="password-toggle-btn">
                                                            <wa-icon name="eye"></wa-icon>
                                                        </wa-button>
                                                    </div>
                                                    <div class="label">
                                                        <span class="label-text-alt" id="password-match-indicator"></span>
                                                    </div>
                                                </div>
                                                <div class="field-group">
                                                    <label class="label">
                                                        <span class="label-text">Current Token</span>
                                                    </label>
                                                    <div class="join">
                                                        <input type="text"
                                                               id="api-token-display"
                                                               class="app-input grow text-mono"
                                                               placeholder="No token generated"
                                                               readonly>
                                                        <wa-button type="button" appearance="outline" size="small"
                                                                id="copy-token-btn"
                                                                onclick="copyAPIToken();">
                                                            <wa-icon name="copy"></wa-icon>
                                                        </wa-button>
                                                        <wa-button type="button" appearance="outline" size="small"
                                                                id="refresh-token-btn"
                                                                onclick="refreshAPIToken();">
                                                            <wa-icon name="arrows-rotate"></wa-icon>
                                                        </wa-button>
                                                    </div>
                                                    <div class="label">
                                                        <span class="label-text-alt">Click refresh to generate or update your API token</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row-end">
                                                <wa-button type="button" variant="brand"
                                                        id="update-auth-btn"
                                                        onclick="updateAuthSettings();">
                                                    Update Authentication
                                                </wa-button>
                                            </div>
                                        </div>
                                        <div class="stack-md">
                                            <p class="hint">Use this token for API authentication instead of session cookies. Perfect for automation and scripts.</p>

                                        </div>
                                    </div>
                                </div>
                            </wa-card>
                        </div>
                    </div>
                    </div>

                    <div class="tab-content hidden" data-tab-content="debrid">
                        <div class="page-stack">
                            <div class="row-between">
                                <h2 class="section-heading">
                                    Debrid Services
                                </h2>
                                <wa-button type="button" variant="brand" appearance="outline" id="addDebridBtn">
                                    Add Debrid Service
                                </wa-button>
                            </div>

                            <div id="debridConfigs" class="stack-md">
                            </div>
                        </div>
                    </div>

                    <div class="tab-content hidden" data-tab-content="qbittorrent">
                        <div class="page-stack">
                            <h2 class="section-heading">
                                QBittorrent Settings
                            </h2>

                            <div class="grid grid-2">
                                <div class="field-group">
                                    <label class="label" for="qbit.download_folder">
                                        <span class="label-text">Download Folder</span>
                                    </label>
                                    <input type="text" class="app-input" name="qbit.download_folder" id="qbit.download_folder">
                                    <div class="label">
                                        <span class="label-text-alt">Folder where downloaded files will be stored</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="qbit.refresh_interval">
                                        <span class="label-text">Refresh Interval (seconds)</span>
                                    </label>
                                    <input type="number" class="app-input" name="qbit.refresh_interval" id="qbit.refresh_interval" min="1">
                                </div>

                                <div class="field-group">
                                    <label class="label" for="qbit.max_downloads">
                                        <span class="label-text">Maximum Downloads</span>
                                    </label>
                                    <input type="number" class="app-input" name="qbit.max_downloads" id="qbit.max_downloads" min="0">
                                    <div class="label">
                                        <span class="label-text-alt">Maximum simultaneous downloads (0 = unlimited)</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="checkbox-row">
                                        <input type="checkbox" class="app-checkbox" name="qbit.skip_pre_cache" id="qbit.skip_pre_cache">
                                        <div class="checkbox-row__text">
                                            <span class="label-text">Skip Pre-Cache</span>
                                            <span class="label-text-alt">Disable pre-caching to speed up imports</span>
                                        </div>
                                    </label>
                                </div>

                                <div class="field-group">
                                    <label class="checkbox-row">
                                        <input type="checkbox" class="app-checkbox" name="qbit.always_rm_tracker_urls" id="qbit.always_rm_tracker_urls">
                                        <div class="checkbox-row__text">
                                            <span class="label-text">Always Remove Tracker URLs</span>
                                            <span class="label-text-alt">Allows you to <a href="https://sirrobot01.github.io/decypharr/features/repair-worker/private-tracker-downloads" class="app-link" target="_blank">download private tracker torrents</a> with lower risk</span>
                                        </div>
                                    </label>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="qbit.default_action">
                                        <span class="label-text">Default Action</span>
                                    </label>
                                    <select class="app-select" name="qbit.default_action" id="qbit.default_action">
                                        <option value="symlink">Symlink (fast, requires shared rclone mount)</option>
                                        <option value="download">Download (copy files to download folder)</option>
                                        <option value="none">None (no file output)</option>
                                    </select>
                                    <div class="label">
                                        <span class="label-text-alt">Use Download if other containers can't access the rclone mount</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content hidden" data-tab-content="arrs">
                        <div class="page-stack">
                            <div class="row-between">
                                <h2 class="section-heading">
                                    Arr Applications
                                </h2>
                                <wa-button type="button" variant="brand" appearance="outline" id="addArrBtn">
                                    Add Arr Service
                                </wa-button>
                            </div>

                            <div id="arrConfigs" class="stack-md">
                            </div>
                        </div>
                    </div>

                    <div class="tab-content hidden" data-tab-content="repair">
                        <div class="page-stack">
                            <h2 class="section-heading">
                                Repair Settings
                            </h2>

                            <div class="field-group">
                                <label class="checkbox-row">
                                    <input type="checkbox" class="app-checkbox" name="repair.enabled" id="repair.enabled">
                                    <div class="checkbox-row__text">
                                        <span class="label-text">Enable Scheduled Repair</span>
                                        <span class="label-text-alt">Automatically repair broken symlinks and missing files</span>
                                    </div>
                                </label>
                            </div>

                            <div class="grid grid-2">
                                <div class="field-group">
                                    <label class="label" for="repair.interval">
                                        <span class="label-text">Repair Interval</span>
                                    </label>
                                    <input type="text" class="app-input" name="repair.interval" id="repair.interval" placeholder="24h">
                                    <div class="label">
                                        <span class="label-text-alt">How often to run repair (e.g., 24h, 1d, 03:00, or crontab)</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="repair.workers">
                                        <span class="label-text">Worker Threads</span>
                                    </label>
                                    <input type="number" class="app-input" name="repair.workers" id="repair.workers" min="1" placeholder="40">
                                    <div class="label">
                                        <span class="label-text-alt">Number of concurrent repair workers</span>
                                    </div>
                                </div>

                                <div class="field-group">
                                    <label class="label" for="repair.strategy">
                                        <span class="label-text">Repair Strategy</span>
                                    </label>
                                    <select class="app-select" name="repair.strategy" id="repair.strategy">
                                        <option value="per_torrent" selected>Per Torrent</option>
                                        <option value="per_file">Per File</option>
                                    </select>
                                    <div class="label">
                                        <span class="label-text-alt">How to handle repairs</span>
                                    </div>
                                </div>
                                <div class="field-group">
                                    <label class="label" for="repair.zurg_url">
                                        <span class="label-text">Zurg URL</span>
                                    </label>
                                    <input type="url" class="app-input" name="repair.zurg_url" id="repair.zurg_url" placeholder="http://zurg:9999">
                                    <div class="label">
                                        <span class="label-text-alt">Optional Zurg instance to speed up repairs</span>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-3">
                                <div class="field-group">
                                    <label class="checkbox-row">
                                        <input type="checkbox" class="app-checkbox" name="repair.use_webdav" id="repair.use_webdav">
                                        <div class="checkbox-row__text">
                                            <span class="label-text">Use WebDAV</span>
                                            <span class="label-text-alt">Use internal WebDAV for repairs</span>
                                        </div>
                                    </label>
                                </div>

                                <div class="field-group">
                                    <label class="checkbox-row">
                                        <input type="checkbox" class="app-checkbox" name="repair.auto_process" id="repair.auto_process">
                                        <div class="checkbox-row__text">
                                            <span class="label-text">Auto Process</span>
                                            <span class="label-text-alt">Automatically delete broken symlinks and re-search</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content hidden" data-tab-content="rclone">
                        <div class="page-stack">
                            <h2 class="section-heading">
                                Rclone Mount Settings
                            </h2>

                            <div class="field-group">
                                <label class="checkbox-row">
                                    <input type="checkbox" class="app-checkbox" name="rclone.enabled" id="rclone.enabled">
                                    <div class="checkbox-row__text">
                                        <span class="label-text">Enable Mount</span>
                                        <span class="label-text-alt">Automatically mount your debrid items</span>
                                    </div>
                                </label>
                            </div>

                            <wa-card class="panel panel-muted">
                                <div class="panel-body">
                                    <h3 class="section-subheading">
                                        Mount Configuration
                                    </h3>
                                    <div class="grid grid-4">
                                        <div class="field-group">
                                            <label class="label" for="rclone.mount_path">
                                                <span class="label-text">Global Mount Path</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.mount_path" id="rclone.mount_path" placeholder="/mnt/decypharr">
                                            <div class="label">
                                                <span class="label-text-alt">Base directory where all providers will be mounted (e.g., /mnt/decypharr)</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.rc_port">
                                                <span class="label-text">RC Port</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.rc_port" id="rclone.rc_port">
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.log_level">
                                                <span class="label-text">Log Level</span>
                                            </label>
                                            <select class="app-select" name="rclone.log_level" id="rclone.log_level">
                                                <option value="INFO">INFO</option>
                                                <option value="DEBUG">DEBUG</option>
                                                <option value="NOTICE">NOTICE</option>
                                                <option value="ERROR">ERROR</option>
                                            </select>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.uid">
                                                <span class="label-text">User ID (PUID)</span>
                                            </label>
                                            <input type="number" class="app-input" name="rclone.uid" id="rclone.uid" placeholder="1000" min="0">
                                            <div class="label">
                                                <span class="label-text-alt">User ID for mounted files (0 = current user)</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.gid">
                                                <span class="label-text">Group ID (PGID)</span>
                                            </label>
                                            <input type="number" class="app-input" name="rclone.gid" id="rclone.gid" placeholder="1000" min="0">
                                            <div class="label">
                                                <span class="label-text-alt">Group ID for mounted files (0 = current group)</span>
                                            </div>
                                        </div>
                                        <div class="field-group">
                                            <label class="label" for="rclone.umask">
                                                <span class="label-text">UMASK</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.umask" id="rclone.umask" placeholder="0022">
                                            <div class="label">
                                                <span class="label-text-alt">Umask</span>
                                            </div>
                                        </div>
                                        <div class="field-group">
                                            <label class="label" for="rclone.buffer_size">
                                                <span class="label-text">Buffer Size</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.buffer_size" id="rclone.buffer_size" placeholder="10M">
                                            <div class="label">
                                                <span class="label-text-alt">Buffer Size(This caches to memory, be wary!!)</span>
                                            </div>
                                        </div>
                                        <div class="field-group">
                                            <label class="label" for="rclone.bw_limit">
                                                <span class="label-text">Bandwidth Limit</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.bw_limit" id="rclone.bw_limit" placeholder="100M">
                                            <div class="label">
                                                <span class="label-text-alt">Bandwidth limit (e.g., 100M, 1G, leave empty for unlimited)</span>
                                            </div>
                                        </div>
                                        <div class="field-group">
                                            <label class="label" for="rclone.attr_timeout">
                                                <span class="label-text">Attribute Caching Timeout</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.attr_timeout" id="rclone.attr_timeout" placeholder="1s">
                                            <div class="label">
                                                <span class="label-text-alt">How long the kernel caches the attributes (size, modification time, etc.)</span>
                                            </div>
                                        </div>
                                        <div class="field-group">
                                            <label class="label" for="rclone.transfers">
                                                <span class="label-text">Transfers</span>
                                            </label>
                                            <input type="number" class="app-input" name="rclone.transfers" id="rclone.transfers" placeholder="8" min="1">
                                            <div class="label">
                                                <span class="label-text-alt">Number of file transfers to run in parallel</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </wa-card>
                            <wa-card class="panel panel-muted">
                                <div class="panel-body">
                                    <h3 class="section-subheading">
                                        VFS Cache Settings
                                    </h3>
                                    <div class="grid grid-4">
                                        <div class="field-group">
                                            <label class="label" for="rclone.cache_dir">
                                                <span class="label-text">Cache Directory</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.cache_dir" id="rclone.cache_dir" placeholder="/tmp/rclone">
                                            <div class="label">
                                                <span class="label-text-alt">Directory for rclone cache files (leave empty for system default)</span>
                                            </div>
                                        </div>
                                        
                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_cache_mode">
                                                <span class="label-text">VFS Cache Mode</span>
                                            </label>
                                            <select class="app-select" name="rclone.vfs_cache_mode" id="rclone.vfs_cache_mode">
                                                <option value="off">Off - No caching</option>
                                                <option value="minimal">Minimal - Cache file structure only</option>
                                                <option value="writes">Writes - Cache writes for better performance</option>
                                                <option value="full">Full - Cache reads and writes</option>
                                            </select>
                                            <div class="label">
                                                <span class="label-text-alt">VFS caching mode for performance optimization</span>
                                            </div>
                                        </div>
                                        
                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_cache_max_size">
                                                <span class="label-text">VFS Cache Max Size</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_cache_max_size" id="rclone.vfs_cache_max_size" placeholder="1G">
                                            <div class="label">
                                                <span class="label-text-alt">Maximum cache size (e.g., 1G, 500M, leave empty for unlimited)</span>
                                            </div>
                                        </div>
                                        
                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_cache_max_age">
                                                <span class="label-text">VFS Cache Max Age</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_cache_max_age" id="rclone.vfs_cache_max_age" placeholder="1h">
                                            <div class="label">
                                                <span class="label-text-alt">Maximum age of cache entries (e.g., 1h, 30m)</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_read_chunk_size">
                                                <span class="label-text">Read Chunk Size</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_read_chunk_size" id="rclone.vfs_read_chunk_size" placeholder="128M">
                                            <div class="label">
                                                <span class="label-text-alt">Size of data chunks to read (e.g., 128M, 64M)</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_read_chunk_size_limit">
                                                <span class="label-text">Read Chunk Size Limit</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_read_chunk_size_limit" id="rclone.vfs_read_chunk_size_limit" placeholder="128M">
                                            <div class="label">
                                                <span class="label-text-alt">Limit Read Chunk Size</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_read_ahead">
                                                <span class="label-text">VFS Read Ahead</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_read_ahead" id="rclone.vfs_read_ahead" placeholder="128k">
                                            <div class="label">
                                                <span class="label-text-alt">Read ahead buffer size (e.g., 128k, 256k)</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.dir_cache_time">
                                                <span class="label-text">Directory Cache Time</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.dir_cache_time" id="rclone.dir_cache_time" placeholder="5m">
                                            <div class="label">
                                                <span class="label-text-alt">How long to cache directory listings (e.g., 5m, 10m)</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_cache_poll_interval">
                                                <span class="label-text">VFS Cache Poll Interval</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_cache_poll_interval" id="rclone.vfs_cache_poll_interval" placeholder="1h">
                                            <div class="label">
                                                <span class="label-text-alt">How often VFS cache dir gets cleaned</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_cache_min_free_space">
                                                <span class="label-text">VFS Cache Min Free Space</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_cache_min_free_space" id="rclone.vfs_cache_min_free_space" placeholder="1G">
                                            <div class="label">
                                                <span class="label-text-alt">Target minimum free space on the disk containing the cache</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_disk_space_total">
                                                <span class="label-text">VFS Disk Space Total</span>
                                            </label>
                                            <input type="text" class="app-input" name="rclone.vfs_disk_space_total" id="rclone.vfs_disk_space_total" placeholder="1G">
                                            <div class="label">
                                                <span class="label-text-alt">Specify the total space of disk</span>
                                            </div>
                                        </div>

                                        <div class="field-group">
                                            <label class="label" for="rclone.vfs_read_chunk_streams">
                                                <span class="label-text">VFS Read Chunk Streams</span>
                                            </label>
                                            <input type="number" class="app-input" name="rclone.vfs_read_chunk_streams" id="rclone.vfs_read_chunk_streams" placeholder="4" min="0">
                                            <div class="label">
                                                <span class="label-text-alt">The number of parallel streams to read at once</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </wa-card>

                            <wa-card class="panel panel-muted">
                                <div class="panel-body">
                                    <h3 class="section-subheading">
                                        Advanced Settings
                                    </h3>
                                    <div class="grid grid-3">
                                        <div class="field-group">
                                            <label class="checkbox-row">
                                                <input type="checkbox" class="app-checkbox" name="rclone.no_modtime" id="rclone.no_modtime">
                                                <div class="checkbox-row__text">
                                                    <span class="label-text">No Modification Time</span>
                                                    <span class="label-text-alt">Don't read/write modification times</span>
                                                </div>
                                            </label>
                                        </div>
                                        
                                        <div class="field-group">
                                            <label class="checkbox-row">
                                                <input type="checkbox" class="app-checkbox" name="rclone.no_checksum" id="rclone.no_checksum">
                                                <div class="checkbox-row__text">
                                                    <span class="label-text">No Checksum</span>
                                                    <span class="label-text-alt">Don't checksum files on upload</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div class="field-group">
                                            <label class="checkbox-row" for="rclone.async_read">
                                                <input type="checkbox" class="app-checkbox" name="rclone.async_read" id="rclone.async_read">
                                                <div class="checkbox-row__text">
                                                    <span class="label-text">Async Read</span>
                                                    <span class="label-text-alt">Use asynchronous reads</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div class="field-group">
                                            <label class="checkbox-row" for="rclone.vfs_fast_fingerprint">
                                                <input type="checkbox" class="app-checkbox" name="rclone.vfs_fast_fingerprint" id="rclone.vfs_fast_fingerprint">
                                                <div class="checkbox-row__text">
                                                    <span class="label-text">VFS Fast Fingerprint</span>
                                                    <span class="label-text-alt">Use fast (less accurate) fingerprints for change detection</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div class="field-group">
                                            <label class="checkbox-row" for="rclone.use_mmap">
                                                <input type="checkbox" class="app-checkbox" name="rclone.use_mmap" id="rclone.use_mmap">
                                                <div class="checkbox-row__text">
                                                    <span class="label-text">Use Mmap</span>
                                                    <span class="label-text-alt">Use fast (less accurate) fingerprints for change detection</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </wa-card>
                        </div>
                    </div>

                </div>
            </div>
        </wa-card>
    </form>
</div>

<div id="loadingOverlay" class="overlay hidden">
    <wa-card class="panel overlay-card">
        <div class="panel-body center-text stack-sm">
            <wa-spinner></wa-spinner>
            <h3 class="section-subheading">Applying Configuration</h3>
            <p class="hint">Please wait while we save your settings...</p>
        </div>
    </wa-card>
</div>
`;class ConfigPage extends i$3{createRenderRoot(){return this}firstUpdated(){this._controller||(this._controller=new ConfigManager,window.configManager=this._controller,setupPasswordToggles(),window.refreshAPIToken=refreshAPIToken,window.copyAPIToken=copyAPIToken,window.updateAuthSettings=updateAuthSettings)}render(){const w=window.urlBase||"",O=this.needSetup?`
        <wa-callout variant="warning" appearance="accent">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <strong>Configuration Required</strong>
          <div>Your configuration is incomplete. Please complete the setup below.</div>
        </wa-callout>
      `:"",F=template$1.replace("__NEED_SETUP__",O).replace(/__URL_BASE__/g,w);return b`${o(F)}`}}Se(ConfigPage,"properties",{needSetup:{type:Boolean,attribute:"need-setup"}});customElements.define("config-page",ConfigPage);function setupPasswordToggles(){document.addEventListener("click",T=>{const w=T.target.closest(".password-toggle-btn");if(!w)return;T.preventDefault(),T.stopPropagation();const O=w.closest(".password-toggle-container");if(!O)return;const F=O.querySelector("input, textarea, wa-input, wa-textarea");let W=w.querySelector("wa-icon, i");W||(W=document.createElement("wa-icon"),W.setAttribute("name","eye"),w.appendChild(W)),!(!F||!W)&&(F.tagName.toLowerCase()==="textarea"?togglePasswordTextarea(F,W):togglePasswordInput(F,W))})}function togglePasswordInput(T,w){T.type==="password"?(T.type="text",w.tagName&&w.tagName.toLowerCase()==="wa-icon"?w.setAttribute("name","eye-slash"):w.className="bi bi-eye-slash"):(T.type="password",w.tagName&&w.tagName.toLowerCase()==="wa-icon"?w.setAttribute("name","eye"):w.className="bi bi-eye")}function togglePasswordTextarea(T,w){T.style.webkitTextSecurity==="disc"||T.style.webkitTextSecurity===""||T.getAttribute("data-password-visible")!=="true"?(T.style.webkitTextSecurity="none",T.style.textSecurity="none",T.setAttribute("data-password-visible","true"),w.tagName&&w.tagName.toLowerCase()==="wa-icon"?w.setAttribute("name","eye-slash"):w.className="bi bi-eye-slash"):(T.style.webkitTextSecurity="disc",T.style.textSecurity="disc",T.setAttribute("data-password-visible","false"),w.tagName&&w.tagName.toLowerCase()==="wa-icon"?w.setAttribute("name","eye"):w.className="bi bi-eye")}async function refreshAPIToken(){const T=document.getElementById("refresh-token-btn"),w=document.getElementById("api-token-display");window.decypharrUtils.setButtonLoading(T,!0,"Refresh Token");try{const O=await window.decypharrUtils.fetcher("/api/refresh-token",{method:"POST"});if(!O.ok)throw new Error("Failed to refresh token");const F=await O.json();w.value=F.token,window.decypharrUtils.createToast(F.message||"Token refreshed successfully","success")}catch(O){console.error("Error refreshing token:",O),window.decypharrUtils.createToast("Failed to refresh token: "+O.message,"error")}finally{window.decypharrUtils.setButtonLoading(T,!1)}}async function copyAPIToken(){const w=document.getElementById("api-token-display").value;if(!w||w==="No token generated"){window.decypharrUtils.createToast("No token to copy. Please refresh the token first.","warning");return}try{await window.decypharrUtils.copyToClipboard(w)}catch(O){console.error("Failed to copy token:",O),window.decypharrUtils.createToast("Failed to copy token to clipboard","error")}}async function updateAuthSettings(){const T=document.getElementById("auth-username").value,w=document.getElementById("auth-password").value,O=document.getElementById("auth-password-confirm").value,F=document.getElementById("update-auth-btn");if(w!==O)return window.decypharrUtils.createToast("Passwords do not match","error"),!1;window.decypharrUtils.setButtonLoading(F,!0,"Update Authentication");try{const W=await window.decypharrUtils.fetcher("/api/update-auth",{method:"POST",body:JSON.stringify({username:T,password:w,confirm_password:O})});if(!W.ok){const q=await W.text();throw new Error(q||"Failed to update authentication settings")}const U=await W.json();return window.decypharrUtils.createToast(U.message,"success"),document.getElementById("auth-password").value="",document.getElementById("auth-password-confirm").value="",!0}catch(W){return console.error("Error updating auth settings:",W),window.decypharrUtils.createToast("Failed to update authentication: "+W.message,"error"),!1}finally{window.decypharrUtils.setButtonLoading(F,!1)}}class ConfigManager{constructor(){this.debridCount=0,this.arrCount=0,this.debridDirectoryCounts={},this.directoryFilterCounts={},this.refs={configForm:document.getElementById("configForm"),loadingOverlay:document.getElementById("loadingOverlay"),debridConfigs:document.getElementById("debridConfigs"),arrConfigs:document.getElementById("arrConfigs"),addDebridBtn:document.getElementById("addDebridBtn"),addArrBtn:document.getElementById("addArrBtn")},this.init()}init(){this.bindEvents(),this.initTabs(),this.loadConfiguration(),this.setupMagnetHandler(),this.checkIncompleteConfig()}initTabs(){const w=Array.from(document.querySelectorAll(".tab-button")),O=Array.from(document.querySelectorAll(".tab-content"));if(!w.length||!O.length)return;const F=W=>{const U=W.dataset.tab;w.forEach(q=>q.classList.toggle("active",q===W)),O.forEach(q=>{q.classList.toggle("hidden",q.dataset.tabContent!==U)})};w.forEach(W=>W.addEventListener("click",()=>F(W))),F(w.find(W=>W.classList.contains("active"))||w[0])}checkIncompleteConfig(){const w=new URLSearchParams(window.location.search);if(w.has("inco")){const O=w.get("inco");window.decypharrUtils.createToast(`Incomplete configuration: ${O}`,"warning")}}bindEvents(){this.refs.configForm.addEventListener("submit",w=>this.saveConfiguration(w)),this.refs.addDebridBtn.addEventListener("click",()=>this.addDebridConfig()),this.refs.addArrBtn.addEventListener("click",()=>this.addArrConfig()),document.addEventListener("change",w=>{w.target.classList.contains("useWebdav")&&this.toggleWebDAVSection(w.target)}),document.addEventListener("click",w=>{const O=w.target.closest(".test-debrid-key");if(O){w.preventDefault();const F=parseInt(O.dataset.index||"0",10);this.testDebridKey(F)}})}async loadConfiguration(){try{const w=await window.decypharrUtils.fetcher("/api/config");if(!w.ok)throw new Error("Failed to load configuration");const O=await w.json();this.populateForm(O)}catch(w){console.error("Error loading configuration:",w),window.decypharrUtils.createToast("Error loading configuration","error")}}populateForm(w){this.populateGeneralSettings(w),w.debrids&&Array.isArray(w.debrids)&&w.debrids.forEach(O=>this.addDebridConfig(O)),this.populateQBittorrentSettings(w.qbittorrent),w.arrs&&Array.isArray(w.arrs)&&w.arrs.forEach(O=>this.addArrConfig(O)),this.populateRepairSettings(w.repair),this.populateRcloneSettings(w.rclone),this.populateAPIToken(w)}populateGeneralSettings(w){["log_level","url_base","bind_address","port","discord_webhook_url","min_file_size","max_file_size","remove_stalled_after","debrid_poll_interval","bad_torrent_threshold_hours"].forEach(F=>{const W=document.querySelector(`[name="${F}"]`);W&&w[F]!==void 0&&(W.value=w[F])}),w.allowed_file_types&&Array.isArray(w.allowed_file_types)&&(document.querySelector('[name="allowed_file_types"]').value=w.allowed_file_types.join(", "))}populateQBittorrentSettings(w){if(!w)return;["download_folder","refresh_interval","max_downloads","skip_pre_cache","always_rm_tracker_urls","default_action"].forEach(F=>{const W=document.querySelector(`[name="qbit.${F}"]`);W&&w[F]!==void 0&&(W.type==="checkbox"?W.checked=w[F]:W.value=w[F])})}populateRepairSettings(w){if(!w)return;["enabled","interval","workers","zurg_url","strategy","use_webdav","auto_process"].forEach(F=>{const W=document.querySelector(`[name="repair.${F}"]`);W&&w[F]!==void 0&&(W.type==="checkbox"?W.checked=w[F]:W.value=w[F])})}populateRcloneSettings(w){if(!w)return;["enabled","rc_port","mount_path","cache_dir","transfers","vfs_cache_mode","vfs_cache_max_size","vfs_cache_max_age","vfs_cache_poll_interval","vfs_read_chunk_size","vfs_read_chunk_size_limit","buffer_size","bw_limit","uid","gid","vfs_read_ahead","attr_timeout","dir_cache_time","poll_interval","umask","no_modtime","no_checksum","log_level","vfs_cache_min_free_space","vfs_fast_fingerprint","vfs_read_chunk_streams","async_read","use_mmap"].forEach(F=>{const W=document.querySelector(`[name="rclone.${F}"]`);W&&w[F]!==void 0&&(W.type==="checkbox"?W.checked=w[F]:W.value=w[F])})}addDebridConfig(w={}){const O=this.getDebridTemplate(this.debridCount,w);this.refs.debridConfigs.insertAdjacentHTML("beforeend",O);const W=this.refs.debridConfigs.lastElementChild.querySelector(".useWebdav");w.use_webdav&&this.toggleWebDAVSection(W,!0),Object.keys(w).length>0&&this.populateDebridData(this.debridCount,w),this.debridDirectoryCounts[this.debridCount]=0,w.directories&&Object.entries(w.directories).forEach(([U,q])=>{const j=this.addDirectory(this.debridCount,{name:U,...q});q.filters&&Object.entries(q.filters).forEach(([J,X])=>{this.addFilter(this.debridCount,j,J,X)})}),this.debridCount++}populateDebridData(w,O){Object.entries(O).forEach(([F,W])=>{const U=document.querySelector(`[name="debrid[${w}].${F}"]`);U&&(U.type==="checkbox"?U.checked=W:F==="download_api_keys"&&Array.isArray(W)?(U.value=W.join(`
`),U.tagName.toLowerCase()==="textarea"&&(U.style.webkitTextSecurity="disc",U.style.textSecurity="disc",U.setAttribute("data-password-visible","false"))):U.value=W)})}getDebridTemplate(w){return templateDebrid(w)}toggleWebDAVSection(w,O=!1){const F=w.closest(".debrid-config"),W=F.dataset.index,U=F.querySelector(`#webdav-section-${W}`),q=U.querySelectorAll(".webdav-field");w.checked||O?U.classList.remove("hidden"):(U.classList.add("hidden"),q.forEach(j=>j.required=!1))}addDirectory(w,O={}){this.debridDirectoryCounts[w]||(this.debridDirectoryCounts[w]=0);const F=this.debridDirectoryCounts[w],W=document.getElementById(`debrid[${w}].directories`),U=this.getDirectoryTemplate(w,F);return W.insertAdjacentHTML("beforeend",U),Object.keys(O).length>0&&this.populateDirectoryData(w,F,O),this.debridDirectoryCounts[w]++,F}populateDirectoryData(w,O,F){if(F.name){const W=document.querySelector(`[name="debrid[${w}].directories[${O}].name"]`);W&&(W.value=F.name)}if(F.path){const W=document.querySelector(`[name="debrid[${w}].directories[${O}].path"]`);W&&(W.value=F.path)}}getDirectoryTemplate(w,O){return templateDirectory(w,O)}addFilter(w,O,F,W){this.directoryFilterCounts[`${w}-${O}`]||(this.directoryFilterCounts[`${w}-${O}`]=0);const U=this.directoryFilterCounts[`${w}-${O}`],q=document.getElementById(`debrid[${w}].directories[${O}].filters`),j=this.getFilterTemplate(w,O,U);q.insertAdjacentHTML("beforeend",j);const J=document.querySelector(`[name="debrid[${w}].directories[${O}].filters[${U}].type"]`),X=document.querySelector(`[name="debrid[${w}].directories[${O}].filters[${U}].value"]`);J&&(J.value=F),X&&(X.value=W),this.directoryFilterCounts[`${w}-${O}`]++}getFilterTemplate(w,O,F){return templateFilter(w,O,F)}addArrConfig(w={}){const O=this.getArrTemplate(this.arrCount,w);this.refs.arrConfigs.insertAdjacentHTML("beforeend",O),Object.keys(w).length>0&&this.populateArrData(this.arrCount,w),this.arrCount++}populateArrData(w,O){Object.entries(O).forEach(([F,W])=>{const U=document.querySelector(`[name="arr[${w}].${F}"]`);U&&(U.type==="checkbox"?U.checked=W:U.value=W)})}getArrTemplate(w,O={}){return templateArr(w,O)}async saveConfiguration(w){w.preventDefault();const O=new FormData(this.refs.configForm),F=this.buildConfigPayload(O);this.showLoadingOverlay(!0);try{const W=await window.decypharrUtils.fetcher("/api/config",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(F)});if(!W.ok){const U=await W.text();throw new Error(U||"Failed to save configuration")}window.decypharrUtils.createToast("Configuration saved successfully","success")}catch(W){console.error("Error saving configuration:",W),window.decypharrUtils.createToast("Failed to save configuration: "+W.message,"error")}finally{this.showLoadingOverlay(!1)}}buildConfigPayload(w){const O=Object.fromEntries(w.entries());return O.allowed_file_types&&(O.allowed_file_types=O.allowed_file_types.split(",").map(F=>F.trim()).filter(Boolean)),O.debrids=this.collectDebridConfig(),O.arrs=this.collectArrConfig(),O.qbittorrent=this.collectQbitConfig(),O.repair=this.collectRepairConfig(),O.rclone=this.collectRcloneConfig(),O}collectDebridConfig(){const w=[];for(let O=0;O<this.debridCount;O++){if(!document.querySelector(`[name="debrid[${O}].name"]`))continue;const W={};document.querySelectorAll(`[name^="debrid[${O}]."]`).forEach(U=>{const q=U.name.replace(`debrid[${O}].`,"");U.type==="checkbox"?W[q]=U.checked:q==="download_api_keys"?W[q]=U.value.split(`
`).map(j=>j.trim()).filter(Boolean):W[q]=U.value}),W.directories=this.collectDirectoryConfig(O),w.push(W)}return w}collectDirectoryConfig(w){const O={},F=document.getElementById(`debrid[${w}].directories`);return F&&F.querySelectorAll(".directory-config").forEach(W=>{const U=W.dataset.index,q=document.querySelector(`[name="debrid[${w}].directories[${U}].name"]`).value,j=document.querySelector(`[name="debrid[${w}].directories[${U}].path"]`).value,J=this.collectFilterConfig(w,U);O[q]={path:j,filters:J}}),O}collectFilterConfig(w,O){const F={},W=document.getElementById(`debrid[${w}].directories[${O}].filters`);return W&&W.querySelectorAll(".filter-config").forEach(U=>{const q=U.dataset.index,j=document.querySelector(`[name="debrid[${w}].directories[${O}].filters[${q}].type"]`).value,J=document.querySelector(`[name="debrid[${w}].directories[${O}].filters[${q}].value"]`).value;j&&(F[j]=J)}),F}collectArrConfig(){const w=[];for(let O=0;O<this.arrCount;O++){if(!document.querySelector(`[name="arr[${O}].name"]`))continue;const W={};document.querySelectorAll(`[name^="arr[${O}]."]`).forEach(U=>{const q=U.name.replace(`arr[${O}].`,"");U.type==="checkbox"?W[q]=U.checked:W[q]=U.value}),w.push(W)}return w}collectQbitConfig(){const w=(O,F="")=>{const W=document.querySelector(`[name="qbit.${O}"]`);return W?W.type==="checkbox"?W.checked:W.value||F:F};return{download_folder:w("download_folder"),refresh_interval:parseInt(w("refresh_interval",60),10),max_downloads:parseInt(w("max_downloads",0),10),skip_pre_cache:w("skip_pre_cache",!1),always_rm_tracker_urls:w("always_rm_tracker_urls",!1),default_action:w("default_action","symlink")}}collectRepairConfig(){return{enabled:document.querySelector('[name="repair.enabled"]').checked,interval:document.querySelector('[name="repair.interval"]').value,zurg_url:document.querySelector('[name="repair.zurg_url"]').value,strategy:document.querySelector('[name="repair.strategy"]').value,workers:parseInt(document.querySelector('[name="repair.workers"]').value)||1,use_webdav:document.querySelector('[name="repair.use_webdav"]').checked,auto_process:document.querySelector('[name="repair.auto_process"]').checked}}collectRcloneConfig(){const w=(O,F="")=>{const W=document.querySelector(`[name="rclone.${O}"]`);if(!W)return F;if(W.type==="checkbox")return W.checked;if(W.type==="number"){const U=parseInt(W.value);return isNaN(U)?0:U}return W.value||F};return{enabled:w("enabled",!1),rc_port:w("rc_port","5572"),mount_path:w("mount_path"),buffer_size:w("buffer_size"),bw_limit:w("bw_limit"),cache_dir:w("cache_dir"),transfers:w("transfers",8),vfs_cache_mode:w("vfs_cache_mode","off"),vfs_cache_max_age:w("vfs_cache_max_age","1h"),vfs_cache_max_size:w("vfs_cache_max_size"),vfs_cache_poll_interval:w("vfs_cache_poll_interval","1m"),vfs_read_chunk_size:w("vfs_read_chunk_size","128M"),vfs_read_chunk_size_limit:w("vfs_read_chunk_size_limit","off"),vfs_cache_min_free_space:w("vfs_cache_min_free_space",""),vfs_fast_fingerprint:w("vfs_fast_fingerprint",!1),vfs_read_chunk_streams:w("vfs_read_chunk_streams",0),use_mmap:w("use_mmap",!1),async_read:w("async_read",!0),uid:w("uid",0),gid:w("gid",0),umask:w("umask",""),vfs_read_ahead:w("vfs_read_ahead","128k"),attr_timeout:w("attr_timeout","1s"),dir_cache_time:w("dir_cache_time","5m"),no_modtime:w("no_modtime",!1),no_checksum:w("no_checksum",!1),log_level:w("log_level","INFO")}}showLoadingOverlay(w){this.refs.loadingOverlay.classList.toggle("hidden",!w)}setupMagnetHandler(){if(window.registerMagnetLinkHandler=()=>{if("registerProtocolHandler"in navigator)try{navigator.registerProtocolHandler("magnet",`${window.location.origin}${window.urlBase}download?magnet=%s`,"Decypharr"),localStorage.setItem("magnetHandler","true");const w=document.getElementById("registerMagnetLink");w&&(w.innerHTML='<wa-icon slot="start" name="check"></wa-icon>Magnet Handler Registered',w.variant="success",w.appearance="solid",w.disabled=!0),window.decypharrUtils.createToast("Magnet link handler registered successfully")}catch(w){console.error("Failed to register magnet link handler:",w),window.decypharrUtils.createToast("Failed to register magnet link handler","error")}else window.decypharrUtils.createToast("Magnet link registration not supported in this browser","warning")},localStorage.getItem("magnetHandler")==="true"){const w=document.getElementById("registerMagnetLink");w&&(w.innerHTML='<wa-icon slot="start" name="check"></wa-icon>Magnet Handler Registered',w.variant="success",w.appearance="solid",w.disabled=!0)}}async testDebridKey(w){const O=document.querySelector(`[name="debrid[${w}].name"]`),F=document.querySelector(`[name="debrid[${w}].api_key"]`);if(!O||!F){window.decypharrUtils.createToast("Debrid fields not found","error");return}const W=O.value.trim(),U=F.value.trim(),q=document.querySelector(`[name="debrid[${w}].unpack_rar"]`),j=document.querySelector(`.test-debrid-key[data-index="${w}"]`);if(!W||!U){window.decypharrUtils.createToast("Please enter a debrid service and API key first","warning");return}try{window.decypharrUtils.setButtonLoading(j,!0);const J=await window.decypharrUtils.fetcher("/api/debrid/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:W,api_key:U,unpack_rar:q?q.checked:!1})});let X={};try{X=await J.json()}catch{X={}}if(!J.ok)throw new Error(X.detail||X.error||"Test failed");const Y=X.profile||{};let K=`${W} key OK`;if(Y.username&&(K+=` (${Y.username})`),Y.expiration){const G=new Date(Y.expiration);isNaN(G.getTime())||(K+=`, expires ${G.toLocaleString()}`)}window.decypharrUtils.createToast(K,"success")}catch(J){const X=J&&J.message?J.message:String(J);window.decypharrUtils.createToast(`Key test failed: ${X}`,"error")}finally{window.decypharrUtils.setButtonLoading(j,!1)}}populateAPIToken(w){const O=document.getElementById("api-token-display");O&&(O.value=w.api_token||"****");const F=document.getElementById("auth-username");F&&w.auth_username&&(F.value=w.auth_username)}}function getDebridTemplate(T){return`
        <wa-card class="panel debrid-config" data-index="${T}">
            <div class="panel-body page-stack">
                <div class="row-between-start">
                    <h3 class="section-subheading">Debrid Service #${T+1}</h3>
                    <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.debrid-config').remove();">
                        Remove
                    </wa-button>
                </div>
                <div class="grid grid-2 grid-spaced">
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].name">
                                <span class="label-text">Service Type</span>
                            </label>
                            <select class="app-select" name="debrid[${T}].name" id="debrid[${T}].name" required>
                                <option value="realdebrid">Real Debrid</option>
                                <option value="alldebrid">AllDebrid</option>
                                <option value="debridlink">Debrid Link</option>
                                <option value="torbox">Torbox</option>
                            </select>
                        </div>

                        <div class="field-group">
                            <label class="label" for="debrid[${T}].api_key">
                                <span class="label-text">API Key</span>
                            </label>
                            <div class="password-toggle-container">
                                <input type="password" class="app-input input-has-toggle"
                                       name="debrid[${T}].api_key" id="debrid[${T}].api_key" required>
                                <wa-button type="button" appearance="plain" class="password-toggle-btn">
                                    <wa-icon name="eye" id="debrid[${T}].api_key_icon"></wa-icon>
                                </wa-button>
                            </div>
                            <div class="label">
                                <span class="label-text-alt">API key for the debrid service</span>
                            </div>
                            <div class="inline-note">
                                <wa-button type="button" appearance="outline" size="small" class="test-debrid-key" data-index="${T}">
                                    Test key
                                </wa-button>
                                <span class="hint">Validates the API key against the service.</span>
                            </div>
                        </div>
                </div>

                <div class="grid grid-2 grid-spaced">
                    <div class="field-group">
                        <label class="label" for="debrid[${T}].download_api_keys">
                            <span class="label-text">Download API Keys</span>
                        </label>
                        <div class="password-toggle-container">
                            <textarea class="app-textarea text-mono textarea-tall"
                                      name="debrid[${T}].download_api_keys"
                                      id="debrid[${T}].download_api_keys"
                                      placeholder="Multiple API keys for download (one per line). If empty, main API key will be used."></textarea>
                            <wa-button type="button" appearance="plain" class="password-toggle-btn textarea-toggle">
                                <wa-icon name="eye" id="debrid[${T}].download_api_keys_icon"></wa-icon>
                            </wa-button>
                        </div>
                        <div class="label">
                            <span class="label-text-alt">Multiple API keys for downloads - leave empty to use main API key</span>
                        </div>
                    </div>
                    <div class="stack-md">
                    <div class="grid grid-2">
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].folder">
                                <span class="label-text">Mount/Rclone Folder</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="debrid[${T}].folder" id="debrid[${T}].folder"
                                   placeholder="/mnt/remote/realdebrid/__all__" required>
                            <div class="label">
                                <span class="label-text-alt">Path where debrid files are mounted</span>
                            </div>
                        </div>
                        <div class="field-group">
                              <label class="label" for="debrid[${T}].rclone_mount_path">
                                  <span class="label-text">Custom Rclone Mount Path</span>
                                  <wa-badge variant="neutral" size="small">Optional</wa-badge>
                              </label>
                              <input type="text" class="app-input"
                                     name="debrid[${T}].rclone_mount_path" id="debrid[${T}].rclone_mount_path"
                                     placeholder="/custom/mount/path (leave empty for global mount path)">
                              <div class="label">
                                  <span class="label-text-alt">Custom mount path for this debrid service. If empty, uses global rclone mount path.</span>
                              </div>
                        </div>
                    </div>
                    <div class="grid grid-3">
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].rate_limit">
                                <span class="label-text">Rate Limit</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="debrid[${T}].rate_limit" id="debrid[${T}].rate_limit"
                                   placeholder="1000">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].download_queue">
                                <span class="label-text">Download Queue</span>
                            </label>
                            <input type="number" class="app-input"
                                   name="debrid[${T}].download_queue" id="debrid[${T}].download_queue"
                                   placeholder="0">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].download_timeout">
                                <span class="label-text">Download Timeout</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="debrid[${T}].download_timeout" id="debrid[${T}].download_timeout"
                                   placeholder="30s">
                        </div>
                    </div>
                    <div class="field-group">
                        <label class="label" for="debrid[${T}].folder_naming">
                            <span class="label-text">Folder Naming Strategy</span>
                        </label>
                        <select class="app-select" name="debrid[${T}].folder_naming" id="debrid[${T}].folder_naming">
                            <option value="original">Original</option>
                            <option value="original_no_ext">Original (No Extension)</option>
                            <option value="min">Minimum</option>
                            <option value="title">Title</option>
                            <option value="title_no_ext">Title (No Extension)</option>
                            <option value="arr">Arr Style</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label class="checkbox-row">
                            <input type="checkbox" class="app-checkbox useWebdav" name="debrid[${T}].use_webdav" id="debrid[${T}].use_webdav">
                            <div class="checkbox-row__text">
                                <span class="label-text">Enable WebDAV</span>
                                <span class="label-text-alt">Expose debrid via WebDAV</span>
                            </div>
                        </label>
                    </div>
                    </div>
                </div>

                <div class="webdav-section hidden" id="webdav-section-${T}">
                    <div class="section-divider">
                        <span class="section-divider__text">WebDAV Settings</span>
                    </div>
                    <div class="grid grid-2">
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].webdav_url">
                                <span class="label-text">WebDAV URL</span>
                            </label>
                            <input type="text" class="app-input webdav-field"
                                   name="debrid[${T}].webdav_url" id="debrid[${T}].webdav_url"
                                   placeholder="https://webdav.example.com">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].webdav_username">
                                <span class="label-text">WebDAV Username</span>
                            </label>
                            <input type="text" class="app-input webdav-field"
                                   name="debrid[${T}].webdav_username" id="debrid[${T}].webdav_username">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].webdav_password">
                                <span class="label-text">WebDAV Password</span>
                            </label>
                            <input type="password" class="app-input webdav-field"
                                   name="debrid[${T}].webdav_password" id="debrid[${T}].webdav_password">
                        </div>
                        <div class="field-group">
                            <label class="label" for="debrid[${T}].webdav_path">
                                <span class="label-text">WebDAV Path</span>
                            </label>
                            <input type="text" class="app-input webdav-field"
                                   name="debrid[${T}].webdav_path" id="debrid[${T}].webdav_path">
                        </div>
                    </div>
                </div>

                <div class="section-divider">
                    <span class="section-divider__text">Directories & Filters</span>
                </div>
                <div class="row-between">
                    <h4 class="section-subheading">Directories</h4>
                    <wa-button type="button" appearance="outline" size="small" onclick="window.configManager.addDirectory(${T});">
                        Add Directory
                    </wa-button>
                </div>
                <div id="debrid[${T}].directories"></div>
            </div>
        </wa-card>
    `}function getDirectoryTemplate(T,w){return`
        <wa-card class="panel directory-config" data-index="${w}">
            <div class="panel-body page-stack">
                <div class="row-between-start">
                    <h4 class="section-subheading">Directory #${w+1}</h4>
                    <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.directory-config').remove();">Remove</wa-button>
                </div>

                <div class="grid grid-2">
                    <div class="field-group">
                        <label class="label" for="debrid[${T}].directories[${w}].name">
                            <span class="label-text">Directory Name</span>
                        </label>
                        <input type="text" class="app-input"
                               name="debrid[${T}].directories[${w}].name"
                               id="debrid[${T}].directories[${w}].name" required>
                    </div>
                    <div class="field-group">
                        <label class="label" for="debrid[${T}].directories[${w}].path">
                            <span class="label-text">Directory Path</span>
                        </label>
                        <input type="text" class="app-input"
                               name="debrid[${T}].directories[${w}].path"
                               id="debrid[${T}].directories[${w}].path">
                    </div>
                </div>

                <div class="section-divider">
                    <span class="section-divider__text">Filters</span>
                </div>
                <div class="row-between">
                    <span class="hint">Optional: route only matching torrents.</span>
                    <wa-button type="button" appearance="outline" size="small" onclick="window.configManager.addFilter(${T}, ${w});">Add Filter</wa-button>
                </div>
                <div id="debrid[${T}].directories[${w}].filters"></div>
            </div>
        </wa-card>
    `}function getFilterTemplate(T,w,O){return`
        <wa-card class="panel panel-muted filter-config" data-index="${O}">
            <div class="panel-body">
                <div class="grid grid-3 align-end">
                    <div class="field-group">
                        <label class="label" for="debrid[${T}].directories[${w}].filters[${O}].type">
                            <span class="label-text">Filter Type</span>
                        </label>
                        <select class="app-select"
                                name="debrid[${T}].directories[${w}].filters[${O}].type"
                                id="debrid[${T}].directories[${w}].filters[${O}].type">
                            <option value="">Select filter</option>
                            <option value="label">Label</option>
                            <option value="last_added">Last Added</option>
                            <option value="size_greater_than">Size Greater Than</option>
                            <option value="size_less_than">Size Less Than</option>
                            <option value="name_contains">Name Contains</option>
                            <option value="name_not_contains">Name Does Not Contain</option>
                            <option value="file_contains">File Contains</option>
                            <option value="file_not_contains">File Does Not Contain</option>
                        </select>
                    </div>
                    <div class="field-group">
                        <label class="label" for="debrid[${T}].directories[${w}].filters[${O}].value">
                            <span class="label-text">Filter Value</span>
                        </label>
                        <input type="text" class="app-input"
                               name="debrid[${T}].directories[${w}].filters[${O}].value"
                               id="debrid[${T}].directories[${w}].filters[${O}].value">
                    </div>
                    <div class="field-group">
                        <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.filter-config').remove();">Remove</wa-button>
                    </div>
                </div>
            </div>
        </wa-card>
    `}function getArrTemplate(T,w={}){return`
            <wa-card class="panel arr-config ${w&&w.source==="auto"?"panel-highlight":""}" data-index="${T}">
                <div class="panel-body page-stack">
                    <div class="row-between-start">
                        <h3 class="section-subheading">Arr Service #${T+1}</h3>
                        <wa-button type="button" variant="danger" appearance="outline" size="small" onclick="this.closest('.arr-config').remove();">
                            Remove
                        </wa-button>
                    </div>
                    <div class="grid grid-2 grid-spaced">
                        <div class="field-group">
                            <label class="label" for="arr[${T}].name">
                                <span class="label-text">Service Name</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${T}].name" id="arr[${T}].name" required>
                        </div>

                        <div class="field-group">
                            <label class="label" for="arr[${T}].host">
                                <span class="label-text">Host URL</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${T}].host" id="arr[${T}].host"
                                   placeholder="http://localhost:7878" required>
                        </div>
                    </div>

                    <div class="grid grid-2 grid-spaced">
                        <div class="field-group">
                            <label class="label" for="arr[${T}].api_key">
                                <span class="label-text">API Key</span>
                            </label>
                            <div class="password-toggle-container">
                                <input type="password" class="app-input input-has-toggle"
                                       name="arr[${T}].api_key" id="arr[${T}].api_key" required>
                                <wa-button type="button" appearance="plain" class="password-toggle-btn">
                                    <wa-icon name="eye" id="arr[${T}].api_key_icon"></wa-icon>
                                </wa-button>
                            </div>
                        </div>

                        <div class="field-group">
                            <label class="label" for="arr[${T}].category">
                                <span class="label-text">Category</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${T}].category" id="arr[${T}].category"
                                   placeholder="sonarr or radarr">
                        </div>
                    </div>

                    <div class="grid grid-3">
                        <div class="field-group">
                            <label class="label" for="arr[${T}].fallback_on_pause">
                                <span class="label-text">Fallback On Pause</span>
                            </label>
                            <input type="number" class="app-input"
                                   name="arr[${T}].fallback_on_pause" id="arr[${T}].fallback_on_pause"
                                   placeholder="0">
                        </div>
                        <div class="field-group">
                            <label class="label" for="arr[${T}].max_errors">
                                <span class="label-text">Max Errors</span>
                            </label>
                            <input type="number" class="app-input"
                                   name="arr[${T}].max_errors" id="arr[${T}].max_errors"
                                   placeholder="0">
                        </div>
                        <div class="field-group">
                            <label class="label" for="arr[${T}].quality_profile">
                                <span class="label-text">Quality Profile</span>
                            </label>
                            <input type="text" class="app-input"
                                   name="arr[${T}].quality_profile" id="arr[${T}].quality_profile"
                                   placeholder="HD-1080p">
                        </div>
                    </div>

                    <div class="grid grid-3">
                        <div class="field-group">
                            <label class="checkbox-row">
                                <input type="checkbox" class="app-checkbox" name="arr[${T}].enabled" id="arr[${T}].enabled">
                                <div class="checkbox-row__text">
                                    <span class="label-text">Enabled</span>
                                    <span class="label-text-alt">Enable this Arr integration</span>
                                </div>
                            </label>
                        </div>
                        <div class="field-group">
                            <label class="checkbox-row">
                                <input type="checkbox" class="app-checkbox" name="arr[${T}].add_as_completed" id="arr[${T}].add_as_completed">
                                <div class="checkbox-row__text">
                                    <span class="label-text">Add As Completed</span>
                                    <span class="label-text-alt">Add to Arr when download completes</span>
                                </div>
                            </label>
                        </div>
                        <div class="field-group">
                            <label class="checkbox-row">
                                <input type="checkbox" class="app-checkbox" name="arr[${T}].add_default_to_job" id="arr[${T}].add_default_to_job">
                                <div class="checkbox-row__text">
                                    <span class="label-text">Add Default Jobs</span>
                                    <span class="label-text-alt">Add default Arr items to repair queue</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </wa-card>
    `}function templateDebrid(T){return getDebridTemplate(T)}function templateDirectory(T,w){return getDirectoryTemplate(T,w)}function templateFilter(T,w,O){return getFilterTemplate(T,w,O)}function templateArr(T,w){return getArrTemplate(T,w)}const template=`<div class="page-stack">
    __NEED_SETUP__

    <wa-card class="panel">
        <div class="panel-body">
            <div class="section-title">
                <wa-icon name="wrench"></wa-icon>
                Start New Repair
            </div>

            <form id="repairForm" class="page-stack">
                <div class="grid grid-2">
                    <div class="field-group">
                        <wa-select id="arrSelect" label="Arr Instance" hint="Choose which Arr service to repair">
                            <wa-option value="">Select an Arr instance</wa-option>
                        </wa-select>
                    </div>

                    <div class="field-group">
                        <wa-input
                            id="mediaIds"
                            label="Media IDs"
                            placeholder="123, 456, 789"
                            hint="Optional: comma-separated TVDB IDs (Sonarr) or TMDB IDs (Radarr)."
                        ></wa-input>
                    </div>
                </div>

                <div class="grid grid-2">
                    <div class="field-group">
                        <wa-checkbox id="isAsync" checked>
                            Run in Background
                            <span slot="hint">Process repair job asynchronously.</span>
                        </wa-checkbox>
                    </div>
                    <div class="field-group">
                        <wa-checkbox id="autoProcess">
                            Auto Process
                            <span slot="hint">Automatically delete broken symlinks and re-search media.</span>
                        </wa-checkbox>
                    </div>
                </div>

                <div class="field-group">
                    <wa-button type="submit" variant="brand" id="submitRepair">
                        <wa-icon slot="start" name="wrench"></wa-icon>
                        Start Repair
                    </wa-button>
                </div>
            </form>
        </div>
    </wa-card>

    <wa-card class="panel">
        <div class="panel-header">
            <div class="section-title">
                <wa-icon name="list-check"></wa-icon>
                Repair Jobs
            </div>
            <div class="toolbar-actions">
                <wa-button id="deleteSelectedJobs" variant="danger" appearance="outline" size="small" disabled>
                    <wa-icon slot="start" name="trash"></wa-icon>
                    Delete Selected
                </wa-button>
                <wa-button id="refreshJobs" appearance="outline" size="small">
                    <wa-icon slot="start" name="arrows-rotate"></wa-icon>
                    Refresh
                </wa-button>
            </div>
        </div>

        <div class="panel-body table-wrap">
            <table class="data-table" id="jobsTable">
                <thead>
                <tr>
                    <th class="table-select">
                        <wa-checkbox id="selectAllJobs"></wa-checkbox>
                    </th>
                    <th>Job ID</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Arrs</th>
                    <th>Media IDs</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody id="jobsTableBody"></tbody>
            </table>

            <div id="noJobsMessage" class="empty-state hidden">
                <wa-icon name="clipboard-check" style="font-size: 2.5rem; color: var(--app-text-muted);"></wa-icon>
                <h3>No Repair Jobs</h3>
                <p class="hint">You haven't run any repair jobs yet. Start your first repair above.</p>
            </div>
        </div>

        <div class="panel-footer">
            <div class="pagination" id="jobsPagination"></div>
        </div>
    </wa-card>
</div>

<wa-dialog id="jobDetailsModal" label="Job Details">
    <div class="page-stack">
        <div class="grid grid-2">
            <wa-card class="panel">
                <div class="panel-body">
                    <h4>Job Information</h4>
                    <div class="page-stack">
                        <div class="app-inline">
                            <span class="hint">Job ID</span>
                            <span class="text-mono" id="modalJobId">-</span>
                        </div>
                        <div class="app-inline">
                            <span class="hint">Status</span>
                            <span id="modalJobStatus">-</span>
                        </div>
                        <div class="app-inline">
                            <span class="hint">Started</span>
                            <span id="modalJobStarted">-</span>
                        </div>
                        <div class="app-inline">
                            <span class="hint">Completed</span>
                            <span id="modalJobCompleted">-</span>
                        </div>
                    </div>
                </div>
            </wa-card>

            <wa-card class="panel">
                <div class="panel-body">
                    <h4>Configuration</h4>
                    <div class="page-stack">
                        <div class="app-inline">
                            <span class="hint">Arr Services</span>
                            <span id="modalJobArrs">-</span>
                        </div>
                        <div class="app-inline">
                            <span class="hint">Media IDs</span>
                            <span id="modalJobMediaIds">-</span>
                        </div>
                        <div class="app-inline">
                            <span class="hint">Auto Process</span>
                            <span id="modalJobAutoProcess">-</span>
                        </div>
                    </div>
                </div>
            </wa-card>
        </div>

        <wa-callout id="errorContainer" variant="danger" appearance="accent" class="hidden">
            <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
            <strong>Error</strong>
            <div id="modalJobError">-</div>
        </wa-callout>

        <wa-card class="panel">
            <div class="panel-body">
                <div class="toolbar">
                    <h4>Broken Items</h4>
                    <wa-badge variant="neutral" id="totalItemsCount">0</wa-badge>
                </div>

                <div class="grid grid-3">
                    <wa-input id="itemSearchInput" placeholder="Search by path..." label="Search"></wa-input>
                    <wa-select id="arrFilterSelect" label="Arr Filter">
                        <wa-option value="">All Arrs</wa-option>
                    </wa-select>
                    <wa-select id="pathFilterSelect" label="Path Filter">
                        <wa-option value="">All Paths</wa-option>
                        <wa-option value="movie">Movies</wa-option>
                        <wa-option value="tv">TV Shows</wa-option>
                        <wa-option value="other">Other</wa-option>
                    </wa-select>
                </div>

                <div class="field-group">
                    <wa-button id="clearFiltersBtn" appearance="outline" size="small">
                        <wa-icon slot="start" name="xmark"></wa-icon>
                        Clear Filters
                    </wa-button>
                </div>

                <div class="table-wrap">
                    <table class="data-table data-table--compact">
                        <thead>
                        <tr>
                            <th class="table-select"></th>
                            <th>Arr</th>
                            <th>Path</th>
                            <th>Type</th>
                            <th>Size</th>
                        </tr>
                        </thead>
                        <tbody id="brokenItemsTableBody"></tbody>
                    </table>
                </div>

                <div class="panel-footer">
                    <div class="pagination" id="itemsPagination"></div>
                </div>

                <div id="noBrokenItemsMessage" class="empty-state hidden">
                    <wa-icon name="circle-check" style="font-size: 2rem; color: var(--app-text-muted);"></wa-icon>
                    <p class="hint">No broken items found</p>
                </div>

                <div id="noFilteredItemsMessage" class="empty-state hidden">
                    <wa-icon name="filter-circle-xmark" style="font-size: 2rem; color: var(--app-text-muted);"></wa-icon>
                    <p class="hint">No items match the current filters</p>
                </div>
            </div>
        </wa-card>
    </div>

    <div slot="footer" class="dialog-footer">
        <small class="hint" id="modalFooterStats">-</small>
        <div class="toolbar-actions">
            <wa-button type="button" variant="brand" size="small" id="processJobBtn" class="hidden">
                <wa-icon slot="start" name="play"></wa-icon>
                Process
            </wa-button>
            <wa-button type="button" variant="warning" size="small" id="stopJobBtn" class="hidden">
                <wa-icon slot="start" name="stop"></wa-icon>
                Stop
            </wa-button>
        </div>
    </div>
</wa-dialog>
`;class RepairPage extends i$3{createRenderRoot(){return this}firstUpdated(){this._controller||(this._controller=new RepairManager,window.repairManager=this._controller,window.RepairUtils=RepairUtils)}render(){const w=window.urlBase||"",O=this.needSetup?`
        <wa-callout variant="warning" appearance="accent">
          <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
          <strong>Configuration Required</strong>
          <div>Your configuration is incomplete. Please complete the setup in the <a href="${w}settings">Settings page</a>.</div>
        </wa-callout>
      `:"",F=template.replace("__NEED_SETUP__",O).replace(/__URL_BASE__/g,w);return b`${o(F)}`}}Se(RepairPage,"properties",{needSetup:{type:Boolean,attribute:"need-setup"}});customElements.define("repair-page",RepairPage);class RepairManager{constructor(){this.state={jobs:[],currentJob:null,allBrokenItems:[],filteredItems:[],selectedItems:new Set,currentPage:1,currentItemsPage:1,itemsPerPage:10,itemsPerModalPage:20,searchTerm:"",arrFilter:"",pathFilter:"",sortBy:"created_at",sortDirection:"desc"},this.refs={repairForm:document.getElementById("repairForm"),arrSelect:document.getElementById("arrSelect"),mediaIds:document.getElementById("mediaIds"),isAsync:document.getElementById("isAsync"),autoProcess:document.getElementById("autoProcess"),submitBtn:document.getElementById("submitRepair"),jobsTable:document.getElementById("jobsTable"),jobsTableBody:document.getElementById("jobsTableBody"),jobsPagination:document.getElementById("jobsPagination"),noJobsMessage:document.getElementById("noJobsMessage"),refreshJobs:document.getElementById("refreshJobs"),deleteSelectedJobs:document.getElementById("deleteSelectedJobs"),selectAllJobs:document.getElementById("selectAllJobs"),jobDetailsModal:document.getElementById("jobDetailsModal"),modalJobId:document.getElementById("modalJobId"),modalJobStatus:document.getElementById("modalJobStatus"),modalJobStarted:document.getElementById("modalJobStarted"),modalJobCompleted:document.getElementById("modalJobCompleted"),modalJobArrs:document.getElementById("modalJobArrs"),modalJobMediaIds:document.getElementById("modalJobMediaIds"),modalJobAutoProcess:document.getElementById("modalJobAutoProcess"),modalJobError:document.getElementById("modalJobError"),errorContainer:document.getElementById("errorContainer"),brokenItemsTableBody:document.getElementById("brokenItemsTableBody"),itemsPagination:document.getElementById("itemsPagination"),noBrokenItemsMessage:document.getElementById("noBrokenItemsMessage"),noFilteredItemsMessage:document.getElementById("noFilteredItemsMessage"),totalItemsCount:document.getElementById("totalItemsCount"),modalFooterStats:document.getElementById("modalFooterStats"),itemSearchInput:document.getElementById("itemSearchInput"),arrFilterSelect:document.getElementById("arrFilterSelect"),pathFilterSelect:document.getElementById("pathFilterSelect"),clearFiltersBtn:document.getElementById("clearFiltersBtn"),processJobBtn:document.getElementById("processJobBtn"),stopJobBtn:document.getElementById("stopJobBtn")},this.init()}init(){this.bindEvents(),this.loadArrInstances(),this.loadJobs(),this.startAutoRefresh()}bindEvents(){this.refs.repairForm.addEventListener("submit",w=>this.handleFormSubmit(w)),this.refs.refreshJobs.addEventListener("click",()=>this.loadJobs()),this.refs.deleteSelectedJobs.addEventListener("click",()=>this.deleteSelectedJobs()),this.refs.selectAllJobs.addEventListener("change",w=>this.toggleSelectAllJobs(w.target.checked)),this.refs.processJobBtn.addEventListener("click",()=>this.processCurrentJob()),this.refs.stopJobBtn.addEventListener("click",()=>this.stopCurrentJob()),this.refs.jobDetailsModal.addEventListener("wa-hide",()=>this.hideJobDetailsModal()),this.refs.itemSearchInput.addEventListener("input",window.decypharrUtils.debounce(()=>this.applyFilters(),300)),this.refs.arrFilterSelect.addEventListener("change",()=>this.applyFilters()),this.refs.pathFilterSelect.addEventListener("change",()=>this.applyFilters()),this.refs.clearFiltersBtn.addEventListener("click",()=>this.clearFilters()),this.refs.jobsTableBody.addEventListener("click",w=>this.handleJobTableClick(w)),this.refs.brokenItemsTableBody.addEventListener("click",w=>this.handleItemTableClick(w))}async loadArrInstances(){try{const w=await window.decypharrUtils.fetcher("/api/arrs");if(!w.ok)throw new Error("Failed to load Arr instances");const O=await w.json();this.refs.arrSelect.innerHTML='<wa-option value="">Select an Arr instance</wa-option>',O.forEach(F=>{const W=document.createElement("wa-option");W.value=F.name,W.textContent=`${F.name} (${F.host})`,this.refs.arrSelect.appendChild(W)})}catch(w){console.error("Error loading Arr instances:",w),window.decypharrUtils.createToast("Failed to load Arr instances","error")}}async handleFormSubmit(w){var U;w.preventDefault();const O=this.refs.arrSelect.value,F=this.refs.mediaIds.value.trim(),W=F?F.split(",").map(q=>q.trim()).filter(Boolean):[];try{window.decypharrUtils.setButtonLoading(this.refs.submitBtn,!0);const q=await window.decypharrUtils.fetcher("/api/repair",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({arr:O,mediaIds:W.length>0?W:null,async:this.refs.isAsync.checked,autoProcess:this.refs.autoProcess.checked})});if(!q.ok){const J=await q.text();throw new Error(J||"Failed to start repair")}const j=await q.json();window.decypharrUtils.createToast(`Repair job started successfully! Job ID: ${((U=j.job_id)==null?void 0:U.substring(0,8))||"Unknown"}`,"success"),this.refs.mediaIds.value="",await this.loadJobs()}catch(q){console.error("Error starting repair:",q),window.decypharrUtils.createToast(`Error starting repair: ${q.message}`,"error")}finally{window.decypharrUtils.setButtonLoading(this.refs.submitBtn,!1)}}async loadJobs(){try{const w=await window.decypharrUtils.fetcher("/api/repair/jobs");if(!w.ok)throw new Error("Failed to fetch jobs");this.state.jobs=await w.json(),this.renderJobsTable()}catch(w){console.error("Error loading jobs:",w),window.decypharrUtils.createToast("Error loading repair jobs","error")}}renderJobsTable(){const w=this.getSortedJobs(),O=Math.ceil(w.length/this.state.itemsPerPage),F=(this.state.currentPage-1)*this.state.itemsPerPage,W=Math.min(F+this.state.itemsPerPage,w.length),U=w.slice(F,W);if(this.refs.jobsTableBody.innerHTML="",this.refs.jobsPagination.innerHTML="",w.length===0){this.refs.noJobsMessage.classList.remove("hidden"),this.refs.jobsTable.classList.add("hidden");return}this.refs.noJobsMessage.classList.add("hidden"),this.refs.jobsTable.classList.remove("hidden"),U.forEach(q=>{const j=document.createElement("tr");j.dataset.jobId=q.id;const J=RepairUtils.formatRepairStatus(q.status,q.error);j.innerHTML=`
                <td>
                    <wa-checkbox class="job-checkbox" data-job-id="${q.id}"
                        ${this.state.selectedItems.has(q.id)?"checked":""}></wa-checkbox>
                </td>
                <td class="text-mono text-tiny">${q.id.substring(0,8)}</td>
                <td>
                    <wa-badge variant="${J.variant}" size="small">
                        <wa-icon name="${J.icon}"></wa-icon>
                        ${J.message}
                    </wa-badge>
                </td>
                <td>${this.formatDate(q.created_at)}</td>
                <td>${q.arrs?q.arrs.join(", "):"All"}</td>
                <td>${q.media_ids?q.media_ids.join(", "):"All"}</td>
                <td>
                    <div class="table-actions">
                        <wa-button class="view-job" appearance="plain" size="small" data-job-id="${q.id}" title="View">
                            <wa-icon name="eye"></wa-icon>
                        </wa-button>
                        <wa-button class="export-job" appearance="plain" size="small" data-job-id="${q.id}" title="Export">
                            <wa-icon name="download"></wa-icon>
                        </wa-button>
                        <wa-button class="delete-job" appearance="plain" size="small" variant="danger" data-job-id="${q.id}" title="Delete">
                            <wa-icon name="trash"></wa-icon>
                        </wa-button>
                    </div>
                </td>
            `,this.refs.jobsTableBody.appendChild(j)}),this.renderPagination(this.refs.jobsPagination,O,this.state.currentPage,q=>{this.state.currentPage=q,this.renderJobsTable()}),this.updateDeleteSelectedButton()}getSortedJobs(){return[...this.state.jobs].sort((w,O)=>this.state.sortDirection==="asc"?w[this.state.sortBy]>O[this.state.sortBy]?1:-1:w[this.state.sortBy]<O[this.state.sortBy]?1:-1)}handleJobTableClick(w){var W;const O=(W=w.target.closest("[data-job-id]"))==null?void 0:W.dataset.jobId;if(!O)return;const F=w.target.closest(".job-checkbox");F?this.toggleJobSelection(O,F.checked):w.target.closest(".view-job")?this.viewJobDetails(O):w.target.closest(".export-job")?this.exportJobData(O):w.target.closest(".delete-job")&&this.deleteJob(O)}toggleJobSelection(w,O){O?this.state.selectedItems.add(w):this.state.selectedItems.delete(w),this.updateDeleteSelectedButton()}toggleSelectAllJobs(w){w?this.state.jobs.forEach(O=>this.state.selectedItems.add(O.id)):this.state.selectedItems.clear(),this.renderJobsTable()}updateDeleteSelectedButton(){this.refs.deleteSelectedJobs.disabled=this.state.selectedItems.size===0}async viewJobDetails(w){try{const O=await window.decypharrUtils.fetcher(`/api/repair/jobs/${w}`);if(!O.ok)throw new Error("Failed to fetch job details");const F=await O.json();this.state.currentJob=F,this.renderJobDetails(F),this.showJobDetailsModal()}catch(O){console.error("Error loading job details:",O),window.decypharrUtils.createToast("Error loading job details","error")}}renderJobDetails(w){const O=RepairUtils.formatRepairStatus(w.status,w.error);this.refs.modalJobId.textContent=w.id,this.refs.modalJobStatus.innerHTML=`
            <wa-badge variant="${O.variant}" size="small">
                <wa-icon name="${O.icon}"></wa-icon>
                ${O.message}
            </wa-badge>
        `,this.refs.modalJobStarted.textContent=this.formatDate(w.created_at),this.refs.modalJobCompleted.textContent=w.completed_at?this.formatDate(w.completed_at):"Not completed",this.refs.modalJobArrs.textContent=w.arrs?w.arrs.join(", "):"All",this.refs.modalJobMediaIds.textContent=w.media_ids?w.media_ids.join(", "):"All",this.refs.modalJobAutoProcess.textContent=w.auto_process?"Yes":"No",w.error?(this.refs.modalJobError.textContent=w.error,this.refs.errorContainer.classList.remove("hidden")):this.refs.errorContainer.classList.add("hidden"),w.broken_items&&Object.keys(w.broken_items).length>0?(this.state.allBrokenItems=this.flattenBrokenItems(w.broken_items),this.applyFilters()):(this.state.allBrokenItems=[],this.state.filteredItems=[],this.renderBrokenItemsTable()),this.updateActionButtons(w.status)}updateActionButtons(w){w==="pending"||w==="failed"||w==="completed"||w==="cancelled"?(this.refs.processJobBtn.classList.remove("hidden"),this.refs.stopJobBtn.classList.add("hidden")):w==="started"||w==="processing"?(this.refs.processJobBtn.classList.add("hidden"),this.refs.stopJobBtn.classList.remove("hidden")):(this.refs.processJobBtn.classList.add("hidden"),this.refs.stopJobBtn.classList.add("hidden"))}flattenBrokenItems(w){const O=[];return Object.entries(w).forEach(([F,W])=>{Array.isArray(W)&&W.forEach(U=>{O.push({...U,arr:F})})}),O}applyFilters(){const w=this.refs.itemSearchInput.value.toLowerCase(),O=this.refs.arrFilterSelect.value,F=this.refs.pathFilterSelect.value;this.state.searchTerm=w,this.state.arrFilter=O,this.state.pathFilter=F,this.state.filteredItems=this.state.allBrokenItems.filter(W=>{const U=!w||W.path.toLowerCase().includes(w)||W.arr.toLowerCase().includes(w),q=!O||W.arr===O,j=!F||W.path.includes(F);return U&&q&&j}),this.state.currentItemsPage=1,this.renderBrokenItemsTable(),this.updateFilterOptions()}updateFilterOptions(){const w=new Set(this.state.allBrokenItems.map(F=>F.arr)),O=new Set(this.state.allBrokenItems.map(F=>{const W=F.path.split("/");return W.length>1?W[0]:F.path}));this.refs.arrFilterSelect.innerHTML='<wa-option value="">All Arrs</wa-option>',w.forEach(F=>{const W=document.createElement("wa-option");W.value=F,W.textContent=F,F===this.state.arrFilter&&(W.selected=!0),this.refs.arrFilterSelect.appendChild(W)}),this.refs.pathFilterSelect.innerHTML='<wa-option value="">All Paths</wa-option>',O.forEach(F=>{const W=document.createElement("wa-option");W.value=F,W.textContent=F,F===this.state.pathFilter&&(W.selected=!0),this.refs.pathFilterSelect.appendChild(W)})}clearFilters(){this.refs.itemSearchInput.value="",this.refs.arrFilterSelect.value="",this.refs.pathFilterSelect.value="",this.state.searchTerm="",this.state.arrFilter="",this.state.pathFilter="",this.state.filteredItems=[...this.state.allBrokenItems],this.state.currentItemsPage=1,this.renderBrokenItemsTable()}renderBrokenItemsTable(){const w=this.state.filteredItems,O=Math.ceil(w.length/this.state.itemsPerModalPage),F=(this.state.currentItemsPage-1)*this.state.itemsPerModalPage,W=Math.min(F+this.state.itemsPerModalPage,w.length),U=w.slice(F,W);if(this.refs.brokenItemsTableBody.innerHTML="",this.refs.itemsPagination.innerHTML="",w.length===0){this.refs.noBrokenItemsMessage.classList.toggle("hidden",this.state.allBrokenItems.length>0),this.refs.noFilteredItemsMessage.classList.toggle("hidden",this.state.allBrokenItems.length===0),this.refs.modalFooterStats.textContent="",this.refs.totalItemsCount.textContent="0";return}this.refs.noBrokenItemsMessage.classList.add("hidden"),this.refs.noFilteredItemsMessage.classList.add("hidden"),U.forEach(q=>{const j=document.createElement("tr");j.className="hover",j.dataset.itemId=q.id,j.innerHTML=`
                <td class="w-12">
                    <wa-checkbox class="item-checkbox" data-item-id="${q.id}"
                        ${this.state.selectedItems.has(q.id)?"checked":""}></wa-checkbox>
                </td>
                <td>
                    <wa-badge variant="brand" size="small">${window.decypharrUtils.escapeHtml(q.arr)}</wa-badge>
                </td>
                <td>
                    <div class="text-small max-w-sm text-truncate" title="${window.decypharrUtils.escapeHtml(q.path)}">
                        ${window.decypharrUtils.escapeHtml(q.path)}
                    </div>
                </td>
                <td>
                    <span class="text-small text-mono">${window.decypharrUtils.formatBytes(q.size)}</span>
                </td>
            `,this.refs.brokenItemsTableBody.appendChild(j)}),this.renderPagination(this.refs.itemsPagination,O,this.state.currentItemsPage,q=>{this.state.currentItemsPage=q,this.renderBrokenItemsTable()}),this.refs.modalFooterStats.textContent=`${w.length} items`,this.refs.totalItemsCount.textContent=w.length.toString()}handleItemTableClick(w){const O=w.target.closest(".item-checkbox");if(O){const F=O.dataset.itemId;this.toggleItemSelection(F,O.checked)}}toggleItemSelection(w,O){O?this.state.selectedItems.add(w):this.state.selectedItems.delete(w)}async processCurrentJob(){if(!this.state.currentJob)return;const w=this.state.currentJob.id;try{if(!(await window.decypharrUtils.fetcher(`/api/repair/jobs/${w}/process`,{method:"POST"})).ok)throw new Error("Failed to process job");window.decypharrUtils.createToast("Job processing started","success"),this.loadJobs()}catch(O){console.error("Error processing job:",O),window.decypharrUtils.createToast(`Error processing job: ${O.message}`,"error")}}async stopCurrentJob(){if(!this.state.currentJob)return;const w=this.state.currentJob.id;try{if(!(await window.decypharrUtils.fetcher(`/api/repair/jobs/${w}/stop`,{method:"POST"})).ok)throw new Error("Failed to stop job");window.decypharrUtils.createToast("Job stop requested","success"),this.loadJobs()}catch(O){console.error("Error stopping job:",O),window.decypharrUtils.createToast(`Error stopping job: ${O.message}`,"error")}}async deleteJob(w){if(confirm("Are you sure you want to delete this job?"))try{if(!(await window.decypharrUtils.fetcher("/api/repair/jobs",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify([w])})).ok)throw new Error("Failed to delete job");window.decypharrUtils.createToast("Job deleted successfully","success"),this.state.selectedItems.delete(w),this.loadJobs()}catch(O){console.error("Error deleting job:",O),window.decypharrUtils.createToast(`Error deleting job: ${O.message}`,"error")}}async deleteSelectedJobs(){const w=Array.from(this.state.selectedItems);if(w.length!==0&&confirm(`Are you sure you want to delete ${w.length} job(s)?`))try{if(!(await window.decypharrUtils.fetcher("/api/repair/jobs",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(w)})).ok)throw new Error("Failed to delete jobs");window.decypharrUtils.createToast(`${w.length} job(s) deleted successfully`,"success"),this.state.selectedItems.clear(),this.loadJobs()}catch(O){console.error("Error deleting jobs:",O),window.decypharrUtils.createToast(`Error deleting jobs: ${O.message}`,"error")}}showJobDetailsModal(){this.refs.jobDetailsModal.show?this.refs.jobDetailsModal.show():this.refs.jobDetailsModal.open=!0}hideJobDetailsModal(){this.refs.jobDetailsModal.hide?this.refs.jobDetailsModal.hide():this.refs.jobDetailsModal.open=!1,this.state.currentJob=null,this.state.allBrokenItems=[],this.state.filteredItems=[],this.state.selectedItems.clear()}renderPagination(w,O,F,W){if(!(O<=1))for(let U=1;U<=O;U++){const q=document.createElement("wa-button");q.size="small",q.variant=U===F?"brand":"neutral",q.appearance=U===F?"solid":"outline",q.textContent=U,q.addEventListener("click",()=>W(U)),w.appendChild(q)}}formatDate(w){return w?new Date(w).toLocaleString():"N/A"}async exportJobData(w){try{const O=await window.decypharrUtils.fetcher(`/api/repair/jobs/${w}`);if(!O.ok)throw new Error("Failed to fetch job data");const F=await O.json(),W=JSON.stringify(F,null,2),U="data:application/json;charset=utf-8,"+encodeURIComponent(W),q=`repair_job_${w.substring(0,8)}.json`,j=document.createElement("a");j.setAttribute("href",U),j.setAttribute("download",q),j.click(),window.decypharrUtils.createToast("Job data exported successfully","success")}catch(O){console.error("Error exporting job data:",O),window.decypharrUtils.createToast("Failed to export job data","error")}}startAutoRefresh(){this.refreshInterval=setInterval(()=>{this.loadJobs()},3e4)}destroy(){this.refreshInterval&&clearInterval(this.refreshInterval),Object.values(this.refs).forEach(w=>{w&&w.removeEventListener})}}const RepairUtils={formatRepairStatus(T,w=null){return{pending:{icon:"clock",variant:"warning",message:"Waiting to start"},started:{icon:"play",variant:"brand",message:"Repair in progress"},processing:{icon:"gear",variant:"brand",message:"Processing results"},completed:{icon:"circle-check",variant:"success",message:"Repair completed successfully"},failed:{icon:"circle-xmark",variant:"danger",message:w||"Repair failed"},cancelled:{icon:"stop",variant:"warning",message:"Repair was cancelled"}}[T]||{icon:"circle-question",variant:"neutral",message:`Unknown status: ${T}`}},validateMediaIds(T){if(!T||!T.trim())return{valid:!0,ids:[]};const w=T.split(",").map(F=>F.trim()).filter(Boolean),O=w.filter(F=>!/^\d+$/.test(F));return O.length>0?{valid:!1,error:`Invalid media IDs: ${O.join(", ")}. Only numeric IDs are allowed.`,ids:[]}:{valid:!0,ids:w}},generateRepairSummary(T){if(!T.broken_items)return"No broken items found";const w=Object.entries(T.broken_items).map(([F,W])=>`${F}: ${W.length} items`);return`Found ${Object.values(T.broken_items).reduce((F,W)=>F+W.length,0)} broken items across ${Object.keys(T.broken_items).length} Arr instance(s): ${w.join(", ")}`},calculateProgress(T){switch(T.status){case"pending":return 0;case"started":return 25;case"processing":return 75;case"completed":return 100;case"failed":case"cancelled":return 0;default:return 0}}};setBasePath("https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3.3.1/dist-cdn/");window.urlBase!==void 0&&setUrlBase(window.urlBase);window.decypharrUtils={fetcher,createToast,formatBytes,formatDuration,formatSpeed,joinURL,escapeHtml,debounce,copyToClipboard,setButtonLoading,isValidUrl,getCurrentTheme};window.fetcher=fetcher;window.createToast=createToast;async function loadVersion(){try{const T=await fetcher("/version");if(!T.ok)throw new Error("Failed");const w=await T.json(),O=document.getElementById("version-badge");if(O){O.innerHTML=`<a href="https://github.com/sirrobot01/decypharr/releases/tag/v${w.version}" target="_blank">${w.channel}-${w.version}</a>`;const F={beta:"warning",nightly:"danger"};F[w.channel]&&(O.variant=F[w.channel])}}catch{const T=document.getElementById("version-badge");T&&(T.textContent="Unknown")}}document.addEventListener("DOMContentLoaded",loadVersion);
