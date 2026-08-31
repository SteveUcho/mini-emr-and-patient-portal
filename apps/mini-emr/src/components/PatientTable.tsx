"use client";

import { ChevronDown, ChevronRight, Pencil } from "@gravity-ui/icons";
import { Button, Separator, Surface, cn } from "@heroui/react";
import { createColumnHelper, createSortedRowModel, rowSortingFeature, sortFns, tableFeatures, useTable } from "@tanstack/react-table";
import React, { useState } from "react";
import { Patient } from "@/types/tableTypes";
import { ToggleModal } from "./ToggleModal";
import { PatientDetails } from "./PatientDetails";

const features = tableFeatures({
  rowSortingFeature, // enables sorting APIs and state
  sortedRowModel: createSortedRowModel(), // client-side sorting
  sortFns,
})

const columnHelper = createColumnHelper<typeof features, Patient>()

const columns = columnHelper.columns([
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => <span className="text-nowrap overflow-hidden text-ellipsis">{info.getValue<string>()}</span>,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => <span className="text-nowrap overflow-hidden text-ellipsis">{info.getValue<string>()}</span>,
  }),
  columnHelper.display({
    id: 'info',
    header: 'Info',
    cell: ({ row }) => {
      const user = row.original
      const apptCount = user.appointments.length
      const prescCount = user.prescriptions.length
      return (
        <div className="flex gap-2 w-full text-center items-center text-accent">
          <div className="border-accent border rounded-lg flex-1 px-2">
            <span className="font-bold">Appt:</span> {apptCount}
          </div>
          <div className="border-accent border rounded-lg flex-1 px-2">
            <span className="font-bold">Presc:</span> {prescCount}
          </div>
          <ToggleModal modalId="EditUserModal" data={user} >
            <Button isIconOnly aria-label="Edit user" variant="secondary" className="ml-auto">
              <Pencil />
            </Button>
          </ToggleModal>
        </div>
      )
    },
  }),
])

interface PatientTableProps {
  data: Patient[]
}

export function PatientTable(props: Readonly<PatientTableProps>) {
  const { data } = props
  const table = useTable({
    key: 'users-table',
    features,
    columns,
    data,
  })
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set())

  const handleRowClick = (rowId: string) => () => {
    setOpenKeys((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(rowId)) {
        newSet.delete(rowId)
      } else {
        newSet.add(rowId)
      }
      return newSet
    })
  }

  return (
    <Surface variant="secondary" className="rounded-2xl p-1">
      <table className="w-full">
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex py-2 px-4 gap-4">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="flex-1 text-left">
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center gap-2"
                        style={{
                          cursor: header.column.getCanSort()
                            ? 'pointer'
                            : undefined,
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <table.FlexRender header={header} />
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))
          }
        </thead>
        <tbody className="rounded-2xl">
          {
            table.getRowModel().rows.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr
                  className={
                    cn(
                      "flex py-2 px-4 gap-4",
                      "bg-background/50",
                      index === 0 ? "rounded-t-2xl" : "",
                      index === table.getRowModel().rows.length - 1 && !openKeys.has(row.id) ? "rounded-b-2xl" : "",
                      "items-center"
                    )}
                  onClick={handleRowClick(row.id)}
                >
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id} className="flex flex-1 items-center text-nowrap overflow-hidden text-ellipsis min-w-0 max-w-full">
                      {
                        cell.column.id === "name" && (
                          <Button
                            isIconOnly
                            size="sm"
                            aria-label="Toggle details"
                            variant="outline"
                            className="mr-2"
                            onClick={handleRowClick(row.id)}
                          >
                            {openKeys.has(row.id) ? <ChevronDown /> : <ChevronRight />}
                          </Button>
                        )
                      }
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>
                  <PatientDetails 
                    open={openKeys.has(row.id)}
                    appointments={row.original.appointments}
                    prescriptions={row.original.prescriptions}
                  />
                  </td>
                </tr>
                <tr>
                  <td className="flex-1">
                    {index !== table.getRowModel().rows.length - 1 && (
                      <Separator />
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))
          }
        </tbody>
      </table>
    </Surface>
  );
}
