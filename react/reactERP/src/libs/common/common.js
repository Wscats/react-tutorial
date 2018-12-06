import {EventEmitter} from 'events'

export default {
    state: {
        component1: {
            count: 0
        },
        component2: {
            count: 0
        }
    },
    event: new EventEmitter(),
    addEvent(name, e){
        this.event.on(name, e)
    }
}

