const app = new Vue({
  el: '#app',
  data: {
    pictures: [],
    userId: '',
    name: '',
    url: '',
    description: '',
  },
  created() {
    this.retrieveAndSetPicture()
  },
  methods: {
    add: () => {
      const payload = {
        'userId': app.userId,
        'name': app.name,
        'url': app.url,
        'description': app.description
      }
      axios.post('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev', payload)
        .then(() => {
          alert('success!')
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    },
    retrieveAndSetPicture: () => {
      alert('success!')
      const payload = {
        'userId': "3"
      }
      axios.get('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev', {params: payload})
        .then((response) => {
          console.log(response)
          app.components = response.data || []
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }
})
