function handleErrors(response) {
    if (!response.status === 200) {
        throw Error(response.statusText);
    }
    return response;
}

export default handleErrors;