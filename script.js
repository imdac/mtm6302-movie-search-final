
const $form = $('#form')
const $search = $('#search')
const $results = $('#results')

$form.on('submit', function (event) {
  event.preventDefault()

  $.ajax({
    url: `http://www.omdbapi.com/?apikey=1c482164&s=${$search.val()}&type=movie`,
    method: 'get',
    dataType: 'json'
  })
    .done(function (data) {
      if (data.Search.length) {
        console.log(data)
        const results = []
        for (const item of data.Search) {
          results.push(`
            <div class="card">
              <div class="card-image">
                <img class="card-img-top" src="${item.Poster}" alt="${item.Title}">
              </div>
              <div class="card-body">
                <h5 class="card-title">${item.Title} (${item.Year})</h5>
                <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank">Go to IMDb</a>
              </div>
            </div>`)
        }
        $results.html(results.join(''))
      } else {
        $results.text('<em>No results</em>')
      }
    })
    .fail(function (err) {
      console.log(err)
    })
})
