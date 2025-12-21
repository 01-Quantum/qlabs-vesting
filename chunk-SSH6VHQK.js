import{a as c,b as m,c as $,d as Kt,e as K,f as y,g as M,h as ue,m as he,n as Mt,o as Yt,q as Xt,r as Gt,s as qt,u as Zt,v as we,w as Jt,x as Q,y as Qt}from"./chunk-5CFFJGPY.js";import{O as Pe,Q as F,R as Ae,S as U,V as ae,W as k,X as _,Y as Ie,Z as se,ba as n,ia as h,ja as b,ka as V,la as w,ma as q,na as Te,qa as R,ra as le,sa as Z,ta as ce,va as u,wa as J,xa as g}from"./chunk-C7WJRSMW.js";import{A as f,C as N,G as Vt,K as We,M as ne,O as T,Q as X,S as p,U as Re,W as G,Z as Oe,a as Se,j as Ut,qa as C,sa as z,x as Ee}from"./chunk-ADXS2CDP.js";import"./chunk-4LGCJMV5.js";import"./chunk-Q2QAD6QF.js";import"./chunk-E7P2HYXN.js";import"./chunk-7ECBQATZ.js";import{e as d}from"./chunk-SVM3HCG7.js";var _e,Ne=d(()=>{"use strict";q();_e=w`
  :host {
    display: block;
    border-radius: clamp(0px, ${({borderRadius:e})=>e[8]}, 44px);
    box-shadow: 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    overflow: hidden;
  }
`});var eo,fe,ze=d(()=>{"use strict";b();Z();J();Ne();eo=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},fe=class extends h{render(){return n`<slot></slot>`}};fe.styles=[R,_e];fe=eo([u("wui-card")],fe)});var De=d(()=>{"use strict";ze()});var Be,Le=d(()=>{"use strict";q();Be=w`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[6]};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};

      wui-icon {
        color: ${({tokens:e})=>e.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundWarning};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundError};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e[2]};
    background-color: var(--local-icon-bg-value);
  }
`});var ge,to,ee,He=d(()=>{"use strict";b();$();M();k();ue();he();Kt();Z();J();Le();ge=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},to={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"},ee=class extends h{constructor(){super(...arguments),this.message="",this.type="info"}render(){return n`
      <wui-flex
        data-type=${y(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${to[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){F.close()}};ee.styles=[R,Be];ge([c()],ee.prototype,"message",void 0);ge([c()],ee.prototype,"type",void 0);ee=ge([u("wui-alertbar")],ee)});var je=d(()=>{"use strict";He()});var Fe,Ue=d(()=>{"use strict";g();Fe=w`
  :host {
    display: block;
    position: absolute;
    top: ${({spacing:e})=>e[3]};
    left: ${({spacing:e})=>e[4]};
    right: ${({spacing:e})=>e[4]};
    opacity: 0;
    pointer-events: none;
  }
`});var Ve,oo,de,Ke=d(()=>{"use strict";b();$();k();g();je();Ue();Ve=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},oo={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}},de=class extends h{constructor(){super(),this.unsubscribe=[],this.open=F.state.open,this.onOpen(!0),this.unsubscribe.push(F.subscribeKey("open",t=>{this.open=t,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let{message:t,variant:o}=F.state,r=oo[o];return n`
      <wui-alertbar
        message=${t}
        backgroundColor=${r?.backgroundColor}
        iconColor=${r?.iconColor}
        icon=${r?.icon}
        type=${o}
      ></wui-alertbar>
    `}onOpen(t){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):t||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};de.styles=Fe;Ve([m()],de.prototype,"open",void 0);de=Ve([u("w3m-alertbar")],de)});var Me,Ye=d(()=>{"use strict";q();Me=w`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`});var D,O,Xe=d(()=>{"use strict";b();$();M();ue();Z();J();Ye();D=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},O=class extends h{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return n`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${y(this.iconSize)}></wui-icon>
    </button>`}};O.styles=[R,le,Me];D([c()],O.prototype,"icon",void 0);D([c()],O.prototype,"variant",void 0);D([c()],O.prototype,"type",void 0);D([c()],O.prototype,"size",void 0);D([c()],O.prototype,"iconSize",void 0);D([c({type:Boolean})],O.prototype,"fullWidth",void 0);D([c({type:Boolean})],O.prototype,"disabled",void 0);O=D([u("wui-icon-button")],O)});var Ge=d(()=>{"use strict";Xe()});var qe,Ze=d(()=>{"use strict";q();qe=w`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    opacity: 0.5;
  }
`});var Y,io,ro,B,Je=d(()=>{"use strict";b();$();ue();Yt();he();Z();J();Ze();Y=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},io={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},ro={lg:"lg",md:"md",sm:"sm"},B=class extends h{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return n`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){let t=io[this.size];return this.text?n`<wui-text color="primary" variant=${t}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return n`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;let t=ro[this.size];return n` <wui-flex class="left-icon-container">
      <wui-icon size=${t} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};B.styles=[R,le,qe];Y([c()],B.prototype,"imageSrc",void 0);Y([c()],B.prototype,"text",void 0);Y([c()],B.prototype,"size",void 0);Y([c()],B.prototype,"type",void 0);Y([c({type:Boolean})],B.prototype,"disabled",void 0);B=Y([u("wui-select")],B)});var Qe=d(()=>{"use strict";Je()});var et=d(()=>{"use strict";Xt()});var tt,ot=d(()=>{"use strict";g();tt=w`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`});function it(){let e=p.state.data?.connector?.name,t=p.state.data?.wallet?.name,o=p.state.data?.network?.name,r=t??e,a=G.getConnectors(),i=a.length===1&&a[0]?.id==="w3m-email",s=C.getAccountData()?.socialProvider,l=s?s.charAt(0).toUpperCase()+s.slice(1):"Connect Social";return{Connect:`Connect ${i?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",UsageExceeded:"Usage Exceeded",ConnectingExternal:r??"Connect Wallet",ConnectingWalletConnect:r??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:r?`Get ${r}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:o??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:l,ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in Progress",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset"}}var L,no,ao,P,rt=d(()=>{"use strict";b();$();M();k();g();K();Ge();Qe();et();Q();Ie();ot();L=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},no=["SmartSessionList"],ao={PayWithExchange:V.tokens.theme.foregroundPrimary};P=class extends h{constructor(){super(),this.unsubscribe=[],this.heading=it()[p.state.view],this.network=C.state.activeCaipNetwork,this.networkImage=ne.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=p.state.view,this.viewDirection="",this.unsubscribe.push(We.subscribeNetworkImages(()=>{this.networkImage=ne.getNetworkImage(this.network)}),p.subscribeKey("view",t=>{setTimeout(()=>{this.view=t,this.heading=it()[t]},_.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),C.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.networkImage=ne.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=ao[p.state.view]??V.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",t),n`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){T.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),p.push("WhatIsAWallet")}async onClose(){await ae.safeClose()}rightHeaderTemplate(){let t=f?.state?.features?.smartSessions;return p.state.view!=="Account"||!t?this.closeButtonTemplate():n`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>p.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `}closeButtonTemplate(){return n`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){let t=no.includes(this.view);return n`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${t?n`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:t}=p.state,o=t==="Connect",r=f.state.enableEmbedded,a=t==="ApproveTransaction",i=t==="ConnectingSiwe",s=t==="Account",l=f.state.enableNetworkSwitch,W=a||i||o&&r;return s&&l?n`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${y(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${y(this.networkImage)}
      ></wui-select>`:this.showBack&&!W?n`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:n`<wui-icon-button
      data-hidden=${!o}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(T.sendEvent({type:"track",event:"CLICK_NETWORKS"}),p.push("Networks"))}isAllowedNetworkSwitch(){let t=C.getAllRequestedCaipNetworks(),o=t?t.length>1:!1,r=t?.find(({id:a})=>a===this.network?.id);return o||!r}onViewChange(){let{history:t}=p.state,o=_.VIEW_DIRECTION.Next;t.length<this.prevHistoryLength&&(o=_.VIEW_DIRECTION.Prev),this.prevHistoryLength=t.length,this.viewDirection=o}async onHistoryChange(){let{history:t}=p.state,o=this.shadowRoot?.querySelector("#dynamic");t.length>1&&!this.showBack&&o?(await o.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,o.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):t.length<=1&&this.showBack&&o&&(await o.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,o.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){p.goBack()}};P.styles=tt;L([m()],P.prototype,"heading",void 0);L([m()],P.prototype,"network",void 0);L([m()],P.prototype,"networkImage",void 0);L([m()],P.prototype,"showBack",void 0);L([m()],P.prototype,"prevHistoryLength",void 0);L([m()],P.prototype,"view",void 0);L([m()],P.prototype,"viewDirection",void 0);P=L([u("w3m-header")],P)});var nt,at=d(()=>{"use strict";q();nt=w`
  :host {
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({tokens:e})=>e.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({borderRadius:e})=>e.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    border-radius: ${({borderRadius:e})=>e.round} !important;
  }
`});var be,te,st=d(()=>{"use strict";b();$();qt();he();Z();J();Mt();at();be=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},te=class extends h{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return n`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){let t={success:"success",error:"error",warning:"warning",info:"default"},o={success:"checkmark",error:"warning",warning:"warningCircle",info:"info"};return this.variant==="loading"?n`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:n`<wui-icon-box
      size="md"
      color=${t[this.variant]}
      icon=${o[this.variant]}
    ></wui-icon-box>`}};te.styles=[R,nt];be([c()],te.prototype,"message",void 0);be([c()],te.prototype,"variant",void 0);te=be([u("wui-snackbar")],te)});var lt=d(()=>{"use strict";st()});var ct,dt=d(()=>{"use strict";b();ct=se`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`});var pt,pe,mt=d(()=>{"use strict";b();$();k();g();lt();dt();pt=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},pe=class extends h{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=N.state.open,this.unsubscribe.push(N.subscribeKey("open",t=>{this.open=t,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(t=>t())}render(){let{message:t,variant:o}=N.state;return n` <wui-snackbar message=${t} variant=${o}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),N.state.autoClose&&(this.timeout=setTimeout(()=>N.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};pe.styles=ct;pt([m()],pe.prototype,"open",void 0);pe=pt([u("w3m-snackbar")],pe)});var ut,ht=d(()=>{"use strict";g();ut=w`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:e})=>e[3]} 10px ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[3]};
    color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:e})=>e[5]});
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.textPrimary};
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`});var oe,H,wt=d(()=>{"use strict";b();$();k();g();K();we();Q();ht();oe=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},H=class extends h{constructor(){super(),this.unsubscribe=[],this.open=U.state.open,this.message=U.state.message,this.triggerRect=U.state.triggerRect,this.variant=U.state.variant,this.unsubscribe.push(U.subscribe(t=>{this.open=t.open,this.message=t.message,this.triggerRect=t.triggerRect,this.variant=t.variant}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){this.dataset.variant=this.variant;let t=this.triggerRect.top,o=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${t}px;
    --w3m-tooltip-left: ${o}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${this.open?1:0};
    `,n`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};H.styles=[ut];oe([m()],H.prototype,"open",void 0);oe([m()],H.prototype,"message",void 0);oe([m()],H.prototype,"triggerRect",void 0);oe([m()],H.prototype,"variant",void 0);H=oe([u("w3m-tooltip")],H)});var j,ve=d(()=>{"use strict";Ut();k();Ie();j={getTabsByNamespace(e){return!!e&&e===Se.CHAIN.EVM?f.state.remoteFeatures?.activity===!1?_.ACCOUNT_TABS.filter(o=>o.label!=="Activity"):_.ACCOUNT_TABS:[]},isValidReownName(e){return/^[a-zA-Z0-9]+$/gu.test(e)},isValidEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(e)},validateReownName(e){return e.replace(/\^/gu,"").toLowerCase().replace(/[^a-zA-Z0-9]/gu,"")},hasFooter(){let e=p.state.view;if(_.VIEWS_WITH_LEGAL_FOOTER.includes(e)){let{termsConditionsUrl:t,privacyPolicyUrl:o}=f.state,r=f.state.features?.legalCheckbox;return!(!t&&!o||r)}return _.VIEWS_WITH_DEFAULT_FOOTER.includes(e)}}});var ft,gt=d(()=>{"use strict";g();ft=w`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:e})=>e[3]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.core.textAccentPrimary};
    font-weight: 500;
  }
`});var bt,me,vt=d(()=>{"use strict";b();$();k();g();K();Q();Qt();gt();bt=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},me=class extends h{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=f.state.remoteFeatures,this.unsubscribe.push(f.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let{termsConditionsUrl:t,privacyPolicyUrl:o}=f.state,r=f.state.features?.legalCheckbox;return!t&&!o||r?n`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `:n`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `}andTemplate(){let{termsConditionsUrl:t,privacyPolicyUrl:o}=f.state;return t&&o?"and":""}termsTemplate(){let{termsConditionsUrl:t}=f.state;return t?n`<a href=${t} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){let{privacyPolicyUrl:t}=f.state;return t?n`<a href=${t} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(t=!1){return this.remoteFeatures?.reownBranding?t?n`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:n`<wui-ux-by-reown></wui-ux-by-reown>`:null}};me.styles=[ft];bt([m()],me.prototype,"remoteFeatures",void 0);me=bt([u("w3m-legal-footer")],me)});var yt,xt=d(()=>{"use strict";b();yt=se``});var so,ye,Ct=d(()=>{"use strict";b();k();g();K();we();Jt();Q();Vt();xt();so=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},ye=class extends h{render(){let{termsConditionsUrl:t,privacyPolicyUrl:o}=f.state;return!t&&!o?null:n`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `}howDoesItWorkTemplate(){return n` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){T.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:Oe(C.state.activeChain)===Ee.ACCOUNT_TYPES.SMART_ACCOUNT}}),p.push("WhatIsABuy")}};ye.styles=[yt];ye=so([u("w3m-onramp-providers-footer")],ye)});var kt,$t=d(()=>{"use strict";g();kt=w`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`});var xe,ie,Ce=d(()=>{"use strict";b();$();k();g();vt();Ct();ve();$t();xe=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},ie=class extends h{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=p.state.view}firstUpdated(){this.status=j.hasFooter()?"show":"hide",this.unsubscribe.push(p.subscribeKey("view",t=>{this.view=t,this.status=j.hasFooter()?"show":"hide",this.status==="hide"&&document.documentElement.style.setProperty("--apkt-footer-height","0px")})),this.resizeObserver=new ResizeObserver(t=>{for(let o of t)if(o.target===this.getWrapper()){let r=`${o.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",r)}}),this.resizeObserver.observe(this.getWrapper())}render(){return n`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return j.hasFooter()?n` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return n`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return n`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return n` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){T.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),p.push("WhatIsANetwork")}getWrapper(){return this.shadowRoot?.querySelector("div.container")}};ie.styles=[kt];xe([m()],ie.prototype,"status",void 0);xe([m()],ie.prototype,"view",void 0);ie=xe([u("w3m-footer")],ie)});var St,Et=d(()=>{"use strict";g();St=w`
  :host {
    display: block;
    width: inherit;
  }
`});var ke,re,Wt=d(()=>{"use strict";b();$();k();g();Ce();Et();ke=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},re=class extends h{constructor(){super(),this.unsubscribe=[],this.viewState=p.state.view,this.history=p.state.history.join(","),this.unsubscribe.push(p.subscribeKey("view",()=>{this.history=p.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return n`${this.templatePageContainer()}`}templatePageContainer(){return n`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=p.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(t){switch(t){case"AccountSettings":return n`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return n`<w3m-account-view></w3m-account-view>`;case"AllWallets":return n`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return n`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return n`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return n`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":return n`<w3m-connect-view></w3m-connect-view>`;case"Create":return n`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return n`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return n`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return n`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return n`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return n`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return n`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return n`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return n`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return n`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return n`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return n`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return n`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return n`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return n`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return n`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return n`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return n`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return n`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return n`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return n`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return n`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return n`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return n`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return n`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return n`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return n`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return n`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return n`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return n`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return n`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return n`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return n`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WalletSendConfirmed":return n`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;case"WhatIsABuy":return n`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return n`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return n`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return n`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return n`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return n`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return n`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return n`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return n`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return n`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return n`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return n`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return n`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return n`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return n`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"FundWallet":return n`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return n`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return n`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;case"UsageExceeded":return n`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;default:return n`<w3m-connect-view></w3m-connect-view>`}}};re.styles=[St];ke([m()],re.prototype,"viewState",void 0);ke([m()],re.prototype,"history",void 0);re=ke([u("w3m-router")],re)});var Rt,Ot=d(()=>{"use strict";g();Rt=w`
  :host {
    z-index: ${({tokens:e})=>e.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({tokens:e})=>e.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      backdrop-filter ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    transition-delay: ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      w3m-shake ${({durations:e})=>e.xl}
        ${({easings:e})=>e["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({easings:e})=>e["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
  }
`});var A,Pt,lo,S,At,It,Tt=d(()=>{"use strict";b();$();M();k();g();De();K();Ke();rt();mt();wt();ve();Ce();Wt();Ot();A=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},Pt="scroll-lock",lo={PayWithExchange:"0",PayWithExchangeSelectAsset:"0"},S=class extends h{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=f.state.enableEmbedded,this.open=z.state.open,this.caipAddress=C.state.activeCaipAddress,this.caipNetwork=C.state.activeCaipNetwork,this.shake=z.state.shake,this.filterByNamespace=G.state.filterByNamespace,this.padding=V.spacing[1],this.mobileFullScreen=f.state.enableMobileFullScreen,this.initializeTheming(),X.prefetchAnalyticsConfig(),this.unsubscribe.push(z.subscribeKey("open",t=>t?this.onOpen():this.onClose()),z.subscribeKey("shake",t=>this.shake=t),C.subscribeKey("activeCaipNetwork",t=>this.onNewNetwork(t)),C.subscribeKey("activeCaipAddress",t=>this.onNewAddress(t)),f.subscribeKey("enableEmbedded",t=>this.enableEmbedded=t),G.subscribeKey("filterByNamespace",t=>{this.filterByNamespace!==t&&!C.getAccountData(t)?.caipAddress&&(X.fetchRecommendedWallets(),this.filterByNamespace=t)}),p.subscribeKey("view",()=>{this.dataset.border=j.hasFooter()?"true":"false",this.padding=lo[p.state.view]??V.spacing[1]}))}firstUpdated(){if(this.dataset.border=j.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded){z.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.onRemoveKeyboardListener()}render(){return this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded?n`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?n`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return n` <wui-card
      shake="${this.shake}"
      data-embedded="${y(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(t){if(t.target===t.currentTarget){if(this.mobileFullScreen)return;await this.handleClose()}}async handleClose(){await ae.safeClose()}initializeTheming(){let{themeVariables:t,themeMode:o}=Re.state,r=ce.getColorTheme(o);Te(t,r)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),N.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let t=document.createElement("style");t.dataset.w3m=Pt,t.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(t)}onScrollUnlock(){let t=document.head.querySelector(`style[data-w3m="${Pt}"]`);t&&t.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let t=this.shadowRoot?.querySelector("wui-card");t?.focus(),window.addEventListener("keydown",o=>{if(o.key==="Escape")this.handleClose();else if(o.key==="Tab"){let{tagName:r}=o.target;r&&!r.includes("W3M-")&&!r.includes("WUI-")&&t?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(t){let o=C.state.isSwitchingNamespace,r=p.state.view==="ProfileWallets";!t&&!o&&!r&&z.close(),await Pe.initializeIfEnabled(t),this.caipAddress=t,C.setIsSwitchingNamespace(!1)}onNewNetwork(t){let r=this.caipNetwork?.caipNetworkId?.toString(),a=t?.caipNetworkId?.toString(),i=r!==a,s=p.state.view==="UnsupportedChain",l=z.state.open,W=!1;this.enableEmbedded&&p.state.view==="SwitchNetwork"&&(W=!0),i&&Ae.resetState(),l&&s&&(W=!0),W&&p.state.view!=="SIWXSignMessage"&&p.goBack(),this.caipNetwork=t}prefetch(){this.hasPrefetched||(X.prefetch(),X.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}};S.styles=Rt;A([c({type:Boolean})],S.prototype,"enableEmbedded",void 0);A([m()],S.prototype,"open",void 0);A([m()],S.prototype,"caipAddress",void 0);A([m()],S.prototype,"caipNetwork",void 0);A([m()],S.prototype,"shake",void 0);A([m()],S.prototype,"filterByNamespace",void 0);A([m()],S.prototype,"padding",void 0);A([m()],S.prototype,"mobileFullScreen",void 0);At=class extends S{};At=A([u("w3m-modal")],At);It=class extends S{};It=A([u("appkit-modal")],It)});var _t,Nt=d(()=>{"use strict";g();_t=w`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${({borderRadius:e})=>e[5]};
    background-color: ${({colors:e})=>e.semanticError010};
  }
`});var co,$e,zt=d(()=>{"use strict";b();k();g();Zt();K();we();Q();Nt();co=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},$e=class extends h{constructor(){super()}render(){return n`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `}onTryAgainClick(){p.goBack()}};$e.styles=_t;$e=co([u("w3m-usage-exceeded-view")],$e)});var Dt,Bt=d(()=>{"use strict";g();Dt=w`
  :host {
    width: 100%;
  }
`});var x,v,Lt=d(()=>{"use strict";b();$();M();k();g();Gt();Bt();x=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},v=class extends h{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(t){super.updated(t),(t.has("name")||t.has("imageSrc")||t.has("walletRank"))&&(this.hasImpressionSent=!1),t.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&!this.loading&&!this.hasImpressionSent&&this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){!this.name||this.hasImpressionSent||!this.walletRank||(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&T.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:p.state.view,displayIndex:this.displayIndex}))}render(){return n`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${y(this.imageSrc)}
        name=${this.name}
        size=${y(this.size)}
        tagLabel=${y(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
      ></wui-list-wallet>
    `}};v.styles=Dt;x([c({type:Array})],v.prototype,"walletImages",void 0);x([c()],v.prototype,"imageSrc",void 0);x([c()],v.prototype,"name",void 0);x([c()],v.prototype,"size",void 0);x([c()],v.prototype,"tagLabel",void 0);x([c()],v.prototype,"tagVariant",void 0);x([c()],v.prototype,"walletIcon",void 0);x([c()],v.prototype,"tabIdx",void 0);x([c({type:Boolean})],v.prototype,"disabled",void 0);x([c({type:Boolean})],v.prototype,"showAllWallets",void 0);x([c({type:Boolean})],v.prototype,"loading",void 0);x([c({type:String})],v.prototype,"loadingSpinnerColor",void 0);x([c()],v.prototype,"rdnsId",void 0);x([c()],v.prototype,"displayIndex",void 0);x([c()],v.prototype,"walletRank",void 0);v=x([u("w3m-list-wallet")],v)});var Ht,jt=d(()=>{"use strict";g();Ht=w`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({durations:e})=>e.lg};
    --local-transition: ${({easings:e})=>e["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`});var I,po,E,Ft=d(()=>{"use strict";b();$();M();k();g();jt();I=function(e,t,o,r){var a=arguments.length,i=a<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,o):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(e,t,o,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(i=(a<3?s(i):a>3?s(t,o,i):s(t,o))||i);return a>3&&i&&Object.defineProperty(t,o,i),i},po=60,E=class extends h{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=f.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(t){if(t.has("history")){let o=this.history;this.historyState!==""&&this.historyState!==o&&this.onViewChange(o)}t.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),t.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(t=>{for(let o of t)if(o.target===this.getWrapper()){let r=o.contentRect.height,a=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");if(this.mobileFullScreen){let i=window.visualViewport?.height||window.innerHeight,s=this.getHeaderHeight();r=i-s-a,this.style.setProperty("--local-border-bottom-radius","0px")}else r=r+a,this.style.setProperty("--local-border-bottom-radius",a?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${r}px`),this.previousHeight!=="0px"&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${r}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),window.visualViewport?.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){let t=this.getWrapper();t&&this.resizeObserver&&this.resizeObserver.unobserve(t),window.removeEventListener("resize",this.onViewportResize),window.visualViewport?.removeEventListener("resize",this.onViewportResize)}render(){return n`
      <div class="container" data-mobile-fullscreen="${y(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${y(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(t){let o=t.split(",").filter(Boolean),r=this.historyState.split(",").filter(Boolean),a=r.length,i=o.length,s=o[o.length-1]||"",l=ce.cssDurationToNumber(this.transitionDuration),W="";i>a?W="next":i<a?W="prev":i===a&&o[i-1]!==r[a-1]&&(W="next"),this.viewDirection=`${W}-${s}`,setTimeout(()=>{this.historyState=t,this.setView?.(s)},l),setTimeout(()=>{this.viewDirection=""},l*2)}getWrapper(){return this.shadowRoot?.querySelector("div.page")}updateContainerHeight(){let t=this.getWrapper();if(!t)return;let o=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0"),r=0;if(this.mobileFullScreen){let a=window.visualViewport?.height||window.innerHeight,i=this.getHeaderHeight();r=a-i-o,this.style.setProperty("--local-border-bottom-radius","0px")}else r=t.getBoundingClientRect().height+o,this.style.setProperty("--local-border-bottom-radius",o?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${r}px`),this.previousHeight!=="0px"&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${r}px`}getHeaderHeight(){return po}};E.styles=[Ht];I([c({type:String})],E.prototype,"transitionDuration",void 0);I([c({type:String})],E.prototype,"transitionFunction",void 0);I([c({type:String})],E.prototype,"history",void 0);I([c({type:String})],E.prototype,"view",void 0);I([c({attribute:!1})],E.prototype,"setView",void 0);I([m()],E.prototype,"viewDirection",void 0);I([m()],E.prototype,"historyState",void 0);I([m()],E.prototype,"previousHeight",void 0);I([m()],E.prototype,"mobileFullScreen",void 0);E=I([u("w3m-router-container")],E)});var mo=d(()=>{Tt();zt();Lt();Ft()});mo();export{It as AppKitModal,v as W3mListWallet,At as W3mModal,S as W3mModalBase,E as W3mRouterContainer,$e as W3mUsageExceededView};
