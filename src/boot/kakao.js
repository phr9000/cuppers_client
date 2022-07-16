import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  window.Kakao.init(process.env.KAKAO_API)
  // if (window.Kakao.isInitialized()) {
  //   console.log('kakao is initialized')
  // }
})
