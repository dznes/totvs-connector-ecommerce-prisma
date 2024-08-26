// import { fetchToken, getProductionOrders } from '@/http/lib/totvs'
// import { FastifyInstance } from 'fastify'


// export async function ProductionOrderRoutes(app: FastifyInstance) {
//   app.get('/production-order/backup', async(request, reply) => {
//     try {
//       const token = await fetchToken()
//       const pageSize = 300
//       const daysStartFromToday = 720
//       const daysEndFromToday = 0
//       let page = 1
//       let isLastPage = false

//       // const { items, hasNext } = await getProductionOrders({ 
//       //   token: token.access_token, 
//       //   page,
//       //   pageSize, 
//       //   daysStartFromToday, 
//       //   daysEndFromToday,
//       // })

//       let productionOrderItems: any = []

//       while (!isLastPage) {
//         // Fetch the product prices from the API with the specified parameters
//         const { items, hasNext } = await getProductionOrders({ 
//           token: token.access_token, 
//           page,
//           pageSize, 
//           daysStartFromToday, 
//           daysEndFromToday,
//         })
  
//         // Upsert each SKU price into the database
//         items.map(async (lines: any) => {
//           if (lines.locations.length > 0 && lines.orderCode) {
//               lines.locations.forEach((item: any) => {
//                   let lineDetails = {
//                     code: `${lines.orderCode}-${item.productCode}`,
//                     location_code: item.locationCode || "",
//                     location_name: item.locationName || "",
//                     sku_code: item.productCode || "",
//                     sku_name: item.productName || "",
//                     reference_code: item.referenceCode || "",
//                     reference_name: item.referenceName || "",
//                     location_quantity: item.Quantity || 0,
//                     pending_quantity_sku: item.Quantity || 0,
//                     entry_date: item.entryDate || "",
//                     branch_code: lines.branchCode,
//                     cycle_code: lines.cycleCode,
//                     order_code: lines.orderCode,
//                     order_bar_code: lines.orderBarCode,
//                     quantity: lines.quantity,
//                     finished_quantity: lines.finishedQuantity,
//                     pending_quantity: lines.pendingQuantity,
//                     status: lines.status,
//                     priority: lines.priority,
//                     estimated_delivery_date: lines.estimatedDeliveryDate,
//                     insert_date: lines.insertDate,
//                     last_change_date: lines.lastChangeDate,
//                     end_date: lines.endDate,
//                     start_moviment_date: lines.startMovimentDate,
//                     customer_code: lines.customerCode,
//                     customer_cpf_cnpj: lines.customerCpfCnpj,
//                     customer_name: lines.customerName,
//                   };
//                   productionOrderItems.push(lineDetails);
//               });
//           } else if (lines.items && lines.orderCode) {
//               lines.items.forEach((item: any) => {
//                   let lineDetails = {
//                     location_code: lines.status,
//                     location_name: "SEM LOCAL",
//                     sku_code: item.productCode || "",
//                     sku_name: item.productName || "",
//                     reference_code: item.referenceCode || "",
//                     reference_name: item.referenceName || "",
//                     location_quantity: item.finishedQuantity || 0,
//                     pending_quantity_sku: item.pendingQuantity || 0,
//                     entry_date: lines.insertDate,
//                     branch_code: lines.branchCode,
//                     cycle_code: lines.cycleCode,
//                     order_code: lines.orderCode,
//                     order_bar_code: lines.orderBarCode,
//                     quantity: lines.quantity,
//                     finished_quantity: lines.finishedQuantity,
//                     pending_quantity: lines.pendingQuantity,
//                     status: lines.status,
//                     priority: lines.priority,
//                     estimated_delivery_date: lines.estimatedDeliveryDate,
//                     insert_date: lines.insertDate,
//                     last_change_date: lines.lastChangeDate,
//                     end_date: lines.endDate,
//                     start_moviment_date: lines.startMovimentDate,
//                     customer_code: lines.customerCode,
//                     customer_cpf_cnpj: lines.customerCpfCnpj,
//                     customer_name: lines.customerName,
//                   };
//                   productionOrderItems.push(lineDetails);
//               });
//           }
//         });
  
//         // Check if there are more pages to fetch
//         if (!hasNext) {
//           isLastPage = true
//         } else {
//           page++
//         }
//       }


//       return reply.status(200).send(JSON.stringify(productionOrderItems))
//     } catch (err) {
//       console.log(err)
//     }
//   })
// }