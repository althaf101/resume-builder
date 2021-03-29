const BASIC_INFO_CHANGE = "BASIC_INFO_CHANGE"

const initialState = {
  basic: {
    name: "",
    email: "",
    address: "",
    phone: ""
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
   case BASIC_INFO_CHANGE:
    return {
     ...state,
     basic: {
       [action.body.name]: action.body.value
     }
    }
   default:
    return state
  }
 }

 export const changeBasicInfo = (body) => ({
   type: BASIC_INFO_CHANGE,
   body
 })