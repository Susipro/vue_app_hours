import {createStore} from 'vuex'
import router from '../router'

export default createStore({
    state: {
        signs: [],
        sign: {
            id: '',
            day: '0',
            month: '0',
            year: '0',
            date: '',
            workDeliveryNote: '',
            companyName: '',
            workHours: 0,
            nightHours: 0,
            holidaysHours: 0,
            sleepAway: false,
            urgency: false
        },
        payrollData: {
            baseSalary: 1701,
            irpf: 12,
            ss: 6,
            doubtHours: 0
        },
        payrollStatus: false,
        editStatus: false,
        showSign: true,
        showList: false,
        showCalculate: false,
        showProfile: false,
        navBtnFlag: true,
        user: null,
        error: {type: null, message: null}
    },
    mutations: {
        setError(state, payload) {
            if (payload === null) {
                return state.error = {type: null, message: null}
            }
            if (payload === "EMAIL_NOT_FOUND") {
                return state.error = {type: 'email', message: 'Email no registrado'}
            }
            if (payload === "EMAIL_EXISTS") {
                return state.error = {type: 'email', message: 'Email ya en uso'}
            }
            if (payload === "INVALID_EMAIL") {
                return state.error = {type: 'email', message: 'Email incorrecto'}
            }
            if (payload === "INVALID_PASSWORD") {
                return state.error = {type: 'password', message: 'Contraseña incorrecta'}
            }
        },
        setUser(state, payload) {
            state.user = payload
        },
        load(state, payload) {
            state.signs = payload
        },
        loadPayroll(state, payload) {
          state.payrollData = payload;
        },
        set(state, payload) {
            state.signs.push(payload)
        },
        delete(state, payload) {
            state.signs = state.signs.filter(item => item.id !== payload)
        },
        update(state, payload) {
            let updatedSign = {
                id: payload.id,
                day: payload.day,
                month: payload.month,
                year: payload.year,
                date: payload.date,
                workDeliveryNote: payload.workDeliveryNote,
                companyName: payload.companyName,
                workHours: payload.workHours,
                nightHours: payload.nightHours,
                holidaysHours: payload.holidaysHours,
                sleepAway: payload.sleepAway,
                urgency: payload.urgency
            }

            const signIndex = state.signs.findIndex(s => s.id === payload.id);
            state.signs[signIndex] = updatedSign;

            // state.signs = state.signs.map(item => item.id === payload.id ? payload : item)

            // new Noty({
            //   theme: 'sunset',
            //   type: 'success',
            //   timeout: 2000,
            //   layout: "bottomRight",
            //   text: 'Fichaje Actualizado'
            // }).show();
        },
        edit(state, payload) {
            state.sign = state.signs.find(item => item.id === payload);

            window.scroll({
                top: 100,
                left: 100,
                behavior: 'smooth'
            });
        },
        editPayrollData(state, payload){
            state.payrollData = payload;
        },
        clear(state) {
            state.sign = {
                id: '',
                day: 0,
                month: 0,
                year: 0,
                date: '',
                workDeliveryNote: 0,
                companyName: '',
                workHours: 0,
                nightHours: 0,
                holidaysHours: 0,
                sleepAway: false,
                urgency: false
            }
        },
        showList(state) {
            state.showList = !state.showList;
        },
        showSign(state) {
            state.showSign = !state.showSign;
        },
        showCount(state) {
          state.showCalculate = !state.showCalculate;
        },
        showProfile(state) {
          state.showProfile = !state.showProfile;
        },
        editStatus(state) {
            state.editStatus = !state.editStatus;
        },
        editPayrollStatus(state){
            state.payrollStatus = !state.payrollStatus;
        }
    },
    actions: {
        logOut({commit}) {
            commit('setUser', null)
            router.push('/login')
            sessionStorage.removeItem('user')
        },
        async userLogin({commit}, user) {
            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=APIKEY', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json();
                if (userDB.error) {
                    console.table(userDB.error)
                    return commit('setError', userDB.error.message)
                }
                commit('setUser', userDB)
                commit('setError', null)
                router.push('/')
                sessionStorage.setItem('user', JSON.stringify(userDB))
            } catch (e) {
                console.log(e)
            }
        },
        async userRegister({commit}, user) {
            try {
                const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=APIKEY', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: user.email,
                        password: user.password,
                        returnSecureToken: true
                    })
                })
                const userDB = await res.json()
                // console.log(userDB)
                if (userDB.error) {
                    console.table(userDB.error)
                    return commit('setError', userDB.error.message)
                }
                commit('setUser', userDB)
                commit('setError', null)
                router.push('/')
                sessionStorage.setItem('item', JSON.stringify(userDB))
            } catch (e) {
                console.log(e)
            }
        },

        async firebaseLoad({commit, state}) {
            if (sessionStorage.getItem('user')) {
                commit('setUser', JSON.parse(sessionStorage.getItem('user')))
            }
            if (!sessionStorage.getItem('user')) {
                return commit('setUser', null)
            }
            try {
                const res = await fetch(`https://vitorino-api-default-rtdb.europe-west1.firebasedatabase.app/signs/${state.user.localId}.json?auth=${state.user.idToken}`)
                const dataDB = await res.json()
                const firebaseSigns = []
                for (const id in dataDB) {
                    firebaseSigns.push(dataDB[id])
                }
                // const resPayroll = await
                commit('load', firebaseSigns);
            } catch (e) {
                console.log(e)
            }
        },

        async setSign({commit, state}, sign) {
            try {
                let day = sign.date.charAt(8)+sign.date.charAt(9);
                let month = sign.date.charAt(5)+sign.date.charAt(6);
                let year = sign.date.charAt(0)+sign.date.charAt(1)+sign.date.charAt(2)+sign.date.charAt(3);
                sign.day = day;
                sign.month = month;
                sign.year = year;

                const res = await fetch(`https://vitorino-api-default-rtdb.europe-west1.firebasedatabase.app/signs/${state.user.localId}/${sign.id}.json?auth=${state.user.idToken}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sign)
                })

                const dataDB = await res.json();
            } catch (e) {
                console.log(e)
            }
            commit('set', sign)
        },

        async deleteSign({commit, state}, id) {
            try {
                await fetch(`https://vitorino-api-default-rtdb.europe-west1.firebasedatabase.app/signs/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
                    method: 'DELETE'
                })
            } catch (e) {
                console.log(e)
            }
            commit('delete', id)
        },
        editSign({commit}, id) {
            commit('edit', id)
            commit('editStatus')
            commit('showList')
            commit('showSign')
        },

        async updateSign({commit, state}, sign) {
            try {
                let day = sign.date.charAt(8)+sign.date.charAt(9);
                let month = sign.date.charAt(5)+sign.date.charAt(6);
                let year = sign.date.charAt(0)+sign.date.charAt(1)+sign.date.charAt(2)+sign.date.charAt(3);
                sign.day = day;
                sign.month = month;
                sign.year = year;
                console.log(month);
                console.log(sign.month);
                const res = await fetch(`https://vitorino-api-default-rtdb.europe-west1.firebasedatabase.app/signs/${state.user.localId}/${sign.id}.json?auth=${state.user.idToken}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sign)
                })
                commit('update', sign);
                commit('editStatus');
                commit('showList');
                commit('showSign');
            } catch (e) {
                console.log(e)
            }
        },

        async updatePayrollData({commit, state}, payrollData){
            commit('editPayrollData', payrollData)
        },

        clearSign({commit}) {
            commit('clear')
        },

        changeEditStatus({commit}) {
            commit('editStatus')
        },

        changeShowSign({commit}) {
            commit('showSign')
        },

        changeShowList({commit}) {

            commit('showList')
            commit('showSign')
        },
        changeShowCount({commit}) {

        },
        changePayrollStatus({commit}){
            commit('editPayrollStatus')
        }
    },
    getters: {
        authUser(state) {
            return !!state.user
        },
        getDays(state) {
            return state.signs;
        },
    },
    modules: {}
})
