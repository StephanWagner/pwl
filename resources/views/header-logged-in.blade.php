<header class="header__wrapper">
	<div class="container">
		<div class="logo_wrapper">
			<img src="/img/logo.svg" alt="">
		</div>
		<div class="header__name">
			{{ Auth::user()->name }}
		</div>
		<nav class="main-nav">
			<ul>
				<li><a href="{{ url('/logout') }}"><?=__('txt.logout');?></a></li>
			</ul>
		</nav>
	</div>
</header>
