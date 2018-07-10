const host = 'http://localhost:8080'

export const get = (path) => {
  return new Promise(function (resolve, reject) {
    _request('GET', path).then(response => {
      console.log('GET.then', response);
      resolve(response)
    })
  })

}

const _request = (method, path = ``, data = {}) => {
  console.log(`${host}/${path}`);
  return fetch(`${host}/${path}`, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      // mode: 'no-cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => {
    console.log('fetch.then', response);
    //console.log('fetch.then', JSON.parse(response));
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        // Die folgende Funktion behandelt jeden Daten-Chunk
        function push() {
          // "done" ist ein Boolean und "value" ein "Uint8Array"
          return reader.read().then(({ done, value }) => {
            // Gibt es weitere Daten zu laden?
            if (done) {
              // Teile dem Browser mit, dass wir fertig mit dem Senden von Daten sind
              controller.close();
              return;
            }

            // Bekomme die Daten und sende diese an den Browser durch den Controller weiter
            controller.enqueue(value);
          }).then(push);
        };

        push();
      }
    });

    return new Response(stream, { headers: { "Content-Type": "application/json" } });
    //return JSON.parse(response.body)
  }) // parses response to JSON
  .catch(error => console.error(`Fetch Error =\n`, error));
}
