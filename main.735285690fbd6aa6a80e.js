(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{L1EO:function(e,n,t){},QfWi:function(e,n,t){"use strict";t.r(n);t("SgDD"),t("L1EO"),t("JBxO"),t("FdtR");var a={input:document.querySelector("#search-form"),galleryList:document.querySelector(".gallery"),spinner:document.querySelector(".spinner-border"),btnLoadMore:document.querySelector(".btn-primary"),spinneBtn:document.querySelector(".spinner-border-sm"),spanBtnLoadMore:document.querySelector(".loadSpan"),arrowTop:document.querySelector("#arrowTop")},o=t("Tsz3"),r=t.n(o),l=t("VYoj"),s=t.n(l);t("Q1vi"),t("czhI");s.a.options={closeButton:!0,debug:!0,newestOnTop:!1,progressBar:!0,positionClass:"toast-top-right",preventDuplicates:!1,showDuration:"300",hideDuration:"1000",timeOut:"2000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"};var i={searchQuery:"",page:1,fetchImages:function(){var e=this;if(""===this.searchQuery)return s.a.warning("Please enter a more specific querry!","Warning!"),void a.btnLoadMore.classList.add("is-hidden");var n="https://pixabay.com/api/?image_type=photo&orientation=horizontal&q="+this.searchQuery+"&page="+this.page+"&per_page=12&key=19717497-dac00bc00e9230cbef98621a0";return fetch(n).then((function(e){return e.json()})).then((function(n){var t=n.totalHits;if(0===(n=n.hits).length&&1===e.page)return s.a.warning("Please enter a more specific querry!","Warning!"),void a.btnLoadMore.classList.add("is-hidden");if(n.length>0){a.spinneBtn.classList.add("is-hidden");var o=r()(n);if(a.galleryList.insertAdjacentHTML("beforeend",o),e.page+=1,a.spanBtnLoadMore.classList.remove("sr-only"),e.largeImg(),(n.length<12||t===n.length*(e.page-1))&&a.btnLoadMore.classList.add("is-hidden"),e.page>2){var l=document.documentElement.clientHeight+document.documentElement.scrollTop;window.scrollTo({top:l,behavior:"smooth"})}}else;})).catch((function(e){a.galleryList.innerHTML="",a.btnLoadMore.classList.add("is-hidden"),s.a.error("No connection to server!","Error!"),console.log("ERROR!: ",e.message)}))},largeImg:function(){var e=document.querySelector(".photo-card img");console.log(e)},resetPage:function(){this.page=1},get query(){return this.searchQuery},set query(e){this.searchQuery=e}};function c(){i.fetchImages(),a.spinneBtn.classList.remove("is-hidden"),a.spanBtnLoadMore.classList.add("sr-only")}a.arrowTop.addEventListener("click",(function(){window.scrollTo(pageXOffset,0)})),window.addEventListener("scroll",(function(){a.arrowTop.hidden=pageYOffset<document.documentElement.clientHeight})),t("dcBu").create('\n    <img src="" alt="" >\n').show(),console.log("Hello HW13"),a.input.addEventListener("submit",(function(e){e.preventDefault(),a.galleryList.innerHTML="",a.btnLoadMore.classList.remove("is-hidden"),i.query=e.target[0].value.trim(),i.resetPage(),c()})),a.btnLoadMore.addEventListener("click",c)},Tsz3:function(e,n,t){var a=t("mp5j");e.exports=(a.default||a).template({1:function(e,n,t,a,o){var r,l=null!=n?n:e.nullContext||{},s=e.hooks.helperMissing,i="function",c=e.escapeExpression,d=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'<li class="article-item list">\r\n    <div class="photo-card">\r\n        <img src="'+c(typeof(r=null!=(r=d(t,"webformatURL")||(null!=n?d(n,"webformatURL"):n))?r:s)===i?r.call(l,{name:"webformatURL",hash:{},data:o,loc:{start:{line:4,column:18},end:{line:4,column:34}}}):r)+'" alt="photo of '+c(typeof(r=null!=(r=d(t,"tags")||(null!=n?d(n,"tags"):n))?r:s)===i?r.call(l,{name:"tags",hash:{},data:o,loc:{start:{line:4,column:50},end:{line:4,column:58}}}):r)+'" data-source=" '+c(typeof(r=null!=(r=d(t,"largeImageURL")||(null!=n?d(n,"largeImageURL"):n))?r:s)===i?r.call(l,{name:"largeImageURL",hash:{},data:o,loc:{start:{line:4,column:74},end:{line:4,column:91}}}):r)+'" />\r\n\r\n        <div class="stats">\r\n            <p class="stats-item">\r\n                <i class="material-icons">thumb_up</i>\r\n                '+c(typeof(r=null!=(r=d(t,"likes")||(null!=n?d(n,"likes"):n))?r:s)===i?r.call(l,{name:"likes",hash:{},data:o,loc:{start:{line:9,column:16},end:{line:9,column:25}}}):r)+'\r\n            </p>\r\n            <p class="stats-item">\r\n                <i class="material-icons">visibility</i>\r\n                '+c(typeof(r=null!=(r=d(t,"views")||(null!=n?d(n,"views"):n))?r:s)===i?r.call(l,{name:"views",hash:{},data:o,loc:{start:{line:13,column:16},end:{line:13,column:25}}}):r)+'\r\n            </p>\r\n            <p class="stats-item">\r\n                <i class="material-icons">comment</i>\r\n                '+c(typeof(r=null!=(r=d(t,"comments")||(null!=n?d(n,"comments"):n))?r:s)===i?r.call(l,{name:"comments",hash:{},data:o,loc:{start:{line:17,column:16},end:{line:17,column:28}}}):r)+'\r\n            </p>\r\n            <p class="stats-item">\r\n                <i class="material-icons">cloud_download</i>\r\n                '+c(typeof(r=null!=(r=d(t,"downloads")||(null!=n?d(n,"downloads"):n))?r:s)===i?r.call(l,{name:"downloads",hash:{},data:o,loc:{start:{line:21,column:16},end:{line:21,column:29}}}):r)+"\r\n            </p>\r\n        </div>\r\n    </div>\r\n</li>\r\n"},compiler:[8,">= 4.3.0"],main:function(e,n,t,a,o){var r;return null!=(r=(e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]})(t,"each").call(null!=n?n:e.nullContext||{},n,{name:"each",hash:{},fn:e.program(1,o,0),inverse:e.noop,data:o,loc:{start:{line:1,column:0},end:{line:26,column:9}}}))?r:""},useData:!0})}},[["QfWi",1,2]]]);
//# sourceMappingURL=main.735285690fbd6aa6a80e.js.map