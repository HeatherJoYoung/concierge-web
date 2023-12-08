import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import DiningManagement from '@/components/mgmt/DiningManagement.vue'
import { useReservationsStore } from '@/stores/reservations'
// import dayjs from  'dayjs'

describe('DiningManagement', () => {
  let wrapper
  let store

  /* const mockAddDiningReservation = vi.fn()
  const mockUpdateDiningReservation = vi.fn()
  const mockDeleteDiningReservation = vi.fn()
  const mockFetchDiningReservations = vi.fn()
 */
  let mockDiningReservations = [
    {
      id: 1,
      table_id: 1,
      first_name: 'John',
      last_name: 'Green',
      email: 'jgreen@mail.com',
      phone: null,
      res_time: '2023-12-04T19:00:00.000Z',
      duration: null,
      guest_count: 4
    },
    {
      id: 2,
      table_id: 2,
      first_name: 'Joe',
      last_name: 'Johnson',
      email: 'joejack@mail.com',
      phone: null,
      res_time: '2023-12-04T21:00:00.000Z',
      duration: null,
      guest_count: 5
    }
  ]

  let mockReservations = [
    {
      id: 1,
      table_id: 1,
      first_name: 'John',
      last_name: 'Green',
      email: 'jgreen@mail.com',
      phone: null,
      res_time: '2023-12-04T19:00:00.000Z',
      duration: null,
      guest_count: 4,
      date: '12/4/23',
      time: '7:00 pm',
      client: 'John Green'
    },
    {
      id: 2,
      table_id: 2,
      first_name: 'Joe',
      last_name: 'Johnson',
      email: 'joejack@mail.com',
      phone: null,
      res_time: '2023-12-04T21:00:00.000Z',
      duration: null,
      guest_count: 5,
      date: '12/4/23',
      time: '9:00 pm',
      client: 'Joe Johnson'
    }
  ]

  beforeEach(() => {
    /* useReservationsStore = defineStore('reservations', {
      getters: {
        getDiningReservations: mockDiningReservations,
        loadingDiningReservations: false
      },
      actions: {
        addDiningReservation: mockAddDiningReservation,
        updateDiningReservation: mockUpdateDiningReservation,
        deleteDiningReservation: mockDeleteDiningReservation,
        fetchDiningReservations: mockFetchDiningReservations
      }
    }) */

    wrapper = shallowMount(DiningManagement, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            reservations: {
              reservationsDining: mockDiningReservations,
              loadingDiningReservations: false
            }
          }
        })]
      }
    })

    store = useReservationsStore()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
    wrapper.unmount()
  })

  // MOUNTED
  it('calls fetchDiningReservations before mounting', () => {
    expect(store.fetchDiningReservations).toHaveBeenCalled()
  })
  // COMPUTED
  it('hasReservations returns true when there are reservations', () => {
    expect(wrapper.vm.hasReservations).toBe(true)
  })
  it('hasReservations returns false when there are no reservations', async () => {
    store.reservationsDining = []
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.hasReservations).toBe(false)
  })
  it('reservations should return diningReservations properly formatted', () => {
    expect(wrapper.vm.reservations).toEqual(mockReservations)
  })
  it('reservations should return an empty array when there are no reservations', () => {
    store.reservationsDining = []
    expect(wrapper.vm.reservations).toEqual([])
  })
  // METHODS
  it('deleteReservation should call deleteDiningReservation with id', async () => {
    await wrapper.vm.deleteReservation({ id: 4 })
    expect(store.deleteDiningReservation).toHaveBeenCalledWith(4)
  })
  it('updateReservation should call updateDiningReservation action with properly formatted payload', async () => {
    await wrapper.vm.updateReservation(mockReservations[1])
    expect(store.updateDiningReservation).toHaveBeenCalledWith({
      id: 2,
      tableId: 2,
      firstName: 'Joe',
      lastName: 'Johnson',
      resTime: '2023-12-04T21:00:00',
      guestCount: 5
    })
  })
})
