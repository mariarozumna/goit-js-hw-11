import{i as m,S as h}from"./assets/vendor-5b791d57.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".form"),n=document.querySelector(".gallery"),a=document.createElement("span");a.classList.add("loader"),o.addEventListener("submit",s);function s(l){l.preventDefault();const d=o.querySelector(".input").value;if(!d.trim()){m.warning({title:"Warning",message:"Please enter a search query."});return}t(),fetch(`https://pixabay.com/api//?key=41927866-cfb01af7ede59fae11104cea9&q=${d}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>r.json()).then(r=>{r.hits.length>0?e(r.hits):m.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}).catch(r=>{console.error("Error fetching data:",r),m.error({title:"Error",message:"An error occurred while fetching data. Please try again!"})}).finally(()=>{i(),o.reset()})}function e(l){n.innerHTML="",l.forEach(c=>{const u=document.createElement("li"),r=document.createElement("a"),f=document.createElement("img");r.href=c.largeImageURL,f.src=c.webformatURL,f.alt=c.tags,r.appendChild(f),u.appendChild(r),n.appendChild(u)}),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function t(){o.appendChild(a)}function i(){o.contains(a)&&o.removeChild(a)}});
//# sourceMappingURL=commonHelpers.js.map