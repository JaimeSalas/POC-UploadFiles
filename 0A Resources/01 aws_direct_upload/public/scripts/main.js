// The client code is responsible of two things:
//     1. Retrieve a signed request from the app with wich the image can be PUT to S3
//     2. Actually PUT the image to S3 using the signed request


(() => {
    document.getElementById('file-input').onchange = () => {
        const files = document.getElementById('file-input').files;
        const file = files[0];
        if (file === null) {
            console.log('No file selected');
        }
        getSignedRequest(file);
    };
    
    /*
        The code also determines the file object itself to be uploaded. If one has been selected 
        properly, it proceeds to call a function to obtain a signed PUT request for the file. Next
        write a function that accepts the file object and retrieves an appropiate signed request
        for it from the app.
    */
    const getSignedRequest = (file) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    uploadFile(file, response.signedRequest, response.url);
                    // console.log(response.signedRequest);
                    // console.log(response.url);
                } else {
                    console.log('Could not get signed URL');
                }
            } 
        };
        xhr.send();
    };

    /*
        If getSignedRequest was successful, continues with upload. 
    */
    const uploadFile = (file, signedRequest, url) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById('preview').src = url;
                    document.getElementById('avatar-url').value = url;
                } else {
                    console.log('Could not upload file');
                }
            } 
        };
        xhr.send(file);
    };
})();