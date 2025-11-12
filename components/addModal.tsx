"use client";
import { useEffect, useRef, useState } from "react";

import{
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  DatePicker,
  Card,
  Skeleton
} from '@nextui-org/react'

import {useDateFormatter} from "@react-aria/i18n";
import {parseDate, getLocalTimeZone, CalendarDate} from "@internationalized/date";
import{ImageUp, Trash2} from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import supabase from "@/utils/supabaseRequest";

// 1. 封装日期工具函数（集中处理转换/格式化）
const DateUtils = {
  // CalendarDate → YYYY-MM-DD 字符串（提交后端用）
  formatToISO: (date: CalendarDate | null | undefined): string => {
    if (!date) return '';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  },
  // ISO字符串（如 2023-10-05）→ CalendarDate
  parseToCalendarDate: (str: string): CalendarDate | null => {
    if (!str) return null;
    try {
      return parseDate(str.split("T")[0]); // 兼容带时分秒的字符串
    } catch {
      return null;
    }
  },
  // CalendarDate → 原生Date（如需其他操作）
  toNativeDate: (date: CalendarDate): Date => {
    return new Date(date.year, date.month - 1, date.day);
  }
};

const SkeletonBox = () => {
  return <Card className="w-[200px] space-y-5 p-4 w-full h-[650px]" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
}
export default function AddModal({modalOpen, modalOnClose, modalData}: {modalOpen: boolean, modalOnClose: () => void, modalData: any | null}) {
  let formatter = useDateFormatter({dateStyle: "full"});
  let [themeId, setThemeId] = useState(0);
  const [formData, setFormData] = useState({
    theme_title: '', 
    theme_position: '', 
    theme_description: '' ,
    theme_position_detail: ''
  });
  const [themeDate, setThemeDate] = useState<CalendarDate | null | undefined>(null);
  const [loaded, setLoaded] = useState(false);

  const [value, setValue] = useState('initialValue');

  const [scrollBehavior, setScrollBehavior] = useState<"inside" | "normal" | "outside">("inside");

  const editorRef = useRef<any>(null);

  const handleCancel = () => {
    setLoaded(false);
    modalOnClose();
  }
  const calendarDateToDate = (calendarDate: CalendarDate): Date => {
  return new Date(
    calendarDate.year,
    calendarDate.month - 1,
    calendarDate.day
  );
};
  const handleConfirm = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      // an application would save the editor content to the server here
      const submitData = {
        ...formData,
        theme_description: editorRef.current.getContent(),
        theme_date: DateUtils.formatToISO(themeDate)
      }
      const { data, error } = await supabase
      .from('youlaji_blog_test')
      .update(submitData)
      .eq('theme_id', themeId);
      if (error) {

      } else {

      }
    }
    modalOnClose();
  }
  const contentChange = (content: string) => {
    console.log('Content was updated:', content);
  }

  // 创建格式化器（配置格式）
  const dateFormatter = useDateFormatter({
    // 自定义格式：年-月-日（2位数月份和日期）
    year: "numeric", // 数字形式的年（如 2023）
    month: "2-digit", // 2位数月份（如 10）
    day: "2-digit" // 2位数日期（如 05）
  });
  useEffect(() => {
    if (modalData) {
      setThemeDate(parseDate(modalData.theme_date.split("T")[0]));
      setValue(modalData.theme_description || '');
      setThemeId(modalData.theme_id);
      setFormData({
        ...formData,
        theme_title: modalData.theme_title,
        theme_position: modalData.theme_position,
        theme_position_detail: modalData.theme_position_detail
      });
      let aaa = formatter.format(parseDate(modalData.theme_date.split("T")[0]).toDate(getLocalTimeZone()))
      console.log(aaa)
    } else {
      setValue('');
      setThemeDate(null);
      setThemeId(0);
      setFormData({
        theme_title: '', 
        theme_position: '', 
        theme_description: '' ,
        theme_position_detail: ''
      })
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
  const initFn = (evt:any, editor:any) => {
    editorRef.current = editor
    setLoaded(true)
    // setTimeout(() => setLoaded(true), 3000)
  }
  const handleValueChange = (e:any) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    setFormData((prev)=> ({
      ...prev,
      [name]: value
    }))
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
                        <Input label="标题" placeholder="输入标题" type="text" value={formData.theme_title} name="theme_title" onChange={handleValueChange} />
                      </div>
                      <div className="flex flex-row gap-4">
                        <DatePicker className="w-full" label="日期" value={themeDate} name="theme_date" onChange={setThemeDate} />
                      </div>
                      <div className="flex flex-row gap-4">
                        <Input label="城市" placeholder="江苏 / 苏州" type="text" value={formData.theme_position} name="theme_position" onChange={handleValueChange} />
                      </div>
                      <div className="flex flex-row gap-4">
                        <Input label="地址" placeholder="平江路" type="text" value={formData.theme_position_detail} name="theme_position_detail" onChange={handleValueChange} />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full absolute top-px left-px z-[1999]" style={{display: (loaded?'none': 'block')}}><SkeletonBox></SkeletonBox></div>
                      <Editor
                        apiKey='2d3qehgzemb5e52p81nvcj27q3ydp92g0t9q1pxj09nx3u9w'
                        onEditorChange={contentChange}
                        onInit={initFn}
                        init={{
                          height: 650,
                          plugins: [
                            // Core editing features
                            'anchor', 'autolink',  'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount', 'fullscreen', 'image',
                            // Your account includes a free trial of TinyMCE premium features
                            // Try the most popular premium features until Nov 4, 2025:
                            // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'image', 'mentions', 'tableofcontents', 'footnotes', 'autocorrect', 'typography', 'inlinecss'
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
                          setup:() => {
                            console.log(11111)
                          }
                        }}
                        initialValue={value}
                      />
                    </div>
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