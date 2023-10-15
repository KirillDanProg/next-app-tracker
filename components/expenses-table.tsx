/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { useAppSelector, useAppDispatch } from "@/state/store"
import { selectExpenses } from "@/state/features/expenses/expense-slice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Expense } from "@/types/expense"
import { useSession } from "next-auth/react"
import { deleteExpenseThunk } from "@/state/features/expenses/expense-slice"

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = row.getValue("date")
        ? new Date(row.getValue("date")).toLocaleDateString()
        : ""

      return <div className="capitalize">{formattedDate}</div>

    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const currency = row.original.currency
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: currency,
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const expense = row.original

      const dispatch = useAppDispatch()
      const { data } = useSession()
      const userId = data?.user?.id
      const onDeleteClickHandler = () => {
        dispatch(deleteExpenseThunk({ userId, expenseId: expense._id }))
      }

      const onEditClickHandler = () => {

        // const args = {
        //   userId, 
        //   expenseId: expense._id,
        // }
        // const updatedExpense: Partial<Expense> = {
        //   title: "qwerqwer",
        //   amount: 1,
        //   date: "",
        //   category: 'Food'
        // }
        // dispatch(editExpenseThunk({userId, expenseId: expense._id, updatedExpense}))
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button onClick={onEditClickHandler}>
                <span> Edit expense</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={onDeleteClickHandler}
                className="p-0 text-red">
                <span> Delete expense</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]

export function DataTableDemo() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const data = useAppSelector(selectExpenses)
  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      }
    },
    state: {
      columnFilters,
    },
  })
  const onChangeHandler = (e: any) => {
    table.getColumn("title")?.setFilterValue(e.target.value)
  }

  return (
    <div className="">
      <div className="py-4">
        <Input
          placeholder="Filter"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={onChangeHandler}
          className="max-w-sm text-black"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            className="text-black"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className="text-black"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
