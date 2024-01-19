import type { ILocal } from "$lib/interface"

export function getLocalCode(local: ILocal){
    switch(local){
        case 'en':
            return 'en-US'
        case 'fr':
            return 'fr-FR'
        default:
            return 'fr-FR'
    }
}