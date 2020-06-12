import Hash from '../server/global/crypto'

const hash = new Hash({ algorithm: 'sha256' })
export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.data = hash.depthObj(config.data, 'encryptoAES')
    config.url = hash.depthObj(config.url, 'encryptoAES')
  })
  $axios.onError((error) => {
    console.log('axios-error', error)
    const code = parseInt(error.response && error.response.status)
    code && redirect(`/${code}`)
  })
  $axios.onResponse((req) => {
    const { status } = req
    status !== 200 && redirect('/404')
  })
}
