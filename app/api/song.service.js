// const fetch = require('node-fetch');

// export const fetchSong = () => {
//     fetch('http://localhost:5000')
//         .then((response) => response.body)
//         .then((rb) => {
//             const reader = rb.getReader();

//             return new ReadableStream({
//                 start(controller) {
//                     // The following function handles each data chunk
//                     function push() {
//                         // "done" is a Boolean and value a "Uint8Array"
//                         reader.read().then(({ done, value }) => {
//                             // If there is no more data to read
//                             if (done) {
//                                 console.log('done', done);
//                                 controller.close();
//                                 return;
//                             }
//                             // Get the data and send it to the browser via the controller
//                             controller.enqueue(value);
//                             // Check chunks by logging to the console
//                             console.log(done, value);
//                             push();
//                         });
//                     }

//                     push();
//                 }
//             });
//         })
//         .then((stream) => {
//             // Respond with our stream
//             return new Response(stream, {
//                 headers: { 'Content-Type': 'text/html' }
//             }).text();
//         })
//         .then((result) => {
//             // Do things with result
//             console.log(result);
//         });
// };

export const fetchSong = async () => {
    var xhr = new XMLHttpRequest();
    await xhr.open('GET', 'http://localhost:5000', true);
    // xhr.overrideMimeType('text/plain; charset=x-user-defined');

    xhr.addEventListener('progress', updateProgress, false);

    xhr.onreadystatechange = function () {
        // console.log('state change.. state: ' + xhr.readyState);

        if (xhr.readyState == 3) {
            // console.log('newData: <<' + xhr.response + '>>');
        }
    };

    xhr.addEventListener('error', function (e) {
        console.log('error: ' + e);
    });

    function updateProgress(oEvent) {
        if (oEvent.lengthComputable) {
            console.log('loading');
            var percentComplete = (oEvent.loaded / oEvent.total) * 100;
            // ...
            console.log(percentComplete);
        } else {
            console.log('something happening');
        }
    }
    xhr.send(null);
};

// function load_binary_resource(url) {
//     req.send(null);
//     if (req.status != 200) return '';
//     return req.responseText;
// }
