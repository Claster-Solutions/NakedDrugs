const dateFull = (date: Date) => {
    const months = [
        'ledna',
        'února',
        'března',
        'dubna',
        'května',
        'června',
        'července',
        'srpna',
        'září',
        'října',
        'listopadu',
        'prosince',
    ]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day}. ${month} ${year}`
}

const dateShort = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}

const weekDay = (date: Date) => {
    const days = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
    return days[date.getDay()]
}

const getFullMonthName = (date: Date): string => {
    const month = date.getMonth()
    const months = [
        'leden',
        'únor',
        'březen',
        'duben',
        'květen',
        'červen',
        'červenec',
        'srpen',
        'září',
        'říjen',
        'listopad',
        'prosinec',
    ]
    return months[month]
}

const getFullMonthNameByIndex = (index: number): string => {
    const months = [
        'leden',
        'únor',
        'březen',
        'duben',
        'květen',
        'červen',
        'červenec',
        'srpen',
        'září',
        'říjen',
        'listopad',
        'prosinec',
    ]
    return months[index]
}

const getShortWeekDayName = (date: Date): string => {
    const day = date.getDay()
    const days = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
    return days[day]
}

const getShortWeekDayNameInterval = (startDate: Date, endDate: Date): string => {
    if (startDate.getDate() === endDate.getDate()) {
        return getShortWeekDayName(startDate)
    }
    const startDay = getShortWeekDayName(startDate)
    const endDay = getShortWeekDayName(endDate)
    return `${startDay}-${endDay}`
}

const getShortDateInterval = (startDate: Date, endDate: Date): string => {
    if (startDate.getDate() === endDate.getDate()) {
        return dateShort(startDate)
    }
    const startDay = startDate.getDate()
    const startMonth = startDate.getMonth() + 1
    const endDay = endDate.getDate()
    const endMonth = endDate.getMonth() + 1
    const endYear = endDate.getFullYear()
    return `${startDay}.-${endDay}.${endMonth}.${endYear}`
}

export const format = {
    dateFull,
    dateShort,
    weekDay,
    getShortWeekDayName,
    getShortWeekDayNameInterval,
    getFullMonthName,
    getShortDateInterval,
    getFullMonthNameByIndex,
}
