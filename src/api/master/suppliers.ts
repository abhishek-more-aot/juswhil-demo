// import request from '@/utils/request'
// import { ISuppliersData } from '../types'

// export const defaultSuppliersData: ISuppliersData = {
//     id: 0,
//     enabled: true,
//     ownersId: '',
//     formName: '',
//     commission: 0,
//     openingBalance: 0,
//     closingBalance: 0,
//     contactNumber: '',
//     telephone: '',
//     faxNo: '',
//     email: '',
//     GST: '',
//     createdBy: 0,
//     createdTimestamp: '',
//     updatedBy: 0,
//     updatedTimestamp: '',
// }
// export const getSuppliers = (params: any) =>
//     request({
//         url: '/Suppliers',
//         method: 'get',
//         params
//     })

// export const getSuppliersById = (id: number) =>
//     request({
//         url: `/Suppliers/${id}`,
//         method: 'get'
//     })

// export const updateSuppliers = (id: number, data: any) =>
//     request({
//         url: `/Suppliers/${id}`,
//         method: 'patch',
//         data
//     })

// export const deleteSuppliers = (id: string) =>
//     request({
//         url: `/Suppliers/${id}`,
//         method: 'delete'
//     })

// export const createSuppliers = (data: any) =>
//     request({
//         url: '/Suppliers/',
//         method: 'post',
//         data
//     })
// export const getSuppliersCount = (params: any) =>
//     request({
//         url: '/Suppliers/count',
//         method: 'get',
//         params
//     })
