"use client";

import { ChevronDown, ChevronRight, Pencil, Plus, TrashBin } from "@gravity-ui/icons";
import { Button, Separator, Surface, cn } from "@heroui/react";
import { createColumnHelper, createSortedRowModel, rowSortingFeature, sortFns, tableFeatures, useTable } from "@tanstack/react-table";
import { motion } from "motion/react";
import React, { useState } from "react";
import { formatDateString } from "@/utils/stringManipulation";
import { User } from "@/types/tableTypes";
import { ToggleModal } from "./ToggleAtom";
import { modals } from "@/utils/modalConfigs";

const features = tableFeatures({
  rowSortingFeature, // enables sorting APIs and state
  sortedRowModel: createSortedRowModel(), // client-side sorting
  sortFns,
})

const columnHelper = createColumnHelper<typeof features, User>()

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
          <ToggleModal data={{ user }} config={modals.EditUserModal}>
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
  data: User[]
  appointmentKeys: string[]
  prescriptionKeys: string[]
}

export function PatientTable(props: Readonly<PatientTableProps>) {
  const { data, appointmentKeys, prescriptionKeys } = props
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
                    <motion.div
                      initial={{ height: 0 }}
                      animate={openKeys.has(row.id) ? { height: "auto" } : { height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="sm:flex overflow-hidden"
                    >
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3>Appointments</h3>
                          <Button isIconOnly size="sm" aria-label="Add appointment">
                            <Plus />
                          </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                          {row.original.appointments.map((appointment) => (
                            <div key={appointment.id} className="border-2 rounded-lg p-2">
                              <div className="flex items-center justify-between">
                                <h4>{appointment.provider}</h4>
                                <div>
                                  <Button isIconOnly aria-label="Edit appointment" variant="secondary" className="mr-1">
                                    <Pencil />
                                  </Button>
                                  <Button isIconOnly aria-label="Delete appointment" variant="danger-soft">
                                    <TrashBin />
                                  </Button>
                                </div>
                              </div>
                              <Separator className="my-2" variant="secondary" />
                              {
                                appointmentKeys.map((key) => (
                                  <div key={key} className="capitalize">
                                    <span className="font-semibold">{key.replaceAll('_', ' ')}:</span> {typeof appointment[key as keyof typeof appointment] === 'string' ? formatDateString(appointment[key as keyof typeof appointment] as string) : appointment[key as keyof typeof appointment]}
                                  </div>
                                ))
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator orientation="vertical" variant="secondary" />
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3>Prescriptions</h3>
                          <Button isIconOnly size="sm" aria-label="Add prescription">
                            <Plus />
                          </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                          {row.original.prescriptions.map((prescription) => {
                            return (
                              <div key={prescription.id} className="border-2 rounded-lg p-2">
                                <div className="flex items-center justify-between">
                                  <h4>{prescription.medication}</h4>
                                  <div>
                                    <Button isIconOnly aria-label="Edit prescription" variant="secondary" className="mr-1">
                                      <Pencil />
                                    </Button>
                                    <Button isIconOnly aria-label="Delete prescription" variant="danger-soft">
                                      <TrashBin />
                                    </Button>
                                  </div>
                                </div>
                                <Separator className="my-2" variant="secondary" />
                                {
                                  prescriptionKeys.map((key) => (
                                    <div key={key} className="capitalize">
                                      <span className="font-semibold">{key.replaceAll('_', ' ')}:</span> {typeof prescription[key as keyof typeof prescription] === 'string' ? formatDateString(prescription[key as keyof typeof prescription] as string) : prescription[key as keyof typeof prescription]}
                                    </div>
                                  ))
                                }
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
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
