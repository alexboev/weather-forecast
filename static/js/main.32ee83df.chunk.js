(this["webpackJsonpweather-forecast"]=this["webpackJsonpweather-forecast"]||[]).push([[0],{238:function(e,t,n){},244:function(e,t,n){},383:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(23),c=n.n(r),i=(n(238),n(29)),s=n(17),o=(n(244),n(429)),u=n(425),l=n(424),d=n(78),j=n(448),h=n(427),f=n(428),b=n(3),m="Celsius",O="Fahrenheit",g=function(e){var t=Object(d.a)(),n=!Object(l.a)(t.breakpoints.up("sm"));return Object(b.jsx)(u.a,{container:!0,direction:"row",justify:"space-around",alignItems:"center",children:Object(b.jsx)(u.a,{item:!0,children:Object(b.jsxs)(h.a,{row:!n,"aria-label":"temperature",name:"temperature",value:e.isFahrenheit?O:m,onChange:function(t){e.onTemperatureModeChanged(t.target.value==O)},children:[Object(b.jsx)(f.a,{value:m,control:Object(b.jsx)(j.a,{}),label:"Celsius"}),Object(b.jsx)(f.a,{value:O,control:Object(b.jsx)(j.a,{}),label:"Fahrenheit"})]})})})},x=n(197),y=n.n(x),p=n(198),v=n.n(p),w=function(e){return Object(b.jsxs)(u.a,{container:!0,spacing:1,direction:"row",justify:"space-between",alignItems:"center",children:[Object(b.jsx)(u.a,{item:!0,children:Object(b.jsx)(y.a,{style:{visibility:e.enablePrevPage?void 0:"hidden"},fontSize:"large",onClick:function(){e.onPageChanged(e.page-1)}})}),Object(b.jsx)(u.a,{item:!0,children:Object(b.jsx)(v.a,{style:{visibility:e.enableNextPage?void 0:"hidden"},fontSize:"large",onClick:function(){e.onPageChanged(e.page+1)}})})]})},T=n(430),P=n(433),I=n(432),C=n(434),D=n(90),S=function(e){return Object(b.jsx)("img",{src:"http://openweathermap.org/img/wn/".concat(e.icon,"@2x.png")})};function F(e){return e-273.15}function k(e){return 9*F(e)/5+32}var Z=n(118),M=n(56),H=n(199);function N(e){return void 0!=e&&null!=e}function z(e){return N(e)&&e.trim().length>0}var E=function(){function e(t,n){if(Object(Z.a)(this,e),this.unixTimeStamp=t,this.timeZoneOffsetInHours=n,!N(t))throw Error("Unix timestamp is requred but is null or undefined");if(!N(n))throw Error("Timezone is requred but is null or undefined")}return Object(M.a)(e,[{key:"getDateTimeInZone",value:function(){var e="+0";return this.timeZoneOffsetInHours>0?e="+"+Math.abs(this.timeZoneOffsetInHours):this.timeZoneOffsetInHours<0&&(e="-"+Math.abs(this.timeZoneOffsetInHours)),H.DateTime.fromSeconds(this.unixTimeStamp).setZone("UTC".concat(e))}},{key:"isDayTime",value:function(){var e=this.getDateTimeInZone().hour;return e>=7&&e<21}},{key:"getDisplayText",value:function(){return this.getDateTimeInZone().toFormat("dd MMM yy")}},{key:"getTimeDisplayText",value:function(){return this.getDateTimeInZone().toFormat("HH:mm")}},{key:"getDateWithoutTime",value:function(){return new e(this.getDateTimeInZone().startOf("day").toSeconds(),this.timeZoneOffsetInHours)}},{key:"getSeconds",value:function(){return this.getDateTimeInZone().toSeconds()}}]),e}(),q=n(85),A=n.n(q),K=n(200),W=n(102);function U(e){var t="http://api.openweathermap.org/data/2.5/forecast?q=".concat(e,"&APPID=").concat("75f972b80e26f14fe6c920aa6a85ad57","&cnt=").concat(40);return new Promise((function(e,n){fetch(t,{method:"GET"}).then((function(t){t.json().then((function(t){"200"==t.cod?e(t):z(t.message)?n(t.message):n("Unknown error.")})).catch((function(e){n(e)}))})).catch((function(e){n(e)}))}))}var B=function(e){return e.forecast.loading.status},L=function(e){return e.forecast.loading.error},Q=function(e){return e.forecast.days},R=function(e){return e.forecast.query},G=function(e){return e.forecast.city.timeZoneOffsetInHours},J=function(e){return e.forecast.city.name},V=function(e){return e.forecast.city.country},X=Object(W.b)("loadForecast",function(){var e=Object(K.a)(A.a.mark((function e(t){var n;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U(t);case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var Y=Object(W.c)({name:"forecast",initialState:{loading:{status:"idle",error:null},days:[],city:{country:null,name:null,timeZoneOffsetInHours:null},query:null},reducers:{setQuery:function(e,t){e.query=t.payload.query,e.loading.status="idle",e.loading.error=null},clearQuery:function(e,t){e.query=null,e.loading.status="idle",e.loading.error=null}},extraReducers:function(e){e.addCase(X.pending,(function(e,t){e.loading.status="loading"})),e.addCase(X.fulfilled,(function(e,t){e.loading.status="succeeded";var n=function(e){var t=e.city.timezone/3600,n=new Map;return e.list.forEach((function(e){var a,r=new E(e.dt,t),c=r.getDateWithoutTime().getSeconds();n.has(c)?a=n.get(c):(a={date:c,temperatureParts:[]},n.set(c,a));var i=e.weather[0];a.temperatureParts.push({dateTime:r.getSeconds(),temperatureKelvin:e.main.temp,weatherIcon:i.icon,weatherId:i.id,weatherTitle:i.main,isDayTime:r.isDayTime()})})),{days:Array.from(n.values()),city:{name:e.city.name,country:e.city.country,timeZoneOffsetInHours:t}}}(t.payload);e.days=n.days,e.city.name=n.city.name,e.city.country=n.city.country,e.city.timeZoneOffsetInHours=n.city.timeZoneOffsetInHours})),e.addCase(X.rejected,(function(e,t){e.loading.status="failed",e.loading.error=t.error.message}))}}),$=n(431),_=Object(o.a)({root:{},title:{fontSize:14},pos:{marginBottom:12}}),ee=function(e){var t=_(),n=(Object(d.a)(),Math.round(F(e.temperature))),a=Math.round(k(e.temperature)),r=Object(i.c)(G),c=new E(e.date,r);return Object(b.jsxs)(T.a,{elevation:e.selected?20:5,className:t.root,onClick:function(){e.onSelect()},children:[Object(b.jsx)($.a,{title:Object(b.jsx)(D.a,{variant:"h5",children:c.getDisplayText()})}),Object(b.jsxs)(I.a,{children:[Object(b.jsxs)(u.a,{container:!0,justify:"center",alignItems:"center",children:[Object(b.jsx)(u.a,{item:!0,children:Object(b.jsxs)(D.a,{style:{minWidth:"".concat(130,"px")},variant:"h2",children:[e.isFahrenheit&&Object(b.jsxs)(b.Fragment,{children:[a,"\u2109"]}),!e.isFahrenheit&&Object(b.jsxs)(b.Fragment,{children:[n,"\u2103"]})]})}),Object(b.jsx)(u.a,{item:!0,children:Object(b.jsx)(S,{icon:e.icon})})]}),Object(b.jsx)(D.a,{className:t.title,color:"textSecondary",gutterBottom:!0})]}),Object(b.jsx)(P.a,{children:Object(b.jsx)(C.a,{size:"small",color:"primary",children:"Details"})})]})};function te(e,t){return t?e.temperatureParts:e.temperatureParts.filter((function(e){return e.isDayTime}))}function ne(e,t){var n,a=te(e,t).map((function(e){return e.temperatureKelvin}));return(n=a).reduce((function(e,t){return e+t}),0)/n.length}function ae(e,t){return function(e){var t=new Map;e.forEach((function(e){var n=t.get(e);N(n)||(n=0),n++,t.set(e,n)}));var n=0,a=null;return t.forEach((function(e,t){e>n&&(a=t,n=e)})),a}(te(e,t).map((function(e){return e.weatherIcon})))}var re=function(e){return Object(b.jsx)(u.a,{container:!0,spacing:2,direction:"row",justify:"center",alignItems:"center",children:e.days.map((function(t){return Object(b.jsx)(u.a,{item:!0,xs:12,sm:4,children:Object(b.jsx)(ee,{selected:t.date===e.selectedCard,onSelect:function(){e.onSelectCard(t.date)},isFahrenheit:e.isFahrenheit,temperature:ne(t,e.useNightPartsInPredictions),date:t.date,icon:ae(t,e.useNightPartsInPredictions)})},t.date)}))})},ce=n(435),ie=n(436),se=n(216),oe=n(217),ue=n(219),le=function(e){var t=Object(i.c)(G),n=[];return e.day&&e.day.temperatureParts.forEach((function(a){var r=new E(a.dateTime,t).getTimeDisplayText(),c=Math.round(F(a.temperatureKelvin)),i=Math.round(k(a.temperatureKelvin)),s={name:r,temp:e.isFahrenheit?i:c};n.push(s)})),Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(u.a,{container:!0,justify:"center",alignItems:"center",style:{marginTop:"30px"},children:Object(b.jsx)(u.a,{item:!0,children:Object(b.jsx)(D.a,{variant:"h5",children:e.day?"Temperatures for ".concat(new E(e.day.date,t).getDisplayText()):"Select the day to see the details"})})}),Object(b.jsx)(ce.a,{width:"100%",height:300,children:Object(b.jsxs)(ie.a,{width:730,height:250,data:n,barCategoryGap:5,children:[Object(b.jsx)(se.a,{dataKey:"name"}),Object(b.jsx)(oe.a,{}),Object(b.jsx)(ue.a,{label:!0,dataKey:"temp",fill:"#8884d8"})]})})]})},de=n(440),je=n(441),he=n(386),fe=n(442),be=n(443),me=function(e){return Object(b.jsxs)(de.a,{component:"fieldset",children:[Object(b.jsx)(je.a,{component:"legend",children:"Settings"}),Object(b.jsxs)(he.a,{children:[Object(b.jsx)(f.a,{control:Object(b.jsx)(fe.a,{checked:e.useNightPartsInPredictions,onChange:function(t){e.onUseNightPartsInPredictionsChanged(t.target.checked)}}),label:"Consider night hours when calculating the day weather"}),Object(b.jsx)(f.a,{control:Object(b.jsx)(fe.a,{checked:e.discardDaysWithTooFiewPartsToAnalyze,onChange:function(t){e.onDiscardDaysWithTooFiewPartsToAnalyzeChanged(t.target.checked)}}),label:"Discard days with too fiew parts to analyze"})]}),Object(b.jsx)(be.a,{children:"Change these settings to fine tune predictions"})]})},Oe=n(444),ge=Object(o.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary}}})),xe=function(e){var t=Object(i.b)(),n=ge(),r=Object(d.a)(),c=Object(l.a)(r.breakpoints.up("md")),o=Object(a.useState)(!0),j=Object(s.a)(o,2),h=j[0],f=j[1],m=Object(a.useState)(0),O=Object(s.a)(m,2),x=O[0],y=O[1],p=Object(i.c)(Q),v=Object(a.useState)(!1),T=Object(s.a)(v,2),P=T[0],I=T[1],C=Object(a.useState)(!0),S=Object(s.a)(C,2),F=S[0],k=S[1],Z=Object(i.c)(J),M=Object(i.c)(V),H=p.filter((function(e){var t=te(e,P);return F?t.length>=4:t.length>=1}));function N(e){var t=3*e;return H.slice(t,t+3)}var z,E=N(x),q=x>0,A=N(x+1).length>0,K=Object(a.useState)(null),W=Object(s.a)(K,2),U=W[0],B=W[1];return z=U?p.find((function(e){return e.date===U})):void 0,Object(b.jsx)("div",{className:n.root,style:{width:c?"".concat(r.breakpoints.values.md,"px"):"100%",marginLeft:"auto",marginRight:"auto"},children:Object(b.jsxs)(u.a,{container:!0,spacing:1,style:{padding:"20px"},children:[Object(b.jsx)(u.a,{item:!0,xs:12,children:Object(b.jsxs)(u.a,{container:!0,justify:"center",alignItems:"center",direction:"column",children:[Object(b.jsx)(u.a,{item:!0,children:Object(b.jsxs)(D.a,{variant:"h4",children:["The weather for ","".concat(Z,", ").concat(M)]})}),Object(b.jsx)(u.a,{item:!0,children:Object(b.jsx)(Oe.a,{onClick:function(){t(Y.actions.clearQuery(null))},children:"change"})})]})}),Object(b.jsx)(u.a,{item:!0,xs:12,children:Object(b.jsx)(g,{isFahrenheit:h,onTemperatureModeChanged:function(e){f(e)}})}),Object(b.jsx)(u.a,{item:!0,xs:12,children:Object(b.jsx)(w,{enablePrevPage:q,enableNextPage:A,page:x,onPageChanged:function(e){y(e)}})}),Object(b.jsx)(u.a,{item:!0,xs:12,children:Object(b.jsx)(re,{useNightPartsInPredictions:P,selectedCard:U,onSelectCard:function(e){B(e)},isFahrenheit:h,days:E})}),Object(b.jsx)(u.a,{item:!0,xs:12,children:Object(b.jsx)(le,{day:z,isFahrenheit:h})}),Object(b.jsx)(u.a,{item:!0,xs:12,children:Object(b.jsx)(u.a,{container:!0,justify:"center",children:Object(b.jsx)(u.a,{item:!0,children:Object(b.jsx)(me,{useNightPartsInPredictions:P,onUseNightPartsInPredictionsChanged:function(e){I(e),y(0),B(null)},discardDaysWithTooFiewPartsToAnalyze:F,onDiscardDaysWithTooFiewPartsToAnalyzeChanged:function(e){k(e),y(0),B(null)}})})})})]})})},ye=n(449),pe=n(446),ve=n(445),we=Object(o.a)((function(e){return Object(ye.a)({root:{"& > *":{margin:e.spacing(1),width:"25ch"}}})})),Te=function(e){var t=Object(i.b)(),n=Object(i.c)(B),r=Object(i.c)(L),c="idle"===n,o="failed"===n,l="loading"===n,d=we(),j=Object(i.c)(R),h=Object(a.useState)("Munich"),f=Object(s.a)(h,2),m=f[0],O=f[1],g=Object(a.useRef)(null);Object(a.useEffect)((function(){g.current&&(g.current.focus(),g.current.select())}),[]),Object(a.useEffect)((function(){c&&z(j)&&t(X(j))}),[n,t,j]);var x=function(){t(Y.actions.setQuery({query:m}))};return Object(b.jsxs)(u.a,{container:!0,spacing:2,direction:"column",justify:"center",alignItems:"center",children:[Object(b.jsxs)(u.a,{item:!0,xs:12,children:[o&&Object(b.jsx)(b.Fragment,{}),Object(b.jsxs)("form",{className:d.root,noValidate:!0,autoComplete:"off",children:[Object(b.jsx)(pe.a,{inputRef:g,label:"Location",variant:"outlined",size:"small",value:m,onChange:function(e){O(e.target.value)},onKeyPress:function(e){"Enter"==e.key&&(e.preventDefault(),x())}}),Object(b.jsx)(C.a,{variant:"contained",color:"primary",onClick:function(){x()},children:"Search"})]})]}),Object(b.jsxs)(u.a,{item:!0,xs:12,children:[o&&Object(b.jsxs)(D.a,{variant:"h5",color:"error",children:["Error: ",r]}),l&&Object(b.jsx)(ve.a,{color:"secondary"})]})]})},Pe=function(e){return"succeeded"===Object(i.c)(B)?Object(b.jsx)(xe,{}):Object(b.jsx)(Te,{})},Ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,450)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))},Ce=(n(382),Object(W.a)({reducer:{forecast:Y.reducer}}));c.a.render(Object(b.jsx)(i.a,{store:Ce,children:Object(b.jsx)(Pe,{})}),document.getElementById("root")),Ie()}},[[383,1,2]]]);
//# sourceMappingURL=main.32ee83df.chunk.js.map