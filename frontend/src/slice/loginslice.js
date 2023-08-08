import  {createSlice} from  '@reduxjs/toolkit'

const loginslice = createSlice({

    name:'login',
    initialState:{
        isLoggediin:false,
        JWT : '',
        Role:'',
        Name:'',
        Email: ''

    },
    reducers:{
        
        login:(state ,data)=>{
            state.isLoggediin = true,
            state.JWT=data.payload.res_token
            ,
            state.Email=data.payload.res_email
            ,
            state.Name=data.payload.name,
            state.Role=data.payload.res_role

           
            // console.log(state.Name)
        },
    }
})

export  default  loginslice.reducer;
export const{login}=loginslice.actions