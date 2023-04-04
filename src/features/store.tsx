import { configureStore } from '@reduxjs/toolkit'
import { Todo }  from './todo'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({baseUrl: "https://localhost:7049/api/"}),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getAll:builder.query<Todo[], void>({
            query: () => `todos`,
            providesTags: [{type: "Todos", id: "LIST"}],
        }),
        updateTodoStatus: builder.mutation<Todo, Todo>({
           query(todo){
            return {
                url: `todos/${todo.id}`,
                method: 'Patch',
                body: [{  
                    "path": "/isCompleted",
                    "op": "replace",
                    "value": `${todo.isCompleted}`,
                  }]
            };
           },
           invalidatesTags: [{type: "Todos",  id: "LIST"}]
        }),
        addNewTodo: builder.mutation<Todo, Todo>({
            query(todo){
             return {
                 url: `todos`,
                 method: 'Post',
                 body: todo
             };
            },
            invalidatesTags: [{type: "Todos",  id: "LIST"}]
         })
    }),    
}) 

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
},)

export type RootState = ReturnType<typeof store.getState>;