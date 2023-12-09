import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import SpaManagement from '@/components/mgmt/SpaManagement.vue'
import { useSpaStore } from '@/stores/spa'
import { useReservationsStore } from '@/stores/reservations'

describe('SpaManagement', () => {
  let wrapper
  let spaStore
  let reservationStore

  let mockSpaServices = [
    {
      id: 1,
      title: 'Hot Stone Massage',
      descript: '...'
    },
    {
      id: 2,
      title: 'Sport Massage',
      descript: '...'
    },
    {
      id: 3,
      title: 'Swedish Massage',
      descript: '...'
    }
  ]

  let mockServicesRowData = [
    {
      id: 1,
      service: 'Hot Stone Massage',
      descript: '...'
    },
    {
      id: 2,
      service: 'Sport Massage',
      descript: '...'
    },
    {
      id: 3,
      service: 'Swedish Massage',
      descript: '...'
    }
  ]
  
  let mockTherapists = [
    {
      id: 1,
      first_name: 'Ingrid',
      last_name: 'Huber',
      email: null,
      phone: null
    },
    {
      id: 2,
      first_name: 'Makai',
      last_name: 'Lynch',
      email: null,
      phone: null
    },
    {
      id: 3,
      first_name: 'Nate',
      last_name: 'Montes',
      email: null,
      phone: null
    },
    {
      id: 4,
      first_name: 'Rhett',
      last_name: 'Sherman',
      email: null,
      phone: null
    }
  ]

  let mockSpaReservations = [
    {
      id: 6,
      therapist_id: 2,
      spa_service: 1,
      client_name: 'Jon Snow',
      client_email: 'jsnow@mail.com',
      client_phone: '333-456-7890',
      res_start_time: '2024-01-22T10:00:00.000Z',
      res_end_time: '2024-01-22T11:00:00.000Z'
    },
    {
      id: 7,
      therapist_id: 4,
      spa_service: 1,
      client_name: 'Holly Winter',
      client_email: 'hwinter@mail.com',
      client_phone: '515-456-7891',
      res_start_time: '2024-01-23T14:00:00.000Z',
      res_end_time: '2024-01-23T15:00:00.000Z'
    } 
  ]

  let mockReservations = [
    {
      id: 6,
      therapist_id: 2,
      spa_service: 1,
      client_name: 'Jon Snow',
      client_email: 'jsnow@mail.com',
      client_phone: '333-456-7890',
      res_start_time: '2024-01-22T10:00:00.000Z',
      res_end_time: '2024-01-22T11:00:00.000Z',
      date: ('1/22/2024'),
      time: ('10:00 am'),
      duration: 60,
      client: 'Jon Snow',
      staff: 'Makai Lynch',
      service: 'Hot Stone Massage'
    },
    {
      id: 7,
      therapist_id: 4,
      spa_service: 1,
      client_name: 'Holly Winter',
      client_email: 'hwinter@mail.com',
      client_phone: '515-456-7891',
      res_start_time: '2024-01-23T14:00:00.000Z',
      res_end_time: '2024-01-23T15:00:00.000Z',
      date: ('1/23/2024'),
      time: ('2:00 pm'),
      duration: 60,
      client: 'Holly Winter',
      staff: 'Rhett Sherman',
      service: 'Hot Stone Massage'
    } 
  ]

  beforeEach(() => {
    wrapper = shallowMount(SpaManagement, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            spa: {
              loadingSpaServices: false,
              loadingTherapists: false,
              spaServices: mockSpaServices,
              therapists: mockTherapists
            },
            reservations: {
              reservationsSpa: mockSpaReservations,
              loadingSpaReservations: false
            }
          }
        })]
      }
    })

    spaStore = useSpaStore()
    reservationStore = useReservationsStore()
  })

  afterEach(() => {
    vi.resetAllMocks()
    wrapper.unmount()
  })

  // MOUNTED
 /*  it('calls fetchSpaService before mounting if spaServices is empty', async () => {
    spaStore.spaServices = []
    expect(spaStore.fetchSpaServices).toHaveBeenCalled()
  })
  it('calls fetchTherapists before mounting if therapists is empty', async () => {
    spaStore.therapists = []
    expect(spaStore.fetchTherapists).toHaveBeenCalled()
  }) */
  it('calls fetchSpaReservations before mounting', () => {
    expect(reservationStore.fetchSpaReservations).toHaveBeenCalled()
  })
  // COMPUTED
  it('servicesRowData should return services properly formatted', () => {
    expect(wrapper.vm.servicesRowData).toEqual(mockServicesRowData)
  })
  it('servicesRowData should return an empty array when there are no services', () => {
    spaStore.spaServices = []
    expect(wrapper.vm.servicesRowData).toEqual([])
  })
  it('reservations should return spa reservations properly formatted', () => {
    expect(wrapper.vm.reservations).toEqual(mockReservations)
  })
  it('reservations should return an empty array when there are no spa reservations', () => {
    reservationStore.reservationsSpa = []
    expect(wrapper.vm.reservations).toEqual([])
  })
  // METHODS
  it('addService should call addSpaService with args', async () => {
    await wrapper.vm.addService(mockServicesRowData[2])
    expect(spaStore.addSpaService).toHaveBeenCalledWith({
      title: 'Swedish Massage',
      descript: '...'
    })
  })
  it('deleteService should call deleteSpaService with object', async () => {
    await wrapper.vm.deleteService(mockServicesRowData[2])
    expect(spaStore.deleteSpaService).toHaveBeenCalledWith(mockServicesRowData[2])
  })
  it('updateReservation should call updateSpaReservation action with properly formatted payload', async () => {
    await wrapper.vm.updateReservation(mockReservations[1])
    expect(reservationStore.updateSpaReservation).toHaveBeenCalledWith({
      id: 7,
      resStartTime: '2024-01-23T14:00:00',
      resEndTime: '2024-01-23T15:00:00'
    })
  }),
  it('deleteReservation should call deleteSpaReservation with id', async () => {
    await wrapper.vm.deleteReservation(mockServicesRowData[2])
    expect(reservationStore.deleteSpaReservation).toHaveBeenCalledWith(3)
  })
})
