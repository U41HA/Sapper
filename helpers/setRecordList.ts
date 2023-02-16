import { Ref } from "vue"
import { IRecord } from "~~/interface"
export async function setRecordList(recordList: Ref<IRecord[]>, record: IRecord, url: string) {
    if (recordList.value.length) {
        recordList.value.push(record)
    } else {
        recordList.value = [record]
    }

    // if (localStorage.recordList) {
    //     let localeList = JSON.parse(localStorage.recordList)
    //     localeList.push(record)
    //     localStorage.setItem('recordList', JSON.stringify(localeList))
    // } else {
    //     localStorage.setItem('recordList', JSON.stringify([record]))
    // }

    try {
        fetch(`${url}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(record)
        })
    }
    catch (error) {
        console.log(error)
    }
}
