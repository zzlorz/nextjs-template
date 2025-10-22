"use client";
import { useEffect, useRef, useState } from "react";
import {CalendarDate} from '@nextui-org/react'
import {parseDate, getLocalTimeZone, DateFormatter} from "@internationalized/date";
import{
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DatePicker
} from '@nextui-org/react'
import{ImageUp, Trash2} from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import supabase from "@/utils/supabaseRequest";

export default function AddModal({modalOpen, modalOnClose, modalData}: {modalOpen: boolean, modalOnClose: () => void, modalData: any | null}) {
  const [formData, setFormData] = useState({
    theme_title: '', 
    theme_position: '', 
    theme_description: '' ,
    theme_position_detail: '',
    theme_date: null as CalendarDate | null
  });

  const [value, setValue] = useState('initialValue');

  const [scrollBehavior, setScrollBehavior] = useState<"inside" | "normal" | "outside">("inside");

  const editorRef = useRef<any>(null);

  const handleCancel = () => {
    modalOnClose();
  }
  const handleConfirm = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      // an application would save the editor content to the server here
      console.log(content);
    }
    modalOnClose();
  }
  const contentChange = (content: string) => {
    console.log('Content was updated:', content);
  }
  useEffect(() => {
    if (modalData) {
      console.log("modal data:", '');
      console.log("modal data:", parseDate(modalData.theme_date.split("T")[0]));
      setValue(modalData.theme_description || '');
      setFormData({
        // 保留 formData 中可能存在的其他字段（如果有），这里示例中没有额外字段
        ...formData,
        // 覆盖需要更新的字段（从 data 中提取）
        theme_title: modalData.theme_title,
        theme_position: modalData.theme_position,
        theme_position_detail: modalData.theme_position_detail,
        theme_date: parseDate(modalData.theme_date.split("T")[0]) // 注意：原 formData 中 theme_date 初始值为 undefined，这里会被赋值为字符串
      });
    } else {
      setValue('');
      // setFormData({
      //   theme_title: '', 
      //   theme_position: '', 
      //   theme_description: '' ,
      //   theme_position_detail: '',
      //   theme_date: null as CalendarDate | null
      // })
    }
  }, [modalData]);
  
  const imagesUploadHandler = (blobInfo:any) => {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase.storage.from('imgs').upload(`old/${blobInfo.filename()}`, blobInfo.blob(), {
        contentType: 'image/*',
      })
      if (error) {
        reject(error)
      } else {
        const { data: { publicUrl } } = supabase
        .storage
        .from('imgs')
        .getPublicUrl(data.path);

        resolve(publicUrl)
      }
    })
      
  }
  return <Modal 
        backdrop="blur"
        isOpen={modalOpen}
        onClose={modalOnClose} 
        size={'full'} 
        isDismissable={false} 
        scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(modalOnClose) => (
            <>
              <ModalHeader className="flex flex-row items-center gap-1">记录时光 | <span className="text-sm">写主题</span></ModalHeader>
              <ModalBody>
                <div className="w-full flex justify-center">
                  <div style={{width: '1200px'}} className="flex flex-row justify-center gap-4">
                    <div className="flex flex-col gap-4" style={{width: '400px'}}>
                      <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center relative dark:bg-neutral-800">
                        <span className="rounded-full p-3 cursor-pointer bg-gray-600"><ImageUp size={26} className="text-white" /></span>
                        <span className="absolute bottom-0 right-0 p-2 bg-gray-300 rounded-tl-lg rounded-br-lg cursor-pointer text-gray-400 hover:text-white hover:bg-gray-500 dark:hover:text-white border-gray-800  dark:bg-neutral-700">
                          <Trash2 size={16} />
                        </span>
                      </div>
                      <div className="">
                        <Input label="标题" placeholder="输入标题" type="text" value={formData.theme_title} />
                      </div>
                      <div className="flex flex-row gap-4">
                        <DatePicker className="w-full" label="日期" value={formData.theme_date} />
                      </div>
                      <div className="flex flex-row gap-4">
                        <Input label="城市" placeholder="江苏 / 苏州" type="text" value={formData.theme_position} />
                      </div>
                      <div className="flex flex-row gap-4">
                        <Input label="地址" placeholder="平江路" type="text" value={formData.theme_position_detail} />
                      </div>
                    </div>
                    <Editor
                      apiKey='2d3qehgzemb5e52p81nvcj27q3ydp92g0t9q1pxj09nx3u9w'
                      onEditorChange={contentChange}
                      onInit={(evt:any, editor:any) => editorRef.current = editor}
                      init={{
                        height: 650,
                        plugins: [
                          // Core editing features
                          'anchor', 'autolink',  'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'fullscreen',
                          // Your account includes a free trial of TinyMCE premium features
                          // Try the most popular premium features until Nov 4, 2025:
                          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'image', 'mentions', 'tableofcontents', 'footnotes', 'autocorrect', 'typography', 'inlinecss'
                        ],
                        menu: {
                          happy: { title: 'menu', items: 'code' }
                        },
                        menubar: 'happy',
                        toolbar: 'fullscreen image emoticons undo redo | blocks fontsize | bold italic underline strikethrough | link media table | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                          { value: 'First.Name', title: 'First Name' },
                          { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request: any, respondWith:any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        // uploadcare_public_key: 'f8a5ecc6c34f43af6241',
                        images_upload_handler: imagesUploadHandler,
                        images_upload_credentials: true,
                        automatic_uploads: true,
                      }}
                      initialValue={value}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleCancel}>
                  关闭
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  保存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
}