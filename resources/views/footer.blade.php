</main>

<div class="csrf-token">
	{{ csrf_field() }}
</div>

<footer class="footer__wrapper">
	<div class="footer__container container">
		<div class="footer__attribution">
			By <a href="https://stephanwagner.me" target="_blank">Stephan Wagner</a>
		</div>
		<nav class="footer__nav" data-locale="{{ App::getLocale() }}">
			<ul>
				<li><span{!! App::isLocale('en') ? '' : ' class="link" onclick="setLocale(\'en\')"' !!}>English</span></li>
				<li><span{!! App::isLocale('de') ? '' : ' class="link" onclick="setLocale(\'de\')"' !!}>Deutsch</span></li>
			</ul>
		</nav>
	</div>
</footer>

</div>

<script src="/js/main.js"></script>

</body>
</html>
