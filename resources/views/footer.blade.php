</main>

<footer class="footer__wrapper">
	<div class="footer__container container">
		<div class="footer__attribution">
			By <a href="https://stephanwagner.me" target="_blank">Stephan Wagner</a>
		</div>
		<nav class="footer__nav" data-locale="{{ App::getLocale() }}">
			<ul>
				<li><span class="link"{!! App::isLocale('en') ? '' : ' onclick="setLocale(\'en\')"' !!}>English</span></li>
				<li><span class="link"{!! App::isLocale('de') ? '' : ' onclick="setLocale(\'de\')"' !!}>Deutsch</span></li>
			</ul>
		</nav>
	</div>
</footer>

</div>

<script src="/js/main.js"></script>

</body>
</html>
