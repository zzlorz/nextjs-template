"use client";
import React from "react";
import {Table,TableHeader, TableColumn, TableBody, TableRow, TableCell, Calendar} from '@nextui-org/react'
import { Sun, CircleUser } from 'lucide-react';
import {CalendarDate, today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

function Page() {
  const [date, setDate] = React.useState<CalendarDate>(
    today(getLocalTimeZone())
  );
  let {locale} = useLocale();
  let isInvalid = isWeekend(date, locale);
  
  return  <div>
    <div style={{padding: '20px'}} className='flex'>
      <div className='flex-1 mr-4'>
        <div className="flex flex-row mb-4 justify-start items-center">
          <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden border-gray-300">
            <CircleUser className="content-icons" size={48}/>
          </div>
          <div>
            <div className="ml-4 flex flex-col justify-center dark:from-black dark:via-black text-xs">嗨，你好</div>
            <div className="ml-4 flex flex-col font-medium justify-center dark:from-black dark:via-black">早上好，欢迎你</div>
          </div>
        </div>
        <div>
          <div className="h-20 flex mb-4 flex-row justify-between gap-4">
            <div className="flex flex-1"><div className="bg-white dark:bg-[#18181B] rounded-large shadow-small w-full p-4">2</div></div>
            <div className="flex flex-1"><div className="bg-white dark:bg-[#18181B] rounded-large shadow-small w-full p-4">2</div></div>
            <div className="flex flex-1"><div className="bg-white dark:bg-[#18181B] rounded-large shadow-small w-full p-4">2</div></div>
            <div className="flex flex-1"><div className="bg-white dark:bg-[#18181B] rounded-large shadow-small w-full p-4">2</div></div>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className='w-72'>
        <div className="h-16 mb-4 pl-3"><Sun /></div>
        <div className="flex justify-center">
          <div className="">
            <Calendar 
                aria-label="Date (Invalid on weekends)"
                errorMessage={isInvalid ? "We are closed on weekends" : undefined}
                isInvalid={isInvalid}
                value={date as any}
                onChange={(d: any) => setDate(d as CalendarDate)}
              >
              </Calendar>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Page;