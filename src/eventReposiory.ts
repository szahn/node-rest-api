import IEvent from './interfaces/IEvent';
import uuidv1 from 'uuid/v1';
import moment from 'moment';
import {isNil, isEmpty, filter} from 'lodash';

export default class EventRepository {

    private events : Array<IEvent>;

    constructor(){
        this.events = new Array<IEvent>();
    }

    create(userId: string, eventType : string) : IEvent {        
        if (isNil(eventType) || isEmpty(eventType)) {
            throw new Error('Event type is missing');
        }

        if (isNil(userId) || isEmpty(userId)) {
            throw new Error('Event user id is missing');
        }

        const now = moment().unix();
        const eventId = uuidv1();
        const event : IEvent = {
            type: eventType,
            id: eventId, 
            userId: userId,
            created: now, 
            updated: now
        };

        this.events.push(event);

        console.log(`Created event #${eventId} (${eventType})`);

        return event;
    }

    getEvents(query) : IEvent[]{
        const {userId, sinceDays} = query;
        let filteredEvents = this.events;

        if (!isNil(userId) && !isEmpty(userId)) {
            filteredEvents = filter(filteredEvents, (e) => userId === e.userId);
        }

        if (!isNil(sinceDays) && sinceDays > 0) {
            const dateSince = moment().subtract(sinceDays, 'd').unix();
            filteredEvents = filter(filteredEvents, (e) => e.created >= dateSince);
        }

        return filteredEvents;
    }

}