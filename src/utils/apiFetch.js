export const URL_API = "http://localhost:3000/api/v1";

export const apiFetch = (url, init) => new Promise((resolver) => {
    let rnt = {error: undefined, response: undefined, status: undefined}
    fetch(URL_API + "/" + url, {
        ...init,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    .then(async (response) => {
        const responseJson = await response.json();

        if(response.status === 500)
            resolver({...rnt, error: responseJson, status: response.status})

        resolver({...rnt, response: responseJson, status: response.status})
    }).catch((error) => {
        resolver({...rnt, error, status: error.status})
    })
})