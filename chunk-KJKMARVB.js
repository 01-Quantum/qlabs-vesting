import{a as u,b as f,c as W,d as Ho,e as ae,f as R,g as me,h as vt,i as Ko,j as to,k as Go,l as oo,m as $t,n as Jn,o as Yn,p as Xn,r as Zn,s as Qo,t as es,u as ts,v as ro,w as Jo,x as ze,y as os}from"./chunk-5CFFJGPY.js";import{b as Uo,f as jo,g as zo,h as ot,i as qo,j as Ce,k as Gn}from"./chunk-RFOXOZ2C.js";import{W as H,Z as Ct,ba as c,ca as ve,fa as eo,ga as Fo,ha as Vo,ia as m,ja as _,la as v,ma as X,qa as N,ra as K,sa as Z,ta as ne,ua as Qn,va as h,wa as Y,xa as O}from"./chunk-C7WJRSMW.js";import{A as U,C as xe,H as yt,K as Zt,M as J,O as B,Q as $,S as w,U as tt,W as F,a as je,ca as C,e as gt,j as wt,qa as fe,r as bt,sa as xt,t as Mo,v as y}from"./chunk-ADXS2CDP.js";import"./chunk-4LGCJMV5.js";import"./chunk-Q2QAD6QF.js";import"./chunk-E7P2HYXN.js";import"./chunk-7ECBQATZ.js";import{e as d,f as T,i as Kn}from"./chunk-SVM3HCG7.js";var qe,Ae,Yo=d(()=>{"use strict";_();W();me();wt();H();O();Zn();qe=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Ae=class extends m{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=F.state.connectors,this.count=$.state.count,this.filteredCount=$.state.filteredWallets.length,this.isFetchingRecommendedWallets=$.state.isFetchingRecommendedWallets,this.unsubscribe.push(F.subscribeKey("connectors",e=>this.connectors=e),$.subscribeKey("count",e=>this.count=e),$.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),$.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.find(p=>p.id==="walletConnect"),{allWallets:o}=U.state;if(!e||o==="HIDE"||o==="ONLY_MOBILE"&&!y.isMobile())return null;let r=$.state.featured.length,n=this.count+r,i=n<10?n:Math.floor(n/10)*10,s=this.filteredCount>0?this.filteredCount:i,l=`${s}`;this.filteredCount>0?l=`${this.filteredCount}`:s<n&&(l=`${s}+`);let a=C.hasAnyConnection(je.CONNECTOR_ID.WALLET_CONNECT);return c`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${l}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${R(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${a}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){B.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),w.push("AllWallets",{redirectView:w.state.data?.redirectView})}};qe([u()],Ae.prototype,"tabIdx",void 0);qe([f()],Ae.prototype,"connectors",void 0);qe([f()],Ae.prototype,"count",void 0);qe([f()],Ae.prototype,"filteredCount",void 0);qe([f()],Ae.prototype,"isFetchingRecommendedWallets",void 0);Ae=qe([h("w3m-all-wallets-widget")],Ae)});var Xo,Zo=d(()=>{"use strict";O();Xo=v`
  :host {
    margin-top: ${({spacing:t})=>t[1]};
  }
  wui-separator {
    margin: ${({spacing:t})=>t[3]} calc(${({spacing:t})=>t[3]} * -1)
      ${({spacing:t})=>t[2]} calc(${({spacing:t})=>t[3]} * -1);
    width: calc(100% + ${({spacing:t})=>t[3]} * 2);
  }
`});var ge,se,er=d(()=>{"use strict";_();W();me();wt();H();O();ae();zo();Gn();Zo();ge=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},se=class extends m{constructor(){super(),this.unsubscribe=[],this.connectors=F.state.connectors,this.recommended=$.state.recommended,this.featured=$.state.featured,this.explorerWallets=$.state.explorerWallets,this.connections=C.state.connections,this.connectorImages=Zt.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(F.subscribeKey("connectors",e=>this.connectors=e),C.subscribeKey("connections",e=>this.connections=e),Zt.subscribeKey("connectorImages",e=>this.connectorImages=e),$.subscribeKey("recommended",e=>this.recommended=e),$.subscribeKey("featured",e=>this.featured=e),$.subscribeKey("explorerFilteredWallets",e=>{this.explorerWallets=e?.length?e:$.state.explorerWallets}),$.subscribeKey("explorerWallets",e=>{this.explorerWallets?.length||(this.explorerWallets=e)})),y.isTelegram()&&y.isIos()&&(this.loadingTelegram=!C.state.wcUri,this.unsubscribe.push(C.subscribeKey("wcUri",e=>this.loadingTelegram=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}mapConnectorsToExplorerWallets(e,o){return e.map(r=>{if(r.type==="MULTI_CHAIN"&&r.connectors){let i=r.connectors.map(p=>p.id),s=r.connectors.map(p=>p.name),l=r.connectors.map(p=>p.info?.rdns),a=o?.find(p=>i.includes(p.id)||s.includes(p.name)||p.rdns&&(l.includes(p.rdns)||i.includes(p.rdns)));return r.explorerWallet=a??r.explorerWallet,r}let n=o?.find(i=>i.id===r.id||i.rdns===r.info?.rdns||i.name===r.name);return r.explorerWallet=n??r.explorerWallet,r})}processConnectorsByType(e,o=!0){let r=Ce.sortConnectorsByExplorerWallet([...e]);return o?r.filter(Ce.showConnector):r}connectorListTemplate(){let e=this.mapConnectorsToExplorerWallets(this.connectors,this.explorerWallets??[]),o=Ce.getConnectorsByType(e,this.recommended,this.featured),r=this.processConnectorsByType(o.announced.filter(x=>x.id!=="walletConnect")),n=this.processConnectorsByType(o.injected),i=this.processConnectorsByType(o.multiChain.filter(x=>x.name!=="WalletConnect"),!1),s=o.custom,l=o.recent,a=this.processConnectorsByType(o.external.filter(x=>x.id!==je.CONNECTOR_ID.COINBASE_SDK)),p=o.recommended,g=o.featured,k=Ce.getConnectorTypeOrder({custom:s,recent:l,announced:r,injected:n,multiChain:i,recommended:p,featured:g,external:a}),E=this.connectors.find(x=>x.id==="walletConnect"),V=y.isMobile(),I=[];for(let x of k)switch(x){case"walletConnect":{!V&&E&&I.push({kind:"connector",subtype:"walletConnect",connector:E});break}case"recent":{Ce.getFilteredRecentWallets().forEach(P=>I.push({kind:"wallet",subtype:"recent",wallet:P}));break}case"injected":{i.forEach(b=>I.push({kind:"connector",subtype:"multiChain",connector:b})),r.forEach(b=>I.push({kind:"connector",subtype:"announced",connector:b})),n.forEach(b=>I.push({kind:"connector",subtype:"injected",connector:b}));break}case"featured":{g.forEach(b=>I.push({kind:"wallet",subtype:"featured",wallet:b}));break}case"custom":{Ce.getFilteredCustomWallets(s??[]).forEach(P=>I.push({kind:"wallet",subtype:"custom",wallet:P}));break}case"external":{a.forEach(b=>I.push({kind:"connector",subtype:"external",connector:b}));break}case"recommended":{Ce.getCappedRecommendedWallets(p).forEach(P=>I.push({kind:"wallet",subtype:"recommended",wallet:P}));break}default:console.warn(`Unknown connector type: ${x}`)}return I.map((x,b)=>x.kind==="connector"?this.renderConnector(x,b):this.renderWallet(x,b))}renderConnector(e,o){let r=e.connector,n=J.getConnectorImage(r)||this.connectorImages[r?.imageId??""],s=(this.connections.get(r.chain)??[]).some(k=>Uo.isLowerCaseMatch(k.connectorId,r.id)),l,a;e.subtype==="multiChain"?(l="multichain",a="info"):e.subtype==="walletConnect"?(l="qr code",a="accent"):e.subtype==="injected"||e.subtype==="announced"?(l=s?"connected":"installed",a=s?"info":"success"):(l=void 0,a=void 0);let p=C.hasAnyConnection(je.CONNECTOR_ID.WALLET_CONNECT),g=e.subtype==="walletConnect"||e.subtype==="external"?p:!1;return c`
      <w3m-list-wallet
        displayIndex=${o}
        imageSrc=${R(n)}
        .installed=${!0}
        name=${r.name??"Unknown"}
        .tagVariant=${a}
        tagLabel=${R(l)}
        data-testid=${`wallet-selector-${r.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(e)}
        tabIdx=${R(this.tabIdx)}
        ?disabled=${g}
        rdnsId=${R(r.explorerWallet?.rdns||void 0)}
        walletRank=${R(r.explorerWallet?.order)}
      >
      </w3m-list-wallet>
    `}onClickConnector(e){let o=w.state.data?.redirectView;if(e.subtype==="walletConnect"){F.setActiveConnector(e.connector),y.isMobile()?w.push("AllWallets"):w.push("ConnectingWalletConnect",{redirectView:o});return}if(e.subtype==="multiChain"){F.setActiveConnector(e.connector),w.push("ConnectingMultiChain",{redirectView:o});return}if(e.subtype==="injected"){F.setActiveConnector(e.connector),w.push("ConnectingExternal",{connector:e.connector,redirectView:o,wallet:e.connector.explorerWallet});return}if(e.subtype==="announced"){if(e.connector.id==="walletConnect"){y.isMobile()?w.push("AllWallets"):w.push("ConnectingWalletConnect",{redirectView:o});return}w.push("ConnectingExternal",{connector:e.connector,redirectView:o,wallet:e.connector.explorerWallet});return}w.push("ConnectingExternal",{connector:e.connector,redirectView:o})}renderWallet(e,o){let r=e.wallet,n=J.getWalletImage(r),s=C.hasAnyConnection(je.CONNECTOR_ID.WALLET_CONNECT),l=this.loadingTelegram,a=e.subtype==="recent"?"recent":void 0,p=e.subtype==="recent"?"info":void 0;return c`
      <w3m-list-wallet
        displayIndex=${o}
        imageSrc=${R(n)}
        name=${r.name??"Unknown"}
        @click=${()=>this.onClickWallet(e)}
        size="sm"
        data-testid=${`wallet-selector-${r.id}`}
        tabIdx=${R(this.tabIdx)}
        ?loading=${l}
        ?disabled=${s}
        rdnsId=${R(r.rdns||void 0)}
        walletRank=${R(r.order)}
        tagLabel=${R(a)}
        .tagVariant=${p}
      >
      </w3m-list-wallet>
    `}onClickWallet(e){let o=w.state.data?.redirectView;if(e.subtype==="featured"){F.selectWalletConnector(e.wallet);return}if(e.subtype==="recent"){if(this.loadingTelegram)return;F.selectWalletConnector(e.wallet);return}if(e.subtype==="custom"){if(this.loadingTelegram)return;w.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:o});return}if(this.loadingTelegram)return;let r=F.getConnector({id:e.wallet.id,rdns:e.wallet.rdns});r?w.push("ConnectingExternal",{connector:r,redirectView:o}):w.push("ConnectingWalletConnect",{wallet:e.wallet,redirectView:o})}};se.styles=Xo;ge([u({type:Number})],se.prototype,"tabIdx",void 0);ge([f()],se.prototype,"connectors",void 0);ge([f()],se.prototype,"recommended",void 0);ge([f()],se.prototype,"featured",void 0);ge([f()],se.prototype,"explorerWallets",void 0);ge([f()],se.prototype,"connections",void 0);ge([f()],se.prototype,"connectorImages",void 0);ge([f()],se.prototype,"loadingTelegram",void 0);se=ge([h("w3m-connector-list")],se)});var tr,or=d(()=>{"use strict";X();tr=v`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:t})=>t[1]} ${({spacing:t})=>t[2]};
    column-gap: ${({spacing:t})=>t[1]};
    color: ${({tokens:t})=>t.theme.textSecondary};
    border-radius: ${({borderRadius:t})=>t[20]};
    background-color: transparent;
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:t})=>t.theme.textPrimary};
    background-color: ${({tokens:t})=>t.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:t})=>t.theme.textPrimary};
    }
  }
`});var rt,rs,is,Ie,rr=d(()=>{"use strict";_();W();vt();$t();Z();Y();or();rt=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},rs={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},is={lg:"md",md:"sm",sm:"sm"},Ie=class extends m{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return c`
      <button data-active=${this.active}>
        ${this.icon?c`<wui-icon size=${is[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${rs[this.size]}> ${this.label} </wui-text>
      </button>
    `}};Ie.styles=[N,K,tr];rt([u()],Ie.prototype,"icon",void 0);rt([u()],Ie.prototype,"size",void 0);rt([u()],Ie.prototype,"label",void 0);rt([u({type:Boolean})],Ie.prototype,"active",void 0);Ie=rt([h("wui-tab-item")],Ie)});var ir,nr=d(()=>{"use strict";X();ir=v`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    border-radius: ${({borderRadius:t})=>t[32]};
    padding: ${({spacing:t})=>t["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`});var it,We,sr=d(()=>{"use strict";_();W();Z();Y();rr();nr();it=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},We=class extends m{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((e,o)=>{let r=o===this.activeTab;return c`
        <wui-tab-item
          @click=${()=>this.onTabClick(o)}
          icon=${e.icon}
          size=${this.size}
          label=${e.label}
          ?active=${r}
          data-active=${r}
          data-testid="tab-${e.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(e){this.activeTab=e,this.onTabChange(e)}};We.styles=[N,K,ir];it([u({type:Array})],We.prototype,"tabs",void 0);it([u()],We.prototype,"onTabChange",void 0);it([u()],We.prototype,"size",void 0);it([f()],We.prototype,"activeTab",void 0);We=it([h("wui-tabs")],We)});var lr=d(()=>{"use strict";sr()});var io,Et,ar=d(()=>{"use strict";_();W();O();ae();lr();io=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Et=class extends m{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.generateTabs();return c`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let e=this.platforms.map(o=>o==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:o==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:o==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:o==="web"?{label:"Webapp",icon:"browser",platform:"web"}:o==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:o})=>o),e}onTabChange(e){let o=this.platformTabs[e];o&&this.onSelectPlatfrom?.(o)}};io([u({type:Array})],Et.prototype,"platforms",void 0);io([u()],Et.prototype,"onSelectPlatfrom",void 0);Et=io([h("w3m-connecting-header")],Et)});var Rt=d(()=>{"use strict";Jn()});var cr,ur=d(()=>{"use strict";X();cr=v`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${t=>t.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`});var dr,_t,pr=d(()=>{"use strict";_();W();Z();Y();ur();dr=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},_t=class extends m{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,r=36-e,n=116+r,i=245+r,s=360+r*1.75;return c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${n} ${i}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};_t.styles=[N,cr];dr([u({type:Number})],_t.prototype,"radius",void 0);_t=dr([h("wui-loading-thumbnail")],_t)});var hr=d(()=>{"use strict";pr()});var St=d(()=>{"use strict";Xn()});var fr,mr=d(()=>{"use strict";X();fr=v`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[5]};
    padding-left: ${({spacing:t})=>t[3]};
    padding-right: ${({spacing:t})=>t[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:t})=>t[6]};
  }

  wui-text {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`});var Tt,Fe,gr=d(()=>{"use strict";_();W();vt();$t();Ho();Z();Y();es();mr();Tt=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Fe=class extends m{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return c`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};Fe.styles=[N,K,fr];Tt([u({type:Boolean})],Fe.prototype,"disabled",void 0);Tt([u()],Fe.prototype,"label",void 0);Tt([u()],Fe.prototype,"buttonLabel",void 0);Fe=Tt([h("wui-cta-button")],Fe)});var wr=d(()=>{"use strict";gr()});var br,yr=d(()=>{"use strict";O();br=v`
  :host {
    display: block;
    padding: 0 ${({spacing:t})=>t[5]} ${({spacing:t})=>t[5]};
  }
`});var xr,At,It=d(()=>{"use strict";_();W();H();O();wr();yr();xr=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},At=class extends m{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:e,app_store:o,play_store:r,chrome_store:n,homepage:i}=this.wallet,s=y.isMobile(),l=y.isIos(),a=y.isAndroid(),p=[o,r,i,n].filter(Boolean).length>1,g=ne.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return p&&!s?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${()=>w.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!p&&i?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:o&&l?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:r&&a?c`
        <wui-cta-button
          label=${`Don't have ${g}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&y.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&y.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&y.openHref(this.wallet.homepage,"_blank")}};At.styles=[br];xr([u({type:Object})],At.prototype,"wallet",void 0);At=xr([h("w3m-mobile-download-links")],At)});var Cr,vr=d(()=>{"use strict";O();Cr=v`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:t})=>t[1]} * -1);
    bottom: calc(${({spacing:t})=>t[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:t})=>t.lg};
    transition-timing-function: ${({easings:t})=>t["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:t})=>t[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:t})=>t["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`});var le,D,Ve=d(()=>{"use strict";_();W();me();H();ts();ae();ro();Rt();Jo();hr();ze();St();It();vr();le=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},D=class extends m{constructor(){super(),this.wallet=w.state.data?.wallet,this.connector=w.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=J.getConnectorImage(this.connector)??J.getWalletImage(this.wallet),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=C.state.wcUri,this.error=C.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(C.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),C.subscribeKey("wcError",e=>this.error=e)),(y.isTelegram()||y.isSafari())&&y.isIos()&&C.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),C.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,o="";return this.label?o=this.label:(o=`Continue in ${this.name}`,this.error&&(o="Connection declined")),c`
      <wui-flex
        data-error=${R(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${R(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${o}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?c`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?c`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){C.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let e=tt.state.themeVariables["--w3m-border-radius-master"],o=e?parseInt(e.replace("px",""),10):4;return c`<wui-loading-thumbnail radius=${o*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(y.copyToClopboard(this.uri),xe.showSuccess("Link copied"))}catch{xe.showError("Failed to copy")}}};D.styles=Cr;le([f()],D.prototype,"isRetrying",void 0);le([f()],D.prototype,"uri",void 0);le([f()],D.prototype,"error",void 0);le([f()],D.prototype,"ready",void 0);le([f()],D.prototype,"showRetry",void 0);le([f()],D.prototype,"label",void 0);le([f()],D.prototype,"secondaryBtnLabel",void 0);le([f()],D.prototype,"secondaryLabel",void 0);le([f()],D.prototype,"isLoading",void 0);le([u({type:Boolean})],D.prototype,"isMobile",void 0);le([u()],D.prototype,"onRetry",void 0)});var ns,$r,Er=d(()=>{"use strict";wt();H();O();Ve();ns=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},$r=class extends D{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),B.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:w.state.view}})}async onConnectProxy(){try{this.error=!1;let{connectors:e}=F.state,o=e.find(r=>r.type==="ANNOUNCED"&&r.info?.rdns===this.wallet?.rdns||r.type==="INJECTED"||r.name===this.wallet?.name);if(o)await C.connectExternal(o,o.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");xt.close(),B.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown",view:w.state.view,walletRank:this.wallet?.order}})}catch(e){e instanceof yt&&e.originalName===gt.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?B.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:e.message}}):B.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};$r=ns([h("w3m-connecting-wc-browser")],$r)});var ss,Rr,_r=d(()=>{"use strict";H();O();Ve();ss=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Rr=class extends D{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),B.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:w.state.view}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:e,name:o}=this.wallet,{redirect:r,href:n}=y.formatNativeUrl(e,this.uri);C.setWcLinking({name:o,href:n}),C.setRecentWallet(this.wallet),y.openHref(r,"_blank")}catch{this.error=!0}}};Rr=ss([h("w3m-connecting-wc-desktop")],Rr)});var He,Le,Sr=d(()=>{"use strict";W();H();O();Ve();He=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Le=class extends D{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=U.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:e,link_mode:o,name:r}=this.wallet,{redirect:n,redirectUniversalLink:i,href:s}=y.formatNativeUrl(e,this.uri,o);this.redirectDeeplink=n,this.redirectUniversalLink=i,this.target=y.isIframe()?"_top":"_self",C.setWcLinking({name:r,href:s}),C.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?y.openHref(this.redirectUniversalLink,this.target):y.openHref(this.redirectDeeplink,this.target)}catch(e){B.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=bt.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(C.subscribeKey("wcUri",()=>{this.onHandleURI()})),B.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:w.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){C.setWcError(!1),this.onConnect?.()}};He([f()],Le.prototype,"redirectDeeplink",void 0);He([f()],Le.prototype,"redirectUniversalLink",void 0);He([f()],Le.prototype,"target",void 0);He([f()],Le.prototype,"preferUniversalLinks",void 0);He([f()],Le.prototype,"isLoading",void 0);Le=He([h("w3m-connecting-wc-mobile")],Le)});var Ar=T((Tc,Tr)=>{"use strict";Tr.exports=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}});var $e=T(ke=>{"use strict";var no,ls=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];ke.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};ke.getSymbolTotalCodewords=function(e){return ls[e]};ke.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};ke.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');no=e};ke.isKanjiModeEnabled=function(){return typeof no<"u"};ke.toSJIS=function(e){return no(e)}});var Wt=T(ee=>{"use strict";ee.L={bit:1};ee.M={bit:0};ee.Q={bit:3};ee.H={bit:2};function as(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return ee.L;case"m":case"medium":return ee.M;case"q":case"quartile":return ee.Q;case"h":case"high":return ee.H;default:throw new Error("Unknown EC Level: "+t)}}ee.isValid=function(e){return e&&typeof e.bit<"u"&&e.bit>=0&&e.bit<4};ee.from=function(e,o){if(ee.isValid(e))return e;try{return as(e)}catch{return o}}});var Lr=T((Wc,Wr)=>{"use strict";function Ir(){this.buffer=[],this.length=0}Ir.prototype={get:function(t){let e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let o=0;o<e;o++)this.putBit((t>>>e-o-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){let e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};Wr.exports=Ir});var Pr=T((Lc,kr)=>{"use strict";function nt(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}nt.prototype.set=function(t,e,o,r){let n=t*this.size+e;this.data[n]=o,r&&(this.reservedBit[n]=!0)};nt.prototype.get=function(t,e){return this.data[t*this.size+e]};nt.prototype.xor=function(t,e,o){this.data[t*this.size+e]^=o};nt.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};kr.exports=nt});var Br=T(Lt=>{"use strict";var cs=$e().getSymbolSize;Lt.getRowColCoords=function(e){if(e===1)return[];let o=Math.floor(e/7)+2,r=cs(e),n=r===145?26:Math.ceil((r-13)/(2*o-2))*2,i=[r-7];for(let s=1;s<o-1;s++)i[s]=i[s-1]-n;return i.push(6),i.reverse()};Lt.getPositions=function(e){let o=[],r=Lt.getRowColCoords(e),n=r.length;for(let i=0;i<n;i++)for(let s=0;s<n;s++)i===0&&s===0||i===0&&s===n-1||i===n-1&&s===0||o.push([r[i],r[s]]);return o}});var Dr=T(Or=>{"use strict";var us=$e().getSymbolSize,Nr=7;Or.getPositions=function(e){let o=us(e);return[[0,0],[o-Nr,0],[0,o-Nr]]}});var Mr=T(L=>{"use strict";L.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var Pe={N1:3,N2:3,N3:40,N4:10};L.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7};L.from=function(e){return L.isValid(e)?parseInt(e,10):void 0};L.getPenaltyN1=function(e){let o=e.size,r=0,n=0,i=0,s=null,l=null;for(let a=0;a<o;a++){n=i=0,s=l=null;for(let p=0;p<o;p++){let g=e.get(a,p);g===s?n++:(n>=5&&(r+=Pe.N1+(n-5)),s=g,n=1),g=e.get(p,a),g===l?i++:(i>=5&&(r+=Pe.N1+(i-5)),l=g,i=1)}n>=5&&(r+=Pe.N1+(n-5)),i>=5&&(r+=Pe.N1+(i-5))}return r};L.getPenaltyN2=function(e){let o=e.size,r=0;for(let n=0;n<o-1;n++)for(let i=0;i<o-1;i++){let s=e.get(n,i)+e.get(n,i+1)+e.get(n+1,i)+e.get(n+1,i+1);(s===4||s===0)&&r++}return r*Pe.N2};L.getPenaltyN3=function(e){let o=e.size,r=0,n=0,i=0;for(let s=0;s<o;s++){n=i=0;for(let l=0;l<o;l++)n=n<<1&2047|e.get(s,l),l>=10&&(n===1488||n===93)&&r++,i=i<<1&2047|e.get(l,s),l>=10&&(i===1488||i===93)&&r++}return r*Pe.N3};L.getPenaltyN4=function(e){let o=0,r=e.data.length;for(let i=0;i<r;i++)o+=e.data[i];return Math.abs(Math.ceil(o*100/r/5)-10)*Pe.N4};function ds(t,e,o){switch(t){case L.Patterns.PATTERN000:return(e+o)%2===0;case L.Patterns.PATTERN001:return e%2===0;case L.Patterns.PATTERN010:return o%3===0;case L.Patterns.PATTERN011:return(e+o)%3===0;case L.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(o/3))%2===0;case L.Patterns.PATTERN101:return e*o%2+e*o%3===0;case L.Patterns.PATTERN110:return(e*o%2+e*o%3)%2===0;case L.Patterns.PATTERN111:return(e*o%3+(e+o)%2)%2===0;default:throw new Error("bad maskPattern:"+t)}}L.applyMask=function(e,o){let r=o.size;for(let n=0;n<r;n++)for(let i=0;i<r;i++)o.isReserved(i,n)||o.xor(i,n,ds(e,i,n))};L.getBestMask=function(e,o){let r=Object.keys(L.Patterns).length,n=0,i=1/0;for(let s=0;s<r;s++){o(s),L.applyMask(s,e);let l=L.getPenaltyN1(e)+L.getPenaltyN2(e)+L.getPenaltyN3(e)+L.getPenaltyN4(e);L.applyMask(s,e),l<i&&(i=l,n=s)}return n}});var lo=T(so=>{"use strict";var Ee=Wt(),kt=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Pt=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];so.getBlocksCount=function(e,o){switch(o){case Ee.L:return kt[(e-1)*4+0];case Ee.M:return kt[(e-1)*4+1];case Ee.Q:return kt[(e-1)*4+2];case Ee.H:return kt[(e-1)*4+3];default:return}};so.getTotalCodewordsCount=function(e,o){switch(o){case Ee.L:return Pt[(e-1)*4+0];case Ee.M:return Pt[(e-1)*4+1];case Ee.Q:return Pt[(e-1)*4+2];case Ee.H:return Pt[(e-1)*4+3];default:return}}});var Ur=T(Nt=>{"use strict";var st=new Uint8Array(512),Bt=new Uint8Array(256);(function(){let e=1;for(let o=0;o<255;o++)st[o]=e,Bt[e]=o,e<<=1,e&256&&(e^=285);for(let o=255;o<512;o++)st[o]=st[o-255]})();Nt.log=function(e){if(e<1)throw new Error("log("+e+")");return Bt[e]};Nt.exp=function(e){return st[e]};Nt.mul=function(e,o){return e===0||o===0?0:st[Bt[e]+Bt[o]]}});var jr=T(lt=>{"use strict";var ao=Ur();lt.mul=function(e,o){let r=new Uint8Array(e.length+o.length-1);for(let n=0;n<e.length;n++)for(let i=0;i<o.length;i++)r[n+i]^=ao.mul(e[n],o[i]);return r};lt.mod=function(e,o){let r=new Uint8Array(e);for(;r.length-o.length>=0;){let n=r[0];for(let s=0;s<o.length;s++)r[s]^=ao.mul(o[s],n);let i=0;for(;i<r.length&&r[i]===0;)i++;r=r.slice(i)}return r};lt.generateECPolynomial=function(e){let o=new Uint8Array([1]);for(let r=0;r<e;r++)o=lt.mul(o,new Uint8Array([1,ao.exp(r)]));return o}});var Fr=T((Mc,qr)=>{"use strict";var zr=jr();function co(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}co.prototype.initialize=function(e){this.degree=e,this.genPoly=zr.generateECPolynomial(this.degree)};co.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");let o=new Uint8Array(e.length+this.degree);o.set(e);let r=zr.mod(o,this.genPoly),n=this.degree-r.length;if(n>0){let i=new Uint8Array(this.degree);return i.set(r,n),i}return r};qr.exports=co});var uo=T(Vr=>{"use strict";Vr.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}});var po=T(we=>{"use strict";var Hr="[0-9]+",ps="[A-Z $%*+\\-./:]+",at="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";at=at.replace(/u/g,"\\u");var hs="(?:(?![A-Z0-9 $%*+\\-./:]|"+at+`)(?:.|[\r
]))+`;we.KANJI=new RegExp(at,"g");we.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");we.BYTE=new RegExp(hs,"g");we.NUMERIC=new RegExp(Hr,"g");we.ALPHANUMERIC=new RegExp(ps,"g");var fs=new RegExp("^"+at+"$"),ms=new RegExp("^"+Hr+"$"),gs=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");we.testKanji=function(e){return fs.test(e)};we.testNumeric=function(e){return ms.test(e)};we.testAlphanumeric=function(e){return gs.test(e)}});var Re=T(z=>{"use strict";var ws=uo(),ho=po();z.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]};z.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]};z.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]};z.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]};z.MIXED={bit:-1};z.getCharCountIndicator=function(e,o){if(!e.ccBits)throw new Error("Invalid mode: "+e);if(!ws.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?e.ccBits[0]:o<27?e.ccBits[1]:e.ccBits[2]};z.getBestModeForData=function(e){return ho.testNumeric(e)?z.NUMERIC:ho.testAlphanumeric(e)?z.ALPHANUMERIC:ho.testKanji(e)?z.KANJI:z.BYTE};z.toString=function(e){if(e&&e.id)return e.id;throw new Error("Invalid mode")};z.isValid=function(e){return e&&e.bit&&e.ccBits};function bs(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return z.NUMERIC;case"alphanumeric":return z.ALPHANUMERIC;case"kanji":return z.KANJI;case"byte":return z.BYTE;default:throw new Error("Unknown mode: "+t)}}z.from=function(e,o){if(z.isValid(e))return e;try{return bs(e)}catch{return o}}});var Yr=T(Be=>{"use strict";var Ot=$e(),ys=lo(),Kr=Wt(),_e=Re(),fo=uo(),Qr=7973,Gr=Ot.getBCHDigit(Qr);function xs(t,e,o){for(let r=1;r<=40;r++)if(e<=Be.getCapacity(r,o,t))return r}function Jr(t,e){return _e.getCharCountIndicator(t,e)+4}function Cs(t,e){let o=0;return t.forEach(function(r){let n=Jr(r.mode,e);o+=n+r.getBitsLength()}),o}function vs(t,e){for(let o=1;o<=40;o++)if(Cs(t,o)<=Be.getCapacity(o,e,_e.MIXED))return o}Be.from=function(e,o){return fo.isValid(e)?parseInt(e,10):o};Be.getCapacity=function(e,o,r){if(!fo.isValid(e))throw new Error("Invalid QR Code version");typeof r>"u"&&(r=_e.BYTE);let n=Ot.getSymbolTotalCodewords(e),i=ys.getTotalCodewordsCount(e,o),s=(n-i)*8;if(r===_e.MIXED)return s;let l=s-Jr(r,e);switch(r){case _e.NUMERIC:return Math.floor(l/10*3);case _e.ALPHANUMERIC:return Math.floor(l/11*2);case _e.KANJI:return Math.floor(l/13);case _e.BYTE:default:return Math.floor(l/8)}};Be.getBestVersionForData=function(e,o){let r,n=Kr.from(o,Kr.M);if(Array.isArray(e)){if(e.length>1)return vs(e,n);if(e.length===0)return 1;r=e[0]}else r=e;return xs(r.mode,r.getLength(),n)};Be.getEncodedBits=function(e){if(!fo.isValid(e)||e<7)throw new Error("Invalid QR Code version");let o=e<<12;for(;Ot.getBCHDigit(o)-Gr>=0;)o^=Qr<<Ot.getBCHDigit(o)-Gr;return e<<12|o}});var ti=T(ei=>{"use strict";var mo=$e(),Zr=1335,$s=21522,Xr=mo.getBCHDigit(Zr);ei.getEncodedBits=function(e,o){let r=e.bit<<3|o,n=r<<10;for(;mo.getBCHDigit(n)-Xr>=0;)n^=Zr<<mo.getBCHDigit(n)-Xr;return(r<<10|n)^$s}});var ri=T((Vc,oi)=>{"use strict";var Es=Re();function Ke(t){this.mode=Es.NUMERIC,this.data=t.toString()}Ke.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};Ke.prototype.getLength=function(){return this.data.length};Ke.prototype.getBitsLength=function(){return Ke.getBitsLength(this.data.length)};Ke.prototype.write=function(e){let o,r,n;for(o=0;o+3<=this.data.length;o+=3)r=this.data.substr(o,3),n=parseInt(r,10),e.put(n,10);let i=this.data.length-o;i>0&&(r=this.data.substr(o),n=parseInt(r,10),e.put(n,i*3+1))};oi.exports=Ke});var ni=T((Hc,ii)=>{"use strict";var Rs=Re(),go=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Ge(t){this.mode=Rs.ALPHANUMERIC,this.data=t}Ge.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};Ge.prototype.getLength=function(){return this.data.length};Ge.prototype.getBitsLength=function(){return Ge.getBitsLength(this.data.length)};Ge.prototype.write=function(e){let o;for(o=0;o+2<=this.data.length;o+=2){let r=go.indexOf(this.data[o])*45;r+=go.indexOf(this.data[o+1]),e.put(r,11)}this.data.length%2&&e.put(go.indexOf(this.data[o]),6)};ii.exports=Ge});var li=T((Kc,si)=>{"use strict";si.exports=function(e){for(var o=[],r=e.length,n=0;n<r;n++){var i=e.charCodeAt(n);if(i>=55296&&i<=56319&&r>n+1){var s=e.charCodeAt(n+1);s>=56320&&s<=57343&&(i=(i-55296)*1024+s-56320+65536,n+=1)}if(i<128){o.push(i);continue}if(i<2048){o.push(i>>6|192),o.push(i&63|128);continue}if(i<55296||i>=57344&&i<65536){o.push(i>>12|224),o.push(i>>6&63|128),o.push(i&63|128);continue}if(i>=65536&&i<=1114111){o.push(i>>18|240),o.push(i>>12&63|128),o.push(i>>6&63|128),o.push(i&63|128);continue}o.push(239,191,189)}return new Uint8Array(o).buffer}});var ci=T((Gc,ai)=>{"use strict";var _s=li(),Ss=Re();function Qe(t){this.mode=Ss.BYTE,typeof t=="string"&&(t=_s(t)),this.data=new Uint8Array(t)}Qe.getBitsLength=function(e){return e*8};Qe.prototype.getLength=function(){return this.data.length};Qe.prototype.getBitsLength=function(){return Qe.getBitsLength(this.data.length)};Qe.prototype.write=function(t){for(let e=0,o=this.data.length;e<o;e++)t.put(this.data[e],8)};ai.exports=Qe});var di=T((Qc,ui)=>{"use strict";var Ts=Re(),As=$e();function Je(t){this.mode=Ts.KANJI,this.data=t}Je.getBitsLength=function(e){return e*13};Je.prototype.getLength=function(){return this.data.length};Je.prototype.getBitsLength=function(){return Je.getBitsLength(this.data.length)};Je.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let o=As.toSJIS(this.data[e]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),t.put(o,13)}};ui.exports=Je});var pi=T((Jc,wo)=>{"use strict";var ct={single_source_shortest_paths:function(t,e,o){var r={},n={};n[e]=0;var i=ct.PriorityQueue.make();i.push(e,0);for(var s,l,a,p,g,k,E,V,I;!i.empty();){s=i.pop(),l=s.value,p=s.cost,g=t[l]||{};for(a in g)g.hasOwnProperty(a)&&(k=g[a],E=p+k,V=n[a],I=typeof n[a]>"u",(I||V>E)&&(n[a]=E,i.push(a,E),r[a]=l))}if(typeof o<"u"&&typeof n[o]>"u"){var x=["Could not find a path from ",e," to ",o,"."].join("");throw new Error(x)}return r},extract_shortest_path_from_predecessor_list:function(t,e){for(var o=[],r=e,n;r;)o.push(r),n=t[r],r=t[r];return o.reverse(),o},find_path:function(t,e,o){var r=ct.single_source_shortest_paths(t,e,o);return ct.extract_shortest_path_from_predecessor_list(r,o)},PriorityQueue:{make:function(t){var e=ct.PriorityQueue,o={},r;t=t||{};for(r in e)e.hasOwnProperty(r)&&(o[r]=e[r]);return o.queue=[],o.sorter=t.sorter||e.default_sorter,o},default_sorter:function(t,e){return t.cost-e.cost},push:function(t,e){var o={value:t,cost:e};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};typeof wo<"u"&&(wo.exports=ct)});var xi=T(Ye=>{"use strict";var S=Re(),mi=ri(),gi=ni(),wi=ci(),bi=di(),ut=po(),Dt=$e(),Is=pi();function hi(t){return unescape(encodeURIComponent(t)).length}function dt(t,e,o){let r=[],n;for(;(n=t.exec(o))!==null;)r.push({data:n[0],index:n.index,mode:e,length:n[0].length});return r}function yi(t){let e=dt(ut.NUMERIC,S.NUMERIC,t),o=dt(ut.ALPHANUMERIC,S.ALPHANUMERIC,t),r,n;return Dt.isKanjiModeEnabled()?(r=dt(ut.BYTE,S.BYTE,t),n=dt(ut.KANJI,S.KANJI,t)):(r=dt(ut.BYTE_KANJI,S.BYTE,t),n=[]),e.concat(o,r,n).sort(function(s,l){return s.index-l.index}).map(function(s){return{data:s.data,mode:s.mode,length:s.length}})}function bo(t,e){switch(e){case S.NUMERIC:return mi.getBitsLength(t);case S.ALPHANUMERIC:return gi.getBitsLength(t);case S.KANJI:return bi.getBitsLength(t);case S.BYTE:return wi.getBitsLength(t)}}function Ws(t){return t.reduce(function(e,o){let r=e.length-1>=0?e[e.length-1]:null;return r&&r.mode===o.mode?(e[e.length-1].data+=o.data,e):(e.push(o),e)},[])}function Ls(t){let e=[];for(let o=0;o<t.length;o++){let r=t[o];switch(r.mode){case S.NUMERIC:e.push([r,{data:r.data,mode:S.ALPHANUMERIC,length:r.length},{data:r.data,mode:S.BYTE,length:r.length}]);break;case S.ALPHANUMERIC:e.push([r,{data:r.data,mode:S.BYTE,length:r.length}]);break;case S.KANJI:e.push([r,{data:r.data,mode:S.BYTE,length:hi(r.data)}]);break;case S.BYTE:e.push([{data:r.data,mode:S.BYTE,length:hi(r.data)}])}}return e}function ks(t,e){let o={},r={start:{}},n=["start"];for(let i=0;i<t.length;i++){let s=t[i],l=[];for(let a=0;a<s.length;a++){let p=s[a],g=""+i+a;l.push(g),o[g]={node:p,lastCount:0},r[g]={};for(let k=0;k<n.length;k++){let E=n[k];o[E]&&o[E].node.mode===p.mode?(r[E][g]=bo(o[E].lastCount+p.length,p.mode)-bo(o[E].lastCount,p.mode),o[E].lastCount+=p.length):(o[E]&&(o[E].lastCount=p.length),r[E][g]=bo(p.length,p.mode)+4+S.getCharCountIndicator(p.mode,e))}}n=l}for(let i=0;i<n.length;i++)r[n[i]].end=0;return{map:r,table:o}}function fi(t,e){let o,r=S.getBestModeForData(t);if(o=S.from(e,r),o!==S.BYTE&&o.bit<r.bit)throw new Error('"'+t+'" cannot be encoded with mode '+S.toString(o)+`.
 Suggested mode is: `+S.toString(r));switch(o===S.KANJI&&!Dt.isKanjiModeEnabled()&&(o=S.BYTE),o){case S.NUMERIC:return new mi(t);case S.ALPHANUMERIC:return new gi(t);case S.KANJI:return new bi(t);case S.BYTE:return new wi(t)}}Ye.fromArray=function(e){return e.reduce(function(o,r){return typeof r=="string"?o.push(fi(r,null)):r.data&&o.push(fi(r.data,r.mode)),o},[])};Ye.fromString=function(e,o){let r=yi(e,Dt.isKanjiModeEnabled()),n=Ls(r),i=ks(n,o),s=Is.find_path(i.map,"start","end"),l=[];for(let a=1;a<s.length-1;a++)l.push(i.table[s[a]].node);return Ye.fromArray(Ws(l))};Ye.rawSplit=function(e){return Ye.fromArray(yi(e,Dt.isKanjiModeEnabled()))}});var vi=T(Ci=>{"use strict";var Ut=$e(),yo=Wt(),Ps=Lr(),Bs=Pr(),Ns=Br(),Os=Dr(),vo=Mr(),$o=lo(),Ds=Fr(),Mt=Yr(),Ms=ti(),Us=Re(),xo=xi();function js(t,e){let o=t.size,r=Os.getPositions(e);for(let n=0;n<r.length;n++){let i=r[n][0],s=r[n][1];for(let l=-1;l<=7;l++)if(!(i+l<=-1||o<=i+l))for(let a=-1;a<=7;a++)s+a<=-1||o<=s+a||(l>=0&&l<=6&&(a===0||a===6)||a>=0&&a<=6&&(l===0||l===6)||l>=2&&l<=4&&a>=2&&a<=4?t.set(i+l,s+a,!0,!0):t.set(i+l,s+a,!1,!0))}}function zs(t){let e=t.size;for(let o=8;o<e-8;o++){let r=o%2===0;t.set(o,6,r,!0),t.set(6,o,r,!0)}}function qs(t,e){let o=Ns.getPositions(e);for(let r=0;r<o.length;r++){let n=o[r][0],i=o[r][1];for(let s=-2;s<=2;s++)for(let l=-2;l<=2;l++)s===-2||s===2||l===-2||l===2||s===0&&l===0?t.set(n+s,i+l,!0,!0):t.set(n+s,i+l,!1,!0)}}function Fs(t,e){let o=t.size,r=Mt.getEncodedBits(e),n,i,s;for(let l=0;l<18;l++)n=Math.floor(l/3),i=l%3+o-8-3,s=(r>>l&1)===1,t.set(n,i,s,!0),t.set(i,n,s,!0)}function Co(t,e,o){let r=t.size,n=Ms.getEncodedBits(e,o),i,s;for(i=0;i<15;i++)s=(n>>i&1)===1,i<6?t.set(i,8,s,!0):i<8?t.set(i+1,8,s,!0):t.set(r-15+i,8,s,!0),i<8?t.set(8,r-i-1,s,!0):i<9?t.set(8,15-i-1+1,s,!0):t.set(8,15-i-1,s,!0);t.set(r-8,8,1,!0)}function Vs(t,e){let o=t.size,r=-1,n=o-1,i=7,s=0;for(let l=o-1;l>0;l-=2)for(l===6&&l--;;){for(let a=0;a<2;a++)if(!t.isReserved(n,l-a)){let p=!1;s<e.length&&(p=(e[s]>>>i&1)===1),t.set(n,l-a,p),i--,i===-1&&(s++,i=7)}if(n+=r,n<0||o<=n){n-=r,r=-r;break}}}function Hs(t,e,o){let r=new Ps;o.forEach(function(a){r.put(a.mode.bit,4),r.put(a.getLength(),Us.getCharCountIndicator(a.mode,t)),a.write(r)});let n=Ut.getSymbolTotalCodewords(t),i=$o.getTotalCodewordsCount(t,e),s=(n-i)*8;for(r.getLengthInBits()+4<=s&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);let l=(s-r.getLengthInBits())/8;for(let a=0;a<l;a++)r.put(a%2?17:236,8);return Ks(r,t,e)}function Ks(t,e,o){let r=Ut.getSymbolTotalCodewords(e),n=$o.getTotalCodewordsCount(e,o),i=r-n,s=$o.getBlocksCount(e,o),l=r%s,a=s-l,p=Math.floor(r/s),g=Math.floor(i/s),k=g+1,E=p-g,V=new Ds(E),I=0,x=new Array(s),b=new Array(s),P=0,A=new Uint8Array(t.buffer);for(let Ue=0;Ue<s;Ue++){let Xt=Ue<a?g:k;x[Ue]=A.slice(I,I+Xt),b[Ue]=V.encode(x[Ue]),I+=Xt,P=Math.max(P,Xt)}let q=new Uint8Array(r),M=0,j,he;for(j=0;j<P;j++)for(he=0;he<s;he++)j<x[he].length&&(q[M++]=x[he][j]);for(j=0;j<E;j++)for(he=0;he<s;he++)q[M++]=b[he][j];return q}function Gs(t,e,o,r){let n;if(Array.isArray(t))n=xo.fromArray(t);else if(typeof t=="string"){let p=e;if(!p){let g=xo.rawSplit(t);p=Mt.getBestVersionForData(g,o)}n=xo.fromString(t,p||40)}else throw new Error("Invalid data");let i=Mt.getBestVersionForData(n,o);if(!i)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=i;else if(e<i)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+i+`.
`);let s=Hs(e,o,n),l=Ut.getSymbolSize(e),a=new Bs(l);return js(a,e),zs(a),qs(a,e),Co(a,o,0),e>=7&&Fs(a,e),Vs(a,s),isNaN(r)&&(r=vo.getBestMask(a,Co.bind(null,a,o))),vo.applyMask(r,a),Co(a,o,r),{modules:a,version:e,errorCorrectionLevel:o,maskPattern:r,segments:n}}Ci.create=function(e,o){if(typeof e>"u"||e==="")throw new Error("No input text");let r=yo.M,n,i;return typeof o<"u"&&(r=yo.from(o.errorCorrectionLevel,yo.M),n=Mt.from(o.version),i=vo.from(o.maskPattern),o.toSJISFunc&&Ut.setToSJISFunction(o.toSJISFunc)),Gs(e,n,r,i)}});var Eo=T(Ne=>{"use strict";function $i(t){if(typeof t=="number"&&(t=t.toString()),typeof t!="string")throw new Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||e.length===5||e.length>8)throw new Error("Invalid hex color: "+t);(e.length===3||e.length===4)&&(e=Array.prototype.concat.apply([],e.map(function(r){return[r,r]}))),e.length===6&&e.push("F","F");let o=parseInt(e.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+e.slice(0,6).join("")}}Ne.getOptions=function(e){e||(e={}),e.color||(e.color={});let o=typeof e.margin>"u"||e.margin===null||e.margin<0?4:e.margin,r=e.width&&e.width>=21?e.width:void 0,n=e.scale||4;return{width:r,scale:r?4:n,margin:o,color:{dark:$i(e.color.dark||"#000000ff"),light:$i(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}};Ne.getScale=function(e,o){return o.width&&o.width>=e+o.margin*2?o.width/(e+o.margin*2):o.scale};Ne.getImageWidth=function(e,o){let r=Ne.getScale(e,o);return Math.floor((e+o.margin*2)*r)};Ne.qrToImageData=function(e,o,r){let n=o.modules.size,i=o.modules.data,s=Ne.getScale(n,r),l=Math.floor((n+r.margin*2)*s),a=r.margin*s,p=[r.color.light,r.color.dark];for(let g=0;g<l;g++)for(let k=0;k<l;k++){let E=(g*l+k)*4,V=r.color.light;if(g>=a&&k>=a&&g<l-a&&k<l-a){let I=Math.floor((g-a)/s),x=Math.floor((k-a)/s);V=p[i[I*n+x]?1:0]}e[E++]=V.r,e[E++]=V.g,e[E++]=V.b,e[E]=V.a}}});var Ei=T(jt=>{"use strict";var Ro=Eo();function Qs(t,e,o){t.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=o,e.width=o,e.style.height=o+"px",e.style.width=o+"px"}function Js(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}jt.render=function(e,o,r){let n=r,i=o;typeof n>"u"&&(!o||!o.getContext)&&(n=o,o=void 0),o||(i=Js()),n=Ro.getOptions(n);let s=Ro.getImageWidth(e.modules.size,n),l=i.getContext("2d"),a=l.createImageData(s,s);return Ro.qrToImageData(a.data,e,n),Qs(l,i,s),l.putImageData(a,0,0),i};jt.renderToDataURL=function(e,o,r){let n=r;typeof n>"u"&&(!o||!o.getContext)&&(n=o,o=void 0),n||(n={});let i=jt.render(e,o,n),s=n.type||"image/png",l=n.rendererOpts||{};return i.toDataURL(s,l.quality)}});var Si=T(_i=>{"use strict";var Ys=Eo();function Ri(t,e){let o=t.a/255,r=e+'="'+t.hex+'"';return o<1?r+" "+e+'-opacity="'+o.toFixed(2).slice(1)+'"':r}function _o(t,e,o){let r=t+e;return typeof o<"u"&&(r+=" "+o),r}function Xs(t,e,o){let r="",n=0,i=!1,s=0;for(let l=0;l<t.length;l++){let a=Math.floor(l%e),p=Math.floor(l/e);!a&&!i&&(i=!0),t[l]?(s++,l>0&&a>0&&t[l-1]||(r+=i?_o("M",a+o,.5+p+o):_o("m",n,0),n=0,i=!1),a+1<e&&t[l+1]||(r+=_o("h",s),s=0)):n++}return r}_i.render=function(e,o,r){let n=Ys.getOptions(o),i=e.modules.size,s=e.modules.data,l=i+n.margin*2,a=n.color.light.a?"<path "+Ri(n.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",p="<path "+Ri(n.color.dark,"stroke")+' d="'+Xs(s,i,n.margin)+'"/>',g='viewBox="0 0 '+l+" "+l+'"',E='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+g+' shape-rendering="crispEdges">'+a+p+`</svg>
`;return typeof r=="function"&&r(null,E),E}});var Ai=T(pt=>{"use strict";var Zs=Ar(),So=vi(),Ti=Ei(),el=Si();function To(t,e,o,r,n){let i=[].slice.call(arguments,1),s=i.length,l=typeof i[s-1]=="function";if(!l&&!Zs())throw new Error("Callback required as last argument");if(l){if(s<2)throw new Error("Too few arguments provided");s===2?(n=o,o=e,e=r=void 0):s===3&&(e.getContext&&typeof n>"u"?(n=r,r=void 0):(n=r,r=o,o=e,e=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(o=e,e=r=void 0):s===2&&!e.getContext&&(r=o,o=e,e=void 0),new Promise(function(a,p){try{let g=So.create(o,r);a(t(g,e,r))}catch(g){p(g)}})}try{let a=So.create(o,r);n(null,t(a,e,r))}catch(a){n(a)}}pt.create=So.create;pt.toCanvas=To.bind(null,Ti.render);pt.toDataURL=To.bind(null,Ti.renderToDataURL);pt.toString=To.bind(null,function(t,e,o){return el.render(t,o)})});function Ao(t,e,o){return t===e?!1:(t-e<0?e-t:t-e)<=o+tl}function ol(t,e){let o=Array.prototype.slice.call(Wi.default.create(t,{errorCorrectionLevel:e}).modules.data,0),r=Math.sqrt(o.length);return o.reduce((n,i,s)=>(s%r===0?n.push([i]):n[n.length-1].push(i))&&n,[])}var Wi,tl,Ii,be,Li,ki=d(()=>{"use strict";Wi=Kn(Ai(),1);_();tl=.1,Ii=2.5,be=7;Li={generate({uri:t,size:e,logoSize:o,padding:r=8,dotColor:n="var(--apkt-colors-black)"}){let s=[],l=ol(t,"Q"),a=(e-2*r)/l.length,p=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];p.forEach(({x,y:b})=>{let P=(l.length-be)*a*x+r,A=(l.length-be)*a*b+r,q=.45;for(let M=0;M<p.length;M+=1){let j=a*(be-M*2);s.push(ve`
            <rect
              fill=${M===2?"var(--apkt-colors-black)":"var(--apkt-colors-white)"}
              width=${M===0?j-10:j}
              rx= ${M===0?(j-10)*q:j*q}
              ry= ${M===0?(j-10)*q:j*q}
              stroke=${n}
              stroke-width=${M===0?10:0}
              height=${M===0?j-10:j}
              x= ${M===0?A+a*M+10/2:A+a*M}
              y= ${M===0?P+a*M+10/2:P+a*M}
            />
          `)}});let g=Math.floor((o+25)/a),k=l.length/2-g/2,E=l.length/2+g/2-1,V=[];l.forEach((x,b)=>{x.forEach((P,A)=>{if(l[b][A]&&!(b<be&&A<be||b>l.length-(be+1)&&A<be||b<be&&A>l.length-(be+1))&&!(b>k&&b<E&&A>k&&A<E)){let q=b*a+a/2+r,M=A*a+a/2+r;V.push([q,M])}})});let I={};return V.forEach(([x,b])=>{I[x]?I[x]?.push(b):I[x]=[b]}),Object.entries(I).map(([x,b])=>{let P=b.filter(A=>b.every(q=>!Ao(A,q,a)));return[Number(x),P]}).forEach(([x,b])=>{b.forEach(P=>{s.push(ve`<circle cx=${x} cy=${P} fill=${n} r=${a/Ii} />`)})}),Object.entries(I).filter(([x,b])=>b.length>1).map(([x,b])=>{let P=b.filter(A=>b.some(q=>Ao(A,q,a)));return[Number(x),P]}).map(([x,b])=>{b.sort((A,q)=>A<q?-1:1);let P=[];for(let A of b){let q=P.find(M=>M.some(j=>Ao(A,j,a)));q?q.push(A):P.push([A])}return[x,P.map(A=>[A[0],A[A.length-1]])]}).forEach(([x,b])=>{b.forEach(([P,A])=>{s.push(ve`
              <line
                x1=${x}
                x2=${x}
                y1=${P}
                y2=${A}
                stroke=${n}
                stroke-width=${a/(Ii/2)}
                stroke-linecap="round"
              />
            `)})}),s}}});var Pi,Bi=d(()=>{"use strict";X();Pi=v`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({colors:t})=>t.white};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  :host {
    border-radius: ${({borderRadius:t})=>t[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:t})=>t.theme.backgroundPrimary};
    border-radius: ${({borderRadius:t})=>t[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`});var Se,ce,Ni=d(()=>{"use strict";_();W();vt();Yn();Ho();ki();Z();Y();Bi();Se=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},ce=class extends m{constructor(){super(...arguments),this.uri="",this.size=500,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),c`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return ve`
      <svg viewBox="0 0 ${this.size} ${this.size}" width="100%" height="100%">
        ${Li.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?c`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:c`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};ce.styles=[N,Pi];Se([u()],ce.prototype,"uri",void 0);Se([u({type:Number})],ce.prototype,"size",void 0);Se([u()],ce.prototype,"theme",void 0);Se([u()],ce.prototype,"imageSrc",void 0);Se([u()],ce.prototype,"alt",void 0);Se([u({type:Boolean})],ce.prototype,"arenaClear",void 0);Se([u({type:Boolean})],ce.prototype,"farcaster",void 0);ce=Se([h("wui-qr-code")],ce)});var Oi=d(()=>{"use strict";Ni()});var Di,Mi=d(()=>{"use strict";X();Di=v`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:t})=>t.theme.foregroundSecondary} 0%,
      ${({tokens:t})=>t.theme.foregroundTertiary} 50%,
      ${({tokens:t})=>t.theme.foregroundSecondary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s ease-in-out infinite;
    border-radius: ${({borderRadius:t})=>t[2]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:t})=>t[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`});var ht,Oe,Io=d(()=>{"use strict";_();W();Y();Mi();ht=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Oe=class extends m{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",c`<slot></slot>`}};Oe.styles=[Di];ht([u()],Oe.prototype,"width",void 0);ht([u()],Oe.prototype,"height",void 0);ht([u()],Oe.prototype,"variant",void 0);ht([u({type:Boolean})],Oe.prototype,"rounded",void 0);Oe=ht([h("wui-shimmer")],Oe)});var Wo=d(()=>{"use strict";Io()});var Ui,ji=d(()=>{"use strict";O();Ui=v`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:t})=>t[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`});var zi,zt,qi=d(()=>{"use strict";_();W();me();H();O();ae();ro();Jo();Oi();Wo();ze();os();Ve();It();ji();zi=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},zt=class extends D{constructor(){super(),this.basic=!1}firstUpdated(){this.basic||B.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:w.state.view}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e())}render(){return this.onRenderProxy(),c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0)}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.wallet?this.wallet.name:void 0;return C.setWcLinking(void 0),C.setRecentWallet(this.wallet),c` <wui-qr-code
      theme=${tt.state.themeMode}
      uri=${this.uri}
      imageSrc=${R(J.getWalletImage(this.wallet))}
      color=${R(tt.state.themeVariables["--w3m-qr-color"])}
      alt=${R(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return c`<wui-button
      .disabled=${e}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};zt.styles=Ui;zi([u({type:Boolean})],zt.prototype,"basic",void 0);zt=zi([h("w3m-connecting-wc-qrcode")],zt)});var rl,Fi,Vi=d(()=>{"use strict";_();me();H();O();ae();ze();St();It();rl=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Fi=class extends m{constructor(){if(super(),this.wallet=w.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");B.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:w.state.view}})}render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${R(J.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Fi=rl([h("w3m-connecting-wc-unsupported")],Fi)});var Hi,Lo,Ki=d(()=>{"use strict";W();H();O();Ve();Hi=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Lo=class extends D{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=bt.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(C.subscribeKey("wcUri",()=>{this.updateLoadingState()})),B.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:w.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:e,name:o}=this.wallet,{redirect:r,href:n}=y.formatUniversalUrl(e,this.uri);C.setWcLinking({name:o,href:n}),C.setRecentWallet(this.wallet),y.openHref(r,"_blank")}catch{this.error=!0}}};Hi([f()],Lo.prototype,"isLoading",void 0);Lo=Hi([h("w3m-connecting-wc-web")],Lo)});var Gi,Qi=d(()=>{"use strict";O();Gi=v`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`});var De,ye,Ji=d(()=>{"use strict";_();W();wt();H();O();zo();ar();Er();_r();Sr();qi();Vi();Ki();Qi();De=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},ye=class extends m{constructor(){super(),this.wallet=w.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!U.state.siwx,this.remoteFeatures=U.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(U.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return U.state.enableMobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),c`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return!this.remoteFeatures?.reownBranding||!this.displayBranding?null:c`<wui-ux-by-reown></wui-ux-by-reown>`}async initializeConnection(e=!1){if(!(this.platform==="browser"||U.state.manualWCControl&&!e))try{let{wcPairingExpiry:o,status:r}=C.state,{redirectView:n}=w.state.data??{};if(e||U.state.enableEmbedded||y.isPairingExpired(o)||r==="connecting"){let i=C.getConnections(fe.state.activeChain),s=this.remoteFeatures?.multiWallet,l=i.length>0;await C.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(l&&s?(w.replace("ProfileWallets"),xe.showSuccess("New Wallet Added")):n?w.replace(n):xt.close())}}catch(o){if(o instanceof Error&&o.message.includes("An error occurred when attempting to switch chain")&&!U.state.enableNetworkSwitch&&fe.state.activeChain){fe.setActiveCaipNetwork(jo.getUnsupportedNetwork(`${fe.state.activeChain}:${fe.state.activeCaipNetwork?.id}`)),fe.showUnsupportedChainUI();return}o instanceof yt&&o.originalName===gt.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?B.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:o.message}}):B.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:o?.message??"Unknown"}}),C.setWcError(!0),xe.showError(o.message??"Connection error"),C.resetWcConnection(),w.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:e,desktop_link:o,webapp_link:r,injected:n,rdns:i}=this.wallet,s=n?.map(({injected_id:I})=>I).filter(Boolean),l=[...i?[i]:s??[]],a=U.state.isUniversalProvider?!1:l.length,p=e,g=r,k=C.checkInstalled(l),E=a&&k,V=o&&!y.isMobile();E&&!fe.state.noAdapters&&this.platforms.push("browser"),p&&this.platforms.push(y.isMobile()?"mobile":"qrcode"),g&&this.platforms.push("web"),V&&this.platforms.push("desktop"),!E&&a&&!fe.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return c`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return c`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return c`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return c`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return c`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return c`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?c`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){let o=this.shadowRoot?.querySelector("div");o&&(await o.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,o.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};ye.styles=Gi;De([f()],ye.prototype,"platform",void 0);De([f()],ye.prototype,"platforms",void 0);De([f()],ye.prototype,"isSiwxEnabled",void 0);De([f()],ye.prototype,"remoteFeatures",void 0);De([u({type:Boolean})],ye.prototype,"displayBranding",void 0);De([u({type:Boolean})],ye.prototype,"basic",void 0);ye=De([h("w3m-connecting-wc-view")],ye)});var ko,qt,Yi=d(()=>{"use strict";_();W();H();O();ae();Yo();er();Ji();ko=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},qt=class extends m{constructor(){super(),this.unsubscribe=[],this.isMobile=y.isMobile(),this.remoteFeatures=U.state.remoteFeatures,this.unsubscribe.push(U.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(this.isMobile){let{featured:e,recommended:o}=$.state,{customWallets:r}=U.state,n=Mo.getRecentWallets(),i=e.length||o.length||r?.length||n.length;return c`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${i?c`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return c`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?c` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};ko([f()],qt.prototype,"isMobile",void 0);ko([f()],qt.prototype,"remoteFeatures",void 0);qt=ko([h("w3m-connecting-wc-basic-view")],qt)});var Ud,Xi,Zi=d(()=>{"use strict";Vo();({I:Ud}=Fo),Xi=t=>t.strings===void 0});function il(t){this._$AN!==void 0?(Ft(this),this._$AM=t,en(this)):this._$AM=t}function nl(t,e=!1,o=0){let r=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(e)if(Array.isArray(r))for(let i=o;i<r.length;i++)ft(r[i],!1),Ft(r[i]);else r!=null&&(ft(r,!1),Ft(r));else ft(this,t)}var ft,Ft,en,sl,Vt,tn=d(()=>{"use strict";Zi();oo();oo();ft=(t,e)=>{let o=t._$AN;if(o===void 0)return!1;for(let r of o)r._$AO?.(e,!1),ft(r,e);return!0},Ft=t=>{let e,o;do{if((e=t._$AM)===void 0)break;o=e._$AN,o.delete(t),t=e}while(o?.size===0)},en=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(o===void 0)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),sl(e)}};sl=t=>{t.type==Ko.CHILD&&(t._$AP??=nl,t._$AQ??=il)},Vt=class extends Go{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,o,r){super._$AT(e,o,r),en(this),this.isConnected=e._$AU}_$AO(e,o=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),o&&(ft(this,e),Ft(this))}setValue(e){if(Xi(this._$Ct))this._$Ct._$AI(e,this);else{let o=[...this._$Ct._$AH];o[this._$Ci]=e,this._$Ct._$AI(o,this,0)}}disconnected(){}reconnected(){}}});var Xe,Bo,Po,Ze,on=d(()=>{"use strict";Vo();tn();oo();Xe=()=>new Bo,Bo=class{},Po=new WeakMap,Ze=to(class extends Vt{render(t){return eo}update(t,[e]){let o=e!==this.G;return o&&this.G!==void 0&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),eo}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){let e=this.ht??globalThis,o=Po.get(e);o===void 0&&(o=new WeakMap,Po.set(e,o)),o.get(this.G)!==void 0&&this.G.call(this.ht,void 0),o.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return typeof this.G=="function"?Po.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})});var Ht=d(()=>{"use strict";on()});var rn,nn=d(()=>{"use strict";X();rn=v`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      color ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      border ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      width ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      height ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      transform ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      opacity ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:t})=>t.neutrals300};
    border-radius: ${({borderRadius:t})=>t.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      color ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      border ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      width ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      height ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]},
      transform ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      opacity ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:t})=>t.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:t})=>t.core.iconAccentPrimary};
    background-color: ${({tokens:t})=>t.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:t})=>t.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:t})=>t.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:t})=>t.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:t})=>t.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:t})=>t.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:t})=>t.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:t})=>t.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:t})=>t.theme.textTertiary};
  }
`});var Kt,et,sn=d(()=>{"use strict";_();W();Ht();Z();Y();nn();Kt=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},et=class extends m{constructor(){super(...arguments),this.inputElementRef=Xe(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return c`
      <label data-size=${this.size}>
        <input
          ${Ze(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};et.styles=[N,K,rn];Kt([u({type:Boolean})],et.prototype,"checked",void 0);Kt([u({type:Boolean})],et.prototype,"disabled",void 0);Kt([u()],et.prototype,"size",void 0);et=Kt([h("wui-toggle")],et)});var ln,an=d(()=>{"use strict";X();ln=v`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:t})=>t[2]};
    padding: ${({spacing:t})=>t[2]} ${({spacing:t})=>t[3]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:t})=>t.theme.foregroundPrimary};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`});var cn,Gt,un=d(()=>{"use strict";_();W();Z();Y();sn();an();cn=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Gt=class extends m{constructor(){super(...arguments),this.checked=!1}render(){return c`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(e){e.stopPropagation(),this.checked=e.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};Gt.styles=[N,K,ln];cn([u({type:Boolean})],Gt.prototype,"checked",void 0);Gt=cn([h("wui-certified-switch")],Gt)});var dn=d(()=>{"use strict";un()});var pn,hn=d(()=>{"use strict";X();pn=v`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:t})=>t[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[3]} ${({spacing:t})=>t[10]};
    font-size: ${({textSize:t})=>t.large};
    line-height: ${({typography:t})=>t["lg-regular"].lineHeight};
    letter-spacing: ${({typography:t})=>t["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:t})=>t.regular};
    font-family: ${({fontFamily:t})=>t.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:t})=>t[4]} ${({spacing:t})=>t[3]}
      ${({spacing:t})=>t[4]} ${({spacing:t})=>t[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:t})=>t.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:t})=>t[4]};
    color: ${({tokens:t})=>t.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:t})=>t[2]};
    color: ${({tokens:t})=>t.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:t})=>t.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:t})=>t[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`});var te,G,fn=d(()=>{"use strict";_();W();me();Ht();vt();$t();Z();Y();hn();te=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},G=class extends m{constructor(){super(...arguments),this.inputElementRef=Xe(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return c` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${Ze(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${R(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?c`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?c`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?c`<wui-icon name="spinner" size="md"></wui-icon>`:c`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?c`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?c`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};G.styles=[N,K,pn];te([u()],G.prototype,"icon",void 0);te([u({type:Boolean})],G.prototype,"disabled",void 0);te([u({type:Boolean})],G.prototype,"loading",void 0);te([u()],G.prototype,"placeholder",void 0);te([u()],G.prototype,"type",void 0);te([u()],G.prototype,"value",void 0);te([u()],G.prototype,"errorText",void 0);te([u()],G.prototype,"warningText",void 0);te([u()],G.prototype,"onSubmit",void 0);te([u()],G.prototype,"size",void 0);te([u({attribute:!1})],G.prototype,"onKeyDown",void 0);G=te([h("wui-input-text")],G)});var mn,gn=d(()=>{"use strict";X();mn=v`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:t})=>t[3]};
    color: ${({tokens:t})=>t.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:t})=>t[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:t})=>t[4]};
    transition: background-color ${({durations:t})=>t.lg}
      ${({easings:t})=>t["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }
`});var wn,Qt,bn=d(()=>{"use strict";_();W();Ht();Z();Y();fn();gn();wn=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Qt=class extends m{constructor(){super(...arguments),this.inputComponentRef=Xe(),this.inputValue=""}render(){return c`
      <wui-input-text
        ${Ze(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?c`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(e){this.inputValue=e.detail||""}clearValue(){let o=this.inputComponentRef.value?.inputElementRef.value;o&&(o.value="",this.inputValue="",o.focus(),o.dispatchEvent(new Event("input")))}};Qt.styles=[N,mn];wn([u()],Qt.prototype,"inputValue",void 0);Qt=wn([h("wui-search-bar")],Qt)});var yn=d(()=>{"use strict";bn()});var xn,Cn=d(()=>{"use strict";_();xn=ve`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`});var vn,$n=d(()=>{"use strict";X();vn=v`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:t})=>t[2]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:t})=>t.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`});var En,Jt,Rn=d(()=>{"use strict";_();W();Cn();Io();Z();Y();$n();En=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Jt=class extends m{constructor(){super(...arguments),this.type="wallet"}render(){return c`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?c` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${xn}`:c`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};Jt.styles=[N,K,vn];En([u()],Jt.prototype,"type",void 0);Jt=En([h("wui-card-select-loader")],Jt)});var _n=d(()=>{"use strict";Rn()});var Sn,Tn=d(()=>{"use strict";_();Sn=Ct`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`});var oe,Q,An=d(()=>{"use strict";_();W();Z();Qn();Y();Tn();oe=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Q=class extends m{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&ne.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ne.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ne.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ne.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ne.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ne.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ne.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ne.getSpacingStyles(this.margin,3)};
    `,c`<slot></slot>`}};Q.styles=[N,Sn];oe([u()],Q.prototype,"gridTemplateRows",void 0);oe([u()],Q.prototype,"gridTemplateColumns",void 0);oe([u()],Q.prototype,"justifyItems",void 0);oe([u()],Q.prototype,"alignItems",void 0);oe([u()],Q.prototype,"justifyContent",void 0);oe([u()],Q.prototype,"alignContent",void 0);oe([u()],Q.prototype,"columnGap",void 0);oe([u()],Q.prototype,"rowGap",void 0);oe([u()],Q.prototype,"gap",void 0);oe([u()],Q.prototype,"padding",void 0);oe([u()],Q.prototype,"margin",void 0);Q=oe([h("wui-grid")],Q)});var No=d(()=>{"use strict";An()});var In,Wn=d(()=>{"use strict";O();In=v`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:t})=>t[2]};
    padding: ${({spacing:t})=>t[3]} ${({spacing:t})=>t[0]};
    background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:t})=>t[4]}, 20px);
    transition:
      color ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-1"]},
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-1"]},
      border-radius ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:t})=>t.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:t})=>t.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:t})=>t.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:t})=>t.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:t})=>t.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`});var ue,re,Oo=d(()=>{"use strict";_();W();me();H();O();ae();ro();Wo();ze();St();Wn();ue=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},re=class extends m{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId="",this.walletQuery="",this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(o=>{o.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let e=this.wallet?.badge_type==="certified";return c`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${R(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?c`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():c`
      <wui-wallet-image
        size="lg"
        imageSrc=${R(this.imageSrc)}
        name=${R(this.wallet?.name)}
        .installed=${this.wallet?.installed??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return c`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=J.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await J.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){!this.wallet||this.isImpressed||(this.isImpressed=!0,B.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:w.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};re.styles=In;ue([f()],re.prototype,"visible",void 0);ue([f()],re.prototype,"imageSrc",void 0);ue([f()],re.prototype,"imageLoading",void 0);ue([f()],re.prototype,"isImpressed",void 0);ue([u()],re.prototype,"explorerId",void 0);ue([u()],re.prototype,"walletQuery",void 0);ue([u()],re.prototype,"certified",void 0);ue([u()],re.prototype,"displayIndex",void 0);ue([u({type:Object})],re.prototype,"wallet",void 0);re=ue([h("w3m-all-wallets-list-item")],re)});var Ln,kn=d(()=>{"use strict";O();Ln=v`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:t})=>t.xl};
    animation-timing-function: ${({easings:t})=>t["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:t})=>t[4]};
    padding-bottom: ${({spacing:t})=>t[4]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`});var Te,Pn,de,Bn=d(()=>{"use strict";_();W();me();H();O();_n();No();qo();Oo();kn();Te=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Pn="local-paginator",de=class extends m{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!$.state.wallets.length,this.wallets=$.state.wallets,this.recommended=$.state.recommended,this.featured=$.state.featured,this.filteredWallets=$.state.filteredWallets,this.mobileFullScreen=U.state.enableMobileFullScreen,this.unsubscribe.push($.subscribeKey("wallets",e=>this.wallets=e),$.subscribeKey("recommended",e=>this.recommended=e),$.subscribeKey("featured",e=>this.featured=e),$.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),c`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let e=this.shadowRoot?.querySelector("wui-grid");e&&(await $.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,o){return[...Array(e)].map(()=>c`
        <wui-card-select-loader type="wallet" id=${R(o)}></wui-card-select-loader>
      `)}getWallets(){let e=[...this.featured,...this.recommended];this.filteredWallets?.length>0?e.push(...this.filteredWallets):e.push(...this.wallets);let o=y.uniqueBy(e,"id"),r=ot.markWalletsAsInstalled(o);return ot.markWalletsWithDisplayIndex(r)}walletsTemplate(){return this.getWallets().map((o,r)=>c`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${o.id}"
          @click=${()=>this.onConnectWallet(o)}
          .wallet=${o}
          explorerId=${o.id}
          certified=${this.badge==="certified"}
          displayIndex=${r}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:e,recommended:o,featured:r,count:n,mobileFilteredOutWalletsLength:i}=$.state,s=window.innerWidth<352?3:4,l=e.length+o.length,p=Math.ceil(l/s)*s-l+s;return p-=e.length?r.length%s:0,n===0&&r.length>0?null:n===0||[...r,...e,...o].length<n-(i??0)?this.shimmerTemplate(p,Pn):null}createPaginationObserver(){let e=this.shadowRoot?.querySelector(`#${Pn}`);e&&(this.paginationObserver=new IntersectionObserver(([o])=>{if(o?.isIntersecting&&!this.loading){let{page:r,count:n,wallets:i}=$.state;i.length<n&&$.fetchWalletsByPage({page:r+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){F.selectWalletConnector(e)}};de.styles=Ln;Te([f()],de.prototype,"loading",void 0);Te([f()],de.prototype,"wallets",void 0);Te([f()],de.prototype,"recommended",void 0);Te([f()],de.prototype,"featured",void 0);Te([f()],de.prototype,"filteredWallets",void 0);Te([f()],de.prototype,"badge",void 0);Te([f()],de.prototype,"mobileFullScreen",void 0);de=Te([h("w3m-all-wallets-list")],de)});var Nn=d(()=>{"use strict";Qo()});var On,Dn=d(()=>{"use strict";_();On=Ct`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`});var mt,Me,Mn=d(()=>{"use strict";_();W();H();O();ae();No();Rt();Nn();ze();qo();Oo();Dn();mt=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Me=class extends m{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=U.state.enableMobileFullScreen,this.query=""}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.onSearch(),this.loading?c`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await $.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:e}=$.state,o=ot.markWalletsAsInstalled(e);return e.length?c`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${o.map((r,n)=>c`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(r)}
              .wallet=${r}
              data-testid="wallet-search-item-${r.id}"
              explorerId=${r.id}
              certified=${this.badge==="certified"}
              walletQuery=${this.query}
              displayIndex=${n}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:c`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){F.selectWalletConnector(e)}};Me.styles=On;mt([f()],Me.prototype,"loading",void 0);mt([f()],Me.prototype,"mobileFullScreen",void 0);mt([u()],Me.prototype,"query",void 0);mt([u()],Me.prototype,"badge",void 0);Me=mt([h("w3m-all-wallets-search")],Me)});var Do,Yt,Un=d(()=>{"use strict";_();W();H();O();dn();ae();Rt();yn();Bn();Mn();Do=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Yt=class extends m{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=y.debounce(e=>{this.search=e})}render(){let e=this.search.length>=2;return c`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge==="certified"}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?c`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:c`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onCertifiedSwitchChange(e){e.detail?(this.badge="certified",xe.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return y.isMobile()?c`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){w.push("ConnectingWalletConnect")}};Do([f()],Yt.prototype,"search",void 0);Do([f()],Yt.prototype,"badge",void 0);Yt=Do([h("w3m-all-wallets-view")],Yt)});var jn,zn=d(()=>{"use strict";X();jn=v`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:t})=>t[3]};
    width: 100%;
    background-color: ${({tokens:t})=>t.theme.backgroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      scale ${({durations:t})=>t.lg} ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:t})=>t.theme.textPrimary};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:t})=>t.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`});var pe,ie,qn=d(()=>{"use strict";_();W();me();Qo();$t();Z();Y();zn();pe=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},ie=class extends m{constructor(){super(...arguments),this.imageSrc="google",this.loading=!1,this.disabled=!1,this.rightIcon=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",c`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        tabindex=${R(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?c`<wui-image
        icon=${this.icon}
        iconColor=${R(this.iconColor)}
        ?boxed=${!0}
        ?rounded=${this.rounded}
      ></wui-image>`:c`<wui-image
      ?boxed=${!0}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      src=${this.imageSrc}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?c`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:c`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};ie.styles=[N,K,jn];pe([u()],ie.prototype,"imageSrc",void 0);pe([u()],ie.prototype,"icon",void 0);pe([u()],ie.prototype,"iconColor",void 0);pe([u({type:Boolean})],ie.prototype,"loading",void 0);pe([u()],ie.prototype,"tabIdx",void 0);pe([u({type:Boolean})],ie.prototype,"disabled",void 0);pe([u({type:Boolean})],ie.prototype,"rightIcon",void 0);pe([u({type:Boolean})],ie.prototype,"rounded",void 0);pe([u({type:Boolean})],ie.prototype,"fullSize",void 0);ie=pe([h("wui-list-item")],ie)});var Fn=d(()=>{"use strict";qn()});var ll,Vn,Hn=d(()=>{"use strict";_();H();O();ae();Fn();ze();ll=function(t,e,o,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,r);else for(var l=t.length-1;l>=0;l--)(s=t[l])&&(i=(n<3?s(i):n>3?s(e,o,i):s(e,o))||i);return n>3&&i&&Object.defineProperty(e,o,i),i},Vn=class extends m{constructor(){super(...arguments),this.wallet=w.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return c`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?c`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?c`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?c`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?c`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(e){e.href&&this.wallet&&(B.sendEvent({type:"track",event:"GET_WALLET",properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:e.type}}),y.openHref(e.href,"_blank"))}onChromeStore(){this.wallet?.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:"chrome_store"})}onAppStore(){this.wallet?.app_store&&this.openStore({href:this.wallet.app_store,type:"app_store"})}onPlayStore(){this.wallet?.play_store&&this.openStore({href:this.wallet.play_store,type:"play_store"})}onHomePage(){this.wallet?.homepage&&this.openStore({href:this.wallet.homepage,type:"homepage"})}};Vn=ll([h("w3m-downloads-view")],Vn)});var al=d(()=>{Yi();Un();Hn()});al();export{Yt as W3mAllWalletsView,qt as W3mConnectingWcBasicView,Vn as W3mDownloadsView};
