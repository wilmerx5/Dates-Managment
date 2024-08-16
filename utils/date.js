
import { format, formatISO, parse } from "date-fns";


export function convertToISO(strDate){
    const newDate = parse(strDate,'dd/MM/yyyy',new Date())
    return (formatISO(newDate))
}


export function formatDate(date){
    return format(date,'PPPP')
}