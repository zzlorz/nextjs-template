"use client";
import {Table,TableHeader, TableColumn, TableBody, TableRow, TableCell, Calendar} from '@nextui-org/react'

function Page() {

  return  <div>
    <div style={{padding: '20px'}} className='flex'>
      <div className='flex-1 mr-4'>
        <div className="flex flex-row mb-4 justify-start items-center">
          <div className="h-16 w-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
            <img src="https://fanyi-cdn.cdn.bcebos.com/static/cat/asset/logo.b10defd4.png" alt="" />
          </div>
          <div>
            <div className="ml-4 flex flex-col justify-center dark:from-black dark:via-black">嗨，你好</div>
            <div className="ml-4 flex flex-col justify-center dark:from-black dark:via-black">早上好</div>
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
      <div className='w-80'>31231</div>
    </div>
  </div>
}
export default Page;