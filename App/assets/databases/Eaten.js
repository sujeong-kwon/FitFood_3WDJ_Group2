import * as SQLite from 'expo-sqlite';
import {BaseModel, types} from 'expo-sqlite-orm';

export default class Eaten extends BaseModel {
    
    constructor(obj) {
        super(obj);
    }

    static get database() {
        return async () => SQLite.openDatabase('database.fitfood');
    }

    static get tableName() {
        return 'eatens';
    }

    static get columnMapping() {
        var date;
        var month;

        if(new Date().getMonth()+1 < 10) 
            month='0' + (new Date().getMonth()+1);
        else 
            month= new Date().getMonth()+1;
        

        if(new Date().getDate()<10) 
            date='0' + (new Date().getDate());
        else 
            date=new Date().getDate();
        

        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        
        var min;
        if(new Date().getMinutes()<10) 
            min='0' + new Date().getMinutes();
        else 
            min= new Date().getMinutes();
        

        var text = Number(year +''+ month +''+ date + '' + hours + '' + min); 

        console.log("현재 시각",text);

        return {
            id: {type: types.INTEGER , primary_key: true},
            timestamp: {type: types.INTEGER, default: ()=>text},
            food_name: {type: types.TEXT, not_null: true},
            user_email: {type: types.TEXT, not_null: true}
        }
    }
}