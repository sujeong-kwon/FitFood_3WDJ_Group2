<template>
<div>
    <div v-for="item in reviews" :key="item.id">
        <h1>타이틀 : {{item.review_title}}</h1>
        <p>리뷰 아이디 : {{item.review_id}}</p>
        <p>리뷰 메세지 : {{item.review_message}}</p>
        <p>이미지 : {{item.review_image_rating}}</p>
        <p>유저 아이디 : {{item.user_id}}</p>
        <p>가게 아이디 : {{item.store_id}}</p>
        <p>만든 날짜 : {{item.created_at}}</p>
        <p>수정 날짜 : {{item.updated_at}}</p>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ReviewTest',
	data(){
        return {
            reviews:null
        }
    },
    created() {
        this.getReviews()
    },
    methods: {
        getReviews() {
           axios
            .get('/api/review_test')
            .then(res => {
                const {data:{data}} =res
                this.reviews = data
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
	}
</script>
