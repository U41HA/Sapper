import { Ref } from "vue"
import { IRecord } from "~~/interface"

export function setRecordList(recordList: Ref<IRecord[]>, record: IRecord) {
    console.log(record)
    if (recordList.value.length) {
      recordList.value.push(record)
    } else {
      recordList.value = [record]
    }
    
    if (localStorage.recordList) {
      let localeList = JSON.parse(localStorage.recordList)
      localeList.push(record)
      localStorage.setItem('recordList', JSON.stringify(localeList))
    } else {
      localStorage.setItem('recordList', JSON.stringify([record]))
    }
  }