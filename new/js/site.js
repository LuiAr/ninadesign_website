/* Nina Design - site behaviour: navigation, home slideshow, image lightbox.
   Plain ES5-compatible JavaScript, no dependencies. */

(function () {
	"use strict";

	/* ---------- Navigation ---------- */

	function initNav() {
		var toggle = document.querySelector(".nav-toggle");
		var nav = document.getElementById("site-nav");
		if (!toggle || !nav) {
			return;
		}
		toggle.addEventListener("click", function () {
			var open = nav.classList.toggle("is-open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
	}

	/* ---------- Home slideshow ---------- */

	function initSlideshow() {
		var stage = document.querySelector("[data-slideshow]");
		if (!stage) {
			return;
		}
		var slides = stage.querySelectorAll("img");
		if (slides.length < 2) {
			return;
		}
		var index = 0;
		window.setInterval(function () {
			slides[index].classList.remove("is-active");
			index = (index + 1) % slides.length;
			slides[index].classList.add("is-active");
		}, 4000);
	}

	/* ---------- Lightbox ---------- */

	function initLightbox() {
		var links = document.querySelectorAll("a[data-gallery]");
		if (!links.length) {
			return;
		}

		var groups = {};
		for (var i = 0; i < links.length; i++) {
			var name = links[i].getAttribute("data-gallery");
			if (!groups[name]) {
				groups[name] = [];
			}
			groups[name].push(links[i]);
		}

		var overlay = document.createElement("div");
		overlay.className = "lb";
		overlay.setAttribute("role", "dialog");
		overlay.setAttribute("aria-modal", "true");
		overlay.setAttribute("aria-label", "Bildvisning");
		overlay.innerHTML =
			'<div class="lb-stage">' +
			'<figure class="lb-figure">' +
			'<img alt="">' +
			'<figcaption class="lb-caption"></figcaption>' +
			"</figure>" +
			"</div>" +
			'<div class="lb-bar">' +
			'<button type="button" class="lb-btn" data-lb="prev" aria-label="F&ouml;reg&aring;ende bild">' +
			'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H6"></path><path d="M12 5l-7 7 7 7"></path></svg>' +
			"</button>" +
			'<span class="lb-count" data-lb="count"></span>' +
			'<button type="button" class="lb-btn" data-lb="next" aria-label="N&auml;sta bild">' +
			'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"></path><path d="M12 5l7 7-7 7"></path></svg>' +
			"</button>" +
			'<button type="button" class="lb-btn" data-lb="close">St&auml;ng' +
			'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>' +
			"</button>" +
			"</div>";
		document.body.appendChild(overlay);

		var image = overlay.querySelector("img");
		var caption = overlay.querySelector(".lb-caption");
		var counter = overlay.querySelector('[data-lb="count"]');
		var prevButton = overlay.querySelector('[data-lb="prev"]');
		var nextButton = overlay.querySelector('[data-lb="next"]');
		var closeButton = overlay.querySelector('[data-lb="close"]');

		var current = [];
		var position = 0;
		var lastFocus = null;

		function preload(src) {
			if (!src) {
				return;
			}
			var loader = new Image();
			loader.src = src;
		}

		function show(next) {
			position = (next + current.length) % current.length;
			var link = current[position];
			image.src = link.getAttribute("href");
			var text = link.getAttribute("data-caption") || "";
			image.alt = text;
			caption.textContent = text;
			counter.textContent = position + 1 + " / " + current.length;
			var single = current.length < 2;
			prevButton.hidden = single;
			nextButton.hidden = single;
			counter.hidden = single;
			if (!single) {
				preload(current[(position + 1) % current.length].getAttribute("href"));
				preload(current[(position - 1 + current.length) % current.length].getAttribute("href"));
			}
		}

		function open(link) {
			current = groups[link.getAttribute("data-gallery")] || [link];
			lastFocus = document.activeElement;
			overlay.classList.add("is-open");
			document.body.classList.add("lb-locked");
			show(current.indexOf(link));
			closeButton.focus();
		}

		function close() {
			overlay.classList.remove("is-open");
			document.body.classList.remove("lb-locked");
			image.removeAttribute("src");
			if (lastFocus && lastFocus.focus) {
				lastFocus.focus();
			}
		}

		for (var j = 0; j < links.length; j++) {
			(function (link) {
				link.addEventListener("click", function (event) {
					event.preventDefault();
					open(link);
				});
			})(links[j]);
		}

		prevButton.addEventListener("click", function () {
			show(position - 1);
		});
		nextButton.addEventListener("click", function () {
			show(position + 1);
		});
		closeButton.addEventListener("click", close);

		overlay.addEventListener("click", function (event) {
			if (event.target === overlay || event.target.classList.contains("lb-stage")) {
				close();
			}
		});

		document.addEventListener("keydown", function (event) {
			if (!overlay.classList.contains("is-open")) {
				return;
			}
			if (event.key === "Escape") {
				close();
			} else if (event.key === "ArrowRight") {
				show(position + 1);
			} else if (event.key === "ArrowLeft") {
				show(position - 1);
			}
		});
	}

	function init() {
		initNav();
		initSlideshow();
		initLightbox();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
