<template>
  <span>
		<HomeJumbotron/>
		<HomeContext/> 
		<HomeIntroduce/>
	</span>
</template>

<script>
import HomeJumbotron from './HomeJumbotron'
import HomeContext   from './HomeContext'
import HomeIntroduce from './HomeIntroduce'

export default {
		name: 'home',
		components: {
			HomeJumbotron,
			HomeContext,
			HomeIntroduce,
		}
	}
</script>
