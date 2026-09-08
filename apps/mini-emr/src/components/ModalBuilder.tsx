"use client";

import { Clock, Person } from "@gravity-ui/icons";
import { Button, Calendar, DateField, DatePicker, DateValue, Input, Key, Label, ListBox, Modal, NumberField, Select, Surface, TextField, TimeField, TimeValue } from "@heroui/react";
import { useState } from "react";
import { modalAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { modalActionMap, ModalConfig, ModalKey } from "@/utils/modalConfigs";
import { fromDate, parseAbsolute, parseDateTime, parseZonedDateTime } from "@internationalized/date";

interface ModalBuilderProps {
  id: ModalKey;
  config: ModalConfig;
}

export function ModalBuilder(props: Readonly<ModalBuilderProps>) {
  const { id, config } = props;
  const [formState, setFormState] = useState<Record<string, any>>({});
  const [modalState, setModalState] = useAtom(modalAtom);

  const action = modalActionMap[id as keyof typeof modalActionMap];
  const formData = { ...modalState.data, ...formState };

  const handleFieldChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement> | Key | null) => {
    console.log(field, formData[field], 'e', e, e?.toString());
    const value = typeof e === 'string' || typeof e === 'number' || e === null ? e : e.target.value;
    if (value === modalState.data?.[field]) {
      const tempState = { ...formState };
      delete tempState[field];
      setFormState(tempState);
      return;
    }
    setFormState({ ...formState, [field]: value });
  };

  const handleToggleModal = () => {
    setModalState({});
    setFormState({});
  };

  const handleReset = () => {
    setFormState({});
  };

  const handleSubmit = async () => {
    await action(formData);
  };

  return (
    <Modal isOpen={modalState.id === id} onOpenChange={handleToggleModal}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Person className="size-5" />
              </Modal.Icon>
              <Modal.Heading>{config?.title}</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                {config?.description}
              </p>
            </Modal.Header>
            {
              config?.form?.length && config.form.some((field) => field.hidden !== true) && (
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <form className="flex flex-col gap-4">
                      {config?.form?.map((field) => {
                        if (field.fieldType === "select") {
                          return (
                            <Select
                              key={field.name}
                              placeholder="Select one"
                              variant="secondary"
                              value={formData[field.name] || null}
                              onChange={handleFieldChange(field.name)}
                            >
                              <Label>{field.label}</Label>
                              <Select.Trigger className="capitalize">
                                <Select.Value />
                                <Select.Indicator />
                              </Select.Trigger>
                              <Select.Popover>
                                <ListBox>
                                  {field.options?.map((option) => (
                                    <ListBox.Item key={option} id={option} textValue={option} className="capitalize">
                                      {option}
                                      <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                  ))}
                                </ListBox>
                              </Select.Popover>
                            </Select>
                          )
                        } else if (field.fieldType === "textfield") {
                          return (
                            <TextField key={field.name} hidden={field.hidden} name={field.name} type={field.textType} variant="secondary">
                              <Label>{field.label}</Label>
                              <Input placeholder={`Enter your ${field.label.toLowerCase()}`} value={formData[field.name]} onChange={handleFieldChange(field.name)} />
                            </TextField>
                          )
                        } else if (field.fieldType === "numberfield") {
                          return (
                            <NumberField key={field.name} minValue={0} name={field.name} value={formData[field.name]} variant="secondary" onChange={handleFieldChange(field.name)}>
                              <Label>{field.label}</Label>
                              <NumberField.Group>
                                <NumberField.DecrementButton />
                                <NumberField.Input />
                                <NumberField.IncrementButton />
                              </NumberField.Group>
                            </NumberField>
                          )
                        } else if (field.fieldType === "datetimeField") {
                          return (
                            <DatePicker
                              key={field.name}
                              name={field.name}
                              value={formData[field.name] ? (parseAbsolute(formData[field.name], "America/New_York") as any) : undefined}
                              onChange={(value) => handleFieldChange(field.name)(value?.toDate("America/New_York")?.toISOString() || "")}
                              granularity="minute"
                              hideTimeZone={false}
                              hourCycle={12}
                              shouldForceLeadingZeros={true}
                            >
                              {({ state }) => (
                                <>
                                  <Label>Date and time</Label>
                                  <DateField.Group fullWidth variant="secondary">
                                    <DateField.Input>
                                      {(segment) => <DateField.Segment segment={segment} />}
                                    </DateField.Input>
                                    <DateField.Suffix>
                                      <DatePicker.Trigger>
                                        <DatePicker.TriggerIndicator />
                                      </DatePicker.Trigger>
                                    </DateField.Suffix>
                                  </DateField.Group>
                                  <DatePicker.Popover className="flex flex-col gap-3">
                                    <Calendar aria-label="Event date">
                                      <Calendar.Header>
                                        <Calendar.YearPickerTrigger>
                                          <Calendar.YearPickerTriggerHeading />
                                          <Calendar.YearPickerTriggerIndicator />
                                        </Calendar.YearPickerTrigger>
                                        <Calendar.NavButton slot="previous" />
                                        <Calendar.NavButton slot="next" />
                                      </Calendar.Header>
                                      <Calendar.Grid>
                                        <Calendar.GridHeader>
                                          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                                        </Calendar.GridHeader>
                                        <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
                                      </Calendar.Grid>
                                      <Calendar.YearPickerGrid>
                                        <Calendar.YearPickerGridBody>
                                          {({ year }) => <Calendar.YearPickerCell year={year} />}
                                        </Calendar.YearPickerGridBody>
                                      </Calendar.YearPickerGrid>
                                    </Calendar>
                                    <div className="flex items-center justify-between gap-4">
                                      <Label>Time</Label>
                                      <TimeField
                                        isRequired
                                        fullWidth
                                        aria-label="Time"
                                        granularity="minute"
                                        hideTimeZone={false}
                                        hourCycle={12}
                                        name="time"
                                        shouldForceLeadingZeros={true}
                                        value={state.timeValue}
                                        onChange={(v) => state.setTimeValue(v as TimeValue)}
                                      >
                                        <TimeField.Group variant="secondary">
                                          <TimeField.Input>
                                            {(segment) => <TimeField.Segment segment={segment} />}
                                          </TimeField.Input>
                                          <TimeField.Suffix>
                                            <Clock className="size-4 text-muted" />
                                          </TimeField.Suffix>
                                        </TimeField.Group>
                                      </TimeField>
                                    </div>
                                  </DatePicker.Popover>
                                </>
                              )}
                            </DatePicker>
                          )
                        }
                        return null
                      })}
                    </form>
                  </Surface>
                </Modal.Body>
              )
            }
            <Modal.Footer>
              <Button
                variant={config?.footerButtons?.left?.variant || "secondary"}
                onClick={handleReset}
              >
                {config?.footerButtons?.left?.label || "Reset"}
              </Button>
              <Button
                isDisabled={!config?.form?.every(field => field.hidden) && Object.keys(formState).length === 0}
                slot="close"
                variant={config?.footerButtons?.right?.variant || "primary"}
                onClick={handleSubmit}
              >
                {config?.footerButtons?.right?.label || "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}