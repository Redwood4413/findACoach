import R from"./NotFound-318e5610.js";import{Q as N,e as k,f as D,u as C,L as V,M as $,a as j,o as u,c as H,b as B,w as U,g as w,h as G,t as Y,i as W,T as z,S as K,U as Q,p as J,k as X,d as Z}from"./index-42d548a4.js";import{_ as F}from"./CoachAddReviewForm-4317bef4.js";import{_ as E}from"./CoachWrapperHeader-e71b663c.js";import{s as tt}from"./sendingMachine-1e298bbc.js";import"./CoachAvatar-5a218491.js";var L={exports:{}};(function(a){var d=(()=>{var h=Object.defineProperty,s=Object.getOwnPropertySymbols,c=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,p=(_,r,o)=>r in _?h(_,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):_[r]=o,g=(_,r)=>{for(var o in r||(r={}))c.call(r,o)&&p(_,o,r[o]);if(s)for(var o of s(r))l.call(r,o)&&p(_,o,r[o]);return _},v=_=>h(_,"__esModule",{value:!0}),I=(_,r)=>{v(_);for(var o in r)h(_,o,{get:r[o],enumerable:!0})},f={};I(f,{DEFAULT_UUID_LENGTH:()=>S,default:()=>y});var M="4.4.4",S=6,A={dictionary:"alphanum",shuffle:!0,debug:!1,length:S},x=class extends Function{constructor(_={}){super(),this.dictIndex=0,this.dictRange=[],this.lowerBound=0,this.upperBound=0,this.dictLength=0,this._digit_first_ascii=48,this._digit_last_ascii=58,this._alpha_lower_first_ascii=97,this._alpha_lower_last_ascii=123,this._hex_last_ascii=103,this._alpha_upper_first_ascii=65,this._alpha_upper_last_ascii=91,this._number_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii]},this._alpha_dict_ranges={lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alpha_lower_dict_ranges={lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii]},this._alpha_upper_dict_ranges={upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alphanum_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._alphanum_lower_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],lowerCase:[this._alpha_lower_first_ascii,this._alpha_lower_last_ascii]},this._alphanum_upper_dict_ranges={digits:[this._digit_first_ascii,this._digit_last_ascii],upperCase:[this._alpha_upper_first_ascii,this._alpha_upper_last_ascii]},this._hex_dict_ranges={decDigits:[this._digit_first_ascii,this._digit_last_ascii],alphaDigits:[this._alpha_lower_first_ascii,this._hex_last_ascii]},this.log=(...t)=>{const e=[...t];if(e[0]=`[short-unique-id] ${t[0]}`,this.debug===!0&&typeof console<"u"&&console!==null)return console.log(...e)},this.setDictionary=(t,e)=>{let i;if(t&&Array.isArray(t)&&t.length>1)i=t;else{i=[];let n;this.dictIndex=n=0;const m=`_${t}_dict_ranges`,b=this[m];Object.keys(b).forEach(q=>{const T=q;for(this.dictRange=b[T],this.lowerBound=this.dictRange[0],this.upperBound=this.dictRange[1],this.dictIndex=n=this.lowerBound;this.lowerBound<=this.upperBound?n<this.upperBound:n>this.upperBound;this.dictIndex=this.lowerBound<=this.upperBound?n+=1:n-=1)i.push(String.fromCharCode(this.dictIndex))})}e&&(i=i.sort(()=>Math.random()-.5)),this.dict=i,this.dictLength=this.dict.length,this.counter=0},this.seq=()=>this.sequentialUUID(),this.sequentialUUID=()=>{let t,e,i="";t=this.counter;do e=t%this.dictLength,t=Math.trunc(t/this.dictLength),i+=this.dict[e];while(t!==0);return this.counter+=1,i},this.randomUUID=(t=this.uuidLength||S)=>{let e,i,n;if(t===null||typeof t>"u"||t<1)throw new Error("Invalid UUID Length Provided");for(e="",n=0;n<t;n+=1)i=parseInt((Math.random()*this.dictLength).toFixed(0),10)%this.dictLength,e+=this.dict[i];return e},this.availableUUIDs=(t=this.uuidLength)=>parseFloat(Math.pow([...new Set(this.dict)].length,t).toFixed(0)),this.approxMaxBeforeCollision=(t=this.availableUUIDs(this.uuidLength))=>parseFloat(Math.sqrt(Math.PI/2*t).toFixed(20)),this.collisionProbability=(t=this.availableUUIDs(this.uuidLength),e=this.uuidLength)=>parseFloat((this.approxMaxBeforeCollision(t)/this.availableUUIDs(e)).toFixed(20)),this.uniqueness=(t=this.availableUUIDs(this.uuidLength))=>{const e=parseFloat((1-this.approxMaxBeforeCollision(t)/t).toFixed(20));return e>1?1:e<0?0:e},this.getVersion=()=>this.version,this.stamp=t=>{if(typeof t!="number"||t<10)throw new Error("Param finalLength must be number greater than 10");const e=Math.floor(+new Date/1e3).toString(16),i=t-9,n=Math.round(Math.random()*(i>15?15:i)),m=this.randomUUID(i);return`${m.substr(0,n)}${e}${m.substr(n)}${n.toString(16)}`},this.parseStamp=t=>{if(t.length<10)throw new Error("Stamp length invalid");const e=parseInt(t.substr(t.length-1,1),16);return new Date(parseInt(t.substr(e,8),16)*1e3)};const r=g(g({},A),_);this.counter=0,this.debug=!1,this.dict=[],this.version=M;const{dictionary:o,shuffle:P,length:O}=r;return this.uuidLength=O,this.setDictionary(o,P),this.debug=r.debug,this.log(this.dict),this.log(`Generator instantiated with Dictionary Size ${this.dictLength}`),new Proxy(this,{apply:(t,e,i)=>this.randomUUID(...i)})}},y=x;return y.default=x,f})();a.exports=d.default,typeof window<"u"&&(d=d.default)})(L);var et=L.exports;const it=N(et),st={name:"CoachAddReview",props:{id:{type:String,required:!0}},data:()=>({errorMsg:""}),setup(){const a=k(),d=D(),h=C(),{state:s,send:c}=V(tt);return{coachesStore:a,authStore:d,reviewsStore:h,state:s,send:c}},methods:{async sendData(a){this.send("SEND");const h={reviewId:new it({length:8})(),userId:this.id,authorId:this.authStore.userId,description:a.description,rate:a.rate,createdAt:Date.now()};try{const{error:s}=await $.from("reviews").insert(h);if(s)throw new Error(s.message);this.send("SUCCESS"),await this.reviewsStore.reloadReviews(),setTimeout(()=>{this.$route.name==="add-review"&&this.$router.replace({name:"reviews",hash:h.reviewId})},this.state.context.timing)}catch(s){this.errorMsg=s,this.send("ERROR")}}},computed:{coach(){return this.coachesStore.getCoach(this.id)},isFound(){return!!this.coach}},async beforeRouteEnter(a,d,h){const s=C(),c=D();if(await s.fetchReviews(a.params.id),c.userId===a.params.id){h({name:"no-permissions"});return}if(s.isReviewFound(c.userId)){h({name:"no-permissions"});return}h()},components:{CoachWrapperHeader:E,NotFound:R,CoachAddReviewForm:F}};const rt=a=>(J("data-v-b2e3364c"),a=a(),X(),a),at={key:0,class:"add-review"},ot=rt(()=>Z("h3",null,"Your review has been added.",-1));function nt(a,d,h,s,c,l){const p=E,g=F,v=K,I=Q,f=R;return l.isFound?(u(),H("div",at,[B(p,{id:h.id},null,8,["id"]),B(z,{mode:"out-in"},{default:U(()=>[s.state.matches("empty")?(u(),w(g,{key:0,onAddReview:l.sendData,state:s.state.value},null,8,["onAddReview","state"])):s.state.matches("sent")?(u(),w(v,{key:1},{default:U(()=>[ot]),_:1})):s.state.matches("error")?(u(),w(I,{key:2},{default:U(()=>[G(Y(a.errorMsg),1)]),_:1})):W("",!0)]),_:1})])):(u(),w(f,{key:1,element:"Coach"}))}const pt=j(st,[["render",nt],["__scopeId","data-v-b2e3364c"]]);export{pt as default};
