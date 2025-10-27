"use client";
import React from "react";
import {Table,TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, useDisclosure} from '@nextui-org/react'
import { ScrollText, Eye, PencilLine, Trash2, ListPlus, TextSearch} from 'lucide-react';
import supabase from "../../../utils/supabaseRequest";
import AddModal from "../../../components/addModal";


function Page() {
  const [youlajiBlogTest, setYoulajiBlogTest] = React.useState<any[] | null>(null);
  const [sbError, setSbError] = React.useState<any | null>(null);
  const [selectedColor, setSelectedColor] = React.useState("default");
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [item, setItem] = React.useState<any | null>(null);
  
  // setSelectedColor("primary");
  React.useEffect(() => {
    let mounted = true;
    supabase
      .from('youlaji_blog_test')
      .select('*')
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error) {
          setSbError(error);
        } else {
          setYoulajiBlogTest(data ?? []);
          setSelectedColor("primary");
        }
      });
    return () => { mounted = false; };
  }, []);
  const toEdit = (item: any) => {
    console.log("to edit item:", item);
    setItem(item);
    onOpen();
  }
  const handleModalOpen = () => {
    setItem(null);
    onOpen();
  }
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
        <div className="flex flex-row justify-between gap-12 mb-4">
          <Input placeholder="Search..." color={'primary'} startContent={
            <TextSearch />
          } />
          <Button color="primary" onPress={handleModalOpen}><ListPlus /></Button>
        </div>
        <AddModal modalOpen={isOpen} modalOnClose={onClose} modalData={item} />
        <div>
          <Table
            aria-label="Example static collection table"
            color={selectedColor as any}
            defaultSelectedKeys={[]}
            selectionMode="single">
            <TableHeader>
              <TableColumn>名称</TableColumn>
              <TableColumn>日期</TableColumn>
              <TableColumn>主题详情1</TableColumn>
              <TableColumn className="flex justify-center items-center">操作</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} items={youlajiBlogTest ?? []}>
              {
                (item) => (
                  <TableRow key={item.theme_id}>
                    <TableCell>{item.theme_title}</TableCell>
                    <TableCell>{item.theme_date}</TableCell>
                    <TableCell>{item.theme_position_detail}</TableCell>
                    <TableCell>
                      <span className="flex flex-row justify-center gap-2">
                        <Eye className="cursor-pointer text-gray-500" size={16} />
                        <PencilLine className="cursor-pointer text-gray-500" onClick={() => {toEdit(item)}} size={16} />
                        <Trash2 color="red" className="cursor-pointer" size={16}/>
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
          </Table>
        </div>
      </div>
    </div>
  </div>
}
export default Page;
