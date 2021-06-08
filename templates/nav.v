<style>
	.drop {
		font-size: 14px;
		font-weight: 600;
		color: #1d1d1d;
		display: block;
		text-align: center;
		margin: 5px 0;
	}
	.drop:focus {
		outline: auto;
	}
	@media (max-width: 767.98px) {
		.drop {
			color: #fff;
			margin-bottom: 15px;
			width: max-content;
		}
		.drop:last-child {
			margin-bottom: 0;
		}
	}
    .cover {
        background-image: url(storage/6d4f01867a70efd927e319c5ccaede88.jpg);    
        background-blend-mode: multiply;
        background-repeat: no-repeat; 
        background-attachment: fixed;
        background-position: center;
        min-height: calc(100vh - 50px);
        background-size: cover;
        position: relative;
        z-index: 1;
    }    
    .cover::before {
        content: "";
        inset: 0;
        z-index: -1;
        position: absolute;
        background-color: #24293294;
        backdrop-filter: blur(2px);
    }
</style>
<xo-navbar theme="water">
	<xo-navbar-item slot="brand">
		<xo-icon icon="sun" width="30" height="30" color="#fff" slot="prefix"></xo-icon>
		Hello there
	</xo-navbar-item>
	<xo-navbar-item dropdown>
			DropDown List
			<xo-icon icon="arrowDown" color="#fff" width="22" height="22" slot="prefix"></xo-icon>
			<a href="#" class="drop" slot="dropdown">hello there</a>
			<a href="#" class="drop" slot="dropdown">hello there</a>
			<a href="#" class="drop" slot="dropdown">hello there</a>
			<a href="#" class="drop" slot="dropdown">hello there</a>
	</xo-navbar-item>
	<xo-navbar-item @click="spa.send(this.url);" url="/signin" local>
		Sign In
		<xo-icon icon="lock" color="#fff" width="22" height="22" slot="prefix"></xo-icon>
	</xo-navbar-item>
	<xo-navbar-item @click="spa.send(this.url);" url="/signup" local>
		Sign Up
		<xo-icon icon="personPlus" color="#fff" width="22" height="22" slot="prefix"></xo-icon>
	</xo-navbar-item>
</xo-navbar>