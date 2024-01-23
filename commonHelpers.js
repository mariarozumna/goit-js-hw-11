import{S as L,i as d}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&u(i)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const l=document.querySelector(".form"),o=document.querySelector(".gallery"),c=document.createElement("div"),u=new L(".gallery a",{captionsData:"alt",captionDelay:250});l.addEventListener("submit",e);function e(n){n.preventDefault();const s=l.elements.input.value;if(o.innerHTML="",!s.trim()){d.warning({title:"Warning",message:"Please enter a search query.",messageSize:"20px",messageColor:"#808080",backgroundColor:"#e7fc44",position:"topLeft",timeout:3e3});return}m(),t(s).then(r=>{r.hits.length===0&&d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:5e3}),o.innerHTML=i(r.hits),u.refresh()}).catch(r=>{console.error("Error fetching data:",r),d.error({title:"Error",message:"An error occurred while fetching data. Please try again!"})}).finally(()=>{f(),l.reset()})}function t(n){return fetch(`https://pixabay.com/api/?key=41927866-cfb01af7ede59fae11104cea9&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`).then(a=>{if(!a.ok)throw new Error(a.status);return a.json()})}function i(n){return n.map(({comments:s,downloads:r,largeImageURL:a,likes:g,webformatURL:h,tags:p,views:y})=>`<li class="gallery-item">
          <a class="gallery-link" href="${a}">
            <img class="gallery-image" src="${h}" alt="${p}">
            <ul class="gallery-item-description">
              <li>Likes: ${g}</li>
              <li>Views: ${y}</li>
              <li>Downloads: ${r}</li>
              <li>Comments: ${s}</li>
            </ul>
          </a>
        </li>`).join("")}function f(){setTimeout(()=>{c.classList.add("hidden")},500)}function m(){c.classList.remove("hidden")}});
//# sourceMappingURL=commonHelpers.js.map