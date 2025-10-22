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
  DatePicker
} from '@nextui-org/react'
import{ImageUp, Trash2} from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

export default function AddModal({modalOpen, modalOnClose, modalData}: {modalOpen: boolean, modalOnClose: () => void, modalData: any | null}) {

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
  console.log("modal data:", modalData);
  useEffect(() => {
    if (modalData) {
      setValue(modalData.theme_description || '');
    } else {
      setValue('');
    }
  }, [modalData]);

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
                      <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center relative">
                        <span className="rounded-full p-3 cursor-pointer bg-gray-600"><ImageUp size={26} className="text-white" /></span>
                        <span className="absolute bottom-0 right-0 p-2 bg-gray-300 rounded-tl-lg rounded-br-lg cursor-pointer text-gray-400 hover:text-white hover:bg-gray-500 dark:hover:text-white border-gray-800">
                          <Trash2 size={16} />
                        </span>
                      </div>
                      <div className="">
                        <Input label="标题" placeholder="输入标题" type="text" />
                      </div>
                      <div className="flex flex-row gap-4">
                        <DatePicker className="w-full" label="日期" />
                      </div>
                      <div className="flex flex-row gap-4">
                        <Input label="城市" placeholder="江苏 / 苏州" type="text" />
                      </div>
                      <div className="flex flex-row gap-4">
                        <Input label="地址" placeholder="平江路" type="text" />
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
                          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                          // Your account includes a free trial of TinyMCE premium features
                          // Try the most popular premium features until Nov 4, 2025:
                          'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                        ],
                        //toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                          { value: 'First.Name', title: 'First Name' },
                          { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request: any, respondWith:any) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        uploadcare_public_key: 'f8a5ecc6c34f43af6241',
                      }}
                      initialValue={value}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleCancel}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirm}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
}