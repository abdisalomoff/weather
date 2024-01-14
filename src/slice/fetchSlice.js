import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const weather = createAsyncThunk('weather', async (url) =>{
   try{
    const response = await fetch(url) 
    const data = await response.json()
    return data
   }catch(error){
    console.error();
   }

})

const getCityWeather = createSlice({
    name: 'weather',
    initialState: {
        loading: false,
        cityWeather: [],
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(weather.pending, (state) => {
                state.loading = true
            })
            .addCase(weather.fulfilled, (state, action) => {
                state.loading = false;
                state.cityWeather = action.payload;
                if (action.payload.message === 'Page Not Found') {
                    state.error = true;
                    state.errorMessage = action.payload.message;
                }
            })
            .addCase(weather.rejected, (state) => {
                state.loading = false;
                state.error = true
            })
            
    }
})

export default getCityWeather.reducer