<template>
    <v-layout justify-center>
        <v-flex xs12 sm12 md12 class="pa-5">
            <div class="display-1 green--text font-weight-bold" style="margin-bottom:30px; text-align:center;">
                NEWSTORE
            </div>
    
            <v-form>
                <span>
                <v-layout justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            type="input" label="업체명" v-model="storename" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="사업번호" v-model="businessnumber" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="전화번호" v-model="tall" required>
                        </v-text-field>
                    </v-flex>  
                </v-layout>

                <v-layout justify-center>
                    <v-btn-toggle v-model="footkind">
                        <v-btn
                            depressed text :value="1"
                            class="pl-4 pb-5 pr-4 pt-2 font-weight-bold title"
                            style="width:250px;">
                            <span stlyle="line-height:40px;">한식</span>
                        </v-btn>

                        <v-btn
                            depressed text :value="2"
                            class="pl-4 pb-5 pr-4 pt-2 font-weight-bold title"
                            style="width:250px;">
                            <span stlyle="line-height:40px;">일식</span>
                        </v-btn>

                         <v-btn
                            depressed text :value="2"
                            class="pl-4 pb-5 pr-4 pt-2 font-weight-bold title"
                            style="width:250px;">
                            <span stlyle="line-height:40px;">양식</span>
                        </v-btn>

                         <v-btn
                            depressed text :value="2"
                            class="pl-4 pb-5 pr-4 pt-2 font-weight-bold title"
                            style="width:250px;">
                            <span stlyle="line-height:40px;">중식</span>
                        </v-btn>
                    </v-btn-toggle>
                </v-layout>
                
                <v-layout justify-center style="margin-top:20px;">
                    <v-flex xs12 sm8 md5>
                        <v-text-field
                            type="input" label="주소" v-model="address" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm8 md1>
                        <v-btn color="success">우편 검색
                        </v-btn>
                    </v-flex>
                </v-layout>

                <v-layout class="mt-4 mb-4" justify-center >
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            type="input" label="가게 운영 시간" v-model="storetime" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="음식 나오는 시간" v-model="storecomeouttime" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout class="mt-4 mb-4" justify-center >
                    <v-flex xs12 sm8 md1>
                        <div class="green--text font-weight-bold">메뉴</div>
                    </v-flex>
                        <v-flex xs12 sm8 md5>
                        <v-btn color="success"  @click.stop="dialog = true">+추가</v-btn>
                         <v-dialog
                        v-model="dialog"
                        max-width="290"
                        >
                        <v-card>
                            <v-card-title class="green--text headline">메뉴 추가</v-card-title>

                            <v-card-text>
                                <v-btn color="success">사진 추가</v-btn>
                                <v-text-field
                                    type="input" label="메뉴 이름" required>
                                </v-text-field>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                            >
                                CANCEL
                            </v-btn>

                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                            >
                                SAVE
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>

                <v-layout justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-list >
                            <v-list-item
                                v-for="item in items"
                                :key="item.name">

                                <v-list-item-avatar>
                                <v-img :src="item.img"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                        </v-list>
                    </v-flex>
                </v-layout>

                    <v-card-actions>
                        <v-layout row wrap justify-center style="margin-top:30px;">
                            <v-flex xs12 sm8 md6>
                                <v-btn
                                    type="submit" form="check-register-form"
                                    color="success" large block
                                    class="headline font-weight-bold mt-3">
                                    확인
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>

                </span>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'Newstore',
    data(){
        return{
            dialog: false,
            storename:'', //업체명
            businessnumber:'', //사업번호
            tall:'', //전화번호
            footkind:this.footkind, //음식 종류
            address:'', //주소
            stoestoretimertime:'', // 가게 운영 시간
            storecomeouttime:'', //음식 나오는 시간
            items:[{
               name:'탕수육',
               img:'/static/menus/탕수육.jpg'
            },
            {
                name:'스시',
               img:'/static/menus/탕수육.jpg'
            }] // 사진 추가 리스트
        }
    }
}
</script>