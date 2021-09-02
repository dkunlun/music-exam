import Vue from 'vue'

export const login = (params) => {
    return Vue.http.post('/exam/api/sys/user/login', params)
}

export const onlinePaging = (params) => {
    return Vue.http.post('/exam/api/exam/exam/online-paging', params)
}

export const upload = (params) => {
    return Vue.http.post('/exam/api/qu/qu/uploadfile', params)
}

export const createPaper = (params) => {
    return Vue.http.post('/exam/api/paper/paper/create-paper', params)
}

export const paperDetail = (params) => {
    return Vue.http.post('/exam/api/paper/paper/paper-detail', params)
}

export const quDetail = (params) => {
    return Vue.http.post('/exam/api/paper/paper/qu-detail', params)
}

export const answer = (params) => {
    return Vue.http.post('/exam/api/paper/paper/fill-answer', params)
}