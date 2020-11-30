import { createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import createWrapperHelper from '@/test/helpers/createWrapperHelper'
import page from '../profile.vue'
import {
  getters as gettersMembership,
  state as stateMembership,
} from '~/store/membership'

const localVue = createLocalVue()
localVue.use(Vuex)

const createWrapper = createWrapperHelper({
  stubs: {
    NuxtLink: RouterLinkStub,
  },
})

describe('data bindings with vuex store, and user email exist', function () {
  const mockEmail = 'example@example.com'
  let storeOptions
  beforeEach(() => {
    storeOptions = {
      modules: {
        membership: {
          namespaced: true,
          state: stateMembership(),
          getters: gettersMembership,
        },
      },
    }
    storeOptions.modules.membership.state.user.email = mockEmail
  })

  test('should show the email of the current member in profile page', function () {
    const wrapper = createWrapper(page, {
      localVue,
      store: new Vuex.Store(storeOptions),
    })
    const currentMemberEmail = wrapper.get('.current-member-email')
    expect(currentMemberEmail.text()).toBe(mockEmail)
  })
})
