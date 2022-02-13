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
    onFileChange: (event) => {
      this.file = event.currentTarget.files[0]
    },
    add() {
      // ********************
      // *** UPLOAD PHOTO ***
      // ********************
      let formData = new FormData()
      formData.append('file', file)
      // get extension
      fileExtension = file.type.replace(/image\//i, '')
        axios({
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
            'X-HTTP-Method-Override': 'PUT',
          },
          url: 'https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev/img.pictures/' + app.userId + '_' + '01.' + fileExtension,
          data: formData
        })
        .then((response) => {
          console.debug(response)
        })
        .catch((err) => {
          console.error(err)
        })
        // *******************
        // *** UPLOAD DATA ***
        // *******************
        const payload = {
          'userId': app.userId,
          'name': app.name,
          'url': app.url,
          'description': app.description
        }
        axios.post('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev', payload)
        .then((response) => {
          console.debug(response)
          this.retrieveAndSetPicture()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    retrieveAndSetPicture() {
      console.log('called retrieveAndSetPicture methods')
      const payload = {
        'userId': "3"
      }
      axios.get('https://dtv8xadmd9.execute-api.ap-northeast-1.amazonaws.com/dev', {params: payload})
        .then((response) => {
          console.debug(response)
          this.$data.pictures = response.data.Items || []
        })
        .catch((err) => {
          // console.log(err.response.data.error)
          console.error(err)
        })
    }
  }
})
