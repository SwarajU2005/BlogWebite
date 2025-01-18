export const API_NOTIFICATION_MESSEAGES = {
    loading: {
        title:'loading...',
        messeage:'Data is being loaded'
    },
    success: {
        title:'Success',
        messeage:'Data successfully loaded'
    },
    responseFailure: {
        title:'Error',
        messeage:'Error occured while fetching from the server. please try again'
    },
    requestFailure: {
        title:'Error',
        messeage:'An error occured while parsing the requested data'
        //backened se issue hai
    },
    networkError: {
        title:'loading...',
        messeage:'Unable to connect to server. check internet and try again later'
    }
}


export const SERVICE_URLS = {
    userSignup: {url:'/signup', method:'POST'},
    userLogin: {url:'/login', method:'POST'}
}