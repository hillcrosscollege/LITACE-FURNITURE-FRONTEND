"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  style?: string;
  childRowStyle?: string;
}

const App_Table = <TData, TValue>({
  columns,
  data,
  style,
  childRowStyle,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("mt-4 border-0", style)}>
      <Table className="border-separate border-spacing-0">
        <TableHeader className="[&_tr]:border-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-0">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "",
                    index === 0 && "rounded-l-lg",
                    index === headerGroup.headers.length - 1 && "rounded-r-lg",
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={cn("border-b", childRowStyle)}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2 ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default App_Table;

// // components/app_ui/App_Table.tsx
// "use client";

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { cn } from "@/lib/utils";
// import { useEffect } from "react";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   style?: string;
//   childRowStyle?: string;
//   // optional pagination — if provided, table slices data internally
//   page?: number;
//   pageSize?: number;
// }

// const App_Table = <TData, TValue>({
//   columns,
//   data,
//   style,
//   childRowStyle,
//   page,
//   pageSize,
// }: DataTableProps<TData, TValue>) => {
//   // slice data if pagination props are provided
//   const pagedData =
//     page && pageSize
//       ? data.slice((page - 1) * pageSize, page * pageSize)
//       : data;

//   const table = useReactTable({
//     data: pagedData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   useEffect(() => {
//     console.log(table);
//   }, [table]);

//   return (
//     <div className={cn("mt-4 border-0", style)}>
//       <Table className="border-separate border-spacing-0">
//         <TableHeader className="[&_tr]:border-0">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id} className="border-0">
//               {headerGroup.headers.map((header, index) => (
//                 <TableHead
//                   key={header.id}
//                   className={cn(
//                     index === 0 && "rounded-l-lg",
//                     index === headerGroup.headers.length - 1 && "rounded-r-lg",
//                   )}
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext(),
//                       )}
//                 </TableHead>
//               ))}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id} className={cn("border-b", childRowStyle)}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id} className="py-2">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="text-center py-10">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default App_Table;
