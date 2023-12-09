import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import EventsManagement from '@/components/mgmt/EventsManagement.vue'
import { useEventsStore } from '@/stores/events'
import { useReservationsStore } from '@/stores/reservations'
// import dayjs from  'dayjs'

describe('EventsManagement', () => {
  let wrapper
  let eventStore
  let reservationStore

  let mockEvents = [
    {
      id: 1,
      capacity: 40,
      contact_name: 'Andy Cohen',
      contact_email: 'andy1@mail.com',
      contact_phone: '555-123-4567',
      event_location: 'Opera House',
      title: 'La Scala Opera Trip',
      descript: 'An evening at the La Scala Opera House.',
      start_time: '2023-10-20T19:30:00.000Z',
      end_time: '2023-10-20T23:00:00.000Z'
    },
    {
      id: 4,
      capacity: 156,
      contact_name: 'Michael Smith',
      contact_email: 'michael1@mail.com',
      contact_phone: '888-555-1234',
      event_location: 'Grand Ballroom',
      title: 'Charity Gala',
      descript: 'An elegant charity gala to support a good cause with live music and fine dining.',
      start_time: '2023-12-10T19:00:00.000Z',
      end_time: '2023-12-10T23:00:00.000Z'
    }
  ]
  
  let mockEventsRows = [
    {
      id: 1,
      capacity: 40,
      contactName: 'Andy Cohen',
      contactEmail: 'andy1@mail.com',
      contactPhone: '555-123-4567',
      eventLocation: 'Opera House',
      title: 'La Scala Opera Trip',
      descript: 'An evening at ...',
      startTime: '2023-10-20T19:30:00.000Z',
      endTime: '2023-10-20T23:00:00.000Z'
    },
    {
      id: 4,
      capacity: 156,
      contactName: 'Michael Smith',
      contactEmail: 'michael1@mail.com',
      contactPhone: '888-555-1234',
      eventLocation: 'Grand Ballroom',
      title: 'Charity Gala',
      descript: 'An elegant cha...',
      startTime: '2023-12-10T19:00:00.000Z',
      endTime: '2023-12-10T23:00:00.000Z'
    }
  ]

  let mockEventReservations = [
    {
      id: 1,
      event_id: 4,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      res_time: null,
      party_count: 4
    },
    {
      id: 2,
      event_id: 4,
      first_name: 'Elizabeth',
      last_name: 'Tudor',
      email: 'etudor@mail.com',
      phone: '666-456-7890',
      res_time: null,
      party_count: 2
    }
  ]

  let mockResRows = [
    {
      id: 1,
      event_id: 4,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      res_time: null,
      party_count: 4,
      eventName: 'Charity Gala',
      client: 'John Doe',
      date: '12/10/23'
    },
    {
      id: 2,
      event_id: 4,
      first_name: 'Elizabeth',
      last_name: 'Tudor',
      email: 'etudor@mail.com',
      phone: '666-456-7890',
      res_time: null,
      party_count: 2,
      eventName: 'Charity Gala',
      client: 'Elizabeth Tudor',
      date: '12/10/23'
    }
  ]

  beforeEach(() => {
    wrapper = shallowMount(EventsManagement, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            events: {
              events: mockEvents,
              loadingEvents: false
            },
            reservations: {
              reservationsEvents: mockEventReservations,
              loadingEventReservations: false
            }
          }
        })]
      }
    })

    eventStore = useEventsStore()
    reservationStore = useReservationsStore()
  })

  afterEach(() => {
    vi.resetAllMocks()
    wrapper.unmount()
  })

  // MOUNTED
  it('calls fetchEvents before mounting', () => {
    expect(eventStore.fetchEvents).toHaveBeenCalled()
  })
  it('calls fetchEventReservations before mounting', () => {
    expect(reservationStore.fetchEventReservations).toHaveBeenCalled()
  })
  // COMPUTED
  it('eventsRows should return events properly formatted', () => {
    expect(wrapper.vm.eventsRows).toEqual(mockEventsRows)
  })
  it('eventsRows should return an empty array when there are no events', () => {
    eventStore.events = []
    expect(wrapper.vm.eventsRows).toEqual([])
  })
  it('resRows should return event reservations properly formatted', () => {
    expect(wrapper.vm.resRows).toEqual(mockResRows)
  })
  it('resRows should return an empty array when there are no reservations', () => {
    reservationStore.reservationsEvents = []
    expect(wrapper.vm.reservations).toEqual([])
  })
  // METHODS
  it('handleAddEvent should call addEvent with args', async () => {
    await wrapper.vm.handleAddEvent({ id: 4 })
    expect(eventStore.addEvent).toHaveBeenCalledWith({ id: 4 })
  })
  it('handleDeleteEvent should call deleteEvent with id', async () => {
    await wrapper.vm.deleteReservation({ id: 4 })
    expect(reservationStore.deleteEventReservation).toHaveBeenCalledWith(4)
  })
  it('updateReservation should call updateEventReservation action with properly formatted payload', async () => {
    await wrapper.vm.updateReservation(mockResRows[1])
    expect(reservationStore.updateEventReservation).toHaveBeenCalledWith({
      id: 2,
      event_id: 4,
      first_name: 'Elizabeth',
      last_name: 'Tudor',
      email: 'etudor@mail.com',
      phone: '666-456-7890',
      res_time: null,
      party_count: 2
    })
  })
})
