<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.flex {
		display: flex;
	}

	.align-items_center {
		align-items: center;
	}

	.justify-content_between {
		justify-content: space-between;
	}

	.justify-content_center {
		justify-content: center;
	}

	.flex-f-d-c {
		flex-direction: column;
	}

	.flex-shrink {
		flex-shrink: 0;
	}

	.box {
		/* height: 100vh;
		overflow-y: hidden; */
		position: relative;
	}

	.fixed-top_box {
		position: sticky;
		top: 0;
		left: 0;
		width: 100vw;
		border-bottom: 5px solid #f8f8f8;
		background: #fff;
		z-index: 9999;
	}

	.container {
		background: #f8f8f8;
	}

	.text-align_justify {
		text-align-last: justify;
	}

	.text-align_right {
		text-align: right !important;
	}
</style>
