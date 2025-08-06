// src/components/ui/table.tsx
import React from "react"
import { cn } from "../../lib/utils"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode
}

function Table({ children, className, ...props }: TableProps) {
    return (
        <div className="w-full overflow-auto border rounded-xl shadow">
        <table className={cn("w-full caption-bottom text-sm", className)} {...props}>
            {children}
        </table>
        </div>
    )
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode
}

function TableHeader({ children, className, ...props }: TableHeaderProps) {
    return (
        <thead className={cn("bg-gray-100 text-gray-700", className)} {...props}>
        {children}
        </thead>
    )
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode
}

function TableBody({ children, className, ...props }: TableBodyProps) {
    return <tbody className={className} {...props}>{children}</tbody>
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode
}

function TableRow({ children, className, ...props }: TableRowProps) {
    return <tr className={cn("border-b hover:bg-gray-50", className)} {...props}>{children}</tr>
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode
}

function TableHead({ children, className, ...props }: TableHeadProps) {
    return <th className={cn("px-4 py-3 text-left font-semibold", className)} {...props}>{children}</th>
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode
}

function TableCell({ children, className, ...props }: TableCellProps) {
    return <td className={cn("px-4 py-2", className)} {...props}>{children}</td>
}

export {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
}