import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "adminApi",
    tagTypes: ["User", "Customers", "Projects", "Tickets"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
          }),
        addProjects: build.mutation({
            query: (project) => ({
                url: "client/projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),
        updateProjects: build.mutation({
            query: ({ id, project }) => ({
                url: `client/projects/${id}`,
                method: "PUT",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),
        getProjects: build.query ({
            query: () => "client/projects",
            providesTags: ["Projects"],

        }),
        deleteProjects: build.mutation({
            query: (id) => ({
                url: `client/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),
        getTickets: build.query ({
            query: () => "client/tickets",
            providesTags: ["Tickets"],

        }),
    }),
})

export const {useGetUserQuery,useGetCustomersQuery,useGetProjectsQuery,useAddProjectsMutation,useUpdateProjectsMutation,useDeleteProjectsMutation, useGetTicketsQuery}= api;

