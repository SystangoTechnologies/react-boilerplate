import sha1 from 'sha1'
const MEDIA_LOADED = 'MEDIA_LOADED'

export const mediaId = url => sha1(url)
export const isVideo = url => url.match(/\.mp4/)

export default function (state = {}, action = {}) {
  switch (action.type) {
    case MEDIA_LOADED:
      return { ...state, [mediaId(action.url)]: { url: action.url } }
    default:
      return state
  }
}

export const mediaLoaded = url => ({ type: MEDIA_LOADED, url })
