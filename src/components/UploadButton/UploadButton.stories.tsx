import React, { useEffect, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { UploadButton } from './UploadButton'
import { useFilesToTextMap } from './useFileToText'
import { useStateFiles } from './useStateFiles'

export default {
  title: 'components/UploadButton',
  component: UploadButton,
} as ComponentMeta<typeof UploadButton>

const Template: ComponentStory<typeof UploadButton> = () => {
  const [files, , addFiles, clearFiles] = useStateFiles()
  const filesToTextMap = useFilesToTextMap(files)
  let text = useRef('')
  useEffect(() => {
    text.current = [...filesToTextMap.values()].join(',\n\n')
  }, [filesToTextMap])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="file-uploader">Upload a File</label>

      <br />

      <UploadButton
        id="file-uploader"
        files={files}
        addFiles={addFiles}
        clearFiles={clearFiles}
      />

      <hr />

      <textarea
        value={text.current}
        style={{
          width: '100%',
          height: '500px',
        }}
        disabled
        readOnly
      />
    </>
  )
}

export const Primary = Template.bind({})
Primary.args = {}
