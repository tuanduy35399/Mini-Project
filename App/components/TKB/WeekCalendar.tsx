import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import {addDays, format, getDate, isSameDay, startOfWeek} from 'date-fns'

type Props = {
    date: Date;
    onChange: (value: Date) => void;
  }


  const WeekCalendar: React.FC<Props> = ({date, onChange}) => {
    const [week, setWeek] = useState<WeekDay[]>([]);
    useEffect(()=>{
        const weekDays = layTuan(date);
        setWeek(weekDays);
    }, [date]);

    return (
        <View style = {styles.container}>
            {week.map(weekDay => {
                const textStyles = [styles.label];
                const touchable = [styles.touchable];
                const sameDay = isSameDay(weekDay.date, date);
                if (sameDay){
                    textStyles.push(styles.selectLabel);
                    touchable.push(styles.selectedTouchable);
                }
                return( <View style={styles.weekDayItem} key = {weekDay.dinhDang}> 
                    <Text style={styles.weekDayText}>{weekDay.dinhDang}</Text>
                    <TouchableOpacity onPress={()=> onChange(weekDay.date)} style ={touchable}>
                        <Text style = {textStyles}>{weekDay.ngay}</Text>
                    </TouchableOpacity>
                </View>
                );
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    weekDayText: {
        color: 'gray',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },
    selectLabel: {
        color: 'white'
    },
    touchable: {
        borderRadius: 20,
        padding : 7.5,
        height: 35,
        width: 35,
    },
    selectedTouchable: {
        backgroundColor: 'blue'
    },
    weekDayItem: {
        alignItems: 'center'
    }
})

type WeekDay = {
    dinhDang: string;
    date: Date;
    ngay: number;
}
  //get week days
export const layTuan = (date: Date): WeekDay[]  => {
    const ngayDauTien = startOfWeek(date, {weekStartsOn: 1});
    const ketQua = [];

    for(let i = 0; i < 7; i++){
        const date = addDays(ngayDauTien, i);
        ketQua.push({
            dinhDang: format(date, 'EEE'),
            date,
            ngay: getDate(date),
        });
    }
    
    return ketQua;
  }

export default WeekCalendar;