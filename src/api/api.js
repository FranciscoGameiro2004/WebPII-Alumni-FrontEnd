import fetchMock from "fetch-mock";
import games from './mocks/mocks' //TODO: REVERTER DEPOIS PARA O FICHEIRO MOCKS ORIGINAL DEPOIS DE O MODIFICAR

fetchMock.mock('http://localhost:5174/games', games)

/**
 * GET utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endPoint - this is endpoint of the API
 * @returns a promise object with the response
 */
export async function get(apiBaseUrl, endPoint){
    try {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`)
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

/**
 * POST utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endPoint - this is endpoint of the API
 * @param {string} data - this is the data that will be sent to the server
 * @returns a promise object with the response
 */
export async function post(apiBaseUrl, endPoint, data){
    try {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

/**
 * PUT utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endPoint - this is endpoint of the API
 * @param {string} data - this is the data that will be sent to the server
 * @returns a promise object with the response
 */
export async function put(apiBaseUrl, endPoint, data){
    try {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

/**
 * PATCH utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endPoint - this is endpoint of the API
 * @param {string} data - this is the data that will be sent to the server
 * @returns a promise object with the response
 */
export async function patch(apiBaseUrl, endPoint, data){
    try {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

/**
 * DELETE utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endPoint - this is endpoint of the API
 * @param {string} data - this is the data that will be sent to the server
 * @returns a promise object with the response
 */
export async function del(apiBaseUrl, endPoint, data){
    try {
        const response = await fetch(`${apiBaseUrl}/${endPoint}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

/**
 * Response handling
 * @param {string} response - a promise object with the response of the server
 * @returns the response of the server
 */
async function handleResponse(response){
    if (!response.ok){
        const errorMessage = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorMessage}`)
    }
    const data = await response.json()
    return data
}