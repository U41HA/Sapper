export function setRecordList(recordList: any, record: {}) {
    if (recordList) {
      recordList.push(record)
    } else {
      recordList = [record]
      console.log(recordList)
    }
    
    if (localStorage.recordList) {
      let localeList = JSON.parse(localStorage.recordList)
      localeList.push(record)
      console.log(localeList)
      localStorage.setItem('recordList', JSON.stringify(localeList))
    } else {
      localStorage.setItem('recordList', JSON.stringify([record]))
    }
  }