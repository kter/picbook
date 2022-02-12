const app = new Vue({
  el: '#app',
  data: {
    pictures: [],
    userId: '',
    name: '',
    url: '',
    description: '',
    file: '',
  },
  created() {
    this.retrieveAndSetPicture()
  },
  methods: {
    add: () => {
      // upload photo
      let formData = new FormData()
      formData.append('files[]', file)
      axios.post('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev/img.pictures/3/', payload)
      // upload data
      const payload = {
        'userId': app.userId,
        'name': app.name,
        'url': app.url,
        'description': app.description
      }
      axios.post('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev', payload)
        .then((response) => {
          console.log(response)
          this.retrieveAndSetPicture()
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    },
    retrieveAndSetPicture: () => {
      const payload = {
        'userId': "3"
      }
      axios.get('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev', {params: payload})
        .then((response) => {
          console.log(response)
          app.pictures = response.data.Items || []
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }
})
