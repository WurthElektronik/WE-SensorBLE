"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5767],{5767:(L,f,l)=>{l.r(f),l.d(f,{InfoModule:()=>y,createTranslateLoader:()=>h});var i=l(5056),Z=l(6895),u=l(4006),T=l(529),c=l(3652),A=l(9832),g=l(3196),s=l(5861);const d=(0,l(7423).fo)("Browser",{web:()=>l.e(6874).then(l.bind(l,6874)).then(e=>new e.BrowserWeb)});var p=l(65),n=l(6738),b=l(9949);let v=(()=>{class e{constructor(o,t,a){this.globalization=o,this.translate=t,this.modalCtrl=a,this.selectedlang=void 0}ionViewWillEnter(){var o=this;return(0,s.Z)(function*(){let t=yield p.u.get({key:"preflang"});null==t.value?o.globalization.getPreferredLanguage().then(a=>{o.selectedlang=a.value.split("-")[0]}).catch(a=>{o.selectedlang=o.translate.defaultLang}):o.selectedlang=t.value})()}ngOnInit(){}langselected(o){return this.modalCtrl.dismiss(o,"confirm")}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(b._),n.Y36(c.sK),n.Y36(i.IN))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-change-language"]],decls:16,vars:10,consts:[[1,"inner-content"],[3,"ngModel","ngModelChange"],[3,"click"],["value","en"],["value","de"]],template:function(o,t){1&o&&(n.TgZ(0,"div",0)(1,"h1"),n._uU(2),n.ALo(3,"translate"),n.qZA(),n.TgZ(4,"ion-list")(5,"ion-radio-group",1),n.NdJ("ngModelChange",function(m){return t.selectedlang=m}),n.TgZ(6,"ion-item",2),n.NdJ("click",function(){return t.langselected("en")}),n.TgZ(7,"ion-label"),n._uU(8),n.ALo(9,"translate"),n.qZA(),n._UZ(10,"ion-radio",3),n.qZA(),n.TgZ(11,"ion-item",2),n.NdJ("click",function(){return t.langselected("de")}),n.TgZ(12,"ion-label"),n._uU(13),n.ALo(14,"translate"),n.qZA(),n._UZ(15,"ion-radio",4),n.qZA()()()()),2&o&&(n.xp6(2),n.Oqu(n.lcZ(3,4,"ChangeLanguage.header")),n.xp6(3),n.Q6J("ngModel",t.selectedlang),n.xp6(3),n.Oqu(n.lcZ(9,6,"ChangeLanguage.English")),n.xp6(5),n.Oqu(n.lcZ(14,8,"ChangeLanguage.German")))},dependencies:[i.Ie,i.Q$,i.q_,i.B7,i.se,i.U5,i.QI,u.JJ,u.On,c.X$]}),e})();const k=[{path:"",component:(()=>{class e{constructor(o,t,a){this.router=o,this.modalCtrl=t,this.translate=a}wirelesssensorsclick(){return(0,s.Z)(function*(){yield d.open({url:"https://www.we-online.de/web/en/electronic_components/produkte_pb/produktinnovationen/wirelessconnectivitylandingpage.php"})})()}usermanualsclick(){return(0,s.Z)(function*(){yield d.open({url:"https://www.we-online.com/web/en/electronic_components/produkte_pb/service_pbs/wco/handbuecher/wco_handbuecher.php"})})()}sourcecodeclick(){return(0,s.Z)(function*(){yield d.open({url:"https://github.com/WurthElektronik"})})()}policyclick(){this.router.navigate(["/policy"])}imprintclick(){this.router.navigate(["/imprint"])}languageclick(){var o=this;return(0,s.Z)(function*(){const t=yield o.modalCtrl.create({component:v});t.cssClass="auto-height",t.animated=!1,t.present();const{data:a,role:m}=yield t.onWillDismiss();"confirm"===m&&(yield p.u.set({key:"preflang",value:a}),o.translate.use(a))})()}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(g.F0),n.Y36(i.IN),n.Y36(c.sK))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-info"]],decls:52,vars:34,consts:[[3,"translucent"],["color","primary"],[1,"itemwrapnogrow"],[3,"click"],["name","chevron-forward-outline"]],template:function(o,t){1&o&&(n.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-title"),n._uU(3),n.ALo(4,"translate"),n.qZA()()(),n.TgZ(5,"ion-content")(6,"ion-list-header"),n._uU(7),n.ALo(8,"translate"),n.qZA(),n.TgZ(9,"ion-list")(10,"ion-item")(11,"ion-label"),n._uU(12),n.ALo(13,"translate"),n.qZA(),n.TgZ(14,"ion-label",2),n._uU(15," 1.0.5 "),n.qZA()(),n.TgZ(16,"ion-item",3),n.NdJ("click",function(){return t.languageclick()}),n.TgZ(17,"ion-label"),n._uU(18),n.ALo(19,"translate"),n.qZA(),n.TgZ(20,"ion-label",2),n._uU(21),n.ALo(22,"translate"),n.qZA()(),n.TgZ(23,"ion-item",3),n.NdJ("click",function(){return t.policyclick()}),n.TgZ(24,"ion-label"),n._uU(25),n.ALo(26,"translate"),n.qZA(),n._UZ(27,"ion-icon",4),n.qZA(),n.TgZ(28,"ion-item",3),n.NdJ("click",function(){return t.imprintclick()}),n.TgZ(29,"ion-label"),n._uU(30),n.ALo(31,"translate"),n.qZA(),n._UZ(32,"ion-icon",4),n.qZA()(),n.TgZ(33,"ion-list-header"),n._uU(34),n.ALo(35,"translate"),n.qZA(),n.TgZ(36,"ion-list")(37,"ion-item",3),n.NdJ("click",function(){return t.wirelesssensorsclick()}),n.TgZ(38,"ion-label"),n._uU(39),n.ALo(40,"translate"),n.qZA(),n._UZ(41,"ion-icon",4),n.qZA(),n.TgZ(42,"ion-item",3),n.NdJ("click",function(){return t.usermanualsclick()}),n.TgZ(43,"ion-label"),n._uU(44),n.ALo(45,"translate"),n.qZA(),n._UZ(46,"ion-icon",4),n.qZA(),n.TgZ(47,"ion-item",3),n.NdJ("click",function(){return t.sourcecodeclick()}),n.TgZ(48,"ion-label"),n._uU(49),n.ALo(50,"translate"),n.qZA(),n._UZ(51,"ion-icon",4),n.qZA()()()),2&o&&(n.Q6J("translucent",!0),n.xp6(3),n.hij(" ",n.lcZ(4,12,"InfoTab.tabname")," "),n.xp6(4),n.hij(" ",n.lcZ(8,14,"InfoTab.informationsection.informationheader")," "),n.xp6(5),n.hij(" ",n.lcZ(13,16,"InfoTab.informationsection.version")," "),n.xp6(6),n.hij(" ",n.lcZ(19,18,"InfoTab.informationsection.language")," "),n.xp6(3),n.hij(" ",n.lcZ(22,20,"InfoTab.informationsection.selectedlanguage")," "),n.xp6(4),n.hij(" ",n.lcZ(26,22,"InfoTab.informationsection.policy")," "),n.xp6(5),n.hij(" ",n.lcZ(31,24,"InfoTab.informationsection.imprint")," "),n.xp6(4),n.hij(" ",n.lcZ(35,26,"InfoTab.linksection.linksheader")," "),n.xp6(5),n.hij(" ",n.lcZ(40,28,"InfoTab.linksection.wirelessconnectivityandsensors")," "),n.xp6(5),n.hij(" ",n.lcZ(45,30,"InfoTab.linksection.usermanuals")," "),n.xp6(5),n.hij(" ",n.lcZ(50,32,"InfoTab.linksection.sourcecode")," "))},dependencies:[i.W2,i.Gu,i.gu,i.Ie,i.Q$,i.q_,i.yh,i.wd,i.sr,c.X$],styles:["ion-list-header[_ngcontent-%COMP%]{font-size:large}"]}),e})()}];let C=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[g.Bz.forChild(k),g.Bz]}),e})();function h(e){return new A.w(e,"./assets/i18n/",".json")}let y=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[i.Pc,Z.ez,u.u5,C,c.aw.forChild({loader:{provide:c.Zw,useFactory:h,deps:[T.eN]}})]}),e})()}}]);