import {instance} from '../../api/instance'

export const packListAPI = {
  getPack() {
    return instance.get('/cards/pack')
  },
}



