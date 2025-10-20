"use client";
import React from "react";
import {Table,TableHeader, TableColumn, TableBody, TableRow, TableCell, Calendar} from '@nextui-org/react'
import { ScrollText } from 'lucide-react';
import {today, getLocalTimeZone, isWeekend} from "@internationalized/date";
import {useLocale} from "@react-aria/i18n";

function Page() {
  let [date, setDate] = React.useState(today(getLocalTimeZone()));
  let {locale} = useLocale();
  let isInvalid = isWeekend(date, locale);
  
  return  <div>
    <div style={{padding: '20px'}} className='flex'>
      <div className='flex-1 mr-4'>
        <div className="flex flex-row mb-4 justify-start items-center">
          <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden">
            <ScrollText className="content-icons" size={48}/>
          </div>
          <div>
            <div className="ml-4 flex flex-col font-medium justify-center dark:from-black dark:via-black text-base text-gray-400">主题列表</div>
          </div>
        </div>
        <div>
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
    </div>
  </div>
}
export default Page;