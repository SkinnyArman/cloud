import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchError: false,
    errorCode:0,
    isLoggedIn:false,
    userId:null,
    userToken:null,
    userName:null,
    madeServer:null
  },
  getters: {
    fetchError(state) {
      return state.fetchError;
    },
    logState(state){
      return state.isLoggedIn
    },
    whichForm(state){
      return state.formMode
    },
    serverData(state){
      return state.madeServer
    },
    fetchErrorType(state){
      return state.errorCode
    },
    fetchName(state){
      return state.userName
    }
  },
  mutations: {
    errorMutation(state, payload) {
      state.fetchError = true;
      state.errorCode = payload
    },
    cleanErrors(state){
      state.fetchError=false
      state.errorCode=0
    },
    setUser(state,payload){
      state.isLoggedIn=true
      state.userId=payload.localId
      state.userToken=payload.userToken
      state.userName=payload.displayName
    },
    logout(state){
      state.isLoggedIn=false
      state.userId=null,
      state.userToken=null,
      state.userName=null,
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
    },
    makeServer(state,payload){
      state.madeServer={
        server:payload.server,
        serverPrice:payload.serverPrice,
        serverSize:payload.serverSize,
        serverCity:payload.serverCity,
        serverCountry:payload.serverCountry,
        serverType:payload.serverType,
        serverSettings:payload.serverSettings,
        serverQuantity:payload.serverQuantity,
        totalPrice:payload.totalPrice
      }
      },
  },
  actions: {
    async signup(context, payload) {
      context.dispatch("noErrors");
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoURRTwBATV3FcJ0eB6sY9fQS5qhmiAxc",
          {
            method: "POST",
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              displayName:
                payload.name.charAt(0).toUpperCase() +
                payload.name.slice(1) +
                " " +
                payload.lastName.charAt(0).toUpperCase() +
                payload.lastName.slice(1),
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);  


        context.commit('setUser',responseData);
        localStorage.setItem('token', responseData.idToken);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('userName', responseData.displayName);
        
        

      } catch (err) {
        context.commit("errorMutation",1);
      }

    },
    async login(context, payload) {
      context.dispatch("noErrors");
      //  try{
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoURRTwBATV3FcJ0eB6sY9fQS5qhmiAxc",
        {
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
          }),
        }
      ).then(res=>{
        if (res.ok){
          res.json().then(resp=>{
            console.log(resp)
            context.commit('setUser',resp);
            localStorage.setItem('token', resp.idToken);
            localStorage.setItem('userId', resp.localId);
           localStorage.setItem('userName', resp.displayName);
          })
        } else {
          console.log('oknotok')
          context.commit("errorMutation",400)
        }
         
        
      }
        )
      //  const responseData = await response.json();


      //  if(responseData.error.code==400){
      //    context.commit("errorMutation",400)
      //  }
      

      //  context.commit('setUser',responseData);
      //  localStorage.setItem('token', responseData.idToken);
      //  localStorage.setItem('userId', responseData.localId);
      //  localStorage.setItem('userName', responseData.displayName);

    //  } catch(responseData) {
    //    console.log(responseData)
    //    console.log('s')
    //    context.commit("errorMutation",1);
    //  }
  },
  logoutaction(context){
    context.commit('logout')
  },
  setServer(context,payload){
    context.commit('makeServer',payload)
  },
  noErrors(context){
    context.commit('cleanErrors')
  }
  },
  modules: {},
});
