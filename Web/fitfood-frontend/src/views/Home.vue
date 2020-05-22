<template>
  <span>
		<HomeJumbotron/>
		<HomeContext/> 
		<HomeIntroduce/>
	</span>
</template>

<script>
import HomeJumbotron from '@/components/home/HomeJumbotron'
import HomeContext   from '@/components/home/HomeContext'
import HomeIntroduce from '@/components/home/HomeIntroduce'

export default {
		name: 'home',
		components: {
			HomeJumbotron,
			HomeContext,
			HomeIntroduce,
		}
	}
</script>
