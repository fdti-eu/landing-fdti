<button class="hamburger " aria-label="hamburger menu">
	<span class="hamburger__line" />
	<span class="hamburger__line" />
	<span class="hamburger__line" />
</button>

<style>

@media screen and (max-width: 639px){
	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 1.5rem;
		height: 1.3rem;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 10;
	}

	.hamburger__line {
		width: 1.5rem;
		height: 2px;
		background: #fff;
		border-radius: 2rem;
	}

}
	


</style>
