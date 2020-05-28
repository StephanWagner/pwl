</main>

<footer>
	<div class="container">
		<nav class="footer-nav" data-locale="{{ App::getLocale() }}">
			<ul>
				<li><span{!! App::isLocale('en') ? '' : ' onclick="setLocale(\'en\')"' !!}>English</span></li>
				<li><span{!! App::isLocale('de') ? '' : ' onclick="setLocale(\'de\')"' !!}>Deutsch</span></li>
			</ul>
		</nav>
	</div>
</footer>

<script src="/js/main.js"></script>

</body>
</html>
